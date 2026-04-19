---
name: figma-foundations
description: Aplica o padrão visual Foundations (SECTION + header documental + subsections rotuladas + component cards) numa página do Figma do portfolio. Invocar quando o usuário pede para "organizar", "estruturar", "documentar" ou "classificar" uma página `🧩 Components / *` do arquivo `HrLXJwWcQkD0HbiFpf3PQc`.
---

# figma-foundations

Padrão visual consolidado nas etapas 1-5 do portfolio e estendido em 2026-04-18 para as páginas Components. Evita componentes empilhados sem rótulo — feedback recorrente do usuário ("tudo empinhaso, sem documentação ou classificação").

## Quando invocar

- Usuário pede para reestruturar/organizar/documentar uma página `🧩 Components / *`.
- Depois de criar novos masters soltos, antes de dar uma página por pronta.

## Pré-requisitos (checar antes de escrever código)

- Arquivo `HrLXJwWcQkD0HbiFpf3PQc`.
- Variáveis locais: `surface/background`, `content/primary`, `content/secondary`, `content/tertiary`, `border/strong`.
- Text styles locais: `Label/Eyebrow`, `Display/Section`, `Heading/H3`, `Body/Large`, `Body/Small`, `Body/Meta`, `Code/Small`.
- Helpers: colar o bloco de `/home/kayro/dev/portfolio/.claude/figma-helpers.md` no topo de todo script `use_figma` (`switchToPage`, `bindFill`, `getVar`, `getTextStyle`, `mkFrame`, `appendAuto`, `mkText`).

## Estrutura obrigatória

```
SECTION "<Page> Components" (1600 wide · fill = surface/background bound)
└── FRAME "content" (VERTICAL · padding 80 · gap 64 · counterAxis FIXED)
    ├── header (VERTICAL · gap 12 · FILL)
    │   ├── eyebrow  "COMPONENTS · <PAGE>"   Label/Eyebrow    content/tertiary
    │   ├── title    "<NN> · <Page>"          Display/Section  content/primary
    │   ├── desc     <resumo do propósito>    Body/Large       content/secondary  (FIXED 900)
    │   └── divider  60×2                     border/strong
    │
    └── [uma subsection por família de componentes]
        subsection (VERTICAL · gap 24 · FILL)
        ├── subsection-header (VERTICAL · gap 8 · FILL)
        │   ├── eyebrow  "<FAMÍLIA>"    Label/Eyebrow   content/tertiary
        │   ├── title    "<nome>"        Heading/H3     content/primary
        │   └── desc     <propósito>     Body/Small     content/secondary  (FIXED 760)
        └── component-card (VERTICAL · gap 12 · FILL)
            ├── info (HORIZONTAL · gap 12 · counterAxis center)
            │   ├── name   <master.name>                           Body/Meta   content/primary
            │   └── usage  "<W × H · <contexto de uso>"             Code/Small  content/tertiary
            └── preview (HORIZONTAL · FIXED · align MIN/CENTER)
                width = 1440, height = max(master.height, minPreviewH)
                └── [master] (layoutSizing FIXED/FIXED · tamanho original)
```

## Gotchas críticos

1. **SECTION não tem auto-layout.** Depois de construir `content`, ler `content.height` e chamar `section.resizeWithoutConstraints(content.width, Math.ceil(content.height))`. Sem isso a SECTION fica com altura inicial (ex.: 100px) e o conteúdo aparece fora dela, sobre o cinza padrão do Figma.

2. **Fill da SECTION precisa ser bound via `resolveForConsumer`** — nunca deixar sem fill, porque o Figma expõe cinza-claro. Usar `bindFill(section, getVar('surface/background'))`.

3. **Masters muito finos** (ex.: Section Divider 1344×1) precisam de `minPreviewH = 48` para o preview ser visível. Centralizar com `preview.counterAxisAlignItems = 'CENTER'`.

4. **Mover master entre parents:** primeiro `preview.appendChild(master)`, depois `master.layoutPositioning = 'AUTO'` + `layoutSizingHorizontal = 'FIXED'` + `layoutSizingVertical = 'FIXED'`. Ordem invertida lança erro.

5. **Envelope SECTION antigo:** após migrar todos os masters para a nova estrutura, só remover a SECTION antiga se `oldSection.children.length === 0`. Nunca deletar com filhos dentro.

6. **Masters com largura > 1440** não existem hoje no portfolio — a SECTION 1600 com padding 80 deixa 1440 disponível, justo para Header/Footer/Hero. Se surgir um master maior, ajustar SECTION para 1760 (padding mantém-se 80).

## Workflow executável

1. `await switchToPage('🧩 Components / <Page>')` — sempre primeira linha útil.
2. Inspecionar masters da página: `page.findAll(n => n.type === 'COMPONENT' || n.type === 'COMPONENT_SET')`. Guardar IDs + ordem natural (costuma refletir ordem narrativa na UI real).
3. Criar nova SECTION + `content` frame conforme estrutura.
4. Popular o header documental no topo.
5. Para cada família agrupar 1+ masters numa subsection; cada master vira um `component-card` com `info` + `preview`.
6. Se existir envelope SECTION prévio vazio, remover.
7. Redimensionar a SECTION para cobrir `content`. Ancorar em `(0,0)` na página.
8. `return { newSectionId, contentSize, createdNodeIds, mutatedNodeIds }`.
9. Validar com `get_screenshot(newSectionId)` antes de reportar pronto.

## Taxonomias já aplicadas (como referência para copy)

- **Layout** → `NAVEGAÇÃO` (Header), `TIPOGRAFIA DE SEÇÃO` (Section Header + Divider), `RODAPÉ` (Footer).
- **Content** → `LISTAGEM` (Project Card), `CASE STUDY · CAPA` (Hero 21:9), `CASE STUDY · CABEÇALHO` (Title + Meta), `CASE STUDY · NAVEGAÇÃO` (Prev-Next).

Copy do eyebrow em MAIÚSCULAS; title em Title Case; desc em tom descritivo curto (1-2 linhas) explicando onde/como o componente é usado no site.

## Referências cruzadas

- Memória: `project_foundations_card_pattern.md` — padrão original das 10 seções da Foundations.
- Memória: `feedback_figma_plugin_gotchas.md` — catálogo completo de armadilhas.
- Helpers: `.claude/figma-helpers.md` — bloco padrão obrigatório.
- Aplicações prévias: páginas `🧩 Components / Layout` (7:5) e `🧩 Components / Content` (7:6), 2026-04-18.
