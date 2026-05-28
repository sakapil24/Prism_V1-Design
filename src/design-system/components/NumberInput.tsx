import * as React from 'react';
import { cn } from '../utils/cn';

export interface NumberInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
  error?: boolean;
}

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      className,
      value: controlledValue,
      defaultValue = 0,
      min,
      max,
      step = 1,
      onChange,
      error = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const isControlled = controlledValue !== undefined;
    const [localValue, setLocalValue] = React.useState<number>(defaultValue);
    const currentValue = isControlled ? controlledValue : localValue;

    const handleStep = (direction: 'up' | 'down') => {
      if (disabled) return;
      let newValue = currentValue + (direction === 'up' ? step : -step);
      if (min !== undefined && newValue < min) newValue = min;
      if (max !== undefined && newValue > max) newValue = max;

      if (!isControlled) {
        setLocalValue(newValue);
      }
      onChange?.(newValue);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const parsedValue = parseFloat(e.target.value);
      if (isNaN(parsedValue)) return;
      
      let newValue = parsedValue;
      if (min !== undefined && newValue < min) newValue = min;
      if (max !== undefined && newValue > max) newValue = max;

      if (!isControlled) {
        setLocalValue(newValue);
      }
      onChange?.(newValue);
    };

    return (
      <div className={cn('relative inline-flex w-full items-center', className)}>
        <input
          type="number"
          ref={ref}
          value={currentValue}
          onChange={handleInputChange}
          disabled={disabled}
          min={min}
          max={max}
          step={step}
          className={cn(
            'w-full h-10 bg-[var(--surface-raised)] border border-[var(--border-default)] rounded-[var(--radius-sm)] px-3 pr-10',
            'font-[family-name:var(--font-sans)] text-[14px] text-[var(--text-primary)] outline-none',
            'transition-colors duration-[120ms] ease-[var(--ease-default)]',
            'focus:border-[var(--border-focus)] focus:ring-1 focus:ring-[var(--border-focus)]',
            error && 'border-[var(--state-error)]',
            disabled && 'bg-[var(--surface-secondary)] border-[var(--border-subtle)] text-[var(--text-disabled)] cursor-not-allowed'
          )}
          {...props}
        />
        <div className="absolute right-[1px] top-[1px] bottom-[1px] w-8 flex flex-col border-l border-[var(--border-subtle)] divide-y divide-[var(--border-subtle)] overflow-hidden rounded-r-[7px]">
          <button
            type="button"
            onClick={() => handleStep('up')}
            disabled={disabled}
            className="flex-1 flex items-center justify-center hover:bg-[var(--surface-interactive)] text-[var(--text-secondary)] disabled:opacity-40 disabled:hover:bg-transparent"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
          </button>
          <button
            type="button"
            onClick={() => handleStep('down')}
            disabled={disabled}
            className="flex-1 flex items-center justify-center hover:bg-[var(--surface-interactive)] text-[var(--text-secondary)] disabled:opacity-40 disabled:hover:bg-transparent"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </button>
        </div>
      </div>
    );
  }
);
NumberInput.displayName = 'NumberInput';

export { NumberInput };
