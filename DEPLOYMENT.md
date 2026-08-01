# Deployment Guide

Applied AI Mastery Beta is a static site. It uses only repository files and requires no package installation, build command, framework, server, database, or environment variables.

## Recommended: Vercel

1. Import `guynaor/applied-ai-mastery` into Vercel.
2. Select **Other** as the framework preset.
3. Leave Build Command blank.
4. Leave Output Directory blank or use `.` when required.
5. Deploy from `main` after the beta pull request is merged.

`vercel.json` supplies static hosting and basic security headers.

## Firebase Hosting

1. Install and authenticate the Firebase CLI.
2. Create or select a Firebase project.
3. From the repository root, run `firebase deploy --only hosting`.

`firebase.json` publishes the repository root. Review the ignore list before adding private or generated files.

## Netlify

Import the repository, leave the build command blank, and set the publish directory to `.`.

## GitHub Pages

Deploy from the repository root on `main`. All site links are relative, so the portal works from a project subpath.

## Important instructor-content note

Student mode hides instructor files in the interface only. It is not access control: answer keys remain publicly available in the repository and deployed files. For a private class, deploy a student-only branch or separate private instructor repository.

## Post-deployment verification

- Open the home page on desktop and mobile.
- Switch between Student and Instructor modes.
- Open at least one Markdown, CSV, and OpenSCAD file from every mission.
- Mark missions complete, refresh, and confirm progress persists.
- Verify the capstone links and AquaForge employee directory.
- Check the browser console for missing files or JavaScript errors.
