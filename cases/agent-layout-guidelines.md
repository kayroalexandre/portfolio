# Diretrizes de Layout para Case Studies

Este documento descreve o padrão atual para converter um case em Markdown para JSX dentro deste portfólio.

O objetivo é manter consistência visual, integração correta com o app e alinhamento com o fluxo real de publicação do repositório.

---

## Estrutura Base

O conteúdo customizado do case deve ser exportado como um componente React e renderizado dentro de um container centralizado.

```tsx
export function NomeDoCaseContent() {
  return (
    <div
      className="max-w-4xl space-y-20 text-neutral-400"
      style={{ fontSize: "0.95rem", lineHeight: 1.8 }}
    >
      {/* seções do case */}
    </div>
  );
}
```

Regras:

- manter `max-w-4xl` como largura padrão de leitura;
- usar `space-y-20` para separar grandes blocos narrativos;
- preservar contraste alto com texto branco para títulos e neutros para apoio.

---

## Tipografia

Padrões mais comuns:

- `h3`: `<h3 className="mb-6 text-2xl font-bold text-white">`
- `h4`: `<h4 className="mb-4 text-lg font-bold text-white">`
- parágrafo base: `<p className="mb-6">`
- destaque simples: usar `<strong>` quando necessário, sem inventar estilos extras

Evitar:

- blocos muito longos sem respiro;
- variação visual excessiva de heading;
- estilos que destoem do fundo escuro e da hierarquia já usada em `Monetix` e `UnimedPay`.

---

## Tabelas

Quando o case precisar cruzar problema, decisão, impacto ou critério, usar tabela limpa e discreta.

```tsx
<div className="mb-6 overflow-x-auto">
  <table className="w-full border-collapse text-left">
    <thead>
      <tr className="border-b border-white/10">
        <th className="py-3 font-medium text-white">Coluna 1</th>
        <th className="py-3 font-medium text-white">Coluna 2</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-white/10">
      <tr>
        <td className="py-3 pr-4 text-white">Linha 1</td>
        <td className="py-3">Valor ou leitura</td>
      </tr>
    </tbody>
  </table>
</div>
```

---

## Cards, Citações e Listas

Cards:

```tsx
<div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3">
  <div className="rounded-lg border border-white/10 bg-white/5 p-6">
    <h5 className="mb-2 font-bold text-white">Título</h5>
    <p className="text-sm">Texto curto e objetivo.</p>
  </div>
</div>
```

Blockquote:

```tsx
<blockquote className="my-8 border-l-2 border-white/20 py-2 pl-6 text-lg italic text-white">
  "Citação ou insight sustentado pelo material."
</blockquote>
```

Lista:

```tsx
<ul className="list-disc space-y-2 pl-5">
  <li>Ponto importante</li>
  <li>Ponto importante</li>
</ul>
```

---

## Imagens

Para comparações ou telas lado a lado:

```tsx
<div className="my-8 grid grid-cols-1 gap-6 md:grid-cols-2">
  <figure>
    <img
      src="PATH_OU_URL"
      alt="Descrição objetiva da tela"
      className="w-full rounded-lg border border-white/10"
    />
    <figcaption className="mt-3 text-center text-sm text-white/80">
      Legenda opcional
    </figcaption>
  </figure>
</div>
```

Regras:

- usar apenas imagens que sustentem a narrativa;
- preferir alt text descritivo e literal;
- manter borda sutil com `border-white/10`.

---

## Diagramas Mermaid

Quando houver base factual suficiente, usar o componente `MermaidDiagram`.

```tsx
import { MermaidDiagram } from "../components/MermaidDiagram";

<MermaidDiagram
  chart={`
    flowchart TD
      A[Etapa A] --> B[Etapa B]
  `}
/>
```

Os tipos permitidos neste portfólio seguem a convenção editorial atual:

- `journey`
- `flowchart`
- `gantt`
- `quadrantChart`

---

## Fluxo de Integração Atual

Depois de converter o Markdown para JSX:

1. Criar `src/app/data/<slug>Content.tsx`.
2. Exportar o componente do case, por exemplo `MinhaMarcaContent`.
3. Adicionar ou revisar o projeto em `src/app/data/projects.ts`.
4. Preencher `caseStudy` com o slug publicado.
5. Se for um slug novo, estender a união `ProjectCaseStudy`.
6. Registrar o lazy import e o `caseStudyContentMap` em `src/app/components/CaseStudyPage.tsx`.
7. Rodar `npm run build`.

Importante:

- o app não usa mais uma chave `content:` dentro de `projects.ts`;
- a resolução do conteúdo é feita por `caseStudy` + lazy import em `CaseStudyPage.tsx`;
- não é necessário alterar layout global para publicar um novo case, desde que o componente siga o padrão acima.
