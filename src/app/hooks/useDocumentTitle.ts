import { useEffect } from 'react';

import { siteConfig } from '../data/site';

export function useDocumentTitle(pageTitle?: string) {
  useEffect(() => {
    document.title = pageTitle ? `${pageTitle} | ${siteConfig.name}` : siteConfig.title;

    return () => {
      document.title = siteConfig.title;
    };
  }, [pageTitle]);
}
