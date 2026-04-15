import { siteConfig } from './site';

export type ContactFormStatus = 'pending' | 'ready' | 'sent';

export interface ContactFormStateInput {
  readonly formSubmitAction: string;
  readonly returnUrl: string;
  readonly isSent: boolean;
}

export interface ContactFormState {
  readonly status: ContactFormStatus;
  readonly isConfigured: boolean;
  readonly isSent: boolean;
  readonly isSubmitDisabled: boolean;
  readonly submitLabel: string;
  readonly availabilityCopy: string;
  readonly resultCopy: string;
}

function resolveStatus(isConfigured: boolean, isSent: boolean): ContactFormStatus {
  if (!isConfigured) {
    return 'pending';
  }

  if (isSent) {
    return 'sent';
  }

  return 'ready';
}

export function createContactFormState(input: ContactFormStateInput): ContactFormState {
  const isConfigured = Boolean(input.formSubmitAction.trim() && input.returnUrl.trim());
  const status = resolveStatus(isConfigured, input.isSent);

  return {
    status,
    isConfigured,
    isSent: status === 'sent',
    isSubmitDisabled: !isConfigured,
    submitLabel: isConfigured ? 'Enviar mensagem' : 'Canal em configuração',
    availabilityCopy: isConfigured
      ? siteConfig.contactAvailabilityReady
      : siteConfig.contactAvailabilityPending,
    resultCopy: isConfigured ? siteConfig.contactResultReady : siteConfig.contactResultPending,
  };
}
