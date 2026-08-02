const personalLessons=[
{n:1,title:'Ask Better, Get Better',outcome:'Turn a vague everyday request into a useful, testable result.',skill:'Context, constraints, examples, and controlled iteration'},
{n:2,title:'Summarize Without Losing What Matters',outcome:'Convert a long message, article, or document into decisions and actions.',skill:'Structured summarization and missing-information checks'},
{n:3,title:'Build an Honest CV',outcome:'Create a tailored CV and short application message without exaggeration.',skill:'Evidence-based writing and audience adaptation'},
{n:4,title:'Make a Difficult Decision',outcome:'Compare meaningful options using explicit criteria and sensitivity checks.',skill:'Decision matrices, assumptions, and trade-offs'},
{n:5,title:'Buy Smarter Online',outcome:'Compare products, real costs, seller quality, and misleading claims.',skill:'Research, source quality, and total-cost comparison'},
{n:6,title:'Create a Deal Alert',outcome:'Specify a monitor for a price or availability change without notification spam.',skill:'Triggers, thresholds, duplicate suppression, and stop rules'},
{n:7,title:'Plan a Realistic Trip',outcome:'Build a feasible itinerary with budget, travel time, buffers, and fallbacks.',skill:'Constraint-based planning and staged verification'},
{n:8,title:'Plan a Party With Friends',outcome:'Coordinate preferences, tasks, budget, invitations, and a poster.',skill:'Collaborative planning and creative generation'},
{n:9,title:'Research an Investment Without Pretending to Predict',outcome:'Create a balanced research brief that exposes risk and uncertainty.',skill:'Evidence synthesis, opposing views, and uncertainty'},
{n:10,title:'Build a Small Poll App',outcome:'Create a shareable app for choosing a date, destination, menu, or activity.',skill:'Requirements, rapid prototyping, and testing'},
{n:11,title:'Design a Simple Piece of Furniture',outcome:'Turn room dimensions and needs into a parametric CAD concept.',skill:'Design contracts, parameters, and validation boundaries'},
{n:12,title:'Tell the Story',outcome:'Create an image or video summary of a trip or event for responsible sharing.',skill:'Storyboarding, generation prompts, consent, and authenticity'}
];

const state={mode:localStorage.getItem('aam-personal-mode')||'student',completed:new Set(JSON.parse(localStorage.getItem('aam-personal-completed')||'[]'))};
const grid=document.querySelector('[data-personal-lesson-grid]');

function render(){
  if(!grid)return;
  grid.innerHTML=personalLessons.map(lesson=>`<article class="mission"><div class="mission-number">${lesson.n}</div><div><span class="badge">20–30 minutes</span><h3>${lesson.title}</h3><div class="role">${lesson.skill}</div><p class="mission-summary">${lesson.outcome}</p><div class="file-groups"><section class="file-group"><h4>Student activity</h4><span class="planned-resource">Lesson package planned</span></section><section class="file-group instructor-only" ${state.mode==='student'?'hidden':''}><h4>Instructor support</h4><span class="planned-resource">Step-by-step teaching script planned</span></section></div></div><div class="mission-controls"><label class="complete-toggle"><input type="checkbox" data-personal-complete="${lesson.n}" ${state.completed.has(lesson.n)?'checked':''}> Complete</label></div></article>`).join('');
  document.querySelectorAll('[data-personal-complete]').forEach(box=>box.addEventListener('change',()=>{const n=Number(box.dataset.personalComplete);box.checked?state.completed.add(n):state.completed.delete(n);localStorage.setItem('aam-personal-completed',JSON.stringify([...state.completed]));updateProgress();}));
  updateProgress();
}
function updateProgress(){const count=state.completed.size;const progress=document.querySelector('[data-personal-progress]');const label=document.querySelector('[data-personal-progress-label]');if(progress)progress.value=count;if(label)label.textContent=`${count} of 12 complete`;}
function setMode(mode){state.mode=mode;localStorage.setItem('aam-personal-mode',mode);document.querySelectorAll('[data-mode]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.mode===mode)));document.querySelectorAll('.instructor-only').forEach(section=>section.hidden=mode==='student');}
document.querySelectorAll('[data-mode]').forEach(button=>button.addEventListener('click',()=>setMode(button.dataset.mode)));
render();setMode(state.mode);
const year=document.querySelector('[data-year]');if(year)year.textContent=new Date().getFullYear();
