import assert from 'node:assert/strict';
import {existsSync, readdirSync, readFileSync, statSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const manifestPath='professional-course/he/localization-manifest.json';
const localeRoot='professional-course/he';

const requiredSources=[
  'materials/session-01-prompting/README.md',
  'materials/session-01-prompting/student/AF-TRN-100-student-mission-guide.md',
  'materials/session-01-prompting/instructor/AF-TRN-100-instructor-guide.md',
  'materials/session-01-prompting/instructor/AF-TRN-100-step-by-step-lesson-script.md',
  'materials/session-01-prompting/instructor/AF-TRN-101-answer-key.md',
  'materials/session-02-deep-research/README.md',
  'materials/session-02-deep-research/student/AF-RD-201-decision-brief.md',
  'materials/session-02-deep-research/instructor/AF-TRN-200-instructor-guide.md',
  'materials/session-02-deep-research/instructor/AF-TRN-200-step-by-step-lesson-script.md',
  'materials/session-02-deep-research/instructor/AF-TRN-201-answer-key.md',
  'materials/session-03-spreadsheet-engineering/README.md',
  'materials/session-03-spreadsheet-engineering/student/AF-OPS-301-assignment-brief.md',
  'materials/session-03-spreadsheet-engineering/instructor/AF-TRN-300-instructor-guide.md',
  'materials/session-03-spreadsheet-engineering/instructor/AF-TRN-300-step-by-step-lesson-script.md',
  'materials/session-03-spreadsheet-engineering/instructor/AF-TRN-301-answer-key.md',
  'materials/session-04-technical-communication/README.md',
  'materials/session-04-technical-communication/student/AF-COM-401-presentation-brief.md',
  'materials/session-04-technical-communication/instructor/AF-TRN-400-instructor-guide.md',
  'materials/session-04-technical-communication/instructor/AF-TRN-400-step-by-step-lesson-script.md',
  'materials/session-04-technical-communication/instructor/AF-TRN-401-answer-key.md',
  'materials/session-05-operations-planning/README.md',
  'materials/session-05-operations-planning/student/AF-OPS-501-mission-brief.md',
  'materials/session-05-operations-planning/instructor/AF-TRN-500-instructor-guide.md',
  'materials/session-05-operations-planning/instructor/AF-TRN-500-step-by-step-lesson-script.md',
  'materials/session-05-operations-planning/instructor/AF-TRN-501-answer-key.md',
  'materials/session-06-agent-workflows/README.md',
  'materials/session-06-agent-workflows/student/AF-AUTO-601-mission-brief.md',
  'materials/session-06-agent-workflows/instructor/AF-TRN-600-instructor-guide.md',
  'materials/session-06-agent-workflows/instructor/AF-TRN-600-step-by-step-lesson-script.md',
  'materials/session-06-agent-workflows/instructor/AF-TRN-601-answer-key.md',
  'materials/session-07-parametric-cad/README.md',
  'materials/session-07-parametric-cad/student/AF-CAD-701-design-brief.md',
  'materials/session-07-parametric-cad/instructor/AF-TRN-700-instructor-guide.md',
  'materials/session-07-parametric-cad/instructor/AF-TRN-700-step-by-step-lesson-script.md',
  'materials/session-07-parametric-cad/instructor/AF-TRN-701-answer-key.md',
  'capstone/README.md',
  'capstone/student/AF-CAP-001-mission-brief.md',
  'capstone/instructor/AF-CAP-099-step-by-step-facilitation-script.md',
  'capstone/instructor/AF-CAP-100-capstone-teaching-guide.md',
  'capstone/instructor/AF-CAP-101-instructor-guide.md',
];

const absolute=relative=>path.join(root,relative);
const read=relative=>readFileSync(absolute(relative),'utf8');
const normalized=relative=>relative.split(path.sep).join('/');
const listFiles=directory=>readdirSync(absolute(directory),{withFileTypes:true}).flatMap(entry=>{
  const relative=path.posix.join(directory,entry.name);
  return entry.isDirectory()?listFiles(relative):[relative];
});
const headings=markdown=>[...markdown.matchAll(/^(#{1,6})\s/gm)].map(match=>match[1].length);
const fenceCount=markdown=>(markdown.match(/^```/gm)||[]).length;
const documentIds=markdown=>{
  const renderedText=markdown.replace(/(\[[^\]]*\])\([^)]+\)/g,'$1');
  return [...new Set(renderedText.match(/AF-[A-Z]+-[0-9]+/g)||[])].sort();
};
const numericTokens=markdown=>markdown
  .replace(/(\[[^\]]*\])\([^)]+\)/g,'$1')
  .replace(/AF-[A-Z]+-[0-9]+/g,'')
  .match(/\d+(?:\.\d+)?%?|\d+[–-]\d+/g)?.sort()||[];
const localLinks=markdown=>[...markdown.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)]
  .map(match=>match[1].trim().replace(/^<|>$/g,'').split('#')[0].split('?')[0])
  .filter(link=>link&&!/^(?:https?:|mailto:|tel:)/i.test(link));

assert.ok(existsSync(absolute(manifestPath)),`missing ${manifestPath}`);
const manifest=JSON.parse(read(manifestPath));
assert.equal(manifest.version,1);
assert.equal(manifest.canonicalLanguage,'en');
assert.equal(manifest.locale,'he');
assert.equal(manifest.entries.length,40,'manifest must map exactly 40 documents');

const sources=manifest.entries.map(entry=>normalized(entry.source));
const targets=manifest.entries.map(entry=>normalized(entry.target));
assert.deepEqual([...sources].sort(),[...requiredSources].sort(),'manifest source inventory changed');
assert.equal(new Set(sources).size,sources.length,'manifest sources must be unique');
assert.equal(new Set(targets).size,targets.length,'manifest targets must be unique');

const courseJs=read('site/assets/js/course.js');
const numericReview=[];
for(const entry of manifest.entries){
  assert.equal(entry.status,'reviewed',`${entry.source} is not reviewed`);
  assert.ok(['overview','student','instructor','answer-key'].includes(entry.kind),`${entry.source} has invalid kind`);
  assert.ok(entry.target.startsWith(`${localeRoot}/`),`${entry.target} is outside the Hebrew tree`);
  assert.ok(existsSync(absolute(entry.source)),`missing source ${entry.source}`);
  assert.ok(existsSync(absolute(entry.target)),`missing translation ${entry.target}`);

  const source=read(entry.source);
  const target=read(entry.target);
  assert.match(target,/[\u0590-\u05ff]/,`${entry.target} contains no Hebrew`);
  assert.deepEqual(headings(target),headings(source),`${entry.target} heading structure differs from source`);
  assert.equal(fenceCount(target),fenceCount(source),`${entry.target} code-fence count differs from source`);
  assert.deepEqual(documentIds(target),documentIds(source),`${entry.target} document IDs differ from source`);
  assert.ok(courseJs.includes(entry.target),`${entry.target} is not linked from course.js`);
  if(JSON.stringify(numericTokens(target))!==JSON.stringify(numericTokens(source))){
    numericReview.push(entry.target);
  }

  for(const link of localLinks(target)){
    const resolved=path.resolve(path.dirname(absolute(entry.target)),decodeURIComponent(link));
    assert.ok(existsSync(resolved),`broken link in ${entry.target}: ${link}`);
    if(/\.(?:csv|scad)$/i.test(link)){
      assert.ok(!resolved.startsWith(`${absolute(localeRoot)}${path.sep}`),`canonical artifact copied into Hebrew tree: ${link}`);
    }
  }
}

for(const localeOnly of [`${localeRoot}/README.md`,`${localeRoot}/ai-geography.md`]){
  assert.ok(existsSync(absolute(localeOnly)),`missing locale-only document ${localeOnly}`);
}

const localeFiles=listFiles(localeRoot);
const markdownFiles=localeFiles.filter(file=>file.endsWith('.md'));
assert.equal(markdownFiles.length,42,'Hebrew tree must contain 40 mapped documents and 2 locale-only documents');
for(const file of markdownFiles){
  for(const link of localLinks(read(file))){
    const resolved=path.resolve(path.dirname(absolute(file)),decodeURIComponent(link));
    assert.ok(existsSync(resolved),`broken link in ${file}: ${link}`);
  }
}
for(const file of localeFiles){
  assert.ok(!/\.(?:csv|scad)$/i.test(file),`canonical artifact must not be copied: ${file}`);
  assert.ok(!/(?:source-data|company)(?:\/|$)/.test(file),`canonical source directory must not be copied: ${file}`);
  assert.ok(statSync(absolute(file)).isFile());
}

if(numericReview.length){
  console.warn(`Numeric parity requires human review: ${numericReview.join(', ')}`);
}
console.log('Professional Hebrew localization valid: 40 mapped documents, 42 Hebrew Markdown files');
