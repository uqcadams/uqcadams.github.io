const fs=require('fs'),vm=require('vm'),assert=require('assert/strict'),{createWorker}=require('./ocr-eval/node_modules/tesseract.js');
const ctx={};vm.runInNewContext(fs.readFileSync('work/card-detection.js','utf8')+';this.choose=chooseCardReading;',ctx);
const expected={
 'IMG_4408.PNG':[['Don McPuñetazo',30],['Turki-f',29],['Muffy69',28],['Gorkhraliwarior',27],['Mikix',26],['FuryFireSw',24],['2MuchTuna',28],['Tiffiany83',26]],
 'IMG_4409.PNG':[['Dregzzz',26],['Nadjet',28],['flembob',26],['Riecky',26],['MilkPrep',26],['DarkWarrior59',26],['FabianM1',26],['Just FyVv',26],['Maple SurvivorB',26],['Filthy-Casual',24]]
};
(async()=>{const w=await createWorker('eng',1,{cachePath:'work/ocr-eval'});const output={};
for(const [file,rows] of Object.entries(expected)){const jobs=JSON.parse(fs.readFileSync('work/ocr-crops/'+file+'.json')),draft=[];assert.equal(jobs.length,rows.length*2);
await w.reinitialize('eng',1);await w.setParameters({tessedit_pageseg_mode:'7',tessedit_char_whitelist:'',preserve_interword_spaces:'1'});
for(let i=0;i<rows.length;i++){const a=(await w.recognize(jobs[i*2].path)).data;await w.setParameters({tessedit_char_whitelist:'0123456789'});const level=(await w.recognize(jobs[i*2+1].path)).data;await w.setParameters({tessedit_char_whitelist:''});draft.push({a,level});}
await w.reinitialize('spa',1);await w.setParameters({tessedit_pageseg_mode:'7',tessedit_char_whitelist:'',preserve_interword_spaces:'1'});output[file]=[];
for(let i=0;i<rows.length;i++){const b=(await w.recognize(jobs[i*2].path)).data,choice=ctx.choose(draft[i].a,b),level=Number(draft[i].level.text.replace(/\D/g,''));assert.equal(choice.name,rows[i][0]);assert.equal(level,rows[i][1]);console.log(file,choice.name,level,choice.warning||'agreed');output[file].push({name:choice.name,level,warning:choice.warning});}}
await w.terminate();fs.writeFileSync('work/card-reader-verified.json',JSON.stringify(output,null,2));console.log('18 member-card names and 18 HQ levels match the source screenshots. No gender-icon prefixes.');})().catch(e=>{console.error(e);process.exit(1)});
