#!/usr/bin/env python3
"""Scan workbook answer PDFs and write the question-to-page index.

Reads the text layer with pdftotext. Does not rewrite PDF bytes.
Add a workbook by placing the original file at
assets/answers/documents/<sha256>.pdf and appending one BOOKS entry.

Past-paper answers are intentionally absent. If they are added later,
keep them in a separate catalog; do not append them to this bookshelf.
"""
from __future__ import annotations

import hashlib
import json
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DOCUMENTS = ROOT / "assets" / "answers" / "documents"
DATA_JS = ROOT / "answers-data.js"
MANIFEST = ROOT / "assets" / "answers" / "manifest.json"

# numbering:
#   printed-label — header is 【問題 1.1 · 解答】; the same label repeats per chapter.
#   chapter-ordinal — header is 【問題 1 · 解答】; readers type chapter.problem (1.1, 3.14).
BOOKS = [
    {
        "id": "denjiki",
        "shortTitle": "電磁気学演習 第3版（答案）",
        "title": "電磁気学演習 第3版",
        "authors": "山村泰道・北川盈雄",
        "spine": "電磁気",
        "numbering": "printed-label",
        "sha256": "c6446d1101f20a9a64350e7a243586cfd7d1d31b8c2b3ab0979b16a6968446be",
        "pages": 331,
        "sourceName": "denjiki-answers.pdf",
        "expectedAnswers": 308,
    },
    {
        "id": "denki-kairo",
        "shortTitle": "詳解電気回路演習（上）（答案）",
        "title": "詳解電気回路演習（上）",
        "authors": "大下眞二郎",
        "spine": "電気回路",
        "numbering": "chapter-ordinal",
        "sha256": "76a976818362aef0a5cf68a48fab5304df1a33c48ae50b7af45f7b5de8ae3f42",
        "pages": 562,
        "sourceName": "denki-kairo-answers.pdf",
        "expectedAnswers": 497,
    },
]

HEADER = re.compile(r"【問題\s*([0-9]+(?:\.[0-9]+)*)\s*·\s*解答】")
CHAPTER = re.compile(r"第\s*([0-9]+)\s*章[ \t]*([^\n]{0,48})")


def pdf_pages(path: Path) -> list[str]:
    raw = subprocess.check_output(["pdftotext", "-layout", str(path), "-"])
    parts = raw.decode("utf-8").split("\f")
    if parts and not parts[-1].strip():
        parts.pop()
    return parts


def chapter_heading(page: str):
    head = "\n".join(page.splitlines()[:6])
    match = CHAPTER.search(head)
    if not match:
        return None
    title = re.sub(r"\s+", " ", match.group(2)).strip(" ·")
    title = re.sub(r"\s+\d+\s*/\s*\d+$", "", title).strip()
    return int(match.group(1)), title


def index_book(meta: dict) -> dict:
    path = DOCUMENTS / f"{meta['sha256']}.pdf"
    blob = path.read_bytes()
    digest = hashlib.sha256(blob).hexdigest()
    if digest != meta["sha256"]:
        raise SystemExit(f"{meta['id']}: sha256 {digest} != {meta['sha256']}")
    if not blob.startswith(b"%PDF-"):
        raise SystemExit(f"{meta['id']}: not a PDF")
    pages = pdf_pages(path)
    if len(pages) != meta["pages"]:
        raise SystemExit(f"{meta['id']}: pdf pages {len(pages)} != {meta['pages']}")
    current = None
    titles: dict[int, str] = {}
    answers = []
    seen = set()
    for number, page in enumerate(pages, 1):
        heading = chapter_heading(page)
        if heading:
            current = heading[0]
            titles.setdefault(current, heading[1])
        found = HEADER.findall(page)
        if not found:
            continue
        if len(found) != 1:
            raise SystemExit(f"{meta['id']}: page {number} has {len(found)} headers")
        if current is None:
            raise SystemExit(f"{meta['id']}: page {number} has a problem before any chapter")
        label = found[0]
        key = (current, label)
        if key in seen:
            raise SystemExit(f"{meta['id']}: duplicate {key}")
        seen.add(key)
        if not titles.get(current):
            raise SystemExit(f"{meta['id']}: chapter {current} has no title")
        answers.append({"chapter": current, "label": label, "page": number})
    if len(answers) != meta["expectedAnswers"]:
        raise SystemExit(f"{meta['id']}: indexed {len(answers)} != {meta['expectedAnswers']}")
    chapters = [{"number": number, "title": titles[number]} for number in sorted(titles)]
    if {item["chapter"] for item in answers} != {item["number"] for item in chapters}:
        raise SystemExit(f"{meta['id']}: chapter list does not match answers")
    return {
        "id": meta["id"],
        "shortTitle": meta["shortTitle"],
        "title": meta["title"],
        "authors": meta["authors"],
        "spine": meta["spine"],
        "numbering": meta["numbering"],
        "sha256": meta["sha256"],
        "pages": meta["pages"],
        "sourceName": meta["sourceName"],
        "file": f"assets/answers/documents/{meta['sha256']}.pdf",
        "chapters": chapters,
        "answers": answers,
    }


def main() -> None:
    books = [index_book(meta) for meta in BOOKS]
    data = {"version": 1, "books": books}
    payload = json.dumps(data, ensure_ascii=False, indent=2)
    header = """// 练习册答案目录。由 scripts/build-answer-index.py 扫描 PDF 文字层生成，不要手改题号页码。
// 再加一本练习册时：原字节放入 assets/answers/documents/<sha256>.pdf，在脚本 BOOKS 追加一条后重跑。
// 过去问答案不要写进 books。将来若要收录，应另建目录（例如 kind 为 past-paper），并且不要在本页做入口。
"""
    footer = "if(typeof module==='object'&&module.exports)module.exports=data;else root.ANSWERS_DATA=data;})(typeof globalThis!=='undefined'?globalThis:this);\n"
    DATA_JS.write_text(header + "(function(root){'use strict';const data=\n" + payload + "\n;" + footer, encoding="utf-8")
    manifest = {
        "note": "练习册答案原字节。扫描脚本不改写 PDF。过去问答案不在此清单。",
        "files": [
            {
                "id": book["id"],
                "shortTitle": book["shortTitle"],
                "sourceName": book["sourceName"],
                "path": book["file"],
                "sha256": book["sha256"],
                "bytes": (DOCUMENTS / f"{book['sha256']}.pdf").stat().st_size,
                "pages": book["pages"],
                "answers": len(book["answers"]),
            }
            for book in books
        ],
    }
    MANIFEST.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    for book in books:
        print(f"{book['id']}: {len(book['answers'])} answers, {len(book['chapters'])} chapters, {book['pages']} pages")


if __name__ == "__main__":
    try:
        main()
    except subprocess.CalledProcessError as error:
        sys.exit(error.returncode or 1)
