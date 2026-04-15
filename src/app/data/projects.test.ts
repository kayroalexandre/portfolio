import { describe, expect, it } from 'vitest';

import { getProjectBySlug, getProjectNavigation, projects } from './projects';

describe('projects', () => {
  it('exports an array', () => {
    expect(Array.isArray(projects)).toBe(true);
  });

  it('each project has required fields', () => {
    const requiredFields = ['slug', 'title', 'image', 'year', 'category', 'client', 'description'];

    for (const project of projects) {
      for (const field of requiredFields) {
        expect(project).toHaveProperty(field);
      }
      expect(typeof project.slug).toBe('string');
      expect(project.slug.length).toBeGreaterThan(0);
      expect(typeof project.title).toBe('string');
      expect(project.title.length).toBeGreaterThan(0);
      expect(typeof project.year).toBe('string');
      expect(typeof project.category).toBe('string');
      expect(typeof project.client).toBe('string');
      expect(typeof project.description).toBe('string');
      expect(project.description.length).toBeGreaterThan(0);
    }
  });

  it('slugs are unique', () => {
    const slugs = projects.map((project) => project.slug);
    const uniqueSlugs = new Set(slugs);
    expect(uniqueSlugs.size).toBe(slugs.length);
  });

  it('each slug with caseStudy matches an existing content key', () => {
    const validCaseStudies = ['monetix', 'unimedpay'];

    for (const project of projects) {
      if (project.caseStudy) {
        expect(validCaseStudies).toContain(project.caseStudy);
        expect(project.caseStudy).toBe(project.slug);
      }
    }
  });

  it('finds a project by slug', () => {
    const project = getProjectBySlug('monetix');

    expect(project?.title).toBe('Monetix');
  });

  it('returns navigation for an existing project', () => {
    const navigation = getProjectNavigation('monetix');

    expect(navigation?.current.slug).toBe('monetix');
    expect(navigation?.next.slug).toBe('unimedpay');
    expect(navigation?.previous.slug).toBe('unimedpay');
  });

  it('returns null for unknown navigation slug', () => {
    expect(getProjectNavigation('unknown')).toBeNull();
  });
});
