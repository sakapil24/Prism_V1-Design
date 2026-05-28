/**
 * CRM Design System Example — DatePicker Component
 *
 * Calendar date picker using Popover + a custom calendar grid.
 * Matches the sample CRM's minimal date field pattern.
 */

import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { cn } from '../utils/cn';

import { Calendar } from './Calendar';

/* ─── DatePicker ──────────────────────────────────────────────────────── */

export interface DatePickerProps {
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  placeholder?: string;
  disabled?: boolean;
  hasError?: boolean;
  className?: string;
}

function DatePicker({
  value,
  onChange,
  placeholder = 'Select date',
  disabled,
  hasError,
  className,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  const formattedValue = value
    ? value.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : null;

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger
        disabled={disabled}
        className={cn(
          'inline-flex h-8 items-center gap-2 rounded-[var(--radius)] px-2',
          'text-[var(--text-base)] font-[var(--font-medium)]',
          'border border-[var(--border-default)] bg-white',
          'transition-[border-color,box-shadow] duration-[var(--duration-moderate)] ease-[var(--ease-default)]',
          'hover:border-[var(--border-strong)]',
          'focus-visible:outline-none focus-visible:border-[var(--border-focus)] focus-visible:shadow-[var(--shadow-focus-ring)]',
          'disabled:cursor-not-allowed disabled:opacity-50',
          hasError && 'border-[var(--border-error)]',
          className
        )}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 text-[var(--icon-muted)]">
          <rect x="1.75" y="2.625" width="10.5" height="9.625" rx="1.5" stroke="currentColor" strokeWidth="1.25" />
          <path d="M1.75 5.25H12.25" stroke="currentColor" strokeWidth="1.25" />
          <path d="M4.375 1.75V3.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
          <path d="M9.625 1.75V3.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
        </svg>
        <span className={cn(!formattedValue && 'text-[var(--text-faint)]')}>
          {formattedValue ?? placeholder}
        </span>
      </PopoverPrimitive.Trigger>

      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          sideOffset={4}
          className={cn(
            'z-50 rounded-[12px] bg-white outline-none',
            'shadow-[rgba(0,0,0,0.08)_0px_8px_24px_0px,rgba(0,0,0,0.06)_0px_2px_8px_0px,rgba(0,0,0,0.04)_0px_0px_0px_1px]',
            'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
            'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
            'data-[side=bottom]:slide-in-from-top-1',
            'data-[side=top]:slide-in-from-bottom-1',
            'duration-200'
          )}
        >
          <Calendar
            value={value}
            onChange={(date) => {
              onChange?.(date);
              setOpen(false);
            }}
          />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}

DatePicker.displayName = 'DatePicker';

export { DatePicker, Calendar };
