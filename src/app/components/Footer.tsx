import { Link } from 'react-router';

import { siteConfig } from '../data/site';
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
          center={
            <div>
              <p className="text-shell-foreground mb-1">{siteConfig.footerCta}</p>
              <p className="text-shell-muted-foreground">
                {siteConfig.publicEmail ?? 'Canal público de contato em atualização.'}
              </p>
            </div>
          }
          right={
            <div className="text-shell-muted-foreground space-y-2">
              <Link to="/projects" className="block hover:text-shell-foreground transition-colors">
                Ver estudos de caso
              </Link>
              <Link to="/contact" className="block hover:text-shell-foreground transition-colors">
                Abrir página de contato
              </Link>
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
