import { describe, expect, it } from 'vitest';

import { caseStudyContentMap } from './project-cases';

describe('caseStudyContentMap', () => {
  it('exposes the known case study entries', () => {
    expect(Object.keys(caseStudyContentMap).sort()).toEqual(['monetix', 'unimedpay']);
  });
});
