import { ReactNode } from 'react';

import { cn } from './utils';

export interface SidebarLayoutProps {
  sidebar: ReactNode;
  main: ReactNode;
  sidebarWidth?: '1/4' | '1/3' | '1/2';
  gap?: 'normal' | 'loose' | 'spacious';
  className?: string;
}

const SIDEBAR_WIDTH_MAP = {
  '1/4': 'md:w-1/4',
  '1/3': 'md:w-1/3',
  '1/2': 'md:w-1/2',
} as const;

const MAIN_WIDTH_MAP = {
  '1/4': 'md:w-3/4',
  '1/3': 'md:w-2/3',
  '1/2': 'md:w-1/2',
} as const;

const GAP_CLASSES = {
  normal: 'gap-8',
  loose: 'gap-12',
  spacious: 'gap-16',
} as const;

/**
 * Professional sidebar + main layout component
 * Handles responsive stacking and consistent spacing
 * @param sidebarWidth - Sidebar width on desktop (1/4, 1/3, or 1/2)
 * @param gap - Spacing between sidebar and main
 */
export function SidebarLayout({
  sidebar,
  main,
  sidebarWidth = '1/4',
  gap = 'loose',
  className,
}: SidebarLayoutProps) {
  return (
    <div
      className={cn('flex flex-col', GAP_CLASSES[gap], 'md:flex-row', 'md:items-start', className)}
    >
      <div className={SIDEBAR_WIDTH_MAP[sidebarWidth]}>{sidebar}</div>
      <div className={MAIN_WIDTH_MAP[sidebarWidth]}>{main}</div>
    </div>
  );
}
