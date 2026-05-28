/**
 * CRM Design System Example — Combobox Component
 *
 * Searchable select built on Popover + filtered list.
 * Matches the sample CRM's entity/field select patterns (e.g., assign person, pick status).
 */

import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { cn } from '../utils/cn';

/* ─── Types ───────────────────────────────────────────────────────────── */

export interface ComboboxOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface ComboboxProps {
  options: ComboboxOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  disabled?: boolean;
  hasError?: boolean;
  className?: string;
}

/* ─── Combobox ────────────────────────────────────────────────────────── */

function Combobox({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  searchPlaceholder = 'Search...',
  emptyMessage = 'No results found',
  disabled,
  hasError,
  className,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  const selected = options.find((o) => o.value === value);

  const filtered = search
    ? options.filter((o) => o.label.toLowerCase().includes(search.toLowerCase()))
    : options;

  React.useEffect(() => {
    if (open) {
      setSearch('');
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

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
        {selected?.icon && (
          <span className="flex-shrink-0 [&>svg]:h-4 [&>svg]:w-4 text-[var(--icon-muted)]">
            {selected.icon}
          </span>
        )}
        <span className={cn('flex-1 text-left truncate', !selected && 'text-[var(--text-faint)]')}>
          {selected?.label ?? placeholder}
        </span>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 text-[var(--icon-muted)]">
          <path d="M3.5 5.25L7 8.75L10.5 5.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </PopoverPrimitive.Trigger>

      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          sideOffset={4}
          className={cn(
            'z-50 w-[var(--radix-popover-trigger-width)] min-w-[200px] overflow-hidden rounded-[12px] bg-white',
            'shadow-[rgba(0,0,0,0.08)_0px_8px_24px_0px,rgba(0,0,0,0.06)_0px_2px_8px_0px,rgba(0,0,0,0.04)_0px_0px_0px_1px]',
            'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
            'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
            'data-[side=bottom]:slide-in-from-top-1',
            'data-[side=top]:slide-in-from-bottom-1',
            'duration-200'
          )}
        >
          {/* Search input */}
          <div className="px-2 pt-2 pb-1">
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={searchPlaceholder}
              className={cn(
                'w-full h-8 px-2 rounded-[var(--radius-md)] bg-[var(--surface-muted)]',
                'text-[var(--text-base)] font-[var(--font-medium)]',
                'placeholder:text-[var(--text-faint)] placeholder:font-[var(--font-normal)]',
                'outline-none border-0',
                'focus:ring-1 focus:ring-[var(--border-focus)]'
              )}
            />
          </div>

          {/* Options */}
          <div className="max-h-[200px] overflow-y-auto p-1">
            {filtered.length === 0 ? (
              <div className="flex h-12 items-center justify-center text-[var(--text-sm)] text-[var(--text-muted)]">
                {emptyMessage}
              </div>
            ) : (
              filtered.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  disabled={option.disabled}
                  onClick={() => {
                    onChange?.(option.value);
                    setOpen(false);
                  }}
                  className={cn(
                    'relative flex h-8 w-full cursor-default select-none items-center rounded-[6px] px-2 text-sm font-medium text-[#191816] outline-none',
                    'transition-colors duration-100',
                    'hover:bg-[#EFF1F4]',
                    'disabled:pointer-events-none disabled:opacity-50',
                    option.value === value && 'bg-[var(--surface-selected)]'
                  )}
                >
                  {option.icon && (
                    <span className="mr-2 flex-shrink-0 [&>svg]:h-4 [&>svg]:w-4 text-[#6A707A]">
                      {option.icon}
                    </span>
                  )}
                  <span className="flex-1 text-left truncate">{option.label}</span>
                  {option.value === value && (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="ml-2 shrink-0">
                      <path d="M11.6667 3.5L5.25 9.91667L2.33334 7" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              ))
            )}
          </div>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}

Combobox.displayName = 'Combobox';

export { Combobox };
