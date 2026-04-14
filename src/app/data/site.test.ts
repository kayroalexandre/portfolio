import { describe, expect, it } from 'vitest';

import { siteConfig } from './site';

describe('siteConfig', () => {
  it('exports an object with required top-level keys', () => {
    const requiredKeys = [
      'name',
      'title',
      'heroIntro',
      'heroSupport',
      'projectsIntro',
      'servicesIntro',
      'aboutIntro',
      'aboutSupport',
      'contactIntro',
      'footerCta',
      'services',
      'practice',
    ];

    for (const requiredKey of requiredKeys) {
      expect(siteConfig).toHaveProperty(requiredKey);
    }
  });

  it('has non-empty string values for text fields', () => {
    const textFields = [
      'name',
      'title',
      'heroIntro',
      'heroSupport',
      'projectsIntro',
      'servicesIntro',
      'aboutIntro',
      'aboutSupport',
      'contactIntro',
      'footerCta',
    ] as const;

    for (const field of textFields) {
      expect(typeof siteConfig[field]).toBe('string');
      expect((siteConfig[field] as string).length).toBeGreaterThan(0);
    }
  });

  it('has services with num, title, and description', () => {
    expect(Array.isArray(siteConfig.services)).toBe(true);
    expect(siteConfig.services.length).toBeGreaterThan(0);

    for (const service of siteConfig.services) {
      expect(service).toHaveProperty('num');
      expect(service).toHaveProperty('title');
      expect(service).toHaveProperty('description');
      expect(typeof service.title).toBe('string');
      expect(service.title.length).toBeGreaterThan(0);
      expect(typeof service.description).toBe('string');
      expect(service.description.length).toBeGreaterThan(0);
    }
  });

  it('has practice items with title and body', () => {
    expect(Array.isArray(siteConfig.practice)).toBe(true);
    expect(siteConfig.practice.length).toBeGreaterThan(0);

    for (const practiceEntry of siteConfig.practice) {
      expect(practiceEntry).toHaveProperty('title');
      expect(practiceEntry).toHaveProperty('body');
      expect(typeof practiceEntry.title).toBe('string');
      expect(practiceEntry.title.length).toBeGreaterThan(0);
      expect(typeof practiceEntry.body).toBe('string');
      expect(practiceEntry.body.length).toBeGreaterThan(0);
    }
  });
});
