#!/usr/bin/env python3
"""Exercise publication gates and preview isolation against the actual two-page fixture."""
import argparse
import copy
import importlib.util
import json
from pathlib import Path
import tempfile

parser=argparse.ArgumentParser();parser.add_argument('--repo',type=Path,default=Path.cwd());args=parser.parse_args();root=args.repo.resolve()
spec=importlib.util.spec_from_file_location('builder',Path(__file__).with_name('build_question_assets.py'));builder=importlib.util.module_from_spec(spec);spec.loader.exec_module(builder)
fixture=root/'data/question-manifests/kobe-ee-2026-denjiki.json';data=json.loads(fixture.read_text())
builder.build(root,fixture,True)
with tempfile.TemporaryDirectory() as tmp:
 tmp=Path(tmp)
 def reject(change):
  d=copy.deepcopy(data);change(d);p=tmp/'bad.json';p.write_text(json.dumps(d));
  try:builder.build(root,p,True)
  except ValueError:return
  raise AssertionError('Invalid manifest was accepted')
 reject(lambda d:d['source'].update(sha256='0'*64))
 reject(lambda d:d['questions'][0]['review'].update(status='draft'))
 reject(lambda d:d['questions'][0]['regions'][0].update(box=[0,0,99999,99999]))
 reject(lambda d:d['coverage'].pop())
 reject(lambda d:d['coverage'][0].update(questionIds=[]))
 reject(lambda d:d['questions'][0].update(answer='not allowed'))
 draft=copy.deepcopy(data);draft['questions'][0]['review']['status']='draft';draft['coverage'][0]['reviewed']=False
 p=tmp/'draft.json';p.write_text(json.dumps(draft));output=builder.build(root,p,preview_dir=tmp/'preview')
 assert all(q['review']['status']=='draft' for q in output['questions'])
 assert (tmp/'preview/assets/question-bank/kobe-ee-2026-denjiki/paper.json').exists()
 assert json.loads((root/'assets/question-bank/kobe-ee-2026-denjiki/paper.json').read_text())['questions'][0]['review']['status']=='verified'
print('Builder gates and isolated draft preview passed.')
