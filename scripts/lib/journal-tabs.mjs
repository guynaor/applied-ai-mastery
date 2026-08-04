const marker=/^<!-- journal-tab: (\{.*\}) -->$/gm;

export function parseJournalTabs(markdown){
 const matches=[...markdown.matchAll(marker)];
 if(!matches.length)throw new Error('Journal contains no journal-tab markers');
 return matches.map((match,index)=>{
  let metadata;
  try{metadata=JSON.parse(match[1]);}catch{throw new Error(`Invalid journal-tab metadata at marker ${index+1}`);}
  if(typeof metadata.id!=='string'||!metadata.id)throw new Error(`Missing journal-tab id at marker ${index+1}`);
  if(typeof metadata.title!=='string'||!metadata.title)throw new Error(`Missing journal-tab title for ${metadata.id}`);
  const start=match.index+match[0].length;
  const end=matches[index+1]?.index??markdown.length;
  return {id:metadata.id,title:metadata.title,markdown:markdown.slice(start,end).trim()};
 });
}
