import { createBrowserRouter } from 'react-router';

import { AboutPage } from './components/AboutPage';
import { CaseStudyPage } from './components/CaseStudyPage';
import { ContactPage } from './components/ContactPage';
import { ErrorBoundary } from './components/ErrorBoundary';
import { HomePage } from './components/HomePage';
import { Layout } from './components/Layout';
import { NotFoundPage } from './components/NotFoundPage';
import { ProjectsPage } from './components/ProjectsPage';
import { routePageKeyByPath } from './data/page-metadata';

export const appRoutes = [
  {
    path: '/',
    Component: Layout,
    ErrorBoundary,
    children: [
      { index: true, Component: HomePage, handle: { pageKey: routePageKeyByPath['/'] } },
      {
        path: 'projects',
        Component: ProjectsPage,
        handle: { pageKey: routePageKeyByPath['/projects'] },
      },
      { path: 'about', Component: AboutPage, handle: { pageKey: routePageKeyByPath['/about'] } },
      {
        path: 'contact',
        Component: ContactPage,
        handle: { pageKey: routePageKeyByPath['/contact'] },
      },
      { path: 'project/:slug', Component: CaseStudyPage },
      { path: '*', Component: NotFoundPage, handle: { pageKey: routePageKeyByPath['*'] } },
    ],
  },
];

export const router = createBrowserRouter(appRoutes);
