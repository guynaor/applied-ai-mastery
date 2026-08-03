import assert from 'node:assert/strict';
import {readdirSync,readFileSync} from 'node:fs';
import {join} from 'node:path';

const markdownFiles=directory=>readdirSync(directory,{withFileTypes:true}).flatMap(entry=>{
 const path=join(directory,entry.name);
 return entry.isDirectory()?markdownFiles(path):entry.name.endsWith('.md')?[path]:[];
});

const violations=[];
for(const path of markdownFiles('personal-course')){
 readFileSync(path,'utf8').split(/\r?\n/).forEach((line,index)=>{
  if(/;\s*$/.test(line))violations.push(`${path}:${index+1}`);
 });
}

assert.deepEqual(violations,[],`Trailing semicolons: ${violations.join(', ')}`);
console.log('Personal-course punctuation contract passed');
