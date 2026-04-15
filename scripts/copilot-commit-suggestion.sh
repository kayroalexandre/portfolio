#!/usr/bin/env bash
set -euo pipefail

echo "==> Verificando arquivos em stage..."
DIFF=$(git diff --staged)

if [ -z "$DIFF" ]; then
  echo "❌ Nenhum arquivo em stage. Adicione arquivos com 'git add' primeiro."
  exit 1
fi

# Abordagem 1: Usar o agente Python LLM Custom do projeto (se a chave existir)
if [ -n "${OPENAI_API_KEY:-}" ] && [ -f ".github/agents/run-model.py" ]; then
  MODEL="${OPENAI_MODEL:-glm-5.1}"
  echo "🧠 Usando modelo OpenCode AI ($MODEL) configurado localmente..."
  
  PROMPT="Gere uma mensagem de commit usando a convencao 'Conventional Commits' (feat, fix, docs, refactor, style, chore, etc.) para o seguinte diff. 
Seja conciso, responda APENAS com a mensagem de commit e nada mais (sem blocos de markdown no inicio/fim se possivel). Use titulo descritivo e, se necessario, algumas linhas de bullet points explicando (em portugues).
DIFF:
$DIFF"

  echo "$PROMPT" | python3 .github/agents/run-model.py
  exit 0
fi

# Abordagem 2: Tentar usar a nova Copilot CLI caso o desenvolvedor possua
if command -v github-copilot-cli >/dev/null 2>&1; then
  echo "🤖 Usando GitHub Copilot CLI integrado..."
  github-copilot-cli git-assist "Generate a conventional commit message for the staged changes"
  exit 0
fi

# Fallback: Aviso sobre a descontinuação
echo "⚠️  O fluxo antigo ('gh copilot') foi descontinuado pelo GitHub."
echo "Para habilitar as sugestões de commit personalizadas do projeto, exporte a chave da API (OpenCode/OpenAI):"
echo "   export OPENAI_API_KEY=\"sk-sua-chave\""
echo "   (Opcional) export OPENAI_MODEL=\"kimi-k2.5\""
echo ""
echo "Isso ativará o script nativo em '.github/agents/run-model.py' lendo seu 'git diff' atual!"
exit 1
