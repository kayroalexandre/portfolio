import { Layers, FolderOpen } from "lucide-react";
import { Link } from "react-router";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ScrollZoomImage } from "./ScrollZoomImage";
import { projects } from "../data/projects";
import { siteConfig } from "../data/site";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export function HomePage() {
  useDocumentTitle();

  return (
    <>
      <section className="pb-4">
        <div className="px-6 md:px-12" style={{ paddingTop: "160px" }}>
          <p
            className="max-w-md text-neutral-200 mb-4"
            style={{ fontSize: "0.9rem", lineHeight: 1.6 }}
          >
            {siteConfig.heroIntro}
          </p>
          <p
            className="max-w-xl text-neutral-400 mb-8"
            style={{ fontSize: "0.85rem", lineHeight: 1.8 }}
          >
            {siteConfig.heroSupport}
          </p>
          <div className="flex gap-3 mb-10">
            <Link
              to="/projects"
              className="bg-white text-black rounded-full px-5 py-2 hover:bg-white/80 transition-colors"
              style={{ fontSize: "0.8rem" }}
            >
              Ver projetos
            </Link>
            <Link
              to="/contact"
              className="border border-white/30 rounded-full px-5 py-2 text-white hover:bg-white hover:text-black transition-colors"
              style={{ fontSize: "0.8rem" }}
            >
              Preparar briefing
            </Link>
          </div>
        </div>

        <div className="w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden">
          <ScrollZoomImage
            src={siteConfig.heroImage}
            alt={siteConfig.heroImageAlt}
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      <section id="projects" className="px-6 md:px-12 py-20">
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div
            className="flex items-start gap-2 text-neutral-400 md:w-1/4"
            style={{ fontSize: "0.85rem" }}
          >
            <FolderOpen size={16} className="mt-0.5" />
            <span>Projetos</span>
          </div>
          <div className="md:w-3/4 max-w-lg">
            <h2
              className="text-white mb-4"
              style={{ fontSize: "2rem", fontWeight: 600 }}
            >
              Estudos de caso
            </h2>
            <p
              className="text-neutral-400 mb-6"
              style={{ fontSize: "0.85rem", lineHeight: 1.7 }}
            >
              {siteConfig.projectsIntro}
            </p>
            <Link
              to="/projects"
              className="bg-white text-black rounded-full px-5 py-2 hover:bg-white/80 transition-colors"
              style={{ fontSize: "0.8rem" }}
            >
              Ver todos os cases
            </Link>
          </div>
        </div>

        <div
          className="flex justify-between px-8 mb-8 text-neutral-600"
          style={{ fontSize: "1.2rem" }}
        >
          <span>+</span>
          <span>+</span>
          <span>+</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Link
              key={project.slug}
              to={`/project/${project.slug}`}
              className="group cursor-pointer"
            >
              <div className="aspect-[4/3] rounded-lg overflow-hidden mb-3">
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-white mb-1" style={{ fontSize: "0.9rem" }}>
                    {project.title}
                  </p>
                  <p className="text-neutral-500" style={{ fontSize: "0.75rem" }}>
                    {project.category}
                  </p>
                </div>
                <span className="text-neutral-500" style={{ fontSize: "0.75rem" }}>
                  {project.year}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section
        id="about"
        className="px-6 md:px-12 py-20 border-t border-white/10"
      >
        <div className="flex flex-col md:flex-row gap-8 mb-16">
          <div
            className="flex items-start gap-2 text-neutral-400 md:w-1/4"
            style={{ fontSize: "0.85rem" }}
          >
            <Layers size={16} className="mt-0.5" />
            <span>Serviços</span>
          </div>
          <div className="md:w-3/4 max-w-lg">
            <p
              className="text-neutral-400"
              style={{ fontSize: "0.85rem", lineHeight: 1.7 }}
            >
              {siteConfig.servicesIntro}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 border-t border-white/10 pt-10">
          <div>
            <p
              className="text-neutral-500 mb-4"
              style={{ fontSize: "0.75rem" }}
            >
              Escopo:
            </p>
            <ul className="space-y-1 text-white" style={{ fontSize: "0.85rem" }}>
              <li>Discovery</li>
              <li>Arquitetura de informação</li>
              <li>UX transacional</li>
              <li className="text-neutral-500">Handoff para implementação</li>
            </ul>
          </div>
          <div>
            <p
              className="text-neutral-500 mb-4"
              style={{ fontSize: "0.75rem" }}
            >
              Foco:
            </p>
            <ul className="space-y-1 text-white" style={{ fontSize: "0.85rem" }}>
              <li>Fintech</li>
              <li>Healthtech</li>
              <li>Fluxos operacionais</li>
              <li>Dados e confiança</li>
              <li className="text-neutral-500">Produtos complexos</li>
            </ul>
          </div>
          <div>
            <p
              className="text-neutral-500 mb-4"
              style={{ fontSize: "0.75rem" }}
            >
              Entregáveis:
            </p>
            <ul className="space-y-1 text-white" style={{ fontSize: "0.85rem" }}>
              <li>Fluxos e protótipos</li>
              <li>Interfaces e estados</li>
              <li>Design systems</li>
              <li className="text-neutral-500">Documentação de decisão</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
