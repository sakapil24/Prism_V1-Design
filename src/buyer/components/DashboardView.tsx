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
    <div className="flex-1 flex flex-col gap-8 max-w-6xl mx-auto py-2">
      {/* 1. Simple Welcome Message */}
      <div className="animate-fadeIn">
        <h1 className="text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
          Welcome, {startup.name}
        </h1>
        <p className="text-[14px] text-[var(--text-muted)] mt-1.5 leading-relaxed font-normal">
          Explore your active software benefit savings, pending VC approval reviews, and claim new curated credits to extend your runway.
        </p>
      </div>

      {/* 2. Four KPI Cards */}
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

      {/* 3. Recommended Credits Section */}
      <div className="flex flex-col gap-4 animate-slideInUp stagger-2">
        <div>
          <h2 className="text-[16px] font-bold text-[var(--text-primary)] uppercase tracking-wide">
            Recommended Credits to Claim
          </h2>
          <p className="text-[13.5px] text-[var(--text-muted)] mt-1 font-normal leading-relaxed">
            You can start having recommended credits to claim
          </p>
        </div>

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

      {/* 4. Recommended Service Partners Section */}
      <div className="flex flex-col gap-4 animate-slideInUp stagger-3">
        <div>
          <h2 className="text-[16px] font-bold text-[var(--text-primary)] uppercase tracking-wide">
            Recommended Service Partners
          </h2>
          <p className="text-[13.5px] text-[var(--text-muted)] mt-1 font-normal leading-relaxed">
            Pre-vetted service providers and startup consultants trusted by Accel operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mockVendors.filter(v => v.vcTrusted).slice(0, 3).map((vendor) => (
            <Card key={vendor.id} className="p-4 border border-[var(--border-subtle)] bg-white rounded-[12px] flex items-start gap-3.5 shadow-sm hover:shadow-md transition-all">
              <CompanyLogo src={vendor.logoUrl} name={vendor.name} className="!w-10 !h-10 shrink-0 mt-0.5" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-[14px] font-extrabold text-[var(--text-primary)] leading-none">
                    {vendor.name}
                  </h3>
                  <span className="inline-flex items-center px-1.5 py-0.5 text-[8px] font-bold border rounded uppercase tracking-wider bg-emerald-50 text-emerald-800 border-emerald-200 gap-0.5 select-none shrink-0 scale-90 origin-left">
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" className="shrink-0">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="#10B981" />
                      <path d="m9 11 2 2 4-4" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>Verified</span>
                  </span>
                </div>
                <p className="text-[11px] font-bold text-neutral-500 mt-1">
                  {vendor.category}
                </p>
                <p className="text-[12.5px] text-[var(--text-muted)] mt-2 line-clamp-2 leading-relaxed">
                  {vendor.description}
                </p>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex justify-center mt-1">
          <button
            onClick={() => onNavigate('vendors')}
            className="px-6 py-2 bg-white hover:bg-neutral-50 border border-neutral-300 hover:border-black text-black font-extrabold text-[12.5px] rounded-lg transition-colors cursor-pointer text-center shadow-sm"
          >
            Browse Full Partner Directory
          </button>
        </div>
      </div>

      {/* 5. Claimed Deals Ledger Table */}
      <div className="flex flex-col gap-4 animate-slideInUp mt-2">
        <div>
          <h2 className="text-[16px] font-bold text-[var(--text-primary)] uppercase tracking-wide">
            Claimed Benefits Ledger
          </h2>
          <p className="text-[13.5px] text-[var(--text-muted)] mt-1 font-normal leading-relaxed">
            A real-time overview of the software credits and waivers you have claimed.
          </p>
        </div>

        <div className="border border-[var(--border-subtle)] rounded-xl overflow-hidden shadow-sm bg-white">
          <table className="w-full text-left border-collapse text-[13px]">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-200 font-bold text-neutral-800 select-none">
                <th className="p-4 pl-6">Vendor</th>
                <th className="p-4">Value</th>
                <th className="p-4">Claimed Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 pr-6 text-right">Actions / Coupon Code</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 font-medium text-[var(--text-primary)]">
              {claimedDeals.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-[var(--text-muted)] italic">
                    You have not claimed any benefits yet.
                  </td>
                </tr>
              ) : (
                claimedDeals.map((deal) => {
                  const isClaimed = deal.status === 'claimed';
                  const isApproved = deal.status === 'approved';
                  const isActive = deal.status === 'active';

                  return (
                    <tr key={deal.id} className="hover:bg-neutral-50/30 transition-colors">
                      <td className="p-4 pl-6">
                        <div className="flex items-center gap-3">
                          <CompanyLogo src={deal.logoUrl} name={deal.vendorName} className="!w-9 !h-9 p-0.5 border border-neutral-100 bg-white rounded-lg shadow-sm" />
                          <div>
                            <span className="block font-bold text-neutral-900 leading-none">{deal.vendorName}</span>
                            <span className="block text-[11.5px] text-neutral-500 font-normal mt-1">{deal.title}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 font-bold text-neutral-900">
                        {deal.value}
                      </td>
                      <td className="p-4 text-neutral-500 font-normal">
                        {deal.claimedDate || '—'}
                      </td>
                      <td className="p-4">
                        {isClaimed && (
                          <span className="inline-flex px-2 py-0.5 text-[9.5px] font-extrabold border rounded bg-[#F8EDD2] text-[#B27316] border-[#E0C285] uppercase tracking-wide">
                            Awaiting Review
                          </span>
                        )}
                        {isApproved && (
                          <span className="inline-flex px-2 py-0.5 text-[9.5px] font-extrabold border rounded bg-[#E1ECF7] text-[#2D5DA0] border-[#B0C8E2] uppercase tracking-wide">
                            Approved
                          </span>
                        )}
                        {isActive && (
                          <span className="inline-flex px-2 py-0.5 text-[9.5px] font-extrabold border rounded bg-[#E4F1EC] text-[#1F8056] border-[#A8D2BD] uppercase tracking-wide">
                            ✓ Active
                          </span>
                        )}
                      </td>
                      <td className="p-4 pr-6 text-right">
                        {deal.claimCode ? (
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(deal.claimCode || '');
                              alert('Voucher coupon code copied to clipboard!');
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[var(--surface-secondary)] hover:bg-neutral-100 text-neutral-950 border border-[var(--border-subtle)] rounded-lg cursor-pointer transition-all font-mono text-[12px] font-extrabold shadow-sm"
                            title="Copy coupon code"
                          >
                            <span>{deal.claimCode}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-neutral-500 shrink-0">
                              <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
                            </svg>
                          </button>
                        ) : (
                          <span className="text-neutral-400 italic text-[12px]">No code</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
