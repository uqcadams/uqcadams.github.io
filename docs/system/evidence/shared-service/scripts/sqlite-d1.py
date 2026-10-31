import sqlite3,json,sys
path=sys.argv[1]
data=json.load(sys.stdin)
conn=sqlite3.connect(path,timeout=15)
conn.row_factory=sqlite3.Row
try:
 if 'schema' in data:
  conn.executescript(data['schema']); out=[]
 else:
  conn.execute('BEGIN IMMEDIATE')
  out=[]
  for stmt in data['statements']:
   before=conn.total_changes
   cur=conn.execute(stmt['sql'],stmt.get('args',[]))
   rows=[dict(r) for r in cur.fetchall()] if cur.description else []
   out.append({'results':rows,'meta':{'changes':conn.total_changes-before}})
  conn.commit()
 print(json.dumps(out))
except Exception as exc:
 conn.rollback();print(json.dumps({'error':str(exc)}));sys.exit(1)
finally:conn.close()
