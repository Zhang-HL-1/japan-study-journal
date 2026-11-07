#!/usr/bin/env python3
"""Offline regression tests for immutable hosted PDF resolution."""
import hashlib
import importlib.util
import io
import json
import copy
import os
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch

spec = importlib.util.spec_from_file_location('builder', Path(__file__).with_name('build_question_assets.py'))
builder = importlib.util.module_from_spec(spec)
spec.loader.exec_module(builder)


class SourceCacheTests(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory()
        self.addCleanup(self.temporary.cleanup)
        self.base = Path(self.temporary.name).resolve()
        self.root = self.base / 'repo'
        self.root.mkdir()
        self.cache = self.base / 'cache'
        self.data = b'%PDF-1.7\nimmutable fixture bytes\n'
        self.sha = hashlib.sha256(self.data).hexdigest()
        self.url = 'https://zhang-hl-1.github.io/japan-study-journal-papers-2/utokyo/' + self.sha + '.pdf'
        self.source = {'pdf': self.url, 'sha256': self.sha}
        environment = patch.dict(os.environ, {'QUESTION_PDF_CACHE': str(self.cache)})
        environment.start()
        self.addCleanup(environment.stop)

    def response(self, data=None, url=None):
        response = io.BytesIO(self.data if data is None else data)
        response.geturl = lambda: self.url if url is None else url
        return response

    def test_download_then_offline_cache_hit(self):
        with patch.object(builder, 'urlopen', return_value=self.response()) as download:
            result = builder.source_pdf(self.root, self.source)
            download.assert_called_once_with(self.url, timeout=60)
        self.assertEqual(result, self.cache / (self.sha + '.pdf'))
        self.assertEqual(result.read_bytes(), self.data)
        self.assertFalse(result.is_relative_to(self.root))
        with patch.object(builder, 'urlopen', side_effect=AssertionError('cache must not download')):
            self.assertEqual(builder.source_pdf(self.root, self.source), result)

    def test_wrong_download_never_populates_cache(self):
        with patch.object(builder, 'urlopen', return_value=self.response(b'wrong bytes')):
            with self.assertRaisesRegex(ValueError, 'Downloaded source SHA-256 mismatch'):
                builder.source_pdf(self.root, self.source)
        self.assertEqual(list(self.cache.iterdir()), [])

    def test_corrupt_cache_rejected(self):
        self.cache.mkdir()
        (self.cache / (self.sha + '.pdf')).write_bytes(b'corrupt')
        with patch.object(builder, 'urlopen', side_effect=AssertionError('must reject corrupt cache')):
            with self.assertRaisesRegex(ValueError, 'Cached source SHA-256 mismatch'):
                builder.source_pdf(self.root, self.source)

    def test_unapproved_or_hash_inconsistent_urls_rejected_before_network(self):
        urls = [self.url.replace('https:', 'http:'), self.url.replace('zhang-hl-1.github.io', 'example.org'),
                self.url + '?download=1', self.url + '#page=2', self.url.replace('/utokyo/', '/../'),
                self.url.replace(self.sha, '0' * 64), self.url.replace('papers-2', 'papers-3')]
        with patch.object(builder, 'urlopen', side_effect=AssertionError('unapproved URL requested')):
            for url in urls:
                with self.subTest(url=url), self.assertRaises(ValueError):
                    builder.source_pdf(self.root, {**self.source, 'pdf': url})

    def test_cache_inside_repo_and_symlink_into_repo_rejected(self):
        for cache in [self.root, self.root / 'cache']:
            with patch.dict(os.environ, {'QUESTION_PDF_CACHE': str(cache)}):
                with self.assertRaisesRegex(ValueError, 'outside the repository'):
                    builder.source_pdf(self.root, self.source)
        link = self.base / 'cache-link'
        link.symlink_to(self.root, target_is_directory=True)
        with patch.dict(os.environ, {'QUESTION_PDF_CACHE': str(link)}):
            with self.assertRaisesRegex(ValueError, 'outside the repository'):
                builder.source_pdf(self.root, self.source)

    def test_cache_entry_symlink_rejected(self):
        self.cache.mkdir()
        local = self.root / 'source.pdf'
        local.write_bytes(self.data)
        (self.cache / (self.sha + '.pdf')).symlink_to(local)
        with self.assertRaisesRegex(ValueError, 'symlink'):
            builder.source_pdf(self.root, self.source)

    def test_redirect_rejected(self):
        with patch.object(builder, 'urlopen', return_value=self.response(url='https://example.org/source.pdf')):
            with self.assertRaisesRegex(ValueError, 'redirect'):
                builder.source_pdf(self.root, self.source)
        self.assertEqual(list(self.cache.iterdir()), [])

    def test_legacy_local_path_and_hash_gate(self):
        local = self.root / 'source.pdf'
        local.write_bytes(self.data)
        with patch.object(builder, 'urlopen', side_effect=AssertionError('local source must not download')):
            self.assertEqual(builder.source_pdf(self.root, {**self.source, 'pdf': 'source.pdf'}), local)
            with self.assertRaisesRegex(ValueError, 'Source SHA-256 mismatch'):
                builder.source_pdf(self.root, {'pdf': 'source.pdf', 'sha256': '0' * 64})
            with self.assertRaisesRegex(ValueError, 'escapes repository'):
                builder.source_pdf(self.root, {**self.source, 'pdf': '../source.pdf'})


class ExcludedRotationTests(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory()
        self.addCleanup(self.temporary.cleanup)
        self.base = Path(self.temporary.name).resolve()
        self.root = self.base / 'repo'
        self.root.mkdir()
        doc = builder.fitz.open()
        doc.new_page(width=595, height=842).insert_text((60, 100), 'Problem 1')
        doc.new_page(width=595, height=842).set_rotation(180)
        original = doc.tobytes()
        (self.root / 'fixture.pdf').write_bytes(original)
        doc.close()
        self.manifest = self.root / 'manifest.json'
        self.data = {
            'schemaVersion': 1, 'id': 'rotation-fixture', 'title': 'Rotation fixture',
            'source': {'pdf': 'fixture.pdf', 'sha256': hashlib.sha256(original).hexdigest(), 'pageCount': 2},
            'commonRegions': [],
            'questions': [{'id': 'rotation-fixture-q1', 'number': '1', 'title': 'Fixture',
                           'titleKind': 'editorial', 'topics': [], 'summary': 'Fixture',
                           'regions': [{'page': 1, 'box': [50, 80, 550, 120], 'label': 'Question'}],
                           'review': {'status': 'verified'}}],
            'coverage': [{'page': 1, 'questionIds': ['rotation-fixture-q1'], 'common': False, 'excluded': '', 'reviewed': True},
                         {'page': 2, 'questionIds': [], 'common': False, 'excluded': 'Duplicate English page', 'reviewed': True}]
        }

    def write(self, data):
        self.manifest.write_text(json.dumps(data))

    def test_only_excluded_page_rotated_can_preview_publish_and_check(self):
        self.write(self.data)
        output = builder.build(self.root, self.manifest, preview_dir=self.base / 'preview')
        self.assertEqual(output['questions'][0]['review']['status'], 'draft')
        self.assertFalse((self.root / 'assets').exists())
        builder.build(self.root, self.manifest)
        builder.build(self.root, self.manifest, check=True)
        self.assertEqual(output['coverage'][1]['questionIds'], [])

    def test_rotated_question_or_common_page_still_rejected(self):
        for common in [False, True]:
            data = copy.deepcopy(self.data)
            region = {'page': 2, 'box': [50, 80, 550, 120], 'label': 'Rotated'}
            if common:
                data['commonRegions'] = [region]
            else:
                data['questions'][0]['regions'] = [region]
            self.write(data)
            with self.subTest(common=common), self.assertRaisesRegex(ValueError, 'Rotated page'):
                builder.build(self.root, self.manifest, preview_dir=self.base / 'preview')
            with self.assertRaisesRegex(ValueError, 'Rotated page'):
                builder.build(self.root, self.manifest)


if __name__ == '__main__':
    unittest.main()
