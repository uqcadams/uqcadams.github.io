import assert from 'node:assert/strict';
import {readFileSync,mkdtempSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';import {join} from 'node:path';
import worker,{aiImport} from '../worker/index.js';import {sqliteD1} from './sqlite-d1.mjs';
const dir=mkdtempSync(join(tmpdir(),'lastz-budget-')),path=join(dir,'budget.sqlite'),DB=sqliteD1(path);DB.schema(readFileSync(new URL('../drizzle/0000_rooms.sql',import.meta.url),'utf8'));
const KEY='ai-lifetime-usd-micros-v1',env={DB,OPENAI_API_KEY:'test-key',AI_IMPORT_PASSCODE:'test-pass'},image='data:image/jpeg;base64,aGVsbG8=';
const request=()=>new Request('https://service.test/api/import-ai',{method:'POST',headers:{'Content-Type':'application/json','X-Import-Passcode':'test-pass'},body:JSON.stringify({images:[image]})});
const status=async(code='test-pass')=>{const response=await worker.fetch(new Request('https://service.test/api/import-ai/budget',{headers:{'X-Import-Passcode':code}}),env);return {status:response.status,body:await response.json()};};
const count=async()=>Number((await DB.prepare('SELECT count FROM rate_limits WHERE key=?').bind(KEY).first()).count);
const set=async n=>DB.prepare('UPDATE rate_limits SET count=? WHERE key=?').bind(n,KEY).run();
const output=(usage={input_tokens:1000,output_tokens:100})=>Response.json({status:'completed',usage,output:[{content:[{type:'output_text',text:'[{"name":"Alpha","level":27}]'}]}]});
try{
 assert.equal((await status('wrong')).status,403);const first=await status();assert.equal(first.body.limitUsd,5);assert.equal(first.body.accountedUsd,.1);assert(first.body.canImport);await status();assert.equal(await count(),100000);
 let calls=0;await aiImport(request(),env,async()=>{calls++;assert.equal(await count(),450000);return output();});assert.equal(await count(),100175);assert.equal(calls,1);
 // Reopening storage (and repeated status calls) never resets lifetime spend.
 const reopened=sqliteD1(path);assert.equal((await reopened.prepare('SELECT count FROM rate_limits WHERE key=?').bind(KEY).first()).count,100175);
 await set(4800000);await assert.rejects(aiImport(request(),env,async()=>{calls++;return output();}),e=>e.status===429&&e.message.includes('US$5 lifetime'));assert.equal(calls,1);assert.equal(await count(),4800000);
 // A request which times out may still be billed, so the full reservation remains.
 await set(100000);await assert.rejects(aiImport(request(),env,async()=>{throw Error('timeout');}),e=>e.status===504);assert.equal(await count(),450000);
 await set(100000);await aiImport(request(),env,async()=>output(null));assert.equal(await count(),450000);
 // Two simultaneous requests with room for only one: only one reaches OpenAI.
 await set(4500000);let release;const gate=new Promise(r=>release=r);calls=0;const invoke=async()=>{calls++;await gate;return output();};const one=aiImport(request(),env,invoke);const two=aiImport(request(),env,invoke);const results=Promise.allSettled([one,two]);await new Promise(r=>setTimeout(r,1500));release();const settled=await results;assert.equal(calls,1);assert.equal(settled.filter(r=>r.status==='fulfilled').length,1);assert(settled.some(r=>r.status==='rejected'&&r.reason.status===429));assert(await count()<=5000000);
 // DB failure must stop before any model call.
 calls=0;await assert.rejects(aiImport(request(),{...env,DB:{prepare(){throw Error('DB unavailable')}}},async()=>{calls++;return output();}));assert.equal(calls,0);
 console.log('Lifetime budget: authenticated status, one-time historical allowance, pre-call reserve, settlement, persistence, hard stop, unknown charges held, concurrent atomic enforcement and fail-closed DB errors passed.');
}finally{rmSync(dir,{recursive:true,force:true});}
