# Implementacao Futura: Merge Queue na main

## Contexto

Atualmente, o repositorio ja esta com protecao forte em `main` e `develop` (PR obrigatorio, checks obrigatorios, revisao obrigatoria, sem force push, sem delete, resolucao de conversas).

O recurso **Merge Queue** ainda nao foi aceito pela API/plano atual do repositorio. Assim que estiver disponivel no plano/UI, seguir o fluxo abaixo.

## Passo a passo (quando o recurso estiver disponivel)

1. Acessar **Settings** do repositorio.
2. Ir em **Branches** (ou **Rulesets**, dependendo da UI disponivel).
3. Abrir a regra da branch **main**.
4. Ativar **Require merge queue**.
5. Manter os mesmos checks obrigatorios ja configurados:
   - Lint and Type Check
   - Run Tests
   - Build
   - Analyze JavaScript/TypeScript

## Script de verificacao periodica (gh api)

O script abaixo:

- Le a protecao atual da `main`
- Reaplica a protecao via endpoint de branch protection incluindo `required_merge_queue=true`
- Verifica se o retorno passou a refletir o recurso
- Se nao refletir, informa que o recurso ainda nao esta disponivel

```bash
#!/usr/bin/env bash
set -euo pipefail

OWNER="kayroalexandre"
REPO="portfolio"
BRANCH="main"

echo "[1/4] Lendo protecao atual da ${BRANCH}..."
gh api "repos/${OWNER}/${REPO}/branches/${BRANCH}/protection" > /tmp/main-protection-current.json

echo "[2/4] Montando payload com probe de merge queue..."
python3 - <<'PY'
import json
src = '/tmp/main-protection-current.json'
dst = '/tmp/main-protection-mergequeue-probe.json'
obj = json.load(open(src))

payload = {
  'required_status_checks': {
    'strict': obj['required_status_checks']['strict'],
    'checks': [{'context': c['context']} for c in obj['required_status_checks'].get('checks', [])]
  },
  'enforce_admins': obj['enforce_admins']['enabled'],
  'required_pull_request_reviews': {
    'dismiss_stale_reviews': obj['required_pull_request_reviews']['dismiss_stale_reviews'],
    'require_code_owner_reviews': obj['required_pull_request_reviews']['require_code_owner_reviews'],
    'required_approving_review_count': obj['required_pull_request_reviews']['required_approving_review_count'],
    'require_last_push_approval': obj['required_pull_request_reviews'].get('require_last_push_approval', False)
  },
  'restrictions': None,
  'required_linear_history': obj['required_linear_history']['enabled'],
  'allow_force_pushes': obj['allow_force_pushes']['enabled'],
  'allow_deletions': obj['allow_deletions']['enabled'],
  'block_creations': obj['block_creations']['enabled'],
  'required_conversation_resolution': obj['required_conversation_resolution']['enabled'],
  'lock_branch': obj['lock_branch']['enabled'],
  'allow_fork_syncing': obj['allow_fork_syncing']['enabled'],
  'required_merge_queue': True
}

json.dump(payload, open(dst, 'w'))
print('payload criado em', dst)
PY

echo "[3/4] Aplicando probe (pode falhar quando o recurso nao esta disponivel)..."
if gh api --method PUT "repos/${OWNER}/${REPO}/branches/${BRANCH}/protection" --input /tmp/main-protection-mergequeue-probe.json > /tmp/main-protection-after-probe.json 2> /tmp/main-protection-after-probe-error.txt; then
  echo "[4/4] Verificando suporte no retorno..."
  if rg -q "merge_queue|required_merge_queue" /tmp/main-protection-after-probe.json; then
    echo "OK: Merge Queue parece disponivel no retorno da API."
    echo "Revise tambem na UI: Settings -> Branches/Rulesets -> main."
  else
    echo "NOT AVAILABLE: recurso ainda nao exposto para este plano/UI/API."
    echo "A API aceitou o payload, mas o retorno nao refletiu suporte ao recurso."
    echo "Mantenha o agendamento periodico deste script."
  fi
else
  echo "[4/4] Verificando suporte no retorno..."
  echo "NOT AVAILABLE: recurso ainda nao exposto para este plano/UI/API."
  echo "A API rejeitou o campo de probe durante o PUT."
  echo "Resposta do GitHub:"
  cat /tmp/main-protection-after-probe-error.txt
  echo "Mantenha o agendamento periodico deste script."
  exit 0
fi
```

## Frequencia recomendada

- Executar mensalmente (ou apos mudanca de plano/licenca GitHub).
- Executar tambem quando houver mudanca relevante na UI de Branches/Rulesets.

## Observacoes

- O endpoint `PUT /branches/{branch}/protection` substitui a configuracao de protecao da branch.
- Campos nao incluidos no payload podem ser resetados ou removidos; revise o payload com cuidado antes de executar.
- Quando possivel, prefira Rulesets API/fluxo na UI para reduzir risco de sobrescrever opcoes nao mapeadas.
- Se o GitHub passar a suportar Merge Queue para este repositorio, a recomendacao oficial continua:
  - manter PR obrigatorio
  - manter status checks obrigatorios
  - manter revisao obrigatoria
  - usar Merge Queue para serializar integracoes em branch critica (`main`)
