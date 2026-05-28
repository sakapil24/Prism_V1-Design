import * as React from 'react';
import { cn } from '../utils/cn';

export interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
  raised?: boolean;
}

const Panel = React.forwardRef<HTMLDivElement, PanelProps>(
  ({ className, raised = true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-[var(--radius-lg)] bg-[var(--surface-raised)] border border-[var(--border-subtle)] flex flex-col overflow-hidden',
          raised ? 'shadow-[var(--shadow-md)]' : 'shadow-none',
          className
        )}
        {...props}
      />
    );
  }
);
Panel.displayName = 'Panel';

const PanelHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'px-6 py-4 border-b border-[var(--border-subtle)] flex items-center justify-between',
        className
      )}
      {...props}
    />
  )
);
PanelHeader.displayName = 'PanelHeader';

const PanelTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        'text-[16px] font-semibold text-[var(--text-primary)] leading-[1.35]',
        className
      )}
      {...props}
    />
  )
);
PanelTitle.displayName = 'PanelTitle';

const PanelContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('p-6 flex-grow overflow-y-auto', className)}
      {...props}
    />
  )
);
PanelContent.displayName = 'PanelContent';

const PanelFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'px-6 py-3 border-t border-[var(--border-subtle)] bg-[var(--surface-secondary)] flex items-center justify-end gap-3',
        className
      )}
      {...props}
    />
  )
);
PanelFooter.displayName = 'PanelFooter';

export { Panel, PanelHeader, PanelTitle, PanelContent, PanelFooter };
