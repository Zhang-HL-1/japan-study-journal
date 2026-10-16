(function (root) {
  'use strict';
  // 练习册答案的题号解析。与过去问目录分开。
  // 过去问答案将来应使用单独数据，不要从这里跳进 past-papers。
  const schemes = ['printed-label', 'chapter-ordinal'];

  function canon(code) {
    return code.split('.').map(part => String(Number(part))).join('.');
  }

  function parseQuery(raw) {
    let text = String(raw ?? '').normalize('NFKC').replace(/[\s\u3000]/g, '');
    if (!text) return { error: 'empty' };
    text = text.replace(/問題|问题/g, '').replace(/解答例|解答|答案/g, '');
    text = text.replace(/[。.．.]+$/g, '');
    let chapter = null;
    const marked = text.match(/^(?:第)?(\d+)章(.*)$/);
    if (marked) {
      chapter = Number(marked[1]);
      text = marked[2].replace(/^[.．。]+/, '').replace(/[。.．.]+$/g, '');
    }
    if (!/^\d+(?:\.\d+)*$/.test(text)) return { error: 'format' };
    const code = canon(text);
    if (!/^\d+(?:\.\d+)*$/.test(code) || code.split('.').some(part => !part || Number(part) > 100000 || !Number.isSafeInteger(Number(part)))) return { error: 'format' };
    return { chapter, code };
  }

  function chapterTitle(book, number) {
    const found = (book.chapters || []).find(item => item.number === number);
    return found && typeof found.title === 'string' ? found.title : '';
  }

  function decorate(book, row) {
    return { chapter: row.chapter, label: row.label, page: row.page, chapterTitle: chapterTitle(book, row.chapter) };
  }

  function byLabel(book, label) {
    return (book.answers || []).filter(row => row.label === label).map(row => decorate(book, row)).sort((a, b) => a.chapter - b.chapter || a.page - b.page);
  }

  function stay(message, matches) {
    return { action: 'stay', message, matches: matches || [] };
  }

  function open(message, opened, matches) {
    return { action: 'open', message, page: opened.page, opened, matches };
  }

  function unrecognized() {
    return stay('没有识别出题号。可以输入 1.1、1.1. 或 問題1.1。');
  }

  function lookupPrinted(book, parsed) {
    if (!/^\d+\.\d+$/.test(parsed.code)) return stay('这本题号写成 1.1 这种形式。请输入原书题号，例如 1.1。');
    const matches = byLabel(book, parsed.code);
    if (parsed.chapter != null) {
      const hit = matches.filter(item => item.chapter === parsed.chapter);
      if (!hit.length) {
        const extra = matches.length ? `其他章有問題 ${parsed.code}，可以点选；当前页面不变。` : '所以没有跳转。';
        return stay(`第${parsed.chapter}章没有問題 ${parsed.code} 的解答。${extra}`, matches);
      }
      return open(`已打开第${hit[0].chapter}章的問題 ${hit[0].label}，从第 ${hit[0].page} 页开始。`, hit[0], matches.length > 1 ? matches : hit);
    }
    if (!matches.length) return stay(`没有找到問題 ${parsed.code} 的解答，所以没有跳转。`);
    if (matches.length === 1) return open(`已打开第${matches[0].chapter}章的問題 ${matches[0].label}，从第 ${matches[0].page} 页开始。`, matches[0], matches);
    return open(`問題 ${parsed.code} 在 ${matches.length} 个章里都有解答。已打开最早的第${matches[0].chapter}章，从第 ${matches[0].page} 页开始。需要其他章时请点选。`, matches[0], matches);
  }

  function lookupOrdinal(book, parsed) {
    let chapter = parsed.chapter;
    let label = null;
    if (chapter == null && /^\d+\.\d+$/.test(parsed.code)) {
      const parts = parsed.code.split('.');
      chapter = Number(parts[0]);
      label = parts[1];
    } else if (chapter != null && /^\d+$/.test(parsed.code)) {
      label = parsed.code;
    } else if (chapter == null && /^\d+$/.test(parsed.code)) {
      return stay('请连同章号一起输入，例如 1.1 表示第1章問題1，3.14 表示第3章問題14。');
    } else {
      return stay('请按章.题号输入，例如 1.1 或 3.14。');
    }
    const hit = (book.answers || []).filter(row => row.chapter === chapter && row.label === label).map(row => decorate(book, row));
    if (!hit.length) return stay(`没有找到第${chapter}章問題${label}的解答，所以没有跳转。`);
    return open(`已打开第${hit[0].chapter}章問題${hit[0].label}，从第 ${hit[0].page} 页开始。`, hit[0], hit);
  }

  function lookup(book, raw) {
    if (!book || !Array.isArray(book.answers)) return stay('这本答案暂时无法检索。');
    const parsed = parseQuery(raw);
    if (!parsed || parsed.error) return unrecognized();
    if (book.numbering === 'printed-label') return lookupPrinted(book, parsed);
    if (book.numbering === 'chapter-ordinal') return lookupOrdinal(book, parsed);
    return stay('这本答案的题号规则尚未设置，不能跳转。');
  }

  function fileURL(book, page) {
    if (!book || typeof book.file !== 'string' || typeof book.sha256 !== 'string') return null;
    const raw = book.file.trim();
    if (!/^assets\/answers\/documents\/[a-f0-9]{64}\.pdf$/.test(raw)) return null;
    if (raw !== `assets/answers/documents/${book.sha256}.pdf`) return null;
    if (page == null) return raw;
    if (!Number.isInteger(page) || page < 1 || !Number.isInteger(book.pages) || page > book.pages) return null;
    return `${raw}#page=${page}`;
  }

  function validBook(book) {
    if (!book || typeof book.id !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(book.id)) return false;
    if (!['shortTitle', 'title', 'authors', 'spine', 'sourceName'].every(key => typeof book[key] === 'string' && book[key].trim())) return false;
    if (!/^[A-Za-z0-9._-]+\.pdf$/.test(book.sourceName)) return false;
    if (!schemes.includes(book.numbering)) return false;
    if (!Number.isInteger(book.pages) || book.pages < 1 || book.pages > 10000) return false;
    if (!fileURL(book)) return false;
    if (!Array.isArray(book.chapters) || !book.chapters.length) return false;
    const chapters = new Set();
    for (const chapter of book.chapters) {
      if (!chapter || !Number.isInteger(chapter.number) || chapter.number < 1 || typeof chapter.title !== 'string' || !chapter.title.trim() || chapters.has(chapter.number)) return false;
      chapters.add(chapter.number);
    }
    if (!Array.isArray(book.answers) || !book.answers.length) return false;
    const seen = new Set();
    for (const row of book.answers) {
      if (!row || !chapters.has(row.chapter) || typeof row.label !== 'string' || !/^\d+(?:\.\d+)*$/.test(row.label)) return false;
      if (!Number.isInteger(row.page) || row.page < 1 || row.page > book.pages) return false;
      const key = `${row.chapter}:${row.label}`;
      if (seen.has(key)) return false;
      seen.add(key);
    }
    return true;
  }

  function hint(book) {
    if (!book) return '';
    if (book.numbering === 'chapter-ordinal') return '页眉是章内题号，例如【問題 1 · 解答】。输入 1.1 打开第1章問題1，3.14 打开第3章問題14。';
    return '页眉题号写成 1.1 这种形式，各章会重复。输入 1.1 会打开最早一章；写成第2章 1.1 则只打开该章。索引里没有的题号不会跳转。';
  }

  const api = { parseQuery, lookup, fileURL, validBook, hint };
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.AnswersCore = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
