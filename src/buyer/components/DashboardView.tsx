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
          Explore your claimed software benefit savings and claim new curated deals to extend your runway.
        </p>
      </div>

      {/* 2. KPI Section (Claimed Credits Banner Card) */}
      <div className="animate-slideInUp stagger-1">
        <Card className="!bg-white border border-[var(--border-subtle)] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm rounded-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#E4F1EC] text-[#1F8056] border border-[#A8D2BD] flex items-center justify-center shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/>
              </svg>
            </div>
            <div>
              <span className="text-[12px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
                Total Claimed Benefit Savings
              </span>
              <div className="text-3xl font-extrabold text-[var(--text-primary)] mt-1">
                ${startup.savingsTotal.toLocaleString()}
              </div>
            </div>
          </div>
          <div className="flex shrink-0">
            <span className="inline-flex items-center px-3 py-1 text-[11px] font-bold border rounded-full bg-[#E4F1EC] text-[#1F8056] border-[#A8D2BD]">
              {savingPercentage}% of available ecosystem pool redeemed
            </span>
          </div>
        </Card>
      </div>

      {/* 3. Main Dashboard Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start animate-slideInUp stagger-2">
        {/* Left Column: Claims & Deals features (2/3 width) */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          
          {/* Recommended Deals Section */}
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center flex-wrap gap-2 select-none">
              <h2 className="text-[16px] font-bold text-[var(--text-primary)]">
                Recommended Deals
              </h2>
              <button
                onClick={() => onNavigate('deals')}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-neutral-950 hover:bg-neutral-800 text-white rounded-full text-[11px] font-extrabold transition-all cursor-pointer shadow-sm border-none"
                title="Go to the Deals marketplace to view all deals"
              >
                <span>View All Deals</span>
                <svg className="w-3.5 h-3.5 shrink-0 animate-pulse" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {availableDeals.map((deal) => (
                <Card
                  key={deal.id}
                  onClick={() => onViewDeal(deal.id)}
                  className="relative flex flex-col sm:flex-row sm:items-center justify-between hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer border border-[var(--border-subtle)] bg-white rounded-xl p-6 gap-4 min-h-[120px]"
                >
                  {deal.isNew && (
                    <span className="absolute -top-1.5 -right-1.5 px-2.5 py-0.5 text-[10px] font-bold bg-[#D97706] text-white rounded-full shadow-sm select-none z-10">
                      New
                    </span>
                  )}
                  <div className="flex-1 flex gap-4 items-start">
                    <CompanyLogo src={deal.logoUrl} name={deal.vendorName} className="!w-14 !h-14 shrink-0 bg-white p-1 shadow-sm rounded-xl border border-neutral-100" />
                    <div className="min-w-0 mt-0.5">
                      <h3 className="text-[17px] font-extrabold text-neutral-900 leading-tight">
                        {deal.vendorName}
                      </h3>
                      <p className="text-[13.5px] text-neutral-600 mt-1.5 line-clamp-2 leading-relaxed font-normal">
                        {deal.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex sm:flex-col justify-between sm:justify-center items-center sm:items-end gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-neutral-100 shrink-0">
                    <span className="text-[16px] font-bold text-neutral-900 sm:text-right">
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
                        className="px-5 py-2 bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-[13.5px] rounded-full cursor-pointer transition-colors shadow-sm text-center border-none shrink-0"
                      >
                        <span>Claim</span>
                      </button>
                    ) : (
                      <Badge color="amber" className="px-5 py-2 !rounded-full !h-auto font-bold text-[13.5px] shrink-0">Claimed</Badge>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Trusted Partner Directory Section */}
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-[16px] font-bold text-[var(--text-primary)]">
                Trusted Partner Directory
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {mockVendors.filter(v => v.vcTrusted).slice(0, 3).map((vendor) => (
                <Card
                  key={vendor.id}
                  onClick={() => onNavigate('vendors')}
                  className="flex flex-col justify-between hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer border border-[var(--border-subtle)] bg-white rounded-xl p-5 h-full"
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-3 items-center">
                      <CompanyLogo src={vendor.logoUrl} name={vendor.name} className="!w-12 !h-12 shrink-0 bg-white p-1 shadow-sm rounded-lg border border-neutral-100" />
                      <div className="min-w-0">
                        <h4 className="text-[15px] font-extrabold text-neutral-900 leading-tight truncate">
                          {vendor.name}
                        </h4>
                        <span className="text-[12px] text-neutral-500 font-bold block mt-1">
                          {vendor.category}
                        </span>
                      </div>
                    </div>
                    <p className="text-[13px] text-neutral-650 line-clamp-2 leading-relaxed font-normal">
                      {vendor.description}
                    </p>
                  </div>
                  <div className="flex justify-end pt-2 mt-2 border-t border-neutral-100/50 shrink-0">
                    <span className="text-[12px] font-bold text-neutral-900 hover:text-black transition-colors">
                      View Profile →
                    </span>
                  </div>
                </Card>
              ))}
            </div>

            <div className="flex justify-center mt-1">
              <button
                onClick={() => onNavigate('vendors')}
                className="w-full py-2.5 bg-white hover:bg-neutral-50 border border-[var(--border-subtle)] hover:border-black text-black font-extrabold text-[12px] rounded-lg transition-colors cursor-pointer text-center shadow-sm"
              >
                Browse Full Directory
              </button>
            </div>
          </div>

          {/* Claimed Deals Ledger Table */}
          <div className="flex flex-col gap-4 mt-2">
            <div>
              <h2 className="text-[16px] font-bold text-[var(--text-primary)]">
                Claimed Benefits Ledger
              </h2>
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

        {/* Right Column: Ecosystem Sidebar (1/3 width) */}
        <div className="lg:col-span-1 flex flex-col gap-8">
          
          {/* Ecosystem News & Updates */}
          <Card className="!bg-white border border-[var(--border-subtle)] p-5 rounded-xl shadow-sm flex flex-col gap-4">
            <div>
              <h3 className="text-[15px] font-extrabold text-[var(--text-primary)]">
                Ecosystem News & Updates
              </h3>
            </div>

            {/* News List */}
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-extrabold text-neutral-450 uppercase tracking-wider select-none">Latest News</span>
              <div className="flex flex-col gap-2.5">
                <a href="#" onClick={(e) => e.preventDefault()} className="group flex flex-col gap-1 text-[12.5px]">
                  <span className="font-bold text-neutral-800 group-hover:text-black transition-colors leading-snug">
                    Indian Startups Raise $1.2 Billion In Q1 2026: Report
                  </span>
                  <span className="text-[11px] text-[var(--text-muted)] font-normal">YourStory • 2 hours ago</span>
                </a>
                <a href="#" onClick={(e) => e.preventDefault()} className="group flex flex-col gap-1 text-[12.5px] border-t border-neutral-100/50 pt-2.5">
                  <span className="font-bold text-neutral-800 group-hover:text-black transition-colors leading-snug">
                    New Regulatory Guidelines Announced For Venture Funds
                  </span>
                  <span className="text-[11px] text-[var(--text-muted)] font-normal">TechCircle • 1 day ago</span>
                </a>
              </div>
            </div>

            {/* Events List */}
            <div className="flex flex-col gap-3 border-t border-neutral-100/80 pt-4">
              <span className="text-[10px] font-extrabold text-neutral-400 uppercase tracking-wider select-none">Upcoming Events</span>
              <div className="flex flex-col gap-2.5">
                <div className="flex flex-col gap-1 text-[12.5px]">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[9.5px] font-bold text-[#2D5DA0] bg-[#E1ECF7] border border-[#B0C8E2] px-1.5 py-0.5 rounded">Mixer</span>
                    <span className="text-[11px] text-neutral-500 font-bold">Bangalore</span>
                  </div>
                  <h5 className="font-bold text-neutral-800 mt-1">Accel India Founder Mixer</h5>
                  <span className="text-[11px] text-[var(--text-muted)] font-normal">June 12, 2026 • 6:30 PM</span>
                </div>
                <div className="flex flex-col gap-1 text-[12.5px] border-t border-neutral-100/50 pt-2.5">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[9.5px] font-bold text-[#1F8056] bg-[#E4F1EC] border border-[#A8D2BD] px-1.5 py-0.5 rounded">Roundtable</span>
                    <span className="text-[11px] text-neutral-500 font-bold">Delhi NCR</span>
                  </div>
                  <h5 className="font-bold text-neutral-800 mt-1">Early-Stage SaaS Growth Panel</h5>
                  <span className="text-[11px] text-[var(--text-muted)] font-normal">June 18, 2026 • 4:00 PM</span>
                </div>
              </div>
            </div>

            {/* Newsletter subscription Form (Subscribe button after Ecosystem News) */}
            <div className="flex flex-col gap-3 border-t border-neutral-100/80 pt-4">
              <span className="text-[10px] font-extrabold text-neutral-455 uppercase tracking-wider select-none">Ecosystem Newsletter</span>
              {isSubscribed ? (
                <div className="bg-[#E4F1EC] text-[#1F8056] border border-[#A8D2BD] rounded-lg p-2.5 text-[12px] font-bold text-center animate-fadeIn">
                  ✓ Subscribed successfully!
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full px-3 py-2 text-[12px] border border-[var(--border-subtle)] rounded-lg focus:outline-none focus:border-black bg-neutral-50 placeholder-neutral-455 font-normal text-neutral-800"
                  />
                  <button
                    type="submit"
                    className="w-full py-2 bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-[12px] rounded-lg transition-colors cursor-pointer text-center border-none"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
