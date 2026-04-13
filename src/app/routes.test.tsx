import { describe, expect, it } from 'vitest';

import { router } from './routes';

describe('router configuration', () => {
  it('has 6 child routes (including 404 catch-all)', () => {
    const rootRoute = router.routes[0];
    expect(rootRoute).toBeDefined();
    expect(rootRoute.children).toBeDefined();
    expect(rootRoute.children!.length).toBe(6);
  });

  it('defines the home index route', () => {
    const rootRoute = router.routes[0];
    const indexRoute = rootRoute.children!.find((r) => r.index === true);
    expect(indexRoute).toBeDefined();
  });

  it('defines /projects route', () => {
    const rootRoute = router.routes[0];
    const projectsRoute = rootRoute.children!.find((r) => r.path === 'projects');
    expect(projectsRoute).toBeDefined();
  });

  it('defines /about route', () => {
    const rootRoute = router.routes[0];
    const aboutRoute = rootRoute.children!.find((r) => r.path === 'about');
    expect(aboutRoute).toBeDefined();
  });

  it('defines /contact route', () => {
    const rootRoute = router.routes[0];
    const contactRoute = rootRoute.children!.find((r) => r.path === 'contact');
    expect(contactRoute).toBeDefined();
  });

  it('defines /project/:slug dynamic route', () => {
    const rootRoute = router.routes[0];
    const slugRoute = rootRoute.children!.find((r) => r.path === 'project/:slug');
    expect(slugRoute).toBeDefined();
  });

  it('defines a catch-all 404 route', () => {
    const rootRoute = router.routes[0];
    const catchAllRoute = rootRoute.children!.find((r) => r.path === '*');
    expect(catchAllRoute).toBeDefined();
  });

  it('has error boundary configured for runtime errors', () => {
    const rootRoute = router.routes[0];
    expect(rootRoute.hasErrorBoundary).toBe(true);
  });
});
