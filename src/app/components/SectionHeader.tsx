import type { ReactNode } from 'react';

interface SectionHeaderProps {
  label: ReactNode;
  title: ReactNode;
  description: ReactNode;
  icon?: ReactNode;
  className?: string;
  descriptionClassName?: string;
}

export function SectionHeader({
  label,
  title,
  description,
  icon,
  className = '',
  descriptionClassName = '',
}: SectionHeaderProps) {
  return (
    <div className={`flex flex-col md:flex-row gap-8 ${className}`.trim()}>
      <div
        className="flex items-start gap-2 text-neutral-400 md:w-1/4"
        style={{ fontSize: '0.85rem' }}
      >
        {icon ? <span className="mt-0.5">{icon}</span> : null}
        <span>{label}</span>
      </div>
      <div className="md:w-3/4 max-w-lg">
        <h2 className="text-shell-foreground mb-4" style={{ fontSize: '2rem', fontWeight: 600 }}>
          {title}
        </h2>
        <div
          className={`text-shell-muted-foreground ${descriptionClassName}`.trim()}
          style={{ fontSize: '0.85rem', lineHeight: 1.7 }}
        >
          {description}
        </div>
      </div>
    </div>
  );
}
