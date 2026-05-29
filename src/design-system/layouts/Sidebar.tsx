import * as React from 'react';
import { cn } from '../utils/cn';

/* ─── Sidebar Context ─── */
const SidebarContext = React.createContext<{ collapsed: boolean }>({ collapsed: false });

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  collapsed?: boolean;
}

/* ─── Sidebar ─── */
const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ className, children, collapsed = false, ...props }, ref) => (
    <SidebarContext.Provider value={{ collapsed }}>
      <div ref={ref} className={cn('flex flex-col h-full', className)} {...props}>
        {children}
      </div>
    </SidebarContext.Provider>
  ),
);
Sidebar.displayName = 'Sidebar';

/* ─── Sidebar Header (workspace name area) ─── */
const SidebarHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center gap-2 px-3 h-[var(--topbar-height)] flex-shrink-0', className)}
      {...props}
    >
      {children}
    </div>
  ),
);
SidebarHeader.displayName = 'SidebarHeader';

/* ─── Sidebar Content (scrollable nav area) ─── */
const SidebarContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex-1 overflow-y-auto px-2 py-1', className)}
      {...props}
    >
      {children}
    </div>
  ),
);
SidebarContent.displayName = 'SidebarContent';

/* ─── Sidebar Footer ─── */
const SidebarFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex-shrink-0 px-2 py-2 border-t border-[var(--border-subtle)]', className)}
      {...props}
    >
      {children}
    </div>
  ),
);
SidebarFooter.displayName = 'SidebarFooter';

/* ─── Sidebar Section Label ─── */
function SidebarSectionLabel({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'px-2 pt-4 pb-1 text-[12px] font-medium text-[var(--text-muted)] select-none',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/* ─── Sidebar Nav Item ─── */
interface SidebarNavItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Leading icon */
  icon?: React.ReactNode;
  /** Whether this item is currently active */
  active?: boolean;
  /** Whether this item is expandable (has children) */
  expandable?: boolean;
  /** Whether expanded */
  expanded?: boolean;
  /** Right-side badge/count */
  badge?: React.ReactNode;
  /** Indentation level (0 = root, 1 = nested) */
  indent?: number;
}

const SidebarNavItem = React.forwardRef<HTMLButtonElement, SidebarNavItemProps>(
  ({ className, icon, active, expandable, expanded, badge, indent = 0, children, ...props }, ref) => {
    const { collapsed } = React.useContext(SidebarContext);
    return (
      <button
        ref={ref}
        data-active={active || undefined}
        className={cn(
          // Base
          'group flex items-center w-full rounded-[var(--radius-sm)] transition-[background-color,opacity] duration-[160ms] cursor-pointer select-none',
          collapsed 
            ? 'justify-center px-2 py-2' 
            : 'gap-3.5 px-4 py-3 text-[14px] font-medium text-[var(--text-primary)]',
          // Padding with indent
          !collapsed && indent === 1 && 'pl-8 pr-4',
          !collapsed && indent === 2 && 'pl-12 pr-4',
          // Hover
          'hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]',
          // Active state
          'data-[active]:bg-neutral-900 data-[active]:text-white data-[active]:font-semibold',
          className,
        )}
        {...props}
      >
        {icon && (
          <span className={cn(
            "flex-shrink-0 flex items-center justify-center text-[var(--icon-default)] group-data-[active]:text-white transition-colors duration-[160ms]",
            collapsed ? "w-6 h-6" : "w-[18px] h-[18px]"
          )}>
            {icon}
          </span>
        )}
        {!collapsed && <span className="flex-1 truncate text-left">{children}</span>}
        {!collapsed && badge && (
          <span className="flex-shrink-0 text-[12px] text-[var(--text-faint)]">
            {badge}
          </span>
        )}
        {!collapsed && expandable && (
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="currentColor"
            className={cn(
              'flex-shrink-0 text-[var(--icon-muted)] transition-transform duration-[160ms]',
              expanded && 'rotate-90',
            )}
          >
            <path d="M4.5 3L8 6L4.5 9" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </svg>
        )}
      </button>
    );
  },
);
SidebarNavItem.displayName = 'SidebarNavItem';

export {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarSectionLabel,
  SidebarNavItem,
};
export type { SidebarNavItemProps };
