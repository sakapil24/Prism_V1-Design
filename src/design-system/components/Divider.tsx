import * as React from 'react';
import { cn } from '../utils/cn';

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
}

const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ className, orientation = 'horizontal', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'bg-[var(--border-subtle)] shrink-0',
          orientation === 'horizontal' ? 'h-[1px] w-full' : 'w-[1px] h-full self-stretch',
          className
        )}
        role="separator"
        aria-orientation={orientation}
        {...props}
      />
    );
  }
);

Divider.displayName = 'Divider';

export { Divider };
