import {readFileSync} from 'node:fs';
import {parseJournalTabs} from './lib/journal-tabs.mjs';

const [, , sourcePath,tabId]=process.argv;
if(!sourcePath||!tabId){
 console.error('Usage: node scripts/extract-journal-tab.mjs <journal.md> <tab-id>');
 process.exit(2);
}
const tab=parseJournalTabs(readFileSync(sourcePath,'utf8')).find(candidate=>candidate.id===tabId);
if(!tab){
 console.error(`Unknown journal tab: ${tabId}`);
 process.exit(1);
}
process.stdout.write(`${tab.markdown}\n`);
