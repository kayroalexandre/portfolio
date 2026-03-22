import { MermaidDiagram } from "../components/MermaidDiagram";

const homeImage = new URL(
  "../../../cases/telas-unimedpay/Home.png",
  import.meta.url,
).href;

const tapToPayImage = new URL(
  "../../../cases/telas-unimedpay/Tap to pay.png",
  import.meta.url,
).href;

const installmentsImage = new URL(
  "../../../cases/telas-unimedpay/Quantidade de parcelas.png",
  import.meta.url,
).href;

const salesImage = new URL(
  "../../../cases/telas-unimedpay/Vendas.png",
  import.meta.url,
).href;

const filtersImage = new URL(
  "../../../cases/telas-unimedpay/Filtros-2.png",
  import.meta.url,
).href;

const securityImage = new URL(
  "../../../cases/telas-unimedpay/Segurança.png",
  import.meta.url,
).href;

const imageClassName = "w-full rounded-lg border border-white/10";

export function UnimedPayContent() {
  return (
    <div
      className="space-y-20 max-w-4xl text-neutral-400"
      style={{ fontSize: "0.95rem", lineHeight: 1.8 }}
    >
      <section>
        <h3 className="text-white text-2xl font-bold mb-6">Visão Geral</h3>
        <p className="mb-6">
          O UnimedPay foi concebido como uma carteira digital e gestor
          financeiro orientado à rotina da saúde. A intenção não era replicar o
          repertório de um banco genérico em formato mobile, mas organizar
          recebimento, visibilidade financeira e rastreabilidade dentro do
          ritmo real de clínicas, consultórios e hospitais.
        </p>
        <p className="mb-8">
          Nesse contexto, receber dinheiro não é apenas lançar uma entrada. É
          conciliar transações, localizar vendas, fechar caixa, responder
          dúvidas operacionais e manter confiança em uma rotina que não para.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white/5 rounded-lg border border-white/10">
            <h4 className="text-white text-lg font-bold mb-3">Proposta</h4>
            <p className="text-sm">
              Transformar complexidade financeira em legibilidade operacional
              para o setor de saúde.
            </p>
          </div>
          <div className="p-6 bg-white/5 rounded-lg border border-white/10">
            <h4 className="text-white text-lg font-bold mb-3">Produto</h4>
            <p className="text-sm">
              Carteira digital com Tap to Pay, vendas, extrato, filtros e
              segurança pensados como um sistema único.
            </p>
          </div>
          <div className="p-6 bg-white/5 rounded-lg border border-white/10">
            <h4 className="text-white text-lg font-bold mb-3">Papel</h4>
            <p className="text-sm">
              Atuação end-to-end, do discovery à arquitetura, UX transacional,
              UI e prototipação.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-white text-2xl font-bold mb-6">
          Contexto do Produto e Problema
        </h3>
        <p className="mb-6">
          Soluções financeiras generalistas funcionam bem para a lógica
          bancária. A rotina da saúde exige outra camada de clareza. O mesmo
          produto precisa atender à visão executiva do médico e à visão
          operacional de quem está no balcão, conciliando recebimentos e
          fechando caixa em tempo real.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-3 text-white font-medium">
                  Fricção observada
                </th>
                <th className="py-3 text-white font-medium">
                  Efeito na rotina
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              <tr>
                <td className="py-3 pr-4 text-white">
                  Movimentações tratadas de forma genérica
                </td>
                <td className="py-3">
                  Dificuldade para entender origem, natureza e status dos
                  recebimentos
                </td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-white">
                  Visão macro e visão operacional misturadas
                </td>
                <td className="py-3">
                  O que é útil para o médico não é o mesmo que a recepção
                  precisa no dia a dia
                </td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-white">
                  Fechamento de caixa dependente de conferência manual
                </td>
                <td className="py-3">
                  Perda de tempo em uma rotina já pressionada
                </td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-white">
                  Falta de filtros e rastreabilidade imediata
                </td>
                <td className="py-3">
                  Dúvidas recorrentes sobre lançamentos e conciliação
                </td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-white">
                  Segurança pouco adaptada ao contexto de uso
                </td>
                <td className="py-3">
                  Etapas sensíveis podiam travar a operação em momentos críticos
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <blockquote className="border-l-2 border-white/20 pl-6 py-2 my-8 italic text-lg text-white">
          "No contexto da saúde, fluxo financeiro não é só transação. É
          continuidade operacional."
        </blockquote>
      </section>

      <section>
        <h3 className="text-white text-2xl font-bold mb-6">
          Objetivos, Restrições e Escopo
        </h3>
        <p className="mb-6">
          Como produto novo, o UnimedPay precisava nascer com proposta clara. O
          trabalho não era só desenhar telas, mas organizar recebimento,
          visibilidade financeira e segurança como partes de uma mesma lógica
          de confiança.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="p-6 bg-white/5 rounded-lg border border-white/10">
            <h4 className="text-white text-lg font-bold mb-3">
              O que o produto precisava fazer
            </h4>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>Facilitar o recebimento no celular</li>
              <li>Dar leitura mais clara para médicos e gestores</li>
              <li>Conectar vendas, extrato, filtros e detalhamento</li>
              <li>Resolver segurança sem travar a operação</li>
            </ul>
          </div>
          <div className="p-6 bg-white/5 rounded-lg border border-white/10">
            <h4 className="text-white text-lg font-bold mb-3">
              Restrições de contexto
            </h4>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>Setor regulado e financeiramente sensível</li>
              <li>Rotina multitarefa em clínicas e hospitais</li>
              <li>Segurança obrigatória em fluxos críticos</li>
              <li>Complexidade de recebimento típica da saúde</li>
            </ul>
          </div>
        </div>

        <p>
          Isso fez com que a arquitetura do produto fosse desenhada menos como
          app bancário tradicional e mais como instrumento de trabalho para uma
          operação de alta pressão.
        </p>
      </section>

      <section>
        <h3 className="text-white text-2xl font-bold mb-6">
          Pesquisa e Síntese
        </h3>
        <p className="mb-6">
          A base do projeto veio da observação da rotina real. Em produtos
          financeiros, o que as pessoas dizem nem sempre revela o que
          efetivamente trava a operação. Por isso, a investigação priorizou
          contexto de uso, ansiedade operacional e leitura das tarefas críticas.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="p-6 bg-white/5 rounded-lg border border-white/10">
            <h4 className="text-white text-lg font-bold mb-3">
              Médico / cooperado
            </h4>
            <p className="text-sm">
              Procura visão macro, confiança e leitura rápida do que entrou e do
              que está disponível.
            </p>
          </div>
          <div className="p-6 bg-white/5 rounded-lg border border-white/10">
            <h4 className="text-white text-lg font-bold mb-3">
              Secretária / operação
            </h4>
            <p className="text-sm">
              Precisa de visão micro, rastreabilidade, filtros, prova de
              pagamento e fechamento de caixa com menos fricção.
            </p>
          </div>
        </div>

        <MermaidDiagram
          chart={`
            flowchart LR
              A[Contexto real de clínicas e consultórios] --> D[Pilares do produto]
              B[Rotina financeira de médico e recepção] --> D
              C[Exigências de segurança e confiança] --> D
              D --> E[Visibilidade macro]
              D --> F[Conciliação e rastreabilidade]
              D --> G[Tap to Pay sem atrito desnecessário]
              D --> H[Segurança compatível com a operação]
          `}
        />
      </section>

      <section>
        <h3 className="text-white text-2xl font-bold mb-6">
          Decisões que Estruturaram o Produto
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-3 text-white font-medium">Decisão</th>
                <th className="py-3 text-white font-medium">
                  Problema que resolvia
                </th>
                <th className="py-3 text-white font-medium">
                  Como aparecia na experiência
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              <tr>
                <td className="py-3 pr-4 text-white">
                  Estruturar a home como visão de negócio
                </td>
                <td className="py-3 pr-4">
                  Produtos financeiros tendem a começar pela conta; a operação
                  da saúde precisa começar pela leitura
                </td>
                <td className="py-3">
                  Home com entrada mais direta para visão geral e ações-chave
                </td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-white">
                  Tratar Tap to Pay como fluxo central
                </td>
                <td className="py-3 pr-4">
                  O celular precisava assumir o papel de ponto de recebimento
                </td>
                <td className="py-3">
                  Fluxo dedicado de pagamento por aproximação, com etapas claras
                  e contexto transacional
                </td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-white">
                  Organizar vendas, extrato e detalhamento como sistema contínuo
                </td>
                <td className="py-3 pr-4">
                  Receber dinheiro e entender dinheiro precisavam conversar
                </td>
                <td className="py-3">
                  Histórico, extrato e detalhamento conectados à lógica de
                  rastreabilidade
                </td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-white">
                  Investir em filtros como ferramenta operacional
                </td>
                <td className="py-3 pr-4">
                  A recepção precisava responder perguntas específicas
                  rapidamente
                </td>
                <td className="py-3">
                  Filtros e recortes para localizar lançamentos com menos
                  esforço
                </td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-white">
                  Tornar segurança parte da fluidez do produto
                </td>
                <td className="py-3 pr-4">
                  Proteção excessivamente rígida quebra operação
                </td>
                <td className="py-3">
                  Fluxos de segurança mais claros, sem perder percepção de
                  proteção
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h3 className="text-white text-2xl font-bold mb-6">
          Evolução Visual e Fluxos
        </h3>
        <p className="mb-6">
          Como o UnimedPay foi concebido como produto novo, o valor do case está
          menos na comparação visual e mais na coesão entre entrada,
          recebimento, leitura financeira e segurança.
        </p>

        <div className="mt-8">
          <h4 className="text-white text-lg font-bold mb-4">
            Home como leitura e ponto de partida
          </h4>
          <p className="mb-6">
            A home precisava abrir o produto com sensação de controle e encurtar
            o caminho para as tarefas mais importantes. Em um app como esse,
            tela inicial fraca significa navegação excessiva logo no primeiro
            minuto.
          </p>
          <figure className="my-8">
            <img
              src={homeImage}
              alt="Home do UnimedPay"
              className={imageClassName}
              loading="lazy"
            />
            <figcaption className="text-sm mt-3 text-center text-white/80">
              A home organiza leitura de negócio e acesso rápido aos fluxos mais
              importantes do produto.
            </figcaption>
          </figure>
        </div>

        <div className="mt-10">
          <h4 className="text-white text-lg font-bold mb-4">
            Tap to Pay como centro da proposta
          </h4>
          <p className="mb-6">
            O coração do produto está no pagamento por aproximação no celular.
            A prioridade aqui não era apenas “fazer funcionar”, mas tornar esse
            fluxo confiável o suficiente para uso real em balcão, recepção e
            atendimento.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <figure>
              <img
                src={tapToPayImage}
                alt="Fluxo principal de Tap to Pay no UnimedPay"
                className={imageClassName}
                loading="lazy"
              />
              <figcaption className="text-sm mt-3 text-center text-white/80">
                Tap to Pay aparece como capacidade central do produto, não como
                funcionalidade periférica.
              </figcaption>
            </figure>
            <figure>
              <img
                src={installmentsImage}
                alt="Definição de parcelas no fluxo do UnimedPay"
                className={imageClassName}
                loading="lazy"
              />
              <figcaption className="text-sm mt-3 text-center text-white/80">
                A escolha de parcelas traduz decisão financeira em uma interação
                simples e objetiva.
              </figcaption>
            </figure>
          </div>
        </div>

        <div className="mt-10">
          <h4 className="text-white text-lg font-bold mb-4">
            Vendas, extrato e prova operacional
          </h4>
          <p className="mb-6">
            Receber é apenas metade da tarefa. A outra metade é conseguir
            localizar, provar, filtrar e interpretar cada lançamento sem
            depender de planilhas ou suporte.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <figure>
              <img
                src={salesImage}
                alt="Histórico e visão de vendas no UnimedPay"
                className={imageClassName}
                loading="lazy"
              />
              <figcaption className="text-sm mt-3 text-center text-white/80">
                O módulo de vendas sustenta histórico, extrato, relatório e
                detalhamento da venda.
              </figcaption>
            </figure>
            <figure>
              <img
                src={filtersImage}
                alt="Filtros no módulo de vendas do UnimedPay"
                className={imageClassName}
                loading="lazy"
              />
              <figcaption className="text-sm mt-3 text-center text-white/80">
                Os filtros reforçam a proposta do produto como ferramenta de
                gestão, não apenas de transação.
              </figcaption>
            </figure>
          </div>
        </div>

        <div className="mt-10">
          <h4 className="text-white text-lg font-bold mb-4">
            Segurança sem ruptura da operação
          </h4>
          <p className="mb-6">
            Como o produto lida com dinheiro, segurança é parte da experiência
            principal. Mas, no contexto da saúde, ela não pode ser desenhada
            como se o usuário tivesse tempo sobrando. A interface precisa
            proteger sem transformar cada tarefa em fricção.
          </p>

          <figure className="my-8">
            <img
              src={securityImage}
              alt="Fluxo de segurança do UnimedPay"
              className={imageClassName}
              loading="lazy"
            />
            <figcaption className="text-sm mt-3 text-center text-white/80">
              A camada de segurança aparece como componente estrutural do
              produto, integrada ao restante da experiência.
            </figcaption>
          </figure>
        </div>

        <MermaidDiagram
          chart={`
            flowchart LR
              A[Home] --> B[Tap to Pay]
              B --> C[Quantidade de parcelas]
              C --> D[Pagamento por aproximação]
              D --> E[Venda registrada]
              E --> F[Histórico e detalhamento]
              F --> G[Filtros e conciliação]
              G --> H[Fechamento com mais rastreabilidade]
          `}
        />
      </section>

      <section>
        <h3 className="text-white text-2xl font-bold mb-6">Resultados</h3>
        <p className="mb-6">
          Vou tratar os números compartilhados por você como fatos do projeto,
          porque vieram como insumo direto da reconstrução do case.
        </p>

        <div className="overflow-x-auto mb-8">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-3 text-white font-medium">Resultado</th>
                <th className="py-3 text-white font-medium">
                  Leitura para o negócio
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              <tr>
                <td className="py-3 pr-4 text-white">
                  Fechamento de caixa reduzido de cerca de 1 hora para
                  aproximadamente 10 minutos
                </td>
                <td className="py-3">
                  Menos tempo gasto em conferência manual e mais fluidez para a
                  equipe administrativa
                </td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-white">
                  Redução de 30% nos chamados ligados a dúvidas de lançamento
                </td>
                <td className="py-3">
                  A interface passou a explicar melhor o que antes dependia de
                  mediação humana
                </td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-white">
                  Aumento perceptível no NPS entre médicos cooperados
                </td>
                <td className="py-3">
                  O produto ganhou valor por resolver dores específicas do
                  setor, e não por imitar bancos generalistas
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          O efeito mais importante talvez não esteja só nos indicadores, mas no
          reposicionamento do produto: o UnimedPay deixa de parecer uma conta
          digital genérica e passa a se comportar como ferramenta financeira
          orientada à rotina da saúde.
        </p>
      </section>

      <section>
        <h3 className="text-white text-2xl font-bold mb-6">Aprendizados</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white/5 rounded-lg border border-white/10">
            <h4 className="text-white text-lg font-bold mb-3">
              Nicho vence pela leitura de contexto
            </h4>
            <p className="text-sm">
              O diferencial não está na lista de features, mas na aderência à
              rotina da saúde.
            </p>
          </div>
          <div className="p-6 bg-white/5 rounded-lg border border-white/10">
            <h4 className="text-white text-lg font-bold mb-3">
              Segurança precisa ser percebida como proteção
            </h4>
            <p className="text-sm">
              Em operações críticas, UX de segurança ruim compromete adoção e
              aumenta atrito desnecessário.
            </p>
          </div>
          <div className="p-6 bg-white/5 rounded-lg border border-white/10">
            <h4 className="text-white text-lg font-bold mb-3">
              Fluxo financeiro bom é o que explica o dinheiro
            </h4>
            <p className="text-sm">
              Receber, localizar e conciliar precisam fazer parte da mesma
              experiência.
            </p>
          </div>
          <div className="p-6 bg-white/5 rounded-lg border border-white/10">
            <h4 className="text-white text-lg font-bold mb-3">
              Produto para saúde exige linguagem operacional
            </h4>
            <p className="text-sm">
              O design precisa conversar com médicos e com quem fecha o caixa.
            </p>
          </div>
        </div>

        <blockquote className="border-l-2 border-white/20 pl-6 py-2 my-8 italic text-lg text-white">
          "Quando o produto entende o trabalho real do usuário, a interface
          deixa de ser um painel financeiro e passa a funcionar como instrumento
          de operação."
        </blockquote>

        <p className="mt-12 text-center text-sm">
          <em>Kayro Gomes · Product Designer</em>
        </p>
      </section>
    </div>
  );
}
