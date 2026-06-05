import * as React from 'react';
import { Card } from '../../design-system/components';
import { Badge } from '../../design-system/components';
import { Startup, Deal, ClaimAudit } from '../types';
import { CompanyLogo } from './CompanyLogo';
import { mockVendors } from '../data/mockData';

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
  const unclaimedDealsCount = deals.filter(d => d.status === 'available').length;

  // Bubble stepper helper removed - transitioned to simplified Redeemed List

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

      {/* Value Summary Perks Meter - 4-Column KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-slideInUp stagger-1">
        <Card className="!bg-white border border-[var(--border-subtle)] p-5 flex flex-col justify-between h-36 shadow-sm">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
              Claimed Savings
            </span>
            <div className="text-2xl font-extrabold text-[var(--text-primary)] mt-2">
              ${startup.savingsTotal.toLocaleString()}
            </div>
          </div>
          <div className="flex">
            <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-bold border rounded uppercase tracking-wider bg-[#E1ECF7] text-[#2D5DA0] border-[#B0C8E2]">
              {savingPercentage}% of pool
            </span>
          </div>
        </Card>

        <Card className="!bg-white border border-[var(--border-subtle)] p-5 flex flex-col justify-between h-36 shadow-sm">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
              Unclaimed Credits Pool
            </span>
            <div className="text-2xl font-extrabold text-[var(--text-primary)] mt-2">
              ${remainingPerks.toLocaleString()}
            </div>
          </div>
          <div className="flex">
            <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-bold border rounded uppercase tracking-wider bg-[var(--surface-secondary)] text-[var(--text-secondary)] border-[var(--border-subtle)]">
              {unclaimedDealsCount} {unclaimedDealsCount === 1 ? 'deal' : 'deals'} left
            </span>
          </div>
        </Card>

        <Card className="!bg-white border border-[var(--border-subtle)] p-5 flex flex-col justify-between h-36 shadow-sm">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
              Active Utilizations
            </span>
            <div className="text-2xl font-extrabold text-[var(--text-primary)] mt-2">
              {startup.utilizationsCount} {startup.utilizationsCount === 1 ? 'Tool' : 'Tools'}
            </div>
          </div>
          <div className="flex">
            <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-bold border rounded uppercase tracking-wider bg-[#E4F1EC] text-[#1F8056] border-[#A8D2BD]">
              ✓ ACTIVE
            </span>
          </div>
        </Card>

        <Card className="!bg-white border border-[var(--border-subtle)] p-5 flex flex-col justify-between h-36 shadow-sm">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
              Awaiting VC Review
            </span>
            <div className="text-2xl font-extrabold text-[var(--text-primary)] mt-2">
              {startup.activeClaimsCount} {startup.activeClaimsCount === 1 ? 'Request' : 'Requests'}
            </div>
          </div>
          <div className="flex">
            <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-bold border rounded uppercase tracking-wider bg-[#F8EDD2] text-[#B27316] border-[#E0C285]">
              PENDING REVIEW
            </span>
          </div>
        </Card>
      </div>

      {/* Main Grid: Live Trackers + recommended Deals */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Redemption Tracker & recommended Perks */}
        <div className="lg:col-span-2 flex flex-col gap-6 animate-slideInUp stagger-2">
          {/* Redeemed So Far */}
          <div className="flex flex-col gap-3">
            <h2 className="text-[13px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
              Redeemed So Far
            </h2>
            <div className="flex flex-col gap-4">
              {claimedDeals.length === 0 ? (
                <Card className="p-8 text-center text-[var(--text-muted)] border border-dashed border-neutral-300 bg-white rounded-[12px]">
                  <p className="text-[14px]">You have no active or claimed credits yet. Claim recommended credits below to get started.</p>
                </Card>
              ) : (
                claimedDeals.map((deal) => {
                  const isClaimed = deal.status === 'claimed';
                  const isApproved = deal.status === 'approved';
                  const isActive = deal.status === 'active';

                  return (
                    <Card key={deal.id} className="p-4 border border-[var(--border-subtle)] bg-white hover:shadow-sm transition-all rounded-[12px] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3.5">
                        <CompanyLogo src={deal.logoUrl} name={deal.vendorName} className="!w-12 !h-12 shrink-0" />
                        <div>
                          <h3 className="text-[14px] font-extrabold text-[var(--text-primary)] leading-snug">
                            {deal.vendorName} — {deal.title}
                          </h3>
                          <p className="text-[13px] text-[var(--text-muted)] mt-1 font-medium">
                            Value: <span className="font-semibold text-neutral-800">{deal.value}</span>
                            {deal.claimedDate && ` • Claimed on ${deal.claimedDate}`}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-auto">
                        {deal.claimCode && (
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(deal.claimCode || '');
                              alert('Voucher coupon code copied to clipboard!');
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[var(--surface-secondary)] hover:bg-neutral-100 text-neutral-900 border border-[var(--border-subtle)] rounded-lg cursor-pointer transition-all group font-mono text-[12px] font-bold shadow-sm"
                            title="Copy coupon code"
                          >
                            <span>{deal.claimCode}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-neutral-450 group-hover:text-black transition-colors shrink-0">
                              <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
                            </svg>
                          </button>
                        )}
                        
                        {isClaimed && (
                          <span className="inline-flex items-center px-2.5 py-1 text-[10px] font-bold border rounded uppercase tracking-wider bg-[#F8EDD2] text-[#B27316] border-[#E0C285]">
                            Awaiting Review
                          </span>
                        )}
                        {isApproved && (
                          <span className="inline-flex items-center px-2.5 py-1 text-[10px] font-bold border rounded uppercase tracking-wider bg-[#E1ECF7] text-[#2D5DA0] border-[#B0C8E2]">
                            Approved
                          </span>
                        )}
                        {isActive && (
                          <span className="inline-flex items-center px-2.5 py-1 text-[10px] font-bold border rounded uppercase tracking-wider bg-[#E4F1EC] text-[#1F8056] border-[#A8D2BD]">
                            ✓ Active
                          </span>
                        )}
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
                  className="relative flex flex-col justify-between hover:shadow-[var(--shadow-md)] hover:-translate-y-0.5 transition-all cursor-pointer border border-[var(--border-subtle)] !bg-white rounded-[12px] p-4 h-48"
                >
                  {deal.isNew && (
                    <span className="absolute -top-1.5 -right-1.5 px-2.5 py-0.5 text-[10px] font-bold bg-[#D97706] text-white rounded-full uppercase tracking-wider shadow-sm select-none z-10">
                      New
                    </span>
                  )}
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <CompanyLogo src={deal.logoUrl} name={deal.vendorName} className="!w-12 !h-12 shrink-0" />
                    </div>
                    <div className="mt-2.5">
                      <h3 className="text-[16px] font-extrabold text-[var(--text-primary)] leading-none mt-1.5">
                        {deal.vendorName}
                      </h3>
                      <p className="text-[14px] text-[var(--text-muted)] mt-2 line-clamp-2 leading-relaxed">
                        {deal.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-3 border-t border-neutral-100 mt-3 shrink-0">
                    <span className="text-[14px] font-bold text-[var(--text-primary)]">
                      {deal.value}
                    </span>

                    {deal.isLocked ? (
                      <span className="px-4 py-1.5 bg-neutral-100 text-neutral-405 border border-neutral-200 text-xs font-bold rounded-full flex items-center gap-1 shadow-inner select-none shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="shrink-0"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                        <span>Locked</span>
                      </span>
                    ) : deal.status === 'available' ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onClaimDeal(deal.id);
                        }}
                        className="px-5 py-2 bg-[#C8102E] hover:bg-[#AE0E28] text-white font-bold text-[14px] rounded-full cursor-pointer transition-colors shadow-sm text-center"
                      >
                        <span>Claim</span>
                      </button>
                    ) : (
                      <Badge color="amber" className="px-5 py-2 !rounded-full !h-auto font-bold text-[14px]">Claimed</Badge>
                    )}
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

          {/* Recommended Service Partners */}
          <div className="flex flex-col gap-3">
            <h2 className="text-[13px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
              Recommended Service Partners
            </h2>
            <div className="flex flex-col gap-3.5">
              {mockVendors.filter(v => v.vcTrusted).slice(0, 3).map((vendor) => (
                <Card key={vendor.id} className="p-3.5 border border-[var(--border-subtle)] bg-white rounded-[12px] flex items-center justify-between gap-3 shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-center gap-3">
                    <CompanyLogo src={vendor.logoUrl} name={vendor.name} className="!w-10 !h-10 shrink-0" />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-[13.5px] font-extrabold text-[var(--text-primary)] leading-none">
                          {vendor.name}
                        </h3>
                        <span className="inline-flex items-center px-1.5 py-0.5 text-[8.5px] font-bold border rounded uppercase tracking-wider bg-emerald-50 text-emerald-800 border-emerald-200 gap-0.5 select-none shrink-0 scale-95 origin-left">
                          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" className="shrink-0">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="#10B981" />
                            <path d="m9 11 2 2 4-4" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <span>Verified</span>
                        </span>
                      </div>
                      <p className="text-[11.5px] font-bold text-neutral-500 mt-1">
                        {vendor.category}
                      </p>
                      <p className="text-[12.5px] text-[var(--text-muted)] mt-1.5 line-clamp-1 leading-normal max-w-[180px]">
                        {vendor.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
              
              <button
                onClick={() => onNavigate('vendors')}
                className="w-full py-2 bg-white hover:bg-neutral-50 border border-black text-black font-extrabold text-[13px] rounded-lg transition-colors cursor-pointer mt-1 text-center shadow-sm"
              >
                Browse Full Directory
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
