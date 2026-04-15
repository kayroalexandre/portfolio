import { siteConfig } from './site';

export type PageTitleKey = 'home' | 'projects' | 'about' | 'contact' | 'notFound';

export type DocumentTitleInput = PageTitleKey | string | undefined;

const pageTitleMap: Record<PageTitleKey, string> = {
  home: '',
  projects: 'Projetos',
  about: 'Sobre',
  contact: 'Contato',
  notFound: 'Página não encontrada',
};

export const routePageKeyByPath = {
  '/': 'home',
  '/projects': 'projects',
  '/about': 'about',
  '/contact': 'contact',
  '*': 'notFound',
} as const satisfies Record<string, PageTitleKey>;

function isPageTitleKey(value: string): value is PageTitleKey {
  return value in pageTitleMap;
}

export function resolveDocumentTitle(input?: DocumentTitleInput): string {
  if (!input) {
    return siteConfig.title;
  }

  if (isPageTitleKey(input)) {
    const pageTitle = pageTitleMap[input];
    return pageTitle ? `${pageTitle} | ${siteConfig.name}` : siteConfig.title;
  }

  return `${input} | ${siteConfig.name}`;
}
