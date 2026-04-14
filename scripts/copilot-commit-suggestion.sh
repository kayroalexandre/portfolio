#!/usr/bin/env bash
set -euo pipefail

if ! command -v gh >/dev/null 2>&1; then
  echo "GitHub CLI nao encontrado. Instale o gh para usar sugestao de commit do Copilot."
  exit 1
fi

if ! gh extension list | grep -q "github/gh-copilot"; then
  echo "Extensao github/gh-copilot nao encontrada."
  echo "Execute: gh extension install github/gh-copilot"
  exit 1
fi

# Suggest does not support machine output; print a concise helper header.
echo "Sugestao de mensagem de commit (Copilot):"
gh copilot suggest --type commit
