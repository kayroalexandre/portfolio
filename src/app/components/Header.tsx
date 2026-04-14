import { Link, useLocation } from 'react-router';

import { DynamicName } from './DynamicName';

export function Header() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isProjects = location.pathname === '/projects' || location.pathname.startsWith('/project/');

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
          className={`${isHome ? 'text-white' : 'text-neutral-400'} hover:text-white transition-colors`}
          aria-current={isHome ? 'page' : undefined}
        >
          Início
        </Link>
        <Link
          to="/projects"
          className={`${isProjects ? 'text-white' : 'text-neutral-400'} hover:text-white transition-colors`}
          aria-current={isProjects ? 'page' : undefined}
        >
          Projetos
        </Link>
        <Link
          to="/about"
          className={`${location.pathname === '/about' ? 'text-white' : 'text-neutral-400'} hover:text-white transition-colors`}
          aria-current={location.pathname === '/about' ? 'page' : undefined}
        >
          Sobre
        </Link>
        <Link
          to="/contact"
          className={`${location.pathname === '/contact' ? 'text-white' : 'text-neutral-400'} hover:text-white transition-colors`}
          aria-current={location.pathname === '/contact' ? 'page' : undefined}
        >
          Contato
        </Link>
      </nav>
    </>
  );
}
