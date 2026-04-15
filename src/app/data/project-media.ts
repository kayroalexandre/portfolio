export interface PortfolioMedia {
  readonly monetixCoverImage: string;
  readonly monetixStatementImage: string;
  readonly unimedPayCoverImage: string;
  readonly unimedPaySalesImage: string;
  readonly unimedPaySecurityImage: string;
}

const monetixCoverImage = new URL(
  '../../../cases/telas-monetix/Terminais de Pagamento.png',
  import.meta.url
).href;

const monetixStatementImage = new URL('../../../cases/telas-monetix/Extrato.png', import.meta.url)
  .href;

const unimedPayCoverImage = new URL('../../../cases/telas-unimedpay/Home.png', import.meta.url)
  .href;

const unimedPaySalesImage = new URL('../../../cases/telas-unimedpay/Vendas.png', import.meta.url)
  .href;

const unimedPaySecurityImage = new URL(
  '../../../cases/telas-unimedpay/Segurança.png',
  import.meta.url
).href;

export const portfolioMedia: PortfolioMedia = {
  monetixCoverImage,
  monetixStatementImage,
  unimedPayCoverImage,
  unimedPaySalesImage,
  unimedPaySecurityImage,
};
