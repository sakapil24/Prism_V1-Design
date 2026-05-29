import * as React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter, Badge, SearchInput } from '../../design-system/components';
import { Deal, DealCategory } from '../types';
import { CompanyLogo } from './CompanyLogo';

interface DealsViewProps {
  deals: Deal[];
  onClaimDeal: (dealId: string, variationIndex?: number) => void;
  onAdminAdvanceStatus: (dealId: string) => void; // for prototyping stepper transitions
  initialSelectedDealId?: string | null;
  onClearFocusedDeal?: () => void;
}

export function DealsView({ deals, onClaimDeal, onAdminAdvanceStatus, initialSelectedDealId, onClearFocusedDeal }: DealsViewProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<DealCategory | 'All'>('All');
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');
  const [selectedDealId, setSelectedDealId] = React.useState<string | null>(null);
  const [filtersExpanded, setFiltersExpanded] = React.useState(false);
  const [searchExpanded, setSearchExpanded] = React.useState(false);
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (initialSelectedDealId) {
      setSelectedDealId(initialSelectedDealId);
      if (onClearFocusedDeal) {
        onClearFocusedDeal();
      }
    }
  }, [initialSelectedDealId]);

  const [selectedOptionIndex, setSelectedOptionIndex] = React.useState<number>(0);
  const [activeTab, setActiveTab] = React.useState<'overview' | 'usage' | 'redemption'>('overview');

  const selectedDeal = deals.find(d => d.id === selectedDealId);

  React.useEffect(() => {
    if (selectedDeal) {
      setSelectedOptionIndex(selectedDeal.selectedVariationIndex ?? 0);
      setActiveTab('overview'); // reset to overview on deal change
    }
  }, [selectedDealId, selectedDeal]);

  // Filter deals
  const filteredDeals = deals.filter(deal => {
    const matchesSearch =
      deal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deal.vendorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deal.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || deal.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (cat: DealCategory): "gray" | "blue" | "purple" | "cyan" => {
    switch (cat) {
      case 'SaaS': return 'blue';
      case 'Infrastructure': return 'purple';
      case 'Operations': return 'cyan';
      case 'Marketing': return 'gray';
      default: return 'gray';
    }
  };

  // Helper to get vendor console links
  const getConsoleLink = (vendorName: string): string => {
    switch (vendorName.toLowerCase().trim()) {
      case 'aws': return 'https://console.aws.amazon.com';
      case 'stripe': return 'https://dashboard.stripe.com';
      case 'notion': return 'https://notion.so';
      case 'retool': return 'https://retool.com';
      case 'slack': return 'https://slack.com/signin';
      case 'vercel': return 'https://vercel.com/dashboard';
      default: return `https://${vendorName.toLowerCase().replace(/\s+/g, '')}.com`;
    }
  };

  if (selectedDeal) {
    const activeValue = selectedDeal.variations && selectedDeal.variations[selectedOptionIndex]
      ? selectedDeal.variations[selectedOptionIndex].value
      : selectedDeal.value;

    return (
      <div className="flex-1 flex flex-col gap-6 py-2 animate-fadeIn font-sans select-none">
        {/* Global SVG gradients and filters for 3D shield */}
        <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
          <defs>
            <linearGradient id="shield3dGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <filter id="shadow3d" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodOpacity="0.15" />
            </filter>
          </defs>
        </svg>
        
        {/* Top bar with back navigation (No divider line below it) */}
        <div className="flex items-center justify-between gap-3 pb-1">
          <button
            onClick={() => setSelectedDealId(null)}
            className="flex items-center gap-1.5 text-[14px] font-bold text-[var(--text-muted)] hover:text-black cursor-pointer group transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transform group-hover:-translate-x-0.5 transition-transform"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back to Deals
          </button>
        </div>

        {/* Header Section (Minimal & Clean, Logo inline) */}
        <div className="flex flex-col gap-4 border-b border-neutral-200 pb-6">
          <div className="flex items-start gap-4">
            <CompanyLogo
              src={selectedDeal.logoUrl}
              name={selectedDeal.vendorName}
              size="lg"
              className="!w-14 !h-14 !rounded-xl border border-neutral-200 shrink-0 bg-white p-1"
            />
            <div className="min-w-0 flex-1">
              {/* Company Name & Inline Status Badge */}
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-[28px] font-black text-neutral-900 tracking-tight leading-none">
                  {selectedDeal.vendorName}
                </h1>
                <span className={`px-2.5 py-0.5 text-[11px] font-bold rounded uppercase tracking-wider ${
                  selectedDeal.status === 'available' ? 'bg-neutral-100 text-neutral-500 border border-neutral-200' :
                  selectedDeal.status === 'claimed' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                  selectedDeal.status === 'approved' ? 'bg-indigo-100 text-indigo-800 border border-indigo-200' :
                  'bg-emerald-100 text-emerald-800 border border-emerald-200'
                }`}>
                  {selectedDeal.status === 'available' ? 'Available' :
                   selectedDeal.status === 'claimed' ? 'Pending' :
                   selectedDeal.status === 'approved' ? 'Approved' : 'Active'}
                </span>
              </div>
              <p className="text-[14px] text-neutral-500 mt-2.5 leading-relaxed max-w-xl">
                {selectedDeal.description}
              </p>

              {/* Plain CTA button aligned right below the description */}
              <div className="mt-3.5 flex items-center gap-3">
                {selectedDeal.status === 'available' ? (
                  <button
                    onClick={() => setActiveTab('redemption')}
                    className="px-5 py-2 bg-[#C8102E] hover:bg-[#AE0E28] text-white font-bold text-[13px] rounded-lg cursor-pointer transition-all shadow-sm"
                  >
                    Claim Deal
                  </button>
                ) : (
                  <button
                    onClick={() => setActiveTab('redemption')}
                    className="px-5 py-2 bg-[#C8102E] hover:bg-[#AE0E28] text-white font-bold text-[13px] rounded-lg cursor-pointer transition-all shadow-sm"
                  >
                    Claim Status & Redemption
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tab switcher navigation: Segmented rounded control style */}
        <div className="flex p-1 bg-neutral-100 rounded-full select-none self-start border border-neutral-200 -mt-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-1.5 rounded-full text-[14px] font-bold cursor-pointer transition-all duration-150 ${
              activeTab === 'overview'
                ? 'bg-black text-white shadow-sm'
                : 'text-neutral-600 hover:text-black hover:bg-neutral-50/50'
            }`}
          >
            Overview & Trust
          </button>
          <button
            onClick={() => setActiveTab('usage')}
            className={`px-4 py-1.5 rounded-full text-[14px] font-bold cursor-pointer transition-all duration-150 ${
              activeTab === 'usage'
                ? 'bg-black text-white shadow-sm'
                : 'text-neutral-600 hover:text-black hover:bg-neutral-50/50'
            }`}
          >
            Usage Benefits
          </button>
          <button
            onClick={() => setActiveTab('redemption')}
            className={`px-4 py-1.5 rounded-full text-[14px] font-bold cursor-pointer transition-all duration-150 ${
              activeTab === 'redemption'
                ? 'bg-black text-white shadow-sm'
                : 'text-neutral-600 hover:text-black hover:bg-neutral-50/50'
            }`}
          >
            Redemption Process
          </button>
        </div>

        {/* Tab contents wrapper (Flat layouts - no cards!) */}
        <div className="py-2 animate-fadeIn">
          
          {/* TAB 1: OVERVIEW & TRUST */}
          {activeTab === 'overview' && (
            <div className="flex flex-col gap-6">
              {/* Product Overview & Eligibility */}
              <div className="flex flex-col gap-6">
                
                {/* Product Overview */}
                <div className="flex flex-col gap-2">
                  <h3 className="text-[14px] font-bold text-neutral-800 uppercase tracking-wider">Product Overview</h3>
                  <p className="text-[14px] text-neutral-600 leading-relaxed font-normal">
                    {selectedDeal.longDescription || selectedDeal.description}
                  </p>
                </div>

                {/* Eligibility criteria */}
                <div className="flex flex-col gap-2 pt-4 border-t border-neutral-100">
                  <h3 className="text-[14px] font-bold text-neutral-800 uppercase tracking-wider">Eligibility Requirements</h3>
                  <p className="text-[14px] text-neutral-600 leading-relaxed pl-1 font-normal">
                    {selectedDeal.eligibilityCriteria}
                  </p>
                </div>

                {/* Deal Details Card */}
                <div className="p-5 bg-neutral-50/50 border border-neutral-200/80 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 mt-2 animate-fadeIn">
                  <div className="flex-1 flex flex-col gap-4">
                    <span className="text-[12px] font-bold text-neutral-450 uppercase tracking-wider block">Deal Details</span>
                    <div className="flex flex-wrap items-start gap-8">
                      <div>
                        <span className="text-[12px] font-semibold text-neutral-450 block mb-1">Category</span>
                        <Badge color={getCategoryColor(selectedDeal.category)} className="font-bold">{selectedDeal.category}</Badge>
                      </div>
                      <div>
                        <span className="text-[12px] font-semibold text-neutral-450 block mb-1">Offer Value</span>
                        <span className="text-[20px] font-black text-neutral-900 leading-none">{activeValue}</span>
                        {/* Mini Accel Trust icon & text below value */}
                        <div className="flex items-center gap-1.5 mt-1.5">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0 drop-shadow-sm">
                            <g filter="url(#shadow3d)">
                              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="url(#shield3dGrad)" />
                              <path d="m9 11 2 2 4-4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            </g>
                          </svg>
                          <span className="text-[12px] font-bold text-emerald-700">Accel Vetted Benefit</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0 self-start md:self-center">
                    {selectedDeal.status === 'available' ? (
                      <button
                        onClick={() => setActiveTab('redemption')}
                        className="px-5 py-2 bg-[#C8102E] hover:bg-[#AE0E28] text-white font-bold text-[13px] rounded-lg cursor-pointer transition-all shadow-sm"
                      >
                        Claim Deal
                      </button>
                    ) : (
                      <button
                        onClick={() => setActiveTab('redemption')}
                        className="px-5 py-2 bg-[#C8102E] hover:bg-[#AE0E28] text-white font-bold text-[13px] rounded-lg cursor-pointer transition-all shadow-sm"
                      >
                        Claim Status & Redemption
                      </button>
                    )}
                  </div>
                </div>

              </div>

              {/* Consolidated Accel Trust Shield & Testimonials (Directly below eligibility) */}
              <div className="border-t border-neutral-100 pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Consolidated Accel Trust Badge - Airbnb style but with 3D Trust Shield Icon */}
                <div className="p-5 bg-neutral-50/50 border border-neutral-200/80 rounded-2xl flex items-start gap-4">
                  {/* Layered 3D-like checkmark shield SVG with Gradients and Shadow */}
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="shrink-0 drop-shadow-md">
                    <g filter="url(#shadow3d)">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="url(#shield3dGrad)" />
                      <path d="m9 11 2 2 4-4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </g>
                  </svg>
                  <div className="flex-1">
                    <h4 className="text-[14px] font-bold text-neutral-900">Accel Trust</h4>
                    <p className="text-[12.5px] text-neutral-500 mt-1 leading-normal font-normal">
                      Pre-vetted and highly recommended deal within the Accel India network. Guaranteed 48-hour approval response or direct relationship manager assistance.
                    </p>
                  </div>
                </div>

                {/* Consolidated Testimonials (Founders Feedback) */}
                <div className="p-5 bg-neutral-50/50 border border-neutral-200/80 rounded-2xl flex flex-col gap-3">
                  <span className="text-[11px] font-bold text-neutral-450 uppercase tracking-wider block">Founders Feedback</span>
                  <div className="relative pl-3.5 border-l-2 border-neutral-300 py-0.5 flex flex-col gap-0.5">
                    <p className="text-[12.5px] italic text-neutral-600 leading-normal font-normal">
                      "Credits allowed us to scale our MVP with zero compute burn. The pre-authorized code applied instantly in less than 24 hours."
                    </p>
                    <span className="block text-[11px] font-bold text-neutral-800 mt-1">
                      — Rohan S., CTO of Aurelia Health
                    </span>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 2: FOUNDER BENEFITS & USAGE EXAMPLES */}
          {activeTab === 'usage' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Column: Use Cases */}
              <div className="lg:col-span-2 flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <h3 className="text-[14px] font-bold text-neutral-800 uppercase tracking-wider">How founders benefit from {selectedDeal.vendorName}</h3>
                  <p className="text-[14px] text-neutral-650 leading-relaxed font-normal">
                    This credit maximizes your startup runway by offsetting key early-stage infrastructure or subscription operational expenses. Here is how founders typically leverage this resource:
                  </p>
                </div>

                <div className="flex flex-col gap-4 pt-2 border-t border-neutral-100">
                  <h4 className="text-[14px] font-bold text-neutral-900">Key Usage Scenarios:</h4>
                  
                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-neutral-100 flex items-center justify-center shrink-0 text-[11px] font-bold text-neutral-800 mt-0.5">1</div>
                    <div>
                      <span className="block text-[13.5px] font-bold text-neutral-800">MVP Sandbox & Rapid Prototyping</span>
                      <span className="block text-[13px] text-neutral-500 mt-0.5 leading-normal font-normal">
                        Spin up database clusters, API hosting servers, and serverless computing workflows to test product concepts with zero burn.
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-1">
                    <div className="w-6 h-6 rounded-full bg-neutral-100 flex items-center justify-center shrink-0 text-[11px] font-bold text-neutral-800 mt-0.5">2</div>
                    <div>
                      <span className="block text-[13.5px] font-bold text-neutral-800">Scaling Production Clusters</span>
                      <span className="block text-[13px] text-neutral-500 mt-0.5 leading-normal font-normal">
                        Utilize higher bandwidth servers, redundant database replicas, and global CDNs to ensure uptime and speed as active users grow.
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-1">
                    <div className="w-6 h-6 rounded-full bg-neutral-100 flex items-center justify-center shrink-0 text-[11px] font-bold text-neutral-800 mt-0.5">3</div>
                    <div>
                      <span className="block text-[13.5px] font-bold text-neutral-800">Team Workflows & Collaboration</span>
                      <span className="block text-[13px] text-neutral-500 mt-0.5 leading-normal font-normal">
                        Consolidate engineering documentation, customer feedback pipelines, task management tracking, and messaging seats under one credit plan.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar Column: Quick Stats */}
              <div className="flex flex-col gap-6 lg:border-l lg:border-neutral-200 lg:pl-8">
                <div>
                  <span className="text-[11px] font-bold text-neutral-450 uppercase tracking-wider block mb-3">Startup Resource Impact</span>
                  <div className="flex flex-col gap-4 text-[13px]">
                    <div className="pb-3 border-b border-neutral-100">
                      <span className="text-[20px] font-black text-black block">12 Months</span>
                      <span className="text-neutral-500 block mt-0.5">Average validation duration for credit utilization.</span>
                    </div>
                    <div className="pb-3 border-b border-neutral-100">
                      <span className="text-[20px] font-black text-black block">Pre-authorized</span>
                      <span className="text-neutral-500 block mt-0.5">Automatic VC billing sync. No personal credit card holds required for checkoff.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: REDEMPTION PROCESS (4 STEPS WITH SPECIFIC CTA BUTTONS & SELECTOR IN STEP 1) */}
          {activeTab === 'redemption' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Column: 4 Stepper Steps with individual CTA buttons */}
              <div className="lg:col-span-2 flex flex-col gap-6 relative pl-3.5">
                {/* Timeline connector line */}
                <div className="absolute top-4 bottom-4 left-[27px] w-0.5 bg-neutral-200" />

                {/* Step 1: Claim Offer & Show Options */}
                <div className="flex gap-4 relative z-10">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border text-[12px] font-bold ${
                    selectedDeal.status !== 'available'
                      ? 'bg-black border-black text-white'
                      : 'bg-white border-neutral-300 text-neutral-600'
                  }`}>
                    {selectedDeal.status !== 'available' ? '✓' : '1'}
                  </div>
                  <div className="flex-1 pt-0.5 pb-2">
                    <span className="block text-[14px] font-bold text-neutral-900">Step 1: Submit Claim Request & Choose Package</span>
                    <span className="block text-[13px] text-neutral-550 mt-1 leading-normal font-normal">
                      Below are the available packages for this product. You can review details and claim your preferred option directly:
                    </span>

                    {/* Deal Variations selector positioned inside Step 1 (Show details for both, no radio selection bubble, direct CTA per option) */}
                    {selectedDeal.variations && selectedDeal.variations.length > 0 ? (
                      <div className="flex flex-col gap-3 py-2 mt-2 max-w-xl">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-1">
                          {selectedDeal.variations.map((variant, idx) => {
                            const isSelected = selectedOptionIndex === idx;
                            const isClaimed = selectedDeal.status !== 'available';
                            return (
                              <div
                                key={variant.id}
                                className={`flex flex-col p-4 rounded-xl border transition-all bg-white ${
                                  isClaimed && isSelected
                                    ? 'border-emerald-500 bg-emerald-50/10'
                                    : 'border-neutral-200'
                                }`}
                              >
                                <span className="font-bold text-neutral-900 text-[13.5px] leading-snug">{variant.title}</span>
                                <span className="text-[12px] text-neutral-500 mt-1 leading-snug flex-1 font-normal">{variant.description}</span>
                                <span className="text-[12.5px] font-extrabold text-neutral-850 mt-2 block">Value: {variant.value}</span>
                                
                                <div className="mt-3">
                                  {selectedDeal.status === 'available' ? (
                                    <button
                                      onClick={() => onClaimDeal(selectedDeal.id, idx)}
                                      className="w-full text-center py-1.5 border border-neutral-300 hover:border-black rounded text-[11.5px] font-bold text-neutral-700 hover:text-black cursor-pointer transition-colors"
                                    >
                                      Claim Option
                                    </button>
                                  ) : isSelected ? (
                                    <span className="w-full text-center py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded text-[11px] font-bold uppercase tracking-wider block">
                                      Claimed Offer ✓
                                    </span>
                                  ) : (
                                    <span className="w-full text-center py-1 bg-neutral-50 text-neutral-450 border border-neutral-200 rounded text-[11px] font-medium block">
                                      Unavailable
                                    </span>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <div className="mt-3">
                        {selectedDeal.status === 'available' ? (
                          <button
                            onClick={() => onClaimDeal(selectedDeal.id)}
                            className="px-4 py-2 bg-black hover:bg-neutral-800 text-white font-bold text-[12px] rounded cursor-pointer transition-colors shadow-sm"
                          >
                            Claim Voucher
                          </button>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[12px] font-bold text-neutral-500">
                            Voucher Claimed ✓
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Step 2: Accel Verification */}
                <div className="flex gap-4 relative z-10">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border text-[12px] font-bold ${
                    selectedDeal.status === 'approved' || selectedDeal.status === 'active'
                      ? 'bg-black border-black text-white'
                      : 'bg-white border-neutral-300 text-neutral-600'
                  }`}>
                    {selectedDeal.status === 'approved' || selectedDeal.status === 'active' ? '✓' : '2'}
                  </div>
                  <div className="flex-1 pt-0.5 pb-2">
                    <span className="block text-[14px] font-bold text-neutral-900">Step 2: VC Relationship Manager Approval</span>
                    <span className="block text-[13px] text-neutral-550 mt-1 leading-normal font-normal">
                      Your VC relationship manager reviews your active portfolio standing and pre-approves the voucher.
                    </span>

                    <div className="mt-3">
                      {selectedDeal.status === 'claimed' ? (
                        <button
                          onClick={() => onAdminAdvanceStatus(selectedDeal.id)}
                          className="px-4 py-2 bg-black hover:bg-neutral-800 text-white font-bold text-[12px] rounded cursor-pointer transition-colors shadow-sm"
                        >
                          Simulate VC Approval
                        </button>
                      ) : selectedDeal.status === 'approved' || selectedDeal.status === 'active' ? (
                        <span className="inline-flex items-center gap-1 text-[12px] font-bold text-neutral-500">
                          Approved by Accel ✓
                        </span>
                      ) : (
                        <span className="text-[12px] text-neutral-400 italic font-normal">Awaiting claim submission...</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Step 3: Apply Code */}
                <div className="flex gap-4 relative z-10">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border text-[12px] font-bold ${
                    selectedDeal.status === 'active'
                      ? 'bg-black border-black text-white'
                      : 'bg-white border-neutral-300 text-neutral-600'
                  }`}>
                    {selectedDeal.status === 'active' ? '✓' : '3'}
                  </div>
                  <div className="flex-1 pt-0.5 pb-2">
                    <span className="block text-[14px] font-bold text-neutral-900">Step 3: Copy and Apply Coupon Code</span>
                    <span className="block text-[13px] text-neutral-550 mt-1 leading-normal font-normal">
                      Once approved, copy your unique voucher code and apply it to the billing credits dashboard of the vendor portal.
                    </span>

                    {(selectedDeal.status === 'approved' || selectedDeal.status === 'active') && selectedDeal.claimCode && (
                      <div className="mt-2.5 p-3 bg-neutral-50 border border-neutral-200 rounded-lg inline-flex items-center gap-3">
                        <span className="text-[11px] text-neutral-500 font-bold uppercase tracking-wider">Voucher:</span>
                        <code className="font-mono text-[13px] font-bold bg-white px-2 py-0.5 rounded border border-neutral-200">
                          {selectedDeal.claimCode}
                        </code>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(selectedDeal.claimCode || '');
                            alert('Voucher code copied to clipboard!');
                          }}
                          className="text-[12px] font-bold text-neutral-600 hover:text-black cursor-pointer underline"
                        >
                          Copy
                        </button>
                      </div>
                    )}

                    <div className="mt-3">
                      {selectedDeal.status === 'approved' ? (
                        <button
                          onClick={() => onAdminAdvanceStatus(selectedDeal.id)}
                          className="px-4 py-2 bg-black hover:bg-neutral-800 text-white font-bold text-[12px] rounded cursor-pointer transition-colors shadow-sm"
                        >
                          Activate Credits
                        </button>
                      ) : selectedDeal.status === 'active' ? (
                        <span className="inline-flex items-center gap-1 text-[12px] font-bold text-neutral-500">
                          Credits Applied & Active ✓
                        </span>
                      ) : (
                        <span className="text-[12px] text-neutral-400 italic font-normal">Awaiting VC approval...</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Step 4: Launch Console */}
                <div className="flex gap-4 relative z-10">
                  <div className="w-8 h-8 rounded-full bg-white border border-neutral-300 text-neutral-600 flex items-center justify-center shrink-0 text-[12px] font-bold">
                    4
                  </div>
                  <div className="flex-1 pt-0.5">
                    <span className="block text-[14px] font-bold text-neutral-900">Step 4: Launch Console</span>
                    <span className="block text-[13px] text-neutral-550 mt-1 leading-normal font-normal">
                      Open your vendor developer console and start building using your applied credits.
                    </span>

                    <div className="mt-3">
                      <a
                        href={getConsoleLink(selectedDeal.vendorName)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 hover:text-black border border-neutral-300 rounded font-bold text-[12px] cursor-pointer transition-colors shadow-sm"
                      >
                        Open Console
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="shrink-0"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                      </a>
                    </div>
                  </div>
                </div>

              </div>

              {/* Sidebar Column: Resources & Support */}
              <div className="flex flex-col gap-6 lg:border-l lg:border-neutral-200 lg:pl-8">
                <div className="flex flex-col gap-4">
                  <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">Help & Resources</span>
                  
                  <div className="flex flex-col gap-3">
                    <a
                      href={`https://support.${selectedDeal.vendorName.toLowerCase().replace(/\s+/g, '')}.com`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between text-[13px] font-bold text-neutral-800 hover:text-black group border-b border-neutral-100 pb-2"
                    >
                      <span>Visit Support Center</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-400 group-hover:translate-x-0.5 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    </a>

                    <div className="text-[12px] text-neutral-500 leading-normal flex flex-col gap-1 border-b border-neutral-100 pb-2">
                      <span className="font-semibold text-neutral-700">Direct Support Contact:</span>
                      <a href={`mailto:accel-network@${selectedDeal.vendorName.toLowerCase().replace(/\s+/g, '')}.com`} className="text-black hover:underline font-bold">
                        accel-network@{selectedDeal.vendorName.toLowerCase().replace(/\s+/g, '')}.com
                      </a>
                    </div>

                    <div className="text-[12px] text-neutral-400 flex flex-col gap-1 leading-normal font-normal">
                      <span className="font-semibold text-neutral-600">Download Documentation:</span>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-400"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/></svg>
                        <span className="text-neutral-500 font-medium">Redemption_Guide.pdf</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col gap-5 py-2">
      {/* Global SVG gradients and filters for 3D shield */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <linearGradient id="shield3dGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <filter id="shadow3d" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodOpacity="0.15" />
          </filter>
        </defs>
      </svg>

      {/* Page Header */}
      <div>
        <h1 className="text-[24px] font-bold text-[var(--text-primary)]">Deals Marketplace</h1>
        <p className="text-[14px] text-[var(--text-muted)] mt-1">
          Exclusive credits and discounts for Accel portfolio startups. Claim vouchers and activate integrations.
        </p>
      </div>

      {/* Toolbar controls */}
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-[var(--border-subtle)] animate-fadeIn">
        {/* Left Side: Count of deals */}
        <div className="text-[14px] text-[var(--text-muted)] select-none">
          Showing <span className="font-semibold text-[var(--text-primary)]">{filteredDeals.length}</span> credits
        </div>

        {/* Right Side: Actions (Search, Filters, View Toggles) */}
        <div className="flex items-center gap-2">
          {/* Expandable Search */}
          <div className="relative flex items-center">
            <div
              className={`transition-all duration-300 ease-in-out ${
                searchExpanded || searchQuery
                  ? 'w-48 md:w-64 opacity-100'
                  : 'w-0 opacity-0 pointer-events-none'
              }`}
            >
              <SearchInput
                ref={searchInputRef}
                size="lg"
                placeholder="Search credits..."
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                onClear={() => {
                  setSearchQuery('');
                  setSearchExpanded(false);
                }}
                onBlur={() => {
                  if (!searchQuery) setSearchExpanded(false);
                }}
              />
            </div>
            {!searchExpanded && !searchQuery && (
              <button
                onClick={() => {
                  setSearchExpanded(true);
                  setTimeout(() => searchInputRef.current?.focus(), 100);
                }}
                className="flex items-center justify-center w-10 h-10 bg-white border border-[var(--border-subtle)] hover:bg-[var(--surface-hover)] rounded-[var(--radius-lg)] cursor-pointer text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                title="Search"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </button>
            )}
          </div>

          {/* Filters Toggle (Icon Only) */}
          <button
            onClick={() => setFiltersExpanded(!filtersExpanded)}
            className={`flex items-center justify-center w-10 h-10 border rounded-[var(--radius-lg)] cursor-pointer transition-all duration-150 shrink-0 ${
              filtersExpanded
                ? 'bg-black text-white border-black'
                : 'bg-white text-[var(--text-secondary)] border-[var(--border-subtle)] hover:bg-[var(--surface-hover)]'
            }`}
            title="Toggle filters"
            aria-label="Toggle filters"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0"
            >
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
          </button>

          {/* View mode toggle */}
          <div className="flex items-center gap-1 p-1 bg-[var(--surface-secondary)] border border-[var(--border-subtle)] rounded-[var(--radius-lg)]">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-[8px] cursor-pointer transition-all duration-150 ${
                viewMode === 'grid'
                  ? 'bg-black text-white shadow-sm'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
              title="Grid view"
              aria-label="Grid view"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                <rect width="7" height="7" x="3" y="3" rx="1" />
                <rect width="7" height="7" x="14" y="3" rx="1" />
                <rect width="7" height="7" x="14" y="14" rx="1" />
                <rect width="7" height="7" x="3" y="14" rx="1" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-[8px] cursor-pointer transition-all duration-150 ${
                viewMode === 'list'
                  ? 'bg-black text-white shadow-sm'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
              title="List view"
              aria-label="List view"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                <line x1="8" x2="21" y1="6" y2="6" />
                <line x1="8" x2="21" y1="12" y2="12" />
                <line x1="8" x2="21" y1="18" y2="18" />
                <line x1="3" x2="3.01" y1="6" y2="6" />
                <line x1="3" x2="3.01" y1="12" y2="12" />
                <line x1="3" x2="3.01" y1="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Category filters */}
      {filtersExpanded && (
        <div className="flex gap-2 overflow-x-auto pb-1.5 scrollbar-thin animate-slideDown">
          {(['All', 'SaaS', 'Infrastructure', 'Operations', 'Marketing'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-[14px] font-bold rounded-full border cursor-pointer whitespace-nowrap transition-all duration-150 ${
                selectedCategory === cat
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-[var(--text-secondary)] border-[var(--border-subtle)] hover:bg-[var(--surface-hover)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Grid or List list of deals */}
      {filteredDeals.length === 0 ? (
        <Card className="p-10 text-center text-[var(--text-muted)] animate-scaleIn">
          <p className="text-sm">No deals matches your filter criteria.</p>
        </Card>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-slideInUp stagger-1">
          {filteredDeals.map((deal) => (
            <Card
              key={deal.id}
              onClick={() => setSelectedDealId(deal.id)}
              className="flex flex-col justify-between hover:shadow-[var(--shadow-md)] hover:-translate-y-0.5 transition-all cursor-pointer border border-[var(--border-subtle)] bg-white rounded-[12px] p-3"
            >
              {/* Card Body */}
              <div className="flex-1 flex flex-col gap-3">
                <div className="flex justify-between items-start gap-2">
                  <CompanyLogo src={deal.logoUrl} name={deal.vendorName} size="lg" />
                  <Badge color={getCategoryColor(deal.category)}>{deal.category}</Badge>
                </div>
                <div>
                  <h3 className="text-[14px] font-bold text-[var(--text-primary)] leading-snug">
                    {deal.vendorName}
                  </h3>
                  <p className="text-[14px] font-semibold text-[var(--text-muted)] mt-0.5 truncate">
                    {deal.title}
                  </p>
                  <p className="text-[14px] text-[var(--text-muted)] mt-1.5 line-clamp-2 leading-relaxed">
                    {deal.description}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="flex justify-between items-center pt-3 border-t border-neutral-100 mt-3 shrink-0">
                <span className="text-[14px] font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                  <span>{deal.variations && deal.variations.length > 1 ? `Up to ${deal.value}` : deal.value}</span>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="shrink-0 drop-shadow-sm inline-block">
                    <g filter="url(#shadow3d)">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="url(#shield3dGrad)" />
                      <path d="m9 11 2 2 4-4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </g>
                  </svg>
                </span>

                {deal.status === 'available' ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onClaimDeal(deal.id);
                    }}
                    className="px-3 py-1 bg-[#C8102E] hover:bg-[#AE0E28] text-white font-bold text-[12px] rounded cursor-pointer transition-colors shadow-sm"
                  >
                    Claim Deal
                  </button>
                ) : (
                  <div>
                    {(deal.status === 'claimed' || deal.status === 'approved') && (
                      <Badge color="amber">Claimed</Badge>
                    )}
                    {deal.status === 'active' && (
                      <Badge color="green">Active</Badge>
                    )}
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-2.5 animate-slideInUp stagger-1">
          {filteredDeals.map((deal) => (
            <div
              key={deal.id}
              onClick={() => setSelectedDealId(deal.id)}
              className="flex items-center justify-between p-3 border border-[var(--border-subtle)] hover:border-black rounded-[12px] bg-white hover:shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all cursor-pointer"
            >
              {/* Column 1: Logo + Vendor Name & Category */}
              <div className="w-1/4 min-w-[180px] flex items-center gap-3 shrink-0">
                <CompanyLogo src={deal.logoUrl} name={deal.vendorName} size="sm" />
                <div className="min-w-0">
                  <h3 className="text-[14px] font-bold text-[var(--text-primary)] truncate">
                    {deal.vendorName}
                  </h3>
                  <div className="mt-0.5">
                    <Badge color={getCategoryColor(deal.category)} className="h-4 text-[11px] px-1.5 font-bold uppercase tracking-wider">{deal.category}</Badge>
                  </div>
                </div>
              </div>

              {/* Column 2: Title & Description */}
              <div className="flex-1 min-w-0 px-4">
                <p className="text-[14px] text-[var(--text-primary)] font-bold truncate">
                  {deal.title}
                </p>
                <p className="text-[14px] text-[var(--text-muted)] line-clamp-1 mt-0.5">
                  {deal.description}
                </p>
              </div>

              {/* Column 3: Value */}
              <div className="w-32 shrink-0 text-left font-bold text-[var(--text-primary)] text-[14px] px-2 flex items-center gap-1.5">
                <span>{deal.variations && deal.variations.length > 1 ? `Up to ${deal.value}` : deal.value}</span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="shrink-0 drop-shadow-sm inline-block">
                  <g filter="url(#shadow3d)">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="url(#shield3dGrad)" />
                    <path d="m9 11 2 2 4-4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </g>
                </svg>
              </div>

              {/* Column 4: Status Badge + Chevron Arrow */}
              <div className="w-36 shrink-0 flex items-center justify-between pl-2">
                <div>
                  {deal.status === 'available' ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onClaimDeal(deal.id);
                      }}
                      className="px-3 py-1 bg-[#C8102E] hover:bg-[#AE0E28] text-white font-bold text-[12px] rounded cursor-pointer transition-colors shadow-sm"
                    >
                      Claim Deal
                    </button>
                  ) : (
                    <div>
                      {(deal.status === 'claimed' || deal.status === 'approved') && (
                        <Badge color="amber">Claimed</Badge>
                      )}
                      {deal.status === 'active' && (
                        <Badge color="green">Active</Badge>
                      )}
                    </div>
                  )}
                </div>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-neutral-400 group-hover:text-black transition-colors mr-1"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
