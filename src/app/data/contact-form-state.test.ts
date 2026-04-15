import { describe, expect, it } from 'vitest';

import { createContactFormState } from './contact-form-state';

describe('createContactFormState', () => {
  it('returns pending state when config is missing', () => {
    const state = createContactFormState({
      formSubmitAction: '',
      returnUrl: '',
      isSent: false,
    });

    expect(state.status).toBe('pending');
    expect(state.isConfigured).toBe(false);
    expect(state.isSubmitDisabled).toBe(true);
    expect(state.submitLabel).toBe('Canal em configuração');
  });

  it('returns ready state when config exists and message is not sent', () => {
    const state = createContactFormState({
      formSubmitAction: 'https://formsubmit.co/token',
      returnUrl: 'https://kayro.dev/contact?sent=1',
      isSent: false,
    });

    expect(state.status).toBe('ready');
    expect(state.isConfigured).toBe(true);
    expect(state.isSent).toBe(false);
    expect(state.isSubmitDisabled).toBe(false);
    expect(state.submitLabel).toBe('Enviar mensagem');
  });

  it('returns sent state when configured form comes back with sent flag', () => {
    const state = createContactFormState({
      formSubmitAction: 'https://formsubmit.co/token',
      returnUrl: 'https://kayro.dev/contact?sent=1',
      isSent: true,
    });

    expect(state.status).toBe('sent');
    expect(state.isConfigured).toBe(true);
    expect(state.isSent).toBe(true);
    expect(state.isSubmitDisabled).toBe(false);
  });
});
