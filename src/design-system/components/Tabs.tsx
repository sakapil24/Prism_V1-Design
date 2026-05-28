import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '../utils/cn';

/* ─── Tabs Root ─── */
const Tabs = TabsPrimitive.Root;

/* ─── Tabs List ─── */
const TabsList = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'inline-flex items-center gap-0 border-b border-[var(--border-subtle)]',
      className,
    )}
    {...props}
  />
));
TabsList.displayName = 'TabsList';

/* ─── Tabs Trigger ─── */
const TabsTrigger = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & {
    count?: number;
  }
>(({ className, children, count, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      // Base
      'relative inline-flex items-center gap-1.5 px-3 pb-2.5 pt-2',
      'text-[14px] font-medium leading-[1.35]',
      'text-[var(--text-muted)] cursor-pointer select-none',
      'transition-colors duration-[160ms]',
      // Hover
      'hover:text-[var(--text-primary)]',
      // Active/Selected — animated bottom border indicator
      'data-[state=active]:text-[var(--text-primary)]',
      'after:absolute after:bottom-0 after:left-3 after:right-3',
      'after:h-[2px] after:bg-[var(--color-gray-900)] after:rounded-full',
      'after:origin-center after:scale-x-0',
      'after:transition-transform after:duration-[var(--duration-moderate)] after:ease-[var(--ease-default)]',
      'data-[state=active]:after:scale-x-100',
      // Focus
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] focus-visible:rounded-sm',
      // Disabled
      'disabled:opacity-50 disabled:cursor-not-allowed',
      className,
    )}
    {...props}
  >
    {children}
    {count !== undefined && (
      <span className="text-[12px] text-[var(--text-faint)] tabular-nums">
        {count}
      </span>
    )}
  </TabsPrimitive.Trigger>
));
TabsTrigger.displayName = 'TabsTrigger';

/* ─── Tabs Content ─── */
const TabsContent = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'focus-visible:outline-none',
      'data-[state=inactive]:hidden',
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = 'TabsContent';

export { Tabs, TabsList, TabsTrigger, TabsContent };
