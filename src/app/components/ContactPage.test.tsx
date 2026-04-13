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

      expect(
        screen.getByRole('heading', { level: 3, name: /formulário em ajustes/i })
      ).toBeInTheDocument();
      // "ajustes técnicos" appears in both the sidebar and the fallback card
      const ajustesElements = screen.getAllByText(/ajustes técnicos/i);
      expect(ajustesElements.length).toBeGreaterThanOrEqual(1);
    });

    it('renders a LinkedIn contact link in fallback mode', () => {
      renderWithRouter(<ContactPage />);

      const linkedInLink = screen.getByText('Contato via LinkedIn');
      expect(linkedInLink).toBeInTheDocument();
      expect(linkedInLink).toHaveAttribute('href', 'https://www.linkedin.com/in/kayrogomes/');
    });

    it('does not render the form fields in fallback mode', () => {
      renderWithRouter(<ContactPage />);

      expect(screen.queryByLabelText('Nome')).not.toBeInTheDocument();
      expect(screen.queryByLabelText('E-mail')).not.toBeInTheDocument();
      expect(screen.queryByLabelText('Mensagem')).not.toBeInTheDocument();
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
