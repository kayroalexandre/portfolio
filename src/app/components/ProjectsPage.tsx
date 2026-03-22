import { FolderOpen } from "lucide-react";
import { Link } from "react-router";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { projects } from "../data/projects";
import { siteConfig } from "../data/site";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export function ProjectsPage() {
  useDocumentTitle("Projetos");

  return (
    <div className="pb-20">
      <section className="px-6 md:px-12 pt-16 pb-12">
        <div className="flex flex-col md:flex-row gap-8">
          <div
            className="flex items-start gap-2 text-neutral-400 md:w-1/4"
            style={{ fontSize: "0.85rem" }}
          >
            <FolderOpen size={16} className="mt-0.5" />
            <span>Projetos</span>
          </div>
          <div className="md:w-3/4 max-w-lg">
            <h2
              className="text-white mb-3"
              style={{ fontSize: "2rem", fontWeight: 600 }}
            >
              Cases publicados
            </h2>
            <p
              className="text-neutral-400"
              style={{ fontSize: "0.85rem", lineHeight: 1.7 }}
            >
              {siteConfig.projectsIntro}
            </p>
          </div>
        </div>
      </section>

      <div
        className="px-6 md:px-12 mb-8 flex justify-between text-neutral-600"
        style={{ fontSize: "1.2rem" }}
      >
        <span>+</span>
        <span>+</span>
        <span>+</span>
        <span>+</span>
      </div>

      <section className="px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project) => (
            <Link
              key={project.slug}
              to={`/project/${project.slug}`}
              className="group block"
            >
              <div className="aspect-[16/10] rounded-lg overflow-hidden mb-4 border border-white/10">
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex items-start justify-between gap-6">
                <div className="max-w-lg">
                  <p className="text-white mb-1" style={{ fontSize: "1rem" }}>
                    {project.title}
                  </p>
                  <p className="text-neutral-500 mb-2" style={{ fontSize: "0.75rem" }}>
                    {project.category} · {project.client}
                  </p>
                  <p className="text-neutral-400" style={{ fontSize: "0.85rem", lineHeight: 1.7 }}>
                    {project.description}
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
    </div>
  );
}
