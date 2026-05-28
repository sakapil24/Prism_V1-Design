import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

/* ─────────────────────────────────────────────
 * Input Variants
 * ───────────────────────────────────────────── */

const inputVariants = cva(
  [
    'flex w-full rounded-[var(--radius)] bg-white',
    'font-[var(--font-sans)] text-[var(--text-base)] font-[var(--font-medium)] leading-[var(--leading-snug)]',
    'text-[var(--text-primary)]',
    'border border-[var(--border-default)]',
    'transition-[border-color,box-shadow] duration-[var(--duration-moderate)] ease-[var(--ease-default)]',
    'placeholder:text-[var(--text-faint)] placeholder:font-[var(--font-normal)]',
    'file:border-0 file:bg-transparent file:text-[var(--text-sm)] file:font-[var(--font-medium)]',
    'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[var(--surface-muted)]',
    'read-only:bg-[var(--surface-muted)] read-only:cursor-default',
  ],
  {
    variants: {
      size: {
        sm: 'h-7 px-2 py-1 text-[var(--text-sm)]',
        md: 'h-8 px-2 py-1',
        lg: 'h-10 px-3.5 py-2.5',
      },
      hasError: {
        true: 'border-[var(--border-error)] focus:border-[var(--border-error)] focus:shadow-[0_0_0_2px_rgba(220,38,38,0.2)]',
        false: 'focus:border-[var(--border-focus)] focus:shadow-none focus:outline-none focus-visible:outline-none focus-visible:ring-0',
      },
    },
    defaultVariants: {
      size: 'md',
      hasError: false,
    },
  }
);

/* ─────────────────────────────────────────────
 * Input
 * ───────────────────────────────────────────── */

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'>,
    VariantProps<typeof inputVariants> {
  /** Icon or element rendered before the input value */
  leftIcon?: React.ReactNode;
  /** Icon or element rendered after the input value */
  rightIcon?: React.ReactNode;
  /** Text rendered before the input (inside the border) */
  prefix?: React.ReactNode;
  /** Text rendered after the input (inside the border) */
  suffix?: React.ReactNode;
  /** Error state */
  hasError?: boolean;
  /** Wrapper className */
  wrapperClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      wrapperClassName,
      type = 'text',
      size,
      hasError,
      leftIcon,
      rightIcon,
      prefix,
      suffix,
      disabled,
      readOnly,
      ...props
    },
    ref
  ) => {
    const hasAdornment = leftIcon || rightIcon || prefix || suffix;

    if (hasAdornment) {
      return (
        <div
          className={cn(
            inputVariants({ size, hasError }),
            'flex items-center gap-1.5',
            'focus-within:border-[var(--border-focus)]',
            !hasError && 'focus-within:shadow-none focus-within:outline-none',
            hasError && 'focus-within:shadow-[0_0_0_2px_rgba(220,38,38,0.2)]',
            disabled && 'cursor-not-allowed opacity-50 bg-[var(--surface-muted)]',
            readOnly && 'bg-[var(--surface-muted)] cursor-default',
            wrapperClassName
          )}
        >
          {leftIcon && (
            <span className="flex-shrink-0 text-[var(--icon-muted)] [&>svg]:h-4 [&>svg]:w-4">
              {leftIcon}
            </span>
          )}
          {prefix && (
            <span className="flex-shrink-0 text-[var(--text-sm)] text-[var(--text-muted)] select-none">
              {prefix}
            </span>
          )}
          <input
            type={type}
            ref={ref}
            disabled={disabled}
            readOnly={readOnly}
            className={cn(
              'flex-1 min-w-0 bg-transparent outline-none border-0 p-0',
              'text-[var(--text-primary)] font-[var(--font-medium)]',
              'placeholder:text-[var(--text-faint)] placeholder:font-[var(--font-normal)]',
              'disabled:cursor-not-allowed',
              'focus:shadow-none focus-within:shadow-none focus-visible:shadow-none focus-visible:outline-none focus:outline-none [appearance:none] [-webkit-appearance:none]',
              className
            )}
            style={{
              border: 'none',
              outline: 'none',
              boxShadow: 'none',
              appearance: 'none',
              WebkitAppearance: 'none',
              ...props.style
            }}
            {...props}
          />
          {suffix && (
            <span className="flex-shrink-0 text-[var(--text-sm)] text-[var(--text-muted)] select-none">
              {suffix}
            </span>
          )}
          {rightIcon && (
            <span className="flex-shrink-0 text-[var(--icon-muted)] [&>svg]:h-4 [&>svg]:w-4">
              {rightIcon}
            </span>
          )}
        </div>
      );
    }

    return (
      <input
        type={type}
        ref={ref}
        disabled={disabled}
        readOnly={readOnly}
        className={cn(
          inputVariants({ size, hasError }),
          'focus:shadow-none focus-within:shadow-none focus-visible:shadow-none focus-visible:outline-none focus:outline-none',
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

/* ─────────────────────────────────────────────
 * SearchInput
 * ───────────────────────────────────────────── */

export interface SearchInputProps extends Omit<InputProps, 'leftIcon' | 'rightIcon' | 'type'> {
  /** Callback when the clear button is clicked */
  onClear?: () => void;
}

const SearchIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const ClearIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ value, onClear, className, ...props }, ref) => {
    const showClear = value !== undefined && value !== '';

    return (
      <Input
        ref={ref}
        type="search"
        value={value}
        leftIcon={<SearchIcon />}
        rightIcon={
          showClear ? (
            <button
              type="button"
              onClick={onClear}
              className={cn(
                'flex items-center justify-center rounded-[var(--radius-sm)]',
                'h-5 w-5 text-[var(--icon-muted)]',
                'hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)]',
                'transition-colors duration-[var(--duration-fast)]',
                'focus:outline-none'
              )}
              aria-label="Clear search"
              tabIndex={-1}
            >
              <ClearIcon />
            </button>
          ) : undefined
        }
        className={cn('[&::-webkit-search-cancel-button]:hidden', className)}
        {...props}
      />
    );
  }
);

SearchInput.displayName = 'SearchInput';

export { Input, SearchInput, inputVariants };
