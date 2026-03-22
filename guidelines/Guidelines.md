# Guideline — Portfolio Kayro Gomes

Documento de referência para manutenção e evolução do portfólio. Este arquivo descreve o estado real do código após a limpeza estrutural concluída em 2026-03-20.

---

## 1. Visão Geral

O projeto é um portfólio em PT-BR para apresentar estudos de caso de Product Design. A base técnica usa React, Vite, Tailwind CSS v4 e React Router.

Estado atual:

- branding e páginas públicas alinhados a `Kayro Gomes`;
- conteúdo institucional centralizado em `src/app/data/site.ts`;
- dois case studies publicados no app:
  - `Monetix`
  - `UnimedPay`
- fluxo editorial estabilizado em `markdown -> image map -> JSX -> rota`;
- título de documento e scroll entre rotas padronizados no app.

---

## 2. Fonte de Verdade

### App

- `src/app/routes.ts`
- `src/app/components/`
- `src/app/hooks/useDocumentTitle.ts`
- `src/app/data/site.ts`
- `src/app/data/projects.ts`
- `src/app/data/monetixContent.tsx`
- `src/app/data/unimedpayContent.tsx`

### Conteúdo

- `cases/monetix.md`
- `cases/monetix-image-map.md`
- `cases/unimedpay.md`
- `cases/unimedpay-image-map.md`

### Operação e memória

- `guidelines/ChatMemory-2026-03-20.md`
- `cases/agent-layout-guidelines.md`

Arquivos históricos:

- `guidelines/ChatMemory-2026-03-19.md`

### Skill local

- `codex-skills/product-design-case-study/`

---

## 3. Stack

| Tecnologia | Uso |
| --- | --- |
| React | renderização da interface |
| Vite | dev server e build |
| React Router | roteamento |
| Tailwind CSS v4 | estilos utilitários |
| Mermaid | diagramas nos cases |
| Lucide React | ícones |

Observações:

- o HTML base do app está em `pt-BR`;
- `react-responsive-masonry` foi removido do manifesto e do lockfile porque o runtime atual não usa mais esse pacote;
- o repositório ainda contém uma biblioteca `src/app/components/ui/` herdada do template, fora da experiência principal.

---

## 4. Estrutura Atual

```text
src/
  app/
    App.tsx
    routes.ts
    hooks/
      useDocumentTitle.ts
    components/
      Layout.tsx
      ScrollToTop.tsx
      Header.tsx
      Footer.tsx
      HomePage.tsx
      ProjectsPage.tsx
      AboutPage.tsx
      ContactPage.tsx
      CaseStudyPage.tsx
      ScrollZoomImage.tsx
      MermaidDiagram.tsx
      DynamicName.tsx
      figma/ImageWithFallback.tsx
    data/
      site.ts
      projects.ts
      monetixContent.tsx
      unimedpayContent.tsx
  styles/
    index.css
    fonts.css
    tailwind.css
    theme.css
```

---

## 5. Rotas

| Rota | Componente | Função |
| --- | --- | --- |
| `/` | `HomePage` | hero, resumo do trabalho e acesso aos cases |
| `/projects` | `ProjectsPage` | lista dos cases publicados |
| `/about` | `AboutPage` | posicionamento, serviços e prática |
| `/contact` | `ContactPage` | formulário real via FormSubmit |
| `/project/:slug` | `CaseStudyPage` | case study individual |

Todas as rotas são filhas de `Layout`.

Comportamentos compartilhados:

- `ScrollToTop.tsx` centraliza o scroll para o topo ao trocar de rota;
- `useDocumentTitle.ts` padroniza os títulos das páginas.

---

## 6. Conteúdo Institucional

O conteúdo institucional do site fica em `src/app/data/site.ts`.

Esse arquivo centraliza:

- hero;
- posicionamento;
- textos de apoio;
- serviços;
- prática de trabalho;
- contato;
- imagens institucionais reaproveitadas dos próprios cases.

Regra:

- sempre que mexer em copy institucional, preferir editar `site.ts` antes de espalhar texto em vários componentes.

---

## 7. Projetos Publicados

Os projetos publicados ficam em `src/app/data/projects.ts`.

Estrutura atual:

```ts
interface Project {
  slug: string;
  title: string;
  image: string;
  year: string;
  category: string;
  client: string;
  description: string;
  caseStudy?: "monetix" | "unimedpay";
}
```

Projetos disponíveis hoje:

1. `Monetix`
2. `UnimedPay`

Regras:

- não reintroduzir projetos fictícios ou placeholders de template;
- publicar só projetos com metadado consistente e imagem real;
- manter `projects.ts` como lista única de projetos publicados.

---

## 8. Case Studies

### Estrutura de publicação

1. Markdown fonte em `cases/<slug>.md`
2. Curadoria de imagens em `cases/<slug>-image-map.md`
3. Conversão para `src/app/data/<slug>Content.tsx`
4. Registro em `src/app/data/projects.ts`
5. Mapeamento lazy em `src/app/components/CaseStudyPage.tsx`

### Cases atuais

- `Monetix`
- `UnimedPay`

### Regras

- manter os cases em PT-BR;
- sustentar afirmações com material real;
- evitar excesso de imagens;
- tratar Mermaid como complemento narrativo, não decoração.

---

## 9. Componentes e Hooks Especiais

### `DynamicName.tsx`

- responsável pela marca tipográfica `KAYRO GOMES`;
- header e footer devem continuar visualmente alinhados.

### `ScrollZoomImage.tsx`

- usado no hero da home;
- aplica zoom reverso durante o scroll.

### `MermaidDiagram.tsx`

- renderiza diagramas Mermaid usados nos cases;
- continua sendo um dos pesos mais relevantes do bundle.

### `ImageWithFallback.tsx`

- utilitário herdado do template Figma;
- tratar como componente protegido.

### `ScrollToTop.tsx`

- centraliza o retorno ao topo entre páginas;
- evita repetir `window.scrollTo()` em cada rota.

### `useDocumentTitle.ts`

- centraliza o padrão de títulos do documento;
- evita strings soltas repetidas nos componentes.

---

## 10. Padrões Visuais

### Base

- fundo preto;
- tipografia Inter;
- contraste alto;
- uso frequente de `text-neutral-400` e `text-neutral-500` para hierarquia;
- bordas sutis com `border-white/10`.

### Nome da marca

- `clamp(3rem, 12vw, 12rem)`
- `fontWeight: 900`
- `lineHeight: 0.9`

### Seções

Padrão recorrente:

- coluna esquerda com ícone + label;
- coluna direita com título e texto;
- espaçamento horizontal `px-6 md:px-12`;
- divisórias sutis entre blocos maiores.

---

## 11. Página de Contato

Comportamento atual:

- `ContactPage.tsx` envia via `POST` nativo para o FormSubmit;
- o formulário público foi reduzido para `Nome`, `E-mail` e `Mensagem`;
- o retorno de sucesso acontece na própria rota via `/contact?sent=1`;
- o envio depende de duas env vars públicas:
  - `VITE_FORMSUBMIT_ACTION`
  - `VITE_SITE_URL`
- o formulário não usa AJAX porque o `_autoresponse` do FormSubmit depende do fluxo padrão com reCAPTCHA ativo.

Fluxo operacional:

1. ativar primeiro com o endpoint baseado em e-mail;
2. confirmar o e-mail enviado pelo FormSubmit;
3. trocar para o endpoint invisível/token aleatório;
4. validar o envio em domínio público.

---

## 12. Documentação e Memória

Sempre que houver uma mudança estrutural relevante:

1. atualizar este `Guidelines.md`;
2. registrar contexto em `guidelines/ChatMemory-AAAA-MM-DD.md`;
3. alinhar `cases/agent-layout-guidelines.md` se o fluxo de conversão mudar;
4. alinhar `codex-skills/product-design-case-study/references/repo-conventions.md` se a convenção editorial mudar;
5. alinhar `codex-skills/product-design-case-study/agents/openai.yaml` se o comportamento esperado da skill mudar.

---

## 13. Regras de Manutenção

1. Não reintroduzir copy, pessoas, empresas ou contatos do template original.
2. Não inventar metadados de projeto para “preencher” o portfólio.
3. Preferir imagens reais dos próprios projetos a imagens genéricas de stock.
4. Centralizar copy institucional em `site.ts`.
5. Centralizar lista de projetos em `projects.ts`.
6. Manter `react-router`, sem migrar para `react-router-dom`.
7. Manter Tailwind v4, sem criar `tailwind.config.js` desnecessário.
8. Não modificar `src/app/components/figma/ImageWithFallback.tsx` sem necessidade real.
9. Evitar adicionar novas dependências para resolver problemas já cobertos por componentes utilitários existentes.

---

## 14. Para Publicar um Novo Case

1. Criar ou revisar o markdown em `cases/<slug>.md`
2. Criar ou revisar `cases/<slug>-image-map.md`
3. Converter para `src/app/data/<slug>Content.tsx`
4. Adicionar o projeto em `src/app/data/projects.ts`
5. Estender a união `ProjectCaseStudy` se necessário
6. Adicionar o lazy import e o mapeamento em `src/app/components/CaseStudyPage.tsx`
7. Rodar `npm run build`

---

## 15. Saúde Atual

Na revisão ampla concluída em 2026-03-20:

- o build passou;
- os leftovers mais visíveis do template foram removidos das páginas públicas;
- o conteúdo institucional foi centralizado;
- a navegação recebeu scroll restoration compartilhado;
- os títulos das páginas foram padronizados;
- a documentação principal, a memória da sessão e a skill local foram realinhadas ao estado do código;
- o formulário de contato passou a estar pronto para envio real via FormSubmit.

Limitações conhecidas:

- ainda existem componentes e dependências herdados do template na pasta `src/app/components/ui/`;
- o bundle de Mermaid continua sendo um dos maiores pesos do app.
