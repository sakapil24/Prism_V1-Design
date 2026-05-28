import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { cn } from '../utils/cn';

/* ─────────────────────────────────────────────
 * Root, Group, Value re-exports
 * ───────────────────────────────────────────── */

const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

/* ─────────────────────────────────────────────
 * ChevronDown icon
 * ───────────────────────────────────────────── */

const ChevronDown: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const ChevronUp: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m18 15-6-6-6 6" />
  </svg>
);

const CheckIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

/* ─────────────────────────────────────────────
 * Trigger
 * ───────────────────────────────────────────── */

export interface SelectTriggerProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> {
  hasError?: boolean;
}

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerProps
>(({ className, children, hasError = false, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      'flex h-8 w-full items-center justify-between gap-2',
      'rounded-[var(--radius)] border bg-white px-2 py-1',
      'font-[var(--font-sans)] text-[var(--text-base)] font-[var(--font-medium)] leading-[var(--leading-snug)]',
      'text-[var(--text-primary)]',
      'transition-[border-color,box-shadow] duration-[var(--duration-moderate)] ease-[var(--ease-default)]',
      'focus:outline-none',
      'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[var(--surface-muted)]',
      'data-[placeholder]:text-[var(--text-faint)] data-[placeholder]:font-[var(--font-normal)]',
      hasError
        ? 'border-[var(--border-error)] focus:border-[var(--border-error)] focus:shadow-[0_0_0_2px_rgba(220,38,38,0.2)]'
        : 'border-[var(--border-default)] focus:border-[var(--border-focus)] focus:shadow-[var(--shadow-focus-ring)]',
      className
    )}
    {...props}
  >
    <span className="flex-1 truncate text-left">{children}</span>
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 flex-shrink-0 text-[var(--icon-muted)]" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));

SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

/* ─────────────────────────────────────────────
 * ScrollUp / ScrollDown buttons
 * ───────────────────────────────────────────── */

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      'flex cursor-default items-center justify-center py-1',
      className
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4 text-[var(--icon-muted)]" />
  </SelectPrimitive.ScrollUpButton>
));

SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      'flex cursor-default items-center justify-center py-1',
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4 text-[var(--icon-muted)]" />
  </SelectPrimitive.ScrollDownButton>
));

SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;

/* ─────────────────────────────────────────────
 * Content (dropdown panel)
 * ───────────────────────────────────────────── */

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      position={position}
      className={cn(
        'relative z-[var(--z-popover)] overflow-hidden',
        'rounded-[var(--radius-xl)] border border-[var(--border-subtle)] bg-white',
        'shadow-[var(--shadow-popover)]',
        /* animation */
        'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
        'data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2',
        'data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2',
        position === 'popper' &&
          'max-h-[--radix-select-content-available-height] w-[var(--radix-select-trigger-width)]',
        className
      )}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          'p-1',
          position === 'popper' && 'h-[var(--radix-select-content-available-height)]'
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));

SelectContent.displayName = SelectPrimitive.Content.displayName;

/* ─────────────────────────────────────────────
 * Label (group heading)
 * ───────────────────────────────────────────── */

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn(
      'px-2 py-1.5 text-[var(--text-sm)] font-[var(--font-medium)] text-[var(--text-muted)]',
      className
    )}
    {...props}
  />
));

SelectLabel.displayName = SelectPrimitive.Label.displayName;

/* ─────────────────────────────────────────────
 * Item
 * ───────────────────────────────────────────── */

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex h-8 w-full cursor-pointer select-none items-center',
      'rounded-[var(--radius-md)] px-2 pr-8',
      'text-[var(--text-base)] font-[var(--font-medium)] text-[var(--text-primary)]',
      'outline-none',
      'data-[highlighted]:bg-[var(--surface-hover)]',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      'transition-colors duration-[var(--duration-fast)]',
      className
    )}
    {...props}
  >
    <SelectPrimitive.ItemText className="flex-1 truncate">
      {children}
    </SelectPrimitive.ItemText>
    <span className="absolute right-2 flex h-4 w-4 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <CheckIcon className="h-3.5 w-3.5 text-[var(--color-gray-900)]" />
      </SelectPrimitive.ItemIndicator>
    </span>
  </SelectPrimitive.Item>
));

SelectItem.displayName = SelectPrimitive.Item.displayName;

/* ─────────────────────────────────────────────
 * Separator
 * ───────────────────────────────────────────── */

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-[var(--border-subtle)]', className)}
    {...props}
  />
));

SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

/* ─────────────────────────────────────────────
 * Exports
 * ───────────────────────────────────────────── */

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
