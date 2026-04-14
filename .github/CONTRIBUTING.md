# Guia de Contribuicao

## Requisitos

- Node.js 20+
- npm 10+
- Git configurado

## Fluxo recomendado

1. Crie branch a partir de `main`.
2. Implemente a mudanca com commits pequenos.
3. Rode validacoes locais:
   - `npm run lint`
   - `npm run type-check`
   - `npm run test -- --run`
   - `npm run build`
4. Abra PR usando o template.
5. Solicite revisao e resolva feedback.

## Uso do GitHub Copilot

### Pull Requests

- Use o resumo automatico do Copilot para descrever alteracoes.
- Revise a descricao gerada e ajuste o contexto de negocio.

### Code Review

- Solicite review com Copilot para detectar risco de regressao, seguranca e performance.
- Trate sugestoes como apoio, nunca como aprovacao final.

### Commits

- Gere sugestao de mensagem com:
  - `gh copilot suggest --type commit`
- Garanta padrao Conventional Commits.

### Issues e tasks

- Use templates de issue para contexto minimo.
- Para tarefas complexas, descreva objetivo, restricoes e criterios de aceite antes de acionar o Copilot.

## Convencoes de commit

Tipos permitidos:
`feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`

Exemplo:
`feat(contact): add success feedback banner`

## Seguranca

- Nunca inclua secrets em prompts, issues ou PRs.
- Revise todo codigo gerado por IA antes do merge.
- Em duvida, consulte `.github/copilot/SECURITY.md`.
