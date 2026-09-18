#!/usr/bin/env node
// Asserts that the session 5 Windows setup files, the short URLs the course
// hands out, and the Firebase redirects behind them all still agree.
//
// A learner meets this installer through a URL, never through a path in this
// repo: they type `applied-ai-mastery.web.app/s5/windows` into a browser. That
// makes the failure mode invisible here — rename the .bat and every doc still
// reads fine, every link checker still passes, and the only thing that breaks
// is a learner's evening. This guard closes that gap.
//
// Run: node scripts/check-session-05-installer.mjs

import { readFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const SITE = 'https://applied-ai-mastery.web.app';

const SETUP_DOCS = [
  'personal-course/sessions/session-05-setup.md',
  'personal-course/he/sessions/session-05-setup.md',
];

const SAMPLES = 'personal-course/instructor/samples';
const SCRIPT = `${SAMPLES}/session-05-freecad-windows.ps1`;
const WRAPPERS = [
  `${SAMPLES}/session-05-freecad-windows.bat`,
  `${SAMPLES}/session-05-freecad-windows-check.bat`,
];

const failures = [];
const fail = (message) => failures.push(message);
const read = (relativePath) => readFileSync(join(ROOT, relativePath), 'utf8');

// --- the files themselves ----------------------------------------------------

for (const file of [SCRIPT, ...WRAPPERS]) {
  if (!existsSync(join(ROOT, file))) fail(`${file} is missing`);
}

// cmd.exe mis-parses a .bat whose lines end in LF alone, and nothing about the
// symptom points at line endings. .gitattributes pins this; this proves it.
for (const wrapper of WRAPPERS) {
  if (!existsSync(join(ROOT, wrapper))) continue;
  const text = read(wrapper);
  const lf = (text.match(/\n/g) || []).length;
  const crlf = (text.match(/\r\n/g) || []).length;
  if (lf !== crlf) fail(`${wrapper} has ${lf - crlf} line(s) ending in LF — a .bat must be CRLF throughout`);
}

// Windows PowerShell still opens on codepage 437 on plenty of machines, where a
// non-ASCII character in the script's output arrives as mojibake. On a setup
// script, garbled output reads as "it broke".
if (existsSync(join(ROOT, SCRIPT))) {
  const text = read(SCRIPT);
  text.split('\n').forEach((line, index) => {
    const offending = line.match(/[^\x00-\x7F]/g);
    if (offending) fail(`${SCRIPT}:${index + 1} contains non-ASCII (${[...new Set(offending)].join(' ')}) — the console output must stay ASCII`);
  });
}

// --- the redirects -----------------------------------------------------------

const hosting = JSON.parse(read('firebase.json')).hosting;
const redirects = new Map(
  (hosting.redirects || [])
    .filter((entry) => entry.source.startsWith('/s5/'))
    .map((entry) => [entry.source, entry.destination]),
);

if (redirects.size === 0) fail('firebase.json has no /s5/ redirects — the short URLs in the setup docs all 404');

for (const [source, destination] of redirects) {
  const target = destination.replace(/^\//, '');
  if (!existsSync(join(ROOT, target))) {
    fail(`firebase.json redirects ${source} to ${destination}, which does not exist`);
  }
}

// Firebase would serve a .ps1 as application/octet-stream, and `irm | iex` then
// receives bytes instead of a string and fails. The header also lets a learner
// click the link and read the script before running it.
const psHeader = (hosting.headers || [])
  .find((entry) => entry.source.endsWith('.ps1'))
  ?.headers.find((header) => header.key === 'Content-Type');
if (!psHeader || !/text\/plain/.test(psHeader.value)) {
  fail('firebase.json does not serve .ps1 as text/plain — `irm ... | iex` will fail and the script will download instead of opening');
}

// --- every short URL the course hands out ------------------------------------

const urlPattern = new RegExp(`${SITE.replace(/[.]/g, '\\.')}(/s5/[a-z0-9-]+)`, 'g');
let urlsChecked = 0;

for (const doc of [...SETUP_DOCS, ...WRAPPERS, 'personal-course/instructor/sessions/session-05-guide.md']) {
  if (!existsSync(join(ROOT, doc))) continue;
  const text = read(doc);
  for (const match of text.matchAll(urlPattern)) {
    urlsChecked += 1;
    if (!redirects.has(match[1])) fail(`${doc} points learners at ${SITE}${match[1]}, which firebase.json does not redirect`);
  }
}

// The Hebrew guide names the short URLs without the host, as bare paths.
for (const doc of ['personal-course/he/instructor/sessions/session-05-guide.md']) {
  const text = read(doc);
  for (const match of text.matchAll(/`\/?(s5\/[a-z0-9-]+)`/g)) {
    urlsChecked += 1;
    if (!redirects.has(`/${match[1]}`)) fail(`${doc} names /${match[1]}, which firebase.json does not redirect`);
  }
}

// --- both languages offer the same doors -------------------------------------

for (const doc of SETUP_DOCS) {
  for (const path of ['/s5/windows', '/s5/windows-check']) {
    if (!read(doc).includes(`${SITE}${path}`)) {
      fail(`${doc} never offers ${path} — the two language versions must hand out the same files`);
    }
  }
}

// --- report ------------------------------------------------------------------

if (failures.length > 0) {
  console.error(`Session 5 installer check FAILED — ${failures.length} problem(s):\n`);
  for (const failure of failures) console.error(`  ${failure}`);
  console.error('');
  process.exit(1);
}

console.log(
  `Session 5 installer check passed — ${redirects.size} redirect(s), ${urlsChecked} URL reference(s), ` +
  `${WRAPPERS.length} wrapper(s) CRLF, script ASCII-clean.`,
);
