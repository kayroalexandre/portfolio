import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';

import { Footer } from './Footer';

function renderWithRouter(ui: React.ReactElement) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

describe('Footer', () => {
  it('renders the CTA text', () => {
    renderWithRouter(<Footer />);

    expect(
      screen.getByText(
        'Disponível para conversar sobre produto, UX estratégico, fluxos críticos e design systems.'
      )
    ).toBeInTheDocument();
  });

  it('renders a contact link when no email is configured', () => {
    renderWithRouter(<Footer />);

    expect(screen.getByText('Contato via LinkedIn')).toBeInTheDocument();
  });

  it('renders the site name', () => {
    renderWithRouter(<Footer />);

    expect(screen.getByText('KAYRO GOMES')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    renderWithRouter(<Footer />);

    expect(screen.getByText('Ver estudos de caso')).toBeInTheDocument();
    expect(screen.getByText('Abrir página de contato')).toBeInTheDocument();
  });
});
