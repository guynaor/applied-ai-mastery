# Personal Course Navigation and Journal Review Fixes

## Goal

Address the second student-review round with small, consistent changes to personal-course prose, document navigation, and the learning-journal workflow.

## Scope

### Personal-course punctuation

Remove semicolons that appear at the end of lines in every Markdown file under `personal-course/`. This applies to English and Hebrew student materials, instructor materials, the syllabus, and the existing local journal documents. Other punctuation and semicolons inside prose remain unchanged.

Add an automated contract that scans all personal-course Markdown files and fails when a line ends in a semicolon.

### Document navigation

Remove the `Open source file` link from the shared Markdown document viewer in every language and context.

Keep the existing localized return link in the document header. Add a second localized return link after the rendered document so students can return to the personal lesson list without scrolling back to the top. The bottom link uses the same resolved context, language, URL, and label as the header link. The same behavior remains consistent for professional-context documents.

The bottom navigation is hidden while a document is loading or when a document cannot be loaded. It becomes visible only after successful rendering.

### Google Docs learning journal

Use this Google Doc as the canonical personal-course journal template:

`https://docs.google.com/document/d/1hch-HxEpCtozVBZZVAgHTctYUwBtmUakQRrFTc7ar1I/edit?tab=t.0#heading=h.3ddkdfdy6lj8`

All `data-journal-link` elements on the personal-course page point directly to this URL, regardless of the selected course language. Journal links open in a new tab with `rel="noopener noreferrer"` so the course remains available.

Add concise localized guidance in the personal-course practice section instructing students to open the template and choose **File -> Make a copy** before writing. The instruction is visible in both student and instructor modes.

Remove the document viewer's local journal clipboard-copy control and related JavaScript because the external Google Doc replaces that workflow. The local Markdown journal files remain in the repository as course source material, but the site no longer links to them as the active journal.

## Accessibility and Behavior

- Both return links are ordinary keyboard-accessible anchors.
- The external journal behavior is communicated by its instructional copy and link label; no popup or intermediate page is added.
- English and Hebrew navigation labels continue to follow the selected or inferred context.
- Existing Markdown link context propagation and table accessibility remain unchanged.

## Verification

- Contract test: no personal-course Markdown line ends in a semicolon.
- Contract test: the source-file link and journal clipboard-copy code are absent.
- Contract test: header and bottom return links resolve to the same localized destination.
- Contract test: all personal-course journal links use the supplied Google Docs URL and include safe new-tab attributes.
- Browser checks in English and Hebrew at desktop and mobile widths.
- Live external-link reachability check before deployment.

## Out of Scope

- Editing or changing permissions on the supplied Google Doc.
- Creating a forced-copy Google Docs URL.
- Reworking lesson content beyond trailing-semicolon cleanup.
- Changing professional-course prose.
