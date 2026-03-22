# Portfolio Kayro Gomes — Agent Instructions

## Stack

React 18.3 + TypeScript + Vite 6.3 + Tailwind CSS v4 (@tailwindcss/vite, no config file) + React Router 7.13

## Commands

- `npm run validate` — lint + type-check (run before committing)
- `npm run lint` / `npm run lint:fix` — ESLint on `src/`
- `npm run type-check` — `tsc --noEmit`
- `npm run test` / `npm run test:watch` / `npm run test:coverage` — Vitest
- `npm run dev` / `npm run build` / `npm run preview`
- `npm run format` — Prettier (single quotes, 100 chars, trailing comma es5, 2 spaces)

## Verification order

Run `lint → type-check → test` (same as `npm run validate && npm run test`). CI does all four: lint, type-check, build, test.

## Architecture

- **Entrypoint**: `src/main.tsx` → `src/app/App.tsx` (defines routes) → `src/app/routes.tsx`
- **Pages**: `src/app/components/*Page.tsx` (HomePage, ProjectsPage, AboutPage, ContactPage, CaseStudyPage, NotFoundPage)
- **Layout**: `src/app/components/Layout.tsx` (Header + Outlet + Footer)
- **Data source of truth**: `src/app/data/site.ts` (institutional copy), `src/app/data/projects.ts` (project list)
- **Case studies**: `src/app/data/*Content.tsx` (monetixContent, unimedpayContent) — registered in `projects.ts`
- **Hooks**: `src/app/hooks/`
- **Styles**: `src/styles/` (index.css, fonts.css, tailwind.css, theme.css)
- **Path alias**: `@` → `src/` (configured in vitest.config.ts; not in tsconfig — use relative imports for app code)

## Case study editorial flow

1. Markdown + image map in `cases/`
2. Convert to JSX → `src/app/data/*Content.tsx`
3. Register slug in `src/app/data/projects.ts`
4. Route resolves at `/project/:slug`

## Constraints

- **No inline styles** — use Tailwind classes (only exception: `ScrollZoomImage` dynamic transforms)
- **No `cn()` or shadcn/ui** — previously removed, do not reintroduce
- **No modifying `theme.css` variables** without understanding the design system
- **No hardcoding content** — use `site.ts` or `projects.ts`
- **All user-facing text in PT-BR**, code in EN
- **Mermaid**: lazy-loaded, only flowchart + journey types
- **Contact form**: native POST (no AJAX — FormSubmit autoresponse requires it), Zod validation, honeypot anti-spam, redirects to `/contact?sent=1`

## Conventions

- **Import sorting**: enforced by `eslint-plugin-simple-import-sort` (error level)
- **Commit messages**: Conventional Commits enforced by commitlint; subject max length 100 chars
- **Pre-commit hooks** (lefthook): prettier write → eslint fix on staged files; commitlint on commit-msg
- **Test colocated**: `*.test.ts(x)` next to source file; globals enabled; jsdom environment; setup at `src/test/setup.ts`
- **Coverage**: v8 provider, excludes `src/app/data/**`, `src/vite-env.d.ts`, `src/app/components/ui/**`

## Env vars

Copy `.env.example` → `.env.local`. Required for contact form:

- `VITE_FORMSUBMIT_ACTION`
- `VITE_SITE_URL`

## Releases

`npm run release` / `release:minor` / `release:major` — uses standard-version + conventional commits. Pushing a `v*` tag triggers GitHub Release via CI.
