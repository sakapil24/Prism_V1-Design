import * as React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter, Badge, SearchInput, StageIndicator, StageStep, Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerBody, DrawerFooter } from '../../design-system/components';
import { Deal, DealCategory } from '../types';
import { CompanyLogo } from './CompanyLogo';

interface DealsViewProps {
  deals: Deal[];
  onClaimDeal: (dealId: string) => void;
  onAdminAdvanceStatus: (dealId: string) => void; // for prototyping stepper transitions
}

export function DealsView({ deals, onClaimDeal, onAdminAdvanceStatus }: DealsViewProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<DealCategory | 'All'>('All');
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');
  const [selectedDealId, setSelectedDealId] = React.useState<string | null>(null);
  const [filtersExpanded, setFiltersExpanded] = React.useState(false);
  const [searchExpanded, setSearchExpanded] = React.useState(false);
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  const selectedDeal = deals.find(d => d.id === selectedDealId);

  // Filter deals
  const filteredDeals = deals.filter(deal => {
    const matchesSearch =
      deal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deal.vendorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deal.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || deal.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const getStepsForDeal = (deal: Deal): StageStep[] => {
    const isClaimed = deal.status === 'claimed';
    const isApproved = deal.status === 'approved';
    const isActive = deal.status === 'active';

    return [
      {
        id: '1',
        title: 'Claimed',
        description: deal.claimedDate ? `Requested: ${deal.claimedDate}` : 'Voucher requested',
        status: 'complete',
      },
      {
        id: '2',
        title: 'Approved',
        description: isClaimed ? 'Awaiting VC approval' : 'VC Approved',
        status: isClaimed ? 'pending' : isApproved ? 'active' : 'complete',
      },
      {
        id: '3',
        title: 'Active',
        description: isActive ? 'Redeemed & Active' : 'Pending activation',
        status: isActive ? 'complete' : 'pending',
      },
    ];
  };

  const getCategoryColor = (cat: DealCategory): "gray" | "blue" | "purple" | "cyan" => {
    switch (cat) {
      case 'SaaS': return 'blue';
      case 'Infrastructure': return 'purple';
      case 'Operations': return 'cyan';
      case 'Marketing': return 'gray';
      default: return 'gray';
    }
  };

  return (
    <div className="flex-1 flex flex-col gap-5 py-2">
      {/* Page Header */}
      <div>
        <h1 className="text-xl font-bold text-[var(--text-primary)]">Deals Marketplace</h1>
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
                <span className="text-[14px] font-bold text-[var(--text-primary)]">
                  {deal.value}
                </span>

                {deal.status === 'available' && (
                  <Badge color="gray">Available</Badge>
                )}
                {(deal.status === 'claimed' || deal.status === 'approved') && (
                  <Badge color="amber">Claimed</Badge>
                )}
                {deal.status === 'active' && (
                  <Badge color="green">Active</Badge>
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
              <div className="w-28 shrink-0 text-left font-bold text-[var(--text-primary)] text-[14px] px-2">
                {deal.value}
              </div>

              {/* Column 4: Status Badge + Chevron Arrow */}
              <div className="w-36 shrink-0 flex items-center justify-between pl-2">
                <div>
                  {deal.status === 'available' && (
                    <Badge color="gray">Available</Badge>
                  )}
                  {(deal.status === 'claimed' || deal.status === 'approved') && (
                    <Badge color="amber">Claimed</Badge>
                  )}
                  {deal.status === 'active' && (
                    <Badge color="green">Active</Badge>
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

      {/* Slide-over details Drawer */}
      <Drawer open={!!selectedDealId} onOpenChange={(open: boolean) => !open && setSelectedDealId(null)}>
        {selectedDeal && (
          <DrawerContent className="border-l border-[var(--border-subtle)] bg-[var(--surface-page)] flex flex-col h-full shadow-[var(--shadow-xl)]">
            <DrawerHeader className="border-b border-[var(--border-subtle)] bg-white">
              <div className="flex items-center gap-3">
                <CompanyLogo src={selectedDeal.logoUrl} name={selectedDeal.vendorName} size="lg" />
                <div>
                  <DrawerTitle className="text-[14px] font-bold text-[var(--text-primary)]">
                    {selectedDeal.vendorName}
                  </DrawerTitle>
                  <DrawerDescription className="text-[14px] text-[var(--text-muted)] leading-tight">
                    {selectedDeal.title}
                  </DrawerDescription>
                </div>
              </div>
            </DrawerHeader>

            <DrawerBody className="flex-1 overflow-y-auto py-5 flex flex-col gap-5">
              {/* Stepper block if claimed or redeemed */}
              {selectedDeal.status !== 'available' && (
                <div className="flex flex-col gap-2 p-3 bg-white border border-neutral-200/60 rounded-xl">
                  <div className="flex justify-between items-center text-[14px] uppercase font-bold text-neutral-500 tracking-wider">
                    <span>Redemption Tracker</span>
                    <span className="text-neutral-900 text-[14px]">{selectedDeal.status}</span>
                  </div>

                  <div className="pt-2 pb-1 bg-white rounded-lg border border-neutral-100">
                    <StageIndicator
                      steps={getStepsForDeal(selectedDeal)}
                      variant="bubble"
                      orientation="horizontal"
                    />
                  </div>

                  {/* PROTOTYPE HELPER: INSTANT STEPPER TRANSITION */}
                  <div className="mt-2 flex items-center justify-between bg-white border border-neutral-200/60 p-2 rounded-md">
                    <span className="text-[14px] text-neutral-600 font-semibold">Demo Stepper Progression:</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAdminAdvanceStatus(selectedDeal.id);
                      }}
                      className="px-2 py-0.5 text-[14px] font-bold text-white bg-black hover:bg-neutral-800 rounded cursor-pointer"
                    >
                      Advance Stage →
                    </button>
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="flex flex-col gap-1">
                <h4 className="text-[14px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
                  About the Deal
                </h4>
                <p className="text-[14px] text-[var(--text-primary)] leading-relaxed">
                  {selectedDeal.longDescription}
                </p>
              </div>

              {/* Value & Category */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-white border border-[var(--border-subtle)] rounded-lg">
                  <span className="text-[14px] text-[var(--text-muted)] uppercase font-bold">Deal Value</span>
                  <span className="block text-[14px] font-extrabold text-[var(--text-primary)] mt-0.5">{selectedDeal.value}</span>
                </div>
                <div className="p-3 bg-white border border-[var(--border-subtle)] rounded-lg">
                  <span className="text-[14px] text-[var(--text-muted)] uppercase font-bold">Category</span>
                  <span className="block text-[14px] font-extrabold text-[var(--text-primary)] mt-0.5">{selectedDeal.category}</span>
                </div>
              </div>

              {/* Eligibility Criteria */}
              <div className="flex flex-col gap-1">
                <h4 className="text-[14px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
                  Eligibility Criteria
                </h4>
                <p className="text-[14px] text-neutral-700 bg-amber-50/50 border border-amber-100 p-3 rounded-lg leading-relaxed">
                  {selectedDeal.eligibilityCriteria}
                </p>
              </div>

              {/* Redemption Steps */}
              <div className="flex flex-col gap-2">
                <h4 className="text-[14px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
                  Redemption Steps
                </h4>
                <ol className="flex flex-col gap-2 text-[14px]">
                  {selectedDeal.redemptionSteps.map((step, idx) => (
                    <li key={idx} className="flex gap-2.5 items-start">
                      <span className="w-5 h-5 rounded-full bg-neutral-200 border border-neutral-300 flex items-center justify-center text-[14px] font-bold shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="text-neutral-700 pt-0.5 leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Document Catalog (Generic file icons only, no extensions iconography) */}
              <div className="flex flex-col gap-2">
                <h4 className="text-[14px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
                  Associated Documents
                </h4>
                <div className="flex flex-col gap-2">
                  {[
                    { name: 'Redemption_Guidelines_Sheet.pdf', size: '1.4 MB' },
                    { name: 'Partner_Program_Agreement_v3.pdf', size: '2.8 MB' }
                  ].map((doc, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2.5 border border-[var(--border-subtle)] rounded-lg bg-white"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        {/* Generic document icon: strictly FileIcon from design-system, or raw SVG */}
                        <div className="w-8 h-8 rounded bg-neutral-50 border border-neutral-100 flex items-center justify-center text-neutral-500 shrink-0">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                          </svg>
                        </div>
                        <div className="min-w-0">
                          <div className="text-[14px] font-bold text-[var(--text-primary)] truncate">
                            {doc.name}
                          </div>
                          <div className="text-[14px] text-[var(--text-muted)] mt-0.5">
                            {doc.size}
                          </div>
                        </div>
                      </div>
                      <button className="h-6 px-2 border border-[var(--border-subtle)] hover:bg-[var(--surface-hover)] rounded text-[14px] font-bold cursor-pointer transition-colors">
                        Download
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </DrawerBody>

            <DrawerFooter className="border-t border-[var(--border-subtle)] bg-white flex justify-between items-center">
              <div>
                {selectedDeal.claimCode && (
                  <div className="text-left">
                    <span className="text-[14px] text-[var(--text-muted)] block font-bold uppercase">Claim Code</span>
                    <code className="font-mono text-[14px] font-bold bg-neutral-100 px-1 py-0.5 rounded text-neutral-900">
                      {selectedDeal.claimCode}
                    </code>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedDealId(null)}
                  className="px-3.5 py-2 border border-[var(--border-subtle)] hover:bg-[var(--surface-hover)] font-bold text-[14px] rounded-[var(--radius-lg)] cursor-pointer"
                >
                  Close
                </button>

                {selectedDeal.status === 'available' && (
                  <button
                    onClick={() => {
                      onClaimDeal(selectedDeal.id);
                    }}
                    className="px-4 py-2 text-white bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] font-bold text-[14px] rounded-[var(--radius-lg)] shadow-sm cursor-pointer transition-colors"
                  >
                    Claim Deal
                  </button>
                )}
                {selectedDeal.status === 'claimed' && (
                  <button disabled className="px-4 py-2 text-neutral-400 bg-neutral-100 font-bold text-[14px] rounded-[var(--radius-lg)] cursor-not-allowed">
                    Awaiting Review
                  </button>
                )}
                {selectedDeal.status === 'approved' && (
                  <button
                    onClick={() => {
                      onAdminAdvanceStatus(selectedDeal.id); // transitions to active
                    }}
                    className="px-4 py-2 text-white bg-black hover:bg-neutral-800 font-bold text-[14px] rounded-[var(--radius-lg)] cursor-pointer"
                  >
                    Redeem Code
                  </button>
                )}
                {selectedDeal.status === 'active' && (
                  <button disabled className="px-4 py-2 text-emerald-700 bg-emerald-50 border border-emerald-100 font-bold text-[14px] rounded-[var(--radius-lg)] cursor-not-allowed">
                    Active Credit
                  </button>
                )}
              </div>
            </DrawerFooter>
          </DrawerContent>
        )}
      </Drawer>
    </div>
  );
}
