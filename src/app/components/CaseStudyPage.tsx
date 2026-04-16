import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Suspense } from 'react';
import { Link, useNavigate, useParams } from 'react-router';

import { caseStudyContentMap } from '../data/project-cases';
import { getProjectBySlug, getProjectNavigation } from '../data/projects';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { SidebarLayout } from './ui/layout-sidebar';

export function CaseStudyPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = slug ? getProjectBySlug(slug) : undefined;
  const navigation = slug ? getProjectNavigation(slug) : null;
  useDocumentTitle(project ? project.title : 'Projeto não encontrado');

  if (!project) {
    return (
      <div className="px-6 md:px-12 py-40 text-center">
        <p className="text-shell-muted-foreground mb-6">Projeto não encontrado.</p>
        <Button asChild>
          <Link to="/">Voltar ao início</Link>
        </Button>
      </div>
    );
  }

  const ContentComponent = project.caseStudy ? caseStudyContentMap[project.caseStudy] : null;

  return (
    <div className="pb-20">
      <div className="w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden">
        <ImageWithFallback
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="px-6 md:px-12 pt-16 pb-12">
        <h2 className="text-shell-foreground mb-8 text-[2.5rem] font-bold leading-[1.1]">
          {project.title}
        </h2>

        <SidebarLayout
          sidebarWidth="1/3"
          gap="spacious"
          sidebar={
            <div className="space-y-6">
              <div>
                <p className="text-shell-muted-foreground mb-1 text-[0.75rem]">Cliente</p>
                <p className="text-shell-foreground text-[0.85rem]">{project.client}</p>
              </div>
              <div>
                <p className="text-shell-muted-foreground mb-1 text-[0.75rem]">Categoria</p>
                <p className="text-shell-foreground text-[0.85rem]">{project.category}</p>
              </div>
              <div>
                <p className="text-shell-muted-foreground mb-1 text-[0.75rem]">Ano</p>
                <p className="text-shell-foreground text-[0.85rem]">{project.year}</p>
              </div>
            </div>
          }
          main={
            <p className="text-shell-muted-foreground max-w-xl text-[0.9rem] leading-[1.8]">
              {project.description}
            </p>
          }
        />
      </div>

      {ContentComponent ? (
        <div className="px-6 md:px-12 pb-16 pt-8 flex justify-center">
          <Suspense
            fallback={
              <p className="text-sm text-shell-muted-foreground">Carregando estudo de caso...</p>
            }
          >
            <ContentComponent />
          </Suspense>
        </div>
      ) : null}

      <div className="px-6 md:px-12 mt-20 pt-12 border-t border-shell-border">
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={() => navigate(`/project/${navigation?.previous.slug ?? project.slug}`)}
            className="flex items-center gap-3 text-shell-muted-foreground hover:text-shell-foreground transition-colors group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <div className="text-left">
              <p className="text-shell-muted-foreground text-[0.7rem]">Anterior</p>
              <p className="text-[0.85rem]">{navigation?.previous.title ?? project.title}</p>
            </div>
          </button>

          <Button asChild variant="ghost" className="hidden md:inline-flex">
            <Link to="/projects">Todos os cases</Link>
          </Button>

          <button
            type="button"
            onClick={() => navigate(`/project/${navigation?.next.slug ?? project.slug}`)}
            className="flex items-center gap-3 text-shell-muted-foreground hover:text-shell-foreground transition-colors group"
          >
            <div className="text-right">
              <p className="text-shell-muted-foreground text-[0.7rem]">Próximo</p>
              <p className="text-[0.85rem]">{navigation?.next.title ?? project.title}</p>
            </div>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
