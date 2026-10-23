#!/usr/bin/env python3
"""Build a reviewed question manifest into PNG crops and portable JSON. No OCR/segmentation."""
import argparse
import hashlib
import json
import math
from pathlib import Path
import re
import sys
import fitz


def inside(root, relative):
    path = (root / relative).resolve()
    if not path.is_relative_to(root):
        raise ValueError('Path escapes repository: ' + str(relative))
    return path


def build(root, manifest, check=False, preview_dir=None):
    output_root = preview_dir.resolve() if preview_dir else root
    if preview_dir and (output_root == root or output_root.is_relative_to(root / "assets") or output_root.is_relative_to(root / "data")):
        raise ValueError("Preview must use a separate temporary directory outside production assets/data")
    data = json.loads(manifest.read_text())
    if data.get('schemaVersion') != 1:
        raise ValueError('Unsupported manifest version')
    paper_id = data['id']
    if not re.fullmatch(r'[a-z0-9][a-z0-9-]{0,100}', paper_id):
        raise ValueError('Invalid paper id')
    source = data['source']
    pdf = inside(root, source['pdf'])
    if hashlib.sha256(pdf.read_bytes()).hexdigest() != source['sha256']:
        raise ValueError('Source SHA-256 mismatch; re-review before rebuilding')
    doc = fitz.open(pdf)
    if len(doc) != source['pageCount']:
        raise ValueError('Source page count mismatch')
    questions = data['questions']
    ids = [q['id'] for q in questions]
    if not ids or len(set(ids)) != len(ids):
        raise ValueError('Questions must have unique stable ids')
    coverage = data['coverage']
    if sorted(c['page'] for c in coverage) != list(range(1, len(doc)+1)):
        raise ValueError('Coverage audit must account for every PDF page once')
    scale = data.get('renderScale', 2.5)
    if not isinstance(scale, (int, float)) or not 1 <= scale <= 4:
        raise ValueError('renderScale must be between 1 and 4')
    for q in questions:
        if not re.fullmatch(r'[a-z0-9][a-z0-9-]{0,120}', q['id']):
            raise ValueError('Invalid question id')
        if (not preview_dir and q.get('review', {}).get('status') != 'verified') or not q.get('regions'):
            raise ValueError('Only visually verified questions may be published')
        if any(k in q for k in ['answer', 'answerText', 'explanation']):
            raise ValueError('Answers are outside this pipeline scope')
    for c in coverage:
        expected = [q['id'] for q in questions if any(r['page'] == c['page'] for r in q['regions'])]
        common = any(r['page'] == c['page'] for r in data.get('commonRegions', []))
        if (not preview_dir and c.get('reviewed') is not True) or sorted(c['questionIds']) != sorted(expected) or c.get('common') != common:
            raise ValueError('Coverage does not match reviewed question/common regions')
    target = f'assets/question-bank/{paper_id}'
    assets = []

    def render(regions, prefix):
        parts = []
        for n, region in enumerate(regions, 1):
            page_num, box = region['page'], region['box']
            if type(page_num) is not int or not 1 <= page_num <= len(doc):
                raise ValueError('Invalid 1-based PDF page')
            if len(box) != 4 or not all(isinstance(v, (int, float)) and math.isfinite(v) for v in box):
                raise ValueError('Invalid crop coordinates')
            page = doc[page_num-1]
            # Rotated PDFs need an explicit reviewed coordinate transformation first.
            if page.rotation:
                raise ValueError('Rotated page: normalize a derived copy and re-review coordinates first')
            rect = fitz.Rect(box)
            if rect.is_empty or not page.rect.contains(rect):
                raise ValueError('Crop is outside source page')
            pix = page.get_pixmap(matrix=fitz.Matrix(scale, scale), clip=rect, alpha=False)
            png = pix.tobytes('png')
            relative = f'{target}/{prefix}-{n:02}.png'
            assets.append((inside(output_root, relative), png))
            parts.append({'src': relative, 'page': page_num, 'box': box, 'width': pix.width, 'height': pix.height,
                          'label': region['label'], 'sha256': hashlib.sha256(png).hexdigest()})
        return parts

    output = {k: data[k] for k in ['schemaVersion', 'id', 'title', 'source']}
    output['commonParts'] = render(data.get('commonRegions', []), 'common')
    output['questions'] = []
    for q in questions:
        item = {k: q[k] for k in ['id', 'number', 'title', 'titleKind', 'topics', 'summary', 'review']}
        if preview_dir:
            item['review'] = {**item['review'], 'status': 'draft'}
        item['parts'] = render(q['regions'], q['id'])
        output['questions'].append(item)
    output['coverage'] = coverage
    json_bytes = (json.dumps(output, ensure_ascii=False, indent=2) + '\n').encode()
    assets.append((inside(output_root, target + '/paper.json'), json_bytes))
    if check:
        for path, content in assets:
            if not path.exists() or path.read_bytes() != content:
                raise ValueError('Generated asset differs or missing: ' + str(path.relative_to(output_root)))
    else:
        for path, content in assets:
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_bytes(content)
    print(f'{paper_id}: {len(questions)} questions, {len(assets)-1} crops; ' + ('verified' if check else 'built'))
    return output


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--repo', type=Path, default=Path.cwd())
    parser.add_argument('--manifest', type=Path, required=True)
    parser.add_argument('--check', action='store_true')
    parser.add_argument('--preview-dir', type=Path, help='Render draft assets outside production directories; keeps draft review status')
    args = parser.parse_args()
    try:
        root = args.repo.resolve()
        manifest = args.manifest if args.manifest.is_absolute() else root / args.manifest
        build(root, manifest, args.check, args.preview_dir)
    except (ValueError, KeyError, OSError) as error:
        sys.exit(str(error))
