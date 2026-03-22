# Repo Conventions

## Contexto atual deste portfólio

- O destino principal é um portfólio em PT-BR.
- O material fonte dos cases vive em `cases/`.
- Os dois cases publicados hoje no app são `Monetix` e `UnimedPay`.
- Esta skill continua parando no Markdown fonte. A conversão para JSX acontece em um passo posterior do repositório.

## Fluxo editorial real do repo

Quando um case vai para produção neste projeto, o caminho atual é:

1. `cases/<slug>.md`
2. `cases/<slug>-image-map.md`
3. `src/app/data/<slug>Content.tsx`
4. registro em `src/app/data/projects.ts`
5. lazy import e mapeamento em `src/app/components/CaseStudyPage.tsx`

Para esta skill, isso implica:

- escrever o Markdown já pensando em headings estáveis;
- facilitar a futura conversão para JSX;
- não misturar instruções de frontend dentro do próprio case.

## Convenções úteis observadas

- O case costuma abrir com uma visão geral objetiva.
- Tabelas funcionam bem para problema, decisão, impacto, etapa e critério.
- Blockquotes só entram quando representam um insight real.
- Comparações antes/depois, grids de imagens e Mermaid são recursos válidos, mas sempre subordinados à narrativa factual.
- Mermaid é renderizado depois no app; aqui basta produzir sintaxe válida ou um brief factual do diagrama.

## Artefatos que valem consulta

- `cases/monetix.md`
- `cases/unimedpay.md`
- `cases/agent-layout-guidelines.md`
- `guidelines/Guidelines.md`

## Implicações práticas para a escrita

- Escreva para leitura humana primeiro.
- Preserve títulos de seção claros, literais e estáveis.
- Não invente metadados para “completar” o portfólio.
- Não escreva instruções de implementação React dentro do Markdown final.
