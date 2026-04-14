# Cloud Agent Playbook

## Quando usar

- Bugs de media/alta complexidade
- Refactors amplos com risco de regressao
- Tarefas multi-etapas com dependencia de varios arquivos

## Como solicitar

Descreva:

1. objetivo de negocio
2. escopo tecnico
3. restricoes
4. criterios de aceite

## Prompt base

"Analise o repositorio, proponha plano em etapas, implemente com menor diff possivel, rode lint/type-check/test/build e abra PR com resumo tecnico."

## Validacao humana obrigatoria

Antes de merge:

- revisar diff por arquivo
- revisar risco de seguranca
- validar impacto em performance e acessibilidade
- confirmar cobertura de testes
