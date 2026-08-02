(()=>{
  const labels={
    en:{brand:'Choose a course',nav:'Primary navigation',language:'Language',modePanel:'Course viewing mode',viewMode:'View mode'},
    he:{brand:'בחירת קורס',nav:'ניווט ראשי',language:'שפה',modePanel:'מצב תצוגת הקורס',viewMode:'מצב תצוגה'}
  };

  const apply=()=>{
    const lang=document.documentElement.lang==='he'?'he':'en';
    const text=labels[lang];
    const brand=document.querySelector('.brand');
    const nav=document.querySelector('.header-links');
    const language=document.querySelector('.language-toggle');
    const modePanel=document.querySelector('.mode-panel');
    const viewMode=document.querySelector('.mode-panel .segmented');
    if(brand)brand.setAttribute('aria-label',text.brand);
    if(nav)nav.setAttribute('aria-label',text.nav);
    if(language)language.setAttribute('aria-label',text.language);
    if(modePanel)modePanel.setAttribute('aria-label',text.modePanel);
    if(viewMode)viewMode.setAttribute('aria-label',text.viewMode);
  };

  const observer=new MutationObserver(apply);
  observer.observe(document.documentElement,{attributes:true,attributeFilter:['lang','dir']});
  document.addEventListener('click',event=>{
    if(event.target.closest('[data-language]'))queueMicrotask(apply);
  });
  window.addEventListener('storage',event=>{
    if(event.key==='aam-personal-language')queueMicrotask(apply);
  });
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});
  else apply();
})();
