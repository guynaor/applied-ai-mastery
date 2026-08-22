#!/usr/bin/env node
// Renders the personal course portal's session cards headlessly and asserts what
// a learner actually sees.
//
// Why this exists: the capstone once shipped with a hardcoded "90 minutes"
// badge it never had, and every check passed — because every check reads
// strings and none of them assembled a card. `personal.html` was separately
// out of sync with the JS for the same reason.
//
// Durations now come from each entry's `minutes` field, so the guard compares
// what a card claims against what its entry declares.
//
// It runs the real `personal-course.js`, not a copy of its logic — a guard that
// re-implements what it guards proves nothing.

import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const PORTAL_JS = resolve(ROOT, 'site/assets/js/personal-course.js');
const PORTAL_HTML = resolve(ROOT, 'personal.html');

const source = readFileSync(PORTAL_JS, 'utf8');

// --- Minimal DOM, enough for the script to run and hand back its markup -----

function renderPortal(language) {
  const store = { 'aam-personal-language': language };
  let gridHtml = '';

  const stubEl = () => new Proxy({}, {
    get: (t, k) => {
      if (k === 'classList') return { toggle() {}, add() {}, remove() {} };
      if (k === 'dataset') return {};
      if (k === 'setAttribute' || k === 'addEventListener') return () => {};
      return k in t ? t[k] : undefined;
    },
    set: (t, k, v) => { t[k] = v; return true; },
  });

  const grid = {
    set innerHTML(v) { gridHtml = v; },
    get innerHTML() { return gridHtml; },
  };

  const document = {
    querySelector: sel => (sel === '[data-personal-lesson-grid]' ? grid : stubEl()),
    querySelectorAll: () => [],
    documentElement: stubEl(),
    body: { classList: { toggle() {} } },
  };

  const localStorage = {
    getItem: k => (k in store ? store[k] : null),
    setItem: (k, v) => { store[k] = String(v); },
  };

  const window = { addEventListener() {} };

  // The script ends by calling setLanguage(state.language), which renders.
  new Function('document', 'localStorage', 'window', source)(document, localStorage, window);
  assert.ok(gridHtml, `portal produced no card markup for language "${language}"`);
  return gridHtml;
}

// The card template puts each session's number in .mission-number; split there.
const splitCards = html => html.split('<article class="mission">').slice(1);

// --- What a learner must see ------------------------------------------------

const MINUTES_WORD = { en: 'minutes', he: 'דקות' };
const DEFAULT_MINUTES = 90;

const sessions = new Function(`${source.match(/const sessions=\[[\s\S]*?\n\];/)[0]}\nreturn sessions;`)();

// Sessions run for different lengths — session 7 is 60 minutes where the rest
// are 90 — so the badge must match the entry, not a constant. A hardcoded
// duration is how the capstone once shipped claiming 90 minutes it never had.
for (const language of ['en', 'he']) {
  const cards = splitCards(renderPortal(language));
  assert.equal(cards.length, sessions.length,
    `${language}: rendered ${cards.length} cards for ${sessions.length} sessions`);

  cards.forEach((card, i) => {
    const session = sessions[i];
    const minutes = session.minutes || DEFAULT_MINUTES;
    const expected = new RegExp(`${minutes}\\s*${MINUTES_WORD[language]}`);

    assert.match(card, expected,
      `${language}: session ${session.n} should show ${minutes} ${MINUTES_WORD[language]}. If its length changed, set \`minutes\` on its entry rather than editing the template.`);

    // And it must not also claim some other duration.
    const durations = [...card.matchAll(new RegExp(`(\\d+)\\s*${MINUTES_WORD[language]}`, 'g'))].map(m => Number(m[1]));
    const wrong = durations.filter(d => d !== minutes);
    assert.equal(wrong.length, 0,
      `${language}: session ${session.n} shows ${minutes} but also ${wrong.join(', ')} ${MINUTES_WORD[language]}`);

    const brief = language === 'he' ? session.briefHe : session.briefEn;
    assert.ok(card.includes(encodeURIComponent(brief)) || card.includes(brief),
      `${language}: card ${session.n} does not link its own brief (${brief})`);
  });
}

// --- The card's skills must match the syllabus's ----------------------------
//
// The portal has no build step, so the skills text is duplicated rather than
// shared. Duplication is fine as long as it cannot drift, which is what this
// asserts: every card's skills line must equal its syllabus entry, in both
// languages. Bold markers are stripped — the syllabus emphasises a phrase, the
// card does not.

const stripBold = t => t.replace(/\*\*/g, '').replace(/\s+/g, ' ').trim().replace(/\.$/, '');

const enSyllabus = readFileSync(resolve(ROOT, 'personal-course/README.md'), 'utf8');
const heSyllabus = readFileSync(resolve(ROOT, 'personal-course/he/README.md'), 'utf8');

const enSkills = [...enSyllabus.matchAll(/^\| [1-7] \|[^|]*\|([^|]*)\|/gm)].map(m => stripBold(m[1]));
const heSkills = [...heSyllabus.matchAll(/\*\*מיומנויות:\*\*([^\n]*)/g)].map(m => stripBold(m[1]));

assert.equal(enSkills.length, sessions.length,
  `English syllabus lists skills for ${enSkills.length} sessions, portal has ${sessions.length}`);
assert.equal(heSkills.length, sessions.length,
  `Hebrew syllabus lists skills for ${heSkills.length} sessions, portal has ${sessions.length}`);

sessions.forEach((session, i) => {
  for (const [locale, fromSyllabus, fromCard] of [
    ['English', enSkills[i], session.en[2]],
    ['Hebrew', heSkills[i], session.he[2]],
  ]) {
    assert.ok(fromCard, `${locale}: session ${session.n} has no skills on its portal entry`);
    assert.equal(stripBold(fromCard), fromSyllabus,
      `${locale}: session ${session.n}'s skills differ between the portal and the syllabus.\n  portal:   ${stripBold(fromCard)}\n  syllabus: ${fromSyllabus}`);
  }
});

// --- personal.html must not contradict the JS it hydrates from --------------
//
// The static markup is what shows before hydration and what a crawler indexes.
// It drifted once already, still advertising seven sessions after the JS said six.

const html = readFileSync(PORTAL_HTML, 'utf8');
const ui = new Function(`${source.match(/const ui=\{[\s\S]*?\n\};/)[0]}\nreturn ui;`)();
const decode = s => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
                     .replace(/&quot;/g, '"').replace(/&#39;/g, "'").trim();

let compared = 0;
const drift = [];
for (const m of html.matchAll(/data-i18n="([a-zA-Z]+)"[^>]*>([^<]*)</g)) {
  const [, key, raw] = m;
  const expected = ui.en[key];
  if (expected === undefined) continue; // keys the JS does not define are not ours to police
  compared += 1;
  if (decode(raw) !== expected) drift.push({ key, html: decode(raw), js: expected });
}
if (drift.length > 0) {
  // Report every mismatch at once: during a copy change one run should show the
  // whole blast radius rather than being peeled one string at a time.
  console.error(`personal.html is out of sync with the JS — ${drift.length} string(s):\n`);
  for (const d of drift) {
    console.error(`  ${d.key}`);
    console.error(`    html: ${d.html}`);
    console.error(`    js:   ${d.js}\n`);
  }
  process.exit(1);
}
assert.ok(compared > 5, `only ${compared} data-i18n strings compared — the matcher has probably stopped working`);

console.log(`Portal rendering check passed — ${sessions.length} cards in 2 languages, ${compared} static strings match the JS.`);
