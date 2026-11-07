'use strict';
const fs = require('node:fs');
const crypto = require('node:crypto');
const hosts = require('../data/full-paper-pdf-hosts.json');

function hostedSha(url) {
  const bare = String(url).split(/[?#]/)[0];
  const match = bare.match(/\/([a-f0-9]{64})\.pdf$/);
  const entry = match && hosts.files[match[1]];
  if (!entry || entry.url !== bare) throw new Error('unmapped hosted PDF: ' + url);
  return match[1];
}

function hash(file, read) {
  if (typeof file === 'string' && file.startsWith('https://')) return hostedSha(file);
  return crypto.createHash('sha256').update(read()).digest('hex');
}

function assertRecord(assert, record, urlField = 'path') {
  const entry = hosts.files[record.sha256];
  assert.ok(entry, record.sha256);
  assert.equal(record[urlField], entry.url);
  const size = record.byteSize !== undefined ? record.byteSize : record.bytes;
  assert.equal(size, entry.byteSize);
}

module.exports = { hosts, hostedSha, hash, assertRecord };
