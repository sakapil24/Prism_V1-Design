import * as React from 'react';
import { cn } from '../utils/cn';

/* ─── App Shell ───
 * Reconstructed from sample CRM's production mobile behavior:
 *
 * Mobile (<lg):
 *   - Sidebar hidden by default, toggled via "Expand sidebar" button
 *   - Sidebar: position fixed, z-index 10, same width as desktop (275px)
 *   - Transition: transform 140ms — fast, not springy
 *   - NO dark backdrop overlay (CRM doesn't use one)
 *   - Sidebar toggle is explicit button, not click-outside
 *
 * Desktop (≥lg):
 *   - Sidebar inline, collapsible between full (275px) and icon (52px) widths
 */

interface AppShellProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Sidebar content */
  sidebar: React.ReactNode;
  /** Whether sidebar is collapsed */
  sidebarCollapsed?: boolean;
  /** Whether mobile sidebar drawer is open (mobile only) */
  mobileSidebarOpen?: boolean;
  /** Callback to close mobile sidebar drawer */
  onMobileSidebarClose?: () => void;
}

const AppShell = React.forwardRef<HTMLDivElement, AppShellProps>(
  (
    {
      className,
      sidebar,
      sidebarCollapsed = false,
      mobileSidebarOpen = false,
      onMobileSidebarClose,
      children,
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      className={cn('flex h-screen w-screen overflow-hidden bg-[var(--surface-page)]', className)}
      {...props}
    >
      {/* Desktop sidebar — inline, collapsible */}
      <aside
        className={cn(
          'hidden lg:flex flex-col h-full bg-[var(--surface-sidebar)] border-r border-[var(--border-subtle)]',
          'transition-[width] duration-[200ms] ease-[var(--ease-default)]',
          'overflow-visible relative flex-shrink-0',
          sidebarCollapsed ? 'w-[var(--sidebar-collapsed)]' : 'w-[var(--sidebar-width)]',
        )}
      >
        {sidebar}
      </aside>

      {/* Mobile sidebar — fixed overlay, NO backdrop (matches CRM production) */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-10 lg:hidden',
          'w-[var(--sidebar-width)]',
          'flex flex-col bg-[var(--surface-sidebar)]',
          'border-r border-[var(--border-subtle)]',
          'shadow-[var(--shadow-popover)]',
          'transition-transform duration-[140ms] ease-[var(--ease-default)]',
          mobileSidebarOpen
            ? 'translate-x-0'
            : '-translate-x-full',
        )}
      >
        {sidebar}
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden min-w-0 bg-white">
        {children}
      </main>
    </div>
  ),
);
AppShell.displayName = 'AppShell';

export { AppShell };
export type { AppShellProps };
