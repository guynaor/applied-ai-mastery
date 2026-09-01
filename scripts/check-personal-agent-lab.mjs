import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {hebrewPhrase} from './lib/hebrew-matchers.mjs';

const read=path=>readFileSync(new URL(`../${path}`,import.meta.url),'utf8');
const englishSession=read('personal-course/sessions/session-02-research-buy-monitor.md');
const hebrewSession=read('personal-course/he/sessions/session-02-research-buy-monitor.md');
const englishGuide=read('personal-course/instructor/sessions/session-02-guide.md');
const hebrewGuide=read('personal-course/he/instructor/sessions/session-02-guide.md');
const englishPortfolio=read('personal-course/sessions/session-07-workflow-portfolio-project.md');
const hebrewPortfolio=read('personal-course/he/sessions/session-07-workflow-portfolio-project.md');

assert.match(englishSession,/No-install route/);
assert.match(englishSession,/Minimal local lab/);
assert.match(englishSession,/Advanced Adventure/);
assert.match(englishGuide,/OpenClaw/);
assert.match(englishGuide,/kill switch/);
assert.match(englishGuide,/openclaw\.ai\/showcase/);
assert.match(englishGuide,/Manus/);
assert.doesNotMatch(englishPortfolio,/paper-only/i);

assert.match(hebrewSession,hebrewPhrase('ללא התקנה'));
assert.match(hebrewSession,hebrewPhrase('מעבדה מקומית'));
assert.match(hebrewSession,hebrewPhrase('הרפתקה מתקדמת'));
assert.match(hebrewGuide,/OpenClaw/);
assert.match(hebrewGuide,hebrewPhrase('מתג עצירה'));
assert.match(hebrewGuide,/openclaw\.ai\/showcase/);
assert.match(hebrewGuide,/Manus/);
assert.doesNotMatch(hebrewPortfolio,hebrewPhrase('על הנייר בלבד'));

console.log('Personal agent lab content contract passed');
