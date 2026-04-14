# Project Guidelines

## Code Style

- Use TypeScript with strict typing and clear names.
- Keep UI behavior in components and copy/content in data files.
- Prefer Tailwind utility classes over inline styles.
- Follow Conventional Commits in every change.

See details in:

- .github/copilot/instructions.md
- .instructions.md

## Architecture

- React + Vite single-page app.
- Route definitions live in src/app/routes.ts.
- Case study content is organized in cases/ and rendered by components in src/app/components/ and data modules in src/app/data/.
- Reusable UI primitives are in src/app/components/ui/.

## Build and Test

Run before proposing commits or PRs:

- npm run lint
- npm run type-check
- npm run test -- --run
- npm run build

## Conventions

- Keep root focused on runtime/config essentials.
- Put project documentation in docs/.
- Put ad-hoc maintenance utilities in scripts/.
- Do not remove or change behavior without validation.

Reference docs (link, do not duplicate):

- README.md
- docs/PROJECT_STATUS.md
- docs/ATTRIBUTIONS.md
- docs/EXAMPLE_PROMPTS.md
- .github/CONTRIBUTING.md
