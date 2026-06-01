import * as React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter, Badge, SearchInput, Modal, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalBody, ModalFooter } from '../../design-system/components';
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

  const getClaimButtonText = (deal: Deal): string => {
    switch (deal.id) {
      case 'deal-aws': return 'Get $5,000 credits';
      case 'deal-stripe': return 'Get a $20,000 fee waiver';
      case 'deal-notion': return 'Get $1,000 credits';
      case 'deal-retool': return 'Get $1,200 credits';
      case 'deal-slack': return 'Get a $500 discount';
      case 'deal-vercel': return 'Get $1,000 credits';
      case 'deal-hubspot': return 'Get 90% off';
      case 'deal-google-workspace': return 'Get 1 year free';
      case 'deal-chatprd': return 'Get $180 value';
      case 'deal-factory': return 'Get $240 value';
      case 'deal-framer': return 'Get $360 value';
      case 'deal-granola': return 'Get $1,680 value';
      case 'deal-gumloop': return 'Get $444 value';
      case 'deal-intercom': return 'Get $7,140 value';
      default: return `Get ${deal.value}`;
    }
  };

  const selectedDeal = deals.find(d => d.id === selectedDealId);

  // Sandbox integration states
  const [sandboxStatus, setSandboxStatus] = React.useState<'idle' | 'building' | 'complete'>('idle');
  const [sandboxLogs, setSandboxLogs] = React.useState<string[]>([]);
  const [sandboxProgress, setSandboxProgress] = React.useState<number>(0);
  const [showSandboxModal, setShowSandboxModal] = React.useState<boolean>(false);

  const runSandboxBuild = (deal: Deal) => {
    if (sandboxStatus === 'building') return;

    setSandboxStatus('building');
    setSandboxProgress(0);
    setSandboxLogs(['$ prism-cli init --deal=' + deal.vendorName.toLowerCase()]);

    const logsList = [
      'Connecting to Accel portfolio package registry...',
      'Downloading SDK: @prism-sdk/' + deal.vendorName.toLowerCase().replace(/\s+/g, '') + '@1.2.4',
      'Configuring developer environment for startup: Aurelia Health',
      'Linking partner authorization keys...',
      'Verifying voucher code: ' + (deal.claimCode || 'PRISM-' + deal.vendorName.toUpperCase() + '-MOCK'),
      'Linking billing endpoints to ' + deal.vendorName + ' console...',
      'Compiling configuration bundle...'
    ];

    let currentLogIndex = 0;
    let progressVal = 0;

    const interval = setInterval(() => {
      progressVal += 10;
      if (progressVal > 100) {
        progressVal = 100;
      }
      setSandboxProgress(progressVal);

      if (currentLogIndex < logsList.length) {
        setSandboxLogs(prev => [...prev, logsList[currentLogIndex]]);
        currentLogIndex++;
      }

      if (progressVal === 100) {
        clearInterval(interval);
        setSandboxLogs(prev => [
          ...prev, 
          '[success] Build completed successfully!', 
          '[success] Config generated: prism.config.json'
        ]);
        setSandboxStatus('complete');
        setTimeout(() => {
          setShowSandboxModal(true);
        }, 600);
      }
    }, 450);
  };

  React.useEffect(() => {
    if (selectedDeal) {
      setSelectedOptionIndex(selectedDeal.selectedVariationIndex ?? 0);
      setActiveTab('overview'); // reset to overview on deal change
      setSandboxStatus('idle');
      setSandboxLogs([]);
      setSandboxProgress(0);
      setShowSandboxModal(false);
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
      <div className="flex-1 flex flex-col gap-6 py-2 animate-fadeIn font-sans select-none max-w-6xl mx-auto w-full">
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
        
        {/* Back navigation */}
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

        {/* Premium Visual Summary Hero Card */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-neutral-900 via-neutral-950 to-black text-white p-6 shadow-lg border border-neutral-800 flex flex-col md:flex-row md:items-center justify-between gap-6 animate-scaleIn">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(200,16,46,0.18),transparent_50%)] pointer-events-none" />
          
          <div className="flex items-center gap-5 relative z-10">
            <CompanyLogo
              src={selectedDeal.logoUrl}
              name={selectedDeal.vendorName}
              size="lg"
              className="!w-16 !h-16 !rounded-2xl border border-neutral-800 shrink-0 bg-white p-1.5 shadow-sm"
            />
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="text-[12px] font-extrabold tracking-widest text-neutral-400 uppercase bg-neutral-800 px-2.5 py-0.5 rounded border border-neutral-700">
                  {selectedDeal.category}
                </span>
                {selectedDeal.isNew && (
                  <span className="px-2.5 py-0.5 text-[10px] font-extrabold bg-[#D97706] text-white rounded-full uppercase tracking-wider shadow-sm select-none">
                    New
                  </span>
                )}
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white mt-2 leading-none">
                {selectedDeal.vendorName}
              </h1>
              {/* Short summary of the deal */}
              <p className="text-[14px] font-semibold text-neutral-300 mt-2.5">
                {selectedDeal.title} — Claim exclusive startup pricing
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0 relative z-10">
            {/* Link to deal details - not copy pasted details! */}
            {selectedDeal.programDetailsUrl && (
              <a
                href={selectedDeal.programDetailsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 text-[13px] font-bold text-neutral-450 hover:text-white transition-colors"
              >
                <span>View Program Details</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="shrink-0"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </a>
            )}

            {selectedDeal.status === 'available' ? (
              <button
                onClick={() => onClaimDeal(selectedDeal.id)}
                className="px-6 py-2.5 bg-[#C8102E] hover:bg-[#AE0E28] text-white font-extrabold text-[14px] rounded-full cursor-pointer transition-colors shadow-md flex items-center justify-center gap-1.5"
              >
                <span>Claim Benefit</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="shrink-0"><path d="m9 18 6-6-6-6"/></svg>
              </button>
            ) : (
              <Badge color="amber" className="px-6 py-2.5 !rounded-full !h-auto font-extrabold text-[14px] flex items-center justify-center gap-1 shadow-sm select-none">
                <span>Voucher Claimed ✓</span>
              </Badge>
            )}
          </div>
        </div>

        {/* Tab switcher navigation: Segmented rounded control style */}
        <div className="flex p-1 bg-neutral-100 rounded-full select-none self-start border border-neutral-200">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-5 py-1.5 rounded-full text-[14px] font-bold cursor-pointer transition-all duration-150 ${
              activeTab === 'overview'
                ? 'bg-black text-white shadow-sm'
                : 'text-neutral-600 hover:text-black hover:bg-neutral-50/50'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('usage')}
            className={`px-5 py-1.5 rounded-full text-[14px] font-bold cursor-pointer transition-all duration-150 ${
              activeTab === 'usage'
                ? 'bg-black text-white shadow-sm'
                : 'text-neutral-600 hover:text-black hover:bg-neutral-50/50'
            }`}
          >
            Benefits
          </button>
          <button
            onClick={() => setActiveTab('redemption')}
            className={`px-5 py-1.5 rounded-full text-[14px] font-bold cursor-pointer transition-all duration-150 ${
              activeTab === 'redemption'
                ? 'bg-black text-white shadow-sm'
                : 'text-neutral-600 hover:text-black hover:bg-neutral-50/50'
            }`}
          >
            Redemption Steps
          </button>
        </div>

        {/* Tab contents */}
        <div className="animate-fadeIn">
          
          {/* TAB 1: OVERVIEW & INTERACTIVE SANDBOX */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left 2 Cols: Details & Contacts */}
              <div className="lg:col-span-2 flex flex-col gap-6">
                
                {/* About Section */}
                <div className="p-5 border border-neutral-200 bg-white rounded-2xl flex flex-col gap-3.5 shadow-sm">
                  <h3 className="text-[14px] font-black text-neutral-800 uppercase tracking-wider">About the Platform</h3>
                  <p className="text-[14px] text-neutral-600 leading-relaxed font-normal">
                    {selectedDeal.longDescription || selectedDeal.description}
                  </p>
                  {selectedDeal.websiteUrl && (
                    <a
                      href={selectedDeal.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 border border-neutral-200 hover:border-black rounded-full font-bold text-[13px] text-neutral-700 hover:text-black transition-colors self-start bg-white cursor-pointer shadow-sm"
                    >
                      <span>Explore Website</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="shrink-0"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                    </a>
                  )}
                </div>

                {/* Support Contact Section */}
                <div className="p-5 border border-neutral-200 bg-white rounded-2xl flex flex-col gap-3 shadow-sm">
                  <h3 className="text-[14px] font-black text-neutral-800 uppercase tracking-wider">Direct Integration & Support Desk</h3>
                  <p className="text-[13.5px] text-neutral-550 leading-relaxed font-normal">
                    Accel founders have access to dedicated account handlers to troubleshoot voucher activations and enterprise scaling setups.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-neutral-50/50 p-3.5 border border-neutral-200/80 rounded-xl mt-1">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-neutral-400 shrink-0"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                      <span className="font-mono text-[13px] font-bold text-neutral-800 truncate">{selectedDeal.supportContact}</span>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(selectedDeal.supportContact || '');
                          alert('Support email copied to clipboard!');
                        }}
                        className="px-3.5 py-1.5 border border-neutral-300 hover:border-black rounded-lg text-[12px] font-bold text-neutral-600 hover:text-black cursor-pointer transition-colors bg-white shadow-sm"
                      >
                        Copy
                      </button>
                      <a
                        href={`mailto:${selectedDeal.supportContact}`}
                        className="px-3.5 py-1.5 bg-black hover:bg-neutral-800 text-white rounded-lg text-[12px] font-bold cursor-pointer transition-colors shadow-sm text-center"
                      >
                        Email Support
                      </a>
                    </div>
                  </div>
                </div>

                {/* Eligibility Requirements */}
                <div className="p-5 border border-neutral-200 bg-white rounded-2xl flex flex-col gap-2.5 shadow-sm">
                  <h3 className="text-[14px] font-black text-neutral-800 uppercase tracking-wider">Eligibility Requirements</h3>
                  <p className="text-[14px] text-neutral-655 leading-relaxed font-normal">
                    {selectedDeal.eligibilityCriteria}
                  </p>
                </div>

              </div>

              {/* Right 1 Col: Metrics & Interactive Terminal */}
              <div className="lg:col-span-1 flex flex-col gap-6">
                
                {/* Visual Stats Metric Highlight */}
                <div className="p-5 border border-emerald-200 bg-emerald-50/10 rounded-2xl flex items-start gap-4 shadow-sm">
                  <div className="w-11 h-11 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
                  </div>
                  <div>
                    <span className="block text-[11px] font-extrabold text-emerald-800 uppercase tracking-widest">Startup Engagement Factor</span>
                    <p className="text-[14px] font-bold text-neutral-800 mt-1 leading-snug">
                      {selectedDeal.usageMetric}
                    </p>
                  </div>
                </div>

                {/* Interactive Developer CLI Sandbox widget */}
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center px-1">
                    <span className="text-[11px] font-bold text-neutral-450 uppercase tracking-wider">API Integration Sandbox</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  
                  <div className="flex flex-col border border-neutral-800 bg-neutral-950 rounded-2xl overflow-hidden shadow-lg select-none">
                    {/* Terminal Header */}
                    <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-900 border-b border-neutral-800">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                      </div>
                      <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest font-bold">prism-cli --bash</span>
                      <div className="w-8" />
                    </div>
                    
                    {/* Terminal Window Logs */}
                    <div className="p-4 font-mono text-[12px] leading-relaxed text-neutral-300 min-h-[170px] max-h-[170px] overflow-y-auto">
                      {sandboxLogs.map((log, index) => {
                        const isSuccess = log.startsWith('[success]');
                        const isCli = log.startsWith('$');
                        return (
                          <div
                            key={index}
                            className={`${
                              isSuccess ? 'text-emerald-400 font-bold' :
                              isCli ? 'text-neutral-400 font-semibold' : 'text-neutral-350'
                            } mb-1`}
                          >
                            {log}
                          </div>
                        );
                      })}

                      {sandboxStatus === 'building' && (
                        <div className="flex flex-col gap-1.5 mt-3 animate-fadeIn">
                          <div className="flex justify-between items-center text-[10px] text-neutral-500 font-bold">
                            <span>Compiling SDK integration package...</span>
                            <span>{sandboxProgress}%</span>
                          </div>
                          <div className="w-full bg-neutral-900 border border-neutral-800 h-1.5 rounded-full overflow-hidden">
                            <div
                              className="bg-emerald-500 h-full transition-all duration-300 ease-out"
                              style={{ width: `${sandboxProgress}%` }}
                            />
                          </div>
                        </div>
                      )}

                      {sandboxStatus === 'idle' && (
                        <div className="text-neutral-600 italic text-center py-8">
                          Developer sandbox ready.<br/>Click build to compile API boilerplate.
                        </div>
                      )}
                    </div>

                    {/* Terminal Footer Bar */}
                    <div className="px-4 py-2.5 bg-neutral-900 border-t border-neutral-800 flex justify-end">
                      {sandboxStatus === 'idle' && (
                        <button
                          onClick={() => runSandboxBuild(selectedDeal)}
                          className="px-3.5 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-[11px] rounded-lg cursor-pointer transition-colors shadow-sm"
                        >
                          Run Build Simulation
                        </button>
                      )}
                      {sandboxStatus === 'building' && (
                        <span className="text-[11px] font-bold text-neutral-500 flex items-center gap-1.5 px-1 py-1 select-none">
                          <svg className="animate-spin h-3.5 w-3.5 text-emerald-500" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Compiling SDK modules...
                        </span>
                      )}
                      {sandboxStatus === 'complete' && (
                        <button
                          onClick={() => setShowSandboxModal(true)}
                          className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] rounded-lg cursor-pointer transition-colors shadow-sm"
                        >
                          View Sandbox Config
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Accel Trust badge */}
                <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-2xl flex gap-3 shadow-sm select-none animate-fadeIn">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="shrink-0 drop-shadow-sm">
                    <g filter="url(#shadow3d)">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="url(#shield3dGrad)" />
                      <path d="m9 11 2 2 4-4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </g>
                  </svg>
                  <div>
                    <h4 className="text-[13px] font-black text-neutral-900 leading-none">Accel Trust</h4>
                    <p className="text-[11.5px] text-neutral-500 mt-1 leading-normal font-normal">
                      Guaranteed 48-hour approvals or direct partner desk escalate channels.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 2: HOW TO BENEFIT */}
          {activeTab === 'usage' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left 2 Cols: Usage cases */}
              <div className="lg:col-span-2 flex flex-col gap-6">
                <div className="p-5 border border-neutral-200 bg-white rounded-2xl flex flex-col gap-4 shadow-sm animate-slideInUp">
                  <h3 className="text-[14px] font-black text-neutral-800 uppercase tracking-wider">Startup Use-Cases</h3>
                  <p className="text-[14px] text-neutral-600 leading-relaxed font-normal">
                    Startups typically deploy this benefit package to optimize MVP sandboxes, reduce computing burn, or streamline organizational operational setups.
                  </p>
                  
                  <div className="flex flex-col gap-4 pt-3 border-t border-neutral-100">
                    <div className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-neutral-100 flex items-center justify-center shrink-0 text-[11px] font-black text-neutral-800 mt-0.5">1</div>
                      <div>
                        <span className="block text-[13.5px] font-bold text-neutral-900">Sandbox & Prototyping</span>
                        <span className="block text-[13px] text-neutral-500 mt-0.5 leading-normal font-normal">
                          Quickly test product capabilities, staging endpoints, and beta releases under a zero-cost matching limit.
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-neutral-100 flex items-center justify-center shrink-0 text-[11px] font-black text-neutral-800 mt-0.5">2</div>
                      <div>
                        <span className="block text-[13.5px] font-bold text-neutral-900">Scaling Production Capacities</span>
                        <span className="block text-[13px] text-neutral-500 mt-0.5 leading-normal font-normal">
                          Scale database nodes, expand network speeds, and activate backup pipelines as customer load increases.
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-neutral-100 flex items-center justify-center shrink-0 text-[11px] font-black text-neutral-800 mt-0.5">3</div>
                      <div>
                        <span className="block text-[13.5px] font-bold text-neutral-900">Team Alignment & Workspaces</span>
                        <span className="block text-[13px] text-neutral-500 mt-0.5 leading-normal font-normal">
                          Add seats for engineering, product managers, design team members, and sales desks to synchronize project releases.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right 1 Col: Quick Stats */}
              <div className="lg:col-span-1 flex flex-col gap-6">
                <div className="p-5 border border-neutral-200 bg-white rounded-2xl flex flex-col gap-4 shadow-sm animate-slideInUp">
                  <span className="text-[11px] font-bold text-neutral-450 uppercase tracking-wider block">Resource Details</span>
                  <div className="flex flex-col gap-4 text-[13px]">
                    <div className="pb-3 border-b border-neutral-100">
                      <span className="text-[18px] font-black text-black block">12 Months</span>
                      <span className="text-neutral-500 block mt-0.5 leading-snug">Average benefit cycle duration.</span>
                    </div>
                    <div>
                      <span className="text-[18px] font-black text-black block">Direct Sync</span>
                      <span className="text-neutral-500 block mt-0.5 leading-snug">Synced automatically with VC partner billing templates.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: REDEMPTION STEPS */}
          {activeTab === 'redemption' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left 2 Cols: Stepper */}
              <div className="lg:col-span-2 flex flex-col gap-6">
                <div className="p-5 border border-neutral-200 bg-white rounded-2xl shadow-sm">
                  <h3 className="text-[14px] font-black text-neutral-800 uppercase tracking-wider mb-2">Guided Activation Steps</h3>
                  <p className="text-[14px] text-neutral-600 leading-relaxed font-normal mb-6">
                    Claim your voucher package, request partner review, and apply the voucher configurations to unlock your product benefits.
                  </p>

                  <div className="flex flex-col gap-6 relative pt-4 border-t border-neutral-100">
                    {/* Vertical connector line */}
                    <div className="absolute top-8 bottom-6 left-[15px] w-0.5 bg-neutral-200" />

                    {/* Step 1 */}
                    <div className="flex gap-4 relative z-10">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border text-[12px] font-bold ${
                        selectedDeal.status !== 'available'
                          ? 'bg-black border-black text-white'
                          : 'bg-white border-neutral-300 text-neutral-600'
                      }`}>
                        {selectedDeal.status !== 'available' ? '✓' : '1'}
                      </div>
                      <div className="flex-1 pt-0.5 pb-2">
                        <span className="block text-[14px] font-bold text-neutral-900">Step 1: Choose Package Variation</span>
                        
                        {/* Variations list */}
                        {selectedDeal.variations && selectedDeal.variations.length > 0 ? (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-3 max-w-xl">
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
                                      <span className="w-full text-center py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded text-[11px] font-bold uppercase tracking-wider block">
                                        Claimed ✓
                                      </span>
                                    ) : (
                                      <span className="w-full text-center py-1.5 bg-neutral-50 text-neutral-450 border border-neutral-200 rounded text-[11px] font-medium block">
                                        Unavailable
                                      </span>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="mt-3">
                            {selectedDeal.status === 'available' ? (
                              <button
                                onClick={() => onClaimDeal(selectedDeal.id)}
                                className="px-5 py-2 bg-[#C8102E] hover:bg-[#AE0E28] text-white font-bold text-[14px] rounded-full cursor-pointer transition-colors shadow-sm"
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

                    {/* Step 2 */}
                    <div className="flex gap-4 relative z-10">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border text-[12px] font-bold ${
                        selectedDeal.status === 'approved' || selectedDeal.status === 'active'
                          ? 'bg-black border-black text-white'
                          : 'bg-white border-neutral-300 text-neutral-600'
                      }`}>
                        {selectedDeal.status === 'approved' || selectedDeal.status === 'active' ? '✓' : '2'}
                      </div>
                      <div className="flex-1 pt-0.5 pb-2">
                        <span className="block text-[14px] font-bold text-neutral-900">Step 2: VC Relationship Manager Review</span>
                        <span className="block text-[13px] text-neutral-500 mt-1 leading-normal font-normal">
                          The VC partner representative reviews your claim credentials.
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
                            <span className="text-[12px] text-neutral-400 italic font-normal">Awaiting claim activation...</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Step 3 */}
                    <div className="flex gap-4 relative z-10">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border text-[12px] font-bold ${
                        selectedDeal.status === 'active'
                          ? 'bg-black border-black text-white'
                          : 'bg-white border-neutral-300 text-neutral-600'
                      }`}>
                        {selectedDeal.status === 'active' ? '✓' : '3'}
                      </div>
                      <div className="flex-1 pt-0.5 pb-2">
                        <span className="block text-[14px] font-bold text-neutral-900">Step 3: Access Voucher Key</span>
                        <span className="block text-[13px] text-neutral-555 mt-1 leading-normal font-normal">
                          Your pre-approved partner voucher code is visible here.
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
                              className="px-5 py-2 bg-[#C8102E] hover:bg-[#AE0E28] text-white font-bold text-[14px] rounded-full cursor-pointer transition-colors shadow-sm"
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

                    {/* Step 4 */}
                    <div className="flex gap-4 relative z-10">
                      <div className="w-8 h-8 rounded-full bg-white border border-neutral-300 text-neutral-600 flex items-center justify-center shrink-0 text-[12px] font-bold">
                        4
                      </div>
                      <div className="flex-1 pt-0.5">
                        <span className="block text-[14px] font-bold text-neutral-900">Step 4: Launch Developer Platform</span>
                        <span className="block text-[13px] text-neutral-555 mt-1 leading-normal font-normal">
                          Go to the vendor console directly to configure your integration options.
                        </span>

                        <div className="mt-3">
                          <a
                            href={getConsoleLink(selectedDeal.vendorName)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 hover:text-black border border-neutral-300 rounded-lg font-bold text-[12px] cursor-pointer transition-colors shadow-sm"
                          >
                            <span>Open Console ↗</span>
                          </a>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              {/* Right 1 Col: Quick Links */}
              <div className="lg:col-span-1 flex flex-col gap-6">
                <div className="p-5 border border-neutral-200 bg-white rounded-2xl flex flex-col gap-3 shadow-sm">
                  <h3 className="text-[11px] font-bold text-neutral-455 uppercase tracking-wider mb-2">Help & Documentation</h3>
                  <a
                    href={`https://support.${selectedDeal.vendorName.toLowerCase().replace(/\s+/g, '')}.com`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between text-[13px] font-bold text-neutral-800 hover:text-black group border-b border-neutral-100 pb-2.5"
                  >
                    <span>Visit Help Center</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-neutral-400 group-hover:translate-x-0.5 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </a>
                  
                  <div className="text-[12px] text-neutral-400 flex flex-col gap-1 leading-normal font-normal">
                    <span className="font-semibold text-neutral-600">Download Guide:</span>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-neutral-400"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/></svg>
                      <span className="text-neutral-500 font-medium">Redemption_Guide.pdf</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Popup displaying compiled code block configuration and github link */}
        <Modal open={showSandboxModal} onOpenChange={setShowSandboxModal}>
          <ModalContent className="max-w-xl border border-neutral-800 bg-neutral-950 text-white rounded-2xl">
            <ModalHeader className="border-b border-neutral-800 pb-4">
              <ModalTitle className="text-[16px] font-extrabold text-white flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Integration Sandbox Configured
              </ModalTitle>
              <ModalDescription className="text-neutral-400 text-[13px] mt-0.5">
                The configuration template for <strong>{selectedDeal.vendorName}</strong> has been successfully built for <strong>Aurelia Health</strong>.
              </ModalDescription>
            </ModalHeader>

            <ModalBody className="py-4 flex flex-col gap-4 text-[13px]">
              
              {/* SDK Source Link - github, avoid copy-pasting code */}
              <div className="flex items-center justify-between p-3.5 bg-neutral-900 border border-neutral-800 rounded-xl">
                <div className="min-w-0">
                  <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">Open Source Repository</span>
                  <span className="font-mono text-[12px] text-neutral-300 truncate block mt-0.5">
                    {selectedDeal.githubUrl?.replace('https://', '') || 'github.com/prism-sdk/core'}
                  </span>
                </div>
                <a
                  href={selectedDeal.githubUrl || 'https://github.com/sakapil24/Prism_DesignSystem'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700 hover:border-neutral-500 rounded-lg text-[12px] font-bold cursor-pointer transition-all flex items-center gap-1.5 shrink-0"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                  <span>Explore SDK</span>
                </a>
              </div>

              {/* Code Snippet Card - Visual config template (not copy pasted code) */}
              <div className="flex flex-col border border-neutral-800 rounded-xl overflow-hidden bg-neutral-900/50">
                <div className="flex items-center justify-between px-3 py-2 bg-neutral-900 border-b border-neutral-800 text-neutral-400 font-mono text-[11px]">
                  <span>prism.config.ts</span>
                  <span className="text-emerald-500 font-bold uppercase tracking-wider text-[10px]">active sandbox</span>
                </div>
                <pre className="p-4 font-mono text-[11.5px] leading-relaxed text-neutral-300 overflow-x-auto select-text">
                  <span className="text-neutral-500">// Import pre-compiled Accel integration wrappers</span>{"\n"}
                  <span className="text-indigo-400">import</span> {"{"} <span className="text-purple-400">PrismClient</span> {"}"} <span className="text-indigo-400">from</span> <span className="text-emerald-400">'@prism-sdk/core'</span>;{"\n"}
                  <span className="text-indigo-400">import</span> {"{"} <span className="text-purple-400">{selectedDeal.vendorName}Connector</span> {"}"} <span className="text-indigo-400">from</span> <span className="text-emerald-400">'@prism-sdk/{selectedDeal.vendorName.toLowerCase().replace(/\s+/g, '')}'</span>;{"\n\n"}
                  <span className="text-indigo-400">const</span> <span className="text-blue-400">prism</span> = <span className="text-indigo-400">new</span> <span className="text-purple-400">PrismClient</span>({"{"}{"\n"}
                  {"  "}clientId: <span className="text-emerald-400">'aurelia-health-ai'</span>,{"\n"}
                  {"  "}partnerToken: <span className="text-emerald-400">'{selectedDeal.claimCode || 'PRISM-' + selectedDeal.vendorName.toUpperCase() + '-MOCK'}'</span>,{"\n"}
                  {"  "}tier: <span className="text-emerald-400">'Series-A'</span>{"\n"}
                  {"}"});{"\n\n"}
                  <span className="text-indigo-400">export const</span> <span className="text-blue-400">integration</span> = <span className="text-purple-400">{selectedDeal.vendorName}Connector</span>.<span className="text-blue-400">initialize</span>(<span className="text-blue-400">prism</span>);
                </pre>
              </div>

            </ModalBody>

            <ModalFooter className="border-t border-neutral-800 bg-neutral-950 flex justify-end gap-3.5 py-4">
              <button
                type="button"
                onClick={() => setShowSandboxModal(false)}
                className="px-4 py-2 border border-neutral-800 hover:border-neutral-600 hover:bg-neutral-900/60 font-bold text-[12px] text-neutral-300 rounded-lg cursor-pointer"
              >
                Close Sandbox
              </button>
              <button
                type="button"
                onClick={() => {
                  onClaimDeal(selectedDeal.id);
                  setShowSandboxModal(false);
                  window.open(getConsoleLink(selectedDeal.vendorName), '_blank');
                }}
                className="px-5 py-2 text-white bg-[#C8102E] hover:bg-[#AE0E28] font-bold text-[12px] rounded-lg cursor-pointer transition-colors shadow-md"
              >
                Redeem Benefit & Apply Config ↗
              </button>
            </ModalFooter>
          </ModalContent>
        </Modal>

      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col gap-5 py-2 max-w-6xl mx-auto w-full">
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
              className="relative flex flex-col justify-between hover:shadow-[var(--shadow-md)] hover:-translate-y-0.5 transition-all cursor-pointer border border-[var(--border-subtle)] bg-white rounded-[12px] p-3"
            >
              {deal.isNew && (
                <span className="absolute -top-1.5 -right-1.5 px-2.5 py-0.5 text-[10px] font-bold bg-[#D97706] text-white rounded-full uppercase tracking-wider shadow-sm select-none z-10">
                  New
                </span>
              )}
              {/* Card Body */}
              <div className="flex-1 flex flex-col gap-3">
                <div className="flex justify-between items-start gap-2">
                  <CompanyLogo src={deal.logoUrl} name={deal.vendorName} size="lg" />
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
                <span className="text-[14px] font-bold text-[var(--text-primary)]">
                  {deal.variations && deal.variations.length > 1 ? `Up to ${deal.value}` : deal.value}
                </span>

                {deal.status === 'available' ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onClaimDeal(deal.id);
                    }}
                    className="px-5 py-2 bg-[#C8102E] hover:bg-[#AE0E28] text-white font-bold text-[14px] rounded-full cursor-pointer transition-colors shadow-sm flex items-center gap-1.5"
                  >
                    <span>Claim</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="m9 18 6-6-6-6"/></svg>
                  </button>
                ) : (
                  <Badge color="amber" className="px-5 py-2 !rounded-full !h-auto font-bold text-[14px]">Claimed</Badge>
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
              className="relative flex items-center justify-between p-3 border border-[var(--border-subtle)] hover:border-black rounded-[12px] bg-white hover:shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all cursor-pointer"
            >
              {deal.isNew && (
                <span className="absolute -top-1.5 -right-1.5 px-2.5 py-0.5 text-[10px] font-bold bg-[#D97706] text-white rounded-full uppercase tracking-wider shadow-sm select-none z-10">
                  New
                </span>
              )}
              {/* Column 1: Logo + Vendor Name */}
              <div className="w-1/4 min-w-[180px] flex items-center gap-3 shrink-0">
                <CompanyLogo src={deal.logoUrl} name={deal.vendorName} size="sm" />
                <div className="min-w-0">
                  <h3 className="text-[14px] font-bold text-[var(--text-primary)] truncate">
                    {deal.vendorName}
                  </h3>
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
              <div className="w-32 shrink-0 text-left font-bold text-[var(--text-primary)] text-[14px] px-2">
                {deal.variations && deal.variations.length > 1 ? `Up to ${deal.value}` : deal.value}
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
                      className="px-5 py-2 bg-[#C8102E] hover:bg-[#AE0E28] text-white font-bold text-[14px] rounded-full cursor-pointer transition-colors shadow-sm flex items-center gap-1.5"
                    >
                      <span>Claim</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="m9 18 6-6-6-6"/></svg>
                    </button>
                  ) : (
                    <Badge color="amber" className="px-5 py-2 !rounded-full !h-auto font-bold text-[14px]">Claimed</Badge>
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
