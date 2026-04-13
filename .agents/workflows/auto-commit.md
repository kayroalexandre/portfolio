# Workflow: `/auto-commit`

Avalia o diff atual da branch e gera mensagens de commit coesas com Conventional Commits, garantindo validação do Husky e commitlint.

---

## Invocação

```text
/auto-commit
```

Executado **após** implementação + testes + `/auto-docs` (se necessário).

---

## Passos Obrigatórios

### 1. Revisão das Modificações

Mapeie os arquivos que serão enviados:

```bash
git status
git diff HEAD
```

**Objetivo:** Entender o escopo exato do commit. Não faça commit cego.

### 2. Decisão: Atomicidade

#### Cenário A: Mudanças são homogêneas (único tipo)

Exemplo: "Apenas add/fix ErrorBoundary e seu teste"

- ✅ Use `git add .` direto

#### Cenário B: Mudanças são heterogêneas (mistura bugs + features + docs)

Exemplo: "Fix ErrorBoundary + Add nova documentação + Refactor routes + Update deps"

- ⚠️ Considere `git add` cirúrgico por tipo
- Exemplo: `git add src/app/components/ErrorBoundary*` → commit separado
- Depois: `git add EXAMPLE_PROMPTS.md` → outro commit
- Depois: `git add src/app/routes.tsx` → terceiro commit

**Regra:** Se for fácil particionar, faça commits atômicos. Senão, faça um resumo que atenda a alteração principal.

### 3. Padrão Semântico (Conventional Commits)

Use **EXATAMENTE** este formato:

```text
<type>(<scope>): <subject>

[body (opcional)]
```

#### Tipos Permitidos

| Tipo       | Uso                                   | Exemplo                                                      |
| ---------- | ------------------------------------- | ------------------------------------------------------------ |
| `feat`     | Nova feature/componente               | `feat(app): add ErrorBoundary fallback for routes`           |
| `fix`      | Correção de bug/regressão             | `fix(components): ErrorBoundary blank render on route error` |
| `refactor` | Reorganização sem mudança de behavior | `refactor(components): simplify Lightbox state`              |
| `chore`    | Manutenção, deps, config              | `chore(root): update ESLint config`                          |
| `tests`    | Testes ou cobertura                   | `tests(components): add ErrorBoundary route error test`      |
| `docs`     | Documentação                          | `docs: update case study layout guidelines`                  |

#### Escopos Permitidos

| Escopo       | Alvo                                                    |
| ------------ | ------------------------------------------------------- |
| `app`        | Arquitetura principal, routes, Layout                   |
| `components` | Componentes React (Page, Header, Footer, etc)           |
| `data`       | `src/app/data/` (site.ts, projects.ts, content files)   |
| `cases`      | Case studies (markdown, images, JSX content)            |
| `hooks`      | Custom hooks                                            |
| `docs`       | Documentação geral (instruções, guidelines)             |
| `infra`      | CI/CD, config files, tooling                            |
| `root`       | Root files (package.json, tsconfig, vitest.config, etc) |

#### Subject Line

- **Máximo 50 caracteres**
- Use **presente imperativo** ("add", "fix", "update", não "added", "fixed")
- Sem ponto final
- Sempre em **inglês** (subjects de commits em inglês, comentários internos em PT-BR)

#### Exemplos Válidos

```bash
fix(components): ErrorBoundary fallback for route errors
feat(data): add Aurora case study content
tests(components): add ErrorBoundary test coverage
refactor(app): reorganize route structure
chore(root): update Tailwind to v4.2
docs: update copilot instructions for new patterns
```

#### Exemplos INVÁLIDOS

```text
❌ Fixed the error boundary thing
❌ feat: multiple random fixes
❌ Update everything
❌ fix(components): Corrigir ErrorBound (português no title)
❌ fix(invalid-scope): something
```

### 4. Body (Opcional Mas Recomendado)

Se a mudança é complexa, adicione context:

```bash
fix(components): ErrorBoundary fallback for route errors

When ErrorBoundary is used as errorElement in React Router,
it receives no children prop and should render fallback UI
instead of returning empty DOM. This prevents blank error screens.

Fixes #123 (se houver issue)
```

### 5. Staging e Commit

```bash
# Opção A: Tudo
git add .

# Opção B: Cirúrgico (se dividir commits)
git add src/app/components/ErrorBoundary*
git commit -m "fix(components): ErrorBoundary fallback for route errors"
git add EXAMPLE_PROMPTS.md
git commit -m "docs: fix markdown list spacing in prompts"
```

### 6. Validação Automática (Husky + Commitlint)

Husky dispara automaticamente:

- ✅ Prettier (auto-format)
- ✅ ESLint (auto-fix if possible)
- ✅ commitlint (valida formato)

Se commitlint rejeitar:

- **Erro típico:** "subject exceeds 50 characters"
- **Solução:** Reescreva o subject mais curto
- **Tente novamente:** `git commit --amend`

Se rejeição persistir:

- Relate o erro exato aqui
- Agente analisará e corrigirá

### 7. Confirmação Final

Se commit sucesso:

> ✅ **Commit realizado com sucesso!**
>
> ```bash
> [feat-branch abc1234] fix(components): ErrorBoundary fallback for route errors
> 2 files changed, 50 insertions, 30 deletions
> ```
>
> Próximo passo: **`git push origin <branch-name>` e abra PR na `main`**

---

## Safety Checks

- ❌ Nunca faça "all-in-one" commits com múltiplos tipos não relacionados
- ❌ Nunca use caracteres especiais ou emoji no subject
- ❌ Nunca escreva subject em português
- ❌ Nunca exceed 50 caracteres no subject
- ✅ Sempre relate o escopo correto
- ✅ Sempre use present imperative ("add", "fix", não "added")
- ✅ Sempre corra `git status` antes de commitar

---

## Próximo Passo

Após commit com sucesso:

```bash
git push origin <branch-name>
# Depois: Abra PR na main com descrição clara
```

E notifique para aguardar review + merge.
