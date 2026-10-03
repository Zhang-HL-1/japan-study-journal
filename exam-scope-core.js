(function (root) {
  'use strict';
  const officialDomains = ['u-tokyo.ac.jp', 'kyoto-u.ac.jp', 'isct.ac.jp', 'titech.ac.jp', 'waseda.jp', 'tus.ac.jp'];
  function normalize(value) { return String(value || '').normalize('NFKC').toLocaleLowerCase().replace(/\s+/g, ' ').trim(); }
  function sourceURL(source) {
    try {
      const url = new URL(source.url);
      if (url.protocol !== 'https:' || url.username || url.password || !officialDomains.some(domain => url.hostname === domain || url.hostname.endsWith('.' + domain))) return null;
      if (source.kind === 'pdf' && Number.isInteger(source.pdfPage) && source.pdfPage > 0) url.hash = 'page=' + source.pdfPage;
      return url.href;
    } catch { return null; }
  }
  function validRecord(record, universities) {
    return !!(record && typeof record.id === 'string' && record.id && universities.some(u => u.id === record.universityId) &&
      ['general', 'international'].includes(record.admissionType) && ['graduateSchool', 'department', 'selectionName', 'entryYear', 'verifiedAt'].every(key => typeof record[key] === 'string' && record[key].trim()) &&
      Array.isArray(record.sources) && record.sources.length && record.sources.every(source => source && typeof source.label === 'string' && source.label.trim() && ['pdf', 'page'].includes(source.kind) && sourceURL(source)));
  }
  function matchesAdmission(record, admissionType) {
    return record.admissionType === admissionType || (admissionType === 'international' && record.admissionType === 'general' && record.internationalGeneral === true);
  }
  function filter(records, universities, state) {
    const terms = normalize(state.query).split(' ').filter(Boolean);
    return records.filter(record => {
      if (!matchesAdmission(record, state.admissionType) || (state.universityId !== 'all' && record.universityId !== state.universityId) ||
        (state.graduateSchool !== 'all' && record.graduateSchool !== state.graduateSchool) || (state.department !== 'all' && record.department !== state.department) ||
        (state.entryYear !== 'all' && record.entryYear !== state.entryYear)) return false;
      const university = universities.find(u => u.id === record.universityId);
      const text = normalize([university?.name, ...(university?.aliases || []), record.graduateSchool, record.department, record.course, record.selectionName,
        record.subjectsOriginal, record.scopeOriginal, record.conditionsOriginal, record.entryYear].join(' '));
      return terms.every(term => text.includes(term));
    });
  }
  const api = { normalize, sourceURL, validRecord, matchesAdmission, filter };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.ExamScopeCore = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
