const text=(en,he)=>({en,he});
const translated=(enLabel,heLabel,enPath,hePath)=>({label:text(enLabel,heLabel),path:text(enPath,hePath),localized:true});
const artifact=(enLabel,heLabel,path)=>({label:text(enLabel,heLabel),path,localized:false});

const sessions=[
  {
    n:1,
    role:text('Junior AI Assistant','עוזר או עוזרת זוטרים בתחום ה-AI'),
    title:text('Advanced Prompting & Model Selection','פרומפטים מתקדמים ובחירת מודל'),
    summary:text('Map the AI landscape, compare outputs, diagnose weak assumptions, and build a reusable RISEN prompt.','ממפים את עולם ה-AI, משווים תוצרים, מזהים הנחות חלשות ובונים פרומפט RISEN לשימוש חוזר.'),
    student:[
      translated('Start this mission','התחלת המשימה','materials/session-01-prompting/student/AF-TRN-100-student-mission-guide.md','professional-course/he/materials/session-01-prompting/student/AF-TRN-100-student-mission-guide.md'),
      artifact('Source memo','מזכר מקור (חומר עבודה באנגלית)','materials/session-01-prompting/student/AF-TRN-101-source-memo.md'),
      artifact('Model comparison worksheet','גיליון השוואת מודלים (חומר עבודה באנגלית)','materials/session-01-prompting/student/AF-TRN-102-model-comparison-worksheet.md'),
      artifact('RISEN prompt template','תבנית פרומפט RISEN (חומר עבודה באנגלית)','materials/session-01-prompting/student/AF-TRN-103-risen-prompt-template.md')
    ],
    instructor:[
      translated('Step-by-step lesson script','מערך שיעור מפורט','materials/session-01-prompting/instructor/AF-TRN-100-step-by-step-lesson-script.md','professional-course/he/materials/session-01-prompting/instructor/AF-TRN-100-step-by-step-lesson-script.md'),
      translated('Teaching guide','מדריך הוראה','materials/session-01-prompting/instructor/AF-TRN-100-instructor-guide.md','professional-course/he/materials/session-01-prompting/instructor/AF-TRN-100-instructor-guide.md'),
      translated('Package overview','סקירת חומרי המפגש','materials/session-01-prompting/README.md','professional-course/he/materials/session-01-prompting/README.md'),
      translated('Answer key','מפתח תשובות','materials/session-01-prompting/instructor/AF-TRN-101-answer-key.md','professional-course/he/materials/session-01-prompting/instructor/AF-TRN-101-answer-key.md'),
      artifact('Assessment rubric','מחוון הערכה (חומר עבודה באנגלית)','materials/session-01-prompting/instructor/AF-TRN-102-assessment-rubric.csv')
    ]
  },
  {
    n:2,
    role:text('AI Research Analyst','אנליסט או אנליסטית מחקר AI'),
    title:text('Deep Research & Information Synthesis','מחקר מעמיק וסינתזה של מידע'),
    summary:text('Build an evidence matrix, compare unequal sources, and write a bounded decision memo.','בונים מטריצת ראיות, משווים מקורות שאינם שווי ערך וכותבים מזכר החלטה תחום.'),
    student:[
      translated('Start this mission','התחלת המשימה','materials/session-02-deep-research/student/AF-RD-201-decision-brief.md','professional-course/he/materials/session-02-deep-research/student/AF-RD-201-decision-brief.md'),
      artifact('Evidence matrix','מטריצת ראיות (חומר עבודה באנגלית)','materials/session-02-deep-research/student/AF-RD-202-evidence-matrix.csv'),
      artifact('Research memo template','תבנית מזכר מחקר (חומר עבודה באנגלית)','materials/session-02-deep-research/student/AF-RD-203-research-memo-template.md'),
      artifact('Source 1 — manufacturer note','מקור 1 — מסמך יצרן (חומר עבודה באנגלית)','materials/session-02-deep-research/sources/AF-SRC-201-extrusion-manufacturer-note.md'),
      artifact('Source 2 — fabricator quote','מקור 2 — הצעת יצרן (חומר עבודה באנגלית)','materials/session-02-deep-research/sources/AF-SRC-202-steel-fabricator-quote.md'),
      artifact('Source 3 — internal pilot test','מקור 3 — ניסוי פנימי (חומר עבודה באנגלית)','materials/session-02-deep-research/sources/AF-SRC-203-internal-pilot-test.md'),
      artifact('Source 4 — distributor comparison','מקור 4 — השוואת מפיץ (חומר עבודה באנגלית)','materials/session-02-deep-research/sources/AF-SRC-204-distributor-comparison.md')
    ],
    instructor:[
      translated('Step-by-step lesson script','מערך שיעור מפורט','materials/session-02-deep-research/instructor/AF-TRN-200-step-by-step-lesson-script.md','professional-course/he/materials/session-02-deep-research/instructor/AF-TRN-200-step-by-step-lesson-script.md'),
      translated('Teaching guide','מדריך הוראה','materials/session-02-deep-research/instructor/AF-TRN-200-instructor-guide.md','professional-course/he/materials/session-02-deep-research/instructor/AF-TRN-200-instructor-guide.md'),
      translated('Package overview','סקירת חומרי המפגש','materials/session-02-deep-research/README.md','professional-course/he/materials/session-02-deep-research/README.md'),
      translated('Answer key','מפתח תשובות','materials/session-02-deep-research/instructor/AF-TRN-201-answer-key.md','professional-course/he/materials/session-02-deep-research/instructor/AF-TRN-201-answer-key.md'),
      artifact('Assessment rubric','מחוון הערכה (חומר עבודה באנגלית)','materials/session-02-deep-research/instructor/AF-TRN-202-rubric.csv')
    ]
  },
  {
    n:3,
    role:text('Data Operations Specialist','מומחה או מומחית לתפעול נתונים'),
    title:text('Spreadsheet Engineering','הנדסת גיליונות נתונים'),
    summary:text('Clean messy inventory data without destroying evidence, then specify a safe alert workflow.','מנקים נתוני מלאי מבולגנים בלי למחוק ראיות, ואז מגדירים תהליך התרעה בטוח.'),
    student:[
      translated('Start this mission','התחלת המשימה','materials/session-03-spreadsheet-engineering/student/AF-OPS-301-assignment-brief.md','professional-course/he/materials/session-03-spreadsheet-engineering/student/AF-OPS-301-assignment-brief.md'),
      artifact('Messy inventory','נתוני מלאי לא נקיים (חומר עבודה באנגלית)','materials/session-03-spreadsheet-engineering/student/AF-DATA-301-inventory-messy.csv'),
      artifact('Data contract','חוזה נתונים (חומר עבודה באנגלית)','materials/session-03-spreadsheet-engineering/student/AF-DATA-302-data-contract-template.csv'),
      artifact('Automation specification','מפרט אוטומציה (חומר עבודה באנגלית)','materials/session-03-spreadsheet-engineering/student/AF-OPS-302-automation-specification.md')
    ],
    instructor:[
      translated('Step-by-step lesson script','מערך שיעור מפורט','materials/session-03-spreadsheet-engineering/instructor/AF-TRN-300-step-by-step-lesson-script.md','professional-course/he/materials/session-03-spreadsheet-engineering/instructor/AF-TRN-300-step-by-step-lesson-script.md'),
      translated('Teaching guide','מדריך הוראה','materials/session-03-spreadsheet-engineering/instructor/AF-TRN-300-instructor-guide.md','professional-course/he/materials/session-03-spreadsheet-engineering/instructor/AF-TRN-300-instructor-guide.md'),
      translated('Package overview','סקירת חומרי המפגש','materials/session-03-spreadsheet-engineering/README.md','professional-course/he/materials/session-03-spreadsheet-engineering/README.md'),
      translated('Answer key','מפתח תשובות','materials/session-03-spreadsheet-engineering/instructor/AF-TRN-301-answer-key.md','professional-course/he/materials/session-03-spreadsheet-engineering/instructor/AF-TRN-301-answer-key.md'),
      artifact('Reference clean inventory','מלאי נקי לדוגמה (חומר עבודה באנגלית)','materials/session-03-spreadsheet-engineering/instructor/AF-DATA-303-reference-clean-inventory.csv'),
      artifact('Assessment rubric','מחוון הערכה (חומר עבודה באנגלית)','materials/session-03-spreadsheet-engineering/instructor/AF-TRN-302-rubric.csv')
    ]
  },
  {
    n:4,
    role:text('Technical Communicator','כותב או כותבת תקשורת טכנית'),
    title:text('Presentations & Visual Artifacts','מצגות ותוצרים חזותיים'),
    summary:text('Turn incomplete cross-functional evidence into a clear six-slide leadership decision.','הופכים ראיות חלקיות מכמה צוותים להחלטת הנהלה ברורה בשישה שקפים.'),
    student:[
      translated('Start this mission','התחלת המשימה','materials/session-04-technical-communication/student/AF-COM-401-presentation-brief.md','professional-course/he/materials/session-04-technical-communication/student/AF-COM-401-presentation-brief.md'),
      artifact('Source notes','הערות מקור (חומר עבודה באנגלית)','materials/session-04-technical-communication/student/AF-COM-402-source-notes.md'),
      artifact('Storyboard template','תבנית סטוריבורד (חומר עבודה באנגלית)','materials/session-04-technical-communication/student/AF-COM-403-storyboard-template.csv'),
      artifact('Critique checklist','רשימת ביקורת (חומר עבודה באנגלית)','materials/session-04-technical-communication/student/AF-COM-404-critique-checklist.md')
    ],
    instructor:[
      translated('Step-by-step lesson script','מערך שיעור מפורט','materials/session-04-technical-communication/instructor/AF-TRN-400-step-by-step-lesson-script.md','professional-course/he/materials/session-04-technical-communication/instructor/AF-TRN-400-step-by-step-lesson-script.md'),
      translated('Teaching guide','מדריך הוראה','materials/session-04-technical-communication/instructor/AF-TRN-400-instructor-guide.md','professional-course/he/materials/session-04-technical-communication/instructor/AF-TRN-400-instructor-guide.md'),
      translated('Package overview','סקירת חומרי המפגש','materials/session-04-technical-communication/README.md','professional-course/he/materials/session-04-technical-communication/README.md'),
      translated('Answer key','מפתח תשובות','materials/session-04-technical-communication/instructor/AF-TRN-401-answer-key.md','professional-course/he/materials/session-04-technical-communication/instructor/AF-TRN-401-answer-key.md'),
      artifact('Assessment rubric','מחוון הערכה (חומר עבודה באנגלית)','materials/session-04-technical-communication/instructor/AF-TRN-402-rubric.csv')
    ]
  },
  {
    n:5,
    role:text('Operations Planner','מתכנן או מתכננת תפעול'),
    title:text('Constraint-Based Operations Planning','תכנון תפעולי מבוסס אילוצים'),
    summary:text('Create a feasible field itinerary with hard constraints, buffers, contingencies, and calendar output.','בונים מסלול שטח ישים עם אילוצים קשיחים, מרווחי ביטחון, תוכניות חלופיות ופלט ליומן.'),
    student:[
      translated('Start this mission','התחלת המשימה','materials/session-05-operations-planning/student/AF-OPS-501-mission-brief.md','professional-course/he/materials/session-05-operations-planning/student/AF-OPS-501-mission-brief.md'),
      artifact('Constraint register','רשימת אילוצים (חומר עבודה באנגלית)','materials/session-05-operations-planning/student/AF-OPS-502-constraints.csv'),
      artifact('Location candidates','אתרים אפשריים (חומר עבודה באנגלית)','materials/session-05-operations-planning/student/AF-OPS-503-location-candidates.csv'),
      artifact('Itinerary template','תבנית מסלול (חומר עבודה באנגלית)','materials/session-05-operations-planning/student/AF-OPS-504-itinerary-template.csv'),
      artifact('Calendar import template','תבנית יבוא ליומן (חומר עבודה באנגלית)','materials/session-05-operations-planning/student/AF-OPS-505-calendar-import-template.csv')
    ],
    instructor:[
      translated('Step-by-step lesson script','מערך שיעור מפורט','materials/session-05-operations-planning/instructor/AF-TRN-500-step-by-step-lesson-script.md','professional-course/he/materials/session-05-operations-planning/instructor/AF-TRN-500-step-by-step-lesson-script.md'),
      translated('Teaching guide','מדריך הוראה','materials/session-05-operations-planning/instructor/AF-TRN-500-instructor-guide.md','professional-course/he/materials/session-05-operations-planning/instructor/AF-TRN-500-instructor-guide.md'),
      translated('Package overview','סקירת חומרי המפגש','materials/session-05-operations-planning/README.md','professional-course/he/materials/session-05-operations-planning/README.md'),
      translated('Answer key','מפתח תשובות','materials/session-05-operations-planning/instructor/AF-TRN-501-answer-key.md','professional-course/he/materials/session-05-operations-planning/instructor/AF-TRN-501-answer-key.md'),
      artifact('Assessment rubric','מחוון הערכה (חומר עבודה באנגלית)','materials/session-05-operations-planning/instructor/AF-TRN-502-rubric.csv')
    ]
  },
  {
    n:6,
    role:text('Automation Engineer','מהנדס או מהנדסת אוטומציה'),
    title:text('Bounded Agent Workflows','תהליכי סוכנים בעלי גבולות'),
    summary:text('Design a stateful monitoring agent with duplicate suppression, recovery, observability, and human control.','מתכננים סוכן ניטור בעל מצב, מניעת כפילויות, התאוששות, נצפות ובקרה אנושית.'),
    student:[
      translated('Start this mission','התחלת המשימה','materials/session-06-agent-workflows/student/AF-AUTO-601-mission-brief.md','professional-course/he/materials/session-06-agent-workflows/student/AF-AUTO-601-mission-brief.md'),
      artifact('Agent specification','מפרט סוכן (חומר עבודה באנגלית)','materials/session-06-agent-workflows/student/AF-AUTO-602-agent-specification-template.md'),
      artifact('Supplier snapshots','תצלומי מצב של ספקים (חומר עבודה באנגלית)','materials/session-06-agent-workflows/student/AF-DATA-601-supplier-snapshots.csv'),
      artifact('Test log','יומן בדיקות (חומר עבודה באנגלית)','materials/session-06-agent-workflows/student/AF-AUTO-603-test-log-template.csv')
    ],
    instructor:[
      translated('Step-by-step lesson script','מערך שיעור מפורט','materials/session-06-agent-workflows/instructor/AF-TRN-600-step-by-step-lesson-script.md','professional-course/he/materials/session-06-agent-workflows/instructor/AF-TRN-600-step-by-step-lesson-script.md'),
      translated('Teaching guide','מדריך הוראה','materials/session-06-agent-workflows/instructor/AF-TRN-600-instructor-guide.md','professional-course/he/materials/session-06-agent-workflows/instructor/AF-TRN-600-instructor-guide.md'),
      translated('Package overview','סקירת חומרי המפגש','materials/session-06-agent-workflows/README.md','professional-course/he/materials/session-06-agent-workflows/README.md'),
      translated('Answer key','מפתח תשובות','materials/session-06-agent-workflows/instructor/AF-TRN-601-answer-key.md','professional-course/he/materials/session-06-agent-workflows/instructor/AF-TRN-601-answer-key.md'),
      artifact('Assessment rubric','מחוון הערכה (חומר עבודה באנגלית)','materials/session-06-agent-workflows/instructor/AF-TRN-602-rubric.csv')
    ]
  },
  {
    n:7,
    role:text('AI Systems Engineer','מהנדס או מהנדסת מערכות AI'),
    title:text('Parametric CAD','תיב"ם פרמטרי'),
    summary:text('Translate measurable interfaces into a parametric OpenSCAD bracket and a validation plan.','מתרגמים ממשקים מדידים לתושבת OpenSCAD פרמטרית ולתוכנית אימות.'),
    student:[
      translated('Start this mission','התחלת המשימה','materials/session-07-parametric-cad/student/AF-CAD-701-design-brief.md','professional-course/he/materials/session-07-parametric-cad/student/AF-CAD-701-design-brief.md'),
      artifact('Design contract','חוזה תכנון (חומר עבודה באנגלית)','materials/session-07-parametric-cad/student/AF-CAD-702-design-contract.csv'),
      artifact('OpenSCAD starter','קובץ פתיחה של OpenSCAD (חומר עבודה באנגלית)','materials/session-07-parametric-cad/student/AF-CAD-703-starter.scad'),
      artifact('Validation log','יומן אימות (חומר עבודה באנגלית)','materials/session-07-parametric-cad/student/AF-CAD-704-validation-log.csv')
    ],
    instructor:[
      translated('Step-by-step lesson script','מערך שיעור מפורט','materials/session-07-parametric-cad/instructor/AF-TRN-700-step-by-step-lesson-script.md','professional-course/he/materials/session-07-parametric-cad/instructor/AF-TRN-700-step-by-step-lesson-script.md'),
      translated('Teaching guide','מדריך הוראה','materials/session-07-parametric-cad/instructor/AF-TRN-700-instructor-guide.md','professional-course/he/materials/session-07-parametric-cad/instructor/AF-TRN-700-instructor-guide.md'),
      translated('Package overview','סקירת חומרי המפגש','materials/session-07-parametric-cad/README.md','professional-course/he/materials/session-07-parametric-cad/README.md'),
      translated('Answer key','מפתח תשובות','materials/session-07-parametric-cad/instructor/AF-TRN-701-answer-key.md','professional-course/he/materials/session-07-parametric-cad/instructor/AF-TRN-701-answer-key.md'),
      artifact('Assessment rubric','מחוון הערכה (חומר עבודה באנגלית)','materials/session-07-parametric-cad/instructor/AF-TRN-702-rubric.csv')
    ]
  },
  {
    n:8,
    role:text('Lead Applied AI Engineer','מהנדס או מהנדסת AI יישומי מובילים'),
    title:text('Capstone: AquaNode Mini','פרויקט מסכם: AquaNode Mini'),
    summary:text('Integrate all seven disciplines into one evidence-bound engineering-validation recommendation.','משלבים את שבעת התחומים להמלצת אימות הנדסית אחת שמוגבלת לראיות.'),
    student:[
      translated('Start the capstone','התחלת הפרויקט המסכם','capstone/student/AF-CAP-001-mission-brief.md','professional-course/he/capstone/student/AF-CAP-001-mission-brief.md'),
      artifact('Evidence register','מרשם ראיות (חומר עבודה באנגלית)','capstone/student/AF-CAP-002-evidence-register.csv'),
      artifact('Deliverable register','מרשם תוצרים (חומר עבודה באנגלית)','capstone/student/AF-CAP-003-deliverable-register.csv'),
      artifact('Decision log','יומן החלטות (חומר עבודה באנגלית)','capstone/student/AF-CAP-004-decision-log.csv')
    ],
    instructor:[
      translated('Step-by-step facilitation script','מערך הנחיה מפורט','capstone/instructor/AF-CAP-099-step-by-step-facilitation-script.md','professional-course/he/capstone/instructor/AF-CAP-099-step-by-step-facilitation-script.md'),
      translated('Teaching guide','מדריך הוראה','capstone/instructor/AF-CAP-100-capstone-teaching-guide.md','professional-course/he/capstone/instructor/AF-CAP-100-capstone-teaching-guide.md'),
      translated('Package overview','סקירת הפרויקט המסכם','capstone/README.md','professional-course/he/capstone/README.md'),
      translated('Reference instructor guide','מדריך עזר למנחה','capstone/instructor/AF-CAP-101-instructor-guide.md','professional-course/he/capstone/instructor/AF-CAP-101-instructor-guide.md'),
      artifact('Assessment rubric','מחוון הערכה (חומר עבודה באנגלית)','capstone/instructor/AF-CAP-102-rubric.csv')
    ]
  }
];

const ui={
  en:{
    metaTitle:'Applied AI Mastery — Professional',metaDescription:'Applied AI Mastery Professional — an interactive, project-based AI course built around AquaForge Technologies.',
    skip:'Skip to course content',brand:'Choose a course',nav:'Primary navigation',language:'Language',courses:'Courses',missions:'Missions',capstone:'Capstone',company:'AquaForge',about:'About',
    heroEyebrow:'Professional track · Practical, project-based AI learning',heroTitle:'Learn applied AI by helping run an engineering company.',heroText:'Seven guided missions and one integrated capstone teach prompting, research, spreadsheets, communication, planning, automation, and parametric CAD through realistic AquaForge work.',startCourse:'Start the course',openCapstoneBrief:'Open capstone brief',version:'Beta 0.9',versionLabel:'Course version',
    modePanel:'Course viewing mode',chooseView:'Choose your view',viewText:'Student mode keeps the course focused on assignments. Instructor mode also shows teaching scripts, answer keys, and assessment rubrics.',viewMode:'View mode',student:'Student',instructor:'Instructor',
    progression:'Course progression',progressionTitle:'Seven missions, then the capstone',finalMission:'Final mission',capstoneTitle:'AquaNode Mini engineering-validation decision',capstoneText:'Reconcile evidence from every session into one bounded recommendation: proceed, revise, or stop for now. The capstone tests traceability, judgment, verification, and coherent updates across deliverables.',openCapstoneMission:'Open capstone mission',
    capstoneSubmission:'Capstone submission',submissionMemo:'Recommendation and research memo',submissionRegisters:'Evidence and decision registers',submissionDeck:'Workbook and six-slide deck',submissionPlans:'Operations and agent plans',submissionCad:'OpenSCAD source and validation log',submissionReflection:'Reflection on human judgment',
    sharedSimulation:'Shared simulation',companyTitle:'AquaForge source of truth',companyOverview:'Company overview',companyOverviewText:'Mission, structure, products, and document conventions.',employeeDirectory:'Employee directory',employeeDirectoryText:'Canonical personnel, roles, reporting lines, and communication styles.',roadmap:'Course roadmap',roadmapText:'Current scope and planned improvements.',footerBrand:'Applied AI Mastery · Professional ·',repository:'GitHub repository',
    mission:'Mission',studentMaterials:'Student materials',instructorMaterials:'Instructor materials',complete:'Complete'
  },
  he:{
    metaTitle:'Applied AI Mastery — המסלול המקצועי',metaDescription:'המסלול המקצועי של Applied AI Mastery — קורס AI יישומי מבוסס פרויקטים בסביבת AquaForge Technologies.',
    skip:'דילוג לתוכן הקורס',brand:'בחירת קורס',nav:'ניווט ראשי',language:'שפה',courses:'קורסים',missions:'משימות',capstone:'פרויקט מסכם',company:'AquaForge',about:'על המסלול',
    heroEyebrow:'המסלול המקצועי · לימודי AI מעשיים מבוססי פרויקטים',heroTitle:'לומדים AI יישומי דרך ניהול משימות בחברה הנדסית.',heroText:'שבע משימות מודרכות ופרויקט מסכם אחד מלמדים פרומפטים, מחקר, גיליונות נתונים, תקשורת, תכנון, אוטומציה ותיב"ם פרמטרי דרך עבודה מציאותית ב-AquaForge.',startCourse:'התחלת הקורס',openCapstoneBrief:'פתיחת תקציר הפרויקט המסכם',version:'בטא 0.9',versionLabel:'גרסת הקורס',
    modePanel:'מצב תצוגת הקורס',chooseView:'בחירת תצוגה',viewText:'מצב תלמיד מציג את המשימות וחומרי העבודה. מצב מנחה מציג גם מערכי שיעור, מפתחות תשובות ומחווני הערכה.',viewMode:'מצב תצוגה',student:'תלמיד',instructor:'מנחה',
    progression:'התקדמות בקורס',progressionTitle:'שבע משימות ולאחריהן הפרויקט המסכם',finalMission:'המשימה האחרונה',capstoneTitle:'החלטת אימות הנדסית עבור AquaNode Mini',capstoneText:'מאחדים ראיות מכל המפגשים להמלצה תחומה אחת: להתקדם, לבצע שינויים או לעצור לעת עתה. הפרויקט בוחן עקיבות, שיקול דעת, אימות ועדכון עקבי בין תוצרים.',openCapstoneMission:'פתיחת משימת הסיום',
    capstoneSubmission:'הגשת הפרויקט המסכם',submissionMemo:'המלצה ומזכר מחקר',submissionRegisters:'מרשמי ראיות והחלטות',submissionDeck:'חוברת עבודה ומצגת בת שישה שקפים',submissionPlans:'תוכניות תפעול וסוכן',submissionCad:'קוד OpenSCAD ויומן אימות',submissionReflection:'רפלקציה על שיקול דעת אנושי',
    sharedSimulation:'הסימולציה המשותפת',companyTitle:'מקור האמת של AquaForge',companyOverview:'סקירת החברה (חומר עבודה באנגלית)',companyOverviewText:'ייעוד, מבנה, מוצרים וכללי מסמכים.',employeeDirectory:'ספר העובדים (חומר עבודה באנגלית)',employeeDirectoryText:'אנשים, תפקידים, כפיפויות וסגנונות תקשורת קנוניים.',roadmap:'מפת דרכים של הקורס (חומר עבודה באנגלית)',roadmapText:'היקף נוכחי ושיפורים מתוכננים.',footerBrand:'Applied AI Mastery · המסלול המקצועי ·',repository:'מאגר GitHub',
    mission:'משימה',studentMaterials:'חומרי תלמיד',instructorMaterials:'חומרי הוראה',complete:'הושלם'
  }
};

const readCompleted=()=>{
  try{
    const value=JSON.parse(localStorage.getItem('aam-completed')||'[]');
    return new Set(Array.isArray(value)?value.filter(n=>Number.isInteger(n)&&n>=1&&n<=8):[]);
  }catch{return new Set();}
};
const savedMode=localStorage.getItem('aam-mode');
const queryLanguage=new URLSearchParams(location.search).get('lang');
const savedLanguage=localStorage.getItem('aam-professional-language');
const initialLanguage=['en','he'].includes(queryLanguage)?queryLanguage:['en','he'].includes(savedLanguage)?savedLanguage:'en';
const state={language:initialLanguage,mode:['student','instructor'].includes(savedMode)?savedMode:'student',completed:readCompleted()};
const grid=document.querySelector('[data-session-grid]');
const resourceHref=path=>path.toLowerCase().endsWith('.md')?`document.html?src=${encodeURIComponent(path)}`:path;
const resourcePath=item=>item.localized?item.path[state.language]:item.path;
const linkList=items=>items.map((item,index)=>`<a${index===0?' class="start-link"':''} href="${resourceHref(resourcePath(item))}">${item.label[state.language]}</a>`).join('');

function updateProgress(){
  const count=state.completed.size;
  const progress=document.querySelector('[data-progress]');
  const label=document.querySelector('[data-progress-label]');
  if(progress)progress.value=count;
  if(label)label.textContent=state.language==='he'?`${count} מתוך 8 הושלמו`:`${count} of 8 complete`;
}

function render(){
  if(!grid)return;
  const copy=ui[state.language];
  grid.innerHTML=sessions.map(session=>`<article class="mission"><div class="mission-number">${session.n}</div><div><span class="badge">${copy.mission} ${session.n}</span><h3>${session.title[state.language]}</h3><div class="role">${session.role[state.language]}</div><p class="mission-summary">${session.summary[state.language]}</p><div class="file-groups"><section class="file-group"><h4>${copy.studentMaterials}</h4>${linkList(session.student)}</section><section class="file-group instructor-only" ${state.mode==='student'?'hidden':''}><h4>${copy.instructorMaterials}</h4>${linkList(session.instructor)}</section></div></div><div class="mission-controls"><label class="complete-toggle"><input type="checkbox" data-complete="${session.n}" ${state.completed.has(session.n)?'checked':''}> ${copy.complete}</label></div></article>`).join('');
  document.querySelectorAll('[data-complete]').forEach(box=>box.addEventListener('change',()=>{
    const n=Number(box.dataset.complete);
    box.checked?state.completed.add(n):state.completed.delete(n);
    localStorage.setItem('aam-completed',JSON.stringify([...state.completed]));
    updateProgress();
  }));
  updateProgress();
}

function setMode(mode){
  state.mode=mode==='instructor'?'instructor':'student';
  localStorage.setItem('aam-mode',state.mode);
  document.querySelectorAll('[data-mode]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.mode===state.mode)));
  document.querySelectorAll('.instructor-only').forEach(element=>{element.hidden=state.mode==='student';});
}

function setLanguage(language,{persist=true,updateUrl=false}={}){
  state.language=language==='he'?'he':'en';
  const copy=ui[state.language];
  const hebrew=state.language==='he';
  document.documentElement.lang=state.language;
  document.documentElement.dir=hebrew?'rtl':'ltr';
  document.body.classList.toggle('rtl',hebrew);
  document.querySelectorAll('[data-language]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.language===state.language)));
  document.querySelectorAll('[data-i18n]').forEach(element=>{const value=copy[element.dataset.i18n];if(value)element.textContent=value;});
  document.querySelectorAll('[data-i18n-aria-label]').forEach(element=>{const value=copy[element.dataset.i18nAriaLabel];if(value)element.setAttribute('aria-label',value);});
  document.title=copy.metaTitle;
  const description=document.querySelector('meta[name="description"]');
  if(description)description.content=copy.metaDescription;
  const capstonePath=state.language==='he'?'professional-course/he/capstone/student/AF-CAP-001-mission-brief.md':'capstone/student/AF-CAP-001-mission-brief.md';
  document.querySelectorAll('[data-professional-capstone-link]').forEach(link=>{link.href=resourceHref(capstonePath);});
  const overviewPath=state.language==='he'?'professional-course/he/README.md':'README.md';
  document.querySelectorAll('[data-professional-overview-link]').forEach(link=>{link.href=resourceHref(overviewPath);});
  if(persist)localStorage.setItem('aam-professional-language',state.language);
  if(updateUrl){const url=new URL(location.href);url.searchParams.set('lang',state.language);history.replaceState(null,'',url);}
  render();
  setMode(state.mode);
}

document.querySelectorAll('[data-mode]').forEach(button=>button.addEventListener('click',()=>setMode(button.dataset.mode)));
document.querySelectorAll('[data-language]').forEach(button=>button.addEventListener('click',()=>setLanguage(button.dataset.language,{updateUrl:true})));
window.addEventListener('storage',event=>{if(event.key==='aam-professional-language'&&['en','he'].includes(event.newValue))setLanguage(event.newValue,{persist:false});});
setLanguage(initialLanguage);
const year=document.querySelector('[data-year]');
if(year)year.textContent=new Date().getFullYear();
