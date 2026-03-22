import { Link } from "react-router";
import { DynamicName } from "./DynamicName";
import { siteConfig } from "../data/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="px-6 md:px-12 py-12 border-t border-white/10"
    >
      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
        style={{ fontSize: "0.8rem" }}
      >
        <p className="text-neutral-500">
          &copy;{year} {siteConfig.name}
        </p>
        <div>
          <p className="text-white mb-1">{siteConfig.footerCta}</p>
          <p className="text-neutral-500">
            {siteConfig.publicEmail ?? "Canal público de contato em atualização."}
          </p>
        </div>
        <div className="text-neutral-500 space-y-2">
          <Link
            to="/projects"
            className="block hover:text-white transition-colors"
          >
            Ver estudos de caso
          </Link>
          <Link
            to="/contact"
            className="block hover:text-white transition-colors"
          >
            Abrir página de contato
          </Link>
        </div>
      </div>

      <div className="w-full">
        <DynamicName as="h2" className="text-white" />
      </div>
    </footer>
  );
}
