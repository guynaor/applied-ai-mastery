#!/usr/bin/env node
// Asserts that every markdown document the site serves survives the site's own
// markdown parser.
//
// Why this exists: the Hebrew syllabus shipped with skills lines written as
// indented `*emphasis*` continuations under numbered items. Standard markdown
// renders that; `site/assets/js/markdown-viewer.js` does not. Its list pattern
// requires whitespace after the bullet character, so those lines matched
// nothing, fell through to the paragraph branch, and were emitted as `<p>`
// elements inside an `<ol>` — invalid HTML that renders unpredictably. The
// file was correct, the deploy was correct, and the page was wrong.
//
// The parser is the authority here, not the CommonMark spec. This checks
// documents against the parser that will actually render them.

import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, resolve, relative } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const VIEWER = resolve(ROOT, 'site/assets/js/markdown-viewer.js');

// The two list patterns the viewer recognises, read from the viewer itself so
// this cannot drift from it.
const viewer = readFileSync(VIEWER, 'utf8');
const unorderedSrc = viewer.match(/const unordered=line\.match\((\/.+?\/)\)/)?.[1];
const orderedSrc = viewer.match(/const ordered=line\.match\((\/.+?\/)\)/)?.[1];
assert.ok(unorderedSrc && orderedSrc,
  'Could not read the list patterns out of markdown-viewer.js. If it was restructured, update this check to match.');
const UNORDERED = new RegExp(unorderedSrc.slice(1, -1));
const ORDERED = new RegExp(orderedSrc.slice(1, -1));

// Documents the site serves through document.html.
// Only what the site serves through document.html. Specs and plans under
// docs/ are read on GitHub, where a standard renderer handles continuations.
const DIRS = ['personal-course', 'professional-course', 'teacher-course', 'capstone'];

function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (entry === 'node_modules' || entry.startsWith('.')) continue;
    // Legacy twelve-lesson files, superseded by the seven sessions and linked
    // from nowhere. Their lists are broken by code fences, which this parser
    // also closes on — not worth fixing content the site never serves.
    if (/^lesson-\d\d/.test(entry)) continue;
    if (statSync(full).isDirectory()) walk(full, out);
    else if (entry.endsWith('.md')) out.push(full);
  }
  return out;
}

const findings = [];

for (const file of DIRS.flatMap(d => walk(join(ROOT, d)))) {
  const lines = readFileSync(file, 'utf8').split('\n');
  let inCode = false;
  let previousWasListItem = false;

  lines.forEach((line, index) => {
    if (/^\s*```/.test(line)) { inCode = !inCode; return; }
    if (inCode) return;

    const isListItem = UNORDERED.test(line) || ORDERED.test(line);

    // An indented, non-blank line directly after a list item is a continuation
    // in standard markdown. This parser has no continuation handling: the line
    // becomes a paragraph emitted between two <li> elements.
    const isIndentedContinuation = /^\s+\S/.test(line) && !isListItem
      && !/^\s*\|/.test(line) && !/^\s*>/.test(line);

    // This parser closes the open list on ANY blank line, so a standard loose
    // list renders as several lists and the numbering restarts at 1.
    if (previousWasListItem && !line.trim()) {
      const next = lines[index + 1] ?? '';
      if (UNORDERED.test(next) || ORDERED.test(next)) {
        findings.push({
          file: relative(ROOT, file),
          line: index + 1,
          text: '(blank line between list items)',
          why: 'This parser closes the list on a blank line, so the next item starts a\n    new list and numbering restarts at 1. Remove the blank line.',
        });
      }
    }

    if (previousWasListItem && isIndentedContinuation) {
      findings.push({
        file: relative(ROOT, file),
        line: index + 1,
        text: line.trim().slice(0, 70),
        why: 'Indented continuation under a list item. This parser has no continuation\n    handling — it emits a <p> between the <li> elements. Fold it onto the list\n    item, or make it its own list item with a bullet followed by a space.',
      });
    }
    if (line.trim()) previousWasListItem = isListItem;
  });
}

if (findings.length > 0) {
  console.error(`Markdown that the site's viewer will not render as written — ${findings.length} line(s):\n`);
  for (const f of findings) {
    console.error(`  ${f.file}:${f.line}`);
    console.error(`    ${f.text}`);
    console.error(`    ${f.why}\n`);
  }
  process.exit(1);
}

console.log('Markdown render check passed — no list continuations the site viewer would drop.');
