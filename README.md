# Applied AI Mastery

A practical, project-based catalogue of bilingual AI courses. Learners build durable skills in structured prompting, research, spreadsheets, presentations, planning, bounded automation, and practical design.

The Professional track is organized around the fictional engineering company **AquaForge Technologies**. The Personal track applies the same habits to everyday life. The Teacher track applies them to K–12 classroom work, from lesson plans and gradebook analysis to presentations, bounded workflows, and simple classroom apps.

## Project status

**Polished beta candidate (v0.9).**

The repository includes:

- a responsive interactive course portal;
- seven complete mission packages;
- student source files and worksheets;
- instructor answer keys and rubrics;
- CSV files compatible with Google Sheets and Excel;
- a parametric OpenSCAD exercise;
- an integrated capstone;
- three bilingual tracks: Personal, Professional, and Teacher;
- a K–12-adaptable Teacher track with fictional learning data, seven missions, and a teacher-reviewed unit-plan capstone;
- Firebase Hosting configuration.

Teacher materials use fictional, public, or safely de-identified examples only. AI can support drafting and analysis, but teachers retain judgment over grades, placement, interventions, communication, and every consequential instructional decision.

The remaining beta work is classroom testing, link verification, instructor walkthrough feedback, and optional PDF/DOCX/XLSX distributions.

## Run locally

Open `index.html` directly, or serve the repository root with any static HTTP server.

No dependencies or build step are required.

## Deploy

See [DEPLOYMENT.md](DEPLOYMENT.md). Production is deployed only through Firebase Hosting.

## Professional course progression

1. Advanced Prompting & Model Selection
2. Deep Research & Information Synthesis
3. Spreadsheet Engineering
4. Presentations & Visual Artifacts
5. Constraint-Based Operations Planning
6. Bounded Agent Workflows
7. Physical Design & Parametric CAD
8. Capstone: AquaNode Mini

## Teacher course progression

1. Prompting for Instructional Design
2. Research and Source Synthesis
3. Gradebook and Learning-Data Spreadsheets
4. Classroom Presentations and Visual Learning Artifacts
5. Constrained Unit Planning
6. Bounded Teacher Workflows
7. Classroom Apps and Resource Hubs
8. Capstone: Teacher-Reviewed K–12 Unit Plan

## Instructor-content warning

The portal's Student mode hides instructor links for convenience, not security. Instructor materials remain visible in the public repository. Use separate student and instructor deployments when answer-key confidentiality matters.

## Working model

All substantive changes are developed on feature branches and merged through reviewed pull requests.

## Design principle

Every addition should answer one question:

> Does this make the student a better problem solver?

If it does not, it does not belong in the course.
