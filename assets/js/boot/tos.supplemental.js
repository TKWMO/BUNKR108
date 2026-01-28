(function(){
  'use strict';

  // Supplemental Terms-of-Use gate for the hosted demo.
  // Intentionally designed to be absent/optional so the standalone BUNKR108.html file has no TOS enforcement.

  const STORAGE_KEY = 'tos.accepted.v1.1';
  const TERMS_URL = './assets/legal/tos-v1.1.txt';

  function onReady(cb){
    if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', cb, { once: true });
    else cb();
  }

  function ensureStyles(){
    if(document.getElementById('tosSupplementalStyles')) return;
    const style = document.createElement('style');
    style.id = 'tosSupplementalStyles';
    style.textContent = [
      '/* UI lock while TOS not accepted (supplemental) */',
      '.tos-overlay{ position:fixed; inset:0; background: rgba(2,6,12,0.55); -webkit-backdrop-filter: blur(4px); backdrop-filter: blur(4px); z-index:22000; display:flex; align-items:center; justify-content:center; }',
      '.tos-overlay.hidden{ display:none }',
      '.tos-unlock-panel{ background: linear-gradient(180deg, rgba(8,12,18,.98), rgba(6,10,14,.98)); border:1px solid rgba(255,255,255,0.04); padding:18px; border-radius:12px; max-width:520px; color:var(--ink); box-shadow: 0 12px 40px rgba(0,0,0,0.6); }',
      '.tos-unlock-panel p{ color:var(--muted); font-size:13px; margin:0 0 12px }',
      '.tos-unlock-text{ color:var(--muted); font-size:13px; margin:0 0 12px }',
      '.tos-unlock-actions{ display:flex; gap:10px; justify-content:center }',
      '/* Use a root class so we can selectively keep TOS buttons active */',
      '.tos-locked * { pointer-events: none !important; }',
      '/* Keep only the TOS unlock overlay and the modal interactive while locked */',
      '.tos-locked #tosOverlay .tos-unlock-panel,',
      '.tos-locked #tosOverlay .tos-unlock-panel *,',
      '.tos-locked #tosModal,',
      '.tos-locked #tosModal * { pointer-events: auto !important; }',
      '.tos-locked .page, .tos-locked .card, .tos-locked .api-key-bar, .tos-locked .card.pad { filter: blur(4px) brightness(.96); }',
      '/* Use existing .modal styles; just ensure the body block is readable */',
      '#tosModal .tos-body pre{ white-space:pre-wrap; }'
    ].join('\n');
    document.head.appendChild(style);
  }

  function ensureOverlay(){
    if(document.getElementById('tosOverlay')) return;
    const overlay = document.createElement('div');
    overlay.id = 'tosOverlay';
    overlay.className = 'tos-overlay hidden';
    overlay.setAttribute('aria-hidden','true');
    overlay.innerHTML = [
      '<div class="tos-unlock-panel" role="dialog" aria-label="Accept Terms to access site">',
      '  <p class="tos-unlock-text">This hosted demo is restricted until you accept the Terms of Use. You can view and accept the Terms to unlock access.</p>',
      '  <div class="tos-unlock-actions">',
      '    <button id="tosUnlockBtn" class="btn primary">View & Sign TOS</button>',
      '  </div>',
      '</div>'
    ].join('');
    document.body.appendChild(overlay);
  }

  function ensureModal(){
    if(document.getElementById('tosModal')) return;
    const modal = document.createElement('div');
    modal.id = 'tosModal';
    modal.className = 'modal hidden';
    modal.setAttribute('role','dialog');
    modal.setAttribute('aria-modal','true');
    modal.setAttribute('aria-label','Terms of Use and Disclaimer');

    modal.innerHTML = [
      '<div class="modal-backdrop"></div>',
      '<div class="modal-panel" id="tosPanel">',
      '  <div class="modal-header">',
      '    <h3>Terms of Use & Disclaimer — Effective Dec 25, 2025 (v1.1)</h3>',
      '    <button id="tosClose" class="btn small" aria-label="Close">Close</button>',
      '  </div>',
      '  <div class="modal-body tos-body" id="tosContent">',
      '    <pre id="tosText">Loading Terms…</pre>',
      '  </div>',
      '  <div class="flex justify-end gap-8 mt-12">',
      '    <button id="tosDecline" class="btn">Decline</button>',
      '    <button id="tosAccept" class="btn primary">Accept</button>',
      '  </div>',
      '</div>'
    ].join('');

    document.body.appendChild(modal);
  }

  function setWidgetState(accepted){
    try{
      const tosState = document.getElementById('tosState');
      const tosStateBox = document.getElementById('tosStateBox');
      if(tosState){ tosState.textContent = accepted ? 'Accepted' : 'Not accepted'; tosState.style.color = accepted ? '#4dd17a' : ''; }
      if(tosStateBox){ tosStateBox.textContent = accepted ? 'Accepted' : 'Not accepted'; tosStateBox.style.color = accepted ? '#4dd17a' : ''; }
    }catch(_){ }
  }

  function lockUI(){
    try{
      document.documentElement.classList.add('tos-locked');
      const ov = document.getElementById('tosOverlay');
      if(ov) ov.classList.remove('hidden');

      // Disable keyboard focus/tabbing for all interactive elements outside the TOS overlay and modal
      try{
        const tosOverlay = document.getElementById('tosOverlay');
        const tosModal = document.getElementById('tosModal');
        const all = Array.from(document.querySelectorAll('a, button, input, select, textarea, [tabindex]'));
        all.forEach(el=>{
          try{
            if(!el) return;
            if((tosOverlay && tosOverlay.contains(el)) || (tosModal && tosModal.contains(el))) return;
            if(el.hasAttribute('tabindex')) el.dataset.prevTabindex = el.getAttribute('tabindex');
            else el.dataset.prevTabindex = '__none__';
            el.dataset._tosDisabled = '1';
            try{ el.setAttribute('tabindex', '-1'); }catch(e){}
            try{ el.setAttribute('aria-disabled', 'true'); }catch(e){}
          }catch(e){}
        });
        try{ const ae = document.activeElement; if(ae && ae.id) document.documentElement.dataset._prevActive = ae.id; }catch(e){}
        try{ document.getElementById('tosUnlockBtn')?.focus(); }catch(e){}
      }catch(e){}
    }catch(_){ }
  }

  function unlockUI(){
    try{
      document.documentElement.classList.remove('tos-locked');
      const ov = document.getElementById('tosOverlay');
      if(ov) ov.classList.add('hidden');

      try{
        const modified = Array.from(document.querySelectorAll('[data-_tosDisabled]'));
        modified.forEach(el=>{
          try{
            const prev = el.dataset.prevTabindex;
            if(typeof prev !== 'undefined'){
              if(prev === '__none__') el.removeAttribute('tabindex');
              else el.setAttribute('tabindex', prev);
              delete el.dataset.prevTabindex;
            }
            delete el.dataset._tosDisabled;
            try{ el.removeAttribute('aria-disabled'); }catch(e){}
          }catch(e){}
        });
        try{
          const prevId = document.documentElement.dataset._prevActive;
          if(prevId){
            const el = document.getElementById(prevId);
            if(el) el.focus();
            delete document.documentElement.dataset._prevActive;
          }
        }catch(e){}
      }catch(e){}
    }catch(_){ }
  }

  function openModal(){
    const tosModal = document.getElementById('tosModal');
    if(!tosModal) return;
    try{
      const ov = document.getElementById('tosOverlay');
      if(ov){ ov.classList.add('hidden'); ov.setAttribute('aria-hidden','true'); }
    }catch(e){}
    tosModal.classList.remove('hidden');
    tosModal.setAttribute('aria-hidden','false');
    document.documentElement.classList.add('modal-open');
    document.body.classList.add('modal-open');
    try{ document.getElementById('tosClose')?.focus(); }catch(e){}
  }

  function closeModal(){
    const tosModal = document.getElementById('tosModal');
    if(!tosModal) return;
    tosModal.classList.add('hidden');
    tosModal.setAttribute('aria-hidden','true');
    document.documentElement.classList.remove('modal-open');
    document.body.classList.remove('modal-open');
    try{
      const ov = document.getElementById('tosOverlay');
      const has = !!localStorage.getItem(STORAGE_KEY);
      if(ov){
        if(!has){ ov.classList.remove('hidden'); ov.setAttribute('aria-hidden','false'); }
        else { ov.classList.add('hidden'); ov.setAttribute('aria-hidden','true'); }
      }
    }catch(e){}
  }

  async function loadTermsText(){
    const pre = document.getElementById('tosText');
    if(!pre) return;
    try{
      const r = await fetch(TERMS_URL, { cache: 'no-store' });
      if(!r.ok) throw new Error('HTTP ' + r.status);
      const txt = await r.text();
      pre.textContent = txt || 'Terms file is empty.';
    }catch(e){
      pre.textContent = 'Terms text could not be loaded.';
    }
  }

  function init(){
    try{
      ensureStyles();
      ensureOverlay();
      ensureModal();

      // wire buttons
      document.getElementById('tosAccept')?.addEventListener('click', ()=>{
        try{ localStorage.setItem(STORAGE_KEY, '1'); }catch(e){}
        setWidgetState(true);
        unlockUI();
        closeModal();
      });
      document.getElementById('tosDecline')?.addEventListener('click', ()=>{
        try{ localStorage.removeItem(STORAGE_KEY); }catch(e){}
        setWidgetState(false);
        lockUI();
        closeModal();
      });
      document.getElementById('tosClose')?.addEventListener('click', ()=>{ closeModal(); });
      document.getElementById('tosUnlockBtn')?.addEventListener('click', ()=>{ openModal(); });

      // optional buttons that may exist in the UI
      document.getElementById('viewTosBtn')?.addEventListener('click', ()=>{ openModal(); });
      document.getElementById('tosBoxView')?.addEventListener('click', ()=>{ openModal(); });

      loadTermsText();

      let accepted = false;
      try{ accepted = !!localStorage.getItem(STORAGE_KEY); }catch(e){ accepted = false; }
      setWidgetState(accepted);
      if(!accepted){
        lockUI();
        setTimeout(openModal, 250);
      } else {
        unlockUI();
      }
    }catch(e){
      // Never allow TOS code to break the app.
      try{ console.warn('tos.supplemental init failed', e); }catch(_){ }
    }
  }

  onReady(init);
})();
