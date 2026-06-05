import * as React from 'react';
import { Toaster, useToast, DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '../design-system/components';
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

  // Core application state
  const [deals, setDeals] = React.useState<Deal[]>(mockDeals);
  const [audits, setAudits] = React.useState<ClaimAudit[]>(mockAudits);
  const [startup, setStartup] = React.useState<Startup>(mockStartup);

  // Selected deal for drawer view in deals tab
  const [focusedDealId, setFocusedDealId] = React.useState<string | null>(null);

  // Scroll ref for main content scroll viewport
  const mainContentRef = React.useRef<HTMLDivElement>(null);

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
  const handleClaimDeal = (dealId: string, variationIndex: number = 0) => {
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
          claimedDate: dateStr,
          selectedVariationIndex: variationIndex
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

  // Helper to scroll to top on tab changes
  const handleNavClick = (view: 'dashboard' | 'deals' | 'vendors') => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Helper to navigate to deals tab and open a deal drawer directly
  const handleViewDeal = (dealId: string) => {
    setCurrentView('deals');
    setFocusedDealId(dealId);
    window.scrollTo({ top: 0, behavior: 'instant' });
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
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
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
          <line x1="19" y1="5" x2="5" y2="19" />
          <circle cx="6.5" cy="6.5" r="2.5" />
          <circle cx="17.5" cy="17.5" r="2.5" />
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
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
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

  return (
    <div className="min-h-screen w-full flex flex-col bg-[var(--surface-secondary)]">
      {/* Premium Top Navigation Bar */}
      <header className="w-full border-b border-neutral-200 bg-white shrink-0 select-none">
        <div className="w-full px-4 lg:px-6 h-16 flex items-center justify-between">
          
          {/* Left section: Accel India Branding */}
          <div className="flex items-center gap-2.5">
            <CompanyLogo src="https://logo.clearbit.com/accel.com" name="Accel India" size="sm" className="!w-7 !h-7" />
            <div className="flex flex-col">
              <span className="text-[13.5px] font-extrabold text-neutral-900 leading-none">
                Accel India
              </span>
              <span className="text-[9.5px] text-neutral-500 font-bold uppercase tracking-wider mt-0.5">
                Founder Network
              </span>
            </div>
          </div>
 
          {/* Center Section: Navigation Links (Inline on desktop) */}
          <nav className="hidden lg:flex items-center gap-6 self-stretch">
            {navItems.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative h-full flex items-center px-1 text-[13.5px] font-extrabold cursor-pointer transition-all duration-150 focus:outline-none select-none ${
                    isActive
                      ? 'text-black font-extrabold'
                      : 'text-neutral-500 hover:text-black font-semibold'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-[var(--accent-primary)] rounded-full z-10" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Section: User account settings dropdown */}
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-neutral-100 cursor-pointer transition-all select-none focus:outline-none"
                  title="Account Settings"
                >
                  <CompanyLogo src={startup.logo} name={startup.name} size="sm" className="!w-8 !h-8 !rounded-full shadow-sm" />
                </button>
              </DropdownMenuTrigger>
              
              <DropdownMenuContent side="bottom" align="end" className="w-64 p-2 flex flex-col gap-0.5 font-sans !rounded-[20px] shadow-[0_10px_32px_rgba(0,0,0,0.12),0_1px_8px_rgba(0,0,0,0.04)] border border-neutral-200/80 bg-white">
                <div className="px-4 py-3 flex flex-col border-b border-neutral-100 mb-1 select-none">
                  <span className="block text-[14px] font-extrabold text-neutral-900 truncate">
                    {startup.name}
                  </span>
                  <span className="block text-[11.5px] text-neutral-500 font-medium mt-0.5 truncate">
                    {startup.contactEmail}
                  </span>
                </div>
                
                <DropdownMenuItem onClick={() => setProfileOpen(true)} className="cursor-pointer text-[13.5px] font-bold !h-auto px-4 py-2.5 flex items-center gap-3 rounded-[8px] text-neutral-800 hover:bg-[#F7F7F7] focus:bg-[#F7F7F7] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-800 shrink-0"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                  Startup Profile
                </DropdownMenuItem>
                
                <DropdownMenuItem onClick={() => setLedgerOpen(true)} className="cursor-pointer text-[13.5px] font-bold !h-auto px-4 py-2.5 flex items-center gap-3 rounded-[8px] text-neutral-800 hover:bg-[#F7F7F7] focus:bg-[#F7F7F7] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-800 shrink-0"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                  Redemption Ledger
                </DropdownMenuItem>

                <DropdownMenuSeparator className="my-1 bg-[#EAEAEA]" />

                <DropdownMenuItem asChild className="cursor-pointer text-[13.5px] font-bold !h-auto px-4 py-2.5 flex items-center rounded-[8px] text-neutral-800 hover:bg-[#F7F7F7] focus:bg-[#F7F7F7] transition-colors">
                  <a href="./index.html">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-800 shrink-0"><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M9 3v18" /><path d="M15 3v18" /><path d="M3 9h18" /><path d="M3 15h18" /></svg>
                    Design Specs Visualizer
                  </a>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="my-1 bg-[#EAEAEA]" />

                <DropdownMenuItem
                  onClick={() => setIsLoggedIn(false)}
                  className="cursor-pointer text-[13.5px] font-bold !h-auto px-4 py-2.5 flex items-center gap-3 rounded-[8px] text-neutral-800 hover:bg-[#F7F7F7] focus:bg-[#F7F7F7] transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-800 shrink-0"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Sub-navigation Menu for Mobile Viewports */}
      <div className="lg:hidden w-full border-b border-neutral-200 bg-white overflow-x-auto scrollbar-none shrink-0 select-none">
        <div className="flex items-center gap-6 px-4 h-11 min-w-max">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative h-full flex items-center px-1 text-[13px] font-extrabold transition-all cursor-pointer focus:outline-none ${
                  isActive
                    ? 'text-black font-extrabold'
                    : 'text-neutral-500 hover:text-black font-semibold'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-[var(--accent-primary)] rounded-full z-10" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main View Container */}
      <div className="flex-1 p-4 lg:p-6 bg-[var(--surface-secondary)]">
        {currentView === 'dashboard' && (
          <DashboardView
            startup={startup}
            deals={deals}
            audits={audits}
            onNavigate={handleNavClick}
            onClaimDeal={handleClaimDeal}
            onViewDeal={handleViewDeal}
          />
        )}

        {currentView === 'deals' && (
          <DealsView
            deals={deals}
            onClaimDeal={handleClaimDeal}
            onAdminAdvanceStatus={handleAdminAdvanceStatus}
            initialSelectedDealId={focusedDealId}
            onClearFocusedDeal={() => setFocusedDealId(null)}
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
    </div>
  );
}
