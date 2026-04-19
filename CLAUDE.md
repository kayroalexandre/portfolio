# Portfolio — Instruções do projeto para o Claude Code

Este arquivo é carregado automaticamente em toda sessão deste repositório. Traz o mínimo imprescindível para não regredir. Detalhes vivem na memória persistente em `/home/kayro/.claude/projects/-home-kayro-dev-portfolio/memory/`.

## Idioma

Todas as respostas em **português do Brasil**, mesmo se a mensagem vier em outro idioma. Ver `feedback_language_ptbr.md`.

## Contexto do projeto

- Portfolio pessoal do Kayro Gomes. Lançamento público importante — não é side project.
- Estado atual: **Etapas 1-7 do plano concluídas** (tokens, Foundations, Cover, Icons, Buttons, Audit Components/Layout, Prototype unificado). A próxima etapa ainda não foi definida — confirmar escopo com o usuário antes de atacar.
- Stack Figma: arquivo `HrLXJwWcQkD0HbiFpf3PQc` com páginas 🏠 Cover, 🎨 Foundations, 🪷 Icons, 🧩 Buttons, 🧩 Components/Layout, 🧩 Components/Content, 🎬 Prototype. Fontes disponíveis: **Inter** + **Roboto Mono** (Google Sans Flex NÃO existe no arquivo).
- Stack código: Next.js + React + TypeScript. O bridge entre tokens do Figma e código ainda não foi feito — isso é etapa futura.

## Regras visuais (inegociáveis)

- Fundo `surface/background` (preto liso). **Sem** aurora, glass decorativo, gradientes cromáticos ou neons fora de seções de demonstração.
- Páginas internas em **1440 × H**, padding lateral 80. Apenas a Cover usa 1920×960.
- Tipografia em Inter (Display/Heading/Body/Label/Nav/Button) e Roboto Mono (Code). Nada de fontes paralelas.
- Padrão de card Foundations: **200×172**, preview superior 200×112 FIXED/FIXED, info em FILL com name + usage em Code/Small.
- Toda cor via variável (`color/*`, `surface/*`, `content/*`, `interactive/*`). Nada de hex solto no componente.

Detalhes: `project_portfolio_style_rules.md`, `project_foundations_card_pattern.md`.

## Figma via `use_figma` — obrigatório consultar antes

Antes de escrever qualquer script `use_figma` novo:

1. Ler **`reference_figma_playbook.md`** (7 regras de ouro + checklist pré-execução).
2. Colar o bloco de helpers padrão do arquivo **`.claude/figma-helpers.md`** no topo do script. Esse bloco já previne os gotchas recorrentes (ABSOLUTE → AUTO, preview FIXED após fixSizing, fill bound de SECTION, font load, etc.).
3. Se o gotcha específico não estiver no playbook, consultar `feedback_figma_plugin_gotchas.md`.

Primeiras linhas úteis de qualquer script:

```js
// === colar helpers aqui (ver .claude/figma-helpers.md) ===
const page = await switchToPage('🧩 Buttons'); // ou página alvo
// ... resto do script
```

## Skills Figma instaladas (já disponíveis)

O plugin oficial `claude-plugins-official/figma` expõe skills progressivas. Consultar e invocar quando o escopo bater:

- **figma-use** — regras da Plugin API (já carregada nesta sessão via hook de skill).
- **figma-generate-library** — workflow multi-fase para bibliotecas novas com checkpoints obrigatórios de usuário (tokens → text/effect styles → foundations → componentes). **Espelha exatamente** o workflow que usamos nas etapas 1-5.
- **figma-generate-design** — montagem incremental de telas a partir do design system existente.
- **figma-create-design-system-rules** — gera `design-system.md` na raiz do repo.
- **figma-implement-design**, **figma-code-connect**, **figma-create-new-file** — quando for a hora da integração Figma → código.

Para tarefas de nova página/componente no Figma, começar pela skill relevante em vez de improvisar do zero.

## Delegação — subagents do AITK bridge

Opus é **orquestrador e aprovador final**, não executor de tudo. Antes de consumir tokens Opus em tarefas sem necessidade de filesystem/write/tool-execution, delegar via `.claude/agents/`:

- **glm-reviewer** — copy pt-BR, SVG paths, code review de script `use_figma`, drafts de memória/planejamento.
- **kimi-longctx** — arquivos >800 linhas, logs, síntese cross-arquivo, compactação de janela.
- **mimo-reasoner** — enumeração de edge cases, validação algorítmica.
- **quorum-synth** — decisões de arquitetura contestadas, refactors arriscados (gasta ~3× tokens do bridge; reservar para alto risco).

Todos os 4 agents foram instruídos a ler `MEMORY.md` do projeto antes de responder. Regra completa: `feedback_delegation.md`.

## Convenções operacionais

- **Nada de rewrite do que já funciona.** Alterações sempre aditivas. Se algo existente precisa mudar, confirmar antes.
- **Segurança de pesquisa web:** nunca enviar o `fileKey` do Figma, paths absolutos do WSL, nomes de arquivos privados da memória ou qualquer segredo para serviços externos. Pesquisar apenas por conceitos genéricos.
- **IDs voláteis:** memórias citam IDs de node (`458:804` etc.) que podem ter mudado após delete+recreate. Sempre re-descobrir por nome antes de operar.
- **Etapas sequenciais:** cada etapa do plano do portfolio precisa de aprovação antes da próxima. Ver `project_portfolio_etapas.md` para estado atual.
- **Snapshot por etapa:** ao fechar uma etapa, gerar JSON em `docs/figma-snapshots/phase-NN-<slug>.json` usando `snapshotPage` + `snapshotGlobals` (ver `.claude/figma-helpers.md`) e atualizar `docs/figma-snapshots/manifest.json`. Motivo: a Fase 4 consumiu 56 MCP calls numa sessão — snapshot permite retomar sem re-descoberta. Ler `docs/figma-snapshots/README.md` antes de iniciar qualquer retomada.

## Memória persistente — índice

Arquivo índice: `/home/kayro/.claude/projects/-home-kayro-dev-portfolio/memory/MEMORY.md`. Carregado automaticamente em toda sessão. Cada linha aponta para um arquivo `.md` com frontmatter tipado (`user`/`feedback`/`project`/`reference`). Atualizar o índice sempre que criar/apagar/renomear uma memória.

## Environment section near the start of CLAUDE.md\n\n## Environment

- Primary platforms: Windows + WSL2 (dual setup)
- Preferred models: claude-sonnet-4-5, fallback to claude-opus when unavailable
- Foundry deployment has limited model availability - check available models before assuming

## Figma Workflow section\n\n## Figma Workflow

- When organizing Figma pages, apply the Foundations pattern: header + labeled subsections + component cards
- Always enable auto-layout on SECTION frames so they grow with content
- Verify plugin API method names and property keys before calling (common source of errors)
- 'Code executed with no return value' is NOT an error - it's expected for mutation operations

## Shell/WSL Conventions section

- When writing .zshenv or shell configs in WSL via heredoc, escape $ as \$ to prevent premature variable expansion
- Double-check keys/variable names before writing - a single typo requires full rewrite
