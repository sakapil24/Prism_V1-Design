import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { cn } from '../utils/cn';
import { Calendar, type CalendarRange } from './Calendar';

export interface DateRangePickerProps {
  value?: CalendarRange;
  onChange?: (range: CalendarRange) => void;
  placeholder?: string;
  disabled?: boolean;
  hasError?: boolean;
  className?: string;
}

export function DateRangePicker({
  value = { from: null, to: null },
  onChange,
  placeholder = 'Select date range',
  disabled,
  hasError,
  className,
}: DateRangePickerProps) {
  const [open, setOpen] = React.useState(false);

  const formatDate = (date?: Date | null) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const displayString = React.useMemo(() => {
    if (!value?.from && !value?.to) return placeholder;
    if (value.from && !value.to) return `${formatDate(value.from)} - ...`;
    return `${formatDate(value.from)} - ${formatDate(value.to)}`;
  }, [value, placeholder]);

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger
        disabled={disabled}
        className={cn(
          'inline-flex h-10 items-center gap-2 rounded-[var(--radius-sm)] px-3',
          'text-[var(--text-sm)] font-[var(--font-medium)]',
          'border border-[var(--border-default)] bg-white text-[var(--text-primary)]',
          'transition-[border-color,box-shadow] duration-[var(--duration-fast)] ease-[var(--ease-default)]',
          'hover:border-[var(--border-strong)]',
          'focus-visible:outline-none focus-visible:border-[var(--border-focus)] focus-visible:shadow-[var(--shadow-focus-ring)]',
          'disabled:cursor-not-allowed disabled:opacity-50',
          hasError && 'border-[var(--state-error)]',
          className
        )}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="shrink-0 text-[var(--text-muted)]">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        <span className={cn(!value?.from && 'text-[var(--text-disabled)]')}>
          {displayString}
        </span>
      </PopoverPrimitive.Trigger>

      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          sideOffset={6}
          align="start"
          className={cn(
            'z-50 outline-none animate-in fade-in-0 zoom-in-95 duration-150'
          )}
        >
          <Calendar
            mode="range"
            rangeValue={value}
            onRangeChange={(newRange) => {
              onChange?.(newRange);
              // Close popover once a full range (both from and to) is selected
              if (newRange.from && newRange.to) {
                setOpen(false);
              }
            }}
          />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}

DateRangePicker.displayName = 'DateRangePicker';
