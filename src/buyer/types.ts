export interface Startup {
  id: string;
  name: string;
  logo: string;
  vcPartner: string;
  tier: string;
  domain: string;
  employees: number;
  contactEmail: string;
  savingsTotal: number;
  activeClaimsCount: number;
  utilizationsCount: number;
  trustedVendorsCount: number;
}

export type DealCategory = 'SaaS' | 'Infrastructure' | 'Operations' | 'Marketing';

export interface DealVariation {
  id: string;
  title: string;
  description: string;
  value: string;
}

export interface Deal {
  id: string;
  title: string;
  vendorName: string;
  description: string;
  value: string;
  category: DealCategory;
  logoUrl: string;
  eligibilityCriteria: string;
  redemptionSteps: string[];
  longDescription: string;
  status: 'available' | 'claimed' | 'approved' | 'active';
  claimCode?: string;
  claimedDate?: string;
  expiryDate?: string;
  selectedVariationIndex?: number;
  variations?: DealVariation[];
  isNew?: boolean;
  websiteUrl?: string;
  supportContact?: string;
  programDetailsUrl?: string;
  githubUrl?: string;
  usageMetric?: string;
}

export type VendorCategory = 'Legal' | 'Design' | 'Finance' | 'Development' | 'Marketing';

export interface Vendor {
  id: string;
  name: string;
  category: VendorCategory;
  description: string;
  logoUrl: string;
  vcTrusted: boolean;
  tags: string[];
  rating: number;
  location: string;
  details: string;
  specialties: string[];
  typicalEngagement: string;
}

export interface AuditLogEntry {
  timestamp: string;
  action: string;
  note: string;
}

export interface ClaimAudit {
  id: string;
  dealId: string;
  dealTitle: string;
  vendorName: string;
  value: string;
  claimCode: string;
  claimedDate: string;
  status: 'claimed' | 'approved' | 'active';
  auditLogs: AuditLogEntry[];
}
