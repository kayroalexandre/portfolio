import { FolderOpen } from 'lucide-react';
import { Link } from 'react-router';

import { projects } from '../data/projects';
import { siteConfig } from '../data/site';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { SectionDivider } from './SectionDivider';
import { SectionHeader } from './SectionHeader';

export function ProjectsPage() {
  useDocumentTitle('projects');

  return (
    <div className="pb-20">
      <section className="px-6 md:px-12 pt-16 pb-12">
        <SectionHeader
          icon={<FolderOpen size={16} />}
          label="Projetos"
          title="Cases publicados"
          description={siteConfig.projectsIntro}
        />
      </section>

      <SectionDivider count={4} className="px-6 md:px-12 mb-8" />

      <section className="px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project) => (
            <Link key={project.slug} to={`/project/${project.slug}`} className="group block">
              <div className="aspect-[16/10] rounded-lg overflow-hidden mb-4 border border-shell-border">
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex items-start justify-between gap-6">
                <div className="max-w-lg">
                  <p className="text-shell-foreground mb-1 text-[1rem]">{project.title}</p>
                  <p className="text-shell-muted-foreground mb-2 text-[0.75rem]">
                    {project.category} · {project.client}
                  </p>
                  <p className="text-shell-muted-foreground text-[0.85rem] leading-[1.7]">
                    {project.description}
                  </p>
                </div>
                <span className="text-shell-muted-foreground text-[0.75rem]">{project.year}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
