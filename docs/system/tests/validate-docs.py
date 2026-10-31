#!/usr/bin/env python3
"""Validate preservation artefacts; stdlib-only except optional YAML structural check."""
from pathlib import Path
import json,csv,re,hashlib,subprocess
D=Path(__file__).resolve().parents[1];R=D.parents[1]
reg=json.loads((D/'feature-registry.json').read_text());caps=reg['capabilities'];ids=[c['id'] for c in caps];assert ids and len(ids)==len(set(ids))
required=['name','description','entry_points','user_actions','triggering_events','preconditions','inputs','outputs','state_and_models','business_rules','side_effects','dependencies','related_capabilities','source_references','existing_tests','coverage_gaps','known_limitations','verification_status','regression_risks']
for c in caps:
 for k in required:assert k in c,(c['id'],k)
 for s in c['source_references']:
  f=R/s['path'];assert f.is_file(),s
  lines=f.read_text().splitlines();assert 1<=s['line']<=len(lines),s
  assert s['symbol'] in lines[s['line']-1],s
 for p in c['existing_tests']+c.get('new_characterisation_tests',[]):assert (R/p).is_file(),(c['id'],p)
 assert set(c['related_capabilities'])<=set(ids)
 assert c['user_actions'] and c['preconditions'] and c['business_rules'] and c['regression_risks']
 assert c['business_rules'] != [c['description']]
 assert c['regression_risks'] != ['Preserve inputs, gating, state mutation and side effects together; see risk register.']
 assert all(str(v).strip() for v in c['user_actions'] if isinstance(v,str))
with (D/'traceability-matrix.csv').open() as f:assert {x['Capability'] for x in csv.DictReader(f)}==set(ids)
for entry in json.loads((D/'source-manifest.json').read_text()):
 f=R/entry['path'];assert f.is_file(),entry['path'];assert hashlib.sha256(f.read_bytes()).hexdigest()==entry['sha256'],entry['path']
for entry in json.loads((D/'historical-tests.json').read_text()):assert hashlib.sha256((D/entry['evidence_copy']).read_bytes()).hexdigest()==entry['sha256']
for f in D.rglob('*.md'):
 if '/evidence/' in str(f):continue # historical docs preserved, old links may target their original repository
 for target in re.findall(r'\]\(([^)]+)\)',f.read_text()):
  if target.startswith(('https:','http:','mailto:','#')):continue
  target=target.split('#')[0]
  if target:assert (f.parent/target).exists(),(str(f.relative_to(D)),target)
try:
 import yaml
 api=yaml.safe_load((D/'openapi.yaml').read_text());assert api['openapi']=='3.1.0';assert api['paths']
 def walk(x):
  if isinstance(x,dict):
   if '$ref'in x:
    bits=x['$ref'].split('/')[1:];v=api
    for b in bits:v=v[b]
   for v in x.values():walk(v)
  elif isinstance(x,list):
   for v in x:walk(v)
 walk(api)
 print('OpenAPI structure and internal references valid (PyYAML available).')
except ImportError:print('PyYAML unavailable: YAML structure validation skipped; source/API references still checked.')
print(f'{len(caps)} registry entries, source hashes/lines, test links, traceability and documentation paths valid.')
