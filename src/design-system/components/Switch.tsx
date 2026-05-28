import * as React from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import { cn } from '../utils/cn';

/* ─────────────────────────────────────────────
 * Switch
 * ───────────────────────────────────────────── */

export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {
  /** Optional label displayed beside the switch */
  label?: React.ReactNode;
  /** Optional description displayed below the label */
  description?: React.ReactNode;
  /** Position of the label relative to the switch */
  labelPosition?: 'left' | 'right';
}

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(({ className, label, description, labelPosition = 'right', id, disabled, ...props }, ref) => {
  const generatedId = React.useId();
  const switchId = id ?? generatedId;

  const switchControl = (
    <SwitchPrimitive.Root
      ref={ref}
      id={switchId}
      disabled={disabled}
      className={cn(
        'peer inline-flex h-5 w-9 flex-shrink-0 cursor-pointer items-center',
        'rounded-[var(--radius-full)]',
        'transition-colors duration-[var(--duration-moderate)] ease-[var(--ease-default)]',
        'focus-visible:outline-none focus-visible:shadow-[var(--shadow-focus-ring)]',
        'disabled:cursor-not-allowed disabled:opacity-50',
        /* off */
        'bg-[var(--color-gray-200)]',
        /* on */
        'data-[state=checked]:bg-[var(--color-gray-900)]',
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          'pointer-events-none block h-4 w-4 rounded-[var(--radius-full)]',
          'bg-white shadow-[var(--shadow-sm)]',
          'transition-transform duration-[var(--duration-moderate)] ease-[var(--ease-default)]',
          'data-[state=unchecked]:translate-x-0.5',
          'data-[state=checked]:translate-x-[18px]'
        )}
      />
    </SwitchPrimitive.Root>
  );

  if (!label && !description) {
    return switchControl;
  }

  const labelContent = (
    <div className="flex flex-col gap-0.5">
      {label && (
        <label
          htmlFor={switchId}
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
  );

  return (
    <div className="flex items-center gap-2">
      {labelPosition === 'left' && labelContent}
      <div className="mt-0.5">{switchControl}</div>
      {labelPosition === 'right' && labelContent}
    </div>
  );
});

Switch.displayName = 'Switch';

export { Switch };
