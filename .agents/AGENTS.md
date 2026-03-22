# Regras Globais de Inteligência — Portfolio Kayro Gomes

Este arquivo define as regras e limites absolutos para qualquer IA (Claude/Copilot, Cursor, etc.) interagindo com este repositório.

---

## 1. Segurança de Branching e Git Flow

- **NENHUMA** codificação nova deve ser iniciada sem que o agente confirme estar em branch segura.
- Se em `main` ou sem branch de feature (`feat/*`, `fix/*`, `chore/*`), execute o workflow `/start-task` (`.agents/workflows/start-task.md`) para criar branch isolada.
- O código em `main` é **estritamente protegido**: apenas releases de produção, aprovados pelo dev humano líder.
- Padrão de branch:
  - `feat/*` — novas funcionalidades (ex: `feat/add-case-study`)
  - `fix/*` — correções de bugs (ex: `fix/route-error-boundary`)
  - `chore/*` — tarefas manutenção (ex: `chore/update-deps`)
  - `refactor/*` — refatoração arquitetura (ex: `refactor/component-structure`)

---

## 2. Consistência Documental Simultânea

- Documentação **nunca** pode ficar desatualizada do código.
- Após mudanças significativas no core (novas componentes, hooks, tipos, data flow), o workflow `/auto-docs` (`.agents/workflows/auto-docs.md`) é **mandatório** antes do commit.
- Documentação crítica:
  - `.github/copilot-instructions.md` — convenções e stack
  - `.instructions.md` — workflows detalhados
  - `guidelines/Guidelines.md` — padrões de código e arquitetura
  - `cases/agent-layout-guidelines.md` — padrões de case studies

---

## 3. Atomicidade e Padrão de Commits

- Todo commit processado por agentes **DEVE** respeitar Conventional Commits:

```text
<type>(<scope>): <subject>
```

- Tipos permitidos: `feat`, `fix`, `chore`, `refactor`, `tests`, `docs`
- Escopos autorizados: `app`, `cases`, `data`, `components`, `docs`, `infra`, `root`
- Exemplo: `fix(app): ErrorBoundary fallback for route errors`
- Commits "all-in-one" ou vagos são **inaceitáveis**.
- Executar `/auto-commit` (`.agents/workflows/auto-commit.md`) para validação final com Husky + commitlint.

---

## 4. Evolução Semântica Automática

- Versionamento: `MAJOR.MINOR.PATCH` (semver)
- Releases via `npm run release*`:
  - `npm run release` → patch (v0.0.1 → v0.0.2)
  - `npm run release:minor` → minor (v0.0.1 → v0.1.0)
  - `npm run release:major` → major (v0.0.1 → v1.0.0)
- Workflow `/auto-release` (`.agents/workflows/auto-release.md`) guia merge da `develop` → `main` e disparo de versão.
- **Somente o usuário humano autoriza a execução de release** na `main`.

---

## 5. Validação Obrigatória Pre-Commit

Antes de commitar, **SEMPRE** executar:

```bash
npm run validate    # lint + type-check
npm run test        # Vitest full suite
```

Se qualquer validação falhar, o agente **DEVE**:

1. Identificar o erro específico
2. Propor fix minimalista
3. Re-validar antes de prosseguir

---

## 6. Automação de Deploy (CI/CD)

- **`main` é a ÚNICA branch de produção.**
- Todo push na `main` dispara builds e deploys automáticos (via GitHub Actions → Vercel).
- Pré-requisitos antes de merge em `main`:
  - Todos os testes passam (`npm run test`)
  - Sem TypeScript errors (`npm run type-check`)
  - ESLint limpo (`npm run lint`)
  - Commits seguem Conventional Commits

---

## 7. Respeito às Restrições Técnicas

- **Sem novas dependências** fora do stack aprovado (React, TS, Vite, Tailwind, Vitest, ESLint, Prettier).
- **Sem configurações personalizadas** de Tailwind (v4 zero-config via plugin).
- **Sem modificações em CI, versioning scheme ou precommit hooks** sem aprovação explícita.
- **Sem inline styles** — apenas Tailwind utility classes.
- **Sem `cn()` ou shadcn/ui** — foram propositalmente removidas.

---

## 8. Maintenance Rules

1. Não reintroduza template copy, dummy projects ou stock images genéricas.
2. Prefira imagens reais de projetos.
3. Mantenha React Router (sem migração para `react-router-dom`).
4. Evite dependências para problemas já cobertos no codebase.
5. Mantenha data em PT-BR em `site.ts` e `projects.ts`.

---

## 9. Handoff entre Agentes e Workflows

Quando uma tarefa requer múltiplos passos sequenciais, o agente deve:

1. Executar `/start-task` → cria branch
2. Implementar código e testes
3. Executar `/auto-docs` → sincroniza documentação
4. Executar `/auto-commit` → valida e faz commit
5. Notificar: "✅ Branch `feat/xyz` pronta. Próximo passo: `git push` e abra PR na `main`"

---

## 10. Segurança Final

- **Nenhum push direto em `main`**: sempre via PR + aprovação humana.
- **Nenhuma alteração em `.github/`, `tsconfig.json`, `vite.config.ts`, `vitest.config.ts` sem explícita intent**.
- **Nenhuma modificação de pacote-lock.json** (mantido como source of truth).
- **Nenhuma exclusão de testes** — cobertura é obrigação.

---

Última atualização: Apr 13, 2026  
Referência: `.agents/workflows/`
