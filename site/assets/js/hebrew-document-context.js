(()=>{
  const params=new URLSearchParams(location.search);
  const source=params.get('src')||'';
  const personalHebrew=source.startsWith('personal-course/he/');
  const professionalHebrew=source.startsWith('professional-course/he/');
  if(!personalHebrew&&!professionalHebrew)return;

  if(personalHebrew)localStorage.setItem('aam-personal-language','he');
  if(professionalHebrew)localStorage.setItem('aam-professional-language','he');

  document.documentElement.lang='he';
  document.documentElement.dir='rtl';

  const apply=()=>{
    document.body.classList.add('rtl');
    const backLink=document.querySelector('[data-back-link]');
    if(!backLink)return;
    backLink.href=personalHebrew?'personal.html?lang=he#lessons':'professional.html?lang=he#missions';
    backLink.textContent=personalHebrew?'חזרה לשיעורים האישיים':'חזרה למסלול המקצועי';
  };

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});
  else apply();
})();
