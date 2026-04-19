import { portfolioMedia } from './project-media';

export interface SiteService {
  readonly num: string;
  readonly title: string;
  readonly description: string;
}

export interface SitePracticeEntry {
  readonly title: string;
  readonly body: string;
}

export interface SiteGalleryImage {
  readonly src: string;
  readonly alt: string;
}

export interface SiteNavigationItem {
  readonly label: string;
  readonly href: '/' | '/projects' | '/about' | '/contact';
  readonly isActive: (pathname: string) => boolean;
}

export interface SiteConfig {
  readonly name: string;
  readonly title: string;
  readonly heroImage: string;
  readonly heroImageAlt: string;
  readonly heroIntro: string;
  readonly heroSupport: string;
  readonly projectsIntro: string;
  readonly servicesIntro: string;
  readonly aboutIntro: string;
  readonly aboutSupport: string;
  readonly contactIntro: string;
  readonly contactAvailabilityReady: string;
  readonly contactAvailabilityPending: string;
  readonly contactResultReady: string;
  readonly contactResultPending: string;
  readonly contactSuccessMessage: string;
  readonly contactFormSubject: string;
  readonly contactAutoResponse: string;
  readonly footerCta: string;
  readonly publicEmail: string | null;
  readonly services: SiteService[];
  readonly practice: SitePracticeEntry[];
  readonly aboutGallery: SiteGalleryImage[];
}

export const siteNavigationItems: readonly SiteNavigationItem[] = [
  {
    label: 'Início',
    href: '/',
    isActive: (pathname) => pathname === '/',
  },
  {
    label: 'Projetos',
    href: '/projects',
    isActive: (pathname) => pathname === '/projects' || pathname.startsWith('/project/'),
  },
  {
    label: 'Sobre',
    href: '/about',
    isActive: (pathname) => pathname === '/about',
  },
  {
    label: 'Contato',
    href: '/contact',
    isActive: (pathname) => pathname === '/contact',
  },
] as const;

export const siteConfig: SiteConfig = {
  name: 'Kayro Gomes',
  title: 'Kayro Gomes | Product Design',
  heroImage: '/hero-profile.png',
  heroImageAlt: 'Foto pessoal de Kayro Gomes',
  heroIntro:
    'Designer de produto focado em clareza operacional, UX transacional e sistemas escaláveis.',
  heroSupport:
    'Este portfólio reúne recortes reais de produtos digitais em que estrutura, leitura e confiança precisavam caminhar juntas.',
  projectsIntro:
    'Os estudos de caso publicados aqui mostram problemas reais, decisões de design e a tradução disso em fluxos, interface e documentação.',
  servicesIntro:
    'Meu trabalho costuma atravessar discovery, arquitetura de informação, UX para operações complexas, design systems e handoff para implementação.',
  aboutIntro:
    'Sou Kayro Gomes, Product Designer. Trabalho em produtos digitais que precisam transformar regras, operação e contexto de negócio em experiências mais legíveis, consistentes e sustentáveis.',
  aboutSupport:
    'Os cases deste portfólio têm um recorte deliberado: menos volume genérico, mais problema real, raciocínio de produto e evidência visual do que foi decidido.',
  contactIntro:
    'Se o desafio envolve produto digital, operação complexa, fintech, healthtech, redesigns estruturais ou consolidação de design systems, você já pode mandar uma mensagem real por aqui.',
  contactAvailabilityReady:
    'O formulário desta página envia sua mensagem para meu inbox e também dispara uma confirmação automática para o e-mail informado.',
  contactAvailabilityPending:
    'O canal real de envio ainda não foi configurado neste ambiente. Assim que o FormSubmit e a URL pública forem definidos, o formulário passa a enviar de verdade.',
  contactResultReady:
    'Ao enviar, a mensagem chega por e-mail, fica registrada no archive do FormSubmit e uma confirmação automática é enviada para quem entrou em contato.',
  contactResultPending:
    'Neste ambiente o envio real permanece desativado até a configuração pública do FormSubmit ser concluída.',
  contactSuccessMessage:
    'Mensagem enviada com sucesso. Se o seu e-mail estiver correto, você também deve receber uma confirmação automática.',
  contactFormSubject: 'Novo lead via portfolio - Kayro Gomes',
  contactAutoResponse:
    'Recebi sua mensagem pelo portfólio. Obrigado pelo contato. Vou revisar o contexto enviado e retorno assim que possível.',
  footerCta:
    'Disponível para conversar sobre produto, UX estratégico, fluxos críticos e design systems.',
  publicEmail: null as string | null,
  services: [
    {
      num: '01',
      title: 'Discovery e síntese',
      description:
        'Pesquisa, leitura de contexto, análise de fricções e definição de prioridades com base no que realmente trava a experiência.',
    },
    {
      num: '02',
      title: 'Arquitetura e UX',
      description:
        'Estruturação de fluxos, estados e lógica de navegação para reduzir ambiguidade e dar mais autonomia para o usuário.',
    },
    {
      num: '03',
      title: 'Interface e prototipação',
      description:
        'Materialização das decisões em UI clara, consistente e pronta para validação com stakeholders, produto e engenharia.',
    },
    {
      num: '04',
      title: 'Design systems e documentação',
      description:
        'Criação de base visual, componentes, regras de uso e documentação para sustentar escala e reduzir retrabalho.',
    },
  ],
  practice: [
    {
      title: 'Framing do problema',
      body: 'Definição do recorte, leitura das restrições e síntese do que realmente precisa mudar.',
    },
    {
      title: 'Priorização e estrutura',
      body: 'Organização de fluxos, estados e arquitetura de informação antes de refinar a camada visual.',
    },
    {
      title: 'Prototipação e validação',
      body: 'Iteração com stakeholders e engenharia para transformar direção em solução viável.',
    },
    {
      title: 'Sistema e continuidade',
      body: 'Design system, documentação e consistência para evitar que o produto volte à fragmentação.',
    },
  ],
  aboutGallery: [
    {
      src: portfolioMedia.monetixCoverImage,
      alt: 'Tela de gestão operacional do case Monetix',
    },
    {
      src: portfolioMedia.unimedPaySalesImage,
      alt: 'Tela de vendas e histórico do case UnimedPay',
    },
    {
      src: portfolioMedia.unimedPaySecurityImage,
      alt: 'Tela de segurança do case UnimedPay',
    },
  ],
};
