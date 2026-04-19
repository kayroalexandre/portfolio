import { Link } from 'react-router';

import { siteConfig, siteNavigationItems } from '../data/site';
import { DynamicName } from './DynamicName';
import { ThreeColumnLayout } from './ui/layout-three-column';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="px-6 md:px-12 py-12 border-t border-shell-border">
      <div className="mb-20 text-[0.8rem]">
        <ThreeColumnLayout
          left={
            <p className="text-shell-muted-foreground">
              &copy;{year} {siteConfig.name}
            </p>
          }
          center={<></>}
          right={
            <div className="flex flex-wrap items-center gap-6 text-shell-muted-foreground">
              {siteNavigationItems
                .filter((item) => item.href !== '/')
                .map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="block hover:text-shell-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
            </div>
          }
        />
      </div>

      <div className="w-full">
        <DynamicName as="h2" className="text-shell-foreground" />
      </div>
    </footer>
  );
}
