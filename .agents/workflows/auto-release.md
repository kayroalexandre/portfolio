# Workflow: `/auto-release`

Automatiza o merge progressivo de `develop` → `main` e dispara o release semântico oficial do projeto.

---

## ⚠️ Pré-Requisitos

Este workflow **DEVE** ser executado apenas quando:

1. ✅ Todas as features/fixes em `develop` estão **PRONTAS PARA PRODUÇÃO**
2. ✅ **Todos os testes passam** (`npm run test`)
3. ✅ **Sem TypeScript errors** (`npm run type-check`)
4. ✅ **ESLint limpo** (`npm run lint`)
5. ✅ Cada commit em `develop` segue **Conventional Commits** (obrigatório!)
6. ✅ **Aprovação humana** do dev líder

Se alguma falhar, **PAUSE aqui** e resolva antes de prosseguir.

---

## Restrição Crítica

**`main` é PROTEGIDA.** O agente **NUNCA** pode:

- Fazer commits diretos em `main`
- Forçar push (`git push -f`) em `main`
- Remover tags de `main`

Apenas o **usuário humano** executa commands que afetam `main`, pois isso exige permissões de produção e decisões críticas.

---

## Invocação

```text
/auto-release
```

Executado pelo usuário após todas as validações passarem.

---

## Passo 1: Testes de Confiança (OPCIONAL em cases simples, OBRIGATÓRIO em refactors críticos)

**Execute:**

```bash
npm run validate    # lint + type-check
npm run test        # Vitest full suite
npm run build       # Production build
```

**Se algum falhar:**

- Relate o erro específico
- Volte para `develop`, corrija, e recomece workflow

**Se todos passarem:**

- ✅ Notifique: "Todas as validações passaram. Pronto para merge."

---

## Passo 2: Merge Progressivo com `main`

**Instruções para o usuário:**

```bash
# 1. Vá para main
git checkout main

# 2. Atualize com remoto
git pull origin main

# 3. Faça merge de develop
git merge develop --no-edit

# 4. Se houver conflito, PARE aqui e avise o agente
# Se sem conflito, siga...

# 5. Push para remoto
git push origin main
```

**Se conflito:**

- ❌ PAUSE o workflow
- Relate ao agente qual arquivo/linha está em conflito
- Agente ajuda a resolver

**Se merge sucesso:**

- ✅ `main` agora contém todos os commits de `develop`

---

## Passo 3: Decisão de Versão SemVer

**Você (agente) não pode executar,** mas **recomenda:**

Baseado nos commits feitos, decida qual bump semanticamente correto:

| Tipo de Commit     | Versão Anterior | Versão Nova | Comando                   |
| ------------------ | --------------- | ----------- | ------------------------- |
| Apenas `fix()`     | v0.1.0          | v0.1.1      | `npm run release` (patch) |
| `feat()` + `fix()` | v0.1.0          | v0.2.0      | `npm run release:minor`   |
| Breaking change    | v0.1.0          | v1.0.0      | `npm run release:major`   |

**Exemplos:**

- "Adicionei nova case study (Aurora)" + "Fixei ErrorBoundary" → **minor**
- "Apenas arrumei typo em text + markdown spacing" → **patch**
- "Completamente reescrevi a estrutura de roteamento" → **major**

**Recomendação:**

> 🎯 **Recomendo `npm run release:minor`** porque:
>
> - feat(data): add Aurora case study
> - fix(components): ErrorBoundary fallback
> - tests(components): add coverage
>
> Isto bumpará: v0.X.Y → v0.(X+1).0

---

## Passo 4: Execução de Release (MANUAL DO USUÁRIO)

**Instruções para o usuário:**

```bash
# Garantir que você está em main
git checkout main

# Execute o release interativo
npm run release:minor  # ou minor/major conforme recomendação

# O script vai:
# 1. Ler commits e gerar changelog
# 2. Bumpar versão em package.json
# 3. Criar tag v0.X.Y
# 4. Fazer commit automático "[skip ci] chore(release): v0.X.Y"
#
# Apertar ENTER para confirmar cada prompt
```

**O que esperar:**

```text
$ npm run release:minor

✔ bumping version in package.json from 0.0.1 to 0.1.0
✔ committing package-lock.json and package.json
✔ tagging release v0.1.0
✔ pushing commits and tags back to origin

Done in 2.3s
```

**Se tudo ok:**

- ✅ Tag `v0.1.0` foi criada e pushed

---

## Passo 5: Verificação de Deploy (CI/CD Automático)

Após push em `main`:

- **GitHub Actions** dispara automaticamente:
  - ✅ Build frontend (Vite)
  - ✅ Lint + type-check + test
  - ✅ Deploy to Vercel

**Verificar Status:**

1. Vá para [GitHub Actions](https://github.com/kayroalexandre/portfolio/actions)
2. Procure o workflow mais recente (deve estar rodando)
3. Aguarde conclusão (~5-10 min)
4. Se ✅ verde: Deploy sucesso → live em produção
5. Se ❌ vermelho: Algum erro ocorreu, investigate logs

**URL de Produção:**

- Vercel deploys to: `<site-url-produção>`
- GitHub Release: [github.com/kayroalexandre/portfolio/releases](https://github.com/kayroalexandre/portfolio/releases)

---

## Passo 6: Alinhamento Final

**Após deploy sucesso, notifique:**

> ✅ **Release v0.1.0 concluído e em produção!**
>
> - Tags criadas: `v0.1.0`
> - Changelog gerado automaticamente
> - Deploy live ✅
> - GitHub Release criada
>
> Voltando branch local para `develop` para future work...

**Comando final (pelo usuário):**

```bash
git checkout develop
git pull origin develop
```

Isso garante que você está sincronizado e pronto para a próxima tarefa.

---

## Safety Checks

- ❌ Nunca force push em `main`
- ❌ Nunca delete tags
- ❌ Nunca execute release sem all tests passing
- ❌ Nunca execute release sem aprovação humana
- ✅ Sempre volte para `develop` após release
- ✅ Sempre verifique CI/CD status após push

---

## Troubleshooting

| Problema                | Solução                                    |
| ----------------------- | ------------------------------------------ |
| "Conflito no merge"     | Resolve conflicts, commit merge, try again |
| "Release script failed" | Verifique Conventional Commits em develop  |
| "Deploy não saiu"       | Cheque GitHub Actions logs, reporte erro   |
| "Tag duplicada"         | Tag já existe; use version diferente       |

---

## Próximo Ciclo

Após release + deploy:

- ✅ `main` está em produção
- ✅ `develop` está sincronizada
- 🚀 Pronto para próxima tarefa via `/start-task`
