/**
 * CRM Design System Example — Pagination Component
 *
 * Table/list pagination matching the sample CRM's footer pattern.
 * Pure HTML/CSS with composable parts.
 */

import * as React from 'react';
import { cn } from '../utils/cn';

/* ─── Pagination Root ─────────────────────────────────────────────────── */

export interface PaginationProps extends React.HTMLAttributes<HTMLElement> {}

const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  ({ className, ...props }, ref) => (
    <nav
      ref={ref}
      role="navigation"
      aria-label="Pagination"
      className={cn('flex items-center justify-between', className)}
      {...props}
    />
  )
);
Pagination.displayName = 'Pagination';

/* ─── PaginationInfo ──────────────────────────────────────────────────── */

export interface PaginationInfoProps extends React.HTMLAttributes<HTMLSpanElement> {
  currentPage: number;
  totalPages: number;
  totalItems?: number;
}

function PaginationInfo({ currentPage, totalPages, totalItems, className, ...props }: PaginationInfoProps) {
  return (
    <span
      className={cn('text-[var(--text-sm)] text-[var(--text-muted)]', className)}
      {...props}
    >
      {totalItems !== undefined
        ? `${totalItems.toLocaleString()} records`
        : `Page ${currentPage} of ${totalPages}`}
    </span>
  );
}
PaginationInfo.displayName = 'PaginationInfo';

/* ─── PaginationButton ────────────────────────────────────────────────── */

export interface PaginationButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
}

const PaginationButton = React.forwardRef<HTMLButtonElement, PaginationButtonProps>(
  ({ className, isActive, disabled, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      disabled={disabled}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'inline-flex h-7 min-w-[28px] items-center justify-center rounded-[var(--radius-md)] px-2',
        'text-[var(--text-sm)] font-[var(--font-medium)]',
        'transition-colors duration-[var(--duration-fast)]',
        'focus-visible:outline-none focus-visible:shadow-[var(--shadow-focus-ring)]',
        'disabled:cursor-not-allowed disabled:opacity-50',
        isActive
          ? 'bg-[var(--color-gray-900)] text-white'
          : 'text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]',
        className
      )}
      {...props}
    />
  )
);
PaginationButton.displayName = 'PaginationButton';

/* ─── PaginationPrevious / Next ───────────────────────────────────────── */

const PaginationPrevious = React.forwardRef<HTMLButtonElement, Omit<PaginationButtonProps, 'isActive'>>(
  ({ className, children, ...props }, ref) => (
    <PaginationButton
      ref={ref}
      className={cn('gap-1', className)}
      {...props}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
        <path d="M8.5 3.5L5 7L8.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {children ?? <span>Previous</span>}
    </PaginationButton>
  )
);
PaginationPrevious.displayName = 'PaginationPrevious';

const PaginationNext = React.forwardRef<HTMLButtonElement, Omit<PaginationButtonProps, 'isActive'>>(
  ({ className, children, ...props }, ref) => (
    <PaginationButton
      ref={ref}
      className={cn('gap-1', className)}
      {...props}
    >
      {children ?? <span>Next</span>}
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
        <path d="M5.5 3.5L9 7L5.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </PaginationButton>
  )
);
PaginationNext.displayName = 'PaginationNext';

/* ─── PaginationEllipsis ──────────────────────────────────────────────── */

function PaginationEllipsis({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      aria-hidden="true"
      className={cn('flex h-7 w-7 items-center justify-center text-[var(--text-muted)]', className)}
      {...props}
    >
      ...
    </span>
  );
}
PaginationEllipsis.displayName = 'PaginationEllipsis';

export {
  Pagination,
  PaginationInfo,
  PaginationButton,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
