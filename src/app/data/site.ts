const monetixCoverImage = new URL(
  "../../../cases/telas-monetix/Terminais de Pagamento.png",
  import.meta.url,
).href;

const monetixStatementImage = new URL(
  "../../../cases/telas-monetix/Extrato.png",
  import.meta.url,
).href;

const unimedPayCoverImage = new URL(
  "../../../cases/telas-unimedpay/Home.png",
  import.meta.url,
).href;

const unimedPaySalesImage = new URL(
  "../../../cases/telas-unimedpay/Vendas.png",
  import.meta.url,
).href;

const unimedPaySecurityImage = new URL(
  "../../../cases/telas-unimedpay/Segurança.png",
  import.meta.url,
).href;

export const portfolioMedia = {
  monetixCoverImage,
  monetixStatementImage,
  unimedPayCoverImage,
  unimedPaySalesImage,
  unimedPaySecurityImage,
};

export const siteConfig = {
  name: "Kayro Gomes",
  title: "Kayro Gomes | Product Design",
  heroImage: unimedPayCoverImage,
  heroImageAlt: "Tela inicial do case UnimedPay",
  heroIntro:
    "Designer de produto focado em clareza operacional, UX transacional e sistemas escaláveis.",
  heroSupport:
    "Este portfólio reúne recortes reais de produtos digitais em que estrutura, leitura e confiança precisavam caminhar juntas.",
  projectsIntro:
    "Os estudos de caso publicados aqui mostram problemas reais, decisões de design e a tradução disso em fluxos, interface e documentação.",
  servicesIntro:
    "Meu trabalho costuma atravessar discovery, arquitetura de informação, UX para operações complexas, design systems e handoff para implementação.",
  aboutIntro:
    "Sou Kayro Gomes, Product Designer. Trabalho em produtos digitais que precisam transformar regras, operação e contexto de negócio em experiências mais legíveis, consistentes e sustentáveis.",
  aboutSupport:
    "Os cases deste portfólio têm um recorte deliberado: menos volume genérico, mais problema real, raciocínio de produto e evidência visual do que foi decidido.",
  contactIntro:
    "Se o desafio envolve produto digital, operação complexa, fintech, healthtech, redesigns estruturais ou consolidação de design systems, você já pode mandar uma mensagem real por aqui.",
  contactAvailabilityReady:
    "O formulário desta página envia sua mensagem para meu inbox e também dispara uma confirmação automática para o e-mail informado.",
  contactAvailabilityPending:
    "O canal real de envio ainda não foi configurado neste ambiente. Assim que o FormSubmit e a URL pública forem definidos, o formulário passa a enviar de verdade.",
  contactResultReady:
    "Ao enviar, a mensagem chega por e-mail, fica registrada no archive do FormSubmit e uma confirmação automática é enviada para quem entrou em contato.",
  contactResultPending:
    "Neste ambiente o envio real permanece desativado até a configuração pública do FormSubmit ser concluída.",
  contactSuccessMessage:
    "Mensagem enviada com sucesso. Se o seu e-mail estiver correto, você também deve receber uma confirmação automática.",
  contactFormSubject: "Novo lead via portfolio - Kayro Gomes",
  contactAutoResponse:
    "Recebi sua mensagem pelo portfólio. Obrigado pelo contato. Vou revisar o contexto enviado e retorno assim que possível.",
  footerCta:
    "Disponível para conversar sobre produto, UX estratégico, fluxos críticos e design systems.",
  publicEmail: null as string | null,
  services: [
    {
      num: "01",
      title: "Discovery e síntese",
      description:
        "Pesquisa, leitura de contexto, análise de fricções e definição de prioridades com base no que realmente trava a experiência.",
    },
    {
      num: "02",
      title: "Arquitetura e UX",
      description:
        "Estruturação de fluxos, estados e lógica de navegação para reduzir ambiguidade e dar mais autonomia para o usuário.",
    },
    {
      num: "03",
      title: "Interface e prototipação",
      description:
        "Materialização das decisões em UI clara, consistente e pronta para validação com stakeholders, produto e engenharia.",
    },
    {
      num: "04",
      title: "Design systems e documentação",
      description:
        "Criação de base visual, componentes, regras de uso e documentação para sustentar escala e reduzir retrabalho.",
    },
  ],
  practice: [
    {
      title: "Framing do problema",
      body: "Definição do recorte, leitura das restrições e síntese do que realmente precisa mudar.",
    },
    {
      title: "Priorização e estrutura",
      body: "Organização de fluxos, estados e arquitetura de informação antes de refinar a camada visual.",
    },
    {
      title: "Prototipação e validação",
      body: "Iteração com stakeholders e engenharia para transformar direção em solução viável.",
    },
    {
      title: "Sistema e continuidade",
      body: "Design system, documentação e consistência para evitar que o produto volte à fragmentação.",
    },
  ],
  aboutGallery: [
    {
      src: monetixCoverImage,
      alt: "Tela de gestão operacional do case Monetix",
    },
    {
      src: unimedPaySalesImage,
      alt: "Tela de vendas e histórico do case UnimedPay",
    },
    {
      src: unimedPaySecurityImage,
      alt: "Tela de segurança do case UnimedPay",
    },
  ],
};
