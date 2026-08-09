import {mkdirSync,readFileSync,writeFileSync} from 'node:fs';
import {dirname} from 'node:path';
import {Document,HeadingLevel,Packer,Paragraph,Table,TableCell,TableRow,TextRun,WidthType,AlignmentType} from 'docx';
import {parseJournalTabs} from './lib/journal-tabs.mjs';

const output={
 en:'site/assets/downloads/applied-ai-mastery-personal-journal-en.docx',
 he:'site/assets/downloads/applied-ai-mastery-personal-journal-he.docx',
};
const levels={
 en:[
  ['Bronze','Complete one checked decision record for a real choice.'],['Silver','Compare at least two options with evidence and explain the trade-off you chose.'],['Gold','Ask a trusted person to challenge your criteria, then revise the record and note what changed.'],
  ['Bronze','Research one realistic purchase and complete the evidence matrix.'],['Silver','Write a research brief and a reviewable monitoring rule.'],['Gold','Test the recommendation with a real buyer or owner and revise it using their feedback.'],
  ['Bronze','Create a shareable plan with owners, dates, and one fallback.'],['Silver','Stress-test the plan against two changes and add a recheck list.'],['Gold','Use the plan with another person or group and improve it from their feedback.'],
  ['Bronze','Build a Claude Artifact that solves one recurring problem and pass a normal test.'],['Silver','Revise it after normal, empty-input, and edge-case tests.'],['Gold','Let one other person try it and improve one part from their feedback.'],
  ['Bronze','Capture the key measurements and make one layout proposal.'],['Silver','Run a physical fit check and revise the proposal from what you found.'],['Gold','Prototype one element with paper, cardboard, or tape and document the improvement.'],
  ['Bronze','Create a short storyboard with sources and labels.'],['Silver','Produce the visual story with accessibility notes and fact checks.'],['Gold','Show it to a member of the intended audience and revise for clarity or trust.'],
  ['Bronze','Create a small personal workflow with one approval point.'],['Silver','Complete the evidence register and permission map for a final personal project.'],['Gold','Run a limited real-world trial, then document what you paused, changed, or kept under your control.'],
 ],
 he:[
  ['Bronze','השלימו רישום החלטה אחד שנבדק עבור בחירה אמיתית.'],['Silver','השוו לפחות שתי אפשרויות בעזרת ראיות והסבירו את הפשרה שבחרתם.'],['Gold','בקשו מאדם מהימן לאתגר את הקריטריונים, עדכנו את הרישום ותעדו מה השתנה.'],
  ['Bronze','חקרו קנייה מציאותית אחת והשלימו את מטריצת הראיות.'],['Silver','כתבו תקציר מחקר וכלל מעקב שאפשר לבחון.'],['Gold','בדקו את ההמלצה עם קונה או בעלים אמיתי ועדכנו אותה בעקבות המשוב.'],
  ['Bronze','צרו תוכנית שאפשר לשתף עם אחראים, תאריכים וחלופה אחת.'],['Silver','בדקו את התוכנית מול שני שינויים והוסיפו רשימת בדיקה חוזרת.'],['Gold','השתמשו בתוכנית עם אדם או קבוצה נוספת ושפרו אותה בעקבות המשוב.'],
  ['Bronze','בנו Claude Artifact שפותר בעיה חוזרת ועובר בדיקה רגילה.'],['Silver','שפרו אותו לאחר בדיקות של מקרה רגיל, קלט ריק ומקרה קצה.'],['Gold','תנו לאדם נוסף לנסות את הכלי ושפרו חלק אחד בעקבות המשוב.'],
  ['Bronze','אספו את המדידות החשובות וצרו הצעה אחת לסידור.'],['Silver','בצעו בדיקת התאמה פיזית ועדכנו את ההצעה לפי הממצאים.'],['Gold','בנו אב־טיפוס של רכיב אחד בנייר, קרטון או סרט הדבקה ותעדו את השיפור.'],
  ['Bronze','צרו סטוריבורד קצר עם מקורות וסימונים.'],['Silver','הפיקו את הסיפור החזותי עם הערות נגישות ובדיקות עובדה.'],['Gold','הציגו אותו לאדם מהקהל המיועד ושפרו אותו לבהירות או לאמינות.'],
  ['Bronze','צרו תהליך אישי קטן עם נקודת אישור אחת.'],['Silver','השלימו רישום ראיות ומפת הרשאות לפרויקט אישי מסכם.'],['Gold','בצעו ניסוי מוגבל בעולם האמיתי ותעדו מה עצרתם, שיניתם או השארתם בשליטתכם.'],
 ],
};

function cell(text,bold=false){return new TableCell({children:[new Paragraph({children:[new TextRun({text,bold})]})]});}
function renderMarkdown(markdown,rtl){
 const children=[];const lines=markdown.replace(/<!-- journal-tab: [^>]+ -->\n?/g,'').trim().split('\n');
 const paragraph=(text,options={})=>children.push(new Paragraph({bidirectional:rtl,alignment:rtl?AlignmentType.RIGHT:undefined,...options,children:[new TextRun({text})]}));
 for(let index=0;index<lines.length;){
  const line=lines[index];
  if(!line.trim()){index+=1;continue;}
  if(line.startsWith('# ')){paragraph(line.slice(2),{heading:HeadingLevel.TITLE});index+=1;continue;}
  if(line.startsWith('## ')){paragraph(line.slice(3),{heading:HeadingLevel.HEADING_1});index+=1;continue;}
  if(line.startsWith('|')){
   const rows=[];while(index<lines.length&&lines[index].startsWith('|'))rows.push(lines[index++]);
   const data=rows.filter((row,rowIndex)=>rowIndex!==1).map(row=>row.split('|').slice(1,-1).map(value=>value.trim()));
   children.push(new Table({width:{size:100,type:WidthType.PERCENTAGE},rows:data.map((row,rowIndex)=>new TableRow({children:row.map(value=>cell(value,rowIndex===0))}))}));continue;
  }
  if(line.startsWith('- ')){paragraph(line.slice(2),{bullet:{level:0}});index+=1;continue;}
  paragraph(line.replaceAll('**',''));index+=1;
 }
 return children;
}
function taskTable(locale,session){
 const tasks=levels[locale].slice(session*3,session*3+3);const rtl=locale==='he';
 return [
  new Paragraph({bidirectional:rtl,alignment:rtl?AlignmentType.RIGHT:undefined,heading:HeadingLevel.HEADING_1,children:[new TextRun({text:rtl?'בחירת רמת המשימה':'Choose your task level'})]}),
  new Paragraph({bidirectional:rtl,alignment:rtl?AlignmentType.RIGHT:undefined,children:[new TextRun({text:rtl?'Bronze מספיק להשלמה; Silver הוא היעד הרגיל; Gold הוא אתגר אופציונלי.':'Bronze is sufficient for completion; Silver is the normal target; Gold is an optional extension.'})]}),
  new Table({width:{size:100,type:WidthType.PERCENTAGE},rows:[new TableRow({children:[cell(rtl?'רמה':'Level',true),cell(rtl?'המשימה':'Task',true)]}),...tasks.map(([level,task])=>new TableRow({children:[cell(level,true),cell(task)]}))]}),
 ];
}
async function build(locale){
 const source=locale==='en'?'personal-course/student/en/ai-learning-journal.md':'personal-course/student/he/ai-learning-journal.md';
 const rtl=locale==='he';const tabs=parseJournalTabs(readFileSync(source,'utf8'));
 const sections=[];
 tabs.forEach((tab,index)=>{sections.push(...renderMarkdown(tab.markdown,rtl));if(tab.id.startsWith('session-'))sections.push(...taskTable(locale,index-4));if(index<tabs.length-1)sections.push(new Paragraph({pageBreakBefore:true}));});
 const document=new Document({sections:[{properties:{},children:sections}]});
 mkdirSync(dirname(output[locale]),{recursive:true});writeFileSync(output[locale],await Packer.toBuffer(document));
}
await build('en');await build('he');
