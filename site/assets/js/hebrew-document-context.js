(()=>{
  const params=new URLSearchParams(location.search);
  const source=params.get('src')||'';
  if(!source.startsWith('personal-course/he/'))return;

  localStorage.setItem('aam-personal-language','he');

  const apply=()=>{
    const backLink=document.querySelector('[data-back-link]');
    if(backLink){
      backLink.href='personal.html?lang=he#lessons';
      backLink.textContent='חזרה לשיעורים האישיים';
    }
  };

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});
  else apply();
})();
