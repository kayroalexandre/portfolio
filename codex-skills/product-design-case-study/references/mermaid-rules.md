# Mermaid Rules

## Regra-mãe

Só gere Mermaid quando houver estrutura factual suficiente para representar um raciocínio real.

Se faltarem etapas, atores, critérios, marcos ou ordem confiável, entregue um brief textual do diagrama em vez de sintaxe Mermaid.

## Tipos permitidos

- `journey`: para jornadas comparativas, fricções e estados emocionais ou operacionais.
- `flowchart`: para fluxos, decisões, arquitetura de informação ou caminhos críticos.
- `quadrantChart`: para priorização e trade-offs.
- `gantt`: para timeline, fases e marcos de projeto.

## Quando usar cada tipo

| Tipo | Use quando | Não use quando |
| --- | --- | --- |
| journey | houver sequência clara de experiência antes/depois | a história for só estrutural ou sistêmica |
| flowchart | houver fluxo, dependência ou decisão com ordem clara | o diagrama virar apenas decoração |
| quadrantChart | houver critérios de comparação consistentes | os eixos forem inventados depois |
| gantt | houver fases e marcos verificáveis | a timeline for especulativa |

## Regras de escrita

- Use labels curtos e inequívocos.
- Não invente etapas, emoções, números ou scores.
- Limite o diagrama ao que realmente ajuda o leitor.
- Prefira um diagrama forte a vários fracos.

## Saída esperada

Se houver evidência suficiente:

- entregue a sintaxe Mermaid;
- explique em uma linha a função narrativa do diagrama.

Se não houver evidência suficiente:

- entregue um brief textual curto;
- liste exatamente o que falta para transformar o brief em diagrama.
