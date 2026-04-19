# Helpers Figma reutilizáveis — cole no topo de qualquer script `use_figma`

**Uso:** ao escrever um script `use_figma`, o Opus deve `Read` este arquivo e colar o bloco de helpers ANTES do código específico. Evita redeclaração manual e variações sutis entre calls (causa comum de bugs).

**Importante:** `use_figma` executa em sandbox novo a cada call. Estes helpers NÃO persistem entre calls — precisam ser colados sempre que usados.

---

## Bloco padrão (colar no topo do script)

```js
// === HELPERS (padrão portfolio-figma) ===
const PARENT_TYPES = new Set([
  'FRAME',
  'GROUP',
  'COMPONENT',
  'COMPONENT_SET',
  'INSTANCE',
  'SECTION',
  'PAGE',
]);

const hasKids = (n) => PARENT_TYPES.has(n.type) && n.children;

function walk(n, visit) {
  visit(n);
  if (hasKids(n)) n.children.forEach((c) => walk(c, visit));
}

function findByName(root, name) {
  if (!hasKids(root)) return null;
  for (const c of root.children) {
    if (c.name === name) return c;
    if (hasKids(c)) {
      const f = findByName(c, name);
      if (f) return f;
    }
  }
  return null;
}

async function switchToPage(pageName) {
  const page = figma.root.children.find((p) => p.name === pageName);
  if (!page) throw new Error(`Page not found: ${pageName}`);
  await figma.setCurrentPageAsync(page);
  return page;
}

// Resolve a variable color + bind it on a paint (prevents the setTextStyleIdAsync-resets-to-black bug)
function bindFill(node, variable) {
  const resolved = variable.resolveForConsumer(node);
  const fill = {
    type: 'SOLID',
    color: { r: 0, g: 0, b: 0 },
    opacity: 1,
    visible: true,
    blendMode: 'NORMAL',
  };
  if (resolved && resolved.value && typeof resolved.value === 'object') {
    fill.color = {
      r: resolved.value.r || 0,
      g: resolved.value.g || 0,
      b: resolved.value.b || 0,
    };
    if (resolved.value.a !== undefined) fill.opacity = resolved.value.a;
  }
  return figma.variables.setBoundVariableForPaint(fill, 'color', variable);
}

// Same for strokes
function bindStroke(node, variable) {
  return bindFill(node, variable);
}

// Create a frame with auto-layout configured safely
function mkFrame({ name, w, h, layoutMode = 'VERTICAL', gap = 0, padding = 0, fill = null }) {
  const f = figma.createFrame();
  f.name = name;
  f.resize(w, h);
  f.layoutMode = layoutMode;
  f.itemSpacing = gap;
  const [pt, pr, pb, pl] = Array.isArray(padding) ? padding : [padding, padding, padding, padding];
  f.paddingTop = pt;
  f.paddingRight = pr;
  f.paddingBottom = pb;
  f.paddingLeft = pl;
  f.primaryAxisSizingMode = 'AUTO';
  f.counterAxisSizingMode = 'FIXED';
  if (fill) f.fills = [fill];
  return f;
}

// Append AND force AUTO positioning + sizing (fixes layoutPositioning=ABSOLUTE gotcha)
function appendAuto(parent, child, sizingH = 'FIXED', sizingV = 'FIXED') {
  parent.appendChild(child);
  try {
    child.layoutPositioning = 'AUTO';
  } catch (e) {}
  try {
    child.layoutSizingHorizontal = sizingH;
  } catch (e) {}
  try {
    child.layoutSizingVertical = sizingV;
  } catch (e) {}
  return child;
}

// Create a text node with font pre-loaded and optional style/fill bindings
async function mkText({
  chars,
  family = 'Inter',
  style = 'Regular',
  styleId = null,
  fillVar = null,
  autoResize = 'WIDTH_AND_HEIGHT',
}) {
  await figma.loadFontAsync({ family, style });
  const t = figma.createText();
  t.characters = chars;
  t.textAutoResize = autoResize;
  if (styleId) {
    const sty = (await figma.getLocalTextStylesAsync()).find(
      (s) => s.id === styleId || s.name === styleId
    );
    if (sty) {
      await figma.loadFontAsync(sty.fontName);
      await t.setTextStyleIdAsync(sty.id);
    }
  } else {
    t.fontName = { family, style };
  }
  if (fillVar) t.fills = [bindFill(t, fillVar)];
  return t;
}

// Lookup a local variable by exact name (collection-agnostic)
function getVar(name) {
  return figma.variables.getLocalVariables().find((v) => v.name === name);
}

// Lookup a text style by exact name
async function getTextStyle(name) {
  const all = await figma.getLocalTextStylesAsync();
  return all.find((s) => s.name === name);
}

// Ensure a FRAME-like preview stays FIXED/FIXED even after recursive fixSizing passes
function forceFixed(node, w, h) {
  node.resize(w, h);
  try {
    node.primaryAxisSizingMode = 'FIXED';
  } catch (e) {}
  try {
    node.counterAxisSizingMode = 'FIXED';
  } catch (e) {}
  try {
    node.layoutSizingHorizontal = 'FIXED';
  } catch (e) {}
  try {
    node.layoutSizingVertical = 'FIXED';
  } catch (e) {}
}

// === SNAPSHOT HELPERS (para docs/figma-snapshots/*.json) ===

// Coleta tree top-level + components + componentSets de uma página em 1 call MCP.
// Uso: const snap = await snapshotPage('🧩 Buttons'); console.log(JSON.stringify(snap));
async function snapshotPage(pageName) {
  const page = await switchToPage(pageName);
  const round = (n) => Math.round(n ?? 0);
  const tree = (page.children || []).map((n) => ({
    id: n.id,
    name: n.name,
    type: n.type,
    x: round(n.x),
    y: round(n.y),
    w: round(n.width),
    h: round(n.height),
    childCount: hasKids(n) ? n.children.length : 0,
  }));
  const components = [];
  const componentSets = [];
  walk(page, (n) => {
    if (n.type === 'COMPONENT') {
      components.push({ id: n.id, name: n.name, key: n.key || null });
    }
    if (n.type === 'COMPONENT_SET') {
      componentSets.push({
        id: n.id,
        name: n.name,
        key: n.key || null,
        variantCount: (n.children || []).length,
      });
    }
  });
  return {
    pageId: page.id,
    pageName: page.name,
    tree,
    components,
    componentSets,
    capturedAt: new Date().toISOString(),
  };
}

// Coleta variáveis, text/effect/paint styles e fontes — independente de página.
// Rodar quando a etapa criou/alterou tokens ou styles globais.
async function snapshotGlobals() {
  const textStyles = (await figma.getLocalTextStylesAsync()).map((s) => ({
    id: s.id,
    name: s.name,
    fontName: s.fontName,
  }));
  const effectStyles = (await figma.getLocalEffectStylesAsync()).map((s) => ({
    id: s.id,
    name: s.name,
  }));
  const paintStyles = (await figma.getLocalPaintStylesAsync()).map((s) => ({
    id: s.id,
    name: s.name,
  }));
  const variables = figma.variables.getLocalVariables().map((v) => ({
    id: v.id,
    name: v.name,
    resolvedType: v.resolvedType,
    collectionId: v.variableCollectionId,
  }));
  const collections = figma.variables.getLocalVariableCollections().map((c) => ({
    id: c.id,
    name: c.name,
    modes: c.modes.map((m) => m.name),
  }));
  return {
    textStyles,
    effectStyles,
    paintStyles,
    variables,
    collections,
    capturedAt: new Date().toISOString(),
  };
}
// === END HELPERS ===
```

## Guia rápido de uso

- `switchToPage('🧩 Buttons')` — **sempre** primeira linha útil do script.
- `mkFrame({ ... })` em vez de `figma.createFrame()` + setar 8 props.
- `appendAuto(parent, child)` em vez de `parent.appendChild(child)` — já previne o bug de `layoutPositioning=ABSOLUTE`.
- `bindFill(node, getVar('surface/background'))` em vez de montar o paint manualmente.
- `mkText({ chars, styleId: 'Body/Small', fillVar: getVar('content/secondary') })` — font e fills resolvidos de uma vez.
- Para resetar previews/cells após `fixSizing`: `walk(section, n => { if (n.name === 'preview') forceFixed(n, 200, 112); })`.

## Snapshot de fim de etapa

Antes de marcar etapa como concluída em `project_portfolio_etapas.md`, gerar o snapshot em `docs/figma-snapshots/phase-NN-<slug>.json`:

```js
// última call MCP da etapa
const snap = await snapshotPage('🧩 Buttons'); // tree + components + componentSets
const globals = await snapshotGlobals(); // styles + variables + collections
console.log(JSON.stringify({ page: snap, globals }, null, 2));
```

O JSON sai no stdout — Opus captura e salva via `Write`, depois atualiza `manifest.json` com a entrada nova. Custo esperado: **1–2 MCP calls por etapa** (não 56). Ver `docs/figma-snapshots/README.md` para schema completo.

## Quando NÃO usar

- Scripts triviais de inspeção (`get_metadata` é melhor).
- Código que precisa de alguma variação específica — aí inline, mas consciente do gotcha que o helper previne.

## Manutenção

Qualquer bug do `use_figma` que reaparecer 2+ vezes deve virar helper aqui. Atualizar junto com `reference_figma_playbook.md` na memória.
