# Repository Workflow

## Branches

- Check the current Git branch before making substantive changes.
- When starting from `main`, create a scoped feature, fix, or chore branch before
  editing or committing.
- Do not commit substantive work directly to `main`.
- Preserve unrelated working-tree changes and commits.

## Approved Release Flow

- Once the requested work is complete, verified, and the user has approved it,
  follow the standard release flow without asking again: commit the scoped
  branch, push it, create a pull request, merge it into `main`, update this
  checkout with `git pull --ff-only origin main`, re-run the relevant release
  checks on `main`, then deploy Firebase Hosting with
  `npx firebase-tools deploy --only hosting --project applied-ai-mastery`.
- Do not deploy to another Firebase project or omit the explicit
  `--project applied-ai-mastery` safeguard.
