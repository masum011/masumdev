import type {ReactNode} from 'react';

interface HighlightTextProps {
  children: ReactNode;
  variant?: 'accent' | 'marker' | 'underline';
  className?: string;
}

export function HighlightText({children, variant = 'accent', className = ''}: HighlightTextProps) {
  if (variant === 'marker') {
    return (
      <span
        className={`inline-block bg-[#C2410C] text-white px-2.5 py-0.5 rounded-sm font-semibold tracking-tight ${className}`}
      >
        {children}
      </span>
    );
  }

  if (variant === 'underline') {
    return (
      <span
        className={`text-white underline decoration-[#F97316] decoration-2 underline-offset-4 font-semibold ${className}`}
      >
        {children}
      </span>
    );
  }

  return <span className={`text-[#FF7A2F] font-semibold ${className}`}>{children}</span>;
}
