import { describe, expect, it } from 'vitest';

import { appRoutes } from './routes';

describe('router configuration', () => {
  it('has 6 child routes (including 404 catch-all)', () => {
    const rootRoute = appRoutes[0];
    expect(rootRoute).toBeDefined();
    expect(rootRoute.children).toBeDefined();
    expect(rootRoute.children!.length).toBe(6);
  });

  it('defines the home index route', () => {
    const rootRoute = appRoutes[0];
    const indexRoute = rootRoute.children!.find((route) => route.index === true);
    expect(indexRoute).toBeDefined();
    expect(indexRoute?.handle).toEqual({ pageKey: 'home' });
  });

  it('defines /projects route', () => {
    const rootRoute = appRoutes[0];
    const projectsRoute = rootRoute.children!.find((route) => route.path === 'projects');
    expect(projectsRoute).toBeDefined();
    expect(projectsRoute?.handle).toEqual({ pageKey: 'projects' });
  });

  it('defines /about route', () => {
    const rootRoute = appRoutes[0];
    const aboutRoute = rootRoute.children!.find((route) => route.path === 'about');
    expect(aboutRoute).toBeDefined();
    expect(aboutRoute?.handle).toEqual({ pageKey: 'about' });
  });

  it('defines /contact route', () => {
    const rootRoute = appRoutes[0];
    const contactRoute = rootRoute.children!.find((route) => route.path === 'contact');
    expect(contactRoute).toBeDefined();
    expect(contactRoute?.handle).toEqual({ pageKey: 'contact' });
  });

  it('defines /project/:slug dynamic route', () => {
    const rootRoute = appRoutes[0];
    const slugRoute = rootRoute.children!.find((route) => route.path === 'project/:slug');
    expect(slugRoute).toBeDefined();
  });

  it('defines a catch-all 404 route', () => {
    const rootRoute = appRoutes[0];
    const catchAllRoute = rootRoute.children!.find((route) => route.path === '*');
    expect(catchAllRoute).toBeDefined();
    expect(catchAllRoute?.handle).toEqual({ pageKey: 'notFound' });
  });

  it('has error boundary configured for runtime errors', () => {
    const rootRoute = appRoutes[0];
    expect(rootRoute.ErrorBoundary).toBeDefined();
  });
});
