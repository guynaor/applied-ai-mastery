import {mkdirSync,readFileSync,writeFileSync} from 'node:fs';
import {dirname} from 'node:path';
import {AlignmentType,Document,HeadingLevel,Packer,Paragraph,Table,TableCell,TableRow,TextRun,WidthType,HeightRule} from 'docx';
import JSZip from 'jszip';
import {parseJournalTabs} from './lib/journal-tabs.mjs';

const outputDirectory=process.env.PERSONAL_WORKBOOK_OUTPUT_DIR??'site/assets/downloads';
const output={
 en:`${outputDirectory}/applied-ai-mastery-personal-journal-en.docx`,
 he:`${outputDirectory}/applied-ai-mastery-personal-journal-he.docx`,
};
const levelHeadings={en:['Bronze','Silver','Gold'],he:['ארד','כסף','זהב']};

const palette={primary:'4E356F',secondary:'7B4FB3',soft:'F0EAFA',text:'17242D',bronze:'C98A2E',silver:'94A3B8',gold:'D4A72C',example:'F1F3F6',exampleText:'55606E'};
// No \b after the alternatives: JavaScript word boundaries are ASCII-only and never match after a Hebrew letter.
const exampleLabel=/^(?:Example|דוגמה)/;
// w:jc is logical, not physical: LEFT means start-of-line, so it aligns left in LTR and right inside w:bidi. Never use RIGHT for Hebrew (it means end-of-line, which renders visually left), and never omit it, because renderers then fall back to their own default direction.
const startAligned=AlignmentType.LEFT;
function cell(text,bold=false,rtl=false,fill='FFFFFF',color=palette.text,italics=false){return new TableCell({shading:{fill},children:[new Paragraph({bidirectional:rtl,alignment:startAligned,children:[new TextRun({text,bold,italics,color,rightToLeft:rtl})]})]});}
function renderMarkdown(markdown,locale,isSession=false){
 const rtl=locale==='he';const names=levelHeadings[locale];
 const children=[];const lines=markdown.replace(/<!-- journal-tab: [^>]+ -->\n?/g,'').trim().split('\n');
 let lessonFlowInserted=false;let inHomework=false;let skippingLevel=false;
 const paragraph=(text,options={})=>children.push(new Paragraph({bidirectional:rtl,alignment:startAligned,...options,children:[new TextRun({text,bold:Boolean(options.heading),color:options.heading===HeadingLevel.TITLE?'FFFFFF':options.heading?palette.primary:palette.text,rightToLeft:rtl})]}));
 for(let index=0;index<lines.length;){
  const line=lines[index];
  if(!line.trim()){index+=1;continue;}
  if(skippingLevel&&!line.startsWith('## ')){index+=1;continue;}
  if(line.startsWith('# ')){paragraph(line.slice(2),{heading:HeadingLevel.TITLE,shading:{fill:palette.primary},spacing:{after:220}});index+=1;continue;}
  if(line.startsWith('## ')){
   const headingText=line.slice(3);
   if(names.includes(headingText)){
    // The three levels render only as the coloured task table, so the journal never states them twice.
    if(headingText===names[0])children.push(...taskTable(locale,levelTasks(markdown,locale)));
    skippingLevel=true;index+=1;continue;
   }
   skippingLevel=false;
   const isHomeworkStart=headingText===(rtl?'מטרה':'Goal');
   if(isHomeworkStart){
    inHomework=true;
    paragraph(rtl?'משימת בית':'Homework',{heading:HeadingLevel.HEADING_1,shading:{fill:palette.soft},spacing:{before:240,after:110}});
   }else if(isSession&&!lessonFlowInserted){
    lessonFlowInserted=true;
    paragraph(rtl?'מהלך השיעור':'Lesson flow',{heading:HeadingLevel.HEADING_1,shading:{fill:palette.soft},spacing:{before:240,after:110}});
   }
   paragraph(headingText,{heading:inHomework?HeadingLevel.HEADING_2:HeadingLevel.HEADING_1,shading:inHomework?{fill:'E9F1FB'}:{fill:palette.soft},spacing:{before:inHomework?140:200,after:100}});
   index+=1;continue;
  }
  if(line.startsWith('|')){
   const rows=[];while(index<lines.length&&lines[index].startsWith('|'))rows.push(lines[index++]);
   const data=rows.filter((row,rowIndex)=>rowIndex!==1).map(row=>row.split('|').slice(1,-1).map(value=>value.trim().replaceAll('**','')));
   const exampleColumns=new Set((data[0]??[]).flatMap((value,column)=>exampleLabel.test(value)?[column]:[]));
   children.push(new Table({visuallyRightToLeft:rtl,width:{size:100,type:WidthType.PERCENTAGE},rows:data.map((row,rowIndex)=>{
    const header=rowIndex===0;const exampleRow=!header&&exampleLabel.test(row[0]??'');
    return new TableRow({height:header?undefined:{value:454,rule:HeightRule.ATLEAST},children:row.map((value,column)=>{
     const example=!header&&(exampleRow||exampleColumns.has(column));
     return cell(value,header,rtl,header?palette.primary:example?palette.example:'FFFFFF',header?'FFFFFF':example?palette.exampleText:palette.text,example);
    })});
   })}));continue;
  }
  if(line.startsWith('- ')){paragraph(line.slice(2),{bullet:{level:0}});index+=1;continue;}
  paragraph(line.replaceAll('**',''));index+=1;
 }
 return children;
}
function levelTasks(markdown,locale){
 const lines=markdown.split('\n');
 return levelHeadings[locale].map(name=>{
  const start=lines.findIndex(line=>line.trim()===`## ${name}`);
  if(start<0)throw new Error(`Missing "## ${name}" level in ${locale} journal tab`);
  const body=[];
  for(let index=start+1;index<lines.length&&!lines[index].startsWith('## ');index+=1)body.push(lines[index]);
  const task=body.join(' ').replaceAll('**','').replace(/\s+/g,' ').trim();
  if(!task)throw new Error(`Empty "## ${name}" level in ${locale} journal tab`);
  return task;
 });
}
function taskTable(locale,taskTexts){
 const tasks=['Bronze','Silver','Gold'].map((level,index)=>[level,taskTexts[index]]);const rtl=locale==='he';
 return [
  new Paragraph({bidirectional:rtl,alignment:startAligned,heading:HeadingLevel.HEADING_2,shading:{fill:'E9F1FB'},children:[new TextRun({text:rtl?'בחירת רמת המשימה':'Choose your task level',bold:true,color:palette.primary,rightToLeft:rtl})]}),
  new Paragraph({bidirectional:rtl,alignment:startAligned,children:[new TextRun({text:rtl?'Bronze מספיק להשלמה; Silver הוא היעד הרגיל; Gold הוא אתגר אופציונלי.':'Bronze is sufficient for completion; Silver is the normal target; Gold is an optional extension.',rightToLeft:rtl})]}),
  new Table({visuallyRightToLeft:rtl,width:{size:100,type:WidthType.PERCENTAGE},rows:[new TableRow({children:[cell(rtl?'רמה':'Level',true,rtl,palette.primary,'FFFFFF'),cell(rtl?'המשימה':'Task',true,rtl,palette.primary,'FFFFFF')]}),...tasks.map(([level,task])=>{const fill=level==='Bronze'?palette.bronze:level==='Silver'?palette.silver:palette.gold;return new TableRow({children:[cell(level,true,rtl,fill,'FFFFFF'),cell(task,false,rtl,'FFFDF8')]});})]}),
 ];
}
// docx stamps docProps/core.xml and every zip entry with the current time, so an unchanged journal still produces a different .docx on every run and the committed artifact churns in git. Pin both, so these files change only when their content does.
const buildTimestamp='2020-01-01T00:00:00.000Z';
async function withPinnedTimestamp(buffer){
 const archive=await JSZip.loadAsync(buffer);
 const core=(await archive.file('docProps/core.xml').async('string'))
  .replace(/(<dcterms:(?:created|modified)[^>]*>)[^<]*(<)/g,`$1${buildTimestamp}$2`);
 archive.file('docProps/core.xml',core);
 const pinned=new Date(buildTimestamp);
 archive.forEach((path,entry)=>{entry.date=pinned;});
 return archive.generateAsync({type:'nodebuffer',compression:'DEFLATE'});
}
async function build(locale){
 const source=locale==='en'?'personal-course/student/en/ai-learning-journal.md':'personal-course/student/he/ai-learning-journal.md';
 const tabs=parseJournalTabs(readFileSync(source,'utf8'));
 const sections=[];
 tabs.forEach((tab,index)=>{sections.push(...renderMarkdown(tab.markdown,locale,tab.id.startsWith('session-')));if(index<tabs.length-1)sections.push(new Paragraph({pageBreakBefore:true}));});
 const document=new Document({sections:[{properties:{},children:sections}]});
 mkdirSync(dirname(output[locale]),{recursive:true});writeFileSync(output[locale],await withPinnedTimestamp(await Packer.toBuffer(document)));
}
await build('en');await build('he');
