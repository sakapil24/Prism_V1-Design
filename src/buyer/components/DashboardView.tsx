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

  // Newsletter subscription state
  const [email, setEmail] = React.useState('');
  const [isSubscribed, setIsSubscribed] = React.useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail('');
    }
  };

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
        <Card className="!bg-white border border-[var(--border-subtle)] p-5 flex flex-col justify-between h-full shadow-sm rounded-xl">
          <div>
            <span className="text-[11.5px] font-bold text-[var(--text-muted)]">
              Deals Claimed
            </span>
            <div className="text-2xl font-extrabold text-[var(--text-primary)] mt-2">
              {claimedDeals.length} of {deals.length}
            </div>
          </div>
          <div className="flex">
            <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-bold border rounded bg-[#E1ECF7] text-[#2D5DA0] border-[#B0C8E2]">
              {Math.round((claimedDeals.length / deals.length) * 100)}% Claimed
            </span>
          </div>
        </Card>

        <Card className="!bg-white border border-[var(--border-subtle)] p-5 flex flex-col justify-between h-full shadow-sm rounded-xl">
          <div>
            <span className="text-[11.5px] font-bold text-[var(--text-muted)]">
              Claimed Credits
            </span>
            <div className="text-2xl font-extrabold text-[var(--text-primary)] mt-2">
              ${startup.savingsTotal.toLocaleString()}
            </div>
          </div>
          <div className="flex">
            <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-bold border rounded bg-[#E4F1EC] text-[#1F8056] border-[#A8D2BD]">
              {savingPercentage}% of Pool
            </span>
          </div>
        </Card>

        <Card className="!bg-white border border-[var(--border-subtle)] p-5 flex flex-col justify-between h-full shadow-sm rounded-xl">
          <div>
            <span className="text-[11.5px] font-bold text-[var(--text-muted)]">
              Active Utilizations
            </span>
            <div className="text-2xl font-extrabold text-[var(--text-primary)] mt-2">
              {startup.utilizationsCount} {startup.utilizationsCount === 1 ? 'Tool' : 'Tools'}
            </div>
          </div>
          <div className="flex">
            <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-bold border rounded bg-[var(--surface-secondary)] text-[var(--text-secondary)] border-[var(--border-subtle)]">
              ✓ Active
            </span>
          </div>
        </Card>

        <Card className="!bg-white border border-[var(--border-subtle)] p-5 flex flex-col justify-between h-full shadow-sm rounded-xl">
          <div>
            <span className="text-[11.5px] font-bold text-[var(--text-muted)]">
              Awaiting VC Review
            </span>
            <div className="text-2xl font-extrabold text-[var(--text-primary)] mt-2">
              {startup.activeClaimsCount} {startup.activeClaimsCount === 1 ? 'Request' : 'Requests'}
            </div>
          </div>
          <div className="flex">
            <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-bold border rounded bg-[#F8EDD2] text-[#B27316] border-[#E0C285]">
              Pending Review
            </span>
          </div>
        </Card>
      </div>

      {/* 3. Recommended Credits & Sidebar Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start animate-slideInUp stagger-2">
        {/* Left Column: Recommended Credits (2/3 width) */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div>
            <h2 className="text-[16px] font-bold text-[var(--text-primary)]">
              Recommended Credits to Claim
            </h2>
            <p className="text-[13.5px] text-[var(--text-muted)] mt-1 font-normal leading-relaxed">
              You can start having recommended credits to claim
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {availableDeals.map((deal) => (
              <Card
                key={deal.id}
                onClick={() => onViewDeal(deal.id)}
                className="relative flex flex-col justify-between hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer border border-[var(--border-subtle)] bg-white rounded-xl p-5 h-full"
              >
                {deal.isNew && (
                  <span className="absolute -top-1.5 -right-1.5 px-2.5 py-0.5 text-[10px] font-bold bg-[#D97706] text-white rounded-full shadow-sm select-none z-10">
                    New
                  </span>
                )}
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between items-start gap-2">
                    <CompanyLogo src={deal.logoUrl} name={deal.vendorName} className="!w-12 !h-12 shrink-0 bg-white p-1 shadow-sm rounded-lg" />
                  </div>
                  <div className="mt-3">
                    <h3 className="text-[15px] font-extrabold text-neutral-900 leading-tight">
                      {deal.vendorName}
                    </h3>
                    <p className="text-[13px] text-neutral-600 mt-2 line-clamp-2 leading-relaxed font-normal">
                      {deal.description}
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-3 border-t border-neutral-100 mt-3 shrink-0">
                  <span className="text-[14px] font-bold text-neutral-900">
                    {deal.value}
                  </span>

                  {deal.isLocked ? (
                    <span className="px-4 py-1.5 bg-neutral-100 text-neutral-400 border border-neutral-200 text-xs font-bold rounded-full flex items-center gap-1 shadow-inner select-none shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="shrink-0"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                      <span>Locked</span>
                    </span>
                  ) : deal.status === 'available' ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onClaimDeal(deal.id);
                      }}
                      className="px-5 py-2 bg-[#C8102E] hover:bg-[#AE0E28] text-white font-bold text-[13.5px] rounded-full cursor-pointer transition-colors shadow-sm text-center border-none"
                    >
                      <span>Claim</span>
                    </button>
                  ) : (
                    <Badge color="amber" className="px-5 py-2 !rounded-full !h-auto font-bold text-[13.5px]">Claimed</Badge>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Column: Ecosystem Sidebar (1/3 width) */}
        <div className="lg:col-span-1 flex flex-col gap-5">
          {/* Subscribe to Newsletters */}
          <Card className="!bg-white border border-[var(--border-subtle)] p-5 rounded-xl shadow-sm flex flex-col gap-3">
            <div>
              <h3 className="text-[14.5px] font-bold text-[var(--text-primary)]">
                Subscribe to Our Newsletters
              </h3>
              <p className="text-[12.5px] text-[var(--text-muted)] mt-1 font-normal leading-relaxed">
                Stay updated with the latest credits, VC mixers, and startup news.
              </p>
            </div>
            {isSubscribed ? (
              <div className="bg-[#E4F1EC] text-[#1F8056] border border-[#A8D2BD] rounded-lg p-3 text-[12.5px] font-bold text-center animate-fadeIn">
                ✓ Thank you for subscribing!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full px-3 py-2 text-[13px] border border-[var(--border-subtle)] rounded-lg focus:outline-none focus:border-[#C8102E] bg-neutral-50 placeholder-neutral-400 font-normal text-neutral-800"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-[13px] rounded-lg transition-colors cursor-pointer text-center"
                >
                  Subscribe
                </button>
              </form>
            )}
          </Card>

          {/* Community Events */}
          <Card className="!bg-white border border-[var(--border-subtle)] p-5 rounded-xl shadow-sm flex flex-col gap-3.5">
            <div>
              <h3 className="text-[14.5px] font-bold text-[var(--text-primary)]">
                Community Events
              </h3>
              <p className="text-[12.5px] text-[var(--text-muted)] mt-1 font-normal leading-relaxed">
                Conducted by the Indian VC community.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <div className="border-b border-neutral-100 pb-3 last:border-b-0 last:pb-0">
                <div className="flex justify-between items-start gap-2">
                  <span className="text-[11px] font-bold text-[#2D5DA0] bg-[#E1ECF7] border border-[#B0C8E2] px-2 py-0.5 rounded">
                    Founder Mixer
                  </span>
                  <span className="text-[11.5px] font-bold text-neutral-900">Bangalore</span>
                </div>
                <h4 className="text-[13px] font-bold text-neutral-800 mt-1.5 hover:text-[#C8102E] cursor-pointer transition-colors">
                  Accel India Bangalore Mixer
                </h4>
                <p className="text-[11.5px] text-[var(--text-muted)] mt-1 font-normal">
                  June 12, 2026 • 6:30 PM
                </p>
              </div>

              <div className="border-b border-neutral-100 pb-3 last:border-b-0 last:pb-0">
                <div className="flex justify-between items-start gap-2">
                  <span className="text-[11px] font-bold text-[#1F8056] bg-[#E4F1EC] border border-[#A8D2BD] px-2 py-0.5 rounded">
                    Roundtable
                  </span>
                  <span className="text-[11.5px] font-bold text-neutral-900">Delhi NCR</span>
                </div>
                <h4 className="text-[13px] font-bold text-neutral-800 mt-1.5 hover:text-[#C8102E] cursor-pointer transition-colors">
                  Early-Stage SaaS Growth Panel
                </h4>
                <p className="text-[11.5px] text-[var(--text-muted)] mt-1 font-normal">
                  June 18, 2026 • 4:00 PM
                </p>
              </div>

              <div className="last:border-b-0 last:pb-0">
                <div className="flex justify-between items-start gap-2">
                  <span className="text-[11px] font-bold text-[#B27316] bg-[#F8EDD2] border border-[#E0C285] px-2 py-0.5 rounded">
                    Meetup
                  </span>
                  <span className="text-[11.5px] font-bold text-neutral-900">Mumbai</span>
                </div>
                <h4 className="text-[13px] font-bold text-neutral-800 mt-1.5 hover:text-[#C8102E] cursor-pointer transition-colors">
                  VC-Founder Speed Dating
                </h4>
                <p className="text-[11.5px] text-[var(--text-muted)] mt-1 font-normal">
                  June 25, 2026 • 3:00 PM
                </p>
              </div>
            </div>
          </Card>

          {/* Ecosystem News */}
          <Card className="!bg-white border border-[var(--border-subtle)] p-5 rounded-xl shadow-sm flex flex-col gap-3.5">
            <div>
              <h3 className="text-[14.5px] font-bold text-[var(--text-primary)]">
                Ecosystem News
              </h3>
              <p className="text-[12.5px] text-[var(--text-muted)] mt-1 font-normal leading-relaxed">
                Latest startup stories and funding highlights.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="group flex flex-col gap-1 text-[13px] border-b border-[#F0F0F0] pb-3 last:border-b-0 last:pb-0"
              >
                <span className="font-bold text-neutral-800 group-hover:text-[#C8102E] transition-colors leading-snug">
                  Indian Startups Raise $1.2 Billion In Q1 2026: Report
                </span>
                <span className="text-[11.5px] text-[var(--text-muted)] flex items-center gap-1.5 font-normal">
                  YourStory • 2 hours ago
                </span>
              </a>

              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="group flex flex-col gap-1 text-[13px] border-b border-[#F0F0F0] pb-3 last:border-b-0 last:pb-0"
              >
                <span className="font-bold text-neutral-800 group-hover:text-[#C8102E] transition-colors leading-snug">
                  New Regulatory Guidelines Announced For Early-Stage Venture Funds
                </span>
                <span className="text-[11.5px] text-[var(--text-muted)] flex items-center gap-1.5 font-normal">
                  TechCircle • 1 day ago
                </span>
              </a>

              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="group flex flex-col gap-1 text-[13px]"
              >
                <span className="font-bold text-neutral-800 group-hover:text-[#C8102E] transition-colors leading-snug">
                  SaaS Exports From India Projected To Reach $50 Billion By 2030
                </span>
                <span className="text-[11.5px] text-[var(--text-muted)] flex items-center gap-1.5 font-normal">
                  Inc42 • 2 days ago
                </span>
              </a>
            </div>
          </Card>
        </div>
      </div>

      {/* 4. Recommended Service Partners Section */}
      <div className="flex flex-col gap-4 animate-slideInUp stagger-3">
        <div>
          <h2 className="text-[16px] font-bold text-[var(--text-primary)]">
            Recommended Service Partners
          </h2>
          <p className="text-[13.5px] text-[var(--text-muted)] mt-1 font-normal leading-relaxed">
            Pre-vetted service providers and startup consultants trusted by Accel operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mockVendors.filter(v => v.vcTrusted).slice(0, 3).map((vendor) => (
            <Card
              key={vendor.id}
              onClick={() => onNavigate('vendors')}
              className="relative flex flex-col justify-between hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer border border-[var(--border-subtle)] bg-white rounded-xl p-5 h-full"
            >
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-start gap-2">
                  <CompanyLogo src={vendor.logoUrl} name={vendor.name} className="!w-12 !h-12 shrink-0 bg-white p-1 shadow-sm rounded-lg" />
                  <span className="inline-flex items-center px-1.5 py-0.5 text-[8.5px] font-bold border rounded bg-[#E4F1EC] text-[#1F8056] border-[#A8D2BD] gap-0.5 select-none shrink-0">
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" className="shrink-0">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="#10B981" />
                      <path d="m9 11 2 2 4-4" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>Verified</span>
                  </span>
                </div>
                <div className="mt-3">
                  <h3 className="text-[15px] font-extrabold text-neutral-900 leading-tight">
                    {vendor.name}
                  </h3>
                  <p className="text-[13px] text-neutral-600 mt-2 line-clamp-2 leading-relaxed font-normal">
                    {vendor.description}
                  </p>
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-3 border-t border-neutral-100 mt-3 shrink-0">
                <span className="text-[12.5px] font-bold text-neutral-500">
                  {vendor.category}
                </span>
                <span className="text-[12.5px] font-bold text-neutral-900 hover:text-[#C8102E] transition-colors">
                  View Profile →
                </span>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex justify-center mt-1">
          <button
            onClick={() => onNavigate('vendors')}
            className="px-6 py-2 bg-white hover:bg-neutral-50 border border-[var(--border-subtle)] hover:border-black text-black font-extrabold text-[12.5px] rounded-lg transition-colors cursor-pointer text-center shadow-sm"
          >
            Browse Full Partner Directory
          </button>
        </div>
      </div>

      {/* 5. Claimed Deals Ledger Table */}
      <div className="flex flex-col gap-4 animate-slideInUp mt-2">
        <div>
          <h2 className="text-[16px] font-bold text-[var(--text-primary)]">
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
                <th className="p-4 pl-6">Company</th>
                <th className="p-4">Value</th>
                <th className="p-4">Claimed Date</th>
                <th className="p-4 pr-6">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 font-medium text-[var(--text-primary)]">
              {claimedDeals.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-[var(--text-muted)] italic">
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
                          <CompanyLogo src={deal.logoUrl} name={deal.vendorName} className="!w-9 !h-9 p-0.5 bg-white rounded-lg shadow-sm" />
                          <span className="font-bold text-neutral-900 leading-none">{deal.vendorName}</span>
                        </div>
                      </td>
                      <td className="p-4 font-bold text-neutral-900">
                        {deal.value}
                      </td>
                      <td className="p-4 text-neutral-500 font-normal">
                        {deal.claimedDate || '—'}
                      </td>
                      <td className="p-4 pr-6">
                        {isClaimed && (
                          <span className="inline-flex px-2 py-0.5 text-[9.5px] font-extrabold border rounded bg-[#F8EDD2] text-[#B27316] border-[#E0C285]">
                            Awaiting Review
                          </span>
                        )}
                        {isApproved && (
                          <span className="inline-flex px-2 py-0.5 text-[9.5px] font-extrabold border rounded bg-[#E1ECF7] text-[#2D5DA0] border-[#B0C8E2]">
                            Approved
                          </span>
                        )}
                        {isActive && (
                          <span className="inline-flex px-2 py-0.5 text-[9.5px] font-extrabold border rounded bg-[#E4F1EC] text-[#1F8056] border-[#A8D2BD]">
                            ✓ Active
                          </span>
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
