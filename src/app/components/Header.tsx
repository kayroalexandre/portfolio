import { Link, useLocation } from 'react-router';

import { DynamicName } from './DynamicName';

export function Header() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isProjects = location.pathname === '/projects' || location.pathname.startsWith('/project/');
  const navLinkClass = 'hover:text-shell-foreground transition-colors';

  return (
    <>
      <div className="px-6 md:px-12 pt-8 w-full">
        <Link to="/" className="block w-full">
          <DynamicName as="h1" />
        </Link>
      </div>

      <nav
        className="flex justify-between items-center w-full px-6 md:px-12 py-6"
        style={{ fontSize: '0.875rem' }}
      >
        <Link
          to="/"
          className={`${isHome ? 'text-shell-foreground' : 'text-shell-muted-foreground'} ${navLinkClass}`}
          aria-current={isHome ? 'page' : undefined}
        >
          Início
        </Link>
        <Link
          to="/projects"
          className={`${isProjects ? 'text-shell-foreground' : 'text-shell-muted-foreground'} ${navLinkClass}`}
          aria-current={isProjects ? 'page' : undefined}
        >
          Projetos
        </Link>
        <Link
          to="/about"
          className={`${location.pathname === '/about' ? 'text-shell-foreground' : 'text-shell-muted-foreground'} ${navLinkClass}`}
          aria-current={location.pathname === '/about' ? 'page' : undefined}
        >
          Sobre
        </Link>
        <Link
          to="/contact"
          className={`${location.pathname === '/contact' ? 'text-shell-foreground' : 'text-shell-muted-foreground'} ${navLinkClass}`}
          aria-current={location.pathname === '/contact' ? 'page' : undefined}
        >
          Contato
        </Link>
      </nav>
    </>
  );
}
