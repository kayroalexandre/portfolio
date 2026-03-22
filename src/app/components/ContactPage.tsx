import { Send } from "lucide-react";
import { useSearchParams } from "react-router";
import { siteConfig } from "../data/site";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const formSubmitAction = import.meta.env.VITE_FORMSUBMIT_ACTION?.trim() ?? "";
const siteUrl = import.meta.env.VITE_SITE_URL?.trim() ?? "";

function buildContactReturnUrl(baseUrl: string) {
  if (!baseUrl) {
    return "";
  }

  try {
    return new URL("/contact?sent=1", baseUrl).toString();
  } catch {
    return "";
  }
}

export function ContactPage() {
  const [searchParams] = useSearchParams();
  useDocumentTitle("Contato");
  const returnUrl = buildContactReturnUrl(siteUrl);
  const isConfigured = Boolean(formSubmitAction && returnUrl);
  const isSent = searchParams.get("sent") === "1";
  const availabilityCopy = isConfigured
    ? siteConfig.contactAvailabilityReady
    : siteConfig.contactAvailabilityPending;
  const resultCopy = isConfigured
    ? siteConfig.contactResultReady
    : siteConfig.contactResultPending;

  return (
    <div className="pb-20">
      <section className="px-6 md:px-12 pt-16 pb-20">
        <div className="flex flex-col md:flex-row gap-8 mb-16">
          <div
            className="flex items-start gap-2 text-neutral-400 md:w-1/4"
            style={{ fontSize: "0.85rem" }}
          >
            <Send size={16} className="mt-0.5" />
            <span>Contato</span>
          </div>
          <div className="md:w-3/4 max-w-lg">
            <h2
              className="text-white mb-4"
              style={{ fontSize: "2rem", fontWeight: 600 }}
            >
              Contato
            </h2>
            <p
              className="text-neutral-400"
              style={{ fontSize: "0.85rem", lineHeight: 1.7 }}
            >
              {siteConfig.contactIntro}
            </p>
          </div>
        </div>

        <div
          className="flex justify-between px-4 mb-12 text-neutral-600"
          style={{ fontSize: "1.2rem" }}
        >
          <span>+</span>
          <span>+</span>
          <span>+</span>
        </div>

        <div className="flex flex-col md:flex-row gap-16">
          <div className="md:w-1/4">
            <h3
              className="text-white mb-8"
              style={{ fontSize: "0.95rem", fontWeight: 500 }}
            >
              Como usar
            </h3>
            <div className="space-y-6">
              <div>
                <p
                  className="text-white"
                  style={{ fontSize: "0.8rem", fontWeight: 500 }}
                >
                  Escopo ideal
                </p>
                <p
                  className="text-neutral-500"
                  style={{ fontSize: "0.8rem", lineHeight: 1.7 }}
                >
                  Produto digital, UX para operação complexa, redesign estrutural,
                  design systems e documentação de decisão.
                </p>
              </div>
              <div>
                <p
                  className="text-white"
                  style={{ fontSize: "0.8rem", fontWeight: 500 }}
                >
                  Estado atual
                </p>
                <p
                  className="text-neutral-500"
                  style={{ fontSize: "0.8rem", lineHeight: 1.7 }}
                >
                  {availabilityCopy}
                </p>
              </div>
              <div>
                <p
                  className="text-white"
                  style={{ fontSize: "0.8rem", fontWeight: 500 }}
                >
                  Resultado do formulário
                </p>
                <p
                  className="text-neutral-500"
                  style={{ fontSize: "0.8rem", lineHeight: 1.7 }}
                >
                  {resultCopy}
                </p>
              </div>
            </div>
          </div>

          <div className="md:w-3/4 max-w-lg">
            <h3
              className="text-white mb-8"
              style={{ fontSize: "0.95rem", fontWeight: 500 }}
            >
              Enviar mensagem
            </h3>
            {isSent ? (
              <div
                aria-live="polite"
                className="mb-8 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-emerald-100"
                style={{ fontSize: "0.8rem", lineHeight: 1.6 }}
              >
                {siteConfig.contactSuccessMessage}
              </div>
            ) : null}
            {!isConfigured ? (
              <div
                className="mb-8 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-neutral-400"
                style={{ fontSize: "0.8rem", lineHeight: 1.6 }}
              >
                Configure <code>VITE_FORMSUBMIT_ACTION</code> e{" "}
                <code>VITE_SITE_URL</code> para ativar o envio real deste
                formulário.
              </div>
            ) : null}
            <form
              action={isConfigured ? formSubmitAction : undefined}
              method="POST"
              className="flex flex-col gap-6"
            >
              <input
                type="hidden"
                name="_subject"
                value={siteConfig.contactFormSubject}
              />
              <input type="hidden" name="_next" value={returnUrl} />
              <input
                type="hidden"
                name="_autoresponse"
                value={siteConfig.contactAutoResponse}
              />
              <input type="hidden" name="_template" value="table" />
              <input
                type="text"
                name="_honey"
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />
              <div>
                <label
                  className="block text-neutral-500 mb-2"
                  style={{ fontSize: "0.75rem" }}
                >
                  Nome
                </label>
                <input
                  type="text"
                  name="name"
                  className="w-full bg-transparent border-b border-white/15 pb-3 text-white outline-none focus:border-white/40 transition-colors"
                  style={{ fontSize: "0.85rem" }}
                  placeholder="Seu nome"
                  autoComplete="name"
                  required
                />
              </div>
              <div>
                <label
                  className="block text-neutral-500 mb-2"
                  style={{ fontSize: "0.75rem" }}
                >
                  E-mail
                </label>
                <input
                  type="email"
                  name="email"
                  className="w-full bg-transparent border-b border-white/15 pb-3 text-white outline-none focus:border-white/40 transition-colors"
                  style={{ fontSize: "0.85rem" }}
                  placeholder="Seu e-mail"
                  autoComplete="email"
                  required
                />
              </div>
              <div>
                <label
                  className="block text-neutral-500 mb-2"
                  style={{ fontSize: "0.75rem" }}
                >
                  Mensagem
                </label>
                <textarea
                  name="message"
                  rows={4}
                  className="w-full bg-transparent border-b border-white/15 pb-3 text-white outline-none focus:border-white/40 transition-colors resize-none"
                  style={{ fontSize: "0.85rem" }}
                  placeholder="Explique o desafio, o contexto e o que você precisa."
                  required
                />
              </div>
              <div>
                <button
                  type="submit"
                  disabled={!isConfigured}
                  className="bg-white text-black px-6 py-3 rounded-full hover:bg-white/80 transition-colors cursor-pointer disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-neutral-500"
                  style={{ fontSize: "0.8rem" }}
                >
                  {isConfigured ? "Enviar mensagem" : "Canal em configuração"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
