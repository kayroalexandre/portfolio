# GitHub Copilot Instructions — Portfolio Kayro Gomes

## Stack

React 18 + TypeScript + Vite 6 + Tailwind CSS v4 + React Router 7

## Key Conventions

- All content in PT-BR, code in EN
- Centralize copy in `src/app/data/site.ts` and `src/app/data/projects.ts`
- Use Tailwind utility classes instead of inline styles
- No `cn()` utility or shadcn/ui components — they were removed
- Mermaid is lazy-loaded; use only flowchart + journey diagram types
- Contact form uses FormSubmit POST with Zod + react-hook-form + honeypot

## File Organization

- Pages: `src/app/components/*Page.tsx`
- Data: `src/app/data/`
- Case studies: `src/app/data/*Content.tsx`
- Hooks: `src/app/hooks/`
- Styles: `src/styles/`

## Commit Messages

Follow Conventional Commits: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `perf:`, `test:`, `build:`, `ci:`, `chore:`, `revert:`

## Testing

- Vitest + React Testing Library
- Test file naming: `*.test.ts(x)` colocated with source
- Run `npm run test` before suggesting a commit

## Do Not

- Do not reintroduce shadcn/ui components or the `cn()` utility
- Do not add inline styles — use Tailwind classes
- Do not add new dependencies without checking existing ones first
- Do not modify `theme.css` variables without understanding the design system
- Do not hardcode content — use `site.ts` or `projects.ts`
