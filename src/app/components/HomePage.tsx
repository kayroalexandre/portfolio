import { FolderOpen, Layers } from 'lucide-react';
import { Link } from 'react-router';

import { projects } from '../data/projects';
import { siteConfig } from '../data/site';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ScrollZoomImage } from './ScrollZoomImage';
import { SectionDivider } from './SectionDivider';
import { SectionHeader } from './SectionHeader';
import { Button } from './ui/button';

export function HomePage() {
  useDocumentTitle();

  return (
    <>
      <section className="pb-4">
        <div className="px-6 md:px-12" style={{ paddingTop: '160px' }}>
          <p
            className="max-w-md text-neutral-200 mb-4"
            style={{ fontSize: '0.9rem', lineHeight: 1.6 }}
          >
            {siteConfig.heroIntro}
          </p>
          <p
            className="max-w-xl text-neutral-400 mb-8"
            style={{ fontSize: '0.85rem', lineHeight: 1.8 }}
          >
            {siteConfig.heroSupport}
          </p>
          <div className="flex gap-3 mb-10">
            <Button asChild>
              <Link to="/projects">Ver projetos</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/contact">Preparar briefing</Link>
            </Button>
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
        <SectionHeader
          icon={<FolderOpen size={16} />}
          label="Projetos"
          title="Estudos de caso"
          description={siteConfig.projectsIntro}
          className="mb-12"
          descriptionClassName="mb-6"
        />

        <Button asChild>
          <Link to="/projects">Ver todos os cases</Link>
        </Button>

        <SectionDivider className="px-8 mb-8 mt-12" />

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
                  <p className="text-white mb-1" style={{ fontSize: '0.9rem' }}>
                    {project.title}
                  </p>
                  <p className="text-neutral-500" style={{ fontSize: '0.75rem' }}>
                    {project.category}
                  </p>
                </div>
                <span className="text-neutral-500" style={{ fontSize: '0.75rem' }}>
                  {project.year}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section id="about" className="px-6 md:px-12 py-20 border-t border-white/10">
        <SectionHeader
          icon={<Layers size={16} />}
          label="Serviços"
          title="O que eu faço"
          description={siteConfig.servicesIntro}
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 border-t border-white/10 pt-10">
          <div>
            <p className="text-neutral-500 mb-4" style={{ fontSize: '0.75rem' }}>
              Escopo:
            </p>
            <ul className="space-y-1 text-white" style={{ fontSize: '0.85rem' }}>
              <li>Discovery</li>
              <li>Arquitetura de informação</li>
              <li>UX transacional</li>
              <li className="text-neutral-500">Handoff para implementação</li>
            </ul>
          </div>
          <div>
            <p className="text-neutral-500 mb-4" style={{ fontSize: '0.75rem' }}>
              Foco:
            </p>
            <ul className="space-y-1 text-white" style={{ fontSize: '0.85rem' }}>
              <li>Fintech</li>
              <li>Healthtech</li>
              <li>Fluxos operacionais</li>
              <li>Dados e confiança</li>
              <li className="text-neutral-500">Produtos complexos</li>
            </ul>
          </div>
          <div>
            <p className="text-neutral-500 mb-4" style={{ fontSize: '0.75rem' }}>
              Entregáveis:
            </p>
            <ul className="space-y-1 text-white" style={{ fontSize: '0.85rem' }}>
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
