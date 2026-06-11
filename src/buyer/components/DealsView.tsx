import * as React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter, Badge, SearchInput, Modal, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalBody, ModalFooter } from '../../design-system/components';
import { Deal, DealCategory } from '../types';
import { CompanyLogo } from './CompanyLogo';

interface PremiumDetails {
  eligibilitySummary: string;
  redeemSummary: string;
  whatIsPlatform: string;
  integrations: { name: string; description: string; logoUrl: string; dealId?: string }[];
  automations: string;
  dayToDay: string;
  dayToDayPillars: { emoji: string; title: string; description: string }[];
  freeVsPaid: { feature: string; free: string; paid: string }[];
  insight: string;
  alternativesList: { name: string; description: string; logoUrl: string; dealId?: string }[];
  g2Reviews: { author: string; companySize: string; rating: number; title: string; pros: string; cons: string }[];
  faqs: { q: string; a: string }[];
  mockupType: 'chat' | 'dashboard' | 'board';
  startupOffer: string;
  eligiblePlans: string;
  durationLimit: string;
  userLimit: string;
}

function getPremiumDetails(dealId: string, vendorName: string, category: string, dealValue: string): PremiumDetails {
  if (dealId === 'deal-slack') {
    return {
      eligibilitySummary: 'Open to all Accel portfolio companies not currently on a paid Slack plan.',
      redeemSummary: 'Claim voucher, obtain Accel relationship manager approval, copy the claim code, and apply it in the Slack workspace billing settings.',
      whatIsPlatform: 'Slack is a cloud-based team communication platform that brings messaging, files, and tools together in one place. It organizes conversations into channels, supports synchronous voice/video chats via Huddles, and offers asynchronous canvas docs to keep teams aligned.',
      integrations: [
        { name: 'GitHub', description: 'Track commits, pull requests, and deployment status directly in channel notifications.', logoUrl: 'https://logo.clearbit.com/github.com' },
        { name: 'Jira', description: 'Create, update, and comment on tickets without leaving your chat threads.', logoUrl: 'https://logo.clearbit.com/atlassian.com' },
        { name: 'Figma', description: 'Get notified of design comments and file changes in real-time.', logoUrl: 'https://logo.clearbit.com/figma.com' },
        { name: 'Google Drive', description: 'Access, share, and manage Google docs and sheets within Slack conversations.', logoUrl: 'https://logo.clearbit.com/google.com' }
      ],
      automations: 'Automate routine tasks using Slack Workflow Builder. Connect webhook alerts, build interactive message menus, and configure automated weekly standup reminders without writing a single line of code.',
      dayToDay: 'Teams use Slack to run daily standups asynchronously, manage cross-functional channels, start quick huddles for brainstorming, and share project updates. By having all conversations indexed and searchable, new team members onboard twice as fast.',
      dayToDayPillars: [
        { emoji: '💬', title: 'Async Standups', description: 'Run automated daily check-ins in channels to keep the team aligned without meeting fatigue.' },
        { emoji: '🎧', title: 'Quick Huddles', description: 'Launch voice Huddles instantly to sketch ideas, co-work, and solve blockages on the fly.' },
        { emoji: '🔍', title: 'Searchable Knowledge', description: 'Index all files, messages, and integrations so new engineers can search past decisions and onboard fast.' }
      ],
      freeVsPaid: [
        { feature: 'Message History', free: 'Last 90 days only', paid: 'Unlimited search & history' },
        { feature: 'Slack Connect', free: 'Not available', paid: 'Secure collaboration with external partners' },
        { feature: 'Huddles & Video', free: '1-to-1 only', paid: 'Up to 50 people with screen sharing' },
        { feature: 'Apps & Integrations', free: 'Max 10 integrations', paid: 'Unlimited integrations' },
        { feature: 'SSO & Security', free: 'Standard login', paid: 'Google SSO & SAML support' }
      ],
      insight: 'Huddles reduce team sync meetings by 26%, while Slack Connect reduces external email spam by 90% and accelerates deal cycles.',
      alternativesList: [
        { name: 'Microsoft Teams', description: 'Chat, meeting, and calling solution integrated deeply with Office 365.', logoUrl: 'https://logo.clearbit.com/microsoft.com' },
        { name: 'Discord', description: 'Voice-focused community chat ideal for high-collaboration developer teams.', logoUrl: 'https://logo.clearbit.com/discord.com' },
        { name: 'Google Chat', description: 'Collaboration chat integrated with Google Workspace apps and spreadsheets.', logoUrl: 'https://logo.clearbit.com/google.com', dealId: 'deal-google-workspace' }
      ],
      g2Reviews: [
        { author: 'Sarah Jenkins', companySize: 'Startup (1-10 employees)', rating: 5, title: 'Essential hub for startup collaboration', pros: 'Threaded conversations keep things organized. Integrates with everything we use. Huddles are fantastic for quick syncs without scheduling a Zoom call.', cons: 'Notification overload can be real if not properly configured. Paid seats get expensive as the team scales.' },
        { author: 'David Chen', companySize: 'Mid-Market (51-200 employees)', rating: 4.5, title: 'Accelerates internal and external team communication', pros: 'Slack Connect makes it incredibly easy to work with our VC partners and agency vendors in shared channels. Search indexing is fast and robust.', cons: 'Mobile app occasionally delays push notifications. Memory usage on desktop app is higher than expected.' }
      ],
      faqs: [
        { q: 'For what does this discount apply to?', a: 'This discount applies to new Slack Pro or Business+ annual subscriptions for up to 12 months. It cannot be combined with existing active discounts.' },
        { q: 'What happens if I cross the seat limit during my active discount?', a: 'If you add seats beyond the initial claimed range, you will be billed for additional seats at the standard discounted rate.' },
        { q: 'Can we apply this discount to an enterprise grid plan?', a: 'No, this startup benefit is restricted to Pro and Business+ plans. For Enterprise Grid plans, contact the Accel partnership desk for custom negotiations.' },
        { q: 'Is there a contract lock-in post 12 months?', a: 'No, you can cancel or downgrade to the free tier at any time before the annual renewal. If you stay on the plan, renewal defaults to standard rates.' }
      ],
      mockupType: 'chat',
      startupOffer: '50% off Pro or Business+ plan',
      eligiblePlans: 'Pro or Business+ (Annual)',
      durationLimit: '12 Months',
      userLimit: 'Up to 200 seats'
    };
  }

  if (dealId === 'deal-aws') {
    return {
      eligibilitySummary: 'Open to early-stage startups who have not previously received equivalent AWS Activate credits.',
      redeemSummary: 'Submit your application code through the AWS Activate console using the Accel Org ID provided.',
      whatIsPlatform: 'Amazon Web Services (AWS) is the world’s most comprehensive and broadly adopted cloud platform, offering over 200 fully featured services from data centers globally.',
      integrations: [
        { name: 'Terraform', description: 'Deploy cloud resources safely using infrastructure-as-code configurations.', logoUrl: 'https://logo.clearbit.com/hashicorp.com' },
        { name: 'GitHub Actions', description: 'Deploy code directly to AWS ECS, Lambda, or S3 on every push.', logoUrl: 'https://logo.clearbit.com/github.com' },
        { name: 'Docker', description: 'Package and containerize applications for deployment to ECS or EKS.', logoUrl: 'https://logo.clearbit.com/docker.com' },
        { name: 'Datadog', description: 'Monitor cloud health and collect performance logs in real time.', logoUrl: 'https://logo.clearbit.com/datadoghq.com' }
      ],
      automations: 'Automate serverless operations using AWS Lambda and CloudWatch. Configure scheduled database snapshots, auto-scale compute capacity based on traffic, and set up real-time security alerts.',
      dayToDay: 'Engineers use AWS console and CLI to manage database backends, host application servers, store media files in S3 buckets, and set up staging environments for testing new features before release.',
      dayToDayPillars: [
        { emoji: '🚀', title: 'Scalable Compute', description: 'Launch EC2 nodes and auto-scaling groups to support spikes in web traffic effortlessly.' },
        { emoji: '🛡️', title: 'Enterprise Security', description: 'Configure granular IAM policies and private subnets to protect customer data records.' },
        { emoji: '💸', title: 'Serverless Cost Savings', description: 'Deploy serverless backend APIs using AWS Lambda to pay only for exact code execution time.' }
      ],
      freeVsPaid: [
        { feature: 'Support', free: 'Basic billing support', paid: '24/7 technical support response under 1 hour' },
        { feature: 'Compute', free: 'Free tier limits', paid: 'Unlimited scalable EC2 nodes and serverless instances' },
        { feature: 'Credits Coverage', free: 'Pay as you go', paid: 'Fully covered by Accel $5,000 Activate voucher' },
        { feature: 'Security Review', free: 'Standard advice', paid: 'Custom AWS Well-Architected reviews by experts' }
      ],
      insight: 'Serverless infrastructure cuts maintenance overhead by 40% and allows startup teams to iterate twice as fast.',
      alternativesList: [
        { name: 'Google Cloud Platform', description: 'Developer-friendly cloud with strong Kubernetes and AI tooling.', logoUrl: 'https://logo.clearbit.com/google.com', dealId: 'deal-google-workspace' },
        { name: 'Microsoft Azure', description: 'Enterprise-grade cloud with strong integration with Windows services.', logoUrl: 'https://logo.clearbit.com/microsoft.com' }
      ],
      g2Reviews: [
        { author: 'Marcus Aurelius', companySize: 'Startup (1-10 employees)', rating: 5, title: 'The gold standard for scalable web apps', pros: 'Unmatched ecosystem of services. The AWS Activate program has saved us thousands in server costs during our first year.', cons: 'Console UI is complex and overwhelming. Hard to estimate monthly bills without cost explorer knowledge.' }
      ],
      faqs: [
        { q: 'What is covered by the $5,000 credits?', a: 'AWS credits cover usage fees for most AWS services including EC2 compute, RDS databases, S3 storage, and technical support.' }
      ],
      mockupType: 'dashboard',
      startupOffer: '$5,000 Promotional Credits',
      eligiblePlans: 'AWS Activate Portfolio Tier',
      durationLimit: '2 Years validity',
      userLimit: 'Unlimited accounts'
    };
  }

  if (dealId === 'deal-stripe') {
    return {
      eligibilitySummary: 'Open to new Stripe merchants who have registered through the Accel Startup Program.',
      redeemSummary: 'Register a Stripe account through the custom Accel partner onboarding link to automatically apply fee waivers.',
      whatIsPlatform: 'Stripe is a suite of APIs powering online payment processing and commerce solutions for startups and global internet enterprises.',
      integrations: [
        { name: 'QuickBooks', description: 'Automatically sync Stripe payments and sales tax data to accounting books.', logoUrl: 'https://logo.clearbit.com/intuit.com' },
        { name: 'Salesforce', description: 'Update customer invoice statuses and pipeline metrics directly inside CRM.', logoUrl: 'https://logo.clearbit.com/salesforce.com' },
        { name: 'Retool', description: 'Build custom internal customer support tool dashboards to trigger refunds.', logoUrl: 'https://logo.clearbit.com/retool.com', dealId: 'deal-retool' }
      ],
      automations: 'Automate monthly customer subscription renewals, generate hosted tax invoices, flag suspicious transactions using Radar ML, and trigger slack alerts on new purchases.',
      dayToDay: 'Finance and support desks use Stripe to monitor daily revenue metrics, handle client subscription upgrades, issue refunds, and download tax statements.',
      dayToDayPillars: [
        { emoji: '💳', title: 'Global Processing', description: 'Accept cards, wallets, and local payment rails in over 135+ currencies.' },
        { emoji: '📊', title: 'Revenue Dashboard', description: 'Track MRR, churn rates, and download accounting statements in a single interface.' },
        { emoji: '🛡️', title: 'Radar ML Anti-Fraud', description: 'Filter out fraudulent charges dynamically using Stripe Radar machine learning.' }
      ],
      freeVsPaid: [
        { feature: 'Fees Coverage', free: '2.9% + 30c per charge', paid: '0% fee waiver for the first $20,000 in volume' },
        { feature: 'Billing Engine', free: 'Basic recurring billing', paid: 'Custom multi-tiered subscription pricing support' },
        { feature: 'Support', free: 'Email support', paid: 'Priority 24/7 chat support response' }
      ],
      insight: 'Activating Radar ML filters reduces chargebacks by 35% without blocking legitimate customer checkouts.',
      alternativesList: [
        { name: 'Adyen', description: 'Global omnichannel merchant platform designed for scale.', logoUrl: 'https://logo.clearbit.com/adyen.com' },
        { name: 'Braintree', description: 'PayPal-owned payment solution offering easy checkout integrations.', logoUrl: 'https://logo.clearbit.com/paypal.com' }
      ],
      g2Reviews: [
        { author: 'Jane Doe', companySize: 'Startup (1-10 employees)', rating: 5, title: 'Flawless developer experience and clean API', pros: 'The documentation is incredible. We got subscription checkouts live in a single afternoon. Fee waiver saved us $600 in credit card costs.', cons: 'Account risk reviews can sometimes hold funds without prior warning. Support can take time to resolve compliance flags.' }
      ],
      faqs: [
        { q: 'What transaction types are covered by the waiver?', a: 'The $20,000 waiver covers card processing fees for standard online Visa, Mastercard, and American Express transactions.' }
      ],
      mockupType: 'dashboard',
      startupOffer: '$20,000 Fee-Free Volume',
      eligiblePlans: 'Stripe Core Processing Tier',
      durationLimit: 'No Expiration',
      userLimit: 'New Stripe merchants'
    };
  }

  // Fallback default
  return {
    eligibilitySummary: 'Open to all active Accel portfolio companies.',
    redeemSummary: 'Claim voucher and apply it directly on the vendor console.',
    whatIsPlatform: `${vendorName} is a premium platform specialized in ${category} solutions designed to optimize your operations.`,
    integrations: [],
    automations: 'Automate core team workflows and integrate with external APIs to scale operational efficiency.',
    dayToDay: 'Manage day-to-day operations, review metric details, and coordinate team collaborations.',
    dayToDayPillars: [
      { emoji: '⚡', title: 'Operational Speed', description: 'Build and deploy product services faster with optimized workflow automation.' },
      { emoji: '🔌', title: 'Deep Integrations', description: 'Sync operational tools to automate data pipelines and eliminate manual sync work.' },
      { emoji: '📈', title: 'Scalable Foundation', description: 'Prepare your backend architecture to support customer seat growth and security audits.' }
    ],
    freeVsPaid: [],
    insight: 'Integrating platform features reduces operational latency and aligns team goals.',
    alternativesList: [],
    g2Reviews: [],
    faqs: [
      { q: 'How do I redeem this benefit?', a: `Simply click the Claim button, copy your voucher code, and enter it in the billing console for ${vendorName}.` }
    ],
    mockupType: 'dashboard',
    startupOffer: dealValue,
    eligiblePlans: 'Standard startup tier',
    durationLimit: '12 Months',
    userLimit: 'All active users'
  };
}

function renderPillarIcon(emoji: string) {
  const iconClass = "w-5 h-5 text-neutral-800 shrink-0";
  switch (emoji) {
    case '💬': // Async Standups
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={iconClass}>
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      );
    case '🎧': // Quick Huddles
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={iconClass}>
          <path d="M3 18v-6a9 9 0 0 1 18 0v6"/>
          <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
        </svg>
      );
    case '🔍': // Searchable Knowledge
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={iconClass}>
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
      );
    case '🚀': // Scalable Compute
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={iconClass}>
          <path d="M4.5 16.5c-1.5 1.25-2.5 3.5-2.5 3.5s2.25-1 3.5-2.5M16.5 4.5c1.5-1.25 2.5-3.5 2.5-3.5s-2.25 1-3.5 2.5"/>
          <path d="m12 12 9-9-9 9Z"/>
          <path d="M12 12c-3.1 3.1-4.8 6.5-5.5 8.5C6 22 6.5 22.5 7 22c2-0.7 5.4-2.4 8.5-5.5M19 9c-1-1-3-1-4 0l-6 6c-1 1-1 3 0 4 1 1 3 1 4 0l6-6c1-1 1-3 0-4Z"/>
        </svg>
      );
    case '🛡️': // Enterprise Security / Radar ML
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={iconClass}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      );
    case '💸': // Serverless Cost Savings
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={iconClass}>
          <line x1="12" y1="1" x2="12" y2="23"/>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
      );
    case '💳': // Global Processing
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={iconClass}>
          <rect x="2" y="5" width="20" height="14" rx="2" ry="2"/>
          <line x1="2" y1="10" x2="22" y2="10"/>
        </svg>
      );
    case '📊': // Revenue Dashboard
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={iconClass}>
          <line x1="18" y1="20" x2="18" y2="10"/>
          <line x1="12" y1="20" x2="12" y2="4"/>
          <line x1="6" y1="20" x2="6" y2="14"/>
        </svg>
      );
    case '⚡': // Operational Speed
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={iconClass}>
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
        </svg>
      );
    case '🔌': // Deep Integrations
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={iconClass}>
          <path d="M18.36 6.64a9 9 0 0 1 0 12.73"/>
          <path d="M6.14 12a6 6 0 0 1 4.24-5.66"/>
          <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/>
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
        </svg>
      );
    case '📈': // Scalable Foundation
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={iconClass}>
          <polygon points="23 6 13.5 15.5 8.5 10.5 1 18 1 22 23 22 23 6"/>
        </svg>
      );
    case '💡': // Insight
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-emerald-800 shrink-0">
          <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .5 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/>
          <path d="M9 18h6M10 22h4"/>
        </svg>
      );
    default:
      return null;
  }
}

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
  const [gridCols, setGridCols] = React.useState<1 | '1-row' | 2 | '2-row' | 3>('2-row');
  const [selectedDealId, setSelectedDealId] = React.useState<string | null>(null);
  const [activeScreenshotIdx, setActiveScreenshotIdx] = React.useState<number>(0);
  const [lightboxOpen, setLightboxOpen] = React.useState<boolean>(false);
  const [layoutOption, setLayoutOption] = React.useState<'contained' | 'flat-sticky' | 'hybrid'>('flat-sticky');

  // Dynamic header and scroll spy states
  const [isCompact, setIsCompact] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState('claiming-sec');

  React.useEffect(() => {
    if (!selectedDealId) {
      setIsCompact(false);
      setActiveSection('claiming-sec');
      return;
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsCompact(scrollY > 85);

      const sections = [
        'claiming-sec',
        'overview-sec',
        'day-to-day-sec',
        'plans-sec',
        'reviews-sec'
      ];

      const headerOffset = scrollY > 85 ? 120 : 180;

      let active = 'claiming-sec';
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= headerOffset + 60) {
            active = sectionId;
          }
        }
      }
      setActiveSection(active);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [selectedDealId]);

  React.useEffect(() => {
    const mainContainer = document.querySelector('.flex-1.p-4.lg\\:p-6.bg-\\[var\\(--surface-secondary\\)\\]');
    if (!mainContainer) return;

    if (selectedDealId && (layoutOption === 'flat-sticky' || layoutOption === 'hybrid')) {
      (mainContainer as HTMLElement).style.setProperty('background-color', '#FFFFFF', 'important');
      if (layoutOption === 'flat-sticky') {
        (mainContainer as HTMLElement).style.setProperty('padding', '0px', 'important');
      } else {
        (mainContainer as HTMLElement).style.removeProperty('padding');
      }
    } else {
      (mainContainer as HTMLElement).style.removeProperty('background-color');
      (mainContainer as HTMLElement).style.removeProperty('padding');
    }

    return () => {
      if (mainContainer) {
        (mainContainer as HTMLElement).style.removeProperty('background-color');
        (mainContainer as HTMLElement).style.removeProperty('padding');
      }
    };
  }, [selectedDealId, layoutOption]);

  React.useEffect(() => {
    setActiveScreenshotIdx(0);
    setLightboxOpen(false);
  }, [selectedDealId]);
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

  const heroRef = React.useRef<HTMLDivElement>(null);
  const [showAnchorNav, setShowAnchorNav] = React.useState(false);

  React.useEffect(() => {
    if (!heroRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowAnchorNav(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: '-10px 0px 0px 0px' }
    );
    observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, [selectedDealId]);

  const [selectedOptionIndex, setSelectedOptionIndex] = React.useState<number>(0);
  const [redemptionDealId, setRedemptionDealId] = React.useState<string | null>(null);

  const handleClaimClick = (dealId: string, variationIndex?: number) => {
    const deal = deals.find(d => d.id === dealId);
    if (!deal) return;
    if (deal.status === 'available') {
      onClaimDeal(dealId, variationIndex);
    }
    setRedemptionDealId(dealId);
  };

  const formatDateString = (dateStr?: string) => {
    if (!dateStr) return new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const formatMonthYear = (dateStr?: string) => {
    if (!dateStr) return new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const getRedeemByDate = (dateStr?: string) => {
    const baseDate = dateStr ? new Date(dateStr) : new Date();
    const parsed = isNaN(baseDate.getTime()) ? new Date() : baseDate;
    const redeemBy = new Date(parsed.getTime() + 30 * 24 * 60 * 60 * 1000);
    return redeemBy.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const formatYYYYMMDD = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}${m}${d}`;
  };

  const getCalendarReminderLink = (deal: Deal) => {
    const baseDate = deal.claimedDate ? new Date(deal.claimedDate) : new Date();
    const parsed = isNaN(baseDate.getTime()) ? new Date() : baseDate;
    
    const reminderDate = new Date(parsed);
    reminderDate.setFullYear(reminderDate.getFullYear() + 1);
    const startStr = formatYYYYMMDD(reminderDate);
    
    const endDate = new Date(reminderDate);
    endDate.setDate(endDate.getDate() + 1);
    const endStr = formatYYYYMMDD(endDate);
    
    const title = encodeURIComponent(`Prism Reminder: Evaluate/Cancel ${deal.vendorName} Subscription`);
    const details = encodeURIComponent(`Your 1-year free ${deal.vendorName} startup benefit claimed on Prism is ending. Review your account settings and cancel or renew your subscription to avoid unexpected auto-renewal charges.`);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startStr}/${endStr}&details=${details}&sf=true&output=xml`;
  };

  const renderRedemptionModal = () => {
    if (!redemptionDealId) return null;
    const modalDeal = deals.find(d => d.id === redemptionDealId);
    if (!modalDeal) return null;

    return (
      <Modal open={!!redemptionDealId} onOpenChange={(open) => { if (!open) setRedemptionDealId(null); }}>
        <ModalContent className="max-w-[720px] border border-[var(--border-subtle)] bg-white rounded-2xl p-0 overflow-hidden shadow-2xl">
          {/* Clean Flat Header with Divider Separator */}
          <ModalHeader className="px-8 pb-5 pt-8 border-b border-[var(--border-subtle)]">
            <ModalTitle className="text-xl font-extrabold text-neutral-900">
              Redeeming your {modalDeal.vendorName} offer
            </ModalTitle>
            <ModalDescription className="text-neutral-500 text-[13px] mt-1.5">
              Follow the instructions below to apply your {modalDeal.value} startup package.
            </ModalDescription>
          </ModalHeader>
          
          {/* Claimed Success Banner Box - full-width, aligns with divider, no corner radius */}
          {modalDeal.status !== 'available' && (
            <div className="px-8 py-3.5 bg-emerald-50/60 border-b border-[var(--border-subtle)] flex items-center gap-3.5 font-sans w-full">
              <div className="w-5.5 h-5.5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 select-none">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3.5" viewBox="0 0 24 24">
                  <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-[13.5px] text-emerald-955 leading-normal font-bold">
                {modalDeal.vendorName} offer was claimed on {formatMonthYear(modalDeal.claimedDate)}.
              </span>
            </div>
          )}
          
          <ModalBody className="p-8 flex flex-col gap-8 text-[13px]">
            {/* Steps List (Clean rounded number badges, with vertical stepper line) */}
            <div className="relative flex flex-col gap-8 ml-1">
              
              {/* Step 1 */}
              <div className="relative flex flex-col gap-2 z-10">
                {/* Stepper Connector Line Segment */}
                <div className="absolute left-[11px] top-3 bottom-[-44px] w-px bg-[var(--border-subtle)]" />
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-neutral-100 text-neutral-800 border border-[var(--border-subtle)] flex items-center justify-center font-extrabold text-[12px] select-none shrink-0 relative z-10">
                    1
                  </span>
                  <span className="text-[14px] font-extrabold text-neutral-900">Sign Up / Create Account</span>
                </div>
                <span className="text-[13px] text-neutral-600 leading-relaxed font-normal pl-[34px]">
                  Sign up or log in. This link will automatically route you to the partner console checkout page.
                </span>
                <div className="mt-3 ml-[34px]">
                  <a
                    href={getConsoleLink(modalDeal.vendorName)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-4.5 py-2 bg-[#C8102E] hover:bg-[#AE0E28] text-white font-extrabold text-[12px] rounded-lg cursor-pointer transition-colors shadow-sm"
                  >
                    <span>Visit {modalDeal.vendorName}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="shrink-0 opacity-90"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                  </a>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative flex flex-col gap-2 z-10">
                {/* Stepper Connector Line Segment */}
                <div className="absolute left-[11px] top-3 bottom-[-44px] w-px bg-[var(--border-subtle)]" />
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-neutral-100 text-neutral-800 border border-[var(--border-subtle)] flex items-center justify-center font-extrabold text-[12px] select-none shrink-0 relative z-10">
                    2
                  </span>
                  <span className="text-[14px] font-extrabold text-neutral-900">Apply Coupon Code</span>
                </div>
                <span className="text-[13px] text-neutral-600 leading-relaxed font-normal pl-[34px]">
                  Enter your unique coupon code in the Billing portal. <span className="font-extrabold text-black">Do not checkout without entering this code.</span>
                </span>
                
                {/* Clean, Non-hectic Coupon Copy Pill */}
                <div className="mt-2.5 ml-[34px] flex items-center gap-2">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(modalDeal.claimCode || `PRISM-${modalDeal.vendorName.toUpperCase()}-MOCK`);
                      alert('Coupon code copied to clipboard!');
                    }}
                    className="flex items-center gap-2 px-3 py-1.5 bg-neutral-50 border border-[var(--border-subtle)] hover:bg-neutral-100 text-neutral-900 rounded-lg cursor-pointer transition-all group shadow-sm"
                    title="Click to copy code"
                  >
                    <code className="font-mono text-[12.5px] font-bold text-neutral-900 tracking-wide select-all">
                      {modalDeal.claimCode || `PRISM-${modalDeal.vendorName.toUpperCase()}-MOCK`}
                    </code>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-neutral-400 group-hover:text-black transition-colors shrink-0">
                      <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative flex flex-col gap-2 z-10">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-neutral-100 text-neutral-800 border border-[var(--border-subtle)] flex items-center justify-center font-extrabold text-[12px] select-none shrink-0 relative z-10">
                    3
                  </span>
                  <span className="text-[14px] font-extrabold text-neutral-900">Enter Payment Details & Continue</span>
                </div>
                <span className="text-[13px] text-neutral-600 leading-relaxed font-normal pl-[34px]">
                  You will not be charged until your renewal at the end of your first free year.
                </span>
              </div>
            </div>

            {/* Disclaimer & Support Section */}
            <div className="text-[12px] text-neutral-500 border-t border-[var(--border-subtle)] pt-5 flex flex-col gap-2.5 font-normal">
              <span className="leading-relaxed">
                Assume all deals will auto-renew to a paid plan at the end of the free year and consider setting a calendar reminder.
              </span>
              <div className="leading-normal">
                <span>Having issues? </span>
                <a
                  href={modalDeal.supportContact ? `mailto:${modalDeal.supportContact}` : "mailto:support@accel.com"}
                  className="text-black font-semibold underline hover:text-neutral-800"
                >
                  Contact support for help
                </a>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  };

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

    const details = getPremiumDetails(selectedDeal.id, selectedDeal.vendorName, selectedDeal.category, selectedDeal.value);

    // ───────── LAYOUT RENDERING HELPERS ─────────

    const renderLeftColumnContent = () => (
      <>
        {/* Section 1: Eligibility Prerequisites */}
        <div id="claiming-sec" className="pb-6 border-b border-neutral-100 flex flex-col gap-4 scroll-mt-32 select-none">
          <h3 className="text-lg font-bold text-neutral-900">Eligibility Prerequisites</h3>
          <div className="text-[14px] leading-relaxed text-neutral-800">
            <ul className="list-none flex flex-col gap-2.5">
              {selectedDeal.id === 'deal-slack' ? (
                <>
                  <li className="flex items-start gap-2">
                    <span className="text-neutral-400 shrink-0 select-none">•</span>
                    <span>Startups with up to 200 employees.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-neutral-400 shrink-0 select-none">•</span>
                    <span>Upgrades to paid Slack Pro or Business+ annual plans.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-neutral-400 shrink-0 select-none">•</span>
                    <span>Cannot be combined with existing active promotions.</span>
                  </li>
                </>
              ) : (
                <li className="flex items-start gap-2">
                  <span className="text-neutral-400 shrink-0 select-none">•</span>
                  <span>{details.eligibilitySummary}</span>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Section 2: Overview */}
        <div id="overview-sec" className="py-6 border-b border-neutral-100 flex flex-col gap-4 scroll-mt-32">
          <h3 className="text-lg font-bold text-neutral-900">What is {selectedDeal.vendorName}?</h3>
          <p className="text-[14px] text-black leading-relaxed font-normal">
            {details.whatIsPlatform}
          </p>
          {selectedDeal.programDetailsUrl && (
            <div className="mt-1">
              <a
                href={selectedDeal.programDetailsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[13px] font-bold text-neutral-800 hover:text-black hover:underline transition-colors"
              >
                <span>Program Details</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="shrink-0"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </a>
            </div>
          )}

          {/* Product Screenshots Gallery */}
          {selectedDeal.screenshots && selectedDeal.screenshots.length > 0 && (
            <div className="mt-4 flex flex-col gap-3.5">
              <span className="text-[12px] font-extrabold text-neutral-500 select-none">
                Product Screenshots
              </span>
              
              {/* Browser Window Mockup */}
              <div className="border border-neutral-200 bg-white rounded-xl overflow-hidden shadow-sm relative group flex flex-col">
                {/* Browser Window Header */}
                <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-100 bg-neutral-50/50 select-none">
                  {/* Left: Window Controls */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400/90 border border-red-500/10" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400/90 border border-amber-500/10" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/90 border border-emerald-500/10" />
                  </div>
                  
                  {/* Center: Fake Address Bar */}
                  <div className="flex-1 max-w-xs md:max-w-md mx-4 bg-white border border-neutral-200 rounded px-2 py-0.5 text-center text-[10.5px] text-neutral-500 font-medium truncate select-none shadow-sm">
                    {selectedDeal.websiteUrl?.replace('https://', '') || 'workspace.app'}
                  </div>
                  
                  {/* Right: Counter */}
                  <div className="w-12 shrink-0 flex justify-end">
                    <span className="text-[10px] font-bold text-neutral-400">
                      {activeScreenshotIdx + 1} / {selectedDeal.screenshots.length}
                    </span>
                  </div>
                </div>
                
                {/* Browser Body / Image Display */}
                <div 
                  onClick={() => setLightboxOpen(true)}
                  className="relative aspect-[16/10] w-full bg-neutral-900 cursor-zoom-in overflow-hidden flex items-center justify-center group/img"
                >
                  <img
                    src={selectedDeal.screenshots[activeScreenshotIdx].url}
                    alt={selectedDeal.screenshots[activeScreenshotIdx].caption}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover/img:scale-[1.01]"
                  />
                  
                  {/* Navigation Arrows */}
                  {selectedDeal.screenshots.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveScreenshotIdx((prev) => (prev === 0 ? selectedDeal.screenshots!.length - 1 : prev - 1));
                        }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 border border-neutral-200 shadow flex items-center justify-center cursor-pointer text-neutral-800 hover:bg-white hover:text-black opacity-0 group-hover:opacity-100 transition-all duration-200"
                        title="Previous screenshot"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveScreenshotIdx((prev) => (prev === selectedDeal.screenshots!.length - 1 ? 0 : prev + 1));
                        }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 border border-neutral-200 shadow flex items-center justify-center cursor-pointer text-neutral-800 hover:bg-white hover:text-black opacity-0 group-hover:opacity-100 transition-all duration-200"
                        title="Next screenshot"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                      </button>
                    </>
                  )}
                  
                  {/* Click to Zoom Hint Overlay */}
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 hover:opacity-100 duration-200 select-none">
                    <span className="px-3 py-1 bg-black/80 text-white font-bold text-[10px] rounded-full shadow-lg flex items-center gap-1 border border-white/10">
                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M8 11h6"/><path d="M11 8v6"/></svg>
                      <span>Click to Zoom</span>
                    </span>
                  </div>
                </div>
                
                {/* Caption Bar */}
                <div className="bg-neutral-50 px-4 py-2.5 border-t border-neutral-100 flex items-start gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-neutral-500 shrink-0 mt-0.5"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                  <span className="text-[12.5px] text-neutral-700 leading-normal font-medium">
                    {selectedDeal.screenshots[activeScreenshotIdx].caption}
                  </span>
                </div>
              </div>

              {/* Dots indicator at the bottom */}
              {selectedDeal.screenshots.length > 1 && (
                <div className="flex justify-center items-center gap-1.5 mt-1 select-none">
                  {selectedDeal.screenshots.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveScreenshotIdx(idx)}
                      className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-200 border-none p-0 ${
                        activeScreenshotIdx === idx
                          ? 'bg-black scale-110'
                          : 'bg-neutral-300 hover:bg-neutral-400'
                      }`}
                      aria-label={`Go to screenshot ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Section 3: Daily Workflows */}
        <div id="day-to-day-sec" className="py-6 border-b border-neutral-100 flex flex-col gap-6 scroll-mt-32">
          <div>
            <h3 className="text-lg font-bold text-neutral-900">Daily Workflows</h3>
            <p className="text-[13.5px] text-black mt-1.5 leading-relaxed font-normal">
              {details.dayToDay}
            </p>
          </div>

          {details.dayToDayPillars && details.dayToDayPillars.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-1">
              {details.dayToDayPillars.map((pillar, idx) => (
                <div key={idx} className="p-4 border border-neutral-200 bg-neutral-50/10 rounded-xl flex flex-col gap-2.5 hover:shadow-[var(--shadow-sm)] transition-shadow">
                  <div className="text-neutral-800 select-none">
                    {renderPillarIcon(pillar.emoji)}
                  </div>
                  <span className="font-bold text-[13.5px] text-neutral-950">{pillar.title}</span>
                  <p className="text-[12px] text-neutral-900 leading-relaxed font-normal">{pillar.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section 4: Free vs Paid Tier Comparison */}
        <div id="plans-sec" className="py-6 flex flex-col gap-5 scroll-mt-32">
          <div>
            <h3 className="text-lg font-bold text-neutral-900">Free vs Paid Tier Comparison</h3>
            <p className="text-[13px] text-black mt-1 leading-normal">
              Know why upgrading to a paid startup tier makes sense for your velocity.
            </p>
          </div>

          {details.freeVsPaid && details.freeVsPaid.length > 0 && (
            <div className="border border-neutral-200 rounded-xl overflow-hidden shadow-inner">
              <table className="w-full text-[13px] text-left border-collapse bg-white">
                <thead>
                  <tr className="bg-neutral-50/80 border-b border-neutral-200 font-bold text-neutral-800 select-none">
                    <th className="p-3.5 pl-4">Feature</th>
                    <th className="p-3.5">Free Plan</th>
                    <th className="p-3.5 pr-4 text-emerald-800 bg-emerald-50/10">Paid Startup Offer</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 font-medium">
                  {details.freeVsPaid.map((item, idx) => (
                    <tr key={idx} className="hover:bg-neutral-50/20">
                      <td className="p-3.5 pl-4 font-bold text-neutral-900">{item.feature}</td>
                      <td className="p-3.5 text-neutral-900">{item.free}</td>
                      <td className="p-3.5 pr-4 text-emerald-700 font-semibold bg-emerald-50/5">{item.paid}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </>
    );

    const renderReviewsAndFAQsContent = () => (
      <>
        {/* Section 5: G2 Verified Reviews */}
        <div id="reviews-sec" className="py-6 flex flex-col gap-5 scroll-mt-32 w-full">
          <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
            <div className="flex items-center gap-3">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 shadow-sm rounded-full">
                <circle cx="16" cy="16" r="16" fill="url(#g2Gradient)" />
                <defs>
                  <linearGradient id="g2Gradient" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FF492C" />
                    <stop stopColor="#D83018" />
                  </linearGradient>
                </defs>
                <text x="50%" y="58%" dominantBaseline="middle" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="-0.5">G2</text>
              </svg>
              <div>
                <h3 className="text-lg font-bold text-neutral-900 leading-none">G2 Verified Reviews</h3>
                <p className="text-[13px] text-black mt-1.5 leading-normal font-normal">
                  Real experiences from startup founders and tech leaders.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 bg-[#FF492C]/5 px-3 py-1.5 rounded-full border border-[#FF492C]/10">
              <span className="text-[#FF492C] font-black text-xs">G2 Rating</span>
              <span className="text-neutral-900 font-extrabold text-xs">4.7 / 5</span>
            </div>
          </div>

          {details.g2Reviews && details.g2Reviews.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {details.g2Reviews.map((rev, idx) => (
                <div key={idx} className="p-4 border border-neutral-200 rounded-xl bg-neutral-50/10 flex flex-col justify-between gap-3">
                  <div className="flex justify-between items-start flex-wrap gap-2">
                    <div>
                      <span className="block text-[13px] font-bold text-neutral-900">{rev.author}</span>
                      <span className="block text-[11.5px] text-neutral-800 font-normal">{rev.companySize}</span>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <div className="flex text-amber-400 select-none">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg key={i} className={`w-3.5 h-3.5 ${i < Math.floor(rev.rating) ? 'fill-current' : 'stroke-current fill-none'}`} viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                        ))}
                      </div>
                      <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full select-none">✓ Verified Reviewer</span>
                    </div>
                  </div>

                  <div className="text-[13px] font-bold text-neutral-900 mt-1">"{rev.title}"</div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2.5 border-t border-neutral-100">
                    <div>
                      <span className="block text-[11.5px] font-bold text-emerald-800">Pros</span>
                      <span className="block text-black mt-0.5 font-normal">{rev.pros}</span>
                    </div>
                    <div>
                      <span className="block text-[11.5px] font-bold text-rose-800">Cons</span>
                      <span className="block text-black mt-0.5 font-normal">{rev.cons}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-neutral-450 italic text-[13px] py-4 text-center">No G2 reviews available for this vendor.</div>
          )}
        </div>

        {/* Section 6: FAQs */}
        <div id="faqs-sec" className="py-6 flex flex-col gap-4 scroll-mt-32 w-full">
          <h3 className="text-lg font-bold text-neutral-900">Frequently Asked Questions</h3>
          
          {details.faqs && details.faqs.length > 0 ? (
            <div className="divide-y divide-neutral-200 border-t border-b border-neutral-200 mt-2">
              {details.faqs.map((faq, idx) => (
                <details key={idx} className="group py-4 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex justify-between items-center font-bold text-[13.5px] text-black cursor-pointer list-none hover:text-neutral-800 transition-colors focus:outline-none">
                    <span>{faq.q}</span>
                    <svg className="w-4.5 h-4.5 text-neutral-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
                  </summary>
                  <div className="pt-3 text-[13px] text-black leading-relaxed font-normal">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          ) : (
            <p className="text-neutral-700 italic text-[13px] text-center py-2">No FAQs available.</p>
          )}
        </div>
      </>
    );

    const renderPlatformSummaryCard = (isEditorial: boolean = false) => (
      <div className={`p-6 ${
        isEditorial
          ? "border-t border-b border-neutral-200 md:border-l-2 md:border-t-0 md:border-b-0 md:border-r-0 md:border-[#AB342B] bg-[#F8F8EE] rounded-none shadow-none"
          : "border border-neutral-200 bg-neutral-50 rounded-2xl shadow-md"
      } flex flex-col gap-5 select-none`}>
        <div className="flex items-center gap-3.5 pb-4 border-b border-neutral-100">
          <CompanyLogo src={selectedDeal.logoUrl} name={selectedDeal.vendorName} size="lg" className="!w-12 !h-12 p-1.5 bg-white shadow-sm shrink-0" />
          <div>
            <h4 className="text-[16px] font-bold text-neutral-900 leading-none">{selectedDeal.vendorName}</h4>
            <span className="text-[12px] text-neutral-700 font-semibold block mt-1.5">{selectedDeal.category} Startup Benefit</span>
          </div>
        </div>

        {/* Real Data Details */}
        <div className="flex flex-col gap-3 py-1 text-[13px]">
          <div className="flex justify-between items-center pb-2.5 border-b border-neutral-100">
            <span className="text-neutral-800 font-medium">Startup Offer</span>
            <span className="text-emerald-800 font-extrabold">{details.startupOffer}</span>
          </div>
          <div className="flex justify-between items-center pb-2.5 border-b border-neutral-100">
            <span className="text-neutral-800 font-medium">Eligible Plans</span>
            <span className="text-neutral-900 font-bold">{details.eligiblePlans}</span>
          </div>
          <div className="flex justify-between items-center pb-2.5 border-b border-neutral-100">
            <span className="text-neutral-800 font-medium">Duration</span>
            <span className="text-neutral-900 font-bold">{details.durationLimit}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-neutral-800 font-medium">User Seat Cap</span>
            <span className="text-neutral-900 font-bold">{details.userLimit}</span>
          </div>
        </div>

        {/* Primary Claim Action Button */}
        <div className="flex flex-col gap-2 mt-2">
          {selectedDeal.isLocked ? (
            <div className="w-full py-3 bg-neutral-50 text-neutral-700 border border-neutral-200 font-bold text-[13px] rounded-full text-center select-none flex items-center justify-center gap-1.5 shadow-inner">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="shrink-0"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              <span>Benefit Locked</span>
            </div>
          ) : selectedDeal.status === 'available' ? (
            <button
              onClick={() => handleClaimClick(selectedDeal.id)}
              className="w-full py-3 bg-[#C8102E] hover:bg-[#AE0E28] text-white font-extrabold text-[13.5px] rounded-full cursor-pointer transition-colors shadow-md text-center flex items-center justify-center"
            >
              <span>Claim {selectedDeal.vendorName} Offer</span>
            </button>
          ) : (
            <button
              onClick={() => setRedemptionDealId(selectedDeal.id)}
              className="w-full py-3 bg-white border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 text-neutral-800 font-bold text-[13.5px] rounded-full text-center cursor-pointer transition-colors flex items-center justify-center shadow-sm"
            >
              <span>View Claim</span>
            </button>
          )}
        </div>
      </div>
    );

    const outerContainerClass = layoutOption === 'flat-sticky'
      ? "flex-1 flex flex-col animate-fadeIn font-sans select-none w-full bg-white"
      : "flex-1 flex flex-col gap-6 py-2 animate-fadeIn font-sans select-none max-w-6xl mx-auto w-full";

    return (
      <div className={outerContainerClass}>
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
        
        {/* Back navigation switcher wrapper (only rendered when not using flat-sticky layout) */}
        {layoutOption !== 'flat-sticky' && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 w-full">
            <button
              onClick={() => setSelectedDealId(null)}
              className="flex items-center gap-1.5 text-[14px] font-bold text-neutral-800 hover:text-black cursor-pointer group transition-colors"
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
        )}

        {/* Option 1: Contained Card Layout */}
        {layoutOption === 'contained' && (
          <div className="bg-white border border-[var(--border-subtle)] rounded-2xl p-6 md:p-8 shadow-sm flex flex-col gap-6 animate-scaleIn mt-2">
            {/* Premium Visual Summary Hero Card */}
            <div ref={heroRef} className="relative bg-white text-neutral-900 pb-6 border-b border-neutral-200 flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div className="flex items-start gap-5 relative z-10 w-full">
                <CompanyLogo
                  src={selectedDeal.logoUrl}
                  name={selectedDeal.vendorName}
                  size="lg"
                  className="!w-16 !h-16 shrink-0 bg-white p-1.5 shadow-sm"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-neutral-900 leading-none">
                      {selectedDeal.vendorName}
                    </h1>

                    {/* Accel Verified Benefit Icon */}
                    <div className="relative group flex items-center cursor-help">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 drop-shadow-sm">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="url(#shield3dGrad)" />
                        <path d="m9 11 2 2 4-4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-neutral-950 text-white text-[12px] rounded-lg p-3 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none z-50 leading-relaxed font-normal normal-case">
                        <span className="block font-bold text-[12.5px] text-emerald-400 mb-1">Accel Verified Benefit</span>
                        Vetted by Accel portfolio operations. Direct partner desk escalation is guaranteed.
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-b-neutral-950"></div>
                      </div>
                    </div>
                    
                    {selectedDeal.status !== 'available' && (
                      <span className="px-2 py-0.5 text-[9px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200 rounded select-none animate-fadeIn">
                        Claimed
                      </span>
                    )}

                    {selectedDeal.isNew && (
                      <span className="px-2 py-0.5 text-[9px] font-extrabold bg-[#D97706] text-white rounded select-none">
                        New
                      </span>
                    )}
                  </div>
                  <p className="text-[14px] font-medium text-neutral-900 mt-2">
                    {selectedDeal.title} — Claim exclusive startup pricing
                  </p>

                  <div className="mt-4">
                    {selectedDeal.isLocked ? (
                      <span className="inline-flex px-4 py-2 bg-neutral-50 text-neutral-450 border border-neutral-200 text-[12.5px] font-bold rounded-lg items-center gap-1.5 select-none shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="shrink-0"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                        <span>Benefit Locked</span>
                      </span>
                    ) : selectedDeal.status === 'available' ? (
                      <button
                        onClick={() => handleClaimClick(selectedDeal.id)}
                        className="inline-flex px-4 py-2 bg-[#C8102E] hover:bg-[#AE0E28] text-white font-extrabold text-[12.5px] rounded-lg cursor-pointer transition-colors shadow-sm items-center"
                      >
                        <span>Claim Benefit</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => setRedemptionDealId(selectedDeal.id)}
                        className="inline-flex px-4 py-2 bg-white border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 text-neutral-800 text-[12.5px] font-bold rounded-lg items-center cursor-pointer transition-colors shadow-sm"
                      >
                        <span>View Claim</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Horizontal Anchor Navigation */}
            {showAnchorNav && (
              <div className="sticky -top-4 lg:-top-6 z-20 flex gap-2 py-3 px-4 lg:px-6 bg-white/95 backdrop-blur border-b border-neutral-200 overflow-x-auto scrollbar-none select-none -mx-4 lg:-mx-6 animate-fadeIn transition-all duration-300">
                {[
                  { id: 'claiming-sec', label: 'Eligibility' },
                  { id: 'overview-sec', label: 'Overview' },
                  { id: 'day-to-day-sec', label: 'Daily Workflows' },
                  { id: 'plans-sec', label: 'Free vs Paid' }
                ].map(sec => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(sec.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className="px-4 py-1.5 text-xs font-bold text-neutral-800 hover:text-black border border-neutral-200 bg-white hover:border-black rounded-full transition-all whitespace-nowrap shadow-sm"
                  >
                    {sec.label}
                  </a>
                ))}
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              {/* Left Column (col-span-2) */}
              <div className="lg:col-span-2 flex flex-col gap-0">
                {renderLeftColumnContent()}
              </div>

              {/* Right Column */}
              <div className="lg:col-span-1 flex flex-col gap-6 lg:sticky lg:top-14 h-fit">
                {renderPlatformSummaryCard(false)}
              </div>
            </div>

            {renderReviewsAndFAQsContent()}
          </div>
        )}

        {/* Option 2: Flat Full-Width Layout (Sticky Hero & Nav) */}
        {layoutOption === 'flat-sticky' && (
          <div className="flex flex-col w-full bg-white select-none animate-fadeIn">
            {/* Sticky Header Wrapper */}
            <div className={`sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-neutral-200 transition-all duration-300 ${
              isCompact ? 'shadow-sm pt-2.5 pb-0' : 'shadow-none py-5'
            }`}>
              <div className="max-w-6xl mx-auto w-full px-6 flex flex-col transition-all duration-300" style={{ gap: isCompact ? '10px' : '16px' }}>
                {/* Back to Deals button inside hero section - Hidden on scroll */}
                <div className={`transition-all duration-300 ${
                  isCompact 
                    ? 'max-h-0 opacity-0 overflow-hidden pointer-events-none pb-0' 
                    : 'max-h-10 opacity-100 pb-1'
                }`}>
                  <button
                    onClick={() => setSelectedDealId(null)}
                    className="flex items-center gap-1.5 text-[13.5px] font-bold text-neutral-600 hover:text-black cursor-pointer group transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
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
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 min-w-0">
                    <CompanyLogo
                      src={selectedDeal.logoUrl}
                      name={selectedDeal.vendorName}
                      className={`shrink-0 bg-white shadow-sm rounded-xl transition-all duration-300 ${
                        isCompact ? '!w-8 !h-8 p-0.5' : '!w-14 !h-14 p-1.5'
                      }`}
                      size={isCompact ? 'sm' : 'lg'}
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <h1 className={`font-extrabold text-neutral-900 leading-none truncate transition-all duration-300 ${
                          isCompact ? 'text-md md:text-lg' : 'text-xl md:text-2xl'
                        }`}>
                          {selectedDeal.vendorName}
                        </h1>
                        {isCompact && (
                          <span className="text-neutral-400 font-medium text-[12.5px] select-none">—</span>
                        )}
                        {isCompact && (
                          <span className="text-neutral-600 font-bold text-[12.5px] truncate max-w-xs md:max-w-md">
                            {selectedDeal.title}
                          </span>
                        )}
                        {selectedDeal.status !== 'available' && (
                          <span className="px-1.5 py-0.5 text-[8.5px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200 rounded shrink-0">Claimed</span>
                        )}
                      </div>
                      {!isCompact && (
                        <p className="font-medium text-neutral-600 truncate mt-1.5 text-[13px] transition-all duration-300">
                          {selectedDeal.title}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="shrink-0 flex items-center gap-3">
                    {selectedDeal.isLocked ? (
                      <span className={`inline-flex bg-neutral-50 text-neutral-450 border border-neutral-200 font-bold rounded-lg items-center gap-1.5 shadow-sm transition-all duration-300 ${
                        isCompact ? 'px-4 py-2 text-[12px]' : 'px-5.5 py-2.5 text-[13.5px]'
                      }`}>Benefit Locked</span>
                    ) : selectedDeal.status === 'available' ? (
                      <button
                        onClick={() => handleClaimClick(selectedDeal.id)}
                        className={`bg-[#C8102E] hover:bg-[#AE0E28] text-white font-extrabold rounded-lg transition-all duration-300 shadow-sm cursor-pointer border-none ${
                          isCompact ? 'px-5 py-2 text-[13px]' : 'px-6 py-2.5 text-[14.5px]'
                        }`}
                      >
                        Claim Benefit
                      </button>
                    ) : (
                      <button
                        onClick={() => setRedemptionDealId(selectedDeal.id)}
                        className={`bg-white border border-neutral-200 hover:bg-neutral-50 text-neutral-800 font-bold rounded-lg transition-all duration-300 shadow-sm cursor-pointer ${
                          isCompact ? 'px-5 py-2 text-[13px]' : 'px-6 py-2.5 text-[14.5px]'
                        }`}
                      >
                        View Claim
                      </button>
                    )}
                  </div>
                </div>

                {/* Navigation Bar - Shown only when scrolled (isCompact === true) */}
                <div className={`flex gap-6 overflow-x-auto scrollbar-none select-none transition-all duration-300 origin-top ${
                  isCompact 
                    ? 'max-h-14 opacity-100 mt-2.5 pt-2' 
                    : 'max-h-0 opacity-0 mt-0 pt-0 overflow-hidden pointer-events-none'
                }`}>
                  {[
                    { id: 'claiming-sec', label: 'Eligibility' },
                    { id: 'overview-sec', label: 'Overview' },
                    { id: 'day-to-day-sec', label: 'Daily Workflows' },
                    { id: 'plans-sec', label: 'Free vs Paid' },
                    { id: 'reviews-sec', label: 'Reviews' }
                  ].map(sec => {
                    const isActive = activeSection === sec.id;
                    return (
                      <a
                        key={sec.id}
                        href={`#${sec.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          document.getElementById(sec.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }}
                        className={`relative pb-2 text-[14px] font-bold transition-all whitespace-nowrap border-b-[3px] -mb-[1px] ${
                          isActive 
                            ? 'text-neutral-900 font-extrabold border-neutral-900 animate-scaleIn' 
                            : 'text-neutral-500 hover:text-neutral-900 border-transparent hover:border-neutral-300'
                        }`}
                      >
                        {sec.label}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Flat Content List (Single column layout) */}
            <div 
              className="max-w-6xl mx-auto w-full px-6 py-8 flex flex-col gap-0 bg-white transition-all duration-300"
              style={{ paddingTop: isCompact ? 'calc(2rem + 35px)' : '2rem' }}
            >
              {renderLeftColumnContent()}
              {renderReviewsAndFAQsContent()}
            </div>
          </div>
        )}

        {/* Option 3: Editorial Hybrid Layout (Recommended Premium Option) */}
        {layoutOption === 'hybrid' && (
          <div className="flex flex-col w-full bg-white select-none animate-fadeIn mt-2 border border-neutral-200 rounded-2xl overflow-hidden shadow-sm">
            {/* Dark Brand Editorial Header Band */}
            <div className="relative bg-[#191816] text-white px-8 py-10 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-neutral-800">
              {/* Radial backdrop highlight */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(200,16,46,0.1),transparent_60%)] pointer-events-none" />
              
              <div className="flex items-start gap-5 relative z-10 w-full">
                <CompanyLogo
                  src={selectedDeal.logoUrl}
                  name={selectedDeal.vendorName}
                  size="lg"
                  className="!w-16 !h-16 shrink-0 bg-white p-1.5 shadow-md rounded-xl"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h1 className="text-3xl font-extrabold tracking-tight text-white leading-none font-serif">
                      {selectedDeal.vendorName}
                    </h1>

                    <span className="px-2 py-0.5 text-[9px] font-extrabold bg-[#AB342B] text-white rounded select-none">
                      {selectedDeal.category} Benefit
                    </span>

                    {selectedDeal.status !== 'available' && (
                      <span className="px-2 py-0.5 text-[9px] font-extrabold bg-emerald-950/80 text-emerald-400 border border-emerald-900 rounded select-none animate-fadeIn">
                        ✓ Claimed
                      </span>
                    )}
                  </div>
                  <p className="text-[14px] font-medium text-neutral-300 mt-2.5 max-w-2xl leading-relaxed">
                    {selectedDeal.title} — Vetted startup program details and billing waivers.
                  </p>
                </div>
              </div>

              {/* Action Button inside dark band */}
              <div className="relative z-10 shrink-0 self-start md:self-center">
                {selectedDeal.isLocked ? (
                  <span className="inline-flex px-5 py-2.5 bg-neutral-800 text-neutral-450 border border-neutral-700 text-[13px] font-bold rounded-lg items-center gap-1.5 select-none shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="shrink-0"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    <span>Benefit Locked</span>
                  </span>
                ) : selectedDeal.status === 'available' ? (
                  <button
                    onClick={() => handleClaimClick(selectedDeal.id)}
                    className="inline-flex px-5 py-2.5 bg-[#AB342B] hover:bg-[#810100] text-white font-extrabold text-[13.5px] rounded-lg cursor-pointer transition-colors shadow-md items-center"
                  >
                    <span>Claim Benefit</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setRedemptionDealId(selectedDeal.id)}
                    className="inline-flex px-5 py-2.5 bg-neutral-800 border border-neutral-700 hover:bg-neutral-700 text-neutral-200 text-[13px] font-bold rounded-lg items-center cursor-pointer transition-colors shadow-sm"
                  >
                    <span>View Claim</span>
                  </button>
                )}
              </div>
            </div>

            {/* Scroll Navigation Header (Sticky on Scroll) */}
            <div className="sticky top-0 z-25 bg-white/95 backdrop-blur border-b border-neutral-200 px-8 py-3.5 flex gap-2 overflow-x-auto scrollbar-none select-none shadow-sm">
              {[
                { id: 'claiming-sec', label: 'Eligibility' },
                { id: 'overview-sec', label: 'Overview' },
                { id: 'day-to-day-sec', label: 'Daily Workflows' },
                { id: 'plans-sec', label: 'Free vs Paid' },
                { id: 'reviews-sec', label: 'Reviews' },
                { id: 'faqs-sec', label: 'FAQs' }
              ].map(sec => (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(sec.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="px-3.5 py-1.5 text-xs font-bold text-neutral-800 hover:text-black border border-neutral-200 bg-white hover:border-black rounded-full transition-all whitespace-nowrap shadow-sm"
                >
                  {sec.label}
                </a>
              ))}
            </div>

            {/* Content Body Grid */}
            <div className="px-8 py-8 flex flex-col gap-6 bg-white">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Left Column (col-span-2) */}
                <div className="lg:col-span-2 flex flex-col gap-0">
                  {renderLeftColumnContent()}
                </div>

                {/* Right Column: Editorial Sticky summary card */}
                <div className="lg:col-span-1 flex flex-col gap-6 lg:sticky lg:top-16 h-fit">
                  {renderPlatformSummaryCard(true)}
                </div>
              </div>

              {renderReviewsAndFAQsContent()}
            </div>
          </div>
        )}

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
                  <span className="text-[11px] font-bold text-neutral-400 block">Open Source Repository</span>
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
                  <span className="text-emerald-500 font-bold text-[10px]">Active Sandbox</span>
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
                  handleClaimClick(selectedDeal.id);
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

        {renderRedemptionModal()}

        {/* Lightbox Modal for Screenshots */}
        {selectedDeal.screenshots && selectedDeal.screenshots.length > 0 && (
          <Modal open={lightboxOpen} onOpenChange={setLightboxOpen}>
            <ModalContent className="max-w-6xl border border-neutral-800 bg-neutral-950 text-white rounded-2xl p-0 overflow-hidden shadow-2xl relative">
              {/* Image Container */}
              <div className="relative w-full h-[75vh] bg-black flex items-center justify-center select-none">
                <img
                  src={selectedDeal.screenshots[activeScreenshotIdx].url}
                  alt={selectedDeal.screenshots[activeScreenshotIdx].caption}
                  className="max-w-full max-h-full object-contain animate-fadeIn"
                />
                
                {/* Full Screen Nav Arrows (overlay style) */}
                {selectedDeal.screenshots.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveScreenshotIdx((prev) => (prev === 0 ? selectedDeal.screenshots!.length - 1 : prev - 1));
                      }}
                      className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center cursor-pointer text-white transition-all shadow-lg"
                      title="Previous screenshot"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveScreenshotIdx((prev) => (prev === selectedDeal.screenshots!.length - 1 ? 0 : prev + 1));
                      }}
                      className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center cursor-pointer text-white transition-all shadow-lg"
                      title="Next screenshot"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                    </button>
                  </>
                )}
              </div>
              
              {/* Caption/Control Bar at the bottom */}
              <div className="bg-neutral-900 border-t border-neutral-800 px-6 py-4 flex items-center justify-between gap-4 select-none">
                <div className="flex-1">
                  <span className="text-[11px] text-neutral-400 block font-bold">Screenshot {activeScreenshotIdx + 1} of {selectedDeal.screenshots.length}</span>
                  <span className="text-[13.5px] text-white block mt-1 font-medium">{selectedDeal.screenshots[activeScreenshotIdx].caption}</span>
                </div>
                
                <button
                  onClick={() => setLightboxOpen(false)}
                  className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700 rounded-lg text-xs font-bold cursor-pointer transition-colors shadow-sm"
                >
                  Close Preview
                </button>
              </div>
            </ModalContent>
          </Modal>
        )}
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
        <div className={`grid gap-4 animate-slideInUp stagger-1 ${
          gridCols === 1 || gridCols === '1-row'
            ? 'grid-cols-1 w-full'
            : gridCols === 2 || gridCols === '2-row'
            ? 'grid-cols-1 md:grid-cols-2'
            : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        }`}>
          {filteredDeals.map((deal) => {
            const isRowLayout = gridCols === '1-row' || gridCols === '2-row';
            return (
              <Card
                key={deal.id}
                onClick={() => setSelectedDealId(deal.id)}
                className="relative flex flex-col justify-between hover:shadow-[var(--shadow-md)] hover:-translate-y-0.5 transition-all cursor-pointer border border-[var(--border-subtle)] !bg-white rounded-[12px] p-4"
              >
                {deal.isNew && (
                  <span className="absolute -top-1.5 -right-1.5 px-2.5 py-0.5 text-[10px] font-bold bg-[#D97706] text-white rounded-full shadow-sm select-none z-10">
                    New
                  </span>
                )}
                {/* Card Body */}
                <div className="flex-1 flex flex-col gap-3">
                  {isRowLayout ? (
                    <>
                      <div className="flex items-center gap-3">
                        <CompanyLogo
                          src={deal.logoUrl}
                          name={deal.vendorName}
                          className="!w-12 !h-12 shrink-0"
                        />
                        <h3 className="text-[20px] font-extrabold text-[var(--text-primary)] leading-none">
                          {deal.vendorName}
                        </h3>
                      </div>
                      <p className="text-[14px] text-[var(--text-muted)] line-clamp-2 leading-relaxed mt-1">
                        {deal.description}
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between items-start gap-2">
                        <CompanyLogo
                          src={deal.logoUrl}
                          name={deal.vendorName}
                          className="!w-12 !h-12 shrink-0"
                        />
                      </div>
                      <div>
                        <h3 className="text-[20px] font-extrabold text-[var(--text-primary)] leading-none">
                          {deal.vendorName}
                        </h3>
                        <p className="text-[14px] text-[var(--text-muted)] mt-2 line-clamp-2 leading-relaxed">
                          {deal.description}
                        </p>
                      </div>
                    </>
                  )}
                </div>

                {/* Card Footer */}
                <div className="flex justify-between items-center pt-3 border-t border-neutral-100 mt-3 shrink-0">
                  <span className="text-[14px] font-bold text-[var(--text-primary)]">
                    {deal.variations && deal.variations.length > 1 ? `Up to ${deal.value}` : deal.value}
                  </span>

                  {deal.isLocked ? (
                    <span className="px-4 py-1.5 bg-neutral-100 text-neutral-450 border border-neutral-200 text-xs font-bold rounded-full flex items-center gap-1 shadow-inner select-none shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="shrink-0"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                      <span>Locked</span>
                    </span>
                  ) : deal.status === 'available' ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClaimClick(deal.id);
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
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col gap-2.5 animate-slideInUp stagger-1">
          {filteredDeals.map((deal) => (
            <div
              key={deal.id}
              onClick={() => setSelectedDealId(deal.id)}
              className="relative flex items-center justify-between p-3 border border-[var(--border-subtle)] hover:border-black rounded-[12px] !bg-white hover:shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all cursor-pointer"
            >
              {deal.isNew && (
                <span className="absolute -top-1.5 -right-1.5 px-2.5 py-0.5 text-[10px] font-bold bg-[#D97706] text-white rounded-full shadow-sm select-none z-10">
                  New
                </span>
              )}
              {/* Column 1: Logo + Vendor Name */}
              <div className="w-1/3 min-w-[220px] flex items-center gap-3.5 shrink-0">
                <CompanyLogo
                  src={deal.logoUrl}
                  name={deal.vendorName}
                  className="!w-12 !h-12 shrink-0"
                />
                <div className="min-w-0">
                  <h3 className="text-[16px] font-extrabold text-[var(--text-primary)] truncate">
                    {deal.vendorName}
                  </h3>
                </div>
              </div>

              {/* Column 2: Description */}
              <div className="flex-1 min-w-0 px-4">
                <p className="text-[14px] text-[var(--text-muted)] line-clamp-2 leading-relaxed">
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
                  {deal.isLocked ? (
                    <span className="px-4 py-1.5 bg-neutral-100 text-neutral-450 border border-neutral-200 text-xs font-bold rounded-full flex items-center gap-1 shadow-inner select-none shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="shrink-0"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                      <span>Locked</span>
                    </span>
                  ) : deal.status === 'available' ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClaimClick(deal.id);
                      }}
                      className="px-5 py-2 bg-[#C8102E] hover:bg-[#AE0E28] text-white font-bold text-[14px] rounded-full cursor-pointer transition-colors shadow-sm text-center"
                    >
                      <span>Claim</span>
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
      {renderRedemptionModal()}
    </div>
  );
}
