# Project Guidelines — Copilot Quick Reference

**Stack**: React 18 + TypeScript | Vite 6 | Tailwind CSS v4 | React Router 7

**Documentation**:

- [Copilot Operations](./.github/copilot/instructions.md) — PR review, code review, security, CLI
- [Extended Workflows](./.instructions.md) — Multi-step workflows and decision patterns
- [Project Status](../docs/PROJECT_STATUS.md) — Technical baseline
- [Contributing](./.github/CONTRIBUTING.md) — Team workflow

## Code Style & Conventions

- TypeScript + strict typing | clear, semantic names
- **PT-BR content; EN code**
- Copy centralized in `src/app/data/site.ts`
- **Tailwind CSS only** (no inline styles, no `cn()` utility)
- Conventional Commits (enforce via commitlint)

## Architecture

- React SPA (Vite + React Router)
- Routes: `src/app/routes.ts`
- Case studies: Markdown → JSX (lazy-loaded)
- UI: Radix primitives + Tailwind classes

## Key Directories

- `src/app/` — Components, routes, hooks, data
- `src/styles/` — Global CSS, Tailwind config
- `cases/` — Editorial markdown + image maps
- `docs/` — Documentation (status, attributions, examples)
- `scripts/` — Utilities (linting, testing helpers)
- `.github/` — Templates, workflows, Copilot config

## Validation (Before Every Commit)

```bash
npm run lint          # Check code quality
npm run type-check    # TypeScript strict mode
npm run test -- --run # Vitest (31 tests)
npm run build         # Vite production bundle
```

## Guardrails

❌ Never: Reintroduce shadcn/ui, add inline styles, hardcode copy, modify design tokens without review  
✅ Always: Use Tailwind utilities, centralize copy, test before committing, link to canonical docs
