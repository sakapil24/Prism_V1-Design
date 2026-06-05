import * as React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter, Badge, SearchInput, Input, FormField, Textarea, Modal, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalBody, ModalFooter, useToast } from '../../design-system/components';
import { Vendor, VendorCategory } from '../types';
import { CompanyLogo } from './CompanyLogo';

interface VendorsViewProps {
  vendors: Vendor[];
}

export function VendorsView({ vendors }: VendorsViewProps) {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<VendorCategory | 'All'>('All');
  const [activeVendor, setActiveVendor] = React.useState<Vendor | null>(null);
  const [filtersExpanded, setFiltersExpanded] = React.useState(false);
  const [searchExpanded, setSearchExpanded] = React.useState(false);
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  
  // Form fields
  const [subject, setSubject] = React.useState('');
  const [requirements, setRequirements] = React.useState('');
  const [contactMethod, setContactMethod] = React.useState('Email');

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch =
      vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'All' || vendor.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleOpenForm = (vendor: Vendor) => {
    setActiveVendor(vendor);
    setSubject(`Consultation Request from Aurelia Health`);
    setRequirements('');
    setContactMethod('Email');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeVendor) return;

    // Trigger toast notification
    toast({
      title: 'Consultation Request Sent',
      description: `Your request has been dispatched to ${activeVendor.name}. They will reach out to you via ${contactMethod.toLowerCase()} within 24 hours.`,
      variant: 'success'
    });

    setActiveVendor(null);
  };

  return (
    <div className="flex-1 flex flex-col gap-5 py-2 max-w-6xl mx-auto w-full">
      {/* Page Header */}
      <div>
        <h1 className="text-xl font-bold text-[var(--text-primary)]">Trusted Partner Directory</h1>
        <p className="text-[14px] text-[var(--text-muted)] mt-1">
          Hand-picked professional agencies and service vendors vetted by Accel India. Startups receive fast-tracked engagement.
        </p>
      </div>

      {/* Toolbar controls */}
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-[var(--border-subtle)] animate-fadeIn">
        {/* Left Side: Category count */}
        <div className="text-[14px] text-[var(--text-muted)] select-none">
          Showing <span className="font-semibold text-[var(--text-primary)]">{filteredVendors.length}</span> service providers
        </div>

        {/* Right Side: Actions */}
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
                placeholder="Search partners..."
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
        </div>
      </div>

      {/* Category filters */}
      {filtersExpanded && (
        <div className="flex gap-2 overflow-x-auto pb-1.5 scrollbar-thin animate-slideDown">
          {(['All', 'Legal', 'Design', 'Finance', 'Development', 'Marketing'] as const).map((cat) => (
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

      {/* Grid of vendors */}
      {filteredVendors.length === 0 ? (
        <Card className="p-10 text-center text-[var(--text-muted)] animate-scaleIn">
          <p className="text-sm">No vendors found matching your filter criteria.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-slideInUp stagger-1">
          {filteredVendors.map((vendor) => (
            <Card
              key={vendor.id}
              className="flex flex-col justify-between hover:shadow-[var(--shadow-md)] transition-all border border-[var(--border-subtle)] bg-white rounded-[12px] p-3"
            >
              {/* Card Body */}
              <div className="flex-1 flex flex-col gap-3">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex items-center gap-3">
                    <CompanyLogo src={vendor.logoUrl} name={vendor.name} size="lg" />
                    <div>
                      <h3 className="text-sm font-bold text-[var(--text-primary)] leading-tight">
                        {vendor.name}
                      </h3>
                      <p className="text-[14px] text-[var(--text-muted)] mt-0.5">
                        {vendor.location} • ★ {vendor.rating.toFixed(1)}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1 items-end shrink-0 text-[14px]">
                    <Badge color="gray" className="text-[14px]">{vendor.category}</Badge>
                    {vendor.vcTrusted && (
                      <span className="text-[14px] bg-emerald-50 text-emerald-800 border border-emerald-100 font-bold px-1.5 py-0.5 rounded-full">
                        VC Curated
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-[14px] text-[var(--text-muted)] leading-relaxed mt-1 line-clamp-3">
                  {vendor.description}
                </p>

                {/* Specialties chips */}
                <div className="flex flex-wrap gap-1 mt-1">
                  {vendor.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[14px] bg-neutral-100 text-neutral-600 font-medium px-2 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="flex justify-between items-center pt-3 border-t border-neutral-100 mt-3 shrink-0">
                <span className="text-[14px] font-semibold text-[var(--text-muted)]">
                  {vendor.typicalEngagement.split('.')[0]}
                </span>
                
                {/* Request Consultation primary CTA button using Clay Red */}
                <button
                  onClick={() => handleOpenForm(vendor)}
                  className="px-3.5 py-1.5 text-white bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] font-bold text-[14px] rounded-[var(--radius-lg)] cursor-pointer shadow-sm transition-colors"
                >
                  Contact Agency
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Intake request Modal */}
      <Modal open={!!activeVendor} onOpenChange={(open: boolean) => !open && setActiveVendor(null)}>
        {activeVendor && (
          <ModalContent size="md" className="border border-[var(--border-subtle)] rounded-[var(--radius-xl)] bg-white max-w-lg">
            <form onSubmit={handleSubmit}>
              <ModalHeader className="border-b border-[var(--border-subtle)] pb-4">
                <ModalTitle className="text-[14px] font-bold text-[var(--text-primary)]">
                  Request Intake consultation
                </ModalTitle>
                <ModalDescription className="text-[14px] text-[var(--text-muted)] leading-tight mt-0.5">
                  Submit a brief requirements outline to <span className="font-bold text-[var(--text-primary)]">{activeVendor.name}</span>. A representative will contact you.
                </ModalDescription>
              </ModalHeader>

              <ModalBody className="py-4 flex flex-col gap-4 text-[14px]">
                {/* Pre-filled info row */}
                <div className="grid grid-cols-2 gap-3 text-[14px] border-b border-[var(--border-subtle)] pb-3">
                  <div>
                    <span className="text-[14px] text-[var(--text-muted)] block font-bold">Referring VC</span>
                    <span className="font-semibold text-neutral-800">Accel India Portfolio Services</span>
                  </div>
                  <div>
                    <span className="text-[14px] text-[var(--text-muted)] block font-bold">Startup Client</span>
                    <span className="font-semibold text-neutral-800">Aurelia Health</span>
                  </div>
                </div>

                {/* Subject */}
                <FormField id="subject" label="Intake Subject" required>
                  <Input
                    id="subject"
                    value={subject}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSubject(e.target.value)}
                    required
                    size="md"
                  />
                </FormField>

                {/* Email (Readonly) */}
                <FormField id="email" label="Contact Email" helperText="VC partner referrals are dispatched from your registered address">
                  <Input
                    id="email"
                    value="ops@aureliahealth.ai"
                    readOnly
                    size="md"
                  />
                </FormField>

                {/* Contact Method - strictly BLACK/GRAY selection */}
                <FormField id="contact-method" label="Preferred Contact Method">
                  <div className="flex gap-2">
                    {['Email', 'Phone Call', 'WhatsApp'].map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setContactMethod(method)}
                        className={`flex-1 py-1.5 text-[14px] font-bold rounded border cursor-pointer transition-all ${
                          contactMethod === method
                            ? 'bg-black text-white border-black'
                            : 'bg-white text-[var(--text-secondary)] border-[var(--border-subtle)] hover:bg-[var(--surface-hover)]'
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </FormField>

                {/* Requirement outline */}
                <FormField id="reqs" label="Requirements Summary" required helperText="Provide a brief summary of the timeline, scope, and target goals">
                  <Textarea
                    id="reqs"
                    rows={4}
                    placeholder="e.g. We are planning a redesign of our healthcare analytics dashboard starting next month and require UI sprint capacity..."
                    value={requirements}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setRequirements(e.target.value)}
                    required
                  />
                </FormField>
              </ModalBody>

              <ModalFooter className="border-t border-[var(--border-subtle)] bg-white flex justify-end gap-2 py-3">
                <button
                  type="button"
                  onClick={() => setActiveVendor(null)}
                  className="px-3.5 py-2 border border-[var(--border-subtle)] hover:bg-[var(--surface-hover)] font-bold text-xs rounded-[var(--radius-lg)] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] font-bold text-xs rounded-[var(--radius-lg)] shadow-sm cursor-pointer transition-colors"
                >
                  Submit Request
                </button>
              </ModalFooter>
            </form>
          </ModalContent>
        )}
      </Modal>
    </div>
  );
}
