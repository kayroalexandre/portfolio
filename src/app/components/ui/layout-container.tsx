import { ReactNode } from 'react';

import { cn } from './utils';

export interface SectionContainerProps {
  children: ReactNode;
  className?: string;
  border?: 'top' | 'none';
  padding?: 'compact' | 'normal' | 'large';
}

const PADDING_CLASSES = {
  compact: 'px-6 md:px-12 py-12',
  normal: 'px-6 md:px-12 py-20',
  large: 'px-6 md:px-12 py-24',
} as const;

/**
 * Standard section container with consistent spacing
 * Wraps content with professional padding and optional border
 */
export function SectionContainer({
  children,
  className,
  border = 'top',
  padding = 'normal',
}: SectionContainerProps) {
  return (
    <section
      className={cn(
        PADDING_CLASSES[padding],
        border === 'top' && 'border-t border-shell-border',
        className
      )}
    >
      {children}
    </section>
  );
}
