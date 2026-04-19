import { Send } from 'lucide-react';
import { useSearchParams } from 'react-router';

import { createContactFormState } from '../data/contact-form-state';
import { siteConfig } from '../data/site';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { SectionDivider } from './SectionDivider';
import { SectionHeader } from './SectionHeader';
import { Button } from './ui/button';
import { SidebarLayout } from './ui/layout-sidebar';

const formSubmitAction = import.meta.env.VITE_FORMSUBMIT_ACTION?.trim() ?? '';
const siteUrl = import.meta.env.VITE_SITE_URL?.trim() ?? '';

function buildContactReturnUrl(baseUrl: string) {
  if (!baseUrl) {
    return '';
  }

  try {
    return new URL('/contact?sent=1', baseUrl).toString();
  } catch {
    return '';
  }
}

export function ContactPage() {
  const [searchParams] = useSearchParams();
  useDocumentTitle('contact');
  const returnUrl = buildContactReturnUrl(siteUrl);
  const formState = createContactFormState({
    formSubmitAction,
    returnUrl,
    isSent: searchParams.get('sent') === '1',
  });

  return (
    <div className="pb-20">
      <section className="px-6 md:px-12 pt-16 pb-20">
        <SectionHeader
          icon={<Send size={16} />}
          label="Contato"
          title="Contato"
          description={siteConfig.contactIntro}
          className="mb-16"
        />

        <SectionDivider className="px-4 mb-12" />

        <SidebarLayout
          sidebarWidth="1/4"
          gap="loose"
          sidebar={
            <div>
              <h3 className="text-shell-foreground mb-8 text-[0.95rem] font-medium">Como usar</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-shell-foreground text-[0.8rem] font-medium">Escopo ideal</p>
                  <p className="text-shell-muted-foreground text-[0.8rem] leading-[1.7]">
                    Produto digital, UX para operação complexa, redesign estrutural, design systems
                    e documentação de decisão.
                  </p>
                </div>
                <div>
                  <p className="text-shell-foreground text-[0.8rem] font-medium">Estado atual</p>
                  <p className="text-shell-muted-foreground text-[0.8rem] leading-[1.7]">
                    {formState.availabilityCopy}
                  </p>
                </div>
                <div>
                  <p className="text-shell-foreground text-[0.8rem] font-medium">
                    Resultado do formulário
                  </p>
                  <p className="text-shell-muted-foreground text-[0.8rem] leading-[1.7]">
                    {formState.resultCopy}
                  </p>
                </div>
              </div>
            </div>
          }
          main={
            <div className="max-w-lg">
              <h3 className="text-shell-foreground mb-8 text-[0.95rem] font-medium">
                Enviar mensagem
              </h3>
              {formState.isSent ? (
                <div
                  aria-live="polite"
                  className="mb-8 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-emerald-100 text-[0.8rem] leading-[1.6]"
                >
                  {siteConfig.contactSuccessMessage}
                </div>
              ) : null}
              {!formState.isConfigured ? (
                <div className="mb-8 rounded-lg border border-shell-border bg-shell-surface px-4 py-3 text-shell-muted-foreground text-[0.8rem] leading-[1.6]">
                  Configure <code>VITE_FORMSUBMIT_ACTION</code> e <code>VITE_SITE_URL</code> para
                  ativar o envio real deste formulário.
                </div>
              ) : null}
              <form
                action={formState.isConfigured ? formSubmitAction : undefined}
                method="POST"
                className="flex flex-col gap-6"
              >
                <input type="hidden" name="_subject" value={siteConfig.contactFormSubject} />
                <input type="hidden" name="_next" value={returnUrl} />
                <input type="hidden" name="_autoresponse" value={siteConfig.contactAutoResponse} />
                <input type="hidden" name="_template" value="table" />
                <input
                  type="text"
                  name="_honey"
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />
                <div>
                  <label className="block text-shell-muted-foreground mb-2 text-[0.75rem]">
                    Nome
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="w-full bg-transparent border-b border-shell-border pb-3 text-shell-foreground outline-none focus:border-shell-muted-foreground transition-colors text-[0.85rem]"
                    placeholder="Seu nome"
                    autoComplete="name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-shell-muted-foreground mb-2 text-[0.75rem]">
                    E-mail
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="w-full bg-transparent border-b border-shell-border pb-3 text-shell-foreground outline-none focus:border-shell-muted-foreground transition-colors text-[0.85rem]"
                    placeholder="Seu e-mail"
                    autoComplete="email"
                    required
                  />
                </div>
                <div>
                  <label className="block text-shell-muted-foreground mb-2 text-[0.75rem]">
                    Mensagem
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    className="w-full bg-transparent border-b border-shell-border pb-3 text-shell-foreground outline-none focus:border-shell-muted-foreground transition-colors resize-none text-[0.85rem]"
                    placeholder="Explique o desafio, o contexto e o que você precisa."
                    required
                  />
                </div>
                <div>
                  <Button type="submit" disabled={formState.isSubmitDisabled}>
                    {formState.submitLabel}
                  </Button>
                </div>
              </form>
            </div>
          }
        />
      </section>
    </div>
  );
}
