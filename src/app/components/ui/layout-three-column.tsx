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
 * - Blocks distributed across the full width on desktop (start/center/end)
 * - All text remains left-aligned in every block
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
      <div className="w-fit text-left md:justify-self-start">{left}</div>
      <div className="w-fit text-left md:justify-self-center">{center}</div>
      <div className="w-fit text-left md:justify-self-end">{right}</div>
    </div>
  );
}
