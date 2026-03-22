# Copilot Instructions — Portfolio Kayro Gomes

Instruções para agentes de IA trabalharem efetivamente neste workspace. Para contexto operacional e convenções detalhadas, consulte [guidelines/Guidelines.md](../../guidelines/Guidelines.md).

## Stack & Environment

**Runtime:** Node.js (pnpm preferred)  
**Framework:** React 18.3 + TypeScript + Vite 6.3 + React Router 7.13  
**Styling:** Tailwind CSS v4 (`@tailwindcss/vite` plugin, no config file)  
**Testing:** Vitest + React Testing Library  
**Quality:** ESLint 9 + Prettier + commitlint + lefthook (pre-commit hooks)

## Build & Verification

```bash
npm run validate         # lint + type-check (required before commit)
npm run lint            # ESLint on src/
npm run lint:fix        # ESLint with auto-fix
npm run type-check      # tsc --noEmit
npm run test            # Vitest (all tests)
npm run test:watch      # Watch mode
npm run test:coverage   # v8 coverage report
npm run format          # Prettier (single quotes, 100 chars, 2-space indent)
npm run dev             # Vite dev server (localhost:5173)
npm run build           # Production bundle
```

**Verification order:** `lint → type-check → test` (enforced by CI on every PR/push)

## Architecture

### Entrypoints & Routing

- **App shell:** `src/main.tsx` → `src/app/App.tsx` → `src/app/routes.tsx`
- **Layout wrapper:** `src/app/components/Layout.tsx` (Header + Outlet + Footer)
- **Pages:** `src/app/components/*Page.tsx` (HomePage, ProjectsPage, AboutPage, ContactPage, CaseStudyPage, NotFoundPage)

### Data & Content

- **Institutional copy:** `src/app/data/site.ts` (hero, positioning, contact, images)
- **Project registry:** `src/app/data/projects.ts` (metadata, case study references)
- **Case study content:** `src/app/data/*Content.tsx` (monetixContent, unimedpayContent; lazy-loaded)
- **Editorial sources:** `cases/*.md` + `cases/*-image-map.md` (Markdown source for case studies)

### Code Organization

- **Hooks:** `src/app/hooks/` (e.g., `useDocumentTitle.ts`)
- **Styles:** `src/styles/` (base globals, fonts, Tailwind imports, design tokens in `theme.css`)
- **Tests:** Colocated `*.test.ts(x)` files; test setup at `src/test/setup.ts`
- **Path alias:** `@` → `src/` (configured in vitest.config.ts; use relative imports in app code)

## Key Constraints & Conventions

### UI & Styling

- **No inline styles** — use Tailwind utility classes only (exception: `ScrollZoomImage` dynamic transforms)
- **No `cn()` or shadcn/ui** — these dependencies were intentionally removed
- **No custom Tailwind config** — v4 uses plugin-based zero-config setup
- **No modifying `theme.css`** — design tokens are frozen; coordinate changes with maintainer

### Content & Data

- **All user-facing text in PT-BR** — code language is EN
- **No hardcoding** — centralize content in `site.ts` or `projects.ts`
- **Single source of truth:** Institutional copy → `site.ts`; project metadata → `projects.ts`

### Case Studies Editorial Flow

1. Markdown source in `cases/<slug>.md` (+ image curation in `cases/<slug>-image-map.md`)
2. Convert to JSX → `src/app/data/<slug>Content.tsx` (use [cases/agent-layout-guidelines.md](../../cases/agent-layout-guidelines.md) for layout patterns)
3. Register slug in `src/app/data/projects.ts` (add `caseStudy` field)
4. If new slug, extend `ProjectCaseStudy` type
5. Add lazy import + entry in `caseStudyContentMap` (CaseStudyPage.tsx)
6. Run `npm run build` to verify

### Components & Mermaid

- **Mermaid diagrams:** flowchart + journey types only; lazy-loaded
- **Contact form:** native POST (no AJAX), Zod validation, honeypot, redirects to `/contact?sent=1`
- **Image fallback:** Use `<ImageWithFallback>` from `src/app/components/figma/ImageWithFallback.tsx`

### Imports & Code Quality

- **Import sorting enforced** — `eslint-plugin-simple-import-sort` (error level)
- **Commit messages:** Conventional Commits required (enforced by commitlint; subject ≤100 chars)
- **Pre-commit hooks:** Prettier write → ESLint fix → commitlint on commit-msg (via lefthook)

### Testing

- **Location:** Colocated `*.test.ts(x)` next to source
- **Environment:** jsdom; globals enabled; setup at `src/test/setup.ts`
- **Coverage:** v8 provider; excludes `src/app/data/**`, `src/vite-env.d.ts`, `src/app/components/ui/**`

## Environment Variables

Copy `.env.example` → `.env.local`:

- `VITE_FORMSUBMIT_ACTION` (FormSubmit endpoint for contact form)
- `VITE_SITE_URL` (canonical site URL)

## Releases & Versioning

Uses `standard-version` + Conventional Commits:

```bash
npm run release         # Patch (0.0.1 → 0.0.2)
npm run release:minor   # Minor (0.0.1 → 0.1.0)
npm run release:major   # Major (0.0.1 → 1.0.0)
```

Pushing a `v*` tag triggers GitHub Release via CI.

## References & Further Reading

| Topic                               | Link                                                                                                     |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------- |
| **Comprehensive guidelines**        | [guidelines/Guidelines.md](../../guidelines/Guidelines.md)                                               |
| **Case study layout patterns**      | [cases/agent-layout-guidelines.md](../../cases/agent-layout-guidelines.md)                               |
| **Case study reconstruction skill** | [codex-skills/product-design-case-study/SKILL.md](../../codex-skills/product-design-case-study/SKILL.md) |
| **Session memory**                  | [guidelines/ChatMemory-2026-03-20.md](../../guidelines/ChatMemory-2026-03-20.md)                         |
| **Project changelog**               | [CHANGELOG.md](../../CHANGELOG.md)                                                                       |
| **Main README**                     | [README.md](../../README.md)                                                                             |

## Troubleshooting & Common Pitfalls

- **Import errors after structure changes?** Run `npm run validate` to catch all issues at once.
- **Tailwind classes not applying?** Ensure you're in `src/app/` (path alias `@` not available there); use relative imports.
- **Test colocated file missing?** Tests go next to source with `*.test.ts(x)` suffix; jsdom environment is pre-configured.
- **Case study not rendering?** Check: slug in `projects.ts`, lazy import in `CaseStudyPage.tsx`, component export in `*Content.tsx`.
- **Pre-commit hook failed?** Run `npm run lint:fix && npm run format` to auto-correct most issues.

## Maintenance Rules

See [guidelines/Guidelines.md § 13. Regras de Manutenção](../../guidelines/Guidelines.md#13-regras-de-manutenção) for the full list. Key ones:

1. Do not reintroduce template copy, dummy projects, or generic stock images
2. Prefer real project images over placeholders
3. Keep React Router (no migration to `react-router-dom`)
4. Avoid new dependencies for problems already covered
5. Do not modify CI, versioning scheme, or precommit hooks without explicit approval

---

**Last updated:** Apr 13, 2026  
**Maintainer:** Kayro Gomes
