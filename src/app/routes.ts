import { createBrowserRouter } from 'react-router';

import { AboutPage } from './components/AboutPage';
import { CaseStudyPage } from './components/CaseStudyPage';
import { ContactPage } from './components/ContactPage';
import { ErrorBoundary } from './components/ErrorBoundary';
import { HomePage } from './components/HomePage';
import { Layout } from './components/Layout';
import { NotFoundPage } from './components/NotFoundPage';
import { ProjectsPage } from './components/ProjectsPage';

export const appRoutes = [
  {
    path: '/',
    Component: Layout,
    ErrorBoundary,
    children: [
      { index: true, Component: HomePage },
      { path: 'projects', Component: ProjectsPage },
      { path: 'about', Component: AboutPage },
      { path: 'contact', Component: ContactPage },
      { path: 'project/:slug', Component: CaseStudyPage },
      { path: '*', Component: NotFoundPage },
    ],
  },
];

export const router = createBrowserRouter(appRoutes);
