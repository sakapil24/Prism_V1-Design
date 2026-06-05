import * as React from 'react';
import { cn } from '../utils/cn';

export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface FooterProps extends React.ComponentPropsWithoutRef<'footer'> {
  columns?: FooterColumn[];
  copyrightText?: string;
  brandName?: string;
  logo?: React.ReactNode;
}

export function Footer({
  columns = [
    {
      title: 'Platform',
      links: [
        { label: 'Dealflow Pipelines', href: '#' },
        { label: 'Portfolio Analytics', href: '#' },
        { label: 'LPs Portal', href: '#' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Documentation', href: '#' },
        { label: 'Security & Compliance', href: '#' },
        { label: 'System Status', href: '#' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms of Service', href: '#' },
        { label: 'Disclaimer', href: '#' },
      ],
    },
  ],
  copyrightText = `© ${new Date().getFullYear()} Indian VCs. All rights reserved.`,
  brandName = 'Prism',
  logo,
  className,
  ...props
}: FooterProps) {
  return (
    <footer
      className={cn(
        'w-full py-12 px-6 border-t border-[var(--border-subtle)] bg-[var(--surface-secondary)] text-[var(--text-secondary)] font-[family-name:var(--font-sans)]',
        className
      )}
      {...props}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Block */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            {logo ?? (
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[var(--accent-primary)]" />
                <span className="font-[var(--font-semibold)] text-[var(--text-primary)] text-sm tracking-tight">
                  {brandName}
                </span>
              </div>
            )}
          </div>
          <p className="text-[var(--text-xs)] text-[var(--text-muted)] max-w-xs leading-[var(--lh-caption)]">
            Connecting and enabling the venture capital ecosystem in India. Designed with premium operational simplexity.
          </p>
        </div>

        {/* Links Grid */}
        <div className="col-span-3 grid grid-cols-3 gap-6">
          {columns.map((column, index) => (
            <div key={`${column.title}-${index}`} className="flex flex-col gap-3">
              <span className="text-[var(--text-xs)] font-[var(--font-semibold)] text-[var(--text-primary)]">
                {column.title}
              </span>
              <ul className="flex flex-col gap-2">
                {column.links.map((link, idx) => (
                  <li key={`${link.label}-${idx}`}>
                    <a
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      className="text-[var(--text-sm)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:underline underline-offset-2 transition-colors duration-[var(--duration-fast)]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Copyright/Meta bottom bar */}
      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-[var(--text-xs)] text-[var(--text-muted)]">
          {copyrightText}
        </span>
        <div className="flex gap-4 text-[var(--text-xs)] text-[var(--text-muted)]">
          <span>Made for Indian VCs ecosystem</span>
        </div>
      </div>
    </footer>
  );
}

Footer.displayName = 'Footer';
