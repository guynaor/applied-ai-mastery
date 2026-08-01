const params=new URLSearchParams(location.search);
const source=params.get('src')||'';
const status=document.querySelector('[data-document-status]');
const article=document.querySelector('[data-markdown]');
const sourceLink=document.querySelector('[data-source-link]');
const year=document.querySelector('[data-year]');
if(year)year.textContent=new Date().getFullYear();

const validSource=source&&source.toLowerCase().endsWith('.md')&&!source.startsWith('/')&&!source.includes('..')&&!source.includes('://');
const escapeHtml=value=>value.replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const sourceDirectory=path=>path.includes('/')?path.slice(0,path.lastIndexOf('/')+1):'';
const resolveRelative=(href,base)=>{
 if(!href||href.startsWith('#')||/^(https?:|mailto:|tel:)/i.test(href))return href;
 const parts=(base+href).split('/');
 const clean=[];
 parts.forEach(part=>{if(!part||part==='.')return;if(part==='..')clean.pop();else clean.push(part);});
 return clean.join('/');
};
const routeLink=(href,base)=>{
 const resolved=resolveRelative(href,base);
 if(resolved&&resolved.toLowerCase().endsWith('.md'))return `document.html?src=${encodeURIComponent(resolved)}`;
 return resolved;
};
const inline=(text,base)=>{
 let value=escapeHtml(text);
 value=value.replace(/`([^`]+)`/g,'<code>$1</code>');
 value=value.replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>');
 value=value.replace(/__([^_]+)__/g,'<strong>$1</strong>');
 value=value.replace(/\*([^*]+)\*/g,'<em>$1</em>');
 value=value.replace(/_([^_]+)_/g,'<em>$1</em>');
 value=value.replace(/\[([^\]]+)\]\(([^)]+)\)/g,(_,label,href)=>`<a href="${escapeHtml(routeLink(href,base))}">${label}</a>`);
 return value;
};

function renderMarkdown(markdown,path){
 const base=sourceDirectory(path);
 const lines=markdown.replace(/\r\n?/g,'\n').split('\n');
 const output=[];
 let paragraph=[];
 let listType=null;
 let inCode=false;
 let codeLanguage='';
 let code=[];
 const flushParagraph=()=>{if(paragraph.length){output.push(`<p>${inline(paragraph.join(' '),base)}</p>`);paragraph=[];}};
 const closeList=()=>{if(listType){output.push(`</${listType}>`);listType=null;}};
 const flushCode=()=>{output.push(`<pre><code${codeLanguage?` class="language-${escapeHtml(codeLanguage)}"`:''}>${escapeHtml(code.join('\n'))}</code></pre>`);code=[];codeLanguage='';};
 for(let i=0;i<lines.length;i++){
  const line=lines[i];
  const fence=line.match(/^```\s*([^\s]*)/);
  if(fence){
   flushParagraph();closeList();
   if(inCode){flushCode();inCode=false;}else{inCode=true;codeLanguage=fence[1]||'';}
   continue;
  }
  if(inCode){code.push(line);continue;}
  if(!line.trim()){flushParagraph();closeList();continue;}
  const heading=line.match(/^(#{1,6})\s+(.+)$/);
  if(heading){flushParagraph();closeList();const level=heading[1].length;output.push(`<h${level}>${inline(heading[2],base)}</h${level}>`);continue;}
  if(/^---+$/.test(line.trim())){flushParagraph();closeList();output.push('<hr>');continue;}
  const quote=line.match(/^>\s?(.*)$/);
  if(quote){flushParagraph();closeList();output.push(`<blockquote><p>${inline(quote[1],base)}</p></blockquote>`);continue;}
  const unordered=line.match(/^\s*[-*+]\s+(.+)$/);
  const ordered=line.match(/^\s*\d+[.)]\s+(.+)$/);
  if(unordered||ordered){
   flushParagraph();const wanted=unordered?'ul':'ol';if(listType!==wanted){closeList();output.push(`<${wanted}>`);listType=wanted;}output.push(`<li>${inline((unordered||ordered)[1],base)}</li>`);continue;
  }
  if(line.includes('|')&&i+1<lines.length&&/^\s*\|?\s*:?-{3,}/.test(lines[i+1])){
   flushParagraph();closeList();const headers=line.split('|').map(v=>v.trim()).filter(Boolean);i++;
   const rows=[];while(i+1<lines.length&&lines[i+1].includes('|')&&lines[i+1].trim()){i++;rows.push(lines[i].split('|').map(v=>v.trim()).filter(Boolean));}
   output.push(`<div class="table-wrap"><table><thead><tr>${headers.map(v=>`<th>${inline(v,base)}</th>`).join('')}</tr></thead><tbody>${rows.map(row=>`<tr>${row.map(v=>`<td>${inline(v,base)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`);continue;
  }
  paragraph.push(line.trim());
 }
 flushParagraph();closeList();if(inCode)flushCode();
 return output.join('\n');
}

async function load(){
 if(!validSource){status.textContent='This document link is invalid.';return;}
 sourceLink.href=source;
 try{
  const response=await fetch(source,{cache:'no-cache'});
  if(!response.ok)throw new Error(`HTTP ${response.status}`);
  const markdown=await response.text();
  article.innerHTML=renderMarkdown(markdown,source);
  article.hidden=false;
  status.hidden=true;
  const firstHeading=article.querySelector('h1,h2');
  if(firstHeading)document.title=`${firstHeading.textContent} · Applied AI Mastery`;
 }catch(error){
  status.innerHTML=`<strong>Document unavailable.</strong><p>The course could not load <code>${escapeHtml(source)}</code>.</p>`;
 }
}
load();
