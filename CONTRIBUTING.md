# Contributing to KingCola-ICG Official Website

Thanks for helping improve the project.

## 1. Before You Start

- Make sure your branch is based on the latest `main`
- Keep each PR focused on one topic only
- Avoid mixing content updates, UI refactors, and deployment changes in a single PR
- If the change affects visible pages, include screenshots

## 2. Recommended Workflow

1. Fork the repository or create a feature branch from `main`
2. Create a branch with a clear name
3. Make the smallest complete change needed
4. Run local verification
5. Open a PR with clear context

Recommended branch naming:

- `feat/<short-description>`
- `fix/<short-description>`
- `docs/<short-description>`
- `refactor/<short-description>`

Examples:

- `feat/project-card-animation`
- `fix/route-loading-overlay`
- `docs/readme-bilingual-update`

## 3. Local Verification

Before opening a PR, please run:

```bash
npm install
npm run dev
npm run build
```

If your change affects:

- content: verify the related page renders correctly
- routes: verify direct refresh and route switching
- UI: verify desktop and mobile layout when possible
- assets or deployment config: verify paths and output files carefully

## 4. Coding Expectations

- Follow the existing project structure and naming style
- Prefer focused changes over large unrelated rewrites
- Do not commit secrets, private keys, passwords, or sensitive `.env` values
- Keep static content edits accurate and consistent across related files
- Preserve existing visual style unless the PR is intentionally a design update

## 5. Pull Request Checklist

Please include these items in your PR description:

- Summary of what changed
- Why the change is needed
- Affected pages or modules
- Verification steps you ran
- Screenshots or recordings for UI changes
- Any remaining risks, follow-ups, or known limitations

Suggested PR template:

```md
## Summary
- 

## Why
- 

## Affected Areas
- 

## Verification
- [ ] npm run dev
- [ ] npm run build
- [ ] Manual page check

## Screenshots
- 

## Notes
- 
```

## 6. Review Guidance

PRs are easier to review when they:

- stay small and focused
- use clear commit messages
- avoid unrelated formatting noise
- explain non-obvious tradeoffs

If a change is large, split it into multiple PRs whenever possible.

## 7. Content and Documentation Changes

For README, docs, or project-content updates:

- keep English and Chinese documentation aligned when both are affected
- verify image paths and Markdown links
- keep project descriptions concise, accurate, and production-ready

## 8. Deployment Notes

This repository currently uses GitHub Pages workflow automation.

If your PR changes deployment-related files:

- explain the deployment impact clearly
- mention any required repository settings changes
- avoid introducing host-specific secrets into the repo
