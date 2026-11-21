import {useState} from 'react';
import {Code2} from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  fallbackTitle: string;
  className?: string;
}

export function ResilientImage({src, alt, fallbackTitle, className = ''}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#1C1410] via-[#120E0B] to-[#2B1408] border border-white/10 p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#C2410C]/25 text-[#FF7A2F]">
          <Code2 className="h-5 w-5" aria-hidden="true" />
        </div>
        <span className="text-sm font-medium text-white/90">{fallbackTitle}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
