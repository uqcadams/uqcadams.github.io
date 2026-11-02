const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');let Planner,stored;
class Component{setState(p){Object.assign(this.state,typeof p==='function'?p(this.state):p)}}
const ctx={React:{Component,createElement:(type,props,...children)=>({type,props:props||{},children})},ReactDOM:{render:e=>Planner=e.type},document:{getElementById:()=>null},localStorage:{getItem:()=>stored||null,setItem:(k,v)=>stored=v},window:{},console};
vm.runInNewContext(fs.readFileSync('work/index.html','utf8').split('<script>')[3].split('</script>')[0],ctx);const g=ctx.window.ACM1_GEOMETRY,p=new Planner({});
const rows=g.parseRosterOCR(fs.readFileSync('work/sample-ocr.txt','utf8'),'sample');assert.equal(rows.length,8);for(const [name,level] of [['Muffy69',28],['Mikix',26],['2MuchTuna',28],['Turki-f',29],['FuryFireSw',24],['Tiffiany83',26]])assert(rows.some(r=>r.name===name&&r.level===level),name);
assert.equal(g.mergeRosterCandidates(rows.concat(rows)).length,8);
const conflict=g.mergeRosterCandidates([{name:'Mikix',level:26},{name:'mikix',level:27}]);assert.equal(conflict.length,1);assert(conflict[0].warning);
p.state.ocrRows=[{name:'Don McPuñetazo',level:30,include:true},{name:'Mikix',level:26,include:true},{name:'Don McPuñetazo',level:30,include:true}];p.importRosterPool();assert.equal(p.state.pool.length,2);assert.equal(p.state.homes.length,0);
p.save();const reloaded=new Planner({});assert.equal(reloaded.state.pool[0].name,'Don McPuñetazo');assert.equal(reloaded.state.pool[0].level,30);
p.state.selectedPoolId=p.state.pool[0].id;assert.equal(p.deployPoolAt({x:500,y:517}),false);assert.equal(p.state.pool.length,2);
assert.equal(p.deployPoolAt({x:500,y:536}),true);assert.equal(p.state.pool.length,1);assert.equal(p.state.homes[0].name,'Don McPuñetazo');assert.equal(p.state.homes[0].level,30);assert(!p.state.homes[0].hasMoved);assert(!p.state.homes[0].locked);
p.state.ocrRows=[{name:'Don McPuñetazo',level:30,include:true},{name:'Mikix',level:26,include:true}];p.importRosterPool();assert.equal(p.state.pool.length,1);
p.state.ocrRows=[{name:'Bad level',level:0,include:true}];p.importRosterPool();assert.equal(p.state.pool.length,1);
p.save();const reloadedAfterDeploy=new Planner({});assert.equal(reloadedAfterDeploy.state.homes[0].level,30);assert.equal(reloadedAfterDeploy.state.pool.length,1);
console.log('Sample OCR pairing, overlapping screenshot dedupe, conflicting levels, review validation, accents, pool persistence, map deployment, exclusion rejection, and level preservation passed');
