import { Link, useLocation } from 'react-router';

import { siteNavigationItems } from '../data/site';
import { DynamicName } from './DynamicName';

export function Header() {
  const location = useLocation();
  const navLinkClass = 'hover:text-shell-foreground transition-colors';

  return (
    <>
      <div className="px-6 md:px-12 pt-8 w-full">
        <Link to="/" className="block w-full">
          <DynamicName as="h1" />
        </Link>
      </div>

      <nav className="flex justify-between items-center w-full px-6 md:px-12 py-6 text-[0.875rem]">
        {siteNavigationItems.map((item) => {
          const isActive = item.isActive(location.pathname);

          return (
            <Link
              key={item.href}
              to={item.href}
              className={`${isActive ? 'text-shell-foreground' : 'text-shell-muted-foreground'} ${navLinkClass}`}
              aria-current={isActive ? 'page' : undefined}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
