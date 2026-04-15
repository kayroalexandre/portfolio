import { useEffect } from 'react';

import { type DocumentTitleInput, resolveDocumentTitle } from '../data/page-metadata';
import { siteConfig } from '../data/site';

export function useDocumentTitle(pageTitle?: DocumentTitleInput) {
  useEffect(() => {
    document.title = resolveDocumentTitle(pageTitle);

    return () => {
      document.title = siteConfig.title;
    };
  }, [pageTitle]);
}
