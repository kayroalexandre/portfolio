import { useState } from "react";
import { User, Layers, Briefcase, Plus } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { siteConfig } from "../data/site";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export function AboutPage() {
  const [openService, setOpenService] = useState(0);
  useDocumentTitle("Sobre");

  return (
    <div className="pb-20">
      <section className="px-6 md:px-12 pt-16 pb-16">
        <div className="flex flex-col md:flex-row gap-8 mb-16">
          <div
            className="flex items-start gap-2 text-neutral-400 md:w-1/4"
            style={{ fontSize: "0.85rem" }}
          >
            <User size={16} className="mt-0.5" />
            <span>Sobre</span>
          </div>
          <div className="md:w-3/4 max-w-lg">
            <h2
              className="text-white mb-4"
              style={{ fontSize: "2rem", fontWeight: 600 }}
            >
              Sobre
            </h2>
            <p
              className="text-neutral-300 mb-4"
              style={{ fontSize: "0.85rem", lineHeight: 1.7 }}
            >
              {siteConfig.aboutIntro}
            </p>
            <p
              className="text-neutral-400"
              style={{ fontSize: "0.85rem", lineHeight: 1.7 }}
            >
              {siteConfig.aboutSupport}
            </p>
          </div>
        </div>

        <div className="relative">
          <div
            className="flex justify-between px-4 mb-4 text-neutral-600"
            style={{ fontSize: "1.2rem" }}
          >
            <span>+</span>
            <span>+</span>
            <span>+</span>
            <span>+</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {siteConfig.aboutGallery.map((image) => (
              <div
                key={image.alt}
                className="aspect-[4/5] rounded-lg overflow-hidden"
              >
                <ImageWithFallback
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-20 border-t border-white/10">
        <div className="flex flex-col md:flex-row gap-8 mb-12">
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

        <div className="md:ml-[25%]">
          {siteConfig.services.map((service, index) => (
            <div key={service.num} className="border-t border-white/10">
              <button
                type="button"
                onClick={() => setOpenService(openService === index ? -1 : index)}
                className="w-full flex items-center gap-8 py-5 text-left group"
                aria-expanded={openService === index}
                aria-controls={`service-panel-${index}`}
              >
                <span
                  className="text-neutral-500"
                  style={{ fontSize: "0.8rem" }}
                >
                  {service.num}
                </span>
                <span
                  className="flex-1 text-white"
                  style={{ fontSize: "0.9rem" }}
                >
                  {service.title}
                </span>
                <Plus
                  size={16}
                  className={`text-neutral-500 transition-transform duration-300 ${
                    openService === index ? "rotate-45" : ""
                  }`}
                />
              </button>
              <div
                id={`service-panel-${index}`}
                className="overflow-hidden transition-all duration-300"
                style={{
                  maxHeight: openService === index ? "200px" : "0",
                  opacity: openService === index ? 1 : 0,
                }}
              >
                <p
                  className="text-neutral-400 pb-6 pl-14 max-w-md"
                  style={{ fontSize: "0.8rem", lineHeight: 1.7 }}
                >
                  {service.description}
                </p>
              </div>
            </div>
          ))}
          <div className="border-t border-white/10" />
        </div>
      </section>

      <section className="px-6 md:px-12 py-20 border-t border-white/10">
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div
            className="flex items-start gap-2 text-neutral-400 md:w-1/4"
            style={{ fontSize: "0.85rem" }}
          >
            <Briefcase size={16} className="mt-0.5" />
            <span>Prática</span>
          </div>
          <div className="md:w-3/4 max-w-lg">
            <p
              className="text-neutral-400"
              style={{ fontSize: "0.85rem", lineHeight: 1.7 }}
            >
              Prefiro explicar o trabalho pela forma como ele é conduzido:
              entender o problema, estruturar a decisão, dar forma à solução e
              deixar o sistema pronto para continuar evoluindo.
            </p>
          </div>
        </div>

        <div className="md:ml-[25%]">
          {siteConfig.practice.map((item) => (
            <div
              key={item.title}
              className="border-t border-white/10 py-5 flex items-start justify-between"
            >
              <div className="max-w-xl">
                <p className="text-white mb-1" style={{ fontSize: "0.9rem" }}>
                  {item.title}
                </p>
                <p className="text-neutral-500" style={{ fontSize: "0.8rem" }}>
                  {item.body}
                </p>
              </div>
            </div>
          ))}
          <div className="border-t border-white/10" />
        </div>
      </section>
    </div>
  );
}
