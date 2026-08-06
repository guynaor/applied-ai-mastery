import assert from 'node:assert/strict';
import {existsSync, readdirSync, readFileSync, statSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const localeRoot='teacher-course/he';
const manifestPath=`${localeRoot}/localization-manifest.json`;
const absolute=relative=>path.join(root,relative);
const read=relative=>readFileSync(absolute(relative),'utf8');
const normalize=relative=>relative.split(path.sep).join('/');
const listFiles=directory=>readdirSync(absolute(directory),{withFileTypes:true}).flatMap(entry=>{
  const relative=path.posix.join(directory,entry.name);
  return entry.isDirectory()?listFiles(relative):[relative];
});
const sourceInventory=listFiles('teacher-course').filter(file=>file.endsWith('.md')&&/teacher-course\/(?:materials|capstone)\//.test(file)&&(file.endsWith('/README.md')||file.includes('/student/')||file.includes('/instructor/'))).map(file=>file.slice('teacher-course/'.length)).sort();
const headings=markdown=>[...markdown.matchAll(/^(#{1,6})\s/gm)].map(match=>match[1].length);
const fenceCount=markdown=>(markdown.match(/^```/gm)||[]).length;
const documentIds=markdown=>[...new Set(markdown.replace(/(\[[^\]]*\])\([^)]+\)/g,'$1').match(/EDU-[A-Z]+-[0-9]+/g)||[])].sort();
const numericTokens=markdown=>markdown.replace(/(\[[^\]]*\])\([^)]+\)/g,'$1').replace(/EDU-[A-Z]+-[0-9]+/g,'').match(/\d+(?:\.\d+)?%?|\d+[–-]\d+/g)?.sort()||[];
const localLinks=markdown=>[...markdown.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)].map(match=>match[1].trim().replace(/^<|>$/g,'').split('#')[0].split('?')[0]).filter(link=>link&&!/^(?:https?:|mailto:|tel:)/i.test(link));
const proseLetterCounts=markdown=>{
  const prose=markdown.split(/\r?\n/).filter(line=>{
    const trimmed=line.trim();
    return trimmed&&!trimmed.startsWith('```')&&!trimmed.startsWith('`')&&!/^(?:\|?\s*:?-{3,}:?\s*\|)+$/.test(trimmed)&&!/^\s*(?:EDU-[A-Z]+-\d+|[A-Za-z0-9_./-]+\.(?:csv|html|md))\s*$/.test(trimmed);
  }).join(' ').replace(/`[^`]*`|\[[^\]]*\]\([^)]+\)|EDU-[A-Z]+-\d+|https?:\/\/\S+/g,'');
  return {hebrew:(prose.match(/[\u0590-\u05ff]/g)||[]).length,latin:(prose.match(/[A-Za-z]/g)||[]).length};
};

assert.ok(existsSync(absolute(manifestPath)),`missing ${manifestPath}`);
const manifest=JSON.parse(read(manifestPath));
assert.equal(manifest.version,1);
assert.equal(manifest.canonicalLanguage,'en');
assert.equal(manifest.locale,'he');
assert.equal(manifest.entries.length,50,'manifest must map exactly 50 documents');
const sources=manifest.entries.map(entry=>normalize(entry.source));
const targets=manifest.entries.map(entry=>normalize(entry.target));
assert.deepEqual([...sources].sort(),sourceInventory,'manifest source inventory changed');
assert.equal(new Set(sources).size,sources.length,'manifest sources must be unique');
assert.equal(new Set(targets).size,targets.length,'manifest targets must be unique');

const courseJs=read('site/assets/js/teacher-course.js');
for(const entry of manifest.entries){
  assert.equal(entry.status,'reviewed',`${entry.source} is not reviewed`);
  assert.ok(['overview','student','instructor','answer-key'].includes(entry.kind),`${entry.source} has invalid kind`);
  assert.equal(entry.target,`${localeRoot}/${entry.source}`,`${entry.source} must retain its path below the Hebrew tree`);
  assert.ok(existsSync(absolute(`teacher-course/${entry.source}`)),`missing source ${entry.source}`);
  assert.ok(existsSync(absolute(entry.target)),`missing translation ${entry.target}`);
  const source=read(`teacher-course/${entry.source}`);
  const target=read(entry.target);
  assert.match(target,/[\u0590-\u05ff]/,`${entry.target} contains no Hebrew`);
  const {hebrew,latin}=proseLetterCounts(target);
  assert.ok(hebrew>=latin,`${entry.target} is predominantly English prose (${latin} Latin letters, ${hebrew} Hebrew letters)`);
  assert.deepEqual(headings(target),headings(source),`${entry.target} heading structure differs from source`);
  assert.equal(fenceCount(target),fenceCount(source),`${entry.target} code-fence count differs from source`);
  assert.deepEqual(documentIds(target),documentIds(source),`${entry.target} document IDs differ from source`);
  const usesIsraeliGradeBands=/יסודי א׳–ו׳|חטיבה ז׳–ט׳|תיכון י׳–י״ב/.test(target);
  if(!usesIsraeliGradeBands)assert.deepEqual(numericTokens(target),numericTokens(source),`${entry.target} numeric/formula tokens differ from source`);
  for(const link of localLinks(target)){
    const resolved=path.resolve(path.dirname(absolute(entry.target)),decodeURIComponent(link));
    assert.ok(existsSync(resolved),`broken link in ${entry.target}: ${link}`);
  }
}

for(const localeOnly of [`${localeRoot}/README.md`,`${localeRoot}/ai-geography.md`,`${localeRoot}/student/ai-learning-journal.md`])assert.ok(existsSync(absolute(localeOnly)),`missing locale-only document ${localeOnly}`);
const journal=read(`${localeRoot}/student/ai-learning-journal.md`);
assert.equal((journal.match(/<!-- journal-tab:/g)||[]).length,11,'Hebrew journal must contain all 11 tabs');
const localeFiles=listFiles(localeRoot);
const markdownFiles=localeFiles.filter(file=>file.endsWith('.md'));
assert.equal(markdownFiles.length,53,'Hebrew tree must contain 50 mapped documents and 3 locale-only documents');
for(const file of markdownFiles)for(const link of localLinks(read(file))){
  const resolved=path.resolve(path.dirname(absolute(file)),decodeURIComponent(link));
  assert.ok(existsSync(resolved),`broken link in ${file}: ${link}`);
}
for(const file of localeFiles){
  assert.ok(!/\.(?:csv|html)$/i.test(file),`canonical artifact must not be copied: ${file}`);
  assert.ok(statSync(absolute(file)).isFile());
}
assert.match(courseJs,/teacher-course\/he\//,'teacher portal must expose Hebrew resources');
console.log('Teacher Hebrew localization valid: 50 mapped documents, 53 Hebrew Markdown files');
