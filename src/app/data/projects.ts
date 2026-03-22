import { portfolioMedia } from "./site";

export type ProjectCaseStudy = "monetix" | "unimedpay";

export interface Project {
  slug: string;
  title: string;
  image: string;
  year: string;
  category: string;
  client: string;
  description: string;
  caseStudy?: ProjectCaseStudy;
}

export const projects: Project[] = [
  {
    slug: "monetix",
    title: "Monetix",
    image: portfolioMedia.monetixCoverImage,
    year: "2024",
    category: "Product Design",
    client: "Irruba",
    description:
      "Redesign de uma plataforma financeira white label para reduzir a dependência do suporte, reorganizar a leitura dos dados e construir uma base escalável com Design System.",
    caseStudy: "monetix",
  },
  {
    slug: "unimedpay",
    title: "UnimedPay",
    image: portfolioMedia.unimedPayCoverImage,
    year: "2025",
    category: "Product Design",
    client: "Unimed",
    description:
      "Produto financeiro mobile criado para a rotina da saúde, conectando Tap to Pay, vendas, extrato, filtros e segurança em uma experiência orientada à operação real.",
    caseStudy: "unimedpay",
  },
];
