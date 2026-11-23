(() => {
  'use strict';
  const status = document.getElementById('api-status');
  const choice=document.getElementById('api-specification');
  const specification=()=>choice.value==='collaboration'?'../../docs/collaboration-api.openapi.json':'../../docs/system/openapi.yaml';
  function failed(message) {
    status.setAttribute('role', 'alert'); status.textContent = message + ' ';
    const link = document.createElement('a'); link.href = specification(); link.target = '_blank'; link.rel = 'noopener noreferrer'; link.textContent = 'Open the OpenAPI document'; status.append(link);
    const retry = document.createElement('button'); retry.textContent = 'Retry'; retry.type = 'button'; retry.onclick = () => location.reload(); status.append(' ', retry);
  }
  document.addEventListener('keydown', event => { if (event.key === 'Escape') { event.preventDefault(); window.parent.postMessage({type:'lastz-audit-close'}, location.origin); } });
  if (typeof window.SwaggerUIBundle !== 'function') { failed('Swagger UI could not be loaded.'); return; }
  async function render() {
   try {
    const response = await fetch(specification(), {credentials:'omit'});
    if (!response.ok) throw Error('Specification request failed');
    window.SwaggerUIBundle({
      url:specification(), dom_id:'#swagger-ui',
      supportedSubmitMethods:[], tryItOutEnabled:false, persistAuthorization:false,
      validatorUrl:null, queryConfigEnabled:false, withCredentials:false,
      deepLinking:false, docExpansion:'list', filter:true, defaultModelsExpandDepth:0,
      onComplete:() => { status.textContent = 'Read-only API reference · request execution disabled · '+(choice.value==='collaboration'?'current collaboration contract':'pinned service baseline'); }
    });
   } catch (error) { failed('The API reference could not be loaded.'); }
  }
  choice.addEventListener('change',render);
  render();
})();
