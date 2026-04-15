import { describe, expect, it } from 'vitest';

import { resolveDocumentTitle, routePageKeyByPath } from './page-metadata';
import { siteConfig } from './site';

describe('page metadata facade', () => {
  it('resolves default title for home', () => {
    expect(resolveDocumentTitle('home')).toBe(siteConfig.title);
  });

  it('resolves title from semantic page keys', () => {
    expect(resolveDocumentTitle('projects')).toBe(`Projetos | ${siteConfig.name}`);
    expect(resolveDocumentTitle('about')).toBe(`Sobre | ${siteConfig.name}`);
    expect(resolveDocumentTitle('contact')).toBe(`Contato | ${siteConfig.name}`);
  });

  it('resolves custom dynamic title', () => {
    expect(resolveDocumentTitle('Case Monetix')).toBe(`Case Monetix | ${siteConfig.name}`);
  });

  it('keeps route metadata mapping centralized', () => {
    expect(routePageKeyByPath['/']).toBe('home');
    expect(routePageKeyByPath['/projects']).toBe('projects');
    expect(routePageKeyByPath['/about']).toBe('about');
    expect(routePageKeyByPath['/contact']).toBe('contact');
    expect(routePageKeyByPath['*']).toBe('notFound');
  });
});
