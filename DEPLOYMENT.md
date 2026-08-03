# Firebase Hosting Deployment Guide

Applied AI Mastery is deployed only through Firebase Hosting. It is a static site with no package installation, build step, server, database, or environment variables.

## Production target

- Firebase project and Hosting site: `applied-ai-mastery`
- Primary URL: `https://applied-ai-mastery.web.app`
- Alternate Firebase URL: `https://applied-ai-mastery.firebaseapp.com`
- Deployable branch: `main`

The committed `.firebaserc` maps the default project to `applied-ai-mastery`. Production commands below also pass `--project applied-ai-mastery` explicitly so a developer's previously active Firebase project cannot receive this site accidentally.

## 1. Prerequisites

Install Node.js 18 or later and confirm that your Google account has access to the `applied-ai-mastery` Firebase project.

```bash
node --version
npm install -g firebase-tools
firebase --version
```

You can replace `firebase` with `npx firebase-tools` in every command if you do not want a global installation. See the official [Firebase CLI reference](https://firebase.google.com/docs/cli) for supported installation methods.

## 2. Authenticate and verify project access

```bash
firebase login
firebase login:list
firebase projects:list
firebase use
```

The project list must contain `applied-ai-mastery`, and `firebase use` must show it as the default project. Stop if either check points elsewhere. On a remote machine where the CLI cannot open a localhost callback, use `firebase login --no-localhost`.

## 3. Review the Hosting configuration

`firebase.json` publishes the repository root (`.`). Its ignore list excludes Firebase configuration, dotfiles, and `node_modules`. Review that list before adding private, generated, or backend files.

This repository has no build step. Do not introduce an output directory or framework build command for deployment.

The Hosting configuration also applies `X-Content-Type-Options` and `Referrer-Policy` response headers. Any change to `firebase.json` is a production configuration change and must be reviewed with the site content.

## 4. Test locally

From the repository root:

```bash
firebase emulators:start --only hosting --project applied-ai-mastery
```

Open the local URL printed by the emulator. Test the course selector, both tracks, both languages, Markdown documents, downloadable artifacts, and browser-local progress. Stop the emulator with `Ctrl+C` after testing.

## 5. Optional review channel

For a shareable temporary review URL:

```bash
firebase hosting:channel:deploy review-YYYYMMDD --project applied-ai-mastery
```

Use a short, lowercase channel identifier. Share the returned preview URL, verify it, and do not treat a preview channel as production. Delete an obsolete review channel with:

```bash
firebase hosting:channel:delete review-YYYYMMDD --project applied-ai-mastery
```

Firebase documents preview-channel behavior in [local testing, previewing, and deployment](https://firebase.google.com/docs/hosting/test-preview-deploy).

## 6. Prepare the production branch

```bash
git checkout main
git pull --ff-only origin main
git status --short
```

`git status --short` must print nothing. Deploy only reviewed commits already merged into `main`. Record the commit before deployment:

```bash
git log -1 --oneline
```

## 7. Deploy Hosting

```bash
firebase deploy --only hosting --project applied-ai-mastery
```

Keep `--only hosting`. Future Functions, database rules, or other backend resources must be reviewed and deployed explicitly; do not widen this command unintentionally.

A successful deployment prints the Hosting URL. Open that exact URL rather than assuming the release completed because the upload began.

## 8. Verify production

- Open the home page on desktop and mobile.
- Enter the professional and personal tracks in English and Hebrew.
- Switch Student and Instructor modes.
- Open translated Markdown and canonical English artifacts.
- Confirm personal shared documents return to the personal course.
- In both courses, switch between English and Hebrew and open each language's learning-journal link.
- Confirm all four Google Docs templates are view-only and instruct students to choose **File → Make a copy** before writing.
- Mark progress, refresh, and confirm it persists.
- Check capstone, company, CSV, and OpenSCAD links.
- Check the browser console for missing files or JavaScript errors.

Verify both Firebase-provided URLs. If a custom domain is added later, verify it separately after the Firebase URLs pass.

## 9. Roll back

If the live release is defective:

1. Open the Firebase Console for `applied-ai-mastery`.
2. Open **Hosting**.
3. Locate **Release history**.
4. Open the menu for the last known good release.
5. Choose **Roll back** and confirm.
6. Verify both Firebase URLs and the affected workflow again.

Firebase rollback creates a new release that serves a previous known version. See [Manage Hosting releases and versions](https://firebase.google.com/docs/hosting/manage-hosting-resources#rollback).

## Instructor-content warning

Student mode hides instructor files in the interface only; it is not access control. Answer keys remain publicly accessible in the deployed files. Use a separate student-only repository or deployment before requiring answer-key confidentiality.
