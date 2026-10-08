import React from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'white';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  download?: string | boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', href, download, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
    
    const variants = {
      primary: 'bg-primary text-white hover:bg-primaryHover shadow-sm',
      secondary: 'bg-secondaryBg text-textPrimary hover:bg-altBg border border-borderLight shadow-sm',
      outline: 'border border-borderLight hover:bg-secondaryBg text-textPrimary',
      ghost: 'hover:bg-secondaryBg hover:text-textPrimary text-textSecondary',
      white: 'bg-white text-primary hover:bg-gray-50 shadow-sm border border-borderLight',
    };
    
    const sizes = {
      sm: 'h-9 px-4 text-sm',
      md: 'h-11 px-6 py-2 text-sm',
      lg: 'h-12 px-8 text-base',
    };

    const compClass = cn(baseStyles, variants[variant], sizes[size], className);

    if (href) {
      return (
        <a href={href} download={download} className={compClass} {...(props as any)}>
          {children}
        </a>
      );
    }

    return (
      <button ref={ref} className={compClass} {...props}>
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';