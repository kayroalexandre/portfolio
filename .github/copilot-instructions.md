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

## Copilot Chat Models

**Available models**: GLM 5.1, Kimi K2.5, Minimax M2.5, Minimax M2.7 (via OpenCode API)

### Option 1: Use Portfolio Custom Models Extension (Recommended)

This extension registers custom models directly in GitHub Copilot Chat:

1. Install the extension from `.vscode-extension/`:

   ```bash
   cd .vscode-extension && npm install && npm run compile
   ```

2. Set your API key:

   ```bash
   export OPENAI_API_KEY=sk-...your-key...
   ```

3. Open Copilot Chat (⌘/Ctrl + Shift + I)

4. Click the model selector dropdown at the top

5. Select a model from **"Portfolio Custom Models"** section

**Configuration**:

- The extension reads `OPENAI_API_KEY` from environment variables by default
- API endpoint can be customized via `OPENAI_BASE_URL` or VS Code settings

See [.vscode-extension/README.md](./.vscode-extension/README.md) for full documentation.

### Option 2: Use Your GitHub Copilot Subscription

If you have access to other models through your GitHub Copilot plan:

1. Open Copilot Chat (⌘/Ctrl + Shift + I)
2. Click the model selector dropdown
3. Select your preferred model

**Note:** The specific models available depend on your GitHub Copilot subscription tier.

### Option 3: Use the CLI Model Runner (For Quick Testing)

If you prefer command-line usage:

```bash
# Set your API key
export OPENAI_API_KEY=sk-...your-key...

# Run with default model (glm-5.1)
python .github/agents/run-model.py "Your prompt here"

# Run with a specific model
python .github/agents/run-model.py --model kimi-k2.5 "Your prompt here"

# Pipe input from a file
cat prompt.txt | python .github/agents/run-model.py
```

See [.github/agents/run-model.py](./.github/agents/run-model.py) for full documentation.

## Guardrails

❌ Never: Reintroduce shadcn/ui, add inline styles, hardcode copy, modify design tokens without review  
✅ Always: Use Tailwind utilities, centralize copy, test before committing, link to canonical docs
