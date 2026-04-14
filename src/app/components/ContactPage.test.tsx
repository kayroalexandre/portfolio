import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';
import { z } from 'zod';

import { ContactPage } from './ContactPage';

function renderWithRouter(ui: React.ReactElement) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

const contactSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('E-mail inválido'),
  message: z.string().min(10, 'Mensagem deve ter pelo menos 10 caracteres'),
});

describe('ContactPage', () => {
  describe('fallback mode (no env vars)', () => {
    it('renders the contact header and intro text', () => {
      renderWithRouter(<ContactPage />);

      // "Contato" appears in both the sidebar label and the h2 heading
      const contactElements = screen.getAllByText('Contato');
      expect(contactElements.length).toBeGreaterThanOrEqual(1);
      // Use the unique h2 heading to verify the page rendered
      expect(screen.getByRole('heading', { level: 2, name: 'Contato' })).toBeInTheDocument();
    });

    it('renders the fallback message when form is not configured', () => {
      renderWithRouter(<ContactPage />);

      expect(screen.getByText(/configure/i)).toBeInTheDocument();
      expect(screen.getByText(/VITE_FORMSUBMIT_ACTION/i)).toBeInTheDocument();
    });

    it('renders a disabled submit button in fallback mode', () => {
      renderWithRouter(<ContactPage />);

      const submitButton = screen.getByRole('button', { name: /canal em configuração/i });
      expect(submitButton).toBeInTheDocument();
      expect(submitButton).toBeDisabled();
    });

    it('renders form fields in fallback mode', () => {
      renderWithRouter(<ContactPage />);

      expect(screen.getByPlaceholderText('Seu nome')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Seu e-mail')).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText('Explique o desafio, o contexto e o que você precisa.')
      ).toBeInTheDocument();
    });
  });

  describe('zod schema validation', () => {
    it('rejects empty name', () => {
      const result = contactSchema.safeParse({
        name: '',
        email: 'test@example.com',
        message: 'This is a test message that is long enough',
      });
      expect(result.success).toBe(false);
    });

    it('rejects invalid email', () => {
      const result = contactSchema.safeParse({
        name: 'Kayro',
        email: 'invalid-email',
        message: 'This is a test message that is long enough',
      });
      expect(result.success).toBe(false);
    });

    it('rejects short message', () => {
      const result = contactSchema.safeParse({
        name: 'Kayro',
        email: 'test@example.com',
        message: 'short',
      });
      expect(result.success).toBe(false);
    });

    it('accepts valid data', () => {
      const result = contactSchema.safeParse({
        name: 'Kayro',
        email: 'test@example.com',
        message: 'This is a test message that is long enough',
      });
      expect(result.success).toBe(true);
    });
  });
});
