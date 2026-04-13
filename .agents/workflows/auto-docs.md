# Workflow: `/auto-docs`

Sincroniza automaticamente a documentação com o código alterado. Executa apenas smallcirurgicaledits focadas, nunca reescreve documentos inteiros.

---

## Invocação

Executado automaticamente **antes** de `/auto-commit`, ou invocado manualmente:

```text
/auto-docs
```

---

## ⚠️ Regra de Ouro

**NUNCA** tente ler ou atualizar toda a pasta `docs/` de uma vez. Isso excede limites de contexto e tokens. Faça **apenas** atualizações pontuais baseadas no escopo alterado.

---

## Passos Obrigatórios

### 1. Reconhecimento do Terreno

Inspecione o diff recente:

```bash
git status
git diff HEAD~1 HEAD  # último commit
# OU
git diff develop HEAD  # se em feature branch
```

**Objetivo:** Entender exatamente qual foi a mudança.

**Exemplos:**

- ✅ "Adicionei novo hook `useScrollLock`" → afeta `.github/copilot-instructions.md` § Code Organization
- ✅ "Refatorei ErrorBoundary" → afeta `.instructions.md` § Workflow: Error Handling
- ✅ "Adicionei nova case study (Aurora)" → afeta `cases/agent-layout-guidelines.md`
- ❌ "Não mudei nada importante" → skip `/auto-docs`

### 2. Mapeamento de Impacto (Filtragem)

**NÃO abra todos os docs.** Apenas identifique quais 1~3 arquivos foram realmente impactados.

Guia rápido de impacto:

| Mudança no Código                        | Arquivo de Docs Afetado                                    |
| ---------------------------------------- | ---------------------------------------------------------- |
| Nova componente React ou hook            | `.github/copilot-instructions.md` § Code Organization      |
| Nova rota ou fluxo de app                | `.instructions.md` § Routing & Flows                       |
| Novo type/interface ou estrutura de data | `guidelines/Guidelines.md` § Type System                   |
| Nova case study ou asset                 | `cases/agent-layout-guidelines.md`                         |
| Novos scripts, build ou CI               | `.github/copilot-instructions.md` § Build & Verification   |
| Mudança em convenção de naming/import    | `.github/copilot-instructions.md` § Imports & Code Quality |
| Novo padrão de teste                     | `.github/copilot-instructions.md` § Testing                |

### 3. Edição Cirúrgica

Abra **APENAS** os 1~3 arquivos mapeados no passo 2.

**Técnicas de edição:**

- Use `replace_string_in_file` para updates pontuais
- Adicione parágrafo ou seção **sem** apagar contexto existente
- Mantenha a formatação e indentação atuais
- Se for adicionar novo item à lista, respeite o estilo (bullets, numeração, etc)

**Exemplo:**

Mudança: Adicionei novo hook `useScrollLock` em `src/app/hooks/`.

Ação: Abra `.github/copilot-instructions.md`, seção "Code Organization", subsecção "Hooks".

Atualize:

```markdown
### Hooks

- `useDocumentTitle` — set document title reactively
- `useScrollLock` — prevent body scroll (modal/lightbox open)
```

### 4. Resumo de Mudanças

Após editar, apresente ao usuário:

> ✅ **Documentação Sincronizada:**
>
> - `.github/copilot-instructions.md` → Adicionado hook `useScrollLock` à seção "Code Organization"
> - `.instructions.md` → Atualizado workflow de Modal/Lightbox (referências)
>
> Prontos para o próximo passo: `/auto-commit`

---

## Safety Checks

- ❌ Nunca reescreva um documento inteiro
- ❌ Nunca abra 5+ arquivos de docs por vez
- ❌ Nunca mude formatação ou estrutura existente
- ✅ Sempre mantenha tom e padrão do documento
- ✅ Sempre verifique se a mudança é realmente necessária

---

## Próximo Passo

Após `/auto-docs` completado, execute:

```text
/auto-commit
```
