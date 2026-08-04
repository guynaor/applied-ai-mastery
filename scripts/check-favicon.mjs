import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const read=path=>readFileSync(path,'utf8');
const favicon=read('site/assets/favicon.svg');

for(const page of ['index.html','personal.html','professional.html','document.html']){
  assert.match(read(page),/<link rel="icon" type="image\/svg\+xml" href="site\/assets\/favicon\.svg">/);
}

assert.match(favicon,/<svg\b/);
console.log('Favicon contract passed');
