# שיעור 10 — לתכנן משהו לחדר בעזרת CAD

**מיומנות שנפתחת:** Parametric Designer

## מושגים

- **Interface measurement** — מידה של חיבור לעולם האמיתי, כמו רוחב מדף או קוטר בורג.
- **Parameter** — ערך שניתן לשנות בלי לצייר מחדש.
- **Assumed dimension** — מידה שהונחה ולא נמדדה.
- **Validation configuration** — סט פרמטרים שבודקים כדי לוודא שהמודל נשאר תקין.

## פעילות תלמיד

בחרו פריט קטן ולא בטיחותי: מארגן שולחן, מחזיק טלפון, מפריד מגירה או מדף פשוט.

```text
Help me define a parametric CAD design contract.
Need: [need]
Measured interfaces: [measurements]
Assumptions: [assumptions]
Parameters: [names, units, defaults, safe ranges]
Generate or revise an OpenSCAD concept and provide four validation configurations.
Do not claim physical strength, fit, or safety without real testing.
```

1. צלמו או תארו את המקום ללא מידע פרטי.
2. סמנו כל מידה כ-`measured`, `specified`, `assumed` או `derived`.
3. הגדירו פרמטרים ושמות ברורים באנגלית.
4. הריצו default, changed set A, changed set B ו-extreme-but-plausible.
5. תעדו מה נראה תקין ומה עדיין דורש הדפסה או בדיקה פיזית.

## משימת חיים אמיתית

**Bronze:** חוזה תכנון ומודל שנפתח ונבנה.

**Silver:** ארבע תצורות עם יומן בדיקות ותיקון אחד.

**Gold:** הדפסת אב־טיפוס או בניית דגם מקרטון, מדידה מחדש ושיפור.

## למורה — תסריט

- **0–5 דקות:** הסבירו את ההבדל בין render תקין לבין מוצר מתאים ובטוח.
- **5–10 דקות:** הדגימו מידה נמדדת מול הנחה.
- **10–20 דקות:** יצירת design contract ופרמטרים.
- **20–27 דקות:** ארבע תצורות בדיקה.
- **27–30 דקות:** כל תלמיד מציין גבול אחד שהמודל אינו מוכיח.

### בדיקת הבנה

התלמיד מסוגל לשנות פרמטר, להסביר יחידות וטווחים, ולהבחין בין בדיקת תוכנה לאימות פיזי.