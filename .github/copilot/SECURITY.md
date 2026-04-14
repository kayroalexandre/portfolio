# Copilot Security Guidelines

## Objetivo

Definir limites de uso do Copilot no repositorio para reduzir risco de vazamento de dados e regressao de seguranca.

## Nao compartilhar

- Tokens, senhas, chaves privadas, credenciais e segredos
- Dados pessoais de usuarios
- Trechos de codigo proprietario fora do escopo autorizado

## Revisao obrigatoria

Toda sugestao do Copilot deve ser revisada por humano antes de merge.

Checklist minimo:

- Validacao de input
- Ausencia de credenciais hardcoded
- Tratamento de erros consistente
- Nao introduzir dependencia insegura

## Ferramentas de apoio

- CodeQL (workflow em `.github/workflows/codeql-analysis.yml`)
- Dependabot (quando habilitado)
- ESLint + testes automatizados

## Auditoria

Para ambiente Enterprise, monitore eventos relacionados ao Copilot via audit log da organizacao.
