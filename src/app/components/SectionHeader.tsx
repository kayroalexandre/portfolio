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
      <div className="flex items-start gap-2 text-shell-muted-foreground text-[0.85rem] md:w-1/4">
        {icon ? <span className="mt-0.5">{icon}</span> : null}
        <span>{label}</span>
      </div>
      <div className="md:w-3/4 max-w-lg">
        <h2 className="text-shell-foreground mb-4 text-[2rem] font-semibold">{title}</h2>
        <div
          className={`text-shell-muted-foreground text-[0.85rem] leading-[1.7] ${descriptionClassName}`.trim()}
        >
          {description}
        </div>
      </div>
    </div>
  );
}
