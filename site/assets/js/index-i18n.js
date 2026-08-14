(()=>{
  const storageKey='aam-personal-language';
  const copy={
    en:{
      metaTitle:'Applied AI Mastery — Choose Your Course',
      metaDescription:'Choose an Applied AI Mastery course for professional work, K–12 teaching, or everyday life.',
      skip:'Skip to course selection',brand:'Applied AI Mastery home',nav:'Primary navigation',language:'Language',courses:'Courses',
      heroEyebrow:'Three practical paths to AI fluency',heroTitle:'Choose where you want AI to make you more capable.',heroText:'All three courses teach the same durable habits: define the real problem, provide useful context, compare evidence, verify outputs, preserve uncertainty, and keep important decisions under human control.',chooseCourse:'Choose a course',version:'Beta',
      catalogEyebrow:'Course catalogue',catalogTitle:'Three tracks, different contexts',
      professionalBadge:'Professional track',professionalTitle:'Applied AI for Work & Engineering',professionalText:'For students, graduates, makers, and professionals who want to solve realistic workplace and technical problems through the AquaForge simulation.',professionalMeta:'7 missions + integrated capstone',
      personalBadge:'Personal track',personalTitle:'Applied AI for Everyday Life',personalText:'For anyone who wants to use AI for everyday decisions, planning, creativity, research, personal projects, and meaningful work.',personalMeta:'7 integrated sessions · 90 minutes each',
      teacherBadge:'Teacher track',teacherTitle:'Applied AI for K–12 Teaching',teacherText:'For K–12 teachers who want to create and review lesson plans, learning materials, research briefs, gradebook analyses, presentations, workflows, and simple classroom apps.',teacherMeta:'7 missions + integrated capstone',
      philosophyEyebrow:'Shared philosophy',philosophyTitle:'AI is the tool. Better judgment is the outcome.',philosophyText:'The goal is not memorizing one product. Across all three courses, learners break down unfamiliar problems, ask better questions, compare outputs, verify facts, recognize uncertainty, and turn ideas into useful artifacts.',
      skillsTitle:'Skills shared by all three courses',skillPrompt:'Prompt design and iteration',skillResearch:'Research and source checking',skillDecision:'Decision frameworks',skillData:'Data and document creation',skillCreative:'Creative generation',skillAutomation:'Automation with safe boundaries',skillReflection:'Reflection on human judgment',footerBrand:'Applied AI Mastery ·'
    },
    he:{
      metaTitle:'Applied AI Mastery — בחירת קורס',
      metaDescription:'בחרו קורס של Applied AI Mastery לעבודה מקצועית, להוראה בא׳–י״ב או לחיי היום־יום.',
      skip:'דילוג לבחירת הקורס',brand:'דף הבית של Applied AI Mastery',nav:'ניווט ראשי',language:'שפה',courses:'קורסים',
      heroEyebrow:'שלושה מסלולים מעשיים לשליטה ב-AI',heroTitle:'בחרו היכן תרצו ש-AI יעזור לכם להיות מסוגלים יותר.',heroText:'שלושת הקורסים מלמדים הרגלים שימושיים לטווח ארוך: להגדיר את הבעיה האמיתית, לספק הקשר מועיל, להשוות ראיות, לאמת תוצרים, לשמור על אי־ודאות ולהשאיר החלטות חשובות בשליטה אנושית.',chooseCourse:'בחירת קורס',version:'בטא',
      catalogEyebrow:'קטלוג הקורסים',catalogTitle:'שלושה מסלולים, הקשרים שונים',
      professionalBadge:'המסלול המקצועי',professionalTitle:'AI יישומי לעבודה ולהנדסה',professionalText:'לסטודנטים, לבוגרים, ליוצרים ולאנשי מקצוע שרוצים לפתור בעיות מציאותיות מהעבודה ומהעולם הטכני באמצעות הסימולציה של AquaForge.',professionalMeta:'7 משימות + פרויקט מסכם משולב',
      personalBadge:'המסלול האישי',personalTitle:'AI יישומי לחיי היום־יום',personalText:'לכל מי שרוצה להשתמש ב-AI להחלטות יום־יומיות, תכנון, יצירתיות, מחקר, פרויקטים אישיים ועבודה משמעותית.',personalMeta:'7 מפגשים משולבים · 90 דקות לכל מפגש',
      teacherBadge:'המסלול למורים',teacherTitle:'AI יישומי להוראה בא׳–י״ב',teacherText:'למורים ומורות בא׳–י״ב שרוצים ליצור ולבדוק מערכי שיעור, חומרי למידה, תקצירי מחקר, ניתוחי גיליונות ציונים, מצגות, תהליכי עבודה ויישומים פשוטים לכיתה.',teacherMeta:'7 משימות + פרויקט מסכם משולב',
      philosophyEyebrow:'פילוסופיה משותפת',philosophyTitle:'AI הוא הכלי. שיקול דעת טוב יותר הוא התוצאה.',philosophyText:'המטרה אינה לשנן מוצר אחד. בשלושת הקורסים לומדים לפרק בעיות לא מוכרות, לשאול שאלות טובות יותר, להשוות תוצרים, לאמת עובדות, לזהות אי־ודאות ולהפוך רעיונות לתוצרים שימושיים.',
      skillsTitle:'מיומנויות משותפות לכל שלושת הקורסים',skillPrompt:'תכנון פרומפטים ושיפורם',skillResearch:'מחקר ובדיקת מקורות',skillDecision:'מסגרות לקבלת החלטות',skillData:'יצירת נתונים ומסמכים',skillCreative:'יצירה בעזרת AI',skillAutomation:'אוטומציה עם גבולות בטוחים',skillReflection:'רפלקציה על שיקול דעת אנושי',footerBrand:'Applied AI Mastery ·'
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
    const professionalLink=document.querySelector('[data-professional-link]');
    if(professionalLink)professionalLink.href=`professional.html?lang=${lang}`;
    const teacherLink=document.querySelector('[data-teacher-link]');
    if(teacherLink)teacherLink.href=`teacher.html?lang=${lang}`;
    const year=document.querySelector('[data-year]');
    if(year)year.textContent=new Date().getFullYear();
    if(persist)localStorage.setItem(storageKey,lang);
  }

  document.querySelectorAll('[data-language]').forEach(button=>button.addEventListener('click',()=>setLanguage(button.dataset.language)));
  window.addEventListener('storage',event=>{if(event.key===storageKey)setLanguage(event.newValue==='he'?'he':'en',false);});
  setLanguage(localStorage.getItem(storageKey)==='he'?'he':'en',false);
})();
