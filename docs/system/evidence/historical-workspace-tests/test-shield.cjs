const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');let Planner;
class Component{setState(p){Object.assign(this.state,typeof p==='function'?p(this.state):p)}}
const saved={homes:[{id:'saved',name:'Saved',x:500,y:530}],limitOuter:true,excludedCells:[]};
const ctx={React:{Component,createElement:type=>({type})},ReactDOM:{render:e=>Planner=e.type},document:{getElementById:()=>null},localStorage:{getItem:()=>JSON.stringify(saved)},window:{},console};
vm.runInNewContext(fs.readFileSync('work/index.html','utf8').split('<script>')[3].split('</script>')[0],ctx);const g=ctx.window.ACM1_GEOMETRY,p=new Planner({});
const mud={id:'mud',x:500,y:535},outside={id:'out',x:500,y:536};
assert(!g.canShield(mud,g.OUTER));assert(g.canShield(outside,g.OUTER));assert(g.disk(outside,1).some(c=>g.capitalCells(g.OUTER).keys.has(c.x+','+c.y)),'outside HQ overlaps mud');
for(const c of [mud,outside]){const v=g.geomStatus(c,[],g.OUTER,g.INNER,p.state);assert(v.ok);assert.equal(v.canShield,c===outside);p.state.homes=p.state.homes.filter(q=>q.id==='saved');p.addHQ(c.x,c.y,'Valid');}
assert.equal(p.state.homes.length,2);assert(p.updateHQ(p.state.homes[1].id,{x:501,y:536}));
for(const [x,y] of g.OUTER)assert(!g.canShield({x,y},g.OUTER),'perimeter tile is mud');
assert.equal(g.geomStatus({x:500,y:518},[],g.OUTER,g.INNER,p.state).ok,false);
assert(g.mudEdges(g.OUTER).length>0);console.log('Mud centre cannot shield; outside centre can shield despite footprint overlap; placement valid on both sides even with legacy limitOuter=true; red exclusions still blocked.');
