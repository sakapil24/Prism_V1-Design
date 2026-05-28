import * as React from 'react';

interface CompanyLogoProps {
  src?: string | null;
  name: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function CompanyLogo({ src, name, className = '', size = 'md' }: CompanyLogoProps) {
  const [error, setError] = React.useState(false);
  const initials = name.substring(0, 2).toUpperCase();

  // Size mapping
  const sizeClasses = {
    sm: 'w-8 h-8 text-[11px]',
    md: 'w-9 h-9 text-[13px]',
    lg: 'w-10 h-10 text-[14px]',
  };

  const selectedSizeClass = sizeClasses[size];

  if (error || !src) {
    return (
      <div
        className={`rounded-md bg-neutral-100 border border-neutral-200 flex items-center justify-center font-bold text-neutral-800 select-none shrink-0 ${selectedSizeClass} ${className}`}
      >
        {initials}
      </div>
    );
  }

  return (
    <div
      className={`rounded-md overflow-hidden bg-white border border-neutral-100 shrink-0 flex items-center justify-center p-0.5 ${selectedSizeClass} ${className}`}
    >
      <img
        src={src}
        alt={name}
        className="w-full h-full object-contain"
        onError={() => setError(true)}
      />
    </div>
  );
}
