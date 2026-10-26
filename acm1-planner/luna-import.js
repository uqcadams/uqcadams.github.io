(function(){
"use strict";
async function read(app,files){
 const images=Array.from(files||[]);if(app.state.ocrBusy||!images.length)return;
 if(images.length>12){app.setState({ocrErrors:["Select up to 12 screenshots."]});return;}
 const endpoint=String(app.state.lunaEndpoint||"").trim(),token=String(app.state.lunaToken||"").trim();
 if(!endpoint.startsWith("https://")||!token){app.setState({ocrErrors:["Enter an HTTPS service URL and access token first."]});return;}
 const utils=window.ACM1_GEOMETRY,validLevel=utils.validLevel,merge=utils.mergeRosterCandidates;
 const run=app.ocrRun=(app.ocrRun||0)+1;let failures=0;
 app.setState({ocrBusy:true,ocrRows:[],ocrStatus:"Beginning Luna extraction…",ocrErrors:[],ocrRaw:"",ocrProgress:0,lunaSpent:0});
 try{
  for(let i=0;i<images.length;i++){
   if(app.ocrRun!==run)break;
   const file=images[i];app.setState({ocrStatus:"Luna "+(i+1)+" / "+images.length+": "+file.name,ocrProgress:Math.round(i*100/images.length)});
   try{
    if(!["image/png","image/jpeg","image/webp"].includes(file.type)||file.size>25*1024*1024)throw Error("Image must be PNG, JPG or WebP, under 25 MB.");
    const image=await createImageBitmap(file);
    if(image.width*image.height>35000000)throw Error("Image exceeds 35 megapixels.");
    const canvas=document.createElement("canvas");canvas.width=image.width;canvas.height=image.height;
    canvas.getContext("2d").drawImage(image,0,0);image.close();
    const data=canvas.toDataURL("image/jpeg",0.96);canvas.width=canvas.height=1;
    if(app.ocrRun!==run)break;
    const controller=new AbortController();app.lunaAbort=controller;
    const response=await fetch(endpoint,{method:"POST",mode:"cors",headers:{"Content-Type":"application/json","Authorization":"Bearer "+token},
     body:JSON.stringify({image:data,includeLeader:i===0}),signal:controller.signal});
    const body=await response.json().catch(()=>({error:"Luna endpoint returned invalid JSON."}));
    if(!response.ok)throw Error(body.error||"HTTP "+response.status);
    if(!Array.isArray(body.players))throw Error("Missing players array in Luna response.");
    if(app.ocrRun!==run)break;
    const rows=body.players.map(p=>({name:String(p.name||"").trim(),level:p.hq_level===null?"":Number(p.hq_level),
      source:file.name,include:!!p.name&&validLevel(p.hq_level)&&!p.needs_review,
      warning:p.needs_review?"Uncertain reading — review screenshot":(!validLevel(p.hq_level)?"HQ level unreadable":"")
    })).filter(p=>p.name);
    app.setState(prev=>({ocrRows:merge(prev.ocrRows.concat(rows)),lunaSpent:prev.lunaSpent+(Number(body.estimated_cost_usd)||0),
      ocrRaw:prev.ocrRaw+"\n--- "+file.name+" / Luna ---\n"+JSON.stringify(body.players,null,2)}));
   }catch(err){if(app.ocrRun!==run)break;failures++;app.setState(prev=>({ocrErrors:prev.ocrErrors.concat(file.name+": "+err.message)}));}
   finally{app.lunaAbort=null;}
  }
  if(app.ocrRun===run)app.setState(prev=>({ocrBusy:false,ocrProgress:100,ocrStatus:prev.ocrRows.length+" distinct names returned"+
    (failures?" · "+failures+" screenshot(s) failed":"")+". Verify names and HQ levels before importing."}));
 }finally{app.lunaAbort=null;if(app.ocrRun===run)app.setState({ocrBusy:false});}
}
window.ACM1Luna={read};
})();