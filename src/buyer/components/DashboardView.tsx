import * as React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../design-system/components';
import { Badge } from '../../design-system/components';
import { StageIndicator, StageStep } from '../../design-system/components';
import { Startup, Deal, ClaimAudit } from '../types';
import { CompanyLogo } from './CompanyLogo';

interface DashboardViewProps {
  startup: Startup;
  deals: Deal[];
  audits: ClaimAudit[];
  onNavigate: (view: 'dashboard' | 'deals' | 'vendors') => void;
  onClaimDeal: (dealId: string) => void;
  onViewDeal: (dealId: string) => void;
}

export function DashboardView({ startup, deals, audits, onNavigate, onClaimDeal, onViewDeal }: DashboardViewProps) {
  // Filter active claims/redemptions
  const claimedDeals = deals.filter(d => d.status === 'claimed' || d.status === 'approved' || d.status === 'active');
  const availableDeals = deals.filter(d => d.status === 'available').slice(0, 3); // recommend top 3 available

  // Calculate remaining benefits
  const totalPerkValue = 31000; // Mock total cap of benefits
  const remainingPerks = totalPerkValue - startup.savingsTotal;
  const savingPercentage = Math.round((startup.savingsTotal / totalPerkValue) * 100);

  const getStepsForDeal = (deal: Deal): StageStep[] => {
    const isClaimed = deal.status === 'claimed';
    const isApproved = deal.status === 'approved';
    const isActive = deal.status === 'active';

    return [
      {
        id: '1',
        title: 'Claimed',
        description: deal.claimedDate ? `Req: ${deal.claimedDate}` : 'Voucher requested',
        status: 'complete',
      },
      {
        id: '2',
        title: 'Approved',
        description: isClaimed ? 'Pending VC review' : 'VC Approved',
        status: isClaimed ? 'pending' : isApproved ? 'active' : 'complete',
      },
      {
        id: '3',
        title: 'Active',
        description: isActive ? 'Redeemed' : 'Awaiting code entry',
        status: isActive ? 'complete' : 'pending',
      },
    ];
  };

  return (
    <div className="flex-1 flex flex-col gap-6 max-w-6xl mx-auto py-2">
      {/* Premium VC Branding Header */}
      <div className="relative overflow-hidden rounded-[var(--radius-xl)] bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-800 p-6 text-white shadow-md animate-fadeIn">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(200,16,46,0.1),transparent_40%)]" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[14px] font-extrabold tracking-widest text-neutral-300 uppercase bg-neutral-800 px-2 py-0.5 rounded border border-neutral-700">
              Portfolio Perk Hub
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[14px] text-neutral-400 font-bold">{startup.vcPartner} Marketplace</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight mb-1">
            Accel India Startup Benefits
          </h1>
          <p className="text-[14px] text-neutral-300 max-w-2xl leading-relaxed">
            Welcome, <strong>{startup.name}</strong>. Accel partners with top global software sellers to provide exclusive credits, discounts, and curated legal/design consultation to boost your growth runway.
          </p>
        </div>
      </div>

      {/* Value Summary Perks Meter */}
      <Card className="border border-[var(--border-subtle)] bg-white shadow-sm overflow-hidden animate-slideInUp stagger-1">
        <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white">
          <div className="flex-1">
            <span className="text-[14px] font-bold text-[var(--text-muted)] uppercase tracking-wider block">
              Venture Perks Utilization
            </span>
            <div className="flex gap-4 items-baseline mt-1.5">
              <span className="text-3xl font-extrabold text-[var(--text-primary)]">
                ${startup.savingsTotal.toLocaleString()}
              </span>
              <span className="text-[14px] text-neutral-500 font-medium">Claimed Savings</span>
              <span className="text-neutral-300">|</span>
              <span className="text-xl font-bold text-neutral-600">
                ${remainingPerks.toLocaleString()}
              </span>
              <span className="text-[14px] text-neutral-500 font-medium">Remaining Credits</span>
            </div>
            
            {/* Custom styled progress bar */}
            <div className="w-full bg-neutral-200 h-2.5 rounded-full mt-4 overflow-hidden relative">
              <div
                className="bg-black h-full transition-all duration-700 ease-out"
                style={{ width: `${savingPercentage}%` }}
              />
            </div>
            <div className="flex justify-between text-[14px] text-neutral-500 font-semibold mt-1.5">
              <span>{savingPercentage}% claimed</span>
              <span>Total Sponsor Pool: ${totalPerkValue.toLocaleString()}</span>
            </div>
          </div>
          <button
            onClick={() => onNavigate('deals')}
            className="px-4 py-2 bg-black hover:bg-neutral-800 text-white font-bold text-[14px] rounded-[var(--radius-lg)] cursor-pointer shrink-0 transition-all self-start md:self-center shadow-sm"
          >
            Explore All Credits
          </button>
        </div>
      </Card>

      {/* Main Grid: Live Trackers + recommended Deals */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Redemption Tracker & recommended Perks */}
        <div className="lg:col-span-2 flex flex-col gap-6 animate-slideInUp stagger-2">
          {/* Active Redemption Status Trackers */}
          <div className="flex flex-col gap-3">
            <h2 className="text-[13px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
              Active Redemption status
            </h2>
            <div className="flex flex-col gap-4">
              {claimedDeals.length === 0 ? (
                <Card className="p-8 text-center text-[var(--text-muted)] border border-dashed border-neutral-300 bg-white">
                  <p className="text-[14px]">You have no active claims. Get started below or explore the marketplace.</p>
                </Card>
              ) : (
                claimedDeals.map((deal) => {
                  const isClaimed = deal.status === 'claimed';
                  const isApproved = deal.status === 'approved';
                  const isActive = deal.status === 'active';

                  return (
                    <Card key={deal.id} className="p-4 border border-[var(--border-subtle)] bg-white hover:shadow-sm transition-all">
                      <div className="flex justify-between items-start gap-4 mb-4">
                        <div className="flex items-center gap-3">
                          <CompanyLogo src={deal.logoUrl} name={deal.vendorName} size="sm" />
                          <div>
                            <h3 className="text-[14px] font-extrabold text-[var(--text-primary)]">
                              {deal.vendorName} — {deal.title}
                            </h3>
                            <p className="text-[14px] text-[var(--text-muted)] font-medium">
                              Value: <span className="font-semibold">{deal.value}</span>
                            </p>
                          </div>
                        </div>

                        {(isClaimed || isApproved) && <Badge color="amber">Claimed</Badge>}
                        {isActive && <Badge color="green">Active</Badge>}
                      </div>

                      {/* Redesigned neutral grey/black Stepper */}
                      <div className="px-2 pt-2.5 pb-1 border border-neutral-200/50 bg-white rounded-xl">
                        <StageIndicator
                          steps={getStepsForDeal(deal)}
                          variant="bubble"
                          orientation="horizontal"
                        />
                      </div>
                    </Card>
                  );
                })
              )}
            </div>
          </div>

          {/* recommended available SaaS Credits */}
          <div className="flex flex-col gap-3">
            <h2 className="text-[13px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
              Recommended Credits to Claim
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {availableDeals.map((deal) => (
                <Card
                  key={deal.id}
                  onClick={() => onViewDeal(deal.id)}
                  className="flex flex-col justify-between p-3.5 border border-neutral-200 bg-white hover:border-black hover:shadow-sm cursor-pointer transition-all h-40"
                >
                  <div>
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <CompanyLogo src={deal.logoUrl} name={deal.vendorName} size="sm" />
                      <Badge color="gray" className="h-4 text-[14px] px-1.5">{deal.category}</Badge>
                    </div>
                    <h3 className="text-[14px] font-bold text-[var(--text-primary)] block truncate">
                      {deal.vendorName} Credits
                    </h3>
                    <p className="text-[14px] font-bold text-emerald-700 mt-0.5">
                      {deal.value}
                    </p>
                    <p className="text-[14px] text-[var(--text-muted)] line-clamp-2 mt-1.5 leading-snug">
                      {deal.description}
                    </p>
                  </div>
                  
                  <div className="flex justify-end pt-2 border-t border-neutral-100 mt-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onClaimDeal(deal.id);
                      }}
                      className="px-2.5 py-1 text-white bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] font-bold text-[14px] rounded cursor-pointer transition-colors"
                    >
                      Claim Perk
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Marketplace Overview & VC Services Spotlight */}
        <div className="flex flex-col gap-6 animate-slideInUp stagger-3">
          {/* Accel India Network Spotlight */}
          <div className="flex flex-col gap-3">
            <h2 className="text-[13px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
              Partner Network Spotlight
            </h2>
            <Card className="p-4 border border-[var(--border-subtle)] bg-white">
              <span className="text-[14px] font-extrabold text-neutral-400 uppercase tracking-widest block mb-1">
                Indian VCs Marketplace Model
              </span>
              <h3 className="text-[14px] font-bold text-[var(--text-primary)] mb-2">
                Curated VC Benefits
              </h3>
              <p className="text-[14px] text-[var(--text-muted)] leading-relaxed">
                As a portfolio company, Accel has invited your operations team to utilize pre-negotiated software credits. VCs onboard verified software **Sellers** (like AWS, Retool, Stripe), who sponsor credits to support startups.
              </p>
              <div className="mt-4 pt-3 border-t border-neutral-200/60 flex items-center justify-between text-[14px]">
                <span className="text-neutral-500 font-semibold">VC Relations Team</span>
                <a href="mailto:portfolio@accel.com" className="text-black font-bold hover:underline">
                  Contact Accel ops →
                </a>
              </div>
            </Card>
          </div>

          {/* Service Directory shortcut */}
          <div className="flex flex-col gap-3">
            <h2 className="text-[13px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
              Vetted service providers
            </h2>
            <Card className="p-4 border border-[var(--border-subtle)] bg-white flex flex-col justify-between h-44">
              <div>
                <span className="text-[14px] font-extrabold text-neutral-400 uppercase tracking-widest block mb-1">
                  Trusted Agencies
                </span>
                <h3 className="text-[14px] font-bold text-[var(--text-primary)] mb-2">
                  Legal & Design Partners
                </h3>
                <p className="text-[14px] text-[var(--text-muted)] leading-relaxed line-clamp-3">
                  Quickly connect with curated local agencies (like Obvious for UI/UX or Cyril Amarchand Mangaldas for corporate filing) vetted by our partner team.
                </p>
              </div>
              <button
                onClick={() => onNavigate('vendors')}
                className="w-full py-1.5 border border-black hover:bg-neutral-50 text-black font-bold text-[14px] rounded transition-colors cursor-pointer mt-3"
              >
                Browse Service Directory
              </button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
