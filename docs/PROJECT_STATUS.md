# Status do Projeto - 12/04/2026

## Stack

- React 18 + TypeScript + Vite
- Tailwind CSS v4
- React Router

## Arquitetura

```
src/
  app/
    components/   interface, rotas e páginas
    data/         projetos publicados, config site e conteúdo dos cases
    hooks/        useDocumentTitle
  styles/         base global, fonte e Tailwind
cases/
  *.md            markdown fonte dos case studies
  *-image-map.md  curadoria visual
  assets/         imagens locais
guidelines/       documentação operacional
codex-skills/    skill local para reconstrução de cases
```

## Fluxo Editorial

1. Markdown fonte → /cases/
2. Curadoria imagens → \*-image-map.md
3. Componente JSX → src/app/data/
4. Registro → projects.ts + routes.ts

## Melhorias Aplicadas

- Documentação consolidada em PROJECT_STATUS.md
- Guidelines.md mantido como fonte primária
- README.md com visão geral e scripts
- ATTRIBUTIONS.md preservado
- SKILL.md da skill local referenciada
- Migrada estilização inline para classes utilitárias Tailwind
- Removidas dependências não usadas (clsx, tailwind-merge)
- Removido postcss.config.mjs (não necessário com Tailwind v4)

## Scripts Disponíveis

- `npm run dev` - ambiente local
- `npm run build` - bundle produção
- `npm run preview` - serve build localmente
- `npm run lint` - linting
- `npm run lint:fix` - linting com auto-fix
- `npm run type-check` - verificação de tipos TypeScript
- `npm run validate` - lint + type-check
- `npm run format` - formatação Prettier
- `npm run test` - executar testes
- `npm run test:watch` - testes em modo watch
- `npm run test:coverage` - relatório de cobertura
- `npm run release` - release patch
- `npm run release:first` - primeiro release (cria CHANGELOG.md)
- `npm run release:minor` - release minor
- `npm run release:major` - release major

## Testing

- Vitest + jsdom environment
- React Testing Library para testes de componentes
- jest-dom/vitest para matchers do DOM
- 55 testes passando
- Setup: src/test/setup.ts
- Testes de dados: validam estrutura de site.ts e projects.ts
- Testes de componentes: renderização, interações, validação de formulário
- Testes de rotas: verificam configuração do router
- Arquivos de teste colocados junto ao fonte (\*.test.tsx)

## Limpeza Recente

- Removidos estilos inline estáticos de páginas e conteúdos editoriais
- Padronizados tokens semânticos de shell para fundo, texto e borda
- Simplificado o título dinâmico com classes utilitárias Tailwind
- Mantida apenas estilização inline dinâmica onde a lógica depende de estado ou cálculo
- Consolidado o resumo de padrões em data, componentes e documentação

## CI/CD

- GitHub Actions: lint → type-check → build → test em cada push/PR para main
- Release automático via GitHub Release em push de tag v\*
- Workflow de CI definido em .github/workflows/

## Git Hooks

- Lefthook pre-commit: Prettier format + ESLint fix
- Lefthook commit-msg: commitlint valida Conventional Commits
- Tipos permitidos: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert
- Branches: main (produção), feat/_, fix/_, chore/\*

## Versioning

- standard-version com Conventional Commits
- Tags no formato vMAJOR.MINOR.PATCH
- CHANGELOG.md gerado automaticamente

## Dependências Principais

- React 18
- React Router
- Tailwind CSS v4
- Mermaid (diagramas)
- Lucide React (ícones)

## Cases Publicados

- Monetix
- UnimedPay

## Contato

- FormSubmit com POST nativo
- Variáveis: VITE_FORMSUBMIT_ACTION, VITE_SITE_URL

## Limpezas Realizadas

- Removidas dependências não usadas: clsx, tailwind-merge
- Removido postcss.config.mjs (não necessário com Tailwind v4)
- Migrados inline styles para classes utilitárias Tailwind
