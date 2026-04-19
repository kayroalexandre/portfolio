import { Briefcase, Layers, Plus, User } from 'lucide-react';
import { useState } from 'react';

import { siteConfig } from '../data/site';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { SectionDivider } from './SectionDivider';
import { SectionHeader } from './SectionHeader';

export function AboutPage() {
  const [openService, setOpenService] = useState(0);
  useDocumentTitle('about');

  return (
    <div className="pb-20">
      <section className="px-6 md:px-12 pt-16 pb-16">
        <SectionHeader
          icon={<User size={16} />}
          label="Sobre"
          title="Sobre"
          description={
            <>
              <span className="block text-shell-foreground mb-4 leading-[1.7]">
                {siteConfig.aboutIntro}
              </span>
              <span className="block text-shell-muted-foreground leading-[1.7]">
                {siteConfig.aboutSupport}
              </span>
            </>
          }
          descriptionClassName="space-y-0"
          className="mb-16"
        />

        <div className="relative">
          <SectionDivider count={4} className="px-4 mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {siteConfig.aboutGallery.map((image) => (
              <div key={image.alt} className="aspect-[4/5] rounded-lg overflow-hidden">
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

      <section className="px-6 md:px-12 py-20 border-t border-shell-border">
        <SectionHeader
          icon={<Layers size={16} />}
          label="Serviços"
          title="Serviços"
          description={siteConfig.servicesIntro}
          className="mb-12"
        />

        <div className="md:ml-[25%]">
          {siteConfig.services.map((service, serviceIndex) => (
            <div key={service.num} className="border-t border-shell-border">
              <button
                type="button"
                onClick={() => setOpenService(openService === serviceIndex ? -1 : serviceIndex)}
                className="w-full flex items-center gap-8 py-5 text-left group"
                aria-expanded={openService === serviceIndex}
                aria-controls={`service-panel-${serviceIndex}`}
              >
                <span className="text-shell-muted-foreground text-[0.8rem]">{service.num}</span>
                <span className="flex-1 text-shell-foreground text-[0.9rem]">{service.title}</span>
                <Plus
                  size={16}
                  className={`text-shell-muted-foreground transition-transform duration-300 ${
                    openService === serviceIndex ? 'rotate-45' : ''
                  }`}
                />
              </button>
              <div
                id={`service-panel-${serviceIndex}`}
                className="overflow-hidden transition-all duration-300"
                style={{
                  maxHeight: openService === serviceIndex ? '200px' : '0',
                  opacity: openService === serviceIndex ? 1 : 0,
                }}
              >
                <p className="text-shell-muted-foreground pb-6 pl-14 max-w-md text-[0.8rem] leading-[1.7]">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
          <div className="border-t border-shell-border" />
        </div>
      </section>

      <section className="px-6 md:px-12 py-20 border-t border-shell-border">
        <SectionHeader
          icon={<Briefcase size={16} />}
          label="Prática"
          title="Prática"
          description="Prefiro explicar o trabalho pela forma como ele é conduzido: entender o problema, estruturar a decisão, dar forma à solução e deixar o sistema pronto para continuar evoluindo."
          className="mb-12"
        />

        <div className="md:ml-[25%]">
          {siteConfig.practice.map((practiceEntry) => (
            <div
              key={practiceEntry.title}
              className="border-t border-shell-border py-5 flex items-start justify-between"
            >
              <div className="max-w-xl">
                <p className="text-shell-foreground mb-1 text-[0.9rem]">{practiceEntry.title}</p>
                <p className="text-shell-muted-foreground text-[0.8rem]">{practiceEntry.body}</p>
              </div>
            </div>
          ))}
          <div className="border-t border-shell-border" />
        </div>
      </section>
    </div>
  );
}
