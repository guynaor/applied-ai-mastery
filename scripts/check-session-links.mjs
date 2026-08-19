#!/usr/bin/env node
// Asserts that every reference to a session file resolves to a file that exists.
//
// Renaming a session leaves dangling relative links that no other check in this
// repo catches: a broken link in a guide fails nothing until a facilitator
// clicks it mid-session. This guard exists so a renumber cannot ship one.
//
// Two kinds of reference, distinguished by how they resolve:
//   - starting with `personal-course/` -> relative to the repo root
//     (how site/assets/js/personal-course.js addresses briefs and guides)
//   - anything else                    -> relative to the referring file
//     (how a guide addresses its own slides, and how the Hebrew tree's extra
//      directory depth changes the number of `../` segments)

import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, dirname, resolve, relative } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const SCAN_DIRS = ['personal-course', 'site/assets/js'];
const SCAN_EXTS = ['.md', '.html', '.scad', '.js'];

// Only actual link targets count. A filename shown as link TEXT — say
// [`session-05-organiser.scad`](../instructor/samples/session-05-organiser.scad)
// — is display, not a path, and matching it produces false alarms exactly when
// a rename makes the output hardest to read.
const TARGET_PATTERNS = [
  /\]\(([^)\s]+)\)/g,                 // markdown [text](target)
  /(?:href|src)="([^"]+)"/g,          // html href / src
  /'([^']*personal-course\/[^']*)'/g, // js string literals in the portal
];

// A target counts if it names a session file with a real extension.
const IS_SESSION_FILE = /session-\d{2}[a-z0-9-]*\.(?:md|html|scad)$/;

function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (SCAN_EXTS.some(ext => entry.endsWith(ext))) out.push(full);
  }
  return out;
}

const files = SCAN_DIRS.flatMap(dir => walk(join(ROOT, dir)));
const failures = [];
let checked = 0;

for (const file of files) {
  const text = readFileSync(file, 'utf8');
  const lines = text.split('\n');

  lines.forEach((line, index) => {
    for (const pattern of TARGET_PATTERNS) {
      for (const match of line.matchAll(pattern)) {
        // Drop any #fragment or ?query before resolving.
        const reference = match[1].split(/[#?]/)[0];
        if (!IS_SESSION_FILE.test(reference)) continue;

        const target = reference.startsWith('personal-course/')
          ? resolve(ROOT, reference)
          : resolve(dirname(file), reference);

        checked += 1;
        if (!existsSync(target)) {
          failures.push({
            from: relative(ROOT, file),
            line: index + 1,
            reference,
            resolved: relative(ROOT, target),
          });
        }
      }
    }
  });
}

if (failures.length > 0) {
  // Report every failure, not just the first: during a rename one run should
  // show the whole blast radius rather than being peeled one link at a time.
  console.error(`Session link check FAILED — ${failures.length} dangling reference(s):\n`);
  for (const f of failures) {
    console.error(`  ${f.from}:${f.line}`);
    console.error(`    references ${f.reference}`);
    console.error(`    resolves to ${f.resolved} — does not exist\n`);
  }
  process.exit(1);
}

console.log(`Session link check passed — ${checked} reference(s) across ${files.length} file(s), all resolve.`);
