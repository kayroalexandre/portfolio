interface SectionDividerProps {
  count?: number;
  className?: string;
}

export function SectionDivider({ count = 3, className = '' }: SectionDividerProps) {
  return (
    <div
      aria-hidden="true"
      className={`flex justify-between text-shell-muted-foreground ${className}`.trim()}
      style={{ fontSize: '1.2rem' }}
    >
      {Array.from({ length: count }).map((_, index) => (
        <span key={`divider-dot-${index}`}>+</span>
      ))}
    </div>
  );
}
