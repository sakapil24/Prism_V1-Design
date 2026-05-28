/**
 * CRM Design System Example — Textarea Component
 *
 * Multi-line text input matching the sample CRM's styling.
 * Follows the same variant pattern as Input.
 */

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

/* ─── Textarea Variants ──────────────────────────────────────────────── */

const textareaVariants = cva(
  [
    'flex w-full rounded-[var(--radius)] bg-white',
    'font-[var(--font-sans)] text-[var(--text-base)] font-[var(--font-medium)] leading-[var(--leading-normal)]',
    'text-[var(--text-primary)]',
    'border border-[var(--border-default)]',
    'transition-[border-color,box-shadow] duration-[var(--duration-moderate)] ease-[var(--ease-default)]',
    'placeholder:text-[var(--text-faint)] placeholder:font-[var(--font-normal)]',
    'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[var(--surface-muted)]',
    'read-only:bg-[var(--surface-muted)] read-only:cursor-default',
    'resize-y min-h-[80px]',
  ],
  {
    variants: {
      size: {
        sm: 'px-2 py-1.5 text-[var(--text-sm)]',
        md: 'px-2 py-1.5',
        lg: 'px-3 py-2',
      },
      hasError: {
        true: 'border-[var(--border-error)] focus:border-[var(--border-error)] focus:shadow-[0_0_0_2px_rgba(220,38,38,0.2)]',
        false: 'focus:border-[var(--border-focus)] focus:shadow-[var(--shadow-focus-ring)]',
      },
    },
    defaultVariants: {
      size: 'md',
      hasError: false,
    },
  }
);

/* ─── Textarea ────────────────────────────────────────────────────────── */

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'>,
    VariantProps<typeof textareaVariants> {
  hasError?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, size, hasError, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(textareaVariants({ size, hasError }), className)}
      {...props}
    />
  )
);

Textarea.displayName = 'Textarea';

export { Textarea, textareaVariants };
