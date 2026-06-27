import React from 'react';

type SocialIconProps = {
  href: string;
  label: string;
  hoverColorClass: string;
  d: string;
};

export default function SocialIcon({ href, label, hoverColorClass, d }: SocialIconProps) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`text-secondary transition-colors ${hoverColorClass}`} aria-label={label}>
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d={d} />
      </svg>
    </a>
  );
}
