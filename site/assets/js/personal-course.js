const personalLessons=[
{n:1,title:'Ask Better, Get Better',outcome:'Turn a vague everyday request into a useful, testable result and save a reusable prompt pattern.',skill:'Context, constraints, examples, iteration, and privacy awareness',root:'personal-course/materials/lesson-01-better-requests/',student:[['Start this lesson','student/activity.md'],['Prompt workbook','student/prompt-workbook.md'],['Real Life Mission','student/real-life-mission.md']],instructor:[['Step-by-step lesson script','instructor/step-by-step-guide.md']]},
{n:2,title:'Summarize Without Losing What Matters',outcome:'Convert a long message, article, lecture, or document into notes, actions, follow-ups, and calendar items.',skill:'Structured summarization and missing-information checks',root:'personal-course/materials/lesson-02-summaries/',student:[['Start this lesson','student/activity.md'],['Verification workbook','student/verification-workbook.md'],['Real Life Mission','student/real-life-mission.md']],instructor:[['Step-by-step lesson script','instructor/step-by-step-guide.md']]},
{n:3,title:'Make Better Decisions',outcome:'Compare meaningful options using explicit criteria, evidence, and review dates.',skill:'Decision matrices, assumptions, sensitivity, and decision records',root:'personal-course/materials/lesson-03-decisions/',student:[['Start this lesson','student/activity.md'],['Decision workbook','student/decision-workbook.md'],['Real Life Mission','student/real-life-mission.md']],instructor:[['Step-by-step lesson script','instructor/step-by-step-guide.md']]},
{n:4,title:'Buy Smarter Online',outcome:'Compare products, total cost, seller quality, return terms, and misleading claims.',skill:'Research, source quality, total-cost comparison, and record keeping',root:'personal-course/materials/lesson-04-online-buying/',student:[['Start this lesson','student/activity.md'],['Comparison workbook','student/comparison-workbook.md'],['Real Life Mission','student/real-life-mission.md']],instructor:[['Step-by-step lesson script','instructor/step-by-step-script.md']]},
{n:5,title:'Create Personal Deal Alerts',outcome:'Specify a monitor for price or availability changes that can be paused, stopped, and reviewed.',skill:'Triggers, thresholds, duplicate suppression, stop rules, and reminders',root:'personal-course/materials/lesson-05-deal-alerts/',student:[['Start this lesson','student/activity.md'],['Alert specification','student/alert-specification.md'],['Real Life Mission','student/real-life-mission.md']],instructor:[['Step-by-step lesson script','instructor/step-by-step-script.md']]},
{n:6,title:'Plan a Realistic Trip',outcome:'Build a feasible itinerary with budget, travel time, buffers, fallbacks, bookings, and timed rechecks.',skill:'Constraint-based planning, calendars, shared notes, and staged verification',root:'personal-course/materials/lesson-06-travel-planning/',student:[['Start this lesson','student/activity.md'],['Trip-planning workbook','student/trip-planning-workbook.md'],['Real Life Mission','student/real-life-mission.md']],instructor:[['Step-by-step lesson script','instructor/step-by-step-script.md']]},
{n:7,title:'Plan an Event With Friends',outcome:'Coordinate preferences, tasks, budget, invitations, reminders, and a poster.',skill:'Collaborative planning, polls, ownership, deadlines, and creative generation',root:'personal-course/materials/lesson-07-event-planning/',student:[['Start this lesson','student/activity.md'],['Event workbook','student/event-workbook.md'],['Real Life Mission','student/real-life-mission.md']],instructor:[['Step-by-step lesson script','instructor/step-by-step-guide.md']]},
{n:8,title:'Research Investing Responsibly',outcome:'Create a balanced research brief that exposes risk and uncertainty without pretending to predict returns.',skill:'Evidence synthesis, opposing views, privacy, and uncertainty',root:'personal-course/materials/lesson-08-investment-research/',student:[['Start this lesson','student/activity.md'],['Research workbook','student/research-workbook.md'],['Real Life Mission','student/real-life-mission.md']],instructor:[['Step-by-step lesson script','instructor/step-by-step-guide.md']]},
{n:9,title:'Build Your First Mini App',outcome:'Create a small poll, expense splitter, checklist, or habit tool for a recurring real-life need.',skill:'Requirements, rapid prototyping, testing, and maintainable workflows',root:'personal-course/materials/lesson-09-mini-app/',student:[['Start this lesson','student/activity.md'],['App workbook','student/app-workbook.md'],['Open starter poll app','student/starter-poll-app.html'],['Real Life Mission','student/real-life-mission.md']],instructor:[['Step-by-step lesson script','instructor/step-by-step-guide.md']]},
{n:10,title:'Design Something for Your Room',outcome:'Turn room dimensions and needs into a parametric CAD concept with organized source files and checks.',skill:'Design contracts, parameters, versioning, and validation boundaries',root:'personal-course/materials/lesson-10-room-design/',student:[['Start this lesson','student/activity.md'],['Design workbook','student/design-workbook.md'],['Download OpenSCAD starter','student/starter-organizer.scad'],['Real Life Mission','student/real-life-mission.md']],instructor:[['Step-by-step lesson script','instructor/step-by-step-script.md']]},
{n:11,title:'Tell Stories with Images and Video',outcome:'Create a responsible visual summary while organizing source media, permissions, captions, and exports.',skill:'Storyboarding, generation prompts, consent, authenticity, and media organization',root:'personal-course/materials/lesson-11-visual-storytelling/',student:[['Start this lesson','student/activity.md'],['Storyboard workbook','student/storyboard-workbook.md'],['Real Life Mission','student/real-life-mission.md']],instructor:[['Step-by-step lesson script','instructor/step-by-step-script.md']]},
{n:12,title:'Build Your Personal Brand',outcome:'Turn genuine course projects and experience into a truthful CV, LinkedIn profile, portfolio, and application package.',skill:'Evidence-based writing, project selection, audience adaptation, and application tracking',root:'personal-course/materials/lesson-12-personal-brand/',student:[['Start this lesson','student/activity.md'],['Portfolio workbook','student/portfolio-workbook.md'],['Real Life Mission','student/real-life-mission.md']],instructor:[['Step-by-step lesson script','instructor/step-by-step-script.md']]}
];

const readJson=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key)||JSON.stringify(fallback));}catch{return fallback;}};
const state={
 mode:localStorage.getItem('aam-personal-mode')||'student',
 completed:new Set(readJson('aam-personal-completed',[])),
 missions:readJson('aam-personal-missions',{}),
 journals:new Set(readJson('aam-personal-journals',[]))
};
const grid=document.querySelector('[data-personal-lesson-grid]');
const resourceHref=path=>path.toLowerCase().endsWith('.md')?`document.html?src=${encodeURIComponent(path)}`:path;
const linkList=(root,items)=>items.map(([label,path],index)=>`<a${index===0?' class="start-link"':''} href="${resourceHref(root+path)}">${label}</a>`).join('');
const missionXp={bronze:30,silver:50,gold:80};

const saveCompleted=()=>localStorage.setItem('aam-personal-completed',JSON.stringify([...state.completed]));
const saveMissions=()=>localStorage.setItem('aam-personal-missions',JSON.stringify(state.missions));
const saveJournals=()=>localStorage.setItem('aam-personal-journals',JSON.stringify([...state.journals]));

function totalXp(){
 let xp=state.completed.size*20+state.journals.size*20;
 Object.values(state.missions).forEach(level=>{xp+=missionXp[level]||0;});
 return xp;
}
function render(){
  if(!grid)return;
  grid.innerHTML=personalLessons.map(lesson=>{
    const studentContent=linkList(lesson.root,lesson.student);
    const instructorContent=`${linkList(lesson.root,lesson.instructor)}<a href="${resourceHref('personal-course/instructor/real-life-mission-review-guide.md')}">Mission review guide</a>`;
    const missionLevel=state.missions[lesson.n]||'';
    return `<article class="mission"><div class="mission-number">${lesson.n}</div><div><span class="badge">20–30 minutes</span><h3>${lesson.title}</h3><div class="role">${lesson.skill}</div><p class="mission-summary">${lesson.outcome}</p><div class="file-groups"><section class="file-group"><h4>Student activity</h4>${studentContent}</section><section class="file-group instructor-only" ${state.mode==='student'?'hidden':''}><h4>Instructor support</h4>${instructorContent}</section></div></div><div class="mission-controls"><label class="complete-toggle"><input type="checkbox" data-personal-complete="${lesson.n}" ${state.completed.has(lesson.n)?'checked':''}> Lesson complete</label><label>Mission <select data-mission-level="${lesson.n}"><option value="" ${!missionLevel?'selected':''}>Not completed</option><option value="bronze" ${missionLevel==='bronze'?'selected':''}>Bronze</option><option value="silver" ${missionLevel==='silver'?'selected':''}>Silver</option><option value="gold" ${missionLevel==='gold'?'selected':''}>Gold</option></select></label><label class="complete-toggle"><input type="checkbox" data-journal-complete="${lesson.n}" ${state.journals.has(lesson.n)?'checked':''}> Journal entry</label></div></article>`;
  }).join('');
  document.querySelectorAll('[data-personal-complete]').forEach(box=>box.addEventListener('change',()=>{const n=Number(box.dataset.personalComplete);box.checked?state.completed.add(n):state.completed.delete(n);saveCompleted();updateProgress();}));
  document.querySelectorAll('[data-mission-level]').forEach(select=>select.addEventListener('change',()=>{const n=Number(select.dataset.missionLevel);if(select.value)state.missions[n]=select.value;else delete state.missions[n];saveMissions();updateProgress();}));
  document.querySelectorAll('[data-journal-complete]').forEach(box=>box.addEventListener('change',()=>{const n=Number(box.dataset.journalComplete);box.checked?state.journals.add(n):state.journals.delete(n);saveJournals();updateProgress();}));
  updateProgress();
}
function updateProgress(){
 const count=state.completed.size;
 const progress=document.querySelector('[data-personal-progress]');
 const label=document.querySelector('[data-personal-progress-label]');
 const xp=document.querySelector('[data-personal-xp]');
 if(progress)progress.value=count;
 if(label)label.textContent=`${count} of 12 lessons complete`;
 if(xp)xp.textContent=`${totalXp()} XP · ${Object.keys(state.missions).length} missions · ${state.journals.size} journal entries`;
}
function setMode(mode){state.mode=mode;localStorage.setItem('aam-personal-mode',mode);document.querySelectorAll('[data-mode]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.mode===mode)));document.querySelectorAll('.instructor-only').forEach(section=>section.hidden=mode==='student');}
document.querySelectorAll('[data-mode]').forEach(button=>button.addEventListener('click',()=>setMode(button.dataset.mode)));
window.addEventListener('storage',event=>{
 if(event.key==='aam-personal-completed')state.completed=new Set(readJson('aam-personal-completed',[]));
 else if(event.key==='aam-personal-missions')state.missions=readJson('aam-personal-missions',{});
 else if(event.key==='aam-personal-journals')state.journals=new Set(readJson('aam-personal-journals',[]));
 else return;
 render();setMode(state.mode);
});
render();setMode(state.mode);
const year=document.querySelector('[data-year]');if(year)year.textContent=new Date().getFullYear();
