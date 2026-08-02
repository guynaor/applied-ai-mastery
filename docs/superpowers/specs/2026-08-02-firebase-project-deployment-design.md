# Firebase Project Deployment Design

## Goal

Deploy Applied AI Mastery as a static website in a new, independent Firebase
project. The preferred globally unique Firebase project ID is `applied-ai-mastery`.

The new project isolates future backend resources, including Cloud Functions,
Firestore, IAM, quotas, and billing, from existing GalLearn applications. This
deployment does not add or enable a backend.

## Current Application

Applied AI Mastery is a static website served directly from the repository
root. It has no package dependencies, build command, environment variables,
server runtime, or generated output directory.

The existing `firebase.json` already:

- publishes the repository root;
- excludes Firebase configuration, hidden files, and `node_modules`;
- adds `X-Content-Type-Options` and `Referrer-Policy` response headers.

The deployment intentionally includes the course materials stored in the
repository. Instructor mode is a user-interface convenience, not access
control, so instructor answer keys remain publicly accessible.

## Firebase Architecture

Create a Firebase project with:

- display name: `AI Mastery`;
- preferred project ID: `applied-ai-mastery`;
- default Hosting site: `applied-ai-mastery`;
- initial public URL: `https://applied-ai-mastery.web.app`.

Do not enable Functions, Firestore, Authentication, Analytics, or billing as
part of this deployment. Those services will be designed separately when the
backend is implemented.

If the exact project ID is unavailable, stop and report the conflict. Do not
choose an alternative project ID without user approval.

## Repository Configuration

Perform the work on the dedicated branch
`chore/firebase-ai-mastery-deployment`. Do not commit deployment changes
directly to `main`.

Add `.firebaserc` with a `default` project alias pointing to
`applied-ai-mastery`. Keep the existing no-build Hosting configuration in
`firebase.json` and deploy only the Hosting resource.

Add `.firebase/` to the root `.gitignore` so Firebase CLI deployment caches do
not dirty the working tree or enter version control.

The local project mapping prevents accidental deployment to the Firebase CLI's
currently selected project, which is unrelated to this application.

## Deployment Flow

1. Confirm work is on `chore/firebase-ai-mastery-deployment`.
2. Confirm the authenticated Firebase account.
3. Create the `applied-ai-mastery` Firebase project.
4. Add the repository-local Firebase project alias.
5. Validate the effective Firebase configuration.
6. Deploy with Hosting-only scope.
7. Verify the deployed website and response headers.

Project creation and deployment failures must leave existing Firebase projects
and Hosting sites unchanged. A failed exact-name creation is reported without
falling back to another name.

## Verification

Verification covers:

- Firebase CLI reports project creation and Hosting deployment success;
- the root URL returns HTTP 200;
- `index.html`, `personal.html`, and `professional.html` are reachable;
- representative CSS, JavaScript, Markdown, and CSV assets are reachable;
- deployed responses include the configured security headers;
- repository configuration targets `applied-ai-mastery`;
- no backend Firebase resources are configured by this change.

## Index Localization Follow-up

The deployed course selector must offer the same English and Hebrew language
choice as the personal course page. English remains the static HTML fallback.
A dedicated `site/assets/js/index-i18n.js` module owns the index translations,
document direction, accessible labels, metadata, persistence, and current-year
display.

The index language control uses the existing segmented English/Hebrew pattern
and the existing `aam-personal-language` local-storage preference. Reusing that
preference keeps the course selector and personal course synchronized without
changing the established personal-course behavior. Selecting Hebrew sets the
document language to `he`, direction to `rtl`, and the body RTL state; selecting
English restores `en` and `ltr`.

All index content must be localized, including:

- the document title and description;
- skip link and accessible navigation labels;
- hero, course catalogue, both course cards, shared philosophy, and skills;
- course version label and footer text.

The index header contains only the Courses link and language control alongside
the brand. Remove the About and GitHub links from the header, and remove the
GitHub repository link from the footer. No About or GitHub link may remain in
`index.html`.

Browser verification covers English and Hebrew text, LTR and RTL direction,
language persistence after reload, navigation-link removal, course links,
desktop layout, and a mobile viewport. The updated static files are deployed to
the existing `applied-ai-mastery` Hosting site and verified at the live URL.
