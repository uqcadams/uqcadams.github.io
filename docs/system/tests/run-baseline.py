#!/usr/bin/env python3
"""Read-only production sources; disposable backend SQLite via existing harness.
Exit nonzero for any failure. Does not run paid/provider live test or old workspace scripts.
Writes run evidence only when --record is explicitly supplied.
"""
from pathlib import Path
import subprocess, time, json, argparse, sys
root=Path(__file__).resolve().parents[3]; docs=root/'docs/system'
parser=argparse.ArgumentParser();parser.add_argument('--record',action='store_true');args=parser.parse_args()
results=[]
for group,files,cwd in [('frontend',sorted((root/'tests').glob('*.cjs')),root),('backend',sorted((docs/'evidence/shared-service/scripts').glob('test-*.mjs')),docs/'evidence/shared-service')]:
 for f in files:
  row={'group':group,'file':str(f.relative_to(root))}
  if f.name=='test-ai-live.mjs':row.update(status='skipped',reason='Paid external provider call, credential and user-image dependency; excluded from safe baseline.');results.append(row);continue
  t=time.monotonic();p=subprocess.run(['node',str(f)],cwd=cwd,capture_output=True,text=True,timeout=180)
  log=docs/'evidence/test-results'/(group+'-'+f.stem+'.txt');output=(p.stdout+p.stderr).replace(str(root),'<repository>')
  row.update(command='node '+str(f.relative_to(cwd)),cwd=str(cwd.relative_to(root)),exit_code=p.returncode,status='passed' if p.returncode==0 else 'failed',seconds=round(time.monotonic()-t,3),log=str(log.relative_to(docs)))
  if args.record:log.parent.mkdir(parents=True,exist_ok=True);log.write_text(output)
  results.append(row);print(group,f.name,row['status'],flush=True)
if args.record:(docs/'test-results.json').write_text(json.dumps({'audit_date':'2026-10-31','results':results},indent=2)+'\n')
print('passed',sum(r['status']=='passed' for r in results),'failed',sum(r['status']=='failed' for r in results),'skipped',sum(r['status']=='skipped' for r in results))
sys.exit(any(r['status']=='failed' for r in results))
