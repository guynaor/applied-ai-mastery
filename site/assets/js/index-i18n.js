(()=>{
  const storageKey='aam-personal-language';
  const copy={
    en:{
      metaTitle:'Applied AI Mastery — Choose Your Course',
      metaDescription:'Choose an Applied AI Mastery course: professional problem-solving or practical AI for everyday life.',
      skip:'Skip to course selection',brand:'Applied AI Mastery home',nav:'Primary navigation',language:'Language',courses:'Courses',
      heroEyebrow:'Two practical paths to AI fluency',heroTitle:'Choose where you want AI to make you more capable.',heroText:'Both courses teach the same durable habits: define the real problem, provide useful context, compare evidence, verify outputs, preserve uncertainty, and keep important decisions under human control.',chooseCourse:'Choose a course',version:'Beta',
      catalogEyebrow:'Course catalogue',catalogTitle:'Two tracks, different life stages',
      professionalBadge:'Professional track',professionalTitle:'Applied AI for Work & Engineering',professionalText:'For students, graduates, makers, and professionals who want to solve realistic workplace and technical problems through the AquaForge simulation.',professionalMeta:'7 missions + integrated capstone',
      personalBadge:'Personal track',personalTitle:'Applied AI for Everyday Life',personalText:'For young adults before or after university who want to use AI for decisions, planning, creativity, money research, career preparation, and personal projects.',personalMeta:'12 focused lessons · 20–30 minutes each',
      philosophyEyebrow:'Shared philosophy',philosophyTitle:'AI is the tool. Better judgment is the outcome.',philosophyText:'The goal is not memorizing one product. Students learn to break down unfamiliar problems, ask better questions, compare outputs, verify facts, recognize uncertainty, and turn ideas into useful artifacts.',
      skillsTitle:'Skills shared by both courses',skillPrompt:'Prompt design and iteration',skillResearch:'Research and source checking',skillDecision:'Decision frameworks',skillData:'Data and document creation',skillCreative:'Creative generation',skillAutomation:'Automation with safe boundaries',skillReflection:'Reflection on human judgment',footerBrand:'Applied AI Mastery ·'
    },
    he:{
      metaTitle:'Applied AI Mastery — בחירת קורס',
      metaDescription:'בחרו קורס של Applied AI Mastery: פתרון בעיות מקצועי או שימוש מעשי ב-AI בחיי היום־יום.',
      skip:'דילוג לבחירת הקורס',brand:'דף הבית של Applied AI Mastery',nav:'ניווט ראשי',language:'שפה',courses:'קורסים',
      heroEyebrow:'שני מסלולים מעשיים לשליטה ב-AI',heroTitle:'בחרו היכן תרצו ש-AI יעזור לכם להיות מסוגלים יותר.',heroText:'שני הקורסים מלמדים הרגלים שימושיים לטווח ארוך: להגדיר את הבעיה האמיתית, לספק הקשר מועיל, להשוות ראיות, לאמת תוצרים, לשמור על אי־ודאות ולהשאיר החלטות חשובות בשליטה אנושית.',chooseCourse:'בחירת קורס',version:'בטא',
      catalogEyebrow:'קטלוג הקורסים',catalogTitle:'שני מסלולים לשלבים שונים בחיים',
      professionalBadge:'המסלול המקצועי',professionalTitle:'AI יישומי לעבודה ולהנדסה',professionalText:'לסטודנטים, לבוגרים, ליוצרים ולאנשי מקצוע שרוצים לפתור בעיות מציאותיות מהעבודה ומהעולם הטכני באמצעות הסימולציה של AquaForge.',professionalMeta:'7 משימות + פרויקט מסכם משולב',
      personalBadge:'המסלול האישי',personalTitle:'AI יישומי לחיי היום־יום',personalText:'לצעירים לפני האוניברסיטה או אחריה שרוצים להשתמש ב-AI לקבלת החלטות, תכנון, יצירתיות, מחקר פיננסי, הכנה לקריירה ופרויקטים אישיים.',personalMeta:'12 שיעורים ממוקדים · 20–30 דקות לכל שיעור',
      philosophyEyebrow:'פילוסופיה משותפת',philosophyTitle:'AI הוא הכלי. שיקול דעת טוב יותר הוא התוצאה.',philosophyText:'המטרה אינה לשנן מוצר אחד. לומדים לפרק בעיות לא מוכרות, לשאול שאלות טובות יותר, להשוות תוצרים, לאמת עובדות, לזהות אי־ודאות ולהפוך רעיונות לתוצרים שימושיים.',
      skillsTitle:'מיומנויות משותפות לשני הקורסים',skillPrompt:'תכנון פרומפטים ושיפורם',skillResearch:'מחקר ובדיקת מקורות',skillDecision:'מסגרות לקבלת החלטות',skillData:'יצירת נתונים ומסמכים',skillCreative:'יצירה בעזרת AI',skillAutomation:'אוטומציה עם גבולות בטוחים',skillReflection:'רפלקציה על שיקול דעת אנושי',footerBrand:'Applied AI Mastery ·'
    }
  };

  function setLanguage(language,persist=true){
    const lang=language==='he'?'he':'en';
    const text=copy[lang];
    document.documentElement.lang=lang;
    document.documentElement.dir=lang==='he'?'rtl':'ltr';
    document.body.classList.toggle('rtl',lang==='he');
    document.querySelectorAll('[data-language]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.language===lang)));
    document.querySelectorAll('[data-i18n]').forEach(element=>{const value=text[element.dataset.i18n];if(value)element.textContent=value;});
    document.querySelectorAll('[data-i18n-aria-label]').forEach(element=>{const value=text[element.dataset.i18nAriaLabel];if(value)element.setAttribute('aria-label',value);});
    document.title=text.metaTitle;
    const description=document.querySelector('meta[name="description"]');
    if(description)description.content=text.metaDescription;
    const year=document.querySelector('[data-year]');
    if(year)year.textContent=new Date().getFullYear();
    if(persist)localStorage.setItem(storageKey,lang);
  }

  document.querySelectorAll('[data-language]').forEach(button=>button.addEventListener('click',()=>setLanguage(button.dataset.language)));
  window.addEventListener('storage',event=>{if(event.key===storageKey)setLanguage(event.newValue==='he'?'he':'en',false);});
  setLanguage(localStorage.getItem(storageKey)==='he'?'he':'en',false);
})();
