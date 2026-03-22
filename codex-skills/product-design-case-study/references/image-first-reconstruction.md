# Image-First Reconstruction

## Objetivo

Use este fluxo quando o case ainda não existe em texto consistente e o principal insumo são telas, screenshots ou recortes do produto.

O objetivo não é descrever telas aleatoriamente. O objetivo é reconstruir uma narrativa factual e diagramas úteis a partir do que as telas mostram e do que o usuário confirmar.

## Regra central

Imagem mostra interface. Imagem não mostra, sozinha:

- contexto de negócio completo;
- intenção da equipe;
- ordem cronológica real do projeto;
- motivo exato de cada decisão;
- resultado quantitativo;
- autoria individual;
- o que era legado versus redesign, a menos que isso seja explicitamente visível.

Tudo isso precisa ser confirmado em perguntas.

## Fluxo de trabalho

### 1. Inventarie as telas

- Liste todas as imagens.
- Agrupe por famílias visuais ou funcionais.
- Detecte redundâncias, variações pequenas e arquivos ambíguos.

### 2. Leia cada tela como evidência

Para cada imagem, registre apenas observações visuais seguras:

- plataforma e formato;
- tipo de tela ou módulo aparente;
- navegação visível;
- CTA principal;
- filtros, tabelas, cards, estados e mensagens;
- termos de domínio que aparecem no layout;
- densidade visual;
- sinais de erro, vazio, onboarding, confirmação ou comparação.

### 3. Monte fluxos candidatos

- Agrupe telas que parecem pertencer ao mesmo fluxo.
- Ordene apenas quando a sequência estiver visualmente clara.
- Quando a ordem não for clara, assuma que ela está em aberto e pergunte.

### 4. Faça a entrevista guiada

Faça quantas perguntas forem necessárias para fechar as lacunas que as imagens não resolvem.

As perguntas mais comuns neste modo são:

- Qual é o nome do produto e do projeto?
- Qual tela é legado e qual é redesign?
- Qual era o principal problema percebido pelo usuário?
- Qual parte do fluxo você desenhou e qual parte já existia?
- Qual é a ordem correta dessas telas?
- O que mudou de uma versão para outra?
- Quais foram as restrições técnicas, de prazo ou compliance?
- Há métricas, feedbacks ou evidências de impacto?
- Quais telas devem entrar e quais devem ficar de fora?

## Como extrair diagramas a partir de imagens

### Journey

Use quando as telas, combinadas com a confirmação do usuário, mostram antes/depois ou uma sequência de fricção e resolução.

### Flowchart

Use quando as telas mostram etapas, escolhas, modais, confirmações ou mudança de estado e o usuário confirmar a ordem do fluxo.

### QuadrantChart

Raramente nasce só das imagens. Só use se houver insumo adicional que confirme critérios e eixos.

### Gantt

Não reconstrua timeline só pelas telas. Use apenas se o usuário fornecer fases, marcos ou ordem temporal do projeto.

## Saída intermediária recomendada

Antes do texto final, entregue algo assim:

1. Observações visuais seguras.
2. Fluxos candidatos.
3. Imagens promissoras para o case.
4. Perguntas críticas.
5. Hipóteses proibidas.

## Anti-padrões

- Narrar a tela como se isso já fosse um case study.
- Inventar o problema a partir da aparência visual.
- Assumir que telas parecidas são sequência.
- Assumir que toda imagem merece entrar no case.
- Gerar Mermaid sem confirmação da estrutura real.
