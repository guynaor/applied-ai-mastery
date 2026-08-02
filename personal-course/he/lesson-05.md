# שיעור 5 — ליצור התראות אישיות

**מיומנות שנפתחת:** Personal Monitor Designer

## מושגים

- **Trigger** — התנאי שמפעיל התראה.
- **Threshold** — ערך סף.
- **Duplicate suppression** — מניעת התראות חוזרות על אותו מצב.
- **Recovery** — חזרה ממצב חריג למצב רגיל.
- **Re-arming** — אפשרות להפעיל שוב התראה באירוע חדש.
- **Stop rule** — תנאי עצירה ברור.

## פעילות תלמיד

בחרו מחיר, מלאי, תאריך שחרור או זמינות ששווה לעקוב אחריהם.

```text
Design a monitoring specification for [item or condition].
Include exact target, acceptable variants, source, check frequency, trigger, duplicate suppression, recovery, re-arming, stale-data handling, notification channel, expiry date, pause/resume controls, and stop rule.
The system must never purchase automatically.
```

צרו תרחישי בדיקה: אין התראה, תנאי מתקיים, התראה כפולה נמנעת, התאוששות, אירוע חדש, כשל בדיקה והפסקה ידנית.

## משימת חיים אמיתית

**Bronze:** כתבו חוזה התראה מלא.

**Silver:** צרו יומן אירועים שמדגים את כל מחזור החיים.

**Gold:** בצעו בדיקות ידניות במשך שבוע או השתמשו בשירות התראות קיים ושפרו את ההגדרה.

## למורה — תסריט

- **0–4 דקות:** השוו בין ״תודיע לי כשזול״ לבין תנאי מדויק.
- **4–9 דקות:** הגדירו trigger, recovery ו-stop rule.
- **9–20 דקות:** כתיבת המפרט.
- **20–26 דקות:** הרצת תרחישים מדומים.
- **26–30 דקות:** כל תלמיד מסביר איך מנע ספאם ומתי המעקב ייפסק.

### בדיקת הבנה

המפרט חייב לכלול כשלי מקור, מידע ישן ושליטה אנושית. אין למסור סיסמאות או סמכות רכישה.