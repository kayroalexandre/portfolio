import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';

import { Footer } from './Footer';

function renderWithRouter(ui: React.ReactElement) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

describe('Footer', () => {
  it('renders the site name', () => {
    renderWithRouter(<Footer />);

    expect(screen.getByText('KAYRO GOMES')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    renderWithRouter(<Footer />);

    expect(screen.getByText('Projetos')).toBeInTheDocument();
    expect(screen.getByText('Sobre')).toBeInTheDocument();
    expect(screen.getByText('Contato')).toBeInTheDocument();
  });
});
