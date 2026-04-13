# Skill: dev-workflow

## Purpose

Automate the development workflow: task → commit → push → release pipeline.

## Capabilities

### Task → Commit Flow

1. Implement changes according to Guidelines.md and repo conventions
2. Run `npm run validate` (lint + type-check) before committing
3. Run `npm run test` to ensure all tests pass
4. Stage changes with `git add`
5. Commit with Conventional Commits format:
   - `feat:` new feature
   - `fix:` bug fix
   - `docs:` documentation
   - `style:` formatting (no code change)
   - `refactor:` code restructuring
   - `perf:` performance
   - `test:` adding tests
   - `build:` build system
   - `ci:` CI/CD
   - `chore:` maintenance

### Release Flow

1. Ensure all changes are committed and pushed
2. Run `npm run release` for patch version
3. Run `npm run release:minor` for minor version
4. Run `npm run release:major` for major version
5. Push the generated tag: `git push --follow-tags origin main`

### Branch Strategy

- `main` — production branch
- `feat/*` — feature branches
- `fix/*` — bugfix branches
- `chore/*` — maintenance branches

### Quality Gates

- Pre-commit: prettier + eslint (via lefthook)
- Commit-msg: commitlint (conventional commits via lefthook)
- CI: lint → type-check → build → test (via GitHub Actions)

## Validation Checklist

Before completing any task:

- [ ] `npm run validate` passes (lint + type-check)
- [ ] `npm run test` passes
- [ ] `npm run build` succeeds
- [ ] No inline styles except dynamic ones (ScrollZoomImage)
- [ ] Content changes reflected in `site.ts` or `projects.ts`
- [ ] Commit message follows Conventional Commits
