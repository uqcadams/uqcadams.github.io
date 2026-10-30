const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');
let Planner;class Component{setState(p){Object.assign(this.state,typeof p==='function'?p(this.state):p)}}
const saved={homes:[{id:'old',name:'Saved HQ',x:500,y:517,locked:true}],excludedCells:[{x:480,y:520}],blockInner:false};
const ctx={React:{Component,createElement:type=>({type})},ReactDOM:{render:e=>Planner=e.type},document:{getElementById:()=>null},localStorage:{getItem:()=>JSON.stringify(saved)},window:{},console};
vm.runInNewContext(fs.readFileSync('work/index.html','utf8').split('<script>')[3].split('</script>')[0],ctx);
const g=ctx.window.ACM1_GEOMETRY,zone=g.capitalCells(g.INNER);
for(let x=491;x<=508;x++)assert(zone.keys.has(x+',517'),'bottom boundary inclusive');
for(const [x,y] of g.INNER)assert(zone.keys.has(x+','+y),'all corner tiles included');
assert(!zone.keys.has('500,518'));assert(g.exclusionConflicts({x:500,y:518},{inner:g.INNER,excludedCells:[]}).includes('capital exclusion'));
assert.equal(g.exclusionConflicts({x:500,y:519},{inner:g.INNER,excludedCells:[]}).length,0);
assert.equal(g.hexOuterEdges([{x:500,y:500}]).length,6);assert.equal(g.hexOuterEdges([{x:500,y:500},{x:501,y:500}]).length,10);
assert.equal(g.hexOuterEdges(g.disk({x:500,y:500},1)).length,18);
const p=new Planner({});assert.equal(p.state.homes[0].name,'Saved HQ');
for(const c of [{x:500,y:517},{x:500,y:518},{x:480,y:521}]){p.addHQ(c.x,c.y,'Blocked');assert.equal(p.state.homes.length,1);assert.equal(p.updateHQ('old',c),false);}
p.addHQ(505,519,'Clear');assert.equal(p.state.homes.length,2);
assert.equal(JSON.stringify(p.state.excludedCells),JSON.stringify(saved.excludedCells));
const status=g.geomStatus(saved.homes[0],saved.homes,g.OUTER,g.INNER,p.state);assert(!status.ok);assert(status.reasons.some(x=>x.includes('capital exclusion')));
console.log('Capital inclusive tiles, outside-centre footprint overlap, exact perimeter edges, manual exclusions, disabled legacy toggle and saved data passed. Tiles:',zone.cells.length,'outer edges:',g.hexOuterEdges(zone.cells).length);
