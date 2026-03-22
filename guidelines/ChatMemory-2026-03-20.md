# Memória de contexto da sessão — 2026-03-20

## Objetivo deste arquivo

Consolidar o estado real do repositório após a limpeza estrutural, editorial e documental feita nesta data, para retomadas futuras sem depender do histórico do chat.

## Resumo executivo

- O projeto é um portfólio em `React + Vite + Tailwind CSS v4 + React Router`.
- O app está em PT-BR e hoje tem cinco rotas principais:
  - `/`
  - `/projects`
  - `/about`
  - `/contact`
  - `/project/:slug`
- O branding, as páginas públicas e a documentação principal foram realinhados a `Kayro Gomes`.
- O portfólio publicado foi reduzido ao que está de fato pronto e consistente:
  - `Monetix`
  - `UnimedPay`

## Estado atual do app

### Estrutura principal

- `src/app/components/`
  - páginas públicas, layout e componentes utilitários;
- `src/app/data/`
  - `site.ts` centraliza conteúdo institucional e mídia reaproveitada dos próprios cases;
  - `projects.ts` centraliza os projetos publicados;
  - `monetixContent.tsx` e `unimedpayContent.tsx` concentram os case studies renderizados;
- `src/app/hooks/`
  - `useDocumentTitle.ts` padroniza títulos das páginas;
- `src/styles/`
  - base global do projeto.

### Navegação compartilhada

- `Layout.tsx` injeta `Header`, `Outlet` e `Footer`.
- `ScrollToTop.tsx` foi adicionado para restaurar o scroll ao topo em toda troca de rota.
- `Header.tsx` agora destaca `Projetos` também nas rotas `/project/:slug`.

### Páginas públicas

- `HomePage.tsx`
  - usa copy real do portfólio;
  - exibe somente cases publicados;
  - não carrega mais texto herdado do template.
- `AboutPage.tsx`
  - substituiu personas e experiências fictícias por posicionamento, serviços e prática real;
  - recebeu ajustes de acessibilidade no accordion.
- `ProjectsPage.tsx`
  - lista apenas os cases publicados;
  - deixou de depender de `react-responsive-masonry`.
- `ContactPage.tsx`
  - usa `POST` nativo para o FormSubmit;
  - reduz o formulário para `name`, `email` e `message`;
  - volta para `/contact?sent=1` após o envio;
  - depende de `VITE_FORMSUBMIT_ACTION` e `VITE_SITE_URL`.
- `Footer.tsx`
  - reflete CTA e canal de contato reais, sem links sociais fictícios.

### Metadados e HTML base

- `index.html` agora está com `lang="pt-BR"`.
- Foi adicionada `meta description`.
- O título base passou a ser `Kayro Gomes | Product Design`.
- Os títulos das páginas agora são definidos por `useDocumentTitle.ts`.

## Fonte de verdade dos projetos

Arquivo principal:

- `src/app/data/projects.ts`

Estado atual:

- existem `2` projetos publicados;
- ambos possuem `caseStudy` com resolução lazy em `CaseStudyPage.tsx`;
- não há mais placeholders de template nem projetos fictícios na vitrine principal.

## Fluxo editorial vigente

1. O case nasce em `cases/<slug>.md`.
2. A curadoria visual é registrada em `cases/<slug>-image-map.md`.
3. O conteúdo final é convertido para `src/app/data/<slug>Content.tsx`.
4. O projeto é registrado em `src/app/data/projects.ts`.
5. `CaseStudyPage.tsx` resolve o conteúdo via `caseStudy` + lazy import.

Observação importante:

- o fluxo antigo baseado em chave `content:` dentro de `projects.ts` foi aposentado;
- `cases/agent-layout-guidelines.md` e `codex-skills/product-design-case-study/references/repo-conventions.md` foram atualizados para o fluxo atual.

## Skill local

Diretório:

- `codex-skills/product-design-case-study/`

Estado após a limpeza:

- a skill continua focada em reescrever ou reconstruir cases em Markdown;
- a referência do repositório foi atualizada para o estado real do portfólio;
- `agents/openai.yaml` foi alinhado para enfatizar:
  - PT-BR;
  - rigor factual;
  - curadoria enxuta de imagens;
  - proibição de converter para JSX dentro da skill.

## Documentação alinhada nesta sessão

- `README.md`
- `guidelines/Guidelines.md`
- `guidelines/ChatMemory-2026-03-20.md`
- `cases/agent-layout-guidelines.md`
- `codex-skills/product-design-case-study/references/repo-conventions.md`
- `codex-skills/product-design-case-study/agents/openai.yaml`

Arquivo histórico:

- `guidelines/ChatMemory-2026-03-19.md`

## Higiene técnica concluída

- remoção de copy e contatos fictícios herdados do template nas páginas públicas;
- centralização da copy institucional em `src/app/data/site.ts`;
- remoção de `react-responsive-masonry` do `package.json` e do `pnpm-lock.yaml`;
- preparação do formulário real de contato via FormSubmit;
- correção de pequenas inconsistências de interface:
  - classes redundantes;
  - títulos de página;
  - scroll restoration;
  - destaque correto da navegação;
  - atributos básicos de acessibilidade em botões e accordion.

## Dependências e legado

Estado atual do runtime principal:

- `react`
- `react-dom`
- `react-router`
- `lucide-react`
- `mermaid`

Legado que ainda existe no repo:

- a pasta `src/app/components/ui/` continua presente como biblioteca herdada do template;
- isso ainda sustenta parte das dependências legadas do repositório, embora a experiência principal do portfólio quase não dependa dessa pasta.

## Validação executada

Comando executado:

- `npm run build`

Resultado:

- build passou com sucesso após a refatoração das páginas e da documentação;
- o bundle editorial dos cases permaneceu controlado;
- `MermaidDiagram` continua sendo um dos maiores pesos do build.

## Observações sobre codificação

- a acentuação quebrada que apareceu em algumas leituras do terminal era ruído de console;
- ao reler com `UTF-8`, os arquivos apareceram corretamente;
- conclusão prática: os arquivos estão salvos corretamente em UTF-8.

## Limitações desta sessão

- o ambiente não expôs os metadados de `.git`;
- por isso não foi possível validar branch, status ou histórico de commits.

Essa limitação afeta apenas versionamento, não a leitura nem a edição do workspace.

## Próximos passos naturais, se necessário

- ativar o endpoint do FormSubmit e trocar do endpoint baseado em e-mail para o token invisível;
- validar em domínio público o recebimento do lead e o autoresponse;
- revisar se a pasta `src/app/components/ui/` deve continuar inteira no repositório;
- avaliar otimizações adicionais para o peso do Mermaid;
- publicar novos cases seguindo o fluxo atualizado documentado nesta sessão.
