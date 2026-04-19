# Figma Snapshots — checkpoints do design system

Ponto de verificação do bootstrap do design system no Figma (`fileKey` em `CLAUDE.md`). Cada etapa do plano (`project_portfolio_etapas.md` na memória) tem um snapshot JSON aqui. Serve para **retomar sem refazer descoberta** quando a cota de MCP calls acabar.

## Motivação

A Fase 4 (Icons) consumiu 56 MCP calls em uma sessão — limite batido. Sem snapshot, a sessão seguinte teria que re-descobrir node IDs, árvore de SECTIONs, ComponentSets e variáveis. Com snapshot, o Opus lê o JSON local e já sabe o estado.

## Estrutura

```
docs/figma-snapshots/
├── README.md            ← este arquivo
├── manifest.json        ← índice de todas as fases
├── phase-01-tokens.json
├── phase-02-foundations.json
├── phase-03-cover.json
├── phase-04-icons.json
└── phase-05-buttons.json
```

## Schema por snapshot

```jsonc
{
  "meta": {
    "phase": 1, // número da etapa
    "name": "tokens", // slug curto
    "title": "...", // título humano
    "concludedAt": "YYYY-MM-DD", // data de fechamento
    "fileKey": "...", // mesmo fileKey do CLAUDE.md
    "pageId": "7:2", // id da página alvo (null se global)
    "pageName": "🎨 Foundations", // nome da página (null se global)
    "backfillMethod": "documental", // documental | mcp-full | mcp-partial
    //   - documental: extraído das memórias, sem MCP calls
    //   - mcp-full:   coletado via snapshotPage + snapshotGlobals
    //   - mcp-partial: híbrido
  },
  "tree": [
    // SECTION/FRAME top-level (nome, id, x/y, w/h, type)
    { "id": "...", "name": "...", "type": "SECTION", "x": 0, "y": 0, "w": 1600, "h": 800 },
  ],
  "components": [
    // COMPONENT soltos
    { "id": "...", "name": "...", "key": "..." },
  ],
  "componentSets": [
    // COMPONENT_SET (Button, IconButton, etc.)
    { "id": "...", "name": "...", "key": "...", "variantCount": 90 },
  ],
  "variables": {
    // variáveis locais criadas/relevantes na etapa
    "collections": [{ "name": "Semantic · Theme", "modes": ["Dark", "Light"] }],
    "created": [{ "id": "VariableID:415:2", "name": "interactive/outline/bg-pressed" }],
  },
  "styles": {
    // styles criados/relevantes
    "text": [{ "id": "...", "name": "Display/Hero" }],
    "effect": [{ "id": "...", "name": "Focus/Ring" }],
    "paint": [],
  },
  "fonts": ["Inter", "Roboto Mono"],
  "notes": "observações específicas da etapa",
}
```

## Como gerar um novo snapshot (etapas daqui em diante)

1. Na última call MCP da etapa, rodar os helpers `snapshotPage(name)` + (se houver tokens/styles novos) `snapshotGlobals()` — definidos em `.claude/figma-helpers.md`.
2. O helper retorna um objeto JSON. Salvar via `Write` em `docs/figma-snapshots/phase-NN-<slug>.json`.
3. Atualizar `manifest.json` adicionando a entrada nova.
4. Atualizar `project_portfolio_etapas.md` na memória (marca a etapa como concluída + referencia o snapshot).

**Custo alvo por etapa:** 1–3 MCP calls para o snapshot (não 56). O helper foi escrito para coletar tudo numa passada.

## Como retomar sessão a partir de um snapshot

Sessão nova que pega o bastão no meio da etapa N+1:

1. Ler `manifest.json` — descobre a última etapa concluída.
2. Ler `phase-N-<slug>.json` — pega ids, tree, tokens sem MCP call.
3. Consultar `project_portfolio_etapas.md` para entender o **why** e gotchas específicos.
4. Só então decidir se precisa de MCP call inicial (ex: `get_metadata` pra confirmar ids não mudaram após delete+recreate — ver regra "IDs voláteis" em `CLAUDE.md`).

**Regra:** IDs em snapshot são **congelados no momento do commit**. Antes de operar em cima deles, validar por nome (`findByName`) — é barato e evita bug de ID stale.

## Backfill das Etapas 1–5

Os 5 snapshots existentes são `backfillMethod: "documental"` — foram reconstruídos a partir de `project_portfolio_etapas.md` sem consumir MCP calls. Portanto:

- **Árvore top-level, ids principais, counts e padrões**: presentes e confiáveis.
- **Árvore recursiva completa, child ids profundos, valores resolvidos de variáveis**: ausentes. Se precisar desses dados em fase futura, rodar snapshot `mcp-full` da página (~1–3 calls).

## Segurança

- `fileKey` já está em `CLAUDE.md` (commitado). Não é novo segredo aqui.
- **Não** enviar snapshots para serviços web externos (regra do projeto em `CLAUDE.md`).
- **Não** adicionar tokens de API, user IDs, links Figma privados.
