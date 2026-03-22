import { Suspense, lazy } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { projects } from "../data/projects";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const MonetixContent = lazy(() =>
  import("../data/monetixContent").then(({ MonetixContent }) => ({
    default: MonetixContent,
  })),
);

const UnimedPayContent = lazy(() =>
  import("../data/unimedpayContent").then(({ UnimedPayContent }) => ({
    default: UnimedPayContent,
  })),
);

const caseStudyContentMap = {
  monetix: MonetixContent,
  unimedpay: UnimedPayContent,
} as const;

export function CaseStudyPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const index = projects.findIndex((project) => project.slug === slug);
  const project = projects[index];
  useDocumentTitle(project ? project.title : "Projeto não encontrado");

  if (!project) {
    return (
      <div className="px-6 md:px-12 py-40 text-center">
        <p className="text-neutral-400 mb-6">Projeto não encontrado.</p>
        <Link
          to="/"
          className="bg-white text-black rounded-full px-5 py-2 hover:bg-white/80 transition-colors"
          style={{ fontSize: "0.8rem" }}
        >
          Voltar ao início
        </Link>
      </div>
    );
  }

  const nextProject = projects[(index + 1) % projects.length];
  const prevProject = projects[(index - 1 + projects.length) % projects.length];
  const ContentComponent = project.caseStudy
    ? caseStudyContentMap[project.caseStudy]
    : null;

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
        <h2
          className="text-white mb-8"
          style={{ fontSize: "2.5rem", fontWeight: 700, lineHeight: 1.1 }}
        >
          {project.title}
        </h2>

        <div className="flex flex-col md:flex-row gap-12">
          <div className="md:w-1/3 space-y-6">
            <div>
              <p className="text-neutral-500 mb-1" style={{ fontSize: "0.75rem" }}>
                Cliente
              </p>
              <p className="text-white" style={{ fontSize: "0.85rem" }}>
                {project.client}
              </p>
            </div>
            <div>
              <p className="text-neutral-500 mb-1" style={{ fontSize: "0.75rem" }}>
                Categoria
              </p>
              <p className="text-white" style={{ fontSize: "0.85rem" }}>
                {project.category}
              </p>
            </div>
            <div>
              <p className="text-neutral-500 mb-1" style={{ fontSize: "0.75rem" }}>
                Ano
              </p>
              <p className="text-white" style={{ fontSize: "0.85rem" }}>
                {project.year}
              </p>
            </div>
          </div>

          <div className="md:w-2/3">
            <p
              className="text-neutral-400 max-w-xl"
              style={{ fontSize: "0.9rem", lineHeight: 1.8 }}
            >
              {project.description}
            </p>
          </div>
        </div>
      </div>

      {ContentComponent ? (
        <div className="px-6 md:px-12 pb-16 pt-8 flex justify-center">
          <Suspense
            fallback={
              <p className="text-sm text-neutral-500">Carregando estudo de caso...</p>
            }
          >
            <ContentComponent />
          </Suspense>
        </div>
      ) : null}

      <div className="px-6 md:px-12 mt-20 pt-12 border-t border-white/10">
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={() => navigate(`/project/${prevProject.slug}`)}
            className="flex items-center gap-3 text-neutral-400 hover:text-white transition-colors group"
          >
            <ArrowLeft
              size={18}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <div className="text-left">
              <p className="text-neutral-500" style={{ fontSize: "0.7rem" }}>
                Anterior
              </p>
              <p style={{ fontSize: "0.85rem" }}>{prevProject.title}</p>
            </div>
          </button>

          <Link
            to="/projects"
            className="text-neutral-500 hover:text-white transition-colors hidden md:block"
            style={{ fontSize: "0.8rem" }}
          >
            Todos os cases
          </Link>

          <button
            type="button"
            onClick={() => navigate(`/project/${nextProject.slug}`)}
            className="flex items-center gap-3 text-neutral-400 hover:text-white transition-colors group"
          >
            <div className="text-right">
              <p className="text-neutral-500" style={{ fontSize: "0.7rem" }}>
                Próximo
              </p>
              <p style={{ fontSize: "0.85rem" }}>{nextProject.title}</p>
            </div>
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
