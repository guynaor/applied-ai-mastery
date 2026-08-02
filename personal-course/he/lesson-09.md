# שיעור 9 — לבנות אפליקציה קטנה ראשונה

**מיומנות שנפתחת:** Rapid Prototyper

## מושגים

- **Requirement** — מה האפליקציה חייבת לעשות.
- **Acceptance test** — בדיקה שמוכיחה שדרישה התקיימה.
- **Regression** — תקלה חדשה שנוצרה בעקבות שינוי.
- **Local storage** — מידע שנשמר רק בדפדפן ובמכשיר הנוכחי.

## פעילות תלמיד

בחרו צורך קטן: סקר, רשימת אריזה, חלוקת הוצאות, checklist או habit tracker. התחילו מהאפליקציה לדוגמה או מקובץ HTML יחיד.

```text
Help me modify this small app.
Current behavior: [describe]
One requested change: [one change only]
Constraints: keep it in one HTML file, preserve existing behavior, explain the changed code, and provide acceptance tests.
Do not claim that local browser storage synchronizes between users.
```

1. כתבו 3–5 דרישות.
2. בדקו את הגרסה הקיימת.
3. בקשו שינוי אחד בלבד.
4. הריצו בדיקות expected-versus-actual.
5. בדקו שהפיצ'רים הקודמים עדיין עובדים.
6. תעדו את מגבלות השיתוף והשמירה.

## משימת חיים אמיתית

**Bronze:** התאימו את האפליקציה לצורך אמיתי ובדקו שלושה תרחישים.

**Silver:** בקשו משני אנשים לבדוק, אספו שלוש הצעות ושפרו דבר אחד.

**Gold:** פרסמו גרסה סטטית והוסיפו README שמסביר יכולות ומגבלות.

## למורה — תסריט

- **0–5 דקות:** הפרידו בין רעיון לדרישה ניתנת לבדיקה.
- **5–10 דקות:** הדגימו acceptance test פשוט.
- **10–20 דקות:** שינוי מבוקר אחד בעזרת AI.
- **20–26 דקות:** בדיקות ורגרסיה.
- **26–30 דקות:** כל תלמיד מסביר מגבלה אחת בכנות.

### בדיקת הבנה

תוצר קטן שעובד ונבדק עדיף על אפליקציה גדולה שלא ניתן להסביר. אין לתאר localStorage כמערכת רב־משתמשים.