import { FolderOpen, Layers } from 'lucide-react';
import { Link } from 'react-router';

import { projects } from '../data/projects';
import { siteConfig } from '../data/site';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ScrollZoomImage } from './ScrollZoomImage';
import { SectionHeader } from './SectionHeader';
import { Button } from './ui/button';
import { ThreeColumnLayout } from './ui/layout-three-column';

export function HomePage() {
  useDocumentTitle('home');

  return (
    <>
      <section className="pb-4">
        <div className="px-6 md:px-12 pt-35">
          <p className="max-w-md text-shell-foreground mb-4 text-[0.9rem] leading-[1.6]">
            {siteConfig.heroIntro}
          </p>
          <p className="max-w-xl text-shell-muted-foreground mb-8 text-[0.85rem] leading-[1.8]">
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
                  <p className="text-shell-foreground mb-1 text-[0.9rem]">{project.title}</p>
                  <p className="text-shell-muted-foreground text-[0.75rem]">{project.category}</p>
                </div>
                <span className="text-shell-muted-foreground text-[0.75rem]">{project.year}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section id="about" className="px-6 md:px-12 py-20 border-t border-shell-border">
        <SectionHeader
          icon={<Layers size={16} />}
          label="Serviços"
          title="O que eu faço"
          description={siteConfig.servicesIntro}
          className="mb-16"
        />

        <div className="border-t border-shell-border pt-10">
          <ThreeColumnLayout
            left={
              <div>
                <p className="text-shell-muted-foreground mb-4 text-[0.75rem]">Escopo:</p>
                <ul className="space-y-1 text-shell-foreground text-[0.85rem]">
                  <li>Discovery</li>
                  <li>Arquitetura de informação</li>
                  <li>UX transacional</li>
                  <li className="text-shell-muted-foreground">Handoff para implementação</li>
                </ul>
              </div>
            }
            center={
              <div>
                <p className="text-shell-muted-foreground mb-4 text-[0.75rem]">Foco:</p>
                <ul className="space-y-1 text-shell-foreground text-[0.85rem]">
                  <li>Fintech</li>
                  <li>Healthtech</li>
                  <li>Fluxos operacionais</li>
                  <li>Dados e confiança</li>
                  <li className="text-shell-muted-foreground">Produtos complexos</li>
                </ul>
              </div>
            }
            right={
              <div>
                <p className="text-shell-muted-foreground mb-4 text-[0.75rem]">Entregáveis:</p>
                <ul className="space-y-1 text-shell-foreground text-[0.85rem]">
                  <li>Fluxos e protótipos</li>
                  <li>Interfaces e estados</li>
                  <li>Design systems</li>
                  <li className="text-shell-muted-foreground">Documentação de decisão</li>
                </ul>
              </div>
            }
          />
        </div>
      </section>
    </>
  );
}
