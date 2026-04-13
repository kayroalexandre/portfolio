# Example Prompts — Using Copilot Instructions

This document shows how to effectively prompt Copilot (or an AI agent) using the workspace instructions.

---

## Example 1: Add a New Case Study

**Prompt:**

```txt
I want to add a new case study for a product called "Aurora Dashboard".
The existing markdown is in cases/aurora.md and visual assets are in cases/telas-aurora/.
Please:
1. Verify the case structure using the inventory script
2. Convert it to JSX in src/app/data/auroraContent.tsx
3. Register it in projects.ts and CaseStudyPage.tsx
4. Run build to verify
```

**What Copilot uses:**

- `.github/copilot-instructions.md` § Case Studies Editorial Flow
- `/.instructions.md` § Workflow: Adding a New Case Study
- `cases/agent-layout-guidelines.md` for JSX patterns
- `codex-skills/product-design-case-study/SKILL.md` for content audit

**Expected output:** Updated files ready to commit

---

## Example 2: Fix TypeScript Errors

**Prompt:**

```txt
I have 3 TS errors in the app:
1. Cannot find module '@/app/data' (in a component)
2. Property 'caseStudy' does not exist (in projects array)
3. Component not assignable to JSXElementConstructor

Help me fix these without modifying tsconfig or creating a config file.
```

**What Copilot uses:**

- `.github/copilot-instructions.md` § Path alias (only in tests)
- `/.instructions.md` § Workflow: Fixing TypeScript Errors
- Auto-suggest relative imports, type extensions, lazy loading pattern

**Expected outcome:** Clear fixes aligned with project conventions

---

## Example 3: Update Institutional Copy

**Prompt:**

```txt
The hero intro text should be "Design-led solutions for" instead of "Bridging design and".
Also update the practices section to include a new item about Design Systems.
Everything should be in PT-BR.
```

**What Copilot uses:**

- `.github/copilot-instructions.md` § Content & Data
- `/.instructions.md` § Workflow: Updating Institutional Copy
- Direct Copilot to `src/app/data/site.ts` without spreading changes

**Expected result:** Centralized edits, consistent PT-BR tone

---

## Example 4: Make Me a Test for Header Component

**Prompt:**

```txt
Create a test file for Header.tsx that checks:
1. Navigation links render correctly
2. Active route is highlighted
3. Mobile menu toggles on click

Use Vitest + React Testing Library, colocate as Header.test.tsx,
and ensure it runs with globals enabled.
```

**What Copilot uses:**

- `.github/copilot-instructions.md` § Testing
- `/.instructions.md` § Workflow: Running Tests
- `src/test/setup.ts` for environment config
- Existing test files as patterns

**Expected output:** `Header.test.tsx` in same directory, ready to run with `npm run test`

---

## Example 5: Debug a Merge Conflict in ESLint

**Prompt:**

```txt
I have an import sort conflict in HomePage.tsx.
The imports are:
- React hooks
- lucide-react icons
- Internal project imports
- Relative imports

ESLint is failing with "Import sort violation". Fix this according to
eslint-plugin-simple-import-sort rules.
```

**What Copilot uses:**

- `.github/copilot-instructions.md` § Imports & Code Quality
- `/.instructions.md` § Workflow: Fixing ESLint or Import Sort Errors
- Order: third-party → relative imports → blank line between groups

**Expected fix:** Corrected import order; can run `npm run lint:fix` to verify

---

## Example 6: How do I deploy?

**Prompt:**

```txt
What's the deployment workflow for this portfolio? How do versioning
and releases work?
```

**What Copilot uses:**

- `.github/copilot-instructions.md` § Releases & Versioning
- `/.instructions.md` § Workflow: Creating a Commit + Releasing
- CHANGELOG.md and tag-based CI/CD pattern

**Expected answer:**

- Conventional Commits required
- `npm run release` to bump version
- Push tag to trigger GitHub Release automatically

---

## Example 7: I want to add Mermaid diagrams to a case study

**Prompt:**

```txt
I'm adding a workflow diagram to the Aurora case study.
The diagram shows a user journey through the dashboard signup flow.

What Mermaid types are supported? How do I include it in the JSX?
```

**What Copilot uses:**

- `.github/copilot-instructions.md` § Components & Mermaid
- `cases/agent-layout-guidelines.md` § Diagramas Mermaid
- `src/app/components/MermaidDiagram.tsx` for implementation
- Existing case studies (monetixContent, unimedpayContent) for patterns

**Expected answer:**

- Flowchart + journey types only
- Lazy-loaded via `<MermaidDiagram>` component
- Reference code example from existing case studies

---

## Example 8: Refactor a route without breaking anything

**Prompt:**

```txt
I want to reorganize the routes structure. Currently all routes are in
src/app/routes.tsx. I want to split them into nested regions (public, admin).
How do I do this while keeping React Router and not breaking the app?
```

**What Copilot uses:**

- `.github/copilot-instructions.md` § Constraints (Keep React Router)
- `/.instructions.md` § Workflow: Adding a New Route
- `src/app/routes.tsx` as reference
- Maintenance rule: "Keep React Router, no migration to react-router-dom"

**Expected outcome:**

- Structured plan that preserves current setup
- Safe refactoring path
- Test strategy to verify no breakage

---

## Example 9: Add a new dependency

**Prompt:**

```txt
I want to add [package-name] to handle [specific problem].
Is there anything already in the codebase that solves this?
```

**What Copilot uses:**

- `.github/copilot-instructions.md` § Key Constraints & Maintenance
- `/.instructions.md` § Maintenance rules
- Maintenance rule: "Avoid new dependencies for problems already covered"

**Expected answer:**

- Audit existing utilities
- Suggest built-in alternatives if they exist
- Only approve new dependency if truly necessary

---

## Example 10: Create a new component with proper patterns

**Prompt:**

```txt
I need a new component called "TimelineCard" that displays project
milestones. It should follow the styling conventions in this codebase,
use Tailwind only (no inline styles), and include a test file.

Where should it live? What patterns should I follow?
```

**What Copilot uses:**

- `.github/copilot-instructions.md` § UI & Styling, Code Organization
- `cases/agent-layout-guidelines.md` for typography/component patterns
- `src/app/components/*Page.tsx` as reference structure
- Colocated test pattern

**Expected output:**

- Component in `src/app/components/TimelineCard.tsx`
- Test in `src/app/components/TimelineCard.test.tsx`
- Uses Tailwind classes, no inline styles
- Follows project's dark theme + neutral palette

---

## How Copilot Instructions Work Together

1. **`.github/copilot-instructions.md`** = Quick lookup (≤10 min read)
   - Answers: "What's the stack?"
   - Answers: "What files are critical?"
   - Answers: "What are the hard constraints?"

2. **`/.instructions.md`** = Workflow reference (tasks & multi-step processes)
   - Answers: "How do I add a case study?"
   - Answers: "What's the testing workflow?"
   - Answers: "How do I deploy?"

3. **`guidelines/Guidelines.md`** = Deep reference (canonical source)
   - Answers: "What are all the rules?"
   - Answers: "How is the project organized in detail?"
   - Answers: When guidelines docs conflict

4. **Domain-specific docs** (`cases/agent-layout-guidelines.md`, case study skill) = Specialized patterns
   - For case study editorial flow
   - For JSX layout conventions
   - For visual & content decisions

---

## Tips for Best Results

1. **Be specific** — Include file names, error messages, or code snippets
2. **Reference the workflow** — "Following the case study workflow, I need to…"
3. **Ask for verification** — "Run `npm run validate` to confirm"
4. **Link to docs** — Copilot will read referenced files automatically
5. **State your intent** — What outcome do you want?

---

**Last updated:** Apr 13, 2026
