/* The audit is separate from Planner state, storage, history and shared-room operations. */
(() => {
  'use strict';
  const page = new URL('./index.html', document.currentScript.src).href;
  let dialog, frame, returnFocus;
  function close() { if (dialog?.open) dialog.close(); }
  function open(button) {
    returnFocus = button;
    if (!dialog) {
      dialog = document.createElement('dialog');
      dialog.id = 'admin-audit-modal';
      dialog.className = 'admin-audit-dialog';
      dialog.setAttribute('aria-labelledby', 'admin-audit-title');
      dialog.setAttribute('aria-describedby', 'admin-audit-description');
      const heading = document.createElement('div'); heading.className = 'admin-audit-heading';
      const text = document.createElement('div');
      const title = document.createElement('h2'); title.id = 'admin-audit-title'; title.textContent = 'Feature & API catalogue';
      const description = document.createElement('p'); description.id = 'admin-audit-description'; description.textContent = 'Read-only system guide · features, workflows and APIs';
      text.append(title, description);
      const exit = document.createElement('button'); exit.type = 'button'; exit.className = 'admin-audit-close'; exit.textContent = 'Close'; exit.setAttribute('aria-label', 'Close feature catalogue'); exit.onclick = close;
      heading.append(text, exit);
      frame = document.createElement('iframe'); frame.className = 'admin-audit-frame'; frame.title = 'Planner features, workflows and API reference'; frame.src = page;
      dialog.append(heading, frame); document.body.append(dialog);
      dialog.addEventListener('cancel', event => { event.preventDefault(); close(); });
      dialog.addEventListener('keydown', event => event.stopPropagation());
      dialog.addEventListener('close', () => {
        document.body.classList.remove('admin-audit-open');
        (returnFocus?.isConnected ? returnFocus : document.getElementById('admin-audit-open'))?.focus();
      });
      dialog.addEventListener('click', event => {
        if (event.target !== dialog) return;
        const r = dialog.getBoundingClientRect();
        if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) close();
      });
    }
    if (!dialog.open) { dialog.showModal(); document.body.classList.add('admin-audit-open'); }
    dialog.querySelector('button').focus();
  }
  document.addEventListener('click', event => {
    const button = event.target.closest?.('#admin-audit-open');
    if (button) { event.preventDefault(); open(button); }
  });
  window.addEventListener('message', event => {
    if (frame && event.origin === location.origin && event.source === frame.contentWindow && event.data?.type === 'lastz-audit-close') close();
  });
})();
