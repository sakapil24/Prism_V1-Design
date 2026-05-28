/**
 * CRM Design System Example — Radio Component
 *
 * Radio group built on Radix UI, matching the sample CRM's styling.
 * Follows the same label/description pattern as Checkbox.
 */

import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { cn } from '../utils/cn';

/* ─── RadioGroup ──────────────────────────────────────────────────────── */

export interface RadioGroupProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {}

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Root
    ref={ref}
    className={cn('grid gap-2', className)}
    {...props}
  />
));

RadioGroup.displayName = 'RadioGroup';

/* ─── RadioGroupItem ──────────────────────────────────────────────────── */

export interface RadioGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  label?: React.ReactNode;
  description?: React.ReactNode;
}

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(({ className, label, description, id, disabled, ...props }, ref) => {
  const generatedId = React.useId();
  const radioId = id ?? generatedId;

  const radio = (
    <RadioGroupPrimitive.Item
      ref={ref}
      id={radioId}
      disabled={disabled}
      className={cn(
        'peer h-4 w-4 flex-shrink-0 rounded-full',
        'border border-[var(--border-strong)] bg-white',
        'transition-all duration-[var(--duration-moderate)] ease-[var(--ease-default)]',
        'hover:border-[var(--border-focus)]',
        'focus-visible:outline-none focus-visible:shadow-[var(--shadow-focus-ring)]',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'data-[state=checked]:border-[var(--color-gray-900)]',
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <div className="h-2 w-2 rounded-full bg-[var(--color-gray-900)] animate-in zoom-in-75" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );

  if (!label && !description) {
    return radio;
  }

  return (
    <div className="flex items-start gap-2">
      <div className="mt-0.5">{radio}</div>
      <div className="flex flex-col gap-0.5">
        {label && (
          <label
            htmlFor={radioId}
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

RadioGroupItem.displayName = 'RadioGroupItem';

export { RadioGroup, RadioGroupItem };
