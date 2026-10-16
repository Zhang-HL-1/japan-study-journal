(function () {
  'use strict';
  const core = window.AnswersCore;
  const data = window.ANSWERS_DATA;
  const $ = id => document.getElementById(id);

  function note(message) {
    const el = $('answer-error');
    el.hidden = !message;
    el.textContent = message || '';
  }

  if (!core || !Array.isArray(data?.books)) {
    note('答案暂时无法载入，请刷新页面。');
    return;
  }

  const books = data.books.filter(core.validBook);
  if (books.length !== data.books.length) note('部分练习册未能载入，其余仍可阅读。');
  $('answer-total').textContent = String(books.length);

  const shelf = $('answer-shelf');
  const reader = $('answer-reader');
  let current = null;
  let frameURL = '';

  function el(tag, text, cls) {
    const node = document.createElement(tag);
    if (text !== undefined) node.textContent = text;
    if (cls) node.className = cls;
    return node;
  }

  function mount(url, title) {
    const frame = el('iframe');
    frame.className = 'answer-frame';
    frame.title = title;
    frame.referrerPolicy = 'no-referrer';
    frame.setAttribute('src', url);
    frameURL = url;
    $('answer-frame-slot').replaceChildren(frame);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    frame.scrollIntoView({ block: 'nearest', behavior: reduce ? 'auto' : 'smooth' });
  }

  function renderShelf() {
    shelf.replaceChildren();
    if (!books.length) {
      shelf.append(el('p', '书架还空着。练习册答案会逐本放上来。', 'papers-footnote'));
      return;
    }
    books.forEach((book, index) => {
      const button = el('button', undefined, 'answer-book');
      button.type = 'button';
      button.dataset.book = book.id;
      const cover = el('span', undefined, 'answer-cover');
      cover.setAttribute('aria-hidden', 'true');
      const face = el('span', book.spine, 'answer-spine-face' + (index % 2 ? ' is-ink' : ''));
      face.lang = 'ja';
      cover.append(face);
      const copy = el('span', undefined, 'answer-book-copy');
      copy.append(el('span', '练习册答案', 'answer-book-kicker'));
      copy.append(el('strong', book.shortTitle));
      const authors = el('span', book.authors);
      authors.lang = 'ja';
      copy.append(authors);
      copy.append(el('span', `${book.answers.length} 题 · ${book.pages} 页`));
      button.append(cover, copy);
      button.addEventListener('click', () => openBook(book.id));
      shelf.append(button);
    });
  }

  function setChoices(matches, opened) {
    const box = $('answer-choices');
    box.replaceChildren();
    if (!matches || matches.length < 2) return;
    matches.forEach(match => {
      const button = el('button', `第${match.chapter}章 ${match.chapterTitle} · 第${match.page}页`);
      button.type = 'button';
      button.lang = 'ja';
      button.dataset.chapter = String(match.chapter);
      button.dataset.label = match.label;
      button.setAttribute('aria-pressed', String(Boolean(opened && opened.chapter === match.chapter && opened.label === match.label)));
      button.addEventListener('click', () => goTo(match));
      box.append(button);
    });
  }

  function goTo(match) {
    if (!current) return;
    const url = core.fileURL(current, match.page);
    if (!url) {
      $('answer-status').textContent = '这一页不在索引里，没有跳转。';
      return;
    }
    const label = current.numbering === 'chapter-ordinal' ? `問題${match.label}` : `問題 ${match.label}`;
    mount(url, `${current.shortTitle} · 第${match.chapter}章${label}`);
    $('answer-status').textContent = current.numbering === 'chapter-ordinal'
      ? `已打开第${match.chapter}章問題${match.label}，从第 ${match.page} 页开始。`
      : `已打开第${match.chapter}章的問題 ${match.label}，从第 ${match.page} 页开始。`;
    $('answer-choices').querySelectorAll('button').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.chapter === String(match.chapter) && button.dataset.label === match.label));
    });
  }

  function showBook(book) {
    current = book;
    shelf.hidden = Boolean(book);
    reader.hidden = !book;
    document.querySelector('.answers-main .papers-heading').hidden = Boolean(book);
    if (!book) {
      $('answer-frame-slot').replaceChildren();
      frameURL = '';
      return;
    }
    $('answer-book-kicker').textContent = book.authors;
    $('answer-book-title').textContent = book.shortTitle;
    $('answer-book-meta').textContent = `${book.title} · ${book.answers.length} 题 · ${book.pages} 页`;
    $('answer-hint').textContent = core.hint(book);
    $('answer-query').value = '';
    $('answer-status').textContent = '从第 1 页开始。可以滚动阅读，也可以输入题号跳到该题解答。';
    $('answer-choices').replaceChildren();
    const actions = $('answer-actions');
    actions.replaceChildren();
    const url = core.fileURL(book);
    const opened = el('a', '在新窗口打开 ↗');
    opened.href = url;
    opened.target = '_blank';
    opened.rel = 'noopener noreferrer';
    const download = el('a', '下载 PDF ↓');
    download.href = url;
    download.download = book.sourceName;
    actions.append(opened, download);
    mount(url, book.shortTitle);
    reader.focus({ preventScroll: true });
    reader.scrollIntoView({ block: 'start', behavior: 'auto' });
  }

  function openBook(id) {
    const book = books.find(item => item.id === id);
    if (!book) {
      history.pushState({}, '', 'answers.html');
      showBook(null);
      note('书架上没有这本练习册。');
      return;
    }
    note('');
    history.pushState({ book: id }, '', `answers.html?book=${encodeURIComponent(id)}`);
    showBook(book);
  }

  function readQuery() {
    const id = new URLSearchParams(window.location.search).get('book');
    if (!id) {
      showBook(null);
      return;
    }
    const book = books.find(item => item.id === id);
    if (!book) {
      showBook(null);
      note('书架上没有这本练习册。');
      return;
    }
    note('');
    showBook(book);
  }

  $('answer-back').addEventListener('click', () => {
    note('');
    history.pushState({}, '', 'answers.html');
    const previous = current?.id;
    showBook(null);
    if (previous) shelf.querySelector(`[data-book="${CSS.escape(previous)}"]`)?.focus();
  });

  $('answer-from-start').addEventListener('click', () => {
    if (!current) return;
    mount(core.fileURL(current), current.shortTitle);
    $('answer-status').textContent = '已回到第 1 页。可以滚动阅读。';
    $('answer-choices').querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', 'false'));
  });

  $('answer-jump').addEventListener('submit', event => {
    event.preventDefault();
    if (!current) return;
    const result = core.lookup(current, $('answer-query').value);
    $('answer-status').textContent = result.message;
    setChoices(result.matches, result.action === 'open' ? result.opened : null);
    if (result.action !== 'open') return;
    const url = core.fileURL(current, result.page);
    if (!url) {
      $('answer-status').textContent = '索引里的页码无法打开，没有跳转。';
      return;
    }
    mount(url, `${current.shortTitle} · 第 ${result.page} 页`);
  });

  window.addEventListener('popstate', readQuery);
  renderShelf();
  readQuery();
})();
