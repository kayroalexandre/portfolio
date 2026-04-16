import { ReactNode } from 'react';

import { cn } from './utils';

export interface ThreeColumnLayoutProps {
  left: ReactNode;
  center: ReactNode;
  right: ReactNode;
  className?: string;
  gap?: 'compact' | 'normal' | 'loose';
}

const GAP_CLASSES = {
  compact: 'gap-4',
  normal: 'gap-6',
  loose: 'gap-8',
} as const;

/**
 * Professional 3-column layout component
 * - Left aligned on desktop, centered on mobile
 * - Middle truly centered
 * - Right aligned on desktop
 * No negative margins, self-contained, responsive
 */
export function ThreeColumnLayout({
  left,
  center,
  right,
  className,
  gap = 'loose',
}: ThreeColumnLayoutProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-3',
        GAP_CLASSES[gap],
        'md:items-start',
        className
      )}
    >
      <div className="md:text-left md:justify-self-start">{left}</div>
      <div className="md:text-center md:justify-self-center">{center}</div>
      <div className="md:text-right md:justify-self-end">{right}</div>
    </div>
  );
}
