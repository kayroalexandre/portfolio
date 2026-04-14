# Kayro Gomes Portfolio

Portfólio em React para apresentar estudos de caso de Product Design com base factual, narrativa editorial em PT-BR e conteúdo renderizado a partir de markdown convertido para JSX.

## Stack

- React 18
- TypeScript via Vite
- React Router
- Tailwind CSS v4
- Mermaid para diagramas nos case studies

## Scripts

- `npm run dev` inicia o ambiente local
- `npm run build` gera o bundle de produção
- `npm run preview` serve o build localmente

## Formulário de contato

O formulário de contato usa `FormSubmit` sem backend próprio.

Configuração local:

1. Copie `.env.example` para `.env.local`
2. Defina `VITE_SITE_URL` com a URL pública do site
3. Defina `VITE_FORMSUBMIT_ACTION`

Fluxo recomendado de ativação:

1. Use temporariamente `https://formsubmit.co/seu-email@dominio.com`
2. Faça um envio de teste para disparar a confirmação
3. Confirme o e-mail enviado pelo FormSubmit
4. Substitua o action pelo endpoint invisível/token aleatório recebido do serviço

Observações importantes:

- o formulário é enviado com `POST` nativo, sem AJAX
- isso é intencional, porque o `_autoresponse` do FormSubmit não funciona com AJAX
- o redirecionamento pós-envio volta para `/contact?sent=1`

## Estrutura principal

```text
src/
  app/
    components/   interface, rotas e páginas
    data/         projetos publicados, configuração do site e conteúdo dos cases
  styles/         base global, fonte e integração com Tailwind

cases/
  markdown fonte dos case studies
  image maps
  assets visuais locais

guidelines/
  documentação operacional e memórias de sessão

codex-skills/
  skill local para reconstrução e manutenção de case studies
```

## Estado atual do conteúdo

- Cases publicados no app:
  - `Monetix`
  - `UnimedPay`
- O conteúdo institucional do site é centralizado em `src/app/data/site.ts`
- Os cases em produção são renderizados por:
  - `src/app/data/monetixContent.tsx`
  - `src/app/data/unimedpayContent.tsx`
- A navegação de case study é feita em `src/app/components/CaseStudyPage.tsx`

## Fluxo editorial do repositório

1. O case nasce em markdown dentro de `cases/`
2. A curadoria visual é registrada em `*-image-map.md`
3. O conteúdo final é convertido para `src/app/data/*Content.tsx`
4. O projeto correspondente é publicado em `src/app/data/projects.ts`
5. O case passa a ser resolvido via rota dinâmica `/project/:slug`

## Documentação útil

- `guidelines/Guidelines.md`: guia principal do repositório
- `guidelines/ChatMemory-2026-03-20.md`: memória consolidada mais recente
- `cases/agent-layout-guidelines.md`: convenções para converter markdown em JSX
- `codex-skills/product-design-case-study/SKILL.md`: workflow da skill local

## GitHub Copilot Enterprise

Este repositório está preparado para uso operacional do Copilot em PRs, commits, code review, issues e automações de CI/CD.

Arquivos principais:

- `.github/pull_request_template.md`
- `.github/issue_template/bug_report.md`
- `.github/issue_template/feature_request.md`
- `.github/CONTRIBUTING.md`
- `.github/copilot/instructions.md`
- `.github/copilot/SECURITY.md`
- `.github/copilot/cloud-agent.md`
- `.github/workflows/ci.yml`
- `.github/workflows/release.yml`
- `.github/workflows/codeql-analysis.yml`
- `.github/workflows/copilot-pr-review.yml`
- `.github/workflows/copilot-code-review.yml`

Comandos uteis com CLI:

- `gh extension install github/gh-copilot`
- `gh copilot suggest --type commit`
- `./scripts/copilot-commit-suggestion.sh`

Referencias oficiais:

- <https://docs.github.com/pt/copilot>
- <https://docs.github.com/pt/copilot/how-tos/copilot-on-github>
- <https://docs.github.com/pt/copilot/how-tos/copilot-cli>
- <https://docs.github.com/pt/copilot/concepts/agents/code-review>
- <https://docs.github.com/pt/copilot/get-started/best-practices>

## Observações

- O repositório ainda carrega uma pasta `src/app/components/ui/` herdada do template original. A experiência principal atual do portfólio não depende dela.
- O envio real do formulário depende da configuração pública de `VITE_FORMSUBMIT_ACTION` e `VITE_SITE_URL`.
