import { type ComponentType, lazy, type LazyExoticComponent } from 'react';

import type { ProjectCaseStudy } from './projects';

const caseStudyLoaders = {
  monetix: () =>
    import('./monetixContent').then(({ MonetixContent }) => ({ default: MonetixContent })),
  unimedpay: () =>
    import('./unimedpayContent').then(({ UnimedPayContent }) => ({ default: UnimedPayContent })),
} satisfies Record<ProjectCaseStudy, () => Promise<{ default: ComponentType }>>;

export const caseStudyContentMap: Record<ProjectCaseStudy, LazyExoticComponent<ComponentType>> = {
  monetix: lazy(caseStudyLoaders.monetix),
  unimedpay: lazy(caseStudyLoaders.unimedpay),
};
