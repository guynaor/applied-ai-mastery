import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

const read=path=>readFileSync(new URL(`../${path}`,import.meta.url),'utf8');
const deployment=read('DEPLOYMENT.md');
const readme=read('README.md');
const readiness=read('BETA_READINESS.md');
const roadmap=read('ROADMAP.md');

assert.doesNotMatch(deployment,/Vercel|Netlify|GitHub Pages/i);
assert.doesNotMatch(readme,/Vercel|Netlify|GitHub Pages/i);
assert.doesNotMatch(readiness,/Vercel/i);
assert.doesNotMatch(roadmap,/Vercel/i);
assert.equal(existsSync(new URL('../vercel.json',import.meta.url)),false,'vercel.json must be removed');

for(const required of [
  'firebase login',
  'firebase login:list',
  'firebase projects:list',
  'firebase emulators:start --only hosting',
  'firebase hosting:channel:deploy',
  'firebase deploy --only hosting --project applied-ai-mastery',
  'Release history',
])assert.ok(deployment.includes(required),`DEPLOYMENT.md is missing: ${required}`);

assert.match(deployment,/no build step/i);
assert.match(deployment,/Student mode.*not access control/is);

console.log('Firebase-only deployment documentation contract passed');
