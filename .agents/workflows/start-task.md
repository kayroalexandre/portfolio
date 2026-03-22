# Workflow: `/start-task`

Inicializa uma nova tarefa do zero, criando a branch correta e garantindo que partimos do estado limpo mais recente da `develop`.

---

## Invocação

```text
/start-task <nome-da-tarefa>
```

Exemplo: `/start-task add-case-study-aurora`

---

## Passos Obrigatórios

### 1. Garantir Limpeza do Worktree

```bash
git status
```

- Se houver arquivos unstaged/uncommitted:
  - Peça ao usuário para fazer `git stash` ou `git commit`
  - **NUNCA** proceda com worktree sujo

### 2. Atualizar Base Local

```bash
git checkout develop
git pull origin develop
```

- Garanta que você está na `develop` mais recente
- Se houver conflitos de pull, reporte e pause

### 3. Mapeamento de Nomenclatura

Escolha o prefixo baseado no tipo de tarefa:

| Tipo                       | Prefixo     | Exemplo                          |
| -------------------------- | ----------- | -------------------------------- |
| Corrigir bug ou regressão  | `fix/`      | `fix/route-error-boundary`       |
| Nova feature ou componente | `feat/`     | `feat/add-aurora-case-study`     |
| Refatoração arquitetura    | `refactor/` | `refactor/route-structure`       |
| Manutenção, deps, config   | `chore/`    | `chore/update-eslint-config`     |
| Testes ou cobertura        | `tests/`    | `tests/add-error-boundary-tests` |

**Regra de nomenclatura:** Use hífens para separar palavras, não underscores.

### 4. Criar Branch

```bash
git checkout -b <prefixo>/<nome-da-tarefa-hifenizado>
```

**Exemplo:**

```bash
git checkout -b feat/add-aurora-case-study
```

### 5. Confirmação

Notifique o usuário:

> ✅ **Branch `<branch-name>` criada com sucesso a partir da `develop`!**  
> Ambiente de desenvolvimento pronto. Qual o primeiro passo técnico?

---

## Safety Checks

- ❌ Nunca crie branch diretamente de `main`
- ❌ Nunca use underscores (`_`) — apenas hífens (`-`)
- ❌ Nunca comece com número ou caractere especial
- ✅ Sempre pull a `develop` antes de criar branch

---

## Próximo Passo

Após branch criada, o fluxo padrão é:

1. **Implementar código** (seguindo `.github/copilot-instructions.md`)
2. **Escrever/atualizar testes** (colocados ao lado do código)
3. **Executar `/auto-docs`** (sincronizar documentação se necessário)
4. **Executar `/auto-commit`** (validar e fazer commit)
5. **Push → PR → Merge** (após aprovação humana)
