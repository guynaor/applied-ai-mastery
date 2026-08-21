#!/usr/bin/env node
// Renders the personal course portal's session cards headlessly and asserts what
// a learner actually sees.
//
// Why this exists: the capstone was shipped with a "90 minutes" badge, an
// "Open session brief" link and a "Session complete" checkbox, weeks after it
// stopped being a session. Every other check passed, because every other check
// reads strings. None of them assembled a card. `personal.html` was separately
// out of sync with the JS for the same reason.
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

const MINUTES = { en: /90\s*minutes/i, he: /90\s*דקות/ };
// Nouns that would tell a learner this is a taught class.
const SESSION_NOUNS = {
  en: [/\bSession complete\b/i, /\bOpen session brief\b/i, /Integrated session path/i, /session facilitator guide/i],
  he: [/המפגש הושלם/, /פתיחת מדריך המפגש/, /מסלול המפגש המשולב/],
};

const sessions = new Function(`${source.match(/const sessions=\[[\s\S]*?\n\];/)[0]}\nreturn sessions;`)();
const capstoneIndex = sessions.findIndex(s => s.capstone);
assert.notEqual(capstoneIndex, -1,
  'No session entry is flagged `capstone:true`. If the capstone was removed, delete this check; otherwise the flag is missing and the card will render as a session.');

for (const language of ['en', 'he']) {
  const cards = splitCards(renderPortal(language));
  assert.equal(cards.length, sessions.length,
    `${language}: rendered ${cards.length} cards for ${sessions.length} sessions`);

  cards.forEach((card, i) => {
    const isCapstone = i === capstoneIndex;
    const n = sessions[i].n;

    if (isCapstone) {
      assert.doesNotMatch(card, MINUTES[language],
        `${language}: the capstone card claims a duration. It is a home project, not a timetabled session.`);
      for (const noun of SESSION_NOUNS[language]) {
        assert.doesNotMatch(card, noun,
          `${language}: the capstone card calls itself a session (${noun}). It stopped being one.`);
      }
    } else {
      assert.match(card, MINUTES[language],
        `${language}: session ${n} lost its duration badge`);
    }

    const brief = language === 'he' ? sessions[i].briefHe : sessions[i].briefEn;
    assert.ok(card.includes(encodeURIComponent(brief)) || card.includes(brief),
      `${language}: card ${n} does not link its own brief (${brief})`);
  });
}

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
