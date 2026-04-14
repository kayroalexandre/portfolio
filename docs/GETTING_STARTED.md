# Getting Started

Welcome to the Portfolio repository. This guide gets you up and running in minutes.

## Prerequisites

- Node.js 20+
- npm 10+
- Git

## Quick Setup

```bash
# 1. Clone and install
git clone https://github.com/kayroalexandre/portfolio.git
cd portfolio
npm install

# 2. Copy environment config
cp .env.example .env.local
# Edit VITE_FORMSUBMIT_ACTION and VITE_SITE_URL

# 3. Start local dev server
npm run dev
# Visit <http://localhost:5173>
```

## Essential Commands

| Command                 | Purpose                                     |
| ----------------------- | ------------------------------------------- |
| `npm run dev`           | Start local dev server (hot reload enabled) |
| `npm run build`         | Create production bundle                    |
| `npm run lint`          | Check code quality                          |
| `npm run type-check`    | Verify TypeScript                           |
| `npm run test -- --run` | Run all tests once                          |
| `npm run validate`      | Run lint + type-check + test (pre-commit)   |

## First Commit

1. Make changes in `src/`
2. Run `npm run validate` to check for errors
3. Stage and commit:
   ```bash
   git add .
   git commit -m "feat: describe your change"
   ```

   - Commitlint validates Conventional Commits
   - Pre-commit hook runs Prettier + ESLint fixes

## Where to Start

### Typical Workflows

- **Add a new case study**: Read [../cases/agent-layout-guidelines.md](../cases/agent-layout-guidelines.md)
- **Create a new page**: See [../.instructions.md](../.instructions.md#workflow-adding-a-new-route)
- **Fix a bug**: Run `npm run type-check` to identify issues
- **Work with Copilot**: Open VS Code Terminal and use `gh copilot suggest --type commit`

## Documentation Map

```
📚 docs/
├── PROJECT_STATUS.md    ← Full technical baseline
├── ATTRIBUTIONS.md      ← Licenses and credits
├── EXAMPLE_PROMPTS.md   ← Copilot prompt examples
└── GETTING_STARTED.md   ← You are here

📝 Root Files
├── .github/copilot-instructions.md  ← Quick reference
├── .instructions.md                 ← Extended workflows
└── README.md                         ← Project overview

🚀 Key Directories
├── src/app/     ← React components and routes
├── cases/       ← Editorial markdown and assets
└── scripts/     ← Maintenance utilities
```

## Helpful Resources

- **Stack References**:
  - [React 18](https://react.dev)
  - [Vite](https://vitejs.dev)
  - [Tailwind CSS](https://tailwindcss.com)
  - [React Router](https://reactrouter.com)

- **Project-Specific**:
  - [Project Status](./PROJECT_STATUS.md)
  - [Contributing Guide](../.github/CONTRIBUTING.md)
  - [Copilot Setup](../.github/copilot/instructions.md)

## Troubleshooting

**Q: npm install fails**  
A: Delete `node_modules/` and `package-lock.json`, then run `npm install` again.

**Q: TypeScript errors on import**  
A: Ensure you're using relative imports in `src/app/*` (not the `@` alias which is tests-only).

**Q: Tests fail after changes**  
A: Run `npm run test:watch` to debug interactively, or check [PROJECT_STATUS.md](./PROJECT_STATUS.md#testing).

**Q: Build fails**  
A: Run `npm run type-check && npm run lint` to catch errors early, then `npm run build`.

---

**Ready?** Start with `npm run dev` and open <http://localhost:5173> in your browser. 🚀
