import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';

import { Header } from './Header';

function renderWithRouter(ui: React.ReactElement, { route = '/' } = {}) {
  return render(<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>);
}

describe('Header', () => {
  it('renders navigation links', () => {
    renderWithRouter(<Header />);

    expect(screen.getByText('Início')).toBeInTheDocument();
    expect(screen.getByText('Projetos')).toBeInTheDocument();
    expect(screen.getByText('Sobre')).toBeInTheDocument();
    expect(screen.getByText('Contato')).toBeInTheDocument();
  });

  it('renders the site name', () => {
    renderWithRouter(<Header />);

    expect(screen.getByText('KAYRO GOMES')).toBeInTheDocument();
  });

  it('marks the current page link with aria-current', () => {
    renderWithRouter(<Header />, { route: '/projects' });

    const projectsLink = screen.getByText('Projetos');
    expect(projectsLink).toHaveAttribute('aria-current', 'page');

    const homeLink = screen.getByText('Início');
    expect(homeLink).not.toHaveAttribute('aria-current');
  });
});
