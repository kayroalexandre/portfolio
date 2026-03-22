---
name: product-design-case-study
description: Reescreva, estruture ou reconstrua case studies de Product Design e UX/UI com base em markdown, screenshots, notas e evidências existentes. Use quando o trabalho envolver auditar material já existente, reconstruir narrativa e diagramas a partir apenas de imagens de tela, selecionar poucas imagens realmente necessárias, gerar ou revisar Mermaid com lastro factual, fazer quantas perguntas forem necessárias para fechar lacunas críticas e entregar um case coeso, sem alucinações, sem informação aleatória e sem converter o conteúdo para JSX.
---

# Product Design Case Study

## Overview

Use esta skill para transformar material bruto de um projeto em um case study de alto nível, coeso e factual.

Trabalhe em PT-BR por padrão. Reescreva o case em Markdown fonte. Não converta o conteúdo para JSX nesta skill.

Esta skill agora suporta dois caminhos de reconstrução:

- `source-led`: quando existe texto, notas ou estrutura parcial do case;
- `image-first`: quando o principal insumo são screenshots ou telas do produto, e o texto ainda precisa ser reconstruído.

## Workflow

### 1. Audite as fontes antes de escrever

- Leia o markdown, notas e qualquer material textual disponível.
- Se houver uma pasta de imagens, rode `node scripts/inventory_case_assets.mjs <markdown> <pasta-de-imagens>` para mapear volume, grupos redundantes e arquivos potencialmente úteis.
- Monte um mapa com três listas:
  - fatos comprovados;
  - hipóteses proibidas;
  - lacunas que impedem um case forte.
- Não comece pela escrita. Primeiro entenda o que é evidência, o que é ruído e o que ainda falta.
- Se quase não houver texto e a principal fonte forem screenshots, mude explicitamente para o modo `image-first`.

### 2. Escolha o modo de trabalho

- Use `rewrite-case` quando já existir um case, rascunho ou markdown relativamente completo.
- Use `salvage-from-fragments` quando o material estiver fragmentado entre notas, screenshots, diagramas soltos e contexto parcial.
- Use `reconstruct-from-images` quando o objetivo for montar o texto do case e os diagramas principalmente a partir da análise das telas do produto.

### 3. Quando estiver em `reconstruct-from-images`, reconstrua o caso em duas camadas

- Leia `references/image-first-reconstruction.md`.
- Analise cada imagem primeiro como evidência visual, não como ilustração.
- Para cada tela, extraia apenas o que é visível com segurança:
  - plataforma;
  - módulo ou fluxo aparente;
  - objetivo provável da tela;
  - estados;
  - hierarquia visual;
  - labels, filtros, tabelas, CTAs, mensagens e sinais de erro;
  - indícios de antes/depois ou de evolução.
- Depois agrupe as telas por fluxo, funcionalidade ou estágio da experiência.
- Só então proponha uma narrativa candidata e um conjunto candidato de diagramas.
- Marque claramente o que é:
  - observação visual segura;
  - inferência provisória;
  - lacuna que precisa de resposta do usuário.

### 4. Estruture o outline obrigatório

- Use `references/case-schema.md` para montar a espinha dorsal do case.
- Exija evidência mínima por seção.
- Se uma seção relevante não tiver base factual suficiente, faça uma destas ações:
  - pergunte;
  - omita;
  - nunca complete com texto genérico.

### 5. Faça perguntas só quando elas realmente mudarem a qualidade do case

- Pergunte em blocos curtos e cirúrgicos.
- Priorize apenas lacunas que alteram o valor do case:
  - papel real no projeto;
  - autoria de decisões versus execução;
  - métricas ou impacto;
  - restrições técnicas, regulatórias ou operacionais;
  - contexto de imagens ambíguas;
  - ordem correta de fluxos ou marcos.
- Se uma resposta não mudar a qualidade estrutural do case, não pergunte.
- No modo `reconstruct-from-images`, faça quantas perguntas forem necessárias para fechar:
  - nome real do produto, fluxo ou módulo;
  - ordem correta das telas;
  - o que é legado versus redesign;
  - qual problema cada fluxo tentava resolver;
  - o que de fato foi desenhado por você;
  - resultados, restrições e decisões que não aparecem visualmente.
- Não reduza o número de perguntas só para parecer eficiente. Reduza apenas perguntas desnecessárias.

### 6. Reescreva com política factual rígida

- Afirme apenas o que puder ancorar no material existente ou em resposta explícita do usuário.
- Não invente:
  - contexto;
  - números;
  - causalidade;
  - intenção da equipe;
  - resultados;
  - nomes de artefatos de pesquisa;
  - lógica por trás de uma tela sem evidência.
- Corte repetições, frases vagas, trechos aleatórios e claims de marketing sem lastro.
- Garanta que cada seção avance a narrativa em vez de repetir a anterior.

### 7. Faça curadoria agressiva de imagens

- Leia `references/image-curation.md` quando houver assets visuais.
- Trate imagem como evidência narrativa, nunca como decoração.
- Independentemente da quantidade de imagens disponíveis, use apenas as que forem realmente importantes e necessárias.
- Descarte imagens redundantes, repetitivas, pouco legíveis ou sem função clara.
- Para cada imagem escolhida, registre:
  - o que ela mostra;
  - por que entra naquele ponto da narrativa;
  - qual claim do texto ela sustenta;
  - uma legenda curta e contextual.
- Se o nome do arquivo não bastar para inferir contexto, pergunte antes de usar a imagem como prova.
- No modo `image-first`, comece analisando muitas imagens e termine usando poucas.

### 8. Gere Mermaid só quando houver evidência suficiente

- Leia `references/mermaid-rules.md` antes de propor ou escrever diagramas.
- Permita apenas:
  - `journey`;
  - `flowchart`;
  - `quadrantChart`;
  - `gantt`.
- Gere sintaxe Mermaid apenas quando a estrutura factual estiver clara.
- Se faltar evidência, devolva um brief textual do diagrama pendente de resposta do usuário.
- No modo `image-first`, derive diagramas da combinação entre:
  - o que é visível nas telas;
  - a ordem confirmada pelo usuário;
  - o problema e a decisão confirmados em perguntas.

### 9. Feche com revisão de coesão

- Leia `references/consistency-checklist.md` antes de concluir.
- Rode `node scripts/validate_case_markdown.mjs <markdown-final>` para checar estrutura, ordem narrativa, placeholders e Mermaid.
- Confirme que:
  - o problema aparece antes da solução;
  - decisões aparecem antes dos resultados;
  - imagens sustentam trechos específicos;
  - o texto não deixa lacunas narrativas.

## Output Contract

Quando houver evidência suficiente para escrever:

1. Entregue o case reescrito em Markdown.
2. Entregue uma seleção enxuta de imagens com função narrativa explícita.
3. Entregue Mermaid pronto ou um brief textual do diagrama que ainda depende de resposta.
4. Liste perguntas pendentes apenas se elas bloquearem clareza, precisão ou coerência.

Quando o case estiver sendo reconstruído principalmente a partir de imagens:

1. Entregue antes um mapa de observações visuais, fluxos candidatos e lacunas.
2. Faça as perguntas necessárias para transformar essas observações em narrativa factual.
3. Só depois escreva o case e os diagramas.
4. Se ainda faltar base, não force um texto final.

Quando a evidência ainda for insuficiente:

1. Não improvise um case final.
2. Entregue um diagnóstico curto das lacunas.
3. Faça apenas as perguntas indispensáveis para fechar o caso.

## References

- Leia `references/case-schema.md` para a estrutura canônica e o nível mínimo de evidência por seção.
- Leia `references/repo-conventions.md` quando o case for destinado a este portfólio.
- Leia `references/image-curation.md` sempre que houver mais de algumas imagens ou nomes ambíguos.
- Leia `references/image-first-reconstruction.md` sempre que o insumo principal for screenshot, tela ou fluxo visual.
- Leia `references/mermaid-rules.md` antes de escrever qualquer diagrama.
- Leia `references/consistency-checklist.md` no último passo, antes da entrega.

## Scripts

- Use `node scripts/inventory_case_assets.mjs <markdown> <pasta-de-imagens> --format markdown` para inventariar assets e detectar excesso, grupos repetidos e arquivos já referenciados.
- Use `node scripts/validate_case_markdown.mjs <markdown-final>` para validar a estrutura do case antes da entrega.

## Non-Negotiables

- Não use todas as imagens só porque elas existem.
- Não esconda lacunas sob texto bonito.
- Não trate imagem como licença para inventar contexto invisível.
- Não produza causalidade sem prova.
- Não apresente resultados sem antes explicar problema, decisão e contexto.
- Não troque precisão por “tom de case study”.
