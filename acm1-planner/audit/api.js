(() => {
  'use strict';
  const status = document.getElementById('api-status');
  function failed(message) {
    status.setAttribute('role', 'alert'); status.textContent = message + ' ';
    const link = document.createElement('a'); link.href = '../../docs/system/openapi.yaml'; link.target = '_blank'; link.rel = 'noopener noreferrer'; link.textContent = 'Open the OpenAPI document'; status.append(link);
    const retry = document.createElement('button'); retry.textContent = 'Retry'; retry.type = 'button'; retry.onclick = () => location.reload(); status.append(' ', retry);
  }
  document.addEventListener('keydown', event => { if (event.key === 'Escape') { event.preventDefault(); window.parent.postMessage({type:'lastz-audit-close'}, location.origin); } });
  if (typeof window.SwaggerUIBundle !== 'function') { failed('Swagger UI could not be loaded.'); return; }
  async function render() {
   try {
    const response = await fetch('../../docs/system/openapi.yaml', {credentials:'omit'});
    if (!response.ok) throw Error('Specification request failed');
    window.SwaggerUIBundle({
      url:'../../docs/system/openapi.yaml', dom_id:'#swagger-ui',
      supportedSubmitMethods:[], tryItOutEnabled:false, persistAuthorization:false,
      validatorUrl:null, queryConfigEnabled:false, withCredentials:false,
      deepLinking:false, docExpansion:'list', filter:true, defaultModelsExpandDepth:0,
      onComplete:() => { status.textContent = 'Read-only API reference · request execution disabled · documented service baseline'; }
    });
   } catch (error) { failed('The API reference could not be loaded.'); }
  }
  render();
})();
