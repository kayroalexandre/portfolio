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

## Copilot PR Review Checklist

- Ensure PR description includes scope, risks, and validation steps
- Ask Copilot to summarize changed files and behavioral impact
- Confirm no regressions in routing, forms, or case-study rendering
- Confirm tests cover new behavior or edge cases
- Confirm docs were updated when behavior changed

## Code Review Standards

- Prioritize security, correctness, and maintainability over style-only feedback
- Flag hardcoded secrets, unsafe input handling, and missing error handling
- Validate accessibility for interactive components and forms
- Verify performance-sensitive paths (lazy loading and heavy render trees)

## Copilot on CLI

- Install extension: `gh extension install github/gh-copilot`
- Suggest commit message: `gh copilot suggest --type commit`
- Use explain/suggest for shell guidance when needed

## Official References

- <https://docs.github.com/pt/copilot>
- <https://docs.github.com/pt/copilot/how-tos/copilot-on-github>
- <https://docs.github.com/pt/copilot/how-tos/copilot-cli>
- <https://docs.github.com/pt/copilot/concepts/agents/code-review>
- <https://docs.github.com/pt/copilot/get-started/best-practices>

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
