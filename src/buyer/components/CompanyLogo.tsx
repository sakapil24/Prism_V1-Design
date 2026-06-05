import * as React from 'react';

interface CompanyLogoProps {
  src?: string | null;
  name: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function CompanyLogo({ src, name, className = '', size = 'md' }: CompanyLogoProps) {
  // Setup fallback stage: 0 = primary src, 1 = google favicon, 2 = ddg favicon, 3 = placeholder
  const [stage, setStage] = React.useState(0);
  const [imgSrc, setImgSrc] = React.useState<string | null>(null);

  // Helper to extract or resolve domain
  const getDomain = () => {
    if (src) {
      try {
        if (src.includes('logo.clearbit.com/')) {
          return src.split('logo.clearbit.com/')[1] || '';
        }
        if (src.includes('logos.hunter.io/')) {
          return src.split('logos.hunter.io/')[1] || '';
        }
        const url = new URL(src);
        return url.hostname.replace('www.', '');
      } catch (e) {
        // Fall through
      }
    }
    
    // Resolve clean domain names for common vendors
    const cleanName = name.toLowerCase().trim();
    if (cleanName === 'aws') return 'aws.amazon.com';
    if (cleanName.includes('google')) return 'google.com';
    if (cleanName.includes('accel')) return 'accel.com';
    if (cleanName.includes('aurelia') || cleanName.includes('modern health')) return 'modernhealth.com';
    if (cleanName.includes('slack')) return 'slack.com';
    if (cleanName.includes('stripe')) return 'stripe.com';
    if (cleanName.includes('notion')) return 'notion.so';
    if (cleanName.includes('retool')) return 'retool.com';
    if (cleanName.includes('vercel')) return 'vercel.com';
    if (cleanName.includes('hubspot')) return 'hubspot.com';
    if (cleanName.includes('chatprd')) return 'chatprd.com';
    if (cleanName.includes('factory')) return 'factory.ai';
    if (cleanName.includes('framer')) return 'framer.com';
    if (cleanName.includes('granola')) return 'granola.so';
    if (cleanName.includes('gumloop')) return 'gumloop.com';
    if (cleanName.includes('intercom')) return 'intercom.com';

    return cleanName
      .replace(/\s+/g, '')
      .replace(/[^a-z0-9.-]/g, '') + '.com';
  };

  React.useEffect(() => {
    if (src) {
      setImgSrc(src);
      setStage(0);
    } else {
      // If no src, go straight to google favicon
      const domain = getDomain();
      setImgSrc(`https://www.google.com/s2/favicons?domain=${domain}&sz=128`);
      setStage(1);
    }
  }, [src, name]);

  const handleError = () => {
    const domain = getDomain();
    if (stage === 0) {
      // Stage 1: Try Google Favicon Service
      setImgSrc(`https://www.google.com/s2/favicons?domain=${domain}&sz=128`);
      setStage(1);
    } else if (stage === 1) {
      // Stage 2: Try DuckDuckGo Favicon Service
      setImgSrc(`https://icons.duckduckgo.com/ip3/${domain}.ico`);
      setStage(2);
    } else {
      // Stage 3: Fully failed
      setImgSrc(null);
      setStage(3);
    }
  };

  // Size mapping
  const sizeClasses = {
    sm: 'w-8 h-8 text-[11px]',
    md: 'w-9 h-9 text-[13px]',
    lg: 'w-10 h-10 text-[14px]',
  };

  const selectedSizeClass = sizeClasses[size];

  // Placeholder SVG building icon if both service stages fail or no domain
  if (!imgSrc || stage === 3) {
    return (
      <div
        className={`rounded-md bg-neutral-100 flex items-center justify-center select-none shrink-0 ${selectedSizeClass} ${className}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="40%" height="40%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-neutral-450 shrink-0">
          <rect width="16" height="20" x="4" y="2" rx="2" ry="2"/>
          <line x1="9" x2="15" y1="22" y2="22"/>
          <path d="M9 17h6"/>
          <path d="M9 12h6"/>
          <path d="M9 7h6"/>
        </svg>
      </div>
    );
  }

  return (
    <div
      className={`rounded-md overflow-hidden bg-white shrink-0 flex items-center justify-center p-0.5 ${selectedSizeClass} ${className}`}
    >
      <img
        src={imgSrc}
        alt={name}
        className="w-full h-full object-contain"
        onError={handleError}
      />
    </div>
  );
}
