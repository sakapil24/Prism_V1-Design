import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { cn } from '../utils/cn';

/* ─────────────────────────────────────────────
 * Checkmark icon
 * ───────────────────────────────────────────── */

const CheckmarkIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const MinusIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M5 12h14" />
  </svg>
);

/* ─────────────────────────────────────────────
 * Checkbox
 * ───────────────────────────────────────────── */

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  /** Optional label displayed beside the checkbox */
  label?: React.ReactNode;
  /** Optional description displayed below the label */
  description?: React.ReactNode;
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, label, description, id, disabled, ...props }, ref) => {
  const generatedId = React.useId();
  const checkboxId = id ?? generatedId;

  const checkbox = (
    <CheckboxPrimitive.Root
      ref={ref}
      id={checkboxId}
      disabled={disabled}
      className={cn(
        'peer h-4 w-4 flex-shrink-0',
        'rounded-[var(--radius-sm)] border',
        'transition-all duration-[var(--duration-moderate)] ease-[var(--ease-default)]',
        'focus-visible:outline-none focus-visible:shadow-[var(--shadow-focus-ring)]',
        'disabled:cursor-not-allowed disabled:opacity-50',
        /* unchecked */
        'border-[var(--border-strong)] bg-white',
        'hover:border-[var(--border-focus)]',
        /* checked */
        'data-[state=checked]:border-[var(--color-gray-900)] data-[state=checked]:bg-[var(--color-gray-900)]',
        'data-[state=checked]:hover:bg-[var(--color-gray-950)] data-[state=checked]:hover:border-[var(--color-gray-950)]',
        /* indeterminate */
        'data-[state=indeterminate]:border-[var(--color-gray-900)] data-[state=indeterminate]:bg-[var(--color-gray-900)]',
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className={cn(
          'flex items-center justify-center text-white',
          'data-[state=checked]:animate-in data-[state=checked]:zoom-in-75',
          'data-[state=unchecked]:animate-out data-[state=unchecked]:zoom-out-75'
        )}
      >
        {props.checked === 'indeterminate' ? (
          <MinusIcon className="h-3 w-3" />
        ) : (
          <CheckmarkIcon className="h-3 w-3" />
        )}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );

  if (!label && !description) {
    return checkbox;
  }

  return (
    <div className="flex items-start gap-2">
      <div className="mt-0.5">{checkbox}</div>
      <div className="flex flex-col gap-0.5">
        {label && (
          <label
            htmlFor={checkboxId}
            className={cn(
              'text-[var(--text-base)] font-[var(--font-medium)] leading-[var(--leading-snug)]',
              'text-[var(--text-primary)] cursor-pointer select-none',
              disabled && 'cursor-not-allowed opacity-50'
            )}
          >
            {label}
          </label>
        )}
        {description && (
          <span
            className={cn(
              'text-[var(--text-sm)] text-[var(--text-muted)] leading-[var(--leading-normal)]',
              disabled && 'opacity-50'
            )}
          >
            {description}
          </span>
        )}
      </div>
    </div>
  );
});

Checkbox.displayName = 'Checkbox';

export { Checkbox };
