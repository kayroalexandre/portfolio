# Monetix — mapa visual selecionado

Este documento registra apenas as imagens realmente necessárias para sustentar a narrativa do case. O objetivo é evitar excesso visual, repetição e uso de arquivos sem contexto suficiente.

## Imagens selecionadas

| Arquivo | Seção | O que mostra | Por que entra | Claim sustentado | Legenda sugerida |
| --- | --- | --- | --- | --- | --- |
| `./telas-monetix/Login-5.png` | Evolução visual e fluxos / Entrada e estados críticos | Tela de login em versão web | Marca a mudança de clareza logo no primeiro contato com o produto | O redesign reorganizou hierarquia, cor e foco da interface desde a autenticação | Tela de login com hierarquia mais clara e CTA principal mais evidente |
| `./telas-monetix/Login - Erro.png` | Evolução visual e fluxos / Entrada e estados críticos | Estado de erro no login | Prova que o projeto deixou de desenhar apenas o happy path | O redesign passou a tratar estados de erro e feedback contextual como parte da experiência | Estado de erro com feedback contextual e menor ambiguidade |
| `./telas-monetix/Extrato.png` | Evolução visual e fluxos / Interpretação de extrato e recebíveis | Fluxo do extrato em versão mobile | Conecta diretamente com a dor mais recorrente do case: interpretação dos dados financeiros | O redesign aproximou contexto e valor, reduzindo fricção em leitura de recebíveis | Exemplo de reorganização da informação no fluxo de extrato |
| `./telas-monetix/Simulador de taxas (Web).png` | Evolução visual e fluxos / Ativação de funcionalidade com compliance visível | Simulação de taxas em versão web | Mostra um ponto em que clareza visual e regra de negócio precisam coexistir | O projeto lidou com informação sensível e compliance sem gerar ruído desnecessário | Simulador de taxas com leitura mais clara das condições da operação |
| `./telas-monetix/Terminais de Pagamento.png` | Evolução visual e fluxos / Gestão operacional dos terminais | Lista de terminais com status e taxas | Expande o case além do extrato e mostra leitura operacional mais organizada | O redesign também melhorou a interpretação de estados e gestão operacional | Gestão de terminais com status, localização e taxas organizados |

## Imagens deliberadamente excluídas

### Cluster `Frame`

Os arquivos `Frame 127.png` a `Frame 151.png` foram deixados de fora nesta versão porque o nome dos arquivos não fornece contexto suficiente para afirmar, com segurança, qual fluxo ou decisão cada tela representa. Eles só devem entrar no case quando houver mapeamento explícito do que cada um prova.

### Clusters muito repetitivos

Os clusters `Extrato` e `Login` têm muitas variações. Nesta versão, a seleção ficou nos arquivos que já bastam para sustentar os argumentos centrais sem inflar a narrativa visual.

## Critério aplicado

- Priorizar prova narrativa sobre volume.
- Evitar galerias longas de estados parecidos.
- Não usar arquivos ambíguos como se fossem evidência inequívoca.
- Manter apenas o que ajuda o leitor a entender o raciocínio do projeto.
