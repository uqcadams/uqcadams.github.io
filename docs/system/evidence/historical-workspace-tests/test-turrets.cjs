const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');
const source=fs.readFileSync('work/index.html','utf8').split('<script>')[3].split('</script>')[0];
let Planner;class Component{setState(p,cb){Object.assign(this.state,typeof p==='function'?p(this.state):p);if(cb)cb();}}
const saved={homes:[{id:'saved',name:'Existing',x:492,y:515,locked:true,alliance:'ACM1'}],anchorId:'saved',excludedCells:[{x:480,y:480}],showRing:false,ringPreferenceSet:true};
const context={React:{Component,createElement:(type)=>({type})},ReactDOM:{render:e=>Planner=e.type},document:{getElementById:()=>null},localStorage:{getItem:()=>JSON.stringify(saved)},window:{},console};
vm.runInNewContext(source,context);const g=context.window.ACM1_GEOMETRY;
for(const zone of g.TURRETS){
 console.log(zone.name,zone.cells.length,'tiles',zone.vertices);
 assert.equal(zone.cells.length,37);
 for(const [x,y] of zone.vertices)assert(zone.keys.has(x+','+y));
 for(const c of zone.cells)assert(g.turretConflicts(c).includes(zone));
 const edge=zone.vertices[0],outside=g.ring({x:edge[0],y:edge[1]},1).find(c=>!zone.keys.has(c.x+','+c.y));
 assert(outside);assert(g.turretConflicts(outside).includes(zone),'outside HQ centre must still conflict when footprint overlaps');
 const status=g.geomStatus(outside,[],[],[],{limitOuter:false,blockInner:false,excludedCells:[]});assert(!status.ok);assert(status.reasons.some(r=>r.includes(zone.name)));
 const p=new Planner({});const original=JSON.stringify(p.state.homes);p.addHQ(edge[0],edge[1],'Blocked');assert.equal(JSON.stringify(p.state.homes),original);p.addHQ(outside.x,outside.y,'Overlapping');assert.equal(JSON.stringify(p.state.homes),original);
 assert.equal(JSON.stringify(p.state.excludedCells),JSON.stringify(saved.excludedCells));
 p.state.homes.push({id:'move',x:480,y:520});assert.equal(p.updateHQ('move',outside),false);assert.equal(p.state.homes.find(h=>h.id==='move').x,480);
}
assert.equal(g.turretConflicts({x:480,y:520}).length,0);
const p=new Planner({});assert.equal(p.state.homes[0].name,'Existing');assert(g.geomStatus(p.state.homes[0],p.state.homes,p.state.outer,p.state.inner,p.state).reasons.some(r=>r.includes('Turret 1')));
p.state.homes=[{id:'anchor',name:'Anchor',x:492,y:520}];p.state.anchorId='anchor';p.state.patternDX=0;p.state.patternDY=-1;p.state.patternCount=10;p.generate();assert.equal(p.state.homes.length,1);assert(p.state.homes.slice(1).every(h=>!g.turretConflicts(h).length));
console.log('Boundary inclusion, footprint overlap, add/move rejection, formation filtering and saved-data preservation passed');
