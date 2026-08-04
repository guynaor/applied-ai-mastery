# Course Navigation and Learning Journal Review Fixes

## Goal

Address the second student-review round with small, consistent changes to personal-course prose, document navigation, and the learning-journal workflows for both courses.

## Scope

### Personal-course punctuation

Remove semicolons that appear at the end of lines in every Markdown file under `personal-course/`. This applies to English and Hebrew student materials, instructor materials, the syllabus, and the existing local journal documents. Other punctuation and semicolons inside prose remain unchanged.

Add an automated contract that scans all personal-course Markdown files and fails when a line ends in a semicolon.

### Document navigation

Remove the `Open source file` link from the shared Markdown document viewer in every language and context.

Keep the existing localized return link in the document header. Add a second localized return link after the rendered document so students can return to the personal lesson list without scrolling back to the top. The bottom link uses the same resolved context, language, URL, and label as the header link. The same behavior remains consistent for professional-context documents.

The bottom navigation is hidden while a document is loading or when a document cannot be loaded. It becomes visible only after successful rendering.

### Learning journal sources

Keep four separate Markdown journal sources in the repository:

- personal course, English
- personal course, Hebrew
- professional course, English
- professional course, Hebrew

The two personal templates retain the current reflective structure for twelve lessons and a final course reflection. The two professional templates cover seven missions and the capstone. Their repeated entry structure records the work problem, evidence, reusable prompt or workflow, AI failure or uncertainty, verification, human approval, saved artifact, and transfer to real work. They also include a session-specific reflection prompt for each mission and a final course reflection.

The English and Hebrew documents are independent templates rather than bilingual sections in one document.

### Google Docs templates

Launch a fresh, isolated Chrome automation profile. Pause for the user to sign in to Google, then use the authenticated session to create four formatted Google Docs from the Markdown sources. Do not reuse or modify the user's normal Chrome profile.

Name each document clearly by course and language. Set every document's general access to **Anyone with the link** and the role to **Viewer**. Verify each document in a signed-in session, record its final URL, and keep the documents owned by the user's authenticated Google account.

The previously supplied personal journal document is not used by the site after the four new templates are created.

### Course integration

All journal links open in a new tab with `rel="noopener noreferrer"` so the course remains available.

On the personal-course page, every `data-journal-link` points to the personal English or Hebrew Google Doc according to the selected language. Add concise localized guidance in the practice section instructing students to open the template and choose **File -> Make a copy** before writing. The instruction is visible in both student and instructor modes.

Add a localized learning-journal link to the professional-course navigation and a visible journal action near the course introduction. Those links point to the professional English or Hebrew Google Doc according to the selected language. Add the same localized **File -> Make a copy** instruction without introducing a new marketing section.

Remove the document viewer's local journal clipboard-copy control and related JavaScript because external Google Docs replace that workflow.

## Accessibility and Behavior

- Both return links are ordinary keyboard-accessible anchors.
- External journal behavior is communicated by instructional copy and link labels; no popup or intermediate page is added.
- English and Hebrew navigation labels continue to follow the selected or inferred context.
- Existing Markdown link context propagation and table accessibility remain unchanged.

## Verification

- Contract test: no personal-course Markdown line ends in a semicolon.
- Contract test: the source-file link and journal clipboard-copy code are absent.
- Contract test: header and bottom return links resolve to the same localized destination.
- Contract test: personal and professional journal links select the correct English or Hebrew Google Docs URL and include safe new-tab attributes.
- Content checks for all four Markdown journal sources, including all required personal lessons, professional missions, and capstone reflection prompts.
- Browser checks in English and Hebrew at desktop and mobile widths.
- Google Docs checks for title, representative formatting, and **Anyone with the link -> Viewer** access.
- Live external-link reachability checks before deployment.

## Out of Scope

- Editing or changing permissions on the previously supplied Google Doc.
- Creating forced-copy Google Docs URLs.
- Reworking lesson content beyond trailing-semicolon cleanup.
- Changing professional-course prose.
