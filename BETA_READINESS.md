# Polished Beta Readiness

## Included in this beta candidate

- [x] Responsive static course portal
- [x] Student and instructor interface modes
- [x] Mission navigation for Sessions 1–7
- [x] Integrated capstone navigation
- [x] Reviewed student materials, answer keys, and rubrics
- [x] Persistent local progress tracking
- [x] AquaForge source-of-truth links
- [x] Vercel configuration
- [x] Firebase Hosting configuration
- [x] Deployment and instructor-content guidance
- [x] No runtime dependencies or build step

## Required before announcing the beta publicly

- [ ] Deploy a preview from this feature branch
- [ ] Run an automated or manual broken-link check
- [ ] Open every CSV in Google Sheets or Excel and confirm column alignment
- [ ] Render the OpenSCAD starter with default and changed parameters
- [ ] Complete one full student walkthrough
- [ ] Complete one instructor walkthrough by someone other than the author
- [ ] Confirm mobile navigation and keyboard operation
- [ ] Decide whether public answer keys are acceptable
- [ ] Record known limitations in release notes

## Recommended beta exit criteria

The beta is ready to share when:

1. all portal links resolve in the deployed preview;
2. no exercise has a blocking ambiguity or malformed source file;
3. a student can complete the course without repository knowledge;
4. an instructor can run each session from the included materials;
5. known issues are documented and non-blocking.

## Known beta limitations

- Markdown files are served as source documents rather than transformed into styled lesson pages.
- Student mode is not security or authentication.
- Progress is stored only in the current browser using `localStorage`.
- PDF, DOCX, and XLSX convenience exports are not yet generated.
- The course has not yet completed independent student and instructor pilots.
