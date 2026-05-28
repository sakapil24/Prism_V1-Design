import * as React from 'react';
import { cn } from '../utils/cn';

export interface DocumentRowProps extends React.ComponentPropsWithoutRef<'div'> {
  title: string;
  extension: string;
  size: string;
  updatedAt: string;
  ownerName?: string;
  ownerAvatar?: string;
  onDownload?: () => void;
  onView?: () => void;
  onActionClick?: () => void;
}

export function DocumentRow({
  title,
  extension,
  size,
  updatedAt,
  ownerName,
  ownerAvatar,
  onDownload,
  onView,
  onActionClick,
  className,
  ...props
}: DocumentRowProps) {
  const ext = extension.toLowerCase().replace('.', '');
  
  return (
    <div
      className={cn(
        'flex items-center justify-between p-3 border border-[var(--border-subtle)] bg-[var(--surface-raised)] rounded-[var(--radius-sm)] transition-[transform,box-shadow,background-color] duration-[var(--duration-fast)] ease-[var(--ease-default)] hover:bg-[var(--surface-hover)] hover:shadow-[var(--shadow-sm)] hover:-translate-y-[1px] font-[family-name:var(--font-sans)]',
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-3 min-w-0">
        {/* Uniform clean document icon badge */}
        <div className="h-10 w-10 flex items-center justify-center rounded-[var(--radius-sm)] border border-[var(--border-subtle)] bg-[var(--surface-secondary)] text-[var(--text-secondary)] shrink-0">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
        </div>

        {/* File Title and description */}
        <div className="flex flex-col min-w-0">
          <span className="text-[var(--text-sm)] font-[var(--font-semibold)] text-[var(--text-primary)] truncate">
            {title}
          </span>
          <div className="flex items-center gap-2 mt-0.5 text-[var(--text-xs)] text-[var(--text-muted)]">
            <span className="font-mono">{size}</span>
            <span className="h-1 w-1 rounded-full bg-[var(--border-strong)]" />
            <span>Updated {updatedAt}</span>
            {ownerName && (
              <>
                <span className="h-1 w-1 rounded-full bg-[var(--border-strong)]" />
                <span className="flex items-center gap-1">
                  {ownerAvatar ? (
                    <img src={ownerAvatar} alt={ownerName} className="h-3.5 w-3.5 rounded-full object-cover" />
                  ) : (
                    <span className="h-3.5 w-3.5 rounded-full bg-[var(--surface-interactive)] border border-[var(--border-default)] flex items-center justify-center text-[8px] font-medium text-[var(--text-secondary)]">
                      {ownerName.charAt(0)}
                    </span>
                  )}
                  {ownerName}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Row action buttons */}
      <div className="flex items-center gap-2 shrink-0">
        {onView && (
          <button
            type="button"
            onClick={onView}
            className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-interactive)] rounded-[var(--radius-sm)] transition-colors duration-[var(--duration-fast)]"
            title="Preview"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </button>
        )}
        {onDownload && (
          <button
            type="button"
            onClick={onDownload}
            className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-interactive)] rounded-[var(--radius-sm)] transition-colors duration-[var(--duration-fast)]"
            title="Download"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </button>
        )}
        <button
          type="button"
          onClick={onActionClick}
          className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-interactive)] rounded-[var(--radius-sm)] transition-colors duration-[var(--duration-fast)]"
          title="More actions"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="1" />
            <circle cx="12" cy="5" r="1" />
            <circle cx="12" cy="19" r="1" />
          </svg>
        </button>
      </div>
    </div>
  );
}

DocumentRow.displayName = 'DocumentRow';
