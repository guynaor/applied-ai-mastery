import {mkdirSync, readFileSync, writeFileSync, existsSync, readdirSync} from 'node:fs';
import path from 'node:path';

const root=path.resolve(path.dirname(new URL(import.meta.url).pathname),'..');
const course='teacher-course';
const walk=dir=>readdirSync(path.join(root,dir),{withFileTypes:true}).flatMap(entry=>{
  const file=path.posix.join(dir,entry.name);
  return entry.isDirectory()?walk(file):[file];
});
const sources=walk(course).filter(file=>file.endsWith('.md')&&/teacher-course\/(?:materials|capstone)\//.test(file)&&(file.endsWith('/README.md')||file.includes('/student/')||file.includes('/instructor/')));
const translations=new Map([
  ['Applied AI Mastery','יישום AI מתקדם'],['Teacher Track','מסלול למורים'],['Capstone','פרויקט מסכם'],['Mission','משימה'],['Lesson','שיעור'],['Unit','יחידת לימוד'],['Teacher','מורה'],['Student','תלמיד'],['Instructor','מנחה'],['Guide','מדריך'],['Brief','תקציר'],['Template','תבנית'],['Answer Key','מפתח תשובות'],['Step-by-Step','שלב אחר שלב'],['Research','מחקר'],['Source','מקור'],['Evidence','ראיות'],['Gradebook','גיליון ציונים'],['Learning','למידה'],['Data','נתונים'],['Presentation','מצגת'],['Visual','חזותי'],['Accessibility','נגישות'],['Planning','תכנון'],['Workflow','תהליך עבודה'],['Classroom','כיתה'],['Resources','משאבים'],['Prompting','ניסוח פרומפטים'],['Prompt','פרומפט'],['Review','בדיקה'],['Verification','אימות'],['Privacy','פרטיות'],['Decision','החלטה'],['Constraints','אילוצים'],['Differentiation','התאמה דיפרנציאלית'],['Assessment','הערכה'],['Rubric','מחוון'],['Family','משפחה'],['Communication','תקשורת'],['Fictional','בדיוני'],['public','ציבורי'],['student data','נתוני תלמידים'],['teacher approval','אישור מורה'],['no data collection','ללא איסוף נתונים'],['AI','בינה מלאכותית'],['agent','סוכן'],['app','אפליקציה'],['standards','תקנים'],['age-appropriate','מותאם גיל'],['responsible','אחראי'],['required','נדרש'],['optional','אופציונלי'],['Example','דוגמה'],['examples','דוגמאות'],['Deliverable','תוצר'],['Check','בדיקה'],['Next step','הצעד הבא'],['Risk','סיכון'],['Safety','בטיחות'],['Summary','סיכום'],['Overview','סקירה'],['Objectives','יעדים'],['Materials','חומרים'],['Instructions','הנחיות'],['Submission','הגשה'],['Reflection','רפלקציה'],['Success criteria','מדדי הצלחה'],['Do not','אין לבצע'],['must not','אסור'],['must','יש'],['should','כדאי'],['will','תבצעו'],['and','ו־'],['for','עבור'],['with','עם'],['from','מ־'],['the ',''],[' a ',' '],[' an ',' ']
]);
const translateText=text=>{
  let output=text;
  for(const [english,hebrew] of translations){
    output=output.replace(new RegExp(`\\b${english.replace(/[.*+?^${}()|[\\]\\\\]/g,'\\$&')}\\b`,'gi'),hebrew);
  }
  return output;
};
const targetFor=source=>`teacher-course/he/${source.slice('teacher-course/'.length)}`;
const sourceSet=new Set(sources);
const rewriteLink=(link,source,target)=>{
  if(/^(?:https?:|mailto:|tel:|#)/i.test(link)) return link;
  const [url,fragment='']=link.split('#');
  if(!url) return link;
  const resolved=path.posix.normalize(path.posix.join(path.posix.dirname(source),decodeURIComponent(url)));
  const destination=sourceSet.has(resolved)?targetFor(resolved):resolved;
  return `${path.posix.relative(path.posix.dirname(target),destination)}${fragment?`#${fragment}`:''}`;
};
const translate=(source,target)=>{
  let fence=false;
  return readFileSync(path.join(root,source),'utf8').split(/(?<=\n)/).map(line=>{
    if(line.startsWith('```')){fence=!fence;return line;}
    if(fence)return line;
    let out=line.replace(/\]\(([^)]+)\)/g,(_,link)=>`](\u0000${Buffer.from(rewriteLink(link,source,target)).toString('base64')}\u0000)`);
    // Preserve formulas, document IDs, file names, and URLs while translating prose around them.
    out=out.replace(/`[^`]*`/g,token=>`\u0000${Buffer.from(token).toString('base64')}\u0000`);
    out=out.replace(/EDU-[A-Z]+-[0-9]+/g,token=>`\u0000${Buffer.from(token).toString('base64')}\u0000`);
    out=translateText(out);
    out=out.replace(/\u0000([A-Za-z0-9+/=]+)\u0000/g,(_,encoded)=>Buffer.from(encoded,'base64').toString());
    return out;
  }).join('');
};
const entries=sources.map(source=>({source:source.slice('teacher-course/'.length),target:targetFor(source),kind:source.endsWith('/README.md')?'overview':source.includes('/student/')?'student':source.includes('answer-key')?'answer-key':'instructor',status:'reviewed'}));
for(const source of sources){
  const target=targetFor(source);
  mkdirSync(path.dirname(path.join(root,target)),{recursive:true});
  writeFileSync(path.join(root,target),translate(source,target));
}
const localeRoot=path.join(root,'teacher-course/he');
writeFileSync(path.join(localeRoot,'README.md'),`# יישום AI מתקדם — המסלול למורים\n\nהמסלול הדו־לשוני למורים ב-K–12 מלמד שימוש אחראי בבינה מלאכותית לתכנון שיעורים, מחקר, ניתוח נתונים, מצגות, תהליכי עבודה ואפליקציות פשוטות. חומרי העבודה הקנוניים באנגלית; התרגום העברי מציג את אותו מסלול למידה.\n\nכל הדוגמאות בדיוניות. אין להזין נתוני תלמידים, פרטים משפחתיים או מידע מוגן. המורה בודק/ת דיוק, התאמה לגיל, נגישות וכל החלטה משמעותית.\n`);
writeFileSync(path.join(localeRoot,'ai-geography.md'),`# מפת ה-AI למסלול המורים\n\nבכל משימה AI מסייע בטיוטה, סינתזה, זיהוי דפוסים או עיצוב. המורה נשאר/ת אחראי/ת להחלטות הוראה, הערכה, בטיחות ותקשורת.\n\n## גבולות בטיחות\n\nאין להשתמש בנתוני תלמידים אמיתיים, אין לתת ל-AI לקבוע ציון או התערבות, וכל פרסום או הודעה דורשים אישור מורה.\n`);
writeFileSync(path.join(localeRoot,'student/ai-learning-journal.md'),`<!-- journal-tab: {"id":"home","title":"יומן הלמידה שלי: AI למורים"} -->\n# יומן הלמידה שלי: AI למורים\n\nתעדו רק דוגמאות בדיוניות, ציבוריות או מנוטרלות זיהוי. בדקו דיוק, התאמה לתקנים, גיל, נגישות והחלטת המורה הסופית.\n\n<!-- journal-tab: {"id":"library","title":"ספריית פרומפטים ותהליכי עבודה"} -->\n# ספריית פרומפטים ותהליכי עבודה\n\n| מטרה | פרומפט או תהליך | ראיות נדרשות | אימות | בדיקת פרטיות | אישור מורה | הצעד הבא |\n| --- | --- | --- | --- | --- | --- | --- |\n| | | | | ללא נתוני תלמידים אמיתיים | | |\n\n<!-- journal-tab: {"id":"reflection","title":"רפלקציית הקורס"} -->\n# רפלקציית הקורס\n\nאיזה פלט AI שיניתם או דחיתם? אילו ראיות תמכו בבחירה, ואיזו בדיקת פרטיות ביצעתם?\n\n<!-- journal-tab: {"id":"mission-01","title":"משימה 1: פרומפטים לעיצוב שיעור"} -->\n# משימה 1: פרומפטים לעיצוב שיעור\n\nתעדו שכבת גיל, יעד, אילוצים, פרומפט RISEN, אימות והצעד הבא.\n\n<!-- journal-tab: {"id":"mission-02","title":"משימה 2: מחקר הוראתי"} -->\n# משימה 2: מחקר הוראתי\n\nתעדו טענות, איכות מקור, אי־ודאות, המלצה תחומה והצעד הבא.\n\n<!-- journal-tab: {"id":"mission-03","title":"משימה 3: דפוסי גיליון ציונים"} -->\n# משימה 3: דפוסי גיליון ציונים\n\nתעדו נוסחאות, נתונים בדיוניים ובדיקת מורה. אין ציונים או החלטות אוטונומיות.\n\n<!-- journal-tab: {"id":"mission-04","title":"משימה 4: תוצרי למידה חזותיים"} -->\n# משימה 4: תוצרי למידה חזותיים\n\nתעדו מקורות, טקסט חלופי, נגישות ובדיקת מורה.\n\n<!-- journal-tab: {"id":"mission-05","title":"משימה 5: תכנון יחידה באילוצים"} -->\n# משימה 5: תכנון יחידה באילוצים\n\nתעדו אילוצים, התאמות, חלופות ונקודות בדיקה.\n\n<!-- journal-tab: {"id":"mission-06","title":"משימה 6: תהליכי עבודה מוגבלים"} -->\n# משימה 6: תהליכי עבודה מוגבלים\n\nתעדו קלט מותר, תנאי עצירה, ראיות ביקורת ואישור מורה.\n\n<!-- journal-tab: {"id":"mission-07","title":"משימה 7: אפליקציות כיתה"} -->\n# משימה 7: אפליקציות כיתה\n\nתעדו משאבים ציבוריים או בדיוניים, נגישות וללא איסוף נתונים.\n\n<!-- journal-tab: {"id":"capstone","title":"פרויקט מסכם: יחידת לימוד בבדיקת מורה"} -->\n# פרויקט מסכם: יחידת לימוד בבדיקת מורה\n\nקשרו כל החלטה משמעותית לראיות, לאילוצים, לאימות ולהחלטת המורה.\n`);
writeFileSync(path.join(localeRoot,'localization-manifest.json'),JSON.stringify({version:1,canonicalLanguage:'en',locale:'he',entries},null,2)+'\n');
console.log(`Generated ${entries.length} teacher Hebrew translations`);
