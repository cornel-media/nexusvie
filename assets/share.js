/* Nexus · boutons de partage (sans SDK, sans suivi). Usage : <div data-nx-share></div><script src="/assets/share.js" defer></script> */
(function(){
  var code=(document.documentElement.lang||'fr').toLowerCase().slice(0,2);
  var TEXTS={
    fr:{fb:'Partager sur Facebook',copy:'Copier le lien',ok:'Lien copié',label:'Partager'},
    en:{fb:'Share on Facebook',copy:'Copy link',ok:'Link copied',label:'Share'},
    es:{fb:'Compartir en Facebook',copy:'Copiar el enlace',ok:'Enlace copiado',label:'Compartir'},
    ro:{fb:'Distribuie pe Facebook',copy:'Copiază linkul',ok:'Link copiat',label:'Distribuie'}
  };
  var T=TEXTS[code]||TEXTS.fr;
  var c=document.querySelector('link[rel="canonical"]');var url=c?c.href:location.href.split('#')[0];
  var css='.nx-share{display:flex;flex-wrap:wrap;gap:10px;margin:0 0 34px}.nx-share a,.nx-share button{display:inline-flex;align-items:center;background:transparent;border:1px solid var(--rule,#38302F);color:var(--gold,#D3B078);font:300 11px/1 \'Josefin Sans\',sans-serif;letter-spacing:.16em;text-transform:uppercase;padding:10px 14px;border-radius:0;cursor:pointer;text-decoration:none;transition:border-color .2s}.nx-share a:hover,.nx-share button:hover{border-color:var(--gold,#D3B078)}.nx-share a:focus-visible,.nx-share button:focus-visible{outline:2px solid var(--gold,#D3B078);outline-offset:2px}';
  var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
  function copy(t){if(navigator.clipboard&&window.isSecureContext)return navigator.clipboard.writeText(t);return new Promise(function(res,rej){var a=document.createElement('textarea');a.value=t;a.setAttribute('readonly','');a.style.position='fixed';a.style.opacity='0';document.body.appendChild(a);a.select();try{document.execCommand('copy')?res():rej()}catch(e){rej(e)}document.body.removeChild(a);});}
  document.querySelectorAll('[data-nx-share]').forEach(function(box){
    box.className='nx-share';box.setAttribute('role','group');box.setAttribute('aria-label',T.label);
    var fb=document.createElement('a');fb.href='https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(url);fb.target='_blank';fb.rel='noopener noreferrer';fb.textContent=T.fb;
    fb.addEventListener('click',function(e){var w=window.open(fb.href,'nxshare','width=600,height=520');if(w){try{w.opener=null}catch(x){}e.preventDefault();}});
    var b=document.createElement('button');b.type='button';b.textContent=T.copy;var tm;
    b.addEventListener('click',function(){copy(url).then(function(){b.textContent=T.ok;clearTimeout(tm);tm=setTimeout(function(){b.textContent=T.copy},2000)},function(){window.prompt(T.copy,url)})});
    var live=document.createElement('span');live.setAttribute('aria-live','polite');live.style.cssText='position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)';
    b.addEventListener('click',function(){setTimeout(function(){live.textContent=b.textContent},50)});
    box.appendChild(fb);box.appendChild(b);box.appendChild(live);
  });
})();
