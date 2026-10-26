const schema={type:"object",additionalProperties:false,required:["players"],properties:{players:{type:"array",items:{type:"object",additionalProperties:false,required:["name","hq_level","needs_review"],properties:{name:{type:"string"},hq_level:{type:["integer","null"]},needs_review:{type:"boolean"}}}}}};
const json=(v,status=200,h={})=>new Response(JSON.stringify(v),{status,headers:{"Content-Type":"application/json","Cache-Control":"no-store",...h}});
export default {async fetch(request,env){
const origin=request.headers.get("Origin");const allowed=env.ALLOWED_ORIGIN||"https://uqcadams.github.io";
const cors={"Access-Control-Allow-Origin":allowed,"Access-Control-Allow-Methods":"POST,OPTIONS","Access-Control-Allow-Headers":"Authorization,Content-Type","Vary":"Origin"};
if(origin!==allowed)return json({error:"Origin not permitted"},403);
if(request.method==="OPTIONS")return new Response(null,{status:204,headers:cors});
if(request.method!=="POST")return json({error:"POST required"},405,cors);
if(!env.OPENAI_API_KEY||!env.IMPORT_ACCESS_TOKEN)return json({error:"Service not configured"},503,cors);
if(request.headers.get("Authorization")!=="Bearer "+env.IMPORT_ACCESS_TOKEN)return json({error:"Unauthorised"},401,cors);
let body;try{body=await request.json()}catch{return json({error:"Invalid JSON"},400,cors)}
if(typeof body?.image!=="string"||!body.image.startsWith("data:image/jpeg;base64,")||body.image.length>12000000)return json({error:"Invalid image"},400,cors);
const prompt="Transcribe the game alliance roster exactly. Include complete member cards below the decorative officer headers. Ignore avatar captions, orange shield personal power, online status and timestamps. Each player's HQ level is the integer next to the small building icon. Preserve exact Unicode name characters. Do not guess illegible details, use null HQ and needs_review true where applicable. Include R5 leader at the top ONLY when requested. Include leader: "+Boolean(body.includeLeader);
let response;try{response=await fetch("https://api.openai.com/v1/responses",{method:"POST",headers:{"Authorization":"Bearer "+env.OPENAI_API_KEY,"Content-Type":"application/json"},body:JSON.stringify({model:"gpt-6-luna",input:[{role:"user",content:[{type:"input_text",text:prompt},{type:"input_image",image_url:body.image,detail:"original"}]}],max_output_tokens:3000,text:{format:{type:"json_schema",name:"roster",strict:true,schema}}})})}catch{return json({error:"OpenAI request failed"},502,cors)}
const payload=await response.json().catch(()=>({}));if(!response.ok)return json({error:payload.error?.message||"OpenAI error "+response.status},502,cors);
let parsed;try{parsed=JSON.parse((payload.output||[]).flatMap(x=>x.content||[]).filter(x=>x.type==="output_text").map(x=>x.text).join(""))}catch{return json({error:"No valid structured response"},502,cors)}
const inTokens=payload.usage?.input_tokens||0,outTokens=payload.usage?.output_tokens||0;
return json({players:Array.isArray(parsed.players)?parsed.players:[],usage:payload.usage,estimated_cost_usd:(inTokens*.10+outTokens*.50)/1000000},200,cors)
}};