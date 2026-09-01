import assert from 'node:assert/strict';
import {hebrewPhrase, hebrewAny} from './lib/hebrew-matchers.mjs';

// The regression this whole helper exists for: the Hebrew session 2 guide writes the concept
// as "מתג העצירה", and the hand-written /מתג עצירה/ could never match it.
assert.match('הציגו את מתג העצירה בשלושה שלבים', hebrewPhrase('מתג עצירה'));
assert.match('כל סוכן צריך מתג עצירה', hebrewPhrase('מתג עצירה'));

// Adjectives agree in definiteness, so both words take the article together.
assert.match('מעבדה מקומית', hebrewPhrase('מעבדה מקומית'));
assert.match('המעבדה המקומית שהקמנו', hebrewPhrase('מעבדה מקומית'));
assert.match('ההרפתקה המתקדמת', hebrewPhrase('הרפתקה מתקדמת'));

// A conjunctive vav stays outermost and the article slots in behind it.
assert.match('כלים ומחברים', hebrewPhrase('כלים ומחברים'));
assert.match('הכלים והמחברים של היישום', hebrewPhrase('כלים ומחברים'));

// Three-word construct chains take the article on every word after the first.
assert.match('מודל שפה גדול', hebrewPhrase('מודל שפה גדול'));
assert.match('מודל השפה הגדול', hebrewPhrase('מודל שפה גדול'));

// A prefix on the first word needs no allowance, because it is prepended and the word is
// still found inside it.
assert.match('במעבדה מקומית', hebrewPhrase('מעבדה מקומית'));
assert.match('שהמעבדה המקומית', hebrewPhrase('מעבדה מקומית'));

// Before Latin script the article is usually joined with a maqaf or hyphen.
assert.match('יישום AI', hebrewPhrase('יישום AI'));
assert.match('יישום ה-AI', hebrewPhrase('יישום AI'));
assert.match('יישום ה־AI', hebrewPhrase('יישום AI'));

// Hebrew punctuation and its ASCII lookalikes are used interchangeably.
assert.match('מתפרסם בצ׳אט', hebrewPhrase('מתפרסם בצ׳אט'));
assert.match("מתפרסם בצ'אט", hebrewPhrase('מתפרסם בצ׳אט'));
assert.match('א׳–י״ב', hebrewPhrase('א׳–י״ב'));
assert.match('א\'-י"ב', hebrewPhrase('א׳–י״ב'));

// Line wrapping in markdown must not break a phrase across a newline.
assert.match('מתג\nהעצירה', hebrewPhrase('מתג עצירה'));

// The point of the exercise: the patterns must still fail when the concept is absent.
// A tolerant matcher that matches everything would be worse than the bug it replaces.
assert.doesNotMatch('הציגו את מתג ההפעלה', hebrewPhrase('מתג עצירה'));
assert.doesNotMatch('מעבדה מרוחקת', hebrewPhrase('מעבדה מקומית'));
assert.doesNotMatch('כלים בלבד', hebrewPhrase('כלים ומחברים'));
assert.doesNotMatch('מודל שפה', hebrewPhrase('מודל שפה גדול'));
assert.doesNotMatch('עצירה מתג', hebrewPhrase('מתג עצירה'), 'word order must still matter');
assert.doesNotMatch('מתג בדיקת עצירה', hebrewPhrase('מתג עצירה'), 'words must stay adjacent');

// Regex metacharacters in a phrase are matched literally, not interpreted.
assert.match('שאלה (לא חובה)', hebrewPhrase('שאלה (לא חובה)'));
assert.doesNotMatch('שאלה לא חובה', hebrewPhrase('שאלה (לא חובה)'));

// hebrewAny accepts any one of several wordings, and still rejects none of them.
const stopRule = hebrewAny('כלל עצירה', 'תנאי עצירה');
assert.match('כלל העצירה', stopRule);
assert.match('תנאי עצירה', stopRule);
assert.doesNotMatch('כלל ההתראה', stopRule);

console.log('Hebrew matcher contract passed');
