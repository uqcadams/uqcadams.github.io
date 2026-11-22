(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const docs = '../../docs/system/';
  const repo = 'https://github.com/uqcadams/uqcadams.github.io/blob/';
  const areas = {Map:'Map & terrain',HQ:'Headquarters',Roster:'Players & rosters',Regions:'Alliance boundaries',Deployment:'Deployment planning',Import:'Screenshot import & OCR',Export:'Export & backup',UI:'Interface & recovery',Persistence:'Saving & persistence',Rooms:'Shared rooms & synchronisation',Registration:'Member registration',Admin:'Room administration',Legacy:'Legacy compatibility',Integration:'Service integrations',Audit:'Audit & documentation'};
  let features = [], featuresLoading, workflowsLoading, workflowsReady = false;
  const node = (tag, text, cls) => { const n = document.createElement(tag); if (text != null) n.textContent = text; if (cls) n.className = cls; return n; };
  const strings = value => Array.isArray(value) ? value.filter(v => typeof v === 'string') : typeof value === 'string' && value ? [value] : [];
  const searchable = feature => [feature.id, feature.name, feature.description, feature.group, areas[feature.group], ...strings(feature.user_actions), ...strings(feature.preconditions), ...strings(feature.business_rules)].join(' ').normalize('NFKC').toLocaleLowerCase();
  function external(text, href) { const a = node('a', text); a.href = href; a.target = '_blank'; a.rel = 'noopener noreferrer'; return a; }
  function addField(dl, label, values) {
    const items = strings(values).map(s => s.replace(/^Preserve the implemented contract:\s*/, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/`([^`]+)`/g, '$1'));
    if (!items.length) return;
    const dd = node('dd');
    if (items.length === 1) dd.textContent = items[0];
    else { const ul = node('ul'); items.forEach(s => ul.append(node('li', s))); dd.append(ul); }
    dl.append(node('dt', label), dd);
  }
  function card(feature) {
    const details = node('details', null, 'feature-card'); details.id = 'feature-' + feature.id;
    const summary = node('summary'); const title = node('div', null, 'feature-title');
    title.append(node('strong', feature.name), node('span', feature.id, 'cap-id'));
    summary.append(title, node('p', feature.description));
    const body = node('div', null, 'feature-body'), dl = node('dl');
    addField(dl, 'Where to find it', feature.entry_points);
    addField(dl, 'What you can do', feature.user_actions);
    addField(dl, 'Requirements & permissions', feature.preconditions);
    addField(dl, 'Rules & constraints', feature.business_rules);
    addField(dl, 'What changes', feature.side_effects);
    addField(dl, 'Known limits', feature.known_limitations);
    body.append(dl);
    const related = (feature.related_capabilities || []).map(id => features.find(f => f.id === id)).filter(Boolean);
    if (related.length) {
      body.append(node('p', 'Related functionality'));
      const list = node('div', null, 'related');
      related.forEach(f => { const b = node('button', f.name, 'related-button'); b.type = 'button'; b.onclick = () => { $('feature-area').value = ''; $('feature-search').value = f.id; renderFeatures(); const next = $('feature-' + f.id); if (next) { next.open = true; next.querySelector('summary').focus(); } }; list.append(b); });
      body.append(list);
    }
    const technical = node('details', null, 'technical-notes'); technical.append(node('summary', 'Implementation & preservation evidence'));
    const extra = node('dl');
    addField(extra, 'Documented regression risks', feature.regression_risks);
    addField(extra, 'Unverified or untested areas', feature.coverage_gaps);
    const classification = feature.coverage?.current?.classification;
    if (classification) addField(extra, 'Recorded test coverage', classification === 'absent' ? 'No current assertion coverage recorded. This is not a fresh runtime audit.' : classification + ' coverage in the documented baseline; not a fresh test run.');
    technical.append(extra);
    const sources = node('ul');
    (feature.source_references || []).forEach(ref => {
      if (typeof ref.path !== 'string') return;
      const revision = ref.path.startsWith('docs/') ? 'main' : /^[a-f0-9]{40}$/.test(ref.baseline || '') ? ref.baseline : 'main';
      const safePath = ref.path.split('/').map(encodeURIComponent).join('/');
      const li = node('li'); li.append(external(ref.symbol || ref.path, repo + revision + '/' + safePath + (Number.isInteger(ref.line) ? '#L' + ref.line : ''))); sources.append(li);
    });
    technical.append(sources); body.append(technical);
    const footer = node('div', null, 'feature-footer'); footer.append(external('Full technical catalogue ↗', repo + 'main/docs/system/03-feature-catalogue.md')); body.append(footer);
    details.append(summary, body); return details;
  }
  function renderFeatures() {
    const query = $('feature-search').value.normalize('NFKC').trim().toLocaleLowerCase(), group = $('feature-area').value;
    const shown = features.filter(f => (!group || f.group === group) && (!query || searchable(f).includes(query)));
    $('feature-count').textContent = shown.length + ' of ' + features.length + ' features';
    const fragment = document.createDocumentFragment();
    if (!shown.length) fragment.append(node('p', 'No features match. Try another term or clear the filters.', 'empty'));
    const groups = [...new Set(shown.map(f => f.group))];
    groups.forEach(g => {
      const section = node('section', null, 'area-section'), heading = node('h2', areas[g] || g), list = shown.filter(f => f.group === g);
      heading.append(node('span', String(list.length), 'count-pill')); section.append(heading); list.forEach(f => section.append(card(f))); fragment.append(section);
    });
    $('features').replaceChildren(fragment);
  }
  async function json(url) { const r = await fetch(url, {credentials:'omit'}); if (!r.ok) throw Error('Documentation request returned ' + r.status); return r.json(); }
  async function loadFeatures() {
    if (featuresLoading) return featuresLoading;
    $('feature-error').hidden = true; $('feature-count').textContent = 'Loading feature catalogue…';
    featuresLoading = (async () => {
      try {
        const [baseline, additions] = await Promise.all([json(docs + 'feature-registry.json'), json('features.json')]);
        const all = [...(baseline.capabilities || []), ...(additions.capabilities || [])];
        if (!all.length || all.some(f => !f.id || !f.name || !f.description || !f.group) || new Set(all.map(f => f.id)).size !== all.length) throw Error('Feature documentation is incomplete or contains repeated identifiers.');
        features = all;
        const select = $('feature-area'); select.replaceChildren(new Option('All areas', ''));
        [...new Set(all.map(f => f.group))].forEach(g => select.add(new Option((areas[g] || g) + ' · ' + all.filter(f => f.group === g).length, g)));
        $('baseline-note').textContent = 'Baseline ' + (baseline.audit_date || 'date not recorded') + ' + current audit features. Role and plan state determine availability.';
        renderFeatures();
      } catch (error) {
        $('feature-count').textContent = 'Catalogue unavailable';
        const box = $('feature-error'); box.replaceChildren(node('p', 'The feature documentation could not be loaded. Your plan is unaffected. ' + error.message));
        const retry = node('button', 'Retry loading', 'secondary'); retry.type = 'button'; retry.onclick = () => { featuresLoading = null; loadFeatures(); };
        box.append(retry, external('Open full documentation ↗', repo + 'main/docs/system/README.md')); box.hidden = false;
      }
    })();
    return featuresLoading;
  }
  async function loadWorkflows() {
    if (workflowsReady || workflowsLoading) return;
    workflowsLoading = true; $('workflow-status').textContent = 'Loading documented workflows…';
    try {
      const response = await fetch(docs + '07-behavioural-specifications.md', {credentials:'omit'}); if (!response.ok) throw Error('Documentation request returned ' + response.status);
      const text = await response.text(), fragments = text.split(/^## (FLOW-\d+[^\n]*)$/m), list = document.createDocumentFragment(); let count = 0;
      for (let i = 1; i < fragments.length; i += 2) {
        const title = fragments[i], bodyText = fragments[i + 1].split(/^## /m)[0], fields = [];
        bodyText.split('\n').forEach(line => { const match = line.match(/^- \*\*(.+?):\*\* (.+)$/); if (match) fields.push(match.slice(1)); });
        if (!fields.length) continue;
        const detail = node('details', null, 'workflow-card'), summary = node('summary'), body = node('div', null, 'workflow-body'), dl = node('dl');
        summary.append(node('strong', title.replace(/^FLOW-\d+\s*[—-]\s*/, '')), node('p', fields[0][1]));
        fields.forEach(([label, value]) => addField(dl, label, value)); body.append(dl); detail.append(summary, body); list.append(detail); count++;
      }
      if (!count) throw Error('Workflow documentation format could not be read.');
      $('workflows').replaceChildren(list); $('workflow-status').textContent = count + ' documented workflows'; workflowsReady = true;
    } catch (error) {
      $('workflow-status').textContent = 'Workflows could not be loaded. ' + error.message;
      const retry = node('button', 'Retry loading workflows', 'secondary'); retry.type = 'button'; retry.onclick = loadWorkflows;
      $('workflows').replaceChildren(retry, external('Open workflow documentation ↗', repo + 'main/docs/system/07-behavioural-specifications.md'));
    } finally { workflowsLoading = false; }
  }
  function selectTab(name, focus = false) {
    document.querySelectorAll('[data-tab]').forEach(button => {
      const active = button.dataset.tab === name;
      button.setAttribute('aria-selected', String(active)); button.tabIndex = active ? 0 : -1; $('panel-' + button.dataset.tab).hidden = !active;
      if (active && focus) button.focus();
    });
    if (name === 'workflows') loadWorkflows();
    if (name === 'api' && !$('api-frame').getAttribute('src')) $('api-frame').src = 'api.html';
  }
  document.querySelectorAll('[data-tab]').forEach(button => {
    button.addEventListener('click', () => selectTab(button.dataset.tab));
    button.addEventListener('keydown', event => {
      const tabs = [...document.querySelectorAll('[data-tab]')], index = tabs.indexOf(button);
      const next = event.key === 'ArrowRight' ? (index + 1) % tabs.length : event.key === 'ArrowLeft' ? (index + tabs.length - 1) % tabs.length : event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : -1;
      if (next >= 0) { event.preventDefault(); selectTab(tabs[next].dataset.tab, true); }
    });
  });
  $('feature-search').addEventListener('input', renderFeatures); $('feature-area').addEventListener('change', renderFeatures);
  $('clear-search').onclick = () => { $('feature-search').value = ''; $('feature-area').value = ''; renderFeatures(); $('feature-search').focus(); };
  function requestClose() { if (window.parent !== window) window.parent.postMessage({type:'lastz-audit-close'}, location.origin); }
  document.addEventListener('keydown', event => { if (event.key === 'Escape') { event.preventDefault(); requestClose(); } });
  window.addEventListener('message', event => { if (event.origin === location.origin && event.source === $('api-frame').contentWindow && event.data?.type === 'lastz-audit-close') requestClose(); });
  loadFeatures();
})();
