import { MermaidDiagram } from '../components/MermaidDiagram';

const loginWebImage = new URL('../../../cases/telas-monetix/Login-5.png', import.meta.url).href;

const loginErrorImage = new URL('../../../cases/telas-monetix/Login - Erro.png', import.meta.url)
  .href;

const statementImage = new URL('../../../cases/telas-monetix/Extrato.png', import.meta.url).href;

const feesSimulatorImage = new URL(
  '../../../cases/telas-monetix/Simulador de taxas (Web).png',
  import.meta.url
).href;

const terminalsImage = new URL(
  '../../../cases/telas-monetix/Terminais de Pagamento.png',
  import.meta.url
).href;

const imageClassName = 'w-full rounded-lg border border-shell-border';

export function MonetixContent() {
  return (
    <div className="space-y-20 max-w-4xl text-shell-muted-foreground text-[0.95rem] leading-[1.8]">
      <section>
        <h3 className="text-shell-foreground text-2xl font-bold mb-6">Visão Geral</h3>
        <p className="mb-6">
          A Monetix era uma plataforma financeira B2B usada para acompanhar transações, recebíveis,
          conciliação bancária e rotinas operacionais ligadas às maquininhas de cartão. O problema
          não era a falta de funcionalidade. Era o esforço cognitivo necessário para entender o que
          a interface estava tentando comunicar.
        </p>
        <p className="mb-8">
          Quando o usuário não conseguia interpretar por que o valor recebido era diferente do
          esperado, ele recorria ao suporte. Em um produto financeiro, isso não é só ruído de
          interface. É uma quebra direta de confiança.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-shell-surface rounded-lg border border-shell-border">
            <h4 className="text-shell-foreground text-lg font-bold mb-3">Problema real</h4>
            <p className="text-sm">
              A leitura dos dados exigia interpretação extra justamente nas áreas mais sensíveis do
              produto.
            </p>
          </div>
          <div className="p-6 bg-shell-surface rounded-lg border border-shell-border">
            <h4 className="text-shell-foreground text-lg font-bold mb-3">Recorte da v1</h4>
            <p className="text-sm">
              O foco ficou na camada de front-end e nos fluxos com maior impacto direto na autonomia
              do usuário.
            </p>
          </div>
          <div className="p-6 bg-shell-surface rounded-lg border border-shell-border">
            <h4 className="text-shell-foreground text-lg font-bold mb-3">Alavanca central</h4>
            <p className="text-sm">
              Organizar hierarquia, contexto e consistência por meio de um Design System criado do
              zero.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-shell-foreground text-2xl font-bold mb-6">
          Contexto do Produto e Problema
        </h3>
        <p className="mb-6">
          O produto reunia transações, recebíveis, extrato por terminal, link de pagamento, download
          de planilhas e comunicados em um mesmo ambiente. Apesar da amplitude funcional, a
          experiência era frágil exatamente onde clareza, contexto e legibilidade deveriam ser
          inegociáveis.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-shell-border">
                <th className="py-3 text-shell-foreground font-medium">Problema identificado</th>
                <th className="py-3 text-shell-foreground font-medium">Efeito na experiência</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              <tr>
                <td className="py-3 pr-4 text-shell-foreground">Ausência de hierarquia visual</td>
                <td className="py-3">O usuário não entendia onde olhar primeiro</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-shell-foreground">
                  Uso indiscriminado do verde da marca
                </td>
                <td className="py-3">A cor deixava de orientar e passava a competir com tudo</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-shell-foreground">Dados financeiros sem contexto</td>
                <td className="py-3">
                  Bruto, líquido, taxas e períodos exigiam interpretação extra
                </td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-shell-foreground">Falta de um Design System</td>
                <td className="py-3">Cada tela parecia pertencer a um produto diferente</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-shell-foreground">Bugs e inconsistências visuais</td>
                <td className="py-3">
                  A interface transmitia instabilidade e pouca confiabilidade
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <blockquote className="border-l-2 border-shell-border pl-6 py-2 my-8 italic text-lg text-shell-foreground">
          "Em um produto financeiro, clareza não é acabamento. É infraestrutura de confiança."
        </blockquote>
      </section>

      <section>
        <h3 className="text-shell-foreground text-2xl font-bold mb-6">
          Objetivos, Restrições e Escopo
        </h3>
        <p className="mb-6">
          O redesign precisava responder a três frentes ao mesmo tempo: reduzir a dependência do
          suporte para tarefas recorrentes, reorganizar a leitura das informações financeiras e
          construir uma base visual sustentável para as próximas entregas.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-shell-border">
                <th className="py-3 text-shell-foreground font-medium">Restrição</th>
                <th className="py-3 text-shell-foreground font-medium">Impacto no projeto</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              <tr>
                <td className="py-3 pr-4 text-shell-foreground">Prazo curto</td>
                <td className="py-3">Exigiu priorização rigorosa da primeira versão</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-shell-foreground">Time enxuto</td>
                <td className="py-3">Tornou inviável atacar muitos fluxos em paralelo</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-shell-foreground">
                  Mudanças de backend fora do escopo imediato
                </td>
                <td className="py-3">
                  Forçou soluções concentradas em clareza, hierarquia e estados de interface
                </td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-shell-foreground">
                  Regras de compliance do Banco Central
                </td>
                <td className="py-3">
                  Limitou decisões de conteúdo, fluxo e apresentação dos dados
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          Na prática, isso levou a um escopo v1 focado na camada de front-end e nos fluxos com maior
          impacto direto na compreensão dos dados, sempre em diálogo com backend, PO, diretoria e
          suporte.
        </p>
      </section>

      <section>
        <h3 className="text-shell-foreground text-2xl font-bold mb-6">Pesquisa e Síntese</h3>
        <p className="mb-6">
          Antes de propor qualquer solução visual, a investigação combinou observação contextual,
          entrevistas e análise de tickets de suporte. A pesquisa não serviu apenas para confirmar
          dores. Ela ajudou a separar ruído pontual do que realmente comprometia a autonomia do
          usuário.
        </p>

        <div className="overflow-x-auto mb-8">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-shell-border">
                <th className="py-3 text-shell-foreground font-medium">Frente de pesquisa</th>
                <th className="py-3 text-shell-foreground font-medium">O que foi feito</th>
                <th className="py-3 text-shell-foreground font-medium">
                  O que trouxe para o projeto
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              <tr>
                <td className="py-3 pr-4 text-shell-foreground">Visitas a estabelecimentos</td>
                <td className="py-3 pr-4">
                  Observação do uso real em balcões, caixas e rotinas corridas
                </td>
                <td className="py-3">Contexto de uso e comportamento em ambiente operacional</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-shell-foreground">Entrevistas com usuários</td>
                <td className="py-3 pr-4">Conversas com donos, gerentes e atendentes</td>
                <td className="py-3">Diferenças de repertório, expectativa e linguagem</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-shell-foreground">Análise de tickets de suporte</td>
                <td className="py-3 pr-4">Leitura de tickets e reclamações recorrentes</td>
                <td className="py-3">Frequência e padrão das dúvidas mais críticas</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-shell-foreground">
                  Cruzamento qualitativo + quantitativo
                </td>
                <td className="py-3 pr-4">Síntese entre campo e suporte</td>
                <td className="py-3">Base para priorização com impacto real</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="p-6 bg-shell-surface rounded-lg border border-shell-border">
            <h4 className="text-shell-foreground text-lg font-bold mb-3">Dono do negócio</h4>
            <p className="text-sm">
              Acompanha receitas, recebíveis e conciliação como leitura do estado financeiro do
              negócio.
            </p>
          </div>
          <div className="p-6 bg-shell-surface rounded-lg border border-shell-border">
            <h4 className="text-shell-foreground text-lg font-bold mb-3">Gerente</h4>
            <p className="text-sm">
              Precisa navegar por períodos, terminais e relatórios com mais frequência operacional.
            </p>
          </div>
          <div className="p-6 bg-shell-surface rounded-lg border border-shell-border">
            <h4 className="text-shell-foreground text-lg font-bold mb-3">Atendente</h4>
            <p className="text-sm">
              Consulta pontual e uso tático no dia a dia, com menos margem para fricção.
            </p>
          </div>
        </div>

        <MermaidDiagram
          chart={`
            flowchart LR
              A[Visitas a estabelecimentos] --> D[Síntese das fricções]
              B[Entrevistas com donos, gerentes e atendentes] --> D
              C[Análise de tickets de suporte] --> D
              D --> E[Priorização com PO e diretoria]
              E --> F[Escopo v1 focado em front-end]
              F --> G[Design System e fluxos críticos]
          `}
        />
      </section>

      <section>
        <h3 className="text-shell-foreground text-2xl font-bold mb-6">
          Design System como Infraestrutura
        </h3>
        <p className="mb-6">
          O problema não seria resolvido apenas redesenhando algumas telas. Antes disso, era preciso
          construir uma base de linguagem visual, comportamento e governança que impedisse o produto
          de voltar à inconsistência anterior.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h4 className="text-shell-foreground text-lg font-bold mb-4">O que foi estruturado</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>Tokens de cor, tipografia e espaçamento</li>
              <li>Regras de grid e composição para web e mobile</li>
              <li>Componentes base com variantes e estados</li>
              <li>Governança para evolução sem fragmentação</li>
              <li>Handoff mais consistente com Figma Dev Mode</li>
            </ul>
          </div>
          <div>
            <h4 className="text-shell-foreground text-lg font-bold mb-4">
              Efeito direto na entrega
            </h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>Aproximadamente 40% de redução no tempo de prototipação</li>
              <li>Reuso de componentes em cerca de 90% das telas</li>
              <li>Menos retrabalho em ajustes visuais recorrentes</li>
              <li>Consistência mais forte entre web e mobile</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-shell-foreground text-2xl font-bold mb-6">
          Decisões que Mudaram a Leitura da Experiência
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-shell-border">
                <th className="py-3 text-shell-foreground font-medium">Decisão</th>
                <th className="py-3 text-shell-foreground font-medium">Problema que atacava</th>
                <th className="py-3 text-shell-foreground font-medium">Como aparecia na solução</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              <tr>
                <td className="py-3 pr-4 text-shell-foreground">
                  Restringir o verde a ações e destaques
                </td>
                <td className="py-3 pr-4">A cor estava em todo lugar e já não orientava nada</td>
                <td className="py-3">Uso semântico em CTAs, estados e pontos de atenção</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-shell-foreground">
                  Criar hierarquia tipográfica para dados
                </td>
                <td className="py-3 pr-4">Tudo tinha o mesmo peso visual</td>
                <td className="py-3">Separação clara entre total, subtotal, detalhe e apoio</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-shell-foreground">
                  Levar contexto para perto do número
                </td>
                <td className="py-3 pr-4">
                  O usuário via valores sem entender origem, período ou diferença
                </td>
                <td className="py-3">
                  Labels, filtros, agrupamentos e distinção entre bruto, líquido e taxas
                </td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-shell-foreground">
                  Projetar estados além do happy path
                </td>
                <td className="py-3 pr-4">Erros, vazios e confirmações não estavam resolvidos</td>
                <td className="py-3">
                  Login com erro, feedback contextual e navegação mais previsível
                </td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-shell-foreground">
                  Construir o Design System antes de expandir telas
                </td>
                <td className="py-3 pr-4">A inconsistência voltava a cada nova entrega</td>
                <td className="py-3">Tokens, componentes base e governança para web e mobile</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h3 className="text-shell-foreground text-2xl font-bold mb-6">Evolução Visual e Fluxos</h3>
        <p className="mb-6">
          Em vez de acumular dezenas de telas, o case fica mais forte quando a evolução aparece em
          poucos pontos de prova: entrada, interpretação dos dados, ativação de funcionalidade e
          gestão operacional.
        </p>

        <MermaidDiagram
          chart={`
            journey
              title Jornada de consulta do usuário
              section Antes
                Login na plataforma: 3: Usuário
                Dashboard sem hierarquia: 2: Usuário
                Busca difícil no extrato: 1: Usuário
                Liga para o suporte: 1: Usuário, Suporte
              section Depois
                Login com feedback claro: 4: Usuário
                Resumo financeiro mais legível: 4: Usuário
                Filtros por período e terminal: 4: Usuário
                Resolução autônoma: 5: Usuário
          `}
        />

        <p className="mt-6">
          A principal mudança do projeto foi sair de uma experiência que dependia de mediação humana
          para uma interface que explicava melhor o que estava acontecendo.
        </p>

        <div className="mt-10">
          <h4 className="text-shell-foreground text-lg font-bold mb-4">Login e estados críticos</h4>
          <p className="mb-6">
            O fluxo de login passou a comunicar estado com mais clareza logo no primeiro contato com
            a plataforma. Isso importa porque erros de autenticação contaminam a percepção de
            confiança antes mesmo da leitura dos dados financeiros.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <figure>
              <img
                src={loginWebImage}
                alt="Tela de login da Monetix em versão web"
                className={imageClassName}
                loading="lazy"
              />
              <figcaption className="text-sm mt-3 text-center text-shell-foreground/80">
                Tela de login com hierarquia mais clara e CTA principal mais evidente.
              </figcaption>
            </figure>
            <figure>
              <img
                src={loginErrorImage}
                alt="Estado de erro no login da Monetix"
                className={imageClassName}
                loading="lazy"
              />
              <figcaption className="text-sm mt-3 text-center text-shell-foreground/80">
                Estado de erro com feedback contextual, reforçando o cuidado com fluxos além do
                happy path.
              </figcaption>
            </figure>
          </div>
        </div>

        <div className="mt-10">
          <h4 className="text-shell-foreground text-lg font-bold mb-4">
            Leitura de extrato e recebíveis
          </h4>
          <p className="mb-6">
            O fluxo de extrato e recebíveis concentrava uma parte importante da fricção original.
            Explicitar período, agrupamento e leitura dos valores atacava justamente o tipo de
            dúvida que antes era desviado para o suporte.
          </p>

          <figure className="my-8">
            <img
              src={statementImage}
              alt="Fluxo de extrato e recebíveis em versão mobile"
              className={imageClassName}
              loading="lazy"
            />
            <figcaption className="text-sm mt-3 text-center text-shell-foreground/80">
              Exemplo de reorganização da informação no fluxo de extrato e do ganho de contexto
              junto aos valores.
            </figcaption>
          </figure>
        </div>

        <div className="mt-10">
          <h4 className="text-shell-foreground text-lg font-bold mb-4">
            Clareza em fluxos com regra de negócio
          </h4>
          <p className="mb-6">
            O link de pagamento precisava resolver exigências regulatórias sem transformar o
            processo em uma barreira. Já a gestão de terminais exigia leitura rápida de status,
            localização e condições negociadas.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <figure>
              <img
                src={feesSimulatorImage}
                alt="Simulador de taxas em versão web"
                className={imageClassName}
                loading="lazy"
              />
              <figcaption className="text-sm mt-3 text-center text-shell-foreground/80">
                Simulador de taxas com leitura mais clara das condições da operação.
              </figcaption>
            </figure>
            <figure>
              <img
                src={terminalsImage}
                alt="Lista de terminais de pagamento"
                className={imageClassName}
                loading="lazy"
              />
              <figcaption className="text-sm mt-3 text-center text-shell-foreground/80">
                Gestão de terminais com status, localização e taxas organizados para leitura
                operacional.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-shell-foreground text-2xl font-bold mb-6">Resultados</h3>
        <p className="mb-6">
          Os resultados registrados no material do projeto se dividem em duas frentes: efeito
          percebido na operação e ganho de eficiência no processo de design.
        </p>

        <div className="overflow-x-auto mb-8">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-shell-border">
                <th className="py-3 text-shell-foreground font-medium">Resultado observado</th>
                <th className="py-3 text-shell-foreground font-medium">Como apareceu</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              <tr>
                <td className="py-3 pr-4 text-shell-foreground">
                  Redução de chamados sobre extrato e recebíveis
                </td>
                <td className="py-3">Feedback direto do time de suporte após o lançamento da v1</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-shell-foreground">
                  Menor dependência de mediação humana
                </td>
                <td className="py-3">
                  Usuário conseguia interpretar melhor os dados na própria interface
                </td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-shell-foreground">
                  Reuso do sistema visual em novas entregas
                </td>
                <td className="py-3">O Design System passou a orientar evoluções posteriores</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-shell-border">
                <th className="py-3 text-shell-foreground font-medium">Métrica</th>
                <th className="py-3 text-shell-foreground font-medium">Resultado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              <tr>
                <td className="py-3 pr-4 text-shell-foreground">
                  Redução no tempo de prototipação
                </td>
                <td className="py-3">Aproximadamente 40%</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-shell-foreground">
                  Reuso de componentes nas telas entregues
                </td>
                <td className="py-3">Aproximadamente 90%</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          O material não traz volume absoluto de tickets nem baseline numérica de suporte. Por isso,
          a redução de chamados aparece aqui como resultado qualitativo observado, e não como claim
          quantitativo fechado.
        </p>
      </section>

      <section>
        <h3 className="text-shell-foreground text-2xl font-bold mb-6">Aprendizados</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-shell-surface rounded-lg border border-shell-border">
            <h4 className="text-shell-foreground text-lg font-bold mb-3">
              Design System é infraestrutura
            </h4>
            <p className="text-sm">
              Construir a base antes das telas foi o que tornou o redesign sustentável no médio
              prazo.
            </p>
          </div>
          <div className="p-6 bg-shell-surface rounded-lg border border-shell-border">
            <h4 className="text-shell-foreground text-lg font-bold mb-3">
              Pesquisa de campo muda a qualidade da decisão
            </h4>
            <p className="text-sm">
              Os tickets mostravam o sintoma; observação e entrevista ajudavam a explicar a causa.
            </p>
          </div>
          <div className="p-6 bg-shell-surface rounded-lg border border-shell-border">
            <h4 className="text-shell-foreground text-lg font-bold mb-3">
              Restrição técnica é dado de projeto
            </h4>
            <p className="text-sm">
              Escopo melhor não é o que ignora limite, e sim o que cria valor dentro dele.
            </p>
          </div>
          <div className="p-6 bg-shell-surface rounded-lg border border-shell-border">
            <h4 className="text-shell-foreground text-lg font-bold mb-3">
              Colaboração é parte da solução
            </h4>
            <p className="text-sm">
              Backend, suporte, PO e diretoria influenciaram diretamente a qualidade e a viabilidade
              do redesign.
            </p>
          </div>
        </div>

        <blockquote className="border-l-2 border-shell-border pl-6 py-2 my-8 italic text-lg text-shell-foreground">
          "Se eu iterasse este trabalho hoje, adicionaria uma camada mais forte de instrumentação
          comportamental para transformar parte do aprendizado qualitativo em leitura quantitativa
          mais fina."
        </blockquote>

        <p className="mt-12 text-center text-sm">
          <em>Kayro Gomes · Product Designer</em>
        </p>
      </section>
    </div>
  );
}
