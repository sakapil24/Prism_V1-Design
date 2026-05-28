import * as React from 'react';
import { cn } from '../utils/cn';

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
] as const;

const DAY_LABELS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'] as const;

export interface CalendarRange {
  from?: Date | null;
  to?: Date | null;
}

export interface CalendarProps {
  mode?: 'single' | 'range';
  value?: Date | null;
  onChange?: (date: Date) => void;
  rangeValue?: CalendarRange;
  onRangeChange?: (range: CalendarRange) => void;
  className?: string;
  disabledDates?: (date: Date) => boolean;
}

export function Calendar({
  mode = 'single',
  value,
  onChange,
  rangeValue,
  onRangeChange,
  className,
  disabledDates,
}: CalendarProps) {
  const today = new Date();
  
  // Initialize view based on mode value
  const initialYear = mode === 'range' 
    ? (rangeValue?.from?.getFullYear() ?? today.getFullYear())
    : (value?.getFullYear() ?? today.getFullYear());
  
  const initialMonth = mode === 'range'
    ? (rangeValue?.from?.getMonth() ?? today.getMonth())
    : (value?.getMonth() ?? today.getMonth());

  const [viewYear, setViewYear] = React.useState(initialYear);
  const [viewMonth, setViewMonth] = React.useState(initialMonth);

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  const isDateEqual = (d1: Date, year: number, month: number, day: number) => {
    return d1.getFullYear() === year && d1.getMonth() === month && d1.getDate() === day;
  };

  const isSelected = (day: number) => {
    if (mode === 'single') {
      return value && isDateEqual(value, viewYear, viewMonth, day);
    }
    // For range, highlight the exact bounds
    const current = new Date(viewYear, viewMonth, day);
    const fromSelected = rangeValue?.from && isDateEqual(rangeValue.from, viewYear, viewMonth, day);
    const toSelected = rangeValue?.to && isDateEqual(rangeValue.to, viewYear, viewMonth, day);
    return fromSelected || toSelected;
  };

  const isInRange = (day: number) => {
    if (mode !== 'range' || !rangeValue?.from || !rangeValue?.to) return false;
    const current = new Date(viewYear, viewMonth, day);
    // Strip time for exact comparisons
    const checkTime = current.setHours(0,0,0,0);
    const fromTime = new Date(rangeValue.from).setHours(0,0,0,0);
    const toTime = new Date(rangeValue.to).setHours(0,0,0,0);
    return checkTime > fromTime && checkTime < toTime;
  };

  const isRangeStart = (day: number) => {
    if (mode !== 'range' || !rangeValue?.from) return false;
    return isDateEqual(rangeValue.from, viewYear, viewMonth, day);
  };

  const isRangeEnd = (day: number) => {
    if (mode !== 'range' || !rangeValue?.to) return false;
    return isDateEqual(rangeValue.to, viewYear, viewMonth, day);
  };

  const isToday = (day: number) => {
    return isDateEqual(today, viewYear, viewMonth, day);
  };

  const handleDayClick = (day: number) => {
    const clickedDate = new Date(viewYear, viewMonth, day);
    
    if (mode === 'single') {
      onChange?.(clickedDate);
      return;
    }

    if (mode === 'range') {
      if (!rangeValue?.from || (rangeValue.from && rangeValue.to)) {
        onRangeChange?.({ from: clickedDate, to: null });
      } else {
        if (clickedDate < rangeValue.from) {
          onRangeChange?.({ from: clickedDate, to: null });
        } else {
          onRangeChange?.({ from: rangeValue.from, to: clickedDate });
        }
      }
    }
  };

  const days: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);

  return (
    <div className={cn('w-[252px] p-3 font-[family-name:var(--font-sans)] bg-white rounded-[var(--radius-md)] border border-[var(--border-subtle)] shadow-[var(--shadow-md)]', className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <button
          type="button"
          onClick={prevMonth}
          className="inline-flex h-7 w-7 items-center justify-center rounded-[var(--radius-sm)] text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] transition-colors duration-[var(--duration-fast)]"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M8.5 3.5L5 7L8.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <span className="text-[var(--text-caption)] font-[var(--font-semibold)] text-[var(--text-primary)]">
          {MONTH_NAMES[viewMonth]} {viewYear}
        </span>
        <button
          type="button"
          onClick={nextMonth}
          className="inline-flex h-7 w-7 items-center justify-center rounded-[var(--radius-sm)] text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] transition-colors duration-[var(--duration-fast)]"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M5.5 3.5L9 7L5.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 mb-1">
        {DAY_LABELS.map((label) => (
          <div
            key={label}
            className="flex h-8 items-center justify-center text-[var(--text-xs)] font-[var(--font-semibold)] text-[var(--text-muted)]"
          >
            {label}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-y-[2px]">
        {days.map((day, i) => {
          if (day === null) {
            return <span key={`empty-${i}`} className="h-8 w-8" />;
          }

          const cellDate = new Date(viewYear, viewMonth, day);
          const isCellDisabled = disabledDates?.(cellDate) ?? false;
          const selected = isSelected(day);
          const range = isInRange(day);
          const rangeStart = isRangeStart(day);
          const rangeEnd = isRangeEnd(day);
          const currentDayIsToday = isToday(day);

          return (
            <div
              key={`day-${day}`}
              className={cn(
                'flex h-8 items-center justify-center relative',
                range && 'bg-[var(--surface-selected)]',
                rangeStart && 'rounded-l-full bg-[var(--surface-selected)]',
                rangeEnd && 'rounded-r-full bg-[var(--surface-selected)]'
              )}
            >
              <button
                type="button"
                disabled={isCellDisabled}
                onClick={() => handleDayClick(day)}
                className={cn(
                  'inline-flex h-8 w-8 items-center justify-center rounded-full',
                  'text-[var(--text-sm)] font-[var(--font-medium)]',
                  'transition-all duration-[var(--duration-fast)]',
                  'focus-visible:outline-none focus-visible:shadow-[var(--shadow-focus-ring)]',
                  'disabled:cursor-not-allowed disabled:opacity-30',
                  selected
                    ? 'bg-[var(--color-gray-900)] text-white font-[var(--font-semibold)]'
                    : currentDayIsToday
                      ? 'bg-[var(--surface-interactive)] text-[var(--text-primary)] border border-[var(--border-strong)]'
                      : 'text-[var(--text-primary)] hover:bg-[var(--surface-hover)]'
                )}
              >
                {day}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

Calendar.displayName = 'Calendar';
