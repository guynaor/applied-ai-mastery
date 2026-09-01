// Building Hebrew content assertions by hand keeps producing checks that can never pass.
//
// check-personal-agent-lab.mjs asserted /מתג עצירה/ and failed from the day it was written,
// because Hebrew attaches the definite article to the *second* noun of a construct chain:
// the guide's correct "מתג העצירה" simply does not contain the string "מתג עצירה". The
// English half of the same pair, /kill switch/, needed no allowance at all, because
// "kill switch" is a substring of "the kill switch". Mirroring the two languages regex for
// regex looks symmetrical and is not.
//
// The same trap is waiting in every multi-word Hebrew phrase we assert. Adjectives agree in
// definiteness ("מעבדה מקומית" becomes "המעבדה המקומית"), and a conjunctive vav takes the
// article after it ("כלים ומחברים" becomes "הכלים והמחברים"). So build these patterns from a
// phrase instead of writing them out.
//
// Use this for *concepts* the content must cover. Do not use it for canonical titles and
// headings, which should stay exact so that a retitle fails the check rather than sliding
// through.

// Hebrew punctuation has ASCII lookalikes that authors and editors mix freely, and a regex
// written with one spelling silently stops matching the other.
const VARIANTS = [
  ['׳\'', "[׳']"],           // geresh, as in צ׳אט
  ['״"', '[״"]'],            // gershayim, as in ש״ח
  ['־-–', '[־\\-–]'],        // maqaf, ASCII hyphen, en dash
];

const escapeLiteral = character => character.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const characterPattern = character => {
  const variant = VARIANTS.find(([members]) => members.includes(character));
  return variant ? variant[1] : escapeLiteral(character);
};

const literal = word => [...word].map(characterPattern).join('');

// The definite article is written ה, and before a Latin-script word it is usually joined with
// a maqaf or hyphen — "ה-AI". Both spellings have to be optional.
const ARTICLE = '(?:ה[־\\-–]?)?';

const wordPattern = (word, index) => {
  // The first word needs no allowance: a prefix is prepended, so "מעבדה" is still found
  // inside "המעבדה". Only later words can have an article inserted in front of them.
  if (index === 0) return literal(word);
  // A conjunctive vav stays outermost and the article slots in behind it, so "ומחברים"
  // becomes "והמחברים".
  if (word.startsWith('ו')) return `ו?${ARTICLE}${literal(word.slice(1))}`;
  return `${ARTICLE}${literal(word)}`;
};

/**
 * Build a regex matching a Hebrew phrase in both its indefinite and definite forms.
 *
 *   hebrewPhrase('מתג עצירה')    matches "מתג עצירה" and "מתג העצירה"
 *   hebrewPhrase('מעבדה מקומית') matches "מעבדה מקומית" and "המעבדה המקומית"
 *   hebrewPhrase('כלים ומחברים') matches "כלים ומחברים" and "הכלים והמחברים"
 *
 * Words still have to be present and in order, so the pattern keeps failing when the concept
 * is genuinely missing.
 */
export const hebrewPhrase = phrase => new RegExp(
  phrase.trim().split(/\s+/).map(wordPattern).join('\\s+')
);

/** The same, for a concept the content may express in any one of several wordings. */
export const hebrewAny = (...phrases) => new RegExp(
  phrases.map(phrase => hebrewPhrase(phrase).source).join('|')
);
