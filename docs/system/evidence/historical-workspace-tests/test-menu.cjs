const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');let Planner,stored;
class Component{setState(p){Object.assign(this.state,typeof p==='function'?p(this.state):p)}}
const original={homes:[{id:'a',name:'Chef Sam',alliance:'ACM1',x:496,y:524,locked:false}],excludedCells:[],anchorId:'a'};
const ctx={React:{Component,createElement:(type,props,...children)=>({type,props:props||{},children})},ReactDOM:{render:e=>Planner=e.type},document:{getElementById:()=>null},localStorage:{getItem:()=>stored||JSON.stringify(original),setItem:(k,v)=>stored=v},window:{innerWidth:390,innerHeight:700},console};
vm.runInNewContext(fs.readFileSync('work/index.html','utf8').split('<script>')[3].split('</script>')[0],ctx);const p=new Planner({});
const ev={clientX:380,clientY:690,preventDefault(){},stopPropagation(){}};p.openHQMenu(p.state.homes[0],ev);assert.equal(p.state.contextMenu.id,'a');assert(p.state.contextMenu.x>=8);assert(p.state.contextMenu.y<=355);
let menu=p.renderHQMenu();const all=n=>n&&typeof n==='object'?[n,...(n.children||[]).flatMap(all)]:[];let buttons=all(menu).filter(n=>n.type==='button');
const find=text=>buttons.find(b=>b.children.includes(text));find('Lock position').props.onClick();assert(p.state.homes[0].locked);assert(!p.state.contextMenu);
p.openHQMenu(p.state.homes[0],ev);buttons=all(p.renderHQMenu()).filter(n=>n.type==='button');find('Confirm moved here').props.onClick();assert(p.state.homes[0].hasMoved);assert(p.state.homes[0].locked);
p.save();let reloaded=new Planner({});assert(reloaded.state.homes[0].hasMoved);assert(reloaded.state.homes[0].locked);
p.selectHQToMove(p.state.homes[0]);assert(!p.state.homes[0].locked);assert.equal(p.state.moveHQId,'a');p.applyCellTap({x:500,y:518});assert.equal(p.state.moveHQId,'a');assert.equal(p.state.homes[0].x,496);
p.applyCellTap({x:500,y:536});assert.equal(p.state.moveHQId,null);assert.equal(p.state.homes[0].y,536);assert.equal(p.state.homes[0].hasMoved,false);
p.updateHQ('a',{name:'طيب عابر'});assert.equal(ctx.window.ACM1_GEOMETRY.formatGameCoordinate(p.state.homes[0]),'طيب عابر — [#:759 X:500 Y:536]');
p.openHQMenu(p.state.homes[0],ev);p.keyDown({key:'Escape',preventDefault(){}});assert.equal(p.state.contextMenu,null);
console.log('Menu actions, persistent confirmation/lock, move selection, invalid destination rejection, confirmation reset, Unicode coordinate format and Escape passed');
p.openCellMenu({x:510,y:540},ev);assert(p.state.contextMenu.cell);let cellButtons=all(p.renderHQMenu()).filter(n=>n.type==='button');let deploy=cellButtons.find(n=>n.children.includes('Deploy HQ here'));assert.equal(deploy.props.disabled,false);const count=p.state.homes.length;deploy.props.onClick();assert.equal(p.state.homes.length,count+1);assert.equal(p.state.homes.at(-1).x,510);assert.equal(p.state.contextMenu,null);
p.openCellMenu({x:500,y:517},ev);deploy=all(p.renderHQMenu()).find(n=>n.type==='button'&&n.children.includes('Deploy HQ here'));assert.equal(deploy.props.disabled,true);p.quickDeploy({x:500,y:517});assert.equal(p.state.homes.length,count+1);
p.openHQMenu(p.state.homes[0],ev);p.state.contextMenu.renaming=true;const input=all(p.renderHQMenu()).find(n=>n.type==='input');let selected=false;input.props.onFocus({target:{select(){selected=true}}});assert(selected);
console.log('Empty-cell quick deploy, exclusion rejection and rename select-all passed');
