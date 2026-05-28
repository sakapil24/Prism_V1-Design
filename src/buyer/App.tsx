import * as React from 'react';
import { AppShell, Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarNavItem, SidebarSectionLabel, Topbar } from '../design-system/layouts';
import { Toaster, useToast, DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '../design-system/components';
import { PersonIcon, SettingsIcon, ExternalLinkIcon, CloseIcon } from '../design-system/icons';
import { mockStartup, mockDeals, mockVendors, mockAudits } from './data/mockData';
import { DashboardView } from './components/DashboardView';
import { DealsView } from './components/DealsView';
import { VendorsView } from './components/VendorsView';
import { StartupProfileModal, RedemptionLedgerModal } from './components/ProfileView';
import { CompanyLogo } from './components/CompanyLogo';
import { Deal, ClaimAudit, Startup } from './types';

export default function App() {
  const { toast } = useToast();
  
  // App views: 'dashboard' | 'deals' | 'vendors'
  const [currentView, setCurrentView] = React.useState<'dashboard' | 'deals' | 'vendors'>('dashboard');
  
  // App authentication state
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);

  // Modal states
  const [profileOpen, setProfileOpen] = React.useState(false);
  const [ledgerOpen, setLedgerOpen] = React.useState(false);

  // Mobile navigation drawer toggle
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);

  // Core application state
  const [deals, setDeals] = React.useState<Deal[]>(mockDeals);
  const [audits, setAudits] = React.useState<ClaimAudit[]>(mockAudits);
  const [startup, setStartup] = React.useState<Startup>(mockStartup);

  // Selected deal for drawer view in deals tab
  const [focusedDealId, setFocusedDealId] = React.useState<string | null>(null);

  // Dynamically update statistics when states change
  React.useEffect(() => {
    const activeClaimsCount = deals.filter(d => d.status === 'claimed').length;
    const utilizationsCount = deals.filter(d => d.status === 'approved' || d.status === 'active').length;
    
    // Compute total savings dynamically
    let cumulativeSavings = 0;
    deals.forEach(deal => {
      if (deal.status === 'active') {
        if (deal.id === 'deal-aws') cumulativeSavings += 5000;
        if (deal.id === 'deal-stripe') cumulativeSavings += 1000; // estimated saved so far
        if (deal.id === 'deal-notion') cumulativeSavings += 1000;
        if (deal.id === 'deal-retool') cumulativeSavings += 1200;
        if (deal.id === 'deal-slack') cumulativeSavings += 500;
        if (deal.id === 'deal-vercel') cumulativeSavings += 1000;
      } else if (deal.status === 'approved') {
        if (deal.id === 'deal-stripe') cumulativeSavings += 1000; 
      } else if (deal.status === 'claimed') {
        if (deal.id === 'deal-notion') cumulativeSavings += 200;
      }
    });

    if (cumulativeSavings === 0) cumulativeSavings = 7200;

    setStartup(prev => ({
      ...prev,
      activeClaimsCount,
      utilizationsCount,
      savingsTotal: cumulativeSavings
    }));
  }, [deals]);

  // Handle claiming a deal
  const handleClaimDeal = (dealId: string) => {
    const targetDeal = deals.find(d => d.id === dealId);
    if (!targetDeal) return;

    // Update deal state
    const claimCode = `PRISM-${targetDeal.vendorName.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const dateStr = new Date().toLocaleDateString();
    
    setDeals(prev => prev.map(d => {
      if (d.id === dealId) {
        return {
          ...d,
          status: 'claimed',
          claimCode,
          claimedDate: dateStr
        };
      }
      return d;
    }));

    // Trigger toast notification
    toast({
      title: 'Perk claimed successfully',
      description: `Your voucher for ${targetDeal.vendorName} is pending Accel relationship review.`,
      variant: 'info'
    });
  };

  // Helper to advance deal status (prototype simulation)
  const handleAdminAdvanceStatus = (dealId: string) => {
    setDeals(prev => prev.map(d => {
      if (d.id === dealId) {
        if (d.status === 'claimed') {
          toast({
            title: 'Perk request approved',
            description: `${d.vendorName} voucher code is active. Ready for redemption.`,
            variant: 'success'
          });
          return { ...d, status: 'approved' };
        } else if (d.status === 'approved') {
          toast({
            title: 'Perk activated',
            description: `${d.vendorName} code applied. Credits are active.`,
            variant: 'success'
          });
          return { ...d, status: 'active' };
        }
      }
      return d;
    }));
  };

  // Helper to navigate to deals tab and open a deal drawer directly
  const handleViewDeal = (dealId: string) => {
    setCurrentView('deals');
    setFocusedDealId(dealId);
  };

  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      getIcon: (isActive: boolean) => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="shrink-0"
        >
          <rect x="3" y="3" width="7" height="9" rx="1" />
          <rect x="14" y="3" width="7" height="5" rx="1" />
          <rect x="14" y="12" width="7" height="9" rx="1" />
          <rect x="3" y="16" width="7" height="5" rx="1" />
        </svg>
      )
    },
    {
      id: 'deals',
      label: 'Deals',
      getIcon: (isActive: boolean) => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="shrink-0"
        >
          <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
          <path d="M7 7h.01" />
        </svg>
      )
    },
    {
      id: 'vendors',
      label: 'Partner Directory',
      getIcon: (isActive: boolean) => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="shrink-0"
        >
          <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
          <line x1="9" y1="22" x2="9" y2="16" />
          <line x1="15" y1="22" x2="15" y2="16" />
          <line x1="9" y1="16" x2="15" y2="16" />
          <path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M16 10h.01M8 10h.01M10 14h4" />
        </svg>
      )
    },
  ] as const;

  // ───────── AUTHENTICATION GUARD: LOGOUT VIEW ─────────
  if (!isLoggedIn) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-[var(--surface-page)] px-4 font-sans select-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.02),transparent_60%)]" />
        <div className="relative z-10 max-w-sm w-full p-6 bg-white border border-[var(--border-subtle)] rounded-[var(--radius-xl)] shadow-lg flex flex-col items-center text-center animate-scaleIn">
          
          {/* Logo */}
          <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center font-bold text-lg select-none shadow-sm mb-4">
            P
          </div>

          <h1 className="text-[14px] font-bold text-[var(--text-primary)]">Logged Out</h1>
          <p className="text-[14px] text-[var(--text-muted)] leading-relaxed mt-2 px-2">
            You have successfully signed out of your **Aurelia Health** session.
          </p>

          <button
            onClick={() => {
              setIsLoggedIn(true);
              setCurrentView('dashboard');
            }}
            className="w-full mt-6 py-2 bg-black hover:bg-neutral-800 text-white font-bold text-[14px] rounded-[var(--radius-lg)] cursor-pointer transition-colors shadow-sm"
          >
            Sign Back In
          </button>

          <div className="mt-4 pt-4 border-t border-[var(--border-subtle)] w-full text-center">
            <a
              href="./index.html"
              className="text-[14px] text-[var(--text-muted)] hover:text-black font-semibold flex items-center justify-center gap-1 hover:underline"
            >
              Back to Design System Specs →
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Sidebar Layout node
  const sidebarContent = (
    <Sidebar>
      {/* Sidebar Header: Workspace selector at the top showing active team info */}
      <SidebarHeader className="border-b border-[var(--border-subtle)] flex items-center justify-between">
        <div className="flex items-center gap-2.5 min-w-0">
          <CompanyLogo src="https://logos.hunter.io/accel.com" name="Accel India" size="sm" className="!w-7 !h-7 !rounded-[var(--radius-md)] border-neutral-300" />
          {!sidebarCollapsed && (
            <div className="min-w-0 flex-1">
              <span className="block text-[14px] font-extrabold text-[var(--text-primary)] truncate">
                Accel India
              </span>
              <div className="flex items-center gap-1.5 mt-0.5 min-w-0">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span className="text-[11px] text-neutral-500 font-bold uppercase tracking-wider truncate">
                  Founder Network
                </span>
              </div>
            </div>
          )}
        </div>
        
        {/* Toggle button */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="hidden lg:flex w-5 h-5 items-center justify-center border border-[var(--border-subtle)] hover:bg-[var(--surface-hover)] rounded text-[var(--text-muted)] hover:text-black cursor-pointer transition-colors"
          title={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {sidebarCollapsed ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>
          )}
        </button>
      </SidebarHeader>

      {/* Main navigation list */}
      <SidebarContent className="mt-3 px-3">
        <div className="flex flex-col gap-1.5">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <SidebarNavItem
                key={item.id}
                icon={item.getIcon(isActive)}
                active={isActive}
                onClick={() => {
                  setCurrentView(item.id);
                  setMobileOpen(false);
                }}
                title={sidebarCollapsed ? item.label : undefined}
              >
                {!sidebarCollapsed && item.label}
              </SidebarNavItem>
            );
          })}
        </div>
      </SidebarContent>

      {/* Sidebar Footer: User Account Widget dropdown with Ledger, Profile and Logout actions */}
      <SidebarFooter className="border-t border-[var(--border-subtle)] py-3 px-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="flex items-center gap-2.5 w-full p-2 hover:bg-[var(--surface-hover)] rounded-[var(--radius-lg)] text-left cursor-pointer transition-all select-none focus:outline-none"
              title={sidebarCollapsed ? "Account Settings" : undefined}
            >
              <CompanyLogo src={startup.logo} name={startup.name} size="sm" className="!w-8 !h-8 !rounded-full border-neutral-300" />
              {!sidebarCollapsed && (
                <div className="min-w-0 flex-1 flex items-center justify-between gap-1">
                  <div className="min-w-0">
                    <span className="block text-[14px] font-bold text-[var(--text-primary)] truncate">
                      {startup.name}
                    </span>
                    <span className="block text-[12px] text-[var(--text-muted)] font-medium mt-0.5 truncate">
                      {startup.contactEmail}
                    </span>
                  </div>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-neutral-400">
                    <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </button>
          </DropdownMenuTrigger>
          
          <DropdownMenuContent side="right" align="end" className="w-64 p-2 flex flex-col gap-0.5 font-sans !rounded-[20px] shadow-[0_4px_24px_rgba(0,0,0,0.08),0_1px_8px_rgba(0,0,0,0.04)] border-0 bg-white">
            {/* Group 1: Core Portal Actions */}
            <DropdownMenuItem onClick={() => setProfileOpen(true)} className="cursor-pointer text-[14px] font-semibold !h-auto px-4 py-3 flex items-center gap-3.5 rounded-[8px] text-neutral-800 hover:bg-[#F7F7F7] focus:bg-[#F7F7F7] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-800 shrink-0"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              Startup Profile
            </DropdownMenuItem>
            
            <DropdownMenuItem onClick={() => setLedgerOpen(true)} className="cursor-pointer text-[14px] font-semibold !h-auto px-4 py-3 flex items-center gap-3.5 rounded-[8px] text-neutral-800 hover:bg-[#F7F7F7] focus:bg-[#F7F7F7] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-800 shrink-0"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              Redemption Ledger
            </DropdownMenuItem>

            <DropdownMenuSeparator className="my-1.5 bg-[#EAEAEA]" />

            {/* Group 2: Visualizer (text-only) */}
            <DropdownMenuItem asChild className="cursor-pointer text-[14px] font-semibold !h-auto px-4 py-3 flex items-center rounded-[8px] text-neutral-800 hover:bg-[#F7F7F7] focus:bg-[#F7F7F7] transition-colors">
              <a href="./index.html" className="w-full text-left">
                Design Specs Visualizer
              </a>
            </DropdownMenuItem>

            <DropdownMenuSeparator className="my-1.5 bg-[#EAEAEA]" />

            {/* Group 3: Logout (text-only) */}
            <DropdownMenuItem
              onClick={() => setIsLoggedIn(false)}
              className="cursor-pointer text-[14px] font-semibold !h-auto px-4 py-3 flex items-center rounded-[8px] text-neutral-800 hover:bg-[#F7F7F7] focus:bg-[#F7F7F7] transition-colors"
            >
              <span className="w-full text-left">Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );

  return (
    <AppShell
      sidebar={sidebarContent}
      sidebarCollapsed={sidebarCollapsed}
      mobileSidebarOpen={mobileOpen}
      onMobileSidebarClose={() => setMobileOpen(false)}
    >
      {/* Top bar header: Mobile only (hidden on desktop to maximize real estate) */}
      <Topbar
        className="lg:hidden"
        onMenuClick={() => setMobileOpen(!mobileOpen)}
        left={
          <span className="text-[14px] font-bold text-[var(--text-primary)] uppercase tracking-wider select-none">
            {currentView === 'dashboard' && 'Dashboard'}
            {currentView === 'deals' && 'Software Credits'}
            {currentView === 'vendors' && 'VC Partners'}
          </span>
        }
        right={
          <div className="flex items-center gap-1.5 select-none">
            <CompanyLogo src={startup.logo} name={startup.name} size="sm" className="!w-5 !h-5 !rounded-full border-neutral-300 !text-[9px]" />
          </div>
        }
      />

      {/* Main View Container */}
      <div className="flex-1 overflow-y-auto p-4 lg:p-6 bg-white">
        {currentView === 'dashboard' && (
          <DashboardView
            startup={startup}
            deals={deals}
            audits={audits}
            onNavigate={setCurrentView}
            onClaimDeal={handleClaimDeal}
            onViewDeal={handleViewDeal}
          />
        )}

        {currentView === 'deals' && (
          <DealsView
            deals={deals}
            onClaimDeal={handleClaimDeal}
            onAdminAdvanceStatus={handleAdminAdvanceStatus}
          />
        )}

        {currentView === 'vendors' && (
          <VendorsView
            vendors={mockVendors}
          />
        )}
      </div>

      {/* Modal Dialogs (Profile & Ledger) */}
      <StartupProfileModal
        startup={startup}
        open={profileOpen}
        onOpenChange={setProfileOpen}
      />

      <RedemptionLedgerModal
        deals={deals}
        audits={audits}
        open={ledgerOpen}
        onOpenChange={setLedgerOpen}
      />

      {/* Global Toast Host */}
      <Toaster />
    </AppShell>
  );
}
