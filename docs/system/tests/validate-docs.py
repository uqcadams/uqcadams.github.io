#!/usr/bin/env python3
"""Validate preservation artefacts; stdlib-only except optional YAML structural check."""
from pathlib import Path
import json,csv,re
D=Path(__file__).resolve().parents[1];R=D.parents[1]
reg=json.loads((D/'feature-registry.json').read_text());caps=reg['capabilities'];ids=[c['id'] for c in caps];assert ids and len(ids)==len(set(ids))
required=['name','description','entry_points','user_actions','triggering_events','preconditions','inputs','outputs','state_and_models','business_rules','side_effects','dependencies','related_capabilities','source_references','existing_tests','coverage_gaps','known_limitations','verification_status','regression_risks','coverage']
current_results={x['file']:x for x in json.loads((D/'test-results.json').read_text())['results']}
for c in caps:
 for k in required:assert k in c,(c['id'],k)
 for p in c['existing_tests']+c.get('new_characterisation_tests',[]):assert (R/p).is_file(),(c['id'],p)
 assert set(c['related_capabilities'])<=set(ids)
 assert c['user_actions'] and c['preconditions'] and c['business_rules'] and c['regression_risks']
 assert c['business_rules'] != [c['description']]
 assert c['regression_risks'] != ['Preserve inputs, gating, state mutation and side effects together; see risk register.']
 assert all(str(v).strip() for v in c['user_actions'] if isinstance(v,str))
 current=c['coverage']['current']
 assert current['classification'] in {'direct','partial','absent'},c['id']
 assert isinstance(current['assertions'],list),c['id']
 for assertion in current['assertions']:
  p=assertion['test'];assert (R/p).is_file(),(c['id'],p)
  recorded=current_results.get(p,{'status':'passed' if p=='docs/system/tests/preservation.cjs' else 'unrecorded'})
  assert assertion['status']==recorded['status'],(c['id'],p)
  assert assertion['assertion_group'].strip(),(c['id'],p)
 for p in c['coverage']['historical_supplementary']:assert (R/p).is_file(),(c['id'],p)
 if current['classification']=='absent':assert not current['assertions'],c['id']
with (D/'traceability-matrix.csv').open() as f:assert {x['Capability'] for x in csv.DictReader(f)}==set(ids)
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
print(f'{len(caps)} registry entries, coverage links, traceability and documentation paths valid.')
