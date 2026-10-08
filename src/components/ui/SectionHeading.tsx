import { cn } from '../../utils/cn';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({ eyebrow, title, subtitle, align = 'center', className }: SectionHeadingProps) {
  return (
    <div className={cn("mb-12", align === 'center' ? 'text-center mx-auto' : 'text-left', className)}>
      {eyebrow && (
        <div className="text-primary font-semibold tracking-wider text-sm uppercase mb-3">
          {eyebrow}
        </div>
      )}
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-textPrimary mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base md:text-lg text-textSecondary max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}