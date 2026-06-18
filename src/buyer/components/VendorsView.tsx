import * as React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter, Badge, SearchInput, Input, FormField, Textarea, Modal, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalBody, ModalFooter, useToast } from '../../design-system/components';
import { Vendor, VendorCategory } from '../types';
import { CompanyLogo } from './CompanyLogo';
// @ts-ignore
import siddharthAvatar from './siddharth_avatar.png';

interface FAQ {
  q: string;
  a: string;
}

interface PdfCarouselProps {
  pdfUrl: string;
}

const PdfCarousel: React.FC<PdfCarouselProps> = ({ pdfUrl }) => {
  const [pdf, setPdf] = React.useState<any>(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const [scriptLoaded, setScriptLoaded] = React.useState(false);

  // Load PDF.js script
  React.useEffect(() => {
    if ((window as any).pdfjsLib) {
      setScriptLoaded(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js';
    script.async = true;
    script.onload = () => {
      // Configure worker
      (window as any).pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';
      setScriptLoaded(true);
    };
    document.body.appendChild(script);
  }, []);

  // Load PDF document
  React.useEffect(() => {
    if (!scriptLoaded) return;
    setLoading(true);
    const loadingTask = (window as any).pdfjsLib.getDocument(pdfUrl);
    loadingTask.promise.then(
      (loadedPdf: any) => {
        setPdf(loadedPdf);
        setTotalPages(loadedPdf.numPages);
        setCurrentPage(1);
        setLoading(false);
      },
      (error: any) => {
        console.error('Error loading PDF:', error);
        setLoading(false);
      }
    );
  }, [pdfUrl, scriptLoaded]);

  // Render current page
  React.useEffect(() => {
    if (!pdf) return;
    pdf.getPage(currentPage).then((page: any) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const context = canvas.getContext('2d');
      if (!context) return;

      const viewport = page.getViewport({ scale: 1.5 });
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };
      page.render(renderContext);
    });
  }, [pdf, currentPage]);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  if (loading) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center bg-neutral-50 rounded-xl border border-neutral-200">
        <div className="flex flex-col items-center gap-3">
          <svg className="animate-spin h-8 w-8 text-[#C8102E]" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span className="text-[13px] font-bold text-neutral-550">Loading Brochure...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 items-center w-full">
      <div className="w-full border border-neutral-200 rounded-xl overflow-hidden shadow-sm bg-neutral-50 flex justify-center p-4">
        <canvas ref={canvasRef} className="max-w-full max-h-[500px] h-auto object-contain mx-auto shadow-sm bg-white block" />
      </div>
      
      {/* Carousel Controls */}
      <div className="flex items-center gap-4">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="p-2 rounded-lg border border-neutral-300 bg-white hover:border-black disabled:opacity-40 disabled:hover:border-neutral-300 cursor-pointer transition-colors"
        >
          <svg className="w-4 h-4 text-neutral-850" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </button>
        <span className="text-[13px] font-extrabold text-neutral-850 select-none">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg border border-neutral-300 bg-white hover:border-black disabled:opacity-40 disabled:hover:border-neutral-300 cursor-pointer transition-colors"
        >
          <svg className="w-4 h-4 text-neutral-850" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    </div>
  );
};

interface ClientProject {
  logoUrl?: string;
  name: string;
  description: string;
  highlight: string;
}

interface Review {
  author: string;
  role: string;
  company: string;
  rating: number;
  title: string;
  content: string;
}

interface KeyContact {
  name: string;
  role: string;
  avatarUrl?: string;
  specialties: string[];
  bio: string;
}

interface VendorDetailsExtended {
  websiteUrl: string;
  linkedinUrl: string;
  twitterUrl: string;
  successStory: string;
  keyContact: KeyContact;
  reviews: Review[];
  foundedYear?: number;
  teamSize?: number;
  pocEmail?: string;
  pocPhone?: string;
  firmPhone?: string;
  vcFundsWorked?: string[];
  fundTypes?: string[];
  notableClientsPEVC?: string[];
  notableClientsDisputes?: string[];
  validityConditions?: string[];
  showcaseLinks?: { name: string; url: string }[];
}

interface VendorsViewProps {
  vendors: Vendor[];
  onFocusedVendorChange?: (vendorId: string | null) => void;
}

const vendorFAQsMap: Record<string, FAQ[]> = {
  'vendor-obvious': [
    { q: 'How does the kickoff sprint work?', a: 'We start with a 2-week discovery and prototyping phase to align on product goals, user journeys, and build interactive wireframes.' },
    { q: 'What is your typical project team size?', a: 'A standard project team consists of 1 Product Designer, 1 UX Researcher, and a part-time Design Director overseeing the sprint cycles.' },
    { q: 'Can you help set up our design operations?', a: 'Yes, we help set up Figma libraries, token systems, and design-to-development handoff workflows for your engineering team.' }
  ],
  'vendor-cyril': [
    { q: 'How long does a venture funding transaction take?', a: 'On average, a seed or Series A transaction takes 4 to 6 weeks from term sheet signing to final closing, filings, and share allocation.' },
    { q: 'Do you offer pre-packaged templates for ESOPs?', a: 'Yes, we have standard ESOP pools and vesting scheme templates that can be customized to your cap table requirements.' },
    { q: 'Can you assist with cross-border tax restructuring?', a: 'Yes, our international tax and corporate practice teams specialize in structuring holding companies across Singapore, Delaware, and India.' }
  ],
  'vendor-razorpay-capital': [
    { q: 'What are the requirements for recurring revenue financing?', a: 'Your startup needs at least 6 months of processing volume with Razorpay and a minimum of $5,000 in monthly recurring revenues.' },
    { q: 'How fast are funds disbursed?', a: 'Once approved, the funds are credited directly to your Razorpay merchant account within 24 to 48 hours without personal guarantees.' },
    { q: 'Can this be used alongside equity rounds?', a: 'Yes, revenue-based finance is non-dilutive and is often used alongside equity rounds to extend runway or fund specific customer acquisition campaigns.' }
  ],
  'vendor-codal': [
    { q: 'What hosting platforms do you support?', a: 'We are AWS Advanced Partners and have certified solutions architects for AWS, Google Cloud, and Microsoft Azure deployments.' },
    { q: 'Do you work with existing engineering teams?', a: 'Yes, we frequently co-source projects, integrating our senior engineers into your Slack, Jira, and GitHub workflows.' },
    { q: 'How do you ensure code quality?', a: 'We run automated CI/CD unit testing, conduct peer code reviews on all pull requests, and have a dedicated QA department for manual testing.' }
  ],
  'vendor-sarvaank': [
    { q: 'Who can avail of the discount offer?', a: 'All verified VC Hub members (investors, startups, founders, and portfolio companies) are eligible. This applies to both new and existing clients for new mandates.' },
    { q: 'What are the limitations of the exclusive offer?', a: 'The discount is applicable only on professional fees (excluding government, statutory, or third-party costs). The free initial consultation is limited to one 30-minute session per startup.' },
    { q: 'How long is the offer valid?', a: 'The preferential pricing and consultation offer are valid until March 31, 2027.' },
    { q: 'How do we claim the offer?', a: 'Reach out via the VC Hub / partner platform or request a direct introduction, and mention "VC Hub Member" at the time of first contact.' }
  ],
  'vendor-savanko': [
    { q: 'What is the turnaround time for a standard ESOP pool setup?', a: 'We typically complete a standard startup ESOP pool configuration and documentation rollout in 7 to 10 business days.' },
    { q: 'How does the free initial consultation work?', a: 'Startup founders recommended by Indian VCs get a free 30-minute scoping call to review cap tables, diligence readiness, or legal bottlenecks.' },
    { q: 'Do you assist with Delaware flip structuring?', a: 'Yes, we specialize in cross-border flipping, foreign entity incorporation, and corresponding compliance setups.' }
  ]
};

const vendorClientsMap: Record<string, ClientProject[]> = {
  'vendor-obvious': [
    { name: 'Swiggy', description: 'Rebuilt core checkout flows and scaled internal design system components.', highlight: '14% Checkout conversion uplift' },
    { name: 'Flipkart', description: 'Designed high-fidelity mobile search and filtered product navigation layouts.', highlight: '22% Search usage growth' },
    { name: 'Aurelia Health', description: 'Standardized patient dashboard layouts and Figma component tokens.', highlight: 'Design system completed' }
  ],
  'vendor-cyril': [
    { name: 'Aurelia Health', description: 'Series A funding transaction advisory and corporate board filings.', highlight: 'Completed transaction in under 5 weeks' },
    { name: 'Khatabook', description: 'IP structuring and trademark protection advisory.', highlight: 'Successfully filed and secured 12 core trademarks' },
    { name: 'Razorpay', description: 'Regulatory compliance audit and legal restructuring.', highlight: 'Aligned setup with RBI payment guidelines' }
  ],
  'vendor-razorpay-capital': [
    { name: 'Aurelia Health', description: 'Working capital loan of $50,000 for SaaS server expansion.', highlight: 'Disbursed in 24 hours to support holiday campaigns' },
    { name: 'Khatabook', description: 'Collateral-free bridge loan for marketing campaigns.', highlight: 'Disbursed in 24 hours to support campaign kickoff' }
  ],
  'vendor-codal': [
    { name: 'Aurelia Health', description: 'React Native mobile client MVP development and AWS deployment.', highlight: 'Launched iOS & Android apps on time' },
    { name: 'Zomato', description: 'Delivery routing API backend scaling & QA automation.', highlight: 'Improved API latency by 30% under peak loads' }
  ],
  'vendor-sarvaank': [
    { name: 'GalaxEye Space', description: 'Represented the company in its Series A venture funding transaction.', highlight: 'Venture Transaction' },
    { name: 'Snapmint', description: 'Structured corporate commercial contracts, vendor agreements, and compliance setups.', highlight: 'Compliance & Structuring' },
    { name: 'CapGrid Solutions', description: 'Advised on ESOP pool creation, cap table management, and investor documentation.', highlight: 'ESOP & Dilution Advisory' },
    { name: 'Goila Butter Chicken', description: 'Represented in debt financing and transactional structuring mandates.', highlight: 'Debt & Commercial Structuring' }
  ],
  'vendor-savanko': [
    { name: 'SaaSFlow', description: 'Represented SaaSFlow in its $15M Series A funding transaction and structured regulatory filings.', highlight: 'Closed in 4 weeks' },
    { name: 'FintechHub', description: 'Structured employee stock option pools and dilution-friendly cap table schedules.', highlight: '250+ employees onboarded' }
  ]
};

const vendorDetailsExtendedMap: Record<string, VendorDetailsExtended> = {
  'vendor-obvious': {
    websiteUrl: 'https://obvious.in',
    linkedinUrl: 'https://linkedin.com/company/obvious-in',
    twitterUrl: 'https://twitter.com/obvious_in',
    successStory: 'Obvious helped Swiggy scale their daily ordering experience from 10k orders to 1M+ orders by rebuilding their mobile design system from scratch, reducing checkout drop-off rates by 18%.',
    keyContact: {
      name: 'Rahul Gonsalves',
      role: 'Co-founder & Product Design Lead',
      specialties: ['Product Strategy', 'UI/UX Design', 'Design Systems', 'Design Operations'],
      bio: 'Rahul has over 15 years of digital design experience. He has worked with top-tier Indian startups including Flipkart, Swiggy, and Khatabook to establish scalable design operations.'
    },
    reviews: [
      {
        author: 'Sarah Jenkins',
        role: 'CEO',
        company: 'Aurelia Health',
        rating: 5,
        title: 'Outstanding design sprint execution',
        content: 'Obvious redesigned our patient dashboard in 4 weeks. Their design token systems and component library setup saved our front-end engineers weeks of layout sync work.'
      }
    ]
  },
  'vendor-cyril': {
    websiteUrl: 'https://cyrilshroff.com',
    linkedinUrl: 'https://linkedin.com/company/cyril-amarchand-mangaldas',
    twitterUrl: 'https://twitter.com/cyrilamarchand',
    successStory: 'Cyril Amarchand Mangaldas advised Aurelia Health on its Series A funding transaction, structuring terms for conflict clearance and corporate filings in under 5 weeks.',
    keyContact: {
      name: 'Anand Shroff',
      role: 'Senior Partner',
      specialties: ['Venture Capital Transactions', 'ESOP Pool Setup', 'Corporate Compliance', 'IP Law'],
      bio: 'Anand is a leading corporate attorney in India specializing in VC term sheets, tax-efficient restructuring, and regulatory filings for international holdings.'
    },
    reviews: [
      {
        author: 'Sarah Jenkins',
        role: 'CEO',
        company: 'Aurelia Health',
        rating: 4.8,
        title: 'Reliable transaction advisory and diligence support',
        content: 'The team at CAM helped us navigate complex shareholder agreements and handled our filings seamlessly. Their responsiveness was key to closing our round on time.'
      }
    ]
  },
  'vendor-razorpay-capital': {
    websiteUrl: 'https://razorpay.com',
    linkedinUrl: 'https://linkedin.com/company/razorpay',
    twitterUrl: 'https://twitter.com/razorpay',
    successStory: 'Razorpay Capital extended a collateral-free loan to Aurelia Health in 24 hours, supporting server hosting scaling before a major customer launch campaign.',
    keyContact: {
      name: 'Karan Sharma',
      role: 'Financing Specialist',
      specialties: ['Debt Financing', 'Working Capital Loans', 'Revenue-Based Finance', 'Cash Flow'],
      bio: 'Karan manages startup credit programs and partners with VC networks to extend fast-track funding to vetted high-growth companies.'
    },
    reviews: [
      {
        author: 'Sarah Jenkins',
        role: 'CEO',
        company: 'Aurelia Health',
        rating: 4.9,
        title: 'Extremely fast financing turnaround',
        content: 'Getting capital from Razorpay was hassle-free. The entire process from application to disbursement took less than two days, allowing us to capture market demand quickly.'
      }
    ]
  },
  'vendor-codal': {
    websiteUrl: 'https://codal.com',
    linkedinUrl: 'https://linkedin.com/company/codal',
    twitterUrl: 'https://twitter.com/codal',
    successStory: 'Codal helped deploy Aurelia Health’s serverless React Native app on AWS on time, scaling backend API performance and lowering server overhead by 22%.',
    keyContact: {
      name: 'Shreya Sharma',
      role: 'Portfolio Advisor',
      specialties: ['MVP Development', 'Serverless Architecture', 'API Integrations', 'QA Automation'],
      bio: 'Shreya collaborates with seed stage engineering teams to architect scalable cloud-native web backends and orchestrate AWS/GCP deployments.'
    },
    reviews: [
      {
        author: 'Sarah Jenkins',
        role: 'CEO',
        company: 'Aurelia Health',
        rating: 4.7,
        title: 'Experienced engineering partner',
        content: 'Codal operates like an extension of our team. Their sprint delivery and clear PM communication kept our mobile client roadmap on track for a successful launch.'
      }
    ]
  },
  'vendor-sarvaank': {
    websiteUrl: 'https://www.sarvaankassociates.com',
    linkedinUrl: 'https://www.linkedin.com/company/sarvaank-associates-llp/',
    twitterUrl: 'https://twitter.com',
    successStory: 'Sarvaank Associates LLP has represented various VC funds (such as Anicut Capital, Axilor Ventures, and Speciale Invest) and high-growth startups (including GalaxEye, Snapmint, and CapGrid) on end-to-end fundraising, legal compliance, and transaction support, ensuring highly compliant, scalable, and investment-ready setups.',
    keyContact: {
      name: 'Yash Vardhan Singh',
      role: 'Point of Contact / Legal Representative',
      specialties: ['Fundraising & ESOPs', 'M&A Transactions', 'Compliance', 'Disputes'],
      bio: 'Yash Vardhan Singh is the primary Point of Contact at Sarvaank Associates LLP. He specializes in private equity, venture capital transactions, corporate commercial drafting, and representing clients across regulatory and transaction setups.'
    },
    reviews: [
      {
        author: 'Ankita Singh',
        role: 'Partner',
        company: 'Sarvaank Associates LLP',
        rating: 5,
        title: 'Business-Focused Strategic Solutions',
        content: 'We believe that legal advice should enable business objectives rather than constrain them. We deliver practical, outcome-driven solutions across corporate, commercial, transactional, and dispute resolution matters.'
      }
    ],
    foundedYear: 2019,
    teamSize: 20,
    pocEmail: 'yashvardhan@sarvaankassociates.com',
    pocPhone: '+917259575614',
    firmPhone: '+918826718554',
    vcFundsWorked: [
      'Anicut Capital',
      'Axilor Ventures',
      'Speciale Invest',
      'GVFL',
      'Sattva Family Office',
      'Indian Angel Network (IAN)',
      'Haldiram Nagpur Family Office',
      'Valour Capital',
      'Jamwant Ventures',
      'Next Bharat Ventures',
      'S Angels'
    ],
    fundTypes: [
      'Family Office',
      'Micro VC',
      'Early-stage',
      'Private Equity (PE)',
      'Global Funds',
      'Angel Networks'
    ],
    notableClientsPEVC: [
      'Sattva', 'Axilor', "Haldiram's", 'Alyve Health', 'Anicut Capital', 'Fowler Westrup',
      'Next Bharat', 'Valour Capital', 'Zenwork', 'Kavachh', 'Speciale Invest', 'Navadhan',
      'GVFL', 'Airtel', 'Aimtrex', 'Jamwant Ventures', 'Grom', 'Event Graphia', 'Fragaria',
      'Crackle', 'Quickshift', 'Asha Naira', 'Techware Systems', 'enmEvil', 'Mihup',
      'Leumas', 'Awiros', 'Propelld', 'Cogos Technologies', 'iCreate', 'Salarpuria',
      'Goila Butter Chicken', 'Baty', 'S Angels', 'GalaxEye Space', 'Snapmint', 'CapGrid Solutions'
    ],
    notableClientsDisputes: [
      'Mahindra', 'HCL Infosystems', 'Vedanta', 'Dalmia Bharat Group', 'Hindustan Zinc',
      'ACC Limited', 'ICICI Bank', 'Shree Cement', 'AU Small Finance Bank', 'Ambuja Cement',
      'Pernod Ricard', 'Metso', 'Shriram General Insurance', 'Landmark Group', 'Sanghi Cement',
      'Power Grid', 'Radico', 'Emaar India', 'Philips Limited'
    ],
    validityConditions: [
      'Applicable only to verified VC Hub members (investors, startups, founders, and portfolio companies).',
      'Valid for both new and existing clients on new mandates.',
      'Discount is applicable solely on professional advisory fees.',
      'Government fees, statutory charges, and out-of-pocket expenses are excluded.',
      'Free initial consultation is limited to one 30-minute session per startup.',
      'Subject to conflict clearance and standard client onboarding checks.',
      'Preferential pricing and consultation offers are valid until March 31, 2027.'
    ],
    showcaseLinks: [
      { name: 'Alyve Health Transaction', url: 'https://www.linkedin.com/feed/update/urn:li:activity:7290578453291317761' },
      { name: 'Navadhan Capital Round', url: 'https://www.linkedin.com/feed/update/urn:li:activity:7308149555311562752/' },
      { name: 'Inspecity Space Labs Seed', url: 'https://www.linkedin.com/posts/sarvaankassociates_anicutcapital-inspecity-seedfunding-activity-7326260749616447490-mBl1?utm_source=share&utm_medium=member_desktop&rcm=ACoAAB2pKV0B5p7hF2O0rUvV79-ykjLJDn5EXlc' },
      { name: 'Goila Butter Chicken Restructuring', url: 'https://www.linkedin.com/feed/update/urn:li:activity:7358862694940119040' },
      { name: 'GoodMelts Pre-Seed', url: 'https://www.linkedin.com/feed/update/urn:li:activity:7387105065419010048/' },
      { name: 'Atmos Care (Quickshift) Deal', url: 'https://www.linkedin.com/feed/update/urn:li:activity:7404412489196630016/' },
      { name: 'CapGrid Solutions Private Limited', url: 'https://www.linkedin.com/feed/update/urn:li:activity:7295779535491317761' },
      { name: 'Fragaria Round', url: 'https://www.linkedin.com/feed/update/urn:li:activity:7384823052842364929/' },
      { name: 'GalaxEye Space Tech Series A', url: 'https://www.linkedin.com/posts/sarvaankassociates_spacetech-seriesa-startupindia-activity-7438225700232441857-D0ll/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAB2pKV0B5p7hF2O0rUvV79-ykjLJDn5EXlc' },
      { name: 'DeepLASE Technologies Funding', url: 'https://www.linkedin.com/posts/sarvaankassociates_deeptechindia-photonicsinnovation-lasertechnology-activity-7440758668691742720-QCY5?utm_source=share&utm_medium=member_desktop&rcm=ACoAAB2pKV0B5p7hF2O0rUvV79-ykjLJDn5EXlc' },
      { name: 'E-Trnl Energies Seed Round', url: 'https://www.linkedin.com/posts/sarvaankassociates_seedfunding-venturecapital-startupfunding-activity-7433858226971951104-ihYL/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAB2pKV0B5p7hF2O0rUvV79-ykjLJDn5EXlc' },
      { name: 'Salty Funding Round', url: 'https://www.linkedin.com/feed/update/urn:li:activity:7419391208277450752/' },
      { name: 'InsideFPV Drones Transaction', url: 'https://www.linkedin.com/feed/update/urn:li:activity:7419731524100640768/' }
    ]
  },
  'vendor-savanko': {
    websiteUrl: 'https://savankopartners.com',
    linkedinUrl: 'https://www.linkedin.com/company/savanko-partners',
    twitterUrl: 'https://twitter.com/savankopartners',
    successStory: 'Savanko Partners successfully structured and closed Peak XV\'s $15M investment in SaaSFlow and scaled employee ESOP pools for 45+ other early-stage ventures in the past 12 months.',
    keyContact: {
      name: 'Siddharth Savanko',
      role: 'Managing Partner',
      specialties: ['Fundraising', 'ESOP Sprints', 'Governance', 'Contracts'],
      bio: 'Siddharth has over 14 years of corporate and transaction experience. He has advised top-tier Indian startups and venture funds on cap table optimizations, seed-to-Series A documentation, and regulatory compliance.'
    },
    reviews: [
      {
        author: 'Arjun Mehta',
        role: 'CEO',
        company: 'SaaSFlow',
        rating: 5,
        title: 'Outstanding deal execution and guidance',
        content: 'Savanko Partners was key to our Series A. They handled diligence and SSHA negotiations smoothly, translating legal risks into plain business decisions. Highly recommended.'
      }
    ],
    foundedYear: 2019,
    teamSize: 22,
    pocEmail: 'siddharth@savankopartners.com',
    pocPhone: '+919876543210',
    firmPhone: '+918045678910',
    vcFundsWorked: [
      'Peak XV',
      'Accel India',
      'Elevation Capital',
      'Matrix Partners India',
      'Speciale Invest',
      'Anicut Capital'
    ],
    fundTypes: [
      'Angel Networks',
      'Family Offices',
      'Micro VCs',
      'Venture Funds',
      'Global Funds',
      'PE Funds'
    ],
    notableClientsPEVC: [
      'SaaSFlow', 'FintechHub', 'ClimateScale', 'ConsumerStack', 'HealthSync', 'AutoDrive', 'LogiPro'
    ],
    notableClientsDisputes: [
      'TechCorp', 'CoreWeb', 'SaaSGrid'
    ],
    validityConditions: [
      'Exclusive to venture-backed startups in the Indian VCs ecosystem.',
      'Valid on all new ESOP setup and fundraising advisory mandates.',
      'Consultation sessions must be booked via direct introduction links.'
    ],
    showcaseLinks: [
      { name: 'SaaSFlow $15M Series A Round', url: 'https://www.linkedin.com' },
      { name: 'FintechHub ESOP Rollout', url: 'https://www.linkedin.com' }
    ]
  }
};

const defaultFAQs: FAQ[] = [
  { q: 'How do we kickoff the engagement?', a: 'Contact us through the form or direct liaison to schedule an initial scoping call where we define deliverables, team matching, and pricing.' },
  { q: 'What pricing models do you support?', a: 'We support sprint-based fees, hourly retainers, and project milestones depending on scope complexity.' }
];

const defaultClients: ClientProject[] = [];

const defaultExtendedDetails: VendorDetailsExtended = {
  websiteUrl: 'https://www.sarvaankassociates.com',
  linkedinUrl: 'https://linkedin.com',
  twitterUrl: 'https://twitter.com',
  successStory: 'Helping Accel portfolio startups bootstrap their initial operations and establish growth.',
  keyContact: {
    name: 'Liaison Desk',
    role: 'Partner Liaison',
    specialties: ['Startup Advisory', 'Operations'],
    bio: 'Direct liaison coordinator assisting Accel startups in fast-tracking onboarding.'
  },
  reviews: []
};

function renderCategoryIcon(category: string) {
  const iconClass = "w-3.5 h-3.5 text-neutral-400 shrink-0";
  switch (category.toLowerCase()) {
    case 'design':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={iconClass}>
          <path d="M12 20h9"/>
          <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>
        </svg>
      );
    case 'legal':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={iconClass}>
          <path d="m16 16 3-8 3 8c-.87.5-1.92.5-2.8 0l-.2-.1a3 3 0 0 0-3 0l-.2.1c-.88.5-1.93.5-2.8 0z"/>
          <path d="M2 16l3-8 3 8c-.87.5-1.92.5-2.8 0l-.2-.1a3 3 0 0 0-3 0l-.2.1c-.88.5-1.93.5-2.8 0z"/>
          <path d="M7 21h10"/>
          <path d="M12 3v18"/>
        </svg>
      );
    case 'finance':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={iconClass}>
          <line x1="12" y1="1" x2="12" y2="23"/>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
      );
    case 'development':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={iconClass}>
          <polyline points="16 18 22 12 16 6"/>
          <polyline points="8 6 2 12 8 18"/>
        </svg>
      );
    case 'marketing':
    default:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={iconClass}>
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
      );
  }
}

export function VendorsView({ vendors, onFocusedVendorChange }: VendorsViewProps) {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<VendorCategory | 'All'>('All');
  const [activeVendor, setActiveVendor] = React.useState<Vendor | null>(null);
  const [filtersExpanded, setFiltersExpanded] = React.useState(false);
  const [searchExpanded, setSearchExpanded] = React.useState(false);
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  // Drilldown and saved shortlists states
  const [selectedVendorId, setSelectedVendorId] = React.useState<string | null>(null);
  const [savedVendorIds, setSavedVendorIds] = React.useState<string[]>([]);
  const [activeFAQIndex, setActiveFAQIndex] = React.useState<number | null>(null);

  // Dynamic header and scroll spy states
  const [isCompact, setIsCompact] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState('overview-sec');
  const [savankoIndustry, setSavankoIndustry] = React.useState<'All' | 'SaaS' | 'Fintech' | 'Climate' | 'Consumer' | 'Healthcare'>('All');
  const [savankoFAQIndex, setSavankoFAQIndex] = React.useState<number | null>(null);
  const [selectedCaseStudy, setSelectedCaseStudy] = React.useState<{ name: string; challenge: string; support: string; outcome: string; summary: string } | null>(null);
  const [showAllVCs, setShowAllVCs] = React.useState<boolean>(false);
  const [profileMode, setProfileMode] = React.useState<'original' | 'refined'>('refined');

  React.useEffect(() => {
    if (!selectedVendorId) {
      setIsCompact(false);
      setActiveSection(selectedVendorId === 'vendor-savanko' ? 'recommendation-sec' : 'overview-sec');
      return;
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      let nextCompact = false;
      setIsCompact(prev => {
        if (scrollY > 140) {
          nextCompact = true;
          return true;
        } else if (scrollY < 80) {
          nextCompact = false;
          return false;
        }
        nextCompact = prev;
        return prev;
      });

      const sections = selectedVendorId === 'vendor-savanko'
        ? ['recommendation-sec', 'outcomes-sec', 'proof-sec', 'engage-sec']
        : [
            'overview-sec',
            'success-sec',
            'portfolio-sec',
            'contact-sec',
            'reviews-sec',
            'faqs-sec'
          ];

      // Choose offset corresponding to compact state
      const headerOffset = nextCompact ? 120 : 180;

      // Find which section is active
      let active = selectedVendorId === 'vendor-savanko' ? 'recommendation-sec' : 'overview-sec';
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
  }, [selectedVendorId]);

  React.useEffect(() => {
    const mainContainer = document.querySelector('.flex-1.p-4.lg\\:p-6.bg-\\[var\\(--surface-secondary\\)\\]');
    if (!mainContainer) return;

    if (selectedVendorId) {
      (mainContainer as HTMLElement).style.setProperty('background-color', '#FFFFFF', 'important');
      (mainContainer as HTMLElement).style.setProperty('padding', '0px', 'important');
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
  }, [selectedVendorId]);

  React.useEffect(() => {
    if (onFocusedVendorChange) {
      onFocusedVendorChange(selectedVendorId);
    }
  }, [selectedVendorId, onFocusedVendorChange]);

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [selectedVendorId]);

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

  const renderSavankoDecisionPage = (
    selectedVendor: Vendor,
    extended: VendorDetailsExtended,
    faqs: FAQ[],
    clients: ClientProject[]
  ) => {
    const quickFacts = [
      { label: 'Founded Year', val: extended.foundedYear || 2019, icon: (
        <svg className="w-4 h-4 text-neutral-450 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z"/>
        </svg>
      )},
      { label: 'Team Size', val: `${extended.teamSize || 22} Experts`, icon: (
        <svg className="w-4 h-4 text-neutral-450 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )},
      { label: 'Location', val: 'Bangalore & Delhi', icon: (
        <svg className="w-4 h-4 text-neutral-450 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 0 1-2.827 0l-4.244-4.243a8 8 0 1 1 11.314 0z"/>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
        </svg>
      )}
    ];

    const vcLogos = [
      { name: 'Accel', logo: 'https://logo.clearbit.com/accel.com' },
      { name: 'Peak XV', logo: 'https://logo.clearbit.com/peakxv.com' },
      { name: 'Elevation', logo: 'https://logo.clearbit.com/elevationcapital.com' },
      { name: 'Matrix Partners', logo: 'https://logo.clearbit.com/matrixpartners.com' }
    ];

    const outcomesSolved = [
      {
        title: 'Raising Capital',
        outcome: 'Diligence-ready preps. We structure clean term sheets, co-investment rights, and coordinate closures.',
        icon: (
          <svg className="w-5 h-5 text-emerald-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
          </svg>
        )
      },
      {
        title: 'ESOP Setup',
        outcome: 'Configure option pools with dilution-friendly vesting structures and seamless grant schedules.',
        icon: (
          <svg className="w-5 h-5 text-indigo-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.005 9.005 0 0 0-3.243-5.332 9.005 9.005 0 0 0-3.242-1.332m3.243 6.664a9.005 9.005 0 0 1-3.243-6.664m3.243 6.664H9m6 0v-2.25C15 11.25 12.75 9 10 9H6.25M3 18.75V16.5A2.25 2.25 0 0 1 5.25 14.25h1.5m1.5-6a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        )
      },
      {
        title: 'Governance',
        outcome: 'Align board seats, shareholder agreements, and voting rights setups to prevent future disputes.',
        icon: (
          <svg className="w-5 h-5 text-amber-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.32 11.32l.707-.707M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
          </svg>
        )
      },
      {
        title: 'Compliance',
        outcome: 'Zero-penalty regulatory filings, FEMA audits, and tax compliance advisory for cross-border entities.',
        icon: (
          <svg className="w-5 h-5 text-emerald-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.746 3.746 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.746 3.746 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
          </svg>
        )
      }
    ];

    const supportStages = [
      { name: 'Idea', desc: 'Co-founder splits & incorporation' },
      { name: 'Pre-Seed', desc: 'Convertible notes & early grants' },
      { name: 'Seed', desc: 'Full institutional round legal', highlight: true },
      { name: 'Series A', desc: 'SSHA drafting & diligence prep', highlight: true },
      { name: 'Growth', desc: 'Ongoing filings & M&A advisory' }
    ];

    const statsMetrics = [
      { val: '180+', label: 'Startup Engagements' },
      { val: '$450M+', label: 'Transactions Completed' },
      { val: '25+', label: 'VC Relationships' },
      { val: '120+', label: 'Companies Supported' }
    ];

    const caseStudies = [
      {
        name: 'SaaSFlow',
        summary: 'Cleaned up cap table dilution complexity and negotiated final SSHA terms with Peak XV in under 4 weeks.',
        challenge: 'Faced severe capitalization table complexity and multiple bridge convertible notes, stalling their $15M Series A funding round.',
        support: 'Savanko Partners cleaned up the cap table in 10 business days, renegotiated investor terms, and drafted the final SSHA agreements.',
        outcome: 'Successfully closed the Series A round in 4 weeks with zero cap table dilution friction.'
      },
      {
        name: 'FintechHub',
        summary: 'Configured option pools and structured dilution-friendly grant schedules for 250+ employees in 10 business days.',
        challenge: 'Needed to design and rollout a comprehensive employee stock option pool (ESOP) before their seed round, while preventing excessive co-founder dilution.',
        support: 'Savanko Partners modeled the pool size, drafted the legal plan documents, and created automated grant workflows under tight timelines.',
        outcome: 'Rolled out options to 250+ employees with optimal dilution planning in under 10 business days.'
      }
    ];

    const portfolioCompanies = [
      { name: 'GalaxEye Space', ind: 'SpaceTech', logo: 'https://logo.clearbit.com/galaxeye.space' },
      { name: 'Snapmint', ind: 'Fintech/BNPL', logo: 'https://logo.clearbit.com/snapmint.com' },
      { name: 'CapGrid', ind: 'B2B Supply Chain', logo: 'https://logo.clearbit.com/capgrid.in' },
      { name: 'Alyve Health', ind: 'Healthtech', logo: 'https://logo.clearbit.com/alyve.health' },
      { name: 'Propelld', ind: 'Fintech/Lending', logo: 'https://logo.clearbit.com/propelld.com' },
      { name: 'Cogos', ind: 'Logistics Tech', logo: 'https://logo.clearbit.com/cogos.co' },
      { name: 'Navadhan', ind: 'Microfinance', logo: 'https://logo.clearbit.com/navadhan.com' },
      { name: 'Goila Butter Chicken', ind: 'F&B/Retail', logo: 'https://logo.clearbit.com/goila.com' }
    ];

    const savankoFAQs = [
      { q: 'Who can avail of the discount offer?', a: 'All verified VC Hub members (investors, startups, founders, and portfolio companies) are eligible. This applies to both new and existing clients for new mandates.' },
      { q: 'What are the limitations of the exclusive offer?', a: 'The discount is applicable only on professional fees (excluding government, statutory, or third-party costs). The free initial consultation is limited to one 30-minute session per startup.' },
      { q: 'How long is the offer valid?', a: 'The preferential pricing and consultation offer are valid until March 31, 2027.' },
      { q: 'How do we claim the offer?', a: 'Reach out via the VC Hub / partner platform or request a direct introduction, and mention "VC Hub Member" at the time of first contact.' }
    ];

    const validityConditions = [
      'Applicable only to verified VC Hub members (investors, startups, founders, and portfolio companies).',
      'Valid for both new and existing clients on new mandates.',
      'Discount is applicable solely on professional advisory fees.',
      'Government fees, statutory charges, and out-of-pocket expenses are excluded.',
      'Free initial consultation is limited to one 30-minute session per startup.',
      'Subject to conflict clearance and standard client onboarding checks.',
      'Preferential pricing and consultation offers are valid until March 31, 2027.'
    ];

    const allVCsList = [
      'Peak XV', 'Accel India', 'Elevation Capital', 'Matrix Partners India',
      'Speciale Invest', 'Anicut Capital', 'Axilor Ventures', 'GVFL',
      'Sattva Family Office', 'Indian Angel Network (IAN)', 'Haldiram Nagpur Family Office',
      'Valour Capital', 'Jamwant Ventures', 'Next Bharat Ventures', 'S Angels'
    ];

    return (
      <div className="flex flex-col w-full bg-white select-none animate-fadeIn">
        {/* Sticky Header Wrapper - Dynamic height with hysteresis to prevent flickering */}
        <div className={`sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-neutral-200 transition-all duration-300 ${
          isCompact ? 'shadow-sm pt-3 pb-[18px]' : 'shadow-none py-5'
        }`}>
          <div className="max-w-6xl mx-auto w-full px-6 flex flex-col transition-all duration-300" style={{ gap: isCompact ? '0px' : '16px' }}>
            
            {/* Back Button and Profile Switcher */}
            {!isCompact && (
              <div className="flex items-center justify-between pb-1">
                <button
                  onClick={() => {
                    setSelectedVendorId(null);
                    setSavankoFAQIndex(null);
                  }}
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
                  Back
                </button>

                {/* Profile Switcher */}
                <div className="flex gap-1 p-0.5 bg-neutral-100 rounded-lg select-none border border-neutral-200 shrink-0">
                  <button
                    onClick={() => setProfileMode('refined')}
                    className={`px-3 py-1.5 text-[11px] font-extrabold rounded-md transition-all cursor-pointer ${
                      profileMode === 'refined' 
                        ? 'bg-white text-black shadow-sm' 
                        : 'text-neutral-500 hover:text-black'
                    }`}
                  >
                    Refined Profile
                  </button>
                  <button
                    onClick={() => setProfileMode('original')}
                    className={`px-3 py-1.5 text-[11px] font-extrabold rounded-md transition-all cursor-pointer ${
                      profileMode === 'original' 
                        ? 'bg-white text-black shadow-sm' 
                        : 'text-neutral-500 hover:text-black'
                    }`}
                  >
                    Original Profile
                  </button>
                </div>
              </div>
            )}

            {/* Main Content Layout Block */}
            {isCompact ? (
              /* Compact Layout (two lines) */
              <div className="flex flex-col gap-4 w-full">
                {/* First line: Back button */}
                <div className="flex items-center">
                  <button
                    onClick={() => {
                      setSelectedVendorId(null);
                      setSavankoFAQIndex(null);
                    }}
                    className="flex items-center gap-1.5 text-[13px] font-bold text-neutral-600 hover:text-black cursor-pointer group transition-colors shrink-0"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="13"
                      height="13"
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
                    <span>Back</span>
                  </button>
                </div>

                {/* Second line: Logo, Name, and CTA Button */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <CompanyLogo
                      src={selectedVendor.logoUrl}
                      name={selectedVendor.name}
                      className="shrink-0 bg-transparent rounded-lg !w-11 !h-11 p-0"
                      size="md"
                    />
                    <div className="min-w-0 flex flex-col justify-center">
                      <h1 className="font-extrabold text-neutral-900 text-lg md:text-xl leading-tight truncate">
                        {selectedVendor.name}
                      </h1>
                      <span className="text-[12px] md:text-[13px] text-neutral-500 font-semibold mt-0.5 leading-tight truncate block">
                        Legal Advisory & Cap Table Compliance
                      </span>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        if (profileMode === 'refined') {
                          window.open('https://calendly.com/savanko-partners/consultation', '_blank');
                        } else {
                          handleOpenForm(selectedVendor);
                        }
                      }}
                      className="bg-[#C8102E] hover:bg-[#AE0E28] text-white font-extrabold rounded-lg py-2.5 px-4 text-[13px] border-none shadow-sm cursor-pointer shrink-0"
                    >
                      {profileMode === 'refined' ? 'Book a Call' : 'Request Introduction'}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Expanded Layout (Structured Columns) */
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-2">
                {/* Left/Center Area: Brand Identity and Quick Facts */}
                <div className="flex flex-col md:flex-row md:items-center gap-6 min-w-0 flex-1">
                  
                  {/* Brand Block */}
                  <div className="flex items-center gap-4 min-w-0 shrink-0">
                    <CompanyLogo
                      src={selectedVendor.logoUrl}
                      name={selectedVendor.name}
                      className="shrink-0 bg-white shadow-sm rounded-xl !w-12 !h-12 p-1"
                      size="lg"
                    />
                    <div className="min-w-0">
                      <h1 className="font-extrabold text-neutral-900 text-xl leading-none truncate">
                        {selectedVendor.name}
                      </h1>
                      <div className="flex items-center gap-3 mt-1.5 flex-wrap text-[13px] text-neutral-500 font-medium">
                        <span>Legal Advisory & Cap Table Compliance</span>
                        <span className="text-neutral-300 select-none">•</span>
                        <a
                          href="https://savankopartners.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 hover:text-neutral-900 transition-colors underline font-bold"
                        >
                          <span>Visit Website</span>
                          <svg className="w-3.5 h-3.5 text-neutral-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Vertical Divider Line */}
                  <div className="hidden md:block h-10 w-px bg-neutral-200 self-center mx-2 shrink-0" />

                  {/* Quick Facts Block (Aligned inside the header card) */}
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                    {quickFacts.map((fact, idx) => (
                      <div key={idx} className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-neutral-50 flex items-center justify-center border border-neutral-100 shrink-0 text-neutral-450">
                          {fact.icon}
                        </div>
                        <div>
                          <span className="block text-[9px] text-neutral-450 font-bold uppercase tracking-wider leading-none select-none">{fact.label}</span>
                          <span className="block text-[12.5px] text-neutral-800 font-extrabold mt-0.5 leading-none">{fact.val}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>

                 {/* Right Area: Interactive Controls */}
                <div className="flex flex-wrap items-center shrink-0 lg:self-center">
                  {/* Action CTA Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      if (profileMode === 'refined') {
                        window.open('https://calendly.com/savanko-partners/consultation', '_blank');
                      } else {
                        handleOpenForm(selectedVendor);
                      }
                    }}
                    className="bg-[#C8102E] hover:bg-[#AE0E28] text-white font-extrabold rounded-lg py-2.5 px-5.5 text-[13.5px] transition-all duration-200 border-none shadow-sm cursor-pointer shrink-0 lg:self-center"
                  >
                    {profileMode === 'refined' ? (
                      <span className="flex items-center gap-1.5 justify-center">
                        <span>Book a Call</span>
                        <svg className="w-3.5 h-3.5 text-white/90 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                        </svg>
                      </span>
                    ) : (
                      'Request Introduction'
                    )}
                  </button>
                </div>
              </div>
            )}



          </div>
        </div>

        {/* Main Body Content (Two-Column Layout: Left for main content, Right for Sticky Sidebar) */}
        <div 
          className="max-w-6xl mx-auto w-full px-6 py-8 flex flex-col lg:flex-row gap-8 items-start bg-white"
        >
          
          {/* Left Column (Main Content Area) */}
          <div className={profileMode === 'refined' ? "flex-1 min-w-0 flex flex-col gap-6" : "flex-1 min-w-0 flex flex-col gap-8"}>
                   {/* Section 2: Why Recommended / About Block */}
            <div id="recommendation-sec" className={profileMode === 'refined' ? "flex flex-col gap-6 scroll-mt-[125px]" : "pb-8 border-b border-neutral-100 flex flex-col gap-6 scroll-mt-[125px]"}>
              {profileMode === 'refined' ? (
                <>
                  <div>
                    <h2 className="text-[20px] font-black text-neutral-955 leading-snug">
                      About Savanko Partners
                    </h2>
                    <p className="text-[13.5px] text-black mt-2 font-normal leading-relaxed">
                      Savanko Partners is a boutique legal advisory firm specializing in fundraising, cap table compliance, ESOP setups, and corporate governance for high-growth, venture-backed startups.
                    </p>
                  </div>

                   {/* Bullet points (No icons, no descriptions) */}
                  <div className="flex flex-col gap-2 mt-2">
                    {[
                      'Supports Seed to Series A',
                      'Startup-Focused Expertise',
                      'Venture-Backed Experience'
                    ].map((point, idx) => (
                      <div key={idx} className="flex gap-2.5 items-center">
                        <span className="text-[#C8102E] font-black text-[18px] leading-none select-none shrink-0">•</span>
                        <span className="text-[13.5px] font-semibold text-neutral-850">{point}</span>
                      </div>
                    ))}
                  </div>

                  {/* Supported Startup Stages (Moved to About section in refined mode) */}
                  <div className="mt-4">
                    <span className="text-[11px] font-bold text-neutral-450 uppercase tracking-widest select-none block mb-2.5">
                      Supported Startup Stages
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {['Idea', 'Pre-Seed', 'Seed', 'Series A', 'Growth'].map((stage, idx) => (
                        <span key={idx} className="px-3 py-1.5 bg-neutral-50 border border-neutral-200 text-neutral-700 font-bold text-[12.5px] rounded-lg select-none">
                          {stage}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h2 className="text-[20px] font-black text-neutral-955 leading-snug">
                      Why Accel Recommends Savanko Partners
                    </h2>
                    <p className="text-[13.5px] text-neutral-600 mt-2 font-normal leading-relaxed">
                      Savanko Partners is a boutique legal advisory firm specializing in fundraising, cap table compliance, ESOP setups, and corporate governance for high-growth, venture-backed startups.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    {[
                      { 
                        title: 'Trusted by 12+ Venture Funds', 
                        desc: 'Pre-vetted relationship network across India\'s largest institutional funds.',
                        icon: (
                          <svg className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.005 9.005 0 0 0-3.243-5.332 9.005 9.005 0 0 0-3.242-1.332m3.243 6.664a9.005 9.005 0 0 1-3.243-6.664m3.243 6.664H9m6 0v-2.25C15 11.25 12.75 9 10 9H6.25M3 18.75V16.5A2.25 2.25 0 0 1 5.25 14.25h1.5m1.5-6a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                          </svg>
                        )
                      },
                      { 
                        title: 'Supports Seed to Series A', 
                        desc: 'Tailored legal frameworks built specifically for venture-backed lifecycles.',
                        icon: (
                          <svg className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
                          </svg>
                        )
                      },
                      { 
                        title: 'Startup-Focused Expertise', 
                        desc: 'No corporate bloated processes; fast drafting turnaround and direct slack liaison.',
                        icon: (
                          <svg className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 21l8.982-2.183a9.003 9.003 0 0 0 5.195-10.428.9.9 0 0 0-1.056-.695l-4.51.902a9 9 0 0 1-8.699-3.671L8.15 4.15a.9.9 0 0 0-1.618.397L5.5 10.5M9.813 15.904 5.21 12.38M9.813 15.904l5.39-3.593m-9.993-1.43 4.603 3.593m0 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                          </svg>
                        )
                      },
                      { 
                        title: 'Venture-Backed Experience', 
                        desc: 'Handled over $450M in seed and equity funding rounds with zero documentation errors.',
                        icon: (
                          <svg className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                          </svg>
                        )
                      }
                    ].map((item, idx) => (
                      <div key={idx} className="flex gap-3">
                        {item.icon}
                        <div>
                          <span className="text-[14px] font-extrabold text-neutral-900 block">{item.title}</span>
                          <p className="text-[13px] text-neutral-600 mt-1 font-normal leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Firm Profile PDF Credentials (Revamped secondary bordered button) */}
                  <div className="mt-2 flex justify-start">
                    <a
                      href="file:///Users/kapil/Downloads/Sarvaank%20Associates%20Profile%20(April%202026).pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 px-4.5 py-2.5 bg-white border border-neutral-300 hover:border-black text-neutral-800 hover:text-black font-extrabold text-[13px] rounded-lg transition-colors shadow-sm select-none cursor-pointer"
                    >
                      <svg className="w-4 h-4 text-red-650 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"/>
                      </svg>
                      <span>Download Credentials Brochure (PDF)</span>
                    </a>
                  </div>

                  {/* Success Story Highlight: VC Funds & Lending/Loan Structuring */}
                  <div className="mt-4 p-6 bg-neutral-50/50 border border-neutral-200 rounded-2xl flex flex-col gap-5">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-150 flex items-center justify-center shrink-0">
                        <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-[15.5px] font-black text-neutral-900 leading-snug">Success Story Highlight: VC Funds & Debt Transaction Advisory</h3>
                        <p className="text-[12.5px] text-neutral-550 mt-1 font-normal leading-relaxed">
                          Savanko Partners acts as transaction counsel for top-tier Indian VCs and structures critical debt financing/loan transactions for high-growth startups.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-neutral-200">
                      <div className="flex flex-col gap-2.5">
                        <span className="text-[11px] font-bold text-neutral-450 uppercase tracking-widest select-none">
                          VC Funds Collaborated With
                        </span>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {['Peak XV', 'Accel India', 'Elevation Capital', 'Matrix Partners India', 'Speciale Invest', 'Anicut Capital', 'Axilor Ventures', 'GVFL'].map((fund, idx) => (
                            <span key={idx} className="px-2.5 py-1 bg-[#F0F4F8] border border-[#D9E2EC] text-[#1E3A8A] font-extrabold text-[11.5px] rounded-lg">
                              {fund}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col gap-2.5">
                        <span className="text-[11px] font-bold text-neutral-450 uppercase tracking-widest select-none">
                          Debt Structuring & Loan Mandates
                        </span>
                        <p className="text-[12.5px] text-neutral-655 leading-relaxed font-normal">
                          Structured venture debt financing, working capital lines, and transaction legalities for lending and fintech pioneers like <span className="font-bold text-neutral-900">Navadhan Capital</span>, <span className="font-bold text-neutral-900">Propelld</span>, and <span className="font-bold text-neutral-900">Snapmint</span>. We ensure seamless loan closings with optimal founder-friendly terms.
                        </p>
                        <div className="bg-white border border-neutral-200 p-2.5 rounded-xl flex items-center gap-3 shadow-sm mt-1">
                          <CompanyLogo name="Navadhan" size="sm" className="shrink-0" />
                          <div className="min-w-0">
                            <span className="text-[12.5px] font-extrabold text-neutral-900 block leading-tight">Navadhan Capital</span>
                            <span className="text-[11px] text-emerald-800 font-bold mt-0.5 block leading-none">✓ Structured Debt & Investment Advisory</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right Column (Sidebar Contact Card - Top scroll view only) */}
          <div className="w-full lg:w-[340px] shrink-0 flex flex-col gap-6 lg:sticky lg:top-[160px] h-fit">
            {/* Contact Card */}
            <div className="border border-neutral-200 bg-white rounded-xl p-5 flex flex-col gap-4 shadow-sm">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-neutral-300 shrink-0 select-none bg-neutral-100 flex items-center justify-center">
                  <img src={siddharthAvatar} alt="Siddharth Savanko" className="w-full h-full object-cover animate-fadeIn" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-[15px] font-extrabold text-neutral-900 leading-tight">Siddharth Savanko</h4>
                    <a
                      href="https://www.linkedin.com/company/savanko-partners"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0A66C2] inline-flex shrink-0"
                    >
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>
                  </div>
                  <span className="text-[11.5px] text-neutral-555 font-medium block mt-1">Managing Partner</span>
                </div>
              </div>

              <p className="text-[13px] text-neutral-650 leading-relaxed font-normal mt-1">
                Siddharth has over 14 years of transaction experience advising top-tier Indian startups on cap table optimizations and venture rounds.
              </p>

              {/* Direct Communications & Address */}
              <div className="flex flex-col gap-3 mt-1 pt-3 border-t border-neutral-100">
                <div className="flex flex-col gap-2 text-[13px] text-neutral-650 font-semibold">
                  <a href="mailto:siddharth@savankopartners.com" className="inline-flex items-center gap-2 hover:text-black transition-colors break-all">
                    <span className="underline font-bold text-neutral-850">siddharth@savankopartners.com</span>
                  </a>
                  <a href="tel:+919876543210" className="inline-flex items-center gap-2 hover:text-black transition-colors">
                    <span>Direct desk: <span className="font-bold text-neutral-800">+91 98765 43210</span></span>
                  </a>
                </div>

                <div className="flex flex-col gap-2 text-[13px] text-neutral-650 leading-relaxed font-normal pt-3 border-t border-neutral-100">
                  <span className="text-[11.5px] font-extrabold text-neutral-450 uppercase tracking-wider select-none">Office Address</span>
                  <div className="flex gap-2">
                    <svg className="w-4 h-4 text-neutral-450 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                    <span>WeWork, Embassy Golf Links, Off Domlur Stage, Bengaluru 560071</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width content sections below */}
        <div className="max-w-6xl mx-auto w-full px-6 pb-8 flex flex-col gap-8 bg-white">
          {/* Section: Brochure & Credentials (moved to full-width flow) */}
          {profileMode === 'refined' && (
            <div className="flex flex-col gap-6">
              <div className="border-t border-neutral-100 w-full" />
              <div className="flex justify-between items-center flex-wrap gap-2">
                <h3 className="text-[17px] font-bold text-neutral-900">Brochure & Credentials</h3>
                <div className="flex items-center gap-4.5">
                  <a
                    href="/sarvaank_profile.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[12.5px] font-extrabold text-[#C8102E] hover:underline inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>View on Full Page</span>
                    <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </a>
                  <a
                    href="/sarvaank_profile.pdf"
                    download="Savanko_Partners_Brochure.pdf"
                    className="inline-flex items-center gap-1.5 text-[12.5px] font-extrabold text-[#C8102E] hover:text-[#AE0E28] transition-colors cursor-pointer"
                  >
                    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"/>
                    </svg>
                    <span>Download PDF</span>
                  </a>
                </div>
              </div>
              <PdfCarousel pdfUrl="/sarvaank_profile.pdf" />
            </div>
          )}

          {profileMode === 'refined' && <div className="border-t border-neutral-100" />}

            {/* Section 3: Founder Problems Solved */}
            <div id="outcomes-sec" className={profileMode === 'refined' ? "flex flex-col gap-6 scroll-mt-[125px]" : "pb-8 border-b border-neutral-100 flex flex-col gap-6 scroll-mt-[125px]"}>
              {profileMode === 'refined' ? (
                <>
                  <div>
                    <h3 className="text-[18px] font-extrabold text-neutral-955">Founder Problems Solved</h3>
                    <p className="text-[13.5px] text-neutral-500 mt-1 font-normal">
                      Direct outcome-based support mapped to your startup challenges.
                    </p>
                  </div>

                  <ul className="flex flex-col gap-3.5 pl-0 list-none">
                    {outcomesSolved.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-emerald-600 font-extrabold text-[16px] shrink-0 mt-0.5">✓</span>
                        <div className="min-w-0">
                          <span className="text-[14px] font-black text-neutral-900 block">{item.title}</span>
                          <p className="text-[13px] text-neutral-600 mt-0.5 font-normal leading-relaxed">{item.outcome}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <>
                  <div>
                    <h3 className="text-[18px] font-extrabold text-neutral-955">Founder Problems Solved</h3>
                    <p className="text-[13.5px] text-neutral-500 mt-1 font-normal">
                      Direct outcome-based support mapped to your startup challenges.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {outcomesSolved.map((item, idx) => (
                      <div key={idx} className="border border-neutral-200 bg-white p-5 rounded-xl flex flex-col gap-2.5 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-2">
                          {item.icon}
                          <span className="text-[15px] font-black text-neutral-900">{item.title}</span>
                        </div>
                        <p className="text-[13.5px] text-neutral-700 leading-relaxed font-normal">
                          {item.outcome}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Combined Section 4: Fund Types */}
                  <div className="mt-6 pt-6 border-t border-neutral-100 flex flex-col gap-4">
                    <div>
                      <h4 className="text-[15px] font-black text-neutral-900">Supported Startup Stages</h4>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-1">
                      {['Idea', 'Pre-Seed', 'Seed', 'Series A', 'Growth'].map((stage, idx) => (
                        <span key={idx} className="px-3 py-1.5 bg-neutral-50 border border-neutral-200 text-neutral-700 font-bold text-[12.5px] rounded-lg select-none">
                          {stage}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Section 6: Track Record */}
            {profileMode !== 'refined' && (
              <div id="proof-sec" className="pb-8 border-b border-neutral-100 flex flex-col gap-4 scroll-mt-[125px]">
                <div>
                  <h3 className="text-[17px] font-bold text-neutral-900">Track Record</h3>
                  <p className="text-[13px] text-neutral-500 mt-1 font-normal">
                    Proven outcomes across the venture ecosystem.
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                  {statsMetrics.map((stat, idx) => (
                    <div key={idx} className="bg-neutral-50/50 border border-neutral-200 rounded-xl p-4 flex flex-col justify-center gap-1 shadow-sm">
                      <span className="text-[24px] font-black text-black leading-none select-none">{stat.val}</span>
                      <span className="text-[12px] text-neutral-655 font-bold mt-1 leading-normal">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {profileMode === 'refined' && <div className="border-t border-neutral-100" />}

            {/* Section 8: Founder Success Stories / Case Studies */}
            <div className={profileMode === 'refined' ? "flex flex-col gap-6 scroll-mt-[125px]" : "mt-6 pt-6 border-t border-neutral-100 flex flex-col gap-4 scroll-mt-[125px]"} id={profileMode === 'refined' ? 'proof-sec' : undefined}>
              {profileMode === 'refined' ? (
                <>
                  <div>
                    <h3 className="text-[17px] font-bold text-neutral-900">Case Studies</h3>
                    <p className="text-[13px] text-neutral-550 mt-1 font-normal">
                      Click to view detailed, outcome-based project narratives.
                    </p>
                  </div>

                  <div className="flex flex-col gap-6 mt-3">
                    {caseStudies.map((cs, idx) => (
                      <div key={idx} className="flex flex-col gap-2.5">
                        {idx > 0 && <div className="border-t border-neutral-100 pb-3" />}
                        <div 
                          onClick={() => setSelectedCaseStudy(cs)}
                          className="flex items-center gap-2.5 text-[14px] font-black text-neutral-900 hover:text-[#C8102E] cursor-pointer transition-colors"
                        >
                          <CompanyLogo name={cs.name} size="sm" className="!w-5 !h-5 bg-white border border-neutral-200 p-0.5 rounded shrink-0" />
                          <span className="underline">{cs.name} Case Study</span>
                        </div>
                        <p className="text-[13px] text-neutral-900 font-normal leading-relaxed pl-7.5">
                          {cs.summary}
                        </p>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h3 className="text-[17px] font-bold text-neutral-900">Founder Case Studies</h3>
                    <p className="text-[13px] text-neutral-500 mt-1 font-normal">
                      Click to view detailed, outcome-based project narratives.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    {caseStudies.map((cs, idx) => (
                      <div 
                        key={idx} 
                        onClick={() => setSelectedCaseStudy(cs)}
                        className="border border-neutral-200 bg-white p-5 rounded-xl flex flex-col gap-3.5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer group"
                      >
                        <div className="flex items-center gap-2.5">
                          <CompanyLogo name={cs.name} size="sm" className="!w-6 !h-6 bg-white border border-neutral-100 p-0.5 rounded shadow-sm shrink-0" />
                          <span className="text-[14px] font-extrabold text-neutral-900 group-hover:underline">{cs.name} Case Study</span>
                        </div>
                        <p className="text-[13px] text-neutral-600 line-clamp-2 font-normal leading-relaxed flex-1">
                          {cs.summary}
                        </p>
                        <span className="text-[11.5px] font-bold text-black flex items-center gap-1 mt-1 group-hover:underline">
                          Read Case Study &rarr;
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {profileMode === 'refined' && <div className="border-t border-neutral-100" />}

            {/* Section 9: Portfolio Companies */}
            <div className={profileMode === 'refined' ? "flex flex-col gap-6" : "mt-6 pt-6 border-t border-neutral-100 flex flex-col gap-4"}>
              <div>
                <h3 className="text-[17px] font-bold text-neutral-900">Portfolio Companies</h3>
                <p className="text-[13px] text-neutral-500 mt-1 font-normal">
                  Displaying ecosystem companies supported.
                </p>
              </div>

              {profileMode === 'refined' ? (
                <div className="flex flex-wrap gap-2.5 mt-2">
                  {portfolioCompanies.map((comp, idx) => (
                    <div key={idx} className="bg-neutral-50/50 border border-neutral-200 rounded-lg py-1.5 px-3 flex items-center gap-2 select-none">
                      <CompanyLogo name={comp.name} src={comp.logo} className="!w-5 !h-5 bg-white border border-neutral-150 p-0.5 rounded shrink-0" />
                      <span className="text-[12.5px] font-extrabold text-neutral-850">{comp.name}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-2">
                  {portfolioCompanies.map((comp, idx) => (
                    <div key={idx} className="bg-white border border-neutral-200 rounded-xl p-4 flex flex-col items-center justify-center gap-2 shadow-sm">
                      <CompanyLogo name={comp.name} src={comp.logo} className="!w-10 !h-10 bg-white border border-neutral-100 p-0.5 rounded shadow-sm shrink-0" />
                      <span className="text-[13px] font-bold text-neutral-900 select-none mt-1">{comp.name}</span>
                      <span className="text-[10.5px] font-bold text-neutral-450 select-none">{comp.ind}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          <div id="engage-sec" className="max-w-6xl mx-auto w-full px-6 py-8 flex flex-col gap-8 scroll-mt-[125px] bg-white">
            <div className="border-t border-neutral-100 w-full" />
            
            {/* Section 11: Ecosystem Member Offer (Revamped & Highlighted) */}
          <div className="relative overflow-hidden border border-neutral-200 bg-gradient-to-br from-neutral-50 via-white to-neutral-50 rounded-2xl p-6 md:p-8 flex flex-col gap-6 shadow-sm">
            {/* Top brand accent bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C8102E] via-red-500 to-[#C8102E]" />

            {profileMode === 'refined' ? (
              <>
                {/* Header for refined mode */}
                <div className="flex flex-col gap-1">
                  <span className="text-[11.5px] font-extrabold text-[#C8102E] uppercase tracking-wider block select-none">
                    Exclusive Member Offer
                  </span>
                  <h3 className="text-[19px] font-black text-neutral-900 leading-tight">
                    Exclusive Offer & Validity Conditions
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                  {/* Left Column: Offer Benefits */}
                  <div className="flex flex-col gap-3">
                    <span className="text-[13px] font-extrabold text-neutral-900 block select-none">
                      Offer Benefits
                    </span>
                    <ul className="flex flex-col gap-2.5 pl-0 list-none text-[13px] text-neutral-650 leading-relaxed font-normal">
                      {[
                        'Complimentary Cap Table Audit: Free initial 30-minute scoping and review.',
                        '20% Mandate Discount on first fundraising or ESOP pool setup.',
                        'Priority Support SLA with direct escalation desk (< 4h response).'
                      ].map((ben, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <span className="text-emerald-600 font-extrabold text-[15px] leading-none shrink-0">•</span>
                          <span>{ben}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right Column: Validity Conditions */}
                  <div className="flex flex-col gap-3">
                    <span className="text-[13px] font-extrabold text-neutral-900 block select-none">
                      Validity & Terms
                    </span>
                    <ul className="flex flex-col gap-2.5 pl-0 list-none text-[13px] text-neutral-650 leading-relaxed font-normal">
                      {[
                        'Exclusive to venture-backed startups in the Indian VCs ecosystem.',
                        'Valid on new ESOP setup and fundraising advisory mandates.',
                        'Consultation offers are valid until March 31, 2027.'
                      ].map((cond, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <span className="text-[#C8102E] font-extrabold text-[15px] leading-none shrink-0">•</span>
                          <span>{cond}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Offer Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[11.5px] font-extrabold text-[#C8102E] uppercase tracking-wider block select-none">Ecosystem Member Offer</span>
                    <h3 className="text-[19px] font-black text-neutral-900 leading-tight">Exclusive Pricing & Mandate Terms</h3>
                    <p className="text-[13px] text-neutral-550 leading-relaxed font-normal">
                      Preferential engagement rates and complimentary advisory sessions for verified members.
                    </p>
                  </div>
                  <div className="bg-[#C8102E]/5 border border-[#C8102E]/20 text-[#C8102E] font-black text-[12px] px-3.5 py-1.5 rounded-lg shrink-0 self-start md:self-center">
                    Member Code: PRISM-SAVANKO-20
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-neutral-100">
                  
                  {/* Left Column: Exclusive Member Benefits */}
                  <div className="flex flex-col gap-4">
                    <span className="text-[12px] font-extrabold text-neutral-450 uppercase tracking-widest select-none block pb-1.5 border-b border-neutral-100">
                      Exclusive Member Benefits
                    </span>
                    <div className="flex flex-col gap-3.5">
                      {[
                        { 
                          title: 'Complimentary Cap Table Audit', 
                          desc: 'Free initial 30-minute scoping and complete cap table capitalization review.',
                          icon: (
                            <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
                            </svg>
                          )
                        },
                        { 
                          title: '20% Mandate Discount', 
                          desc: '20% discount on professional advisory fees for your first fundraising or ESOP pool setup.',
                          icon: (
                            <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5M3 18.75h18M3 9h18M3 13.5h18" />
                            </svg>
                          )
                        },
                        { 
                          title: 'Priority Support SLA', 
                          desc: 'Direct escalation desk with guaranteed response time under 4 hours.',
                          icon: (
                            <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                            </svg>
                          )
                        }
                      ].map((ben, idx) => (
                        <div key={idx} className="flex gap-3.5 items-start p-4 rounded-xl border border-neutral-100 hover:border-neutral-200 bg-white shadow-sm transition-all">
                          <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                            {ben.icon}
                          </div>
                          <div className="min-w-0">
                            <span className="text-[13.5px] font-extrabold text-neutral-900 block leading-tight">{ben.title}</span>
                            <p className="text-[12px] text-neutral-600 mt-1 font-normal leading-relaxed">{ben.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Validity & Conditions */}
                  <div className="flex flex-col gap-4">
                    <span className="text-[12px] font-extrabold text-neutral-450 uppercase tracking-widest select-none block pb-1.5 border-b border-neutral-100">
                      Validity & Engagement Conditions
                    </span>
                    <div className="bg-neutral-50/50 border border-neutral-200 rounded-xl p-5 flex flex-col gap-4">
                      <ul className="flex flex-col gap-3 pl-0 list-none text-[12.5px] text-neutral-700 font-normal leading-relaxed">
                        {[
                          'Exclusive to venture-backed startups in the Indian VCs ecosystem.',
                          'Valid on all new ESOP setup and fundraising advisory mandates.',
                          'Consultation sessions must be booked via direct introduction links.',
                          'Discount is applicable solely on professional advisory fees (government fees and statutory charges excluded).',
                          'Subject to conflict clearance and standard client onboarding checks.',
                          'Preferential pricing and consultation offers are valid until March 31, 2027.'
                        ].map((condition, idx) => (
                          <li key={idx} className="flex items-start gap-2.5">
                            <svg className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                              <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span>{condition}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                </div>
              </>
            )}
          </div>

          {/* Section 12: Founder Reviews */}
          <div className="flex flex-col gap-5 pt-8 border-t border-neutral-100">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-[17px] font-bold text-neutral-900">Founder Reviews</h3>
                <p className="text-[13px] text-neutral-555 mt-1 font-normal">
                  Verified founder satisfaction ratings.
                </p>
              </div>
              <div className="flex items-center gap-1.5 bg-[#FF492C]/5 px-3 py-1.5 rounded-full border border-[#FF492C]/10 shrink-0">
                <span className="text-[#FF492C] font-black text-xs">Platform Rating</span>
                <span className="text-neutral-900 font-extrabold text-xs">5.0 / 5.0</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              {[
                {
                  author: 'Arjun Mehta',
                  role: 'CEO',
                  company: 'SaaSFlow',
                  stage: 'Series A',
                  review: 'Savanko Partners was key to our Series A. They handled diligence and SSHA negotiations smoothly, translating legal risks into plain business decisions. Highly recommended.'
                },
                {
                  author: 'Neha Sharma',
                  role: 'Founder',
                  company: 'FintechHub',
                  stage: 'Seed',
                  review: 'Their speed on our ESOP pool setup was incredible. Handled all documentation and dilution schedules in under 10 business days. Extremely supportive team!'
                }
              ].map((rev, idx) => (
                <div key={idx} className="p-5 border border-neutral-200 rounded-xl bg-neutral-50/10 flex flex-col justify-between gap-3.5 shadow-sm">
                  <div className="flex justify-between items-start flex-wrap gap-2">
                    <div>
                      <span className="block text-[13.5px] font-bold text-neutral-900">{rev.author}</span>
                      <span className="block text-[11.5px] text-neutral-555 font-semibold mt-0.5">{rev.role}, {rev.company}</span>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <div className="flex text-amber-400 select-none">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg key={i} className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                          </svg>
                        ))}
                      </div>
                      <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-50 border border-emerald-150 px-2 py-0.5 rounded-full select-none shrink-0">
                        ✓ {rev.stage} Verified
                      </span>
                    </div>
                  </div>

                  <p className="text-[13px] text-neutral-750 leading-relaxed font-normal italic mt-2 flex-1">
                    "{rev.review}"
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 13: FAQ (Accordions - Native HTML details/summary matching Deals page style) */}
          {profileMode !== 'refined' && (
            <div className="pt-8 border-t border-neutral-100 flex flex-col gap-4">
              <div>
                <h3 className="text-[17px] font-bold text-neutral-900">Frequently Asked Questions</h3>
                <p className="text-[13px] text-neutral-555 mt-1 font-normal">
                  Direct operational details regarding kickoff, engagement, and pricing.
                </p>
              </div>

              <div className="divide-y divide-neutral-200 border-t border-b border-neutral-200 mt-3 select-none">
                {savankoFAQs.map((faq, idx) => (
                  <details key={idx} className="group py-4 [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex justify-between items-center font-bold text-[13.5px] text-black cursor-pointer list-none hover:text-neutral-800 transition-colors focus:outline-none">
                      <span>{faq.q}</span>
                      <svg className="w-4.5 h-4.5 text-neutral-400 group-open:rotate-180 transition-transform duration-250" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
                      </svg>
                    </summary>
                    <div className="pt-3 text-[13px] text-neutral-600 leading-relaxed font-normal">
                      {faq.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          )}

          {/* Section 15: facilitating disclaimer */}
          <div className="pt-8 border-t border-neutral-100 text-[12px] text-neutral-450 font-normal leading-relaxed select-none">
            <span className="block">Introductions are facilitated by Indian VCs platform. Legal engagements and service agreements are negotiated directly between the startup founder and Savanko Partners.</span>
            <span className="block mt-1">All representations are subject to standard conflict clearances and onboarding guidelines.</span>
          </div>
        </div>

        {/* Modal Popup displaying Case Study detailed view */}
        <Modal open={!!selectedCaseStudy} onOpenChange={(open) => { if (!open) setSelectedCaseStudy(null); }}>
          <ModalContent className="max-w-2xl border border-neutral-200 bg-white text-neutral-900 rounded-2xl p-6">
            {selectedCaseStudy && (
              <>
                <ModalHeader className="border-b border-neutral-100 pb-4">
                  <ModalTitle className="text-[17px] font-extrabold text-neutral-955 flex items-center gap-2.5">
                    <CompanyLogo name={selectedCaseStudy.name} size="sm" className="!w-6 !h-6 bg-white border border-neutral-100 p-0.5 rounded shadow-sm shrink-0" />
                    <span>{selectedCaseStudy.name} Case Study</span>
                  </ModalTitle>
                  <ModalDescription className="text-neutral-500 text-[13px] mt-1.5 font-normal leading-relaxed">
                    {selectedCaseStudy.summary}
                  </ModalDescription>
                </ModalHeader>

                <ModalBody className="py-6 flex flex-col gap-6 text-[13.5px]">
                  <div className="flex flex-col gap-2">
                    <span className="text-[11.5px] font-black text-neutral-400 uppercase tracking-widest leading-none">Challenge Faced</span>
                    <p className="text-neutral-700 leading-relaxed font-normal">
                      {selectedCaseStudy.challenge}
                    </p>
                  </div>
                  
                  <div className="flex flex-col gap-2 border-t border-neutral-100 pt-4">
                    <span className="text-[11.5px] font-black text-neutral-400 uppercase tracking-widest leading-none">Support Provided</span>
                    <p className="text-neutral-700 leading-relaxed font-normal">
                      {selectedCaseStudy.support}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 border-t border-neutral-100 pt-4">
                    <span className="text-[11.5px] font-black text-black uppercase tracking-widest leading-none">Measurable Outcome</span>
                    <p className="text-neutral-900 font-bold leading-relaxed">
                      {selectedCaseStudy.outcome}
                    </p>
                  </div>
                </ModalBody>

                <ModalFooter className="border-t border-neutral-100 pt-4 flex justify-end">
                  <button
                    onClick={() => setSelectedCaseStudy(null)}
                    className="px-4 py-2 border border-neutral-200 hover:bg-neutral-50 text-[13px] text-neutral-800 font-bold rounded-lg cursor-pointer transition-colors"
                  >
                    Close Case Study
                  </button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>

        {/* Modal Popup displaying all recommended VCs */}
        <Modal open={showAllVCs} onOpenChange={setShowAllVCs}>
          <ModalContent className="max-w-xl border border-neutral-200 bg-white text-neutral-900 rounded-2xl p-6">
            <ModalHeader className="border-b border-neutral-100 pb-4">
              <ModalTitle className="text-[17px] font-extrabold text-neutral-955">
                Endorsing Venture Capital Funds
              </ModalTitle>
              <ModalDescription className="text-neutral-500 text-[13px] mt-1 font-normal">
                Venture capital funds who have recommended Savanko Partners for legal advisory.
              </ModalDescription>
            </ModalHeader>

            <ModalBody className="py-6 max-h-96 overflow-y-auto scrollbar-thin">
              <div className="grid grid-cols-2 gap-3">
                {allVCsList.map((vc, idx) => (
                  <div key={idx} className="bg-white border border-neutral-200 rounded-xl p-3 flex items-center gap-2.5 shadow-sm select-none">
                    <span className="text-[13px] font-extrabold text-neutral-900">{vc}</span>
                  </div>
                ))}
              </div>
            </ModalBody>

            <ModalFooter className="border-t border-neutral-100 pt-4 flex justify-end">
              <button
                onClick={() => setShowAllVCs(false)}
                className="px-4 py-2 border border-neutral-200 hover:bg-neutral-50 text-[13px] text-neutral-800 font-bold rounded-lg cursor-pointer transition-colors"
              >
                Close List
              </button>
            </ModalFooter>
          </ModalContent>
        </Modal>

      </div>
    );
  };

  // Drilldown View rendering (Revamped to match Deals flat-sticky format: no cards, sticky header, section navigations, simple divider lines)
  if (selectedVendorId) {
    const selectedVendor = vendors.find(v => v.id === selectedVendorId);
    if (selectedVendor) {
      const faqs = vendorFAQsMap[selectedVendor.id] || defaultFAQs;
      const clients = vendorClientsMap[selectedVendor.id] || defaultClients;
      const extended = vendorDetailsExtendedMap[selectedVendor.id] || defaultExtendedDetails;

      if (selectedVendor.id === 'vendor-savanko') {
        return renderSavankoDecisionPage(selectedVendor, extended, faqs, clients);
      }

      const subtitle = `${selectedVendor.category} Agency${extended.foundedYear ? ` • Founded ${extended.foundedYear}` : ''}${extended.teamSize ? ` • Team Size ${extended.teamSize}+` : ''}`;

      return (
        <div className="flex flex-col w-full bg-white select-none animate-fadeIn">
          {/* Sticky Header Wrapper - Dynamic height with hysteresis to prevent flickering */}
          <div className={`sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-neutral-200 transition-all duration-300 ${
            isCompact ? 'shadow-sm pt-2.5 pb-0' : 'shadow-none py-5'
          }`}>
            <div className="max-w-6xl mx-auto w-full px-6 flex flex-col transition-all duration-300" style={{ gap: isCompact ? '10px' : '16px' }}>
              
              {/* Back to Directory button inside hero section */}
              {!isCompact && (
                <div className="pb-1">
                  <button
                    onClick={() => {
                      setSelectedVendorId(null);
                      setActiveFAQIndex(null);
                    }}
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
                    Back
                  </button>
                </div>
              )}

              {/* Logo / Header Title Block */}
              {isCompact ? (
                /* Compact Layout (single row) */
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <CompanyLogo
                      src={selectedVendor.logoUrl}
                      name={selectedVendor.name}
                      className="shrink-0 bg-white shadow-sm rounded-xl !w-8 !h-8 p-0.5"
                      size="sm"
                    />
                    <div className="min-w-0 flex items-center gap-2">
                      <h1 className="font-extrabold text-neutral-900 text-md md:text-lg leading-none truncate">
                        {selectedVendor.name}
                      </h1>
                      <span className="text-neutral-400 font-medium text-[12.5px] select-none">—</span>
                      <span className="text-neutral-600 font-bold text-[12.5px] truncate">
                        {selectedVendor.category} Agency
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleOpenForm(selectedVendor)}
                    className="bg-[#C8102E] hover:bg-[#AE0E28] text-white font-extrabold rounded-lg py-2.5 px-4 text-[13px] border-none shadow-sm cursor-pointer shrink-0"
                  >
                    Request Consultation
                  </button>
                </div>
              ) : (
                /* Expanded Layout */
                <div className="flex items-center justify-between gap-4 pb-2">
                  <div className="flex items-center gap-4 min-w-0">
                    <CompanyLogo
                      src={selectedVendor.logoUrl}
                      name={selectedVendor.name}
                      className="shrink-0 bg-white shadow-sm rounded-xl !w-12 !h-12 p-1"
                      size="lg"
                    />
                    <div className="min-w-0">
                      <h1 className="font-extrabold text-neutral-900 leading-none truncate text-xl">
                        {selectedVendor.name}
                      </h1>
                      <p className="font-medium text-neutral-600 truncate mt-1.5 text-[12.5px]">
                        {subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-3">
                    <button
                      onClick={() => handleOpenForm(selectedVendor)}
                      className="bg-[#C8102E] hover:bg-[#AE0E28] text-white font-extrabold rounded-lg px-5.5 py-2.5 text-[13.5px] transition-all duration-300 shadow-sm cursor-pointer border-none"
                    >
                      Request Consultation
                    </button>
                  </div>
                </div>
              )}

              {/* Navigation Bar - Scroll spy tabs, hidden when !isCompact */}
              <div className={`flex gap-6 overflow-x-auto scrollbar-none select-none transition-all duration-300 origin-top ${
                isCompact 
                  ? 'max-h-14 opacity-100 mt-1 pt-1' 
                  : 'max-h-0 opacity-0 mt-0 pt-0 overflow-hidden pointer-events-none'
              }`}>
                {[
                  { id: 'overview-sec', label: 'Services & Overview' },
                  { id: 'success-sec', label: 'Success Story' },
                  { id: 'portfolio-sec', label: 'Case Studies' },
                  { id: 'contact-sec', label: 'Key Contact & Specialties' },
                  { id: 'reviews-sec', label: 'Reviews' },
                  { id: 'faqs-sec', label: 'FAQs' }
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
                      className={`relative pb-2.5 text-[13.5px] font-bold transition-all whitespace-nowrap border-b-[3px] -mb-[1px] ${
                        isActive 
                          ? 'text-neutral-900 font-extrabold border-neutral-900' 
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

          {/* Flat Content List (Single column layout matching DealsView) */}
          <div 
            className="max-w-6xl mx-auto w-full px-6 py-8 flex flex-col gap-0 bg-white"
          >
            
            {/* Section 1: Overview & Services */}
            <div id="overview-sec" className="pb-8 border-b border-neutral-100 flex flex-col gap-4 scroll-mt-[125px]">
              <h3 className="text-[17px] font-bold text-neutral-900">About {selectedVendor.name}</h3>
              <p className="text-[14.5px] text-neutral-800 leading-relaxed font-normal">
                {selectedVendor.details}
              </p>

              {/* Sells/Core Specialties list */}
              <div className="mt-4 flex flex-col gap-3">
                <span className="text-[12.5px] font-extrabold text-neutral-500 uppercase tracking-wider select-none">
                  Core Offerings & Deliverables
                </span>
                {selectedVendor.category === 'Design' && (
                  <ul className="list-disc pl-5 flex flex-col gap-1.5 text-[14px] text-neutral-700 font-normal">
                    <li><span className="font-semibold text-neutral-800">Digital Product Design</span>: End-to-end design sprints, wireframing, and interactive prototyping.</li>
                    <li><span className="font-semibold text-neutral-800">Design Systems</span>: Establishing unified Figma libraries, component architecture, and design token handoff tools.</li>
                    <li><span className="font-semibold text-neutral-800">User Research & Audits</span>: In-depth heuristic analyses, usability testing, and UX discovery.</li>
                  </ul>
                )}
                {selectedVendor.category === 'Legal' && (
                  <ul className="list-disc pl-5 flex flex-col gap-1.5 text-[14px] text-neutral-700 font-normal">
                    <li><span className="font-semibold text-neutral-800">Venture Transaction Advisory</span>: Legal representation for seed and Series A funding rounds, shareholder agreements, and due diligence checks.</li>
                    <li><span className="font-semibold text-neutral-800">Cap Table & ESOP setups</span>: Custom ESOP documentation, pool allocation structures, and vesting setups.</li>
                    <li><span className="font-semibold text-neutral-800">Corporate Compliance</span>: Regulatory filings, company incorporation, and intellectual property/trademark filings.</li>
                  </ul>
                )}
                {selectedVendor.category === 'Finance' && (
                  <ul className="list-disc pl-5 flex flex-col gap-1.5 text-[14px] text-neutral-700 font-normal">
                    <li><span className="font-semibold text-neutral-800">Working Capital Financing</span>: Accessing collateral-free growth lines and non-dilutive bridge capital loans.</li>
                    <li><span className="font-semibold text-neutral-800">Financial Reporting & Retainership</span>: Recurring treasury coordination, bookkeeping review, and accounting audits.</li>
                    <li><span className="font-semibold text-neutral-800">Tax Advisory & Filings</span>: Gift city offshore fund structures, regulatory compliance audits, and tax filing support.</li>
                  </ul>
                )}
                {selectedVendor.category === 'Development' && (
                  <ul className="list-disc pl-5 flex flex-col gap-1.5 text-[14px] text-neutral-700 font-normal">
                    <li><span className="font-semibold text-neutral-800">Full-Stack MVP Delivery</span>: React, Node.js, and React Native mobile client software engineering.</li>
                    <li><span className="font-semibold text-neutral-800">Cloud Infrastructures & DevOps</span>: AWS and GCP deployments, serverless scaling, and CI/CD pipelines setup.</li>
                    <li><span className="font-semibold text-neutral-800">API Integration & Microservices</span>: Decoupled service architecture, gateway routing, and third-party SaaS syncing.</li>
                  </ul>
                )}
              </div>

              {/* Rose-themed PDF placeholder card for Sarvaank Profile */}
              {selectedVendor.id === 'vendor-sarvaank' && (
                <div className="mt-6 p-5 border border-rose-100 bg-rose-50/30 rounded-xl flex items-center justify-between gap-4 max-w-2xl select-none">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-12 h-12 rounded-lg bg-rose-100/80 flex items-center justify-center shrink-0 text-rose-600">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
                        <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
                        <path d="M10 9H8"/>
                        <path d="M16 13H8"/>
                        <path d="M16 17H8"/>
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <span className="block font-bold text-[14px] text-neutral-900 truncate">Sarvaank Associates Profile (April 2026).pdf</span>
                      <span className="block text-[12.5px] text-rose-600 font-semibold mt-0.5">Firm Credentials & Case Briefs • 14.5 KB</span>
                    </div>
                  </div>
                  <a
                    href="file:///Users/kapil/Downloads/Sarvaank Associates Profile (April 2026).pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-[12px] rounded-lg transition-colors shrink-0 shadow-sm cursor-pointer"
                  >
                    View PDF
                  </a>
                </div>
              )}

              {/* VC Funds and Fund Types collaborations */}
              {extended.vcFundsWorked && extended.vcFundsWorked.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-neutral-100">
                  <div className="flex flex-col gap-2.5">
                    <span className="text-[12.5px] font-extrabold text-neutral-500 uppercase tracking-wider select-none">
                      VC Funds Collaborated With
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {extended.vcFundsWorked.map((fund, idx) => (
                        <span
                          key={idx}
                          className="text-[13px] bg-[#F0F4F8] text-[#1E3A8A] font-semibold px-2.5 py-1 rounded border border-[#D9E2EC]"
                        >
                          {fund}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {extended.fundTypes && extended.fundTypes.length > 0 && (
                    <div className="flex flex-col gap-2.5">
                      <span className="text-[12.5px] font-extrabold text-neutral-500 uppercase tracking-wider select-none">
                        Fund Segments Supported
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {extended.fundTypes.map((type, idx) => (
                          <span
                            key={idx}
                            className="text-[13px] bg-[#EAF8F2] text-[#065F46] font-semibold px-2.5 py-1 rounded border border-[#D1FAE5]"
                          >
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Section 2: Success Story */}
            <div id="success-sec" className="py-8 border-b border-neutral-100 flex flex-col gap-3.5 scroll-mt-[125px]">
              <h3 className="text-[17px] font-bold text-neutral-900">Success Story Highlight</h3>
              <p className="text-[14px] text-neutral-800 leading-relaxed font-normal italic bg-neutral-50/50 p-4 border-l-4 border-[#C8102E] rounded-r-lg">
                "{extended.successStory}"
              </p>
            </div>

            {/* Section 3: Case Studies & Portfolio */}
            <div id="portfolio-sec" className="py-8 border-b border-neutral-100 flex flex-col gap-4 scroll-mt-[125px]">
              <div>
                <h3 className="text-[17px] font-bold text-neutral-900">Client Portfolio & Case Studies</h3>
                <p className="text-[13px] text-neutral-500 mt-1 font-normal">
                  Startups who have successfully completed projects with {selectedVendor.name}.
                </p>
              </div>
              
              {clients.length > 0 && (
                <div className="flex flex-col gap-4 mt-2">
                  {clients.map((client, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-100/50 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center gap-3.5">
                        <CompanyLogo
                          name={client.name}
                          className="!w-10 !h-10 shrink-0 border border-neutral-150 p-0.5 rounded-lg shadow-sm"
                          size="sm"
                        />
                        <div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[14px] font-extrabold text-neutral-900">{client.name}</span>
                            <span className="text-[12px] text-neutral-400 select-none">•</span>
                            <span className="text-[12px] font-bold text-neutral-500">Case Study</span>
                          </div>
                          <p className="text-[13.5px] text-neutral-600 mt-1 font-normal leading-relaxed">
                            {client.description}
                          </p>
                        </div>
                      </div>
                      <span className="self-start sm:self-center text-[11px] font-bold text-[#1F8056] bg-[#E4F1EC] border border-[#A8D2BD] px-2.5 py-0.5 rounded-full select-none whitespace-nowrap">
                        {client.highlight}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* PE & VC Startup Representations tag cloud */}
              {extended.notableClientsPEVC && extended.notableClientsPEVC.length > 0 && (
                <div className="mt-6 flex flex-col gap-3">
                  <span className="text-[12.5px] font-extrabold text-neutral-500 uppercase tracking-wider select-none">
                    Represented Clients (Private Equity & Venture Capital)
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {extended.notableClientsPEVC.map((clientName, idx) => (
                      <span
                        key={idx}
                        className="text-[13px] bg-neutral-100 text-neutral-800 border border-neutral-200/60 font-medium px-2.5 py-1 rounded"
                      >
                        {clientName}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Disputes tag cloud */}
              {extended.notableClientsDisputes && extended.notableClientsDisputes.length > 0 && (
                <div className="mt-6 flex flex-col gap-3">
                  <span className="text-[12.5px] font-extrabold text-neutral-500 uppercase tracking-wider select-none">
                    Represented Clients (Dispute Resolution & Litigation)
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {extended.notableClientsDisputes.map((clientName, idx) => (
                      <span
                        key={idx}
                        className="text-[13px] bg-neutral-100 text-neutral-800 border border-neutral-200/60 font-medium px-2.5 py-1 rounded"
                      >
                        {clientName}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* 13 Transaction Showcase Links */}
              {extended.showcaseLinks && extended.showcaseLinks.length > 0 && (
                <div className="mt-6 flex flex-col gap-3">
                  <span className="text-[12.5px] font-extrabold text-neutral-500 uppercase tracking-wider select-none">
                    Featured Transaction & Deal Announcements
                  </span>
                  <div className="flex flex-wrap gap-2.5">
                    {extended.showcaseLinks.map((link, idx) => (
                      <a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 hover:border-neutral-300 text-neutral-800 hover:text-black font-bold text-[13px] rounded-lg transition-all shadow-sm group"
                      >
                        <svg className="w-3.5 h-3.5 text-neutral-500 group-hover:text-[#0A66C2] transition-colors shrink-0" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                        <span>{link.name}</span>
                        <svg className="w-3 h-3 text-neutral-400 group-hover:text-black transition-colors shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                          <path d="m15 3 6 6m0-6-9 9m9-9H15v6" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Section 4: Key Contact & Specialties */}
            <div id="contact-sec" className="py-8 border-b border-neutral-100 flex flex-col gap-6 scroll-mt-[125px]">
              <div>
                <h3 className="text-[17px] font-bold text-neutral-900">Key Contact & Liaison</h3>
                <p className="text-[13px] text-neutral-500 mt-1 font-normal">
                  Connect directly with the lead partner and advisory liaison for Accel portfolio startups.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start mt-2">
                {/* Advisor Profile Card */}
                <div className="md:col-span-2 border border-neutral-200 bg-neutral-50/20 rounded-xl p-5 flex flex-col gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#E1ECF7] text-[#2D5DA0] font-black flex items-center justify-center shrink-0 text-[18px] border border-[#B0C8E2] select-none">
                      {extended.keyContact.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-[15.5px] font-bold text-neutral-900 leading-tight">{extended.keyContact.name}</h4>
                      <span className="text-[12.5px] text-neutral-500 block mt-0.5">{extended.keyContact.role}</span>
                    </div>
                  </div>
                  
                  <p className="text-[13.5px] text-neutral-700 leading-relaxed font-normal">
                    {extended.keyContact.bio}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {extended.keyContact.specialties.map((spec, idx) => (
                      <span
                        key={idx}
                        className="text-[11.5px] bg-[#E1ECF7] text-[#2D5DA0] border border-[#B0C8E2] font-bold px-2.5 py-0.5 rounded-full select-none"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Direct Communications Card */}
                <div className="md:col-span-1 border border-neutral-200 bg-white rounded-xl p-5 flex flex-col gap-4 h-full justify-between">
                  <div className="flex flex-col gap-3.5">
                    <span className="text-[11.5px] font-extrabold text-neutral-400 uppercase tracking-wider select-none">
                      Connection Directory
                    </span>
                    
                    {/* POC Contact Details */}
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[12.5px] font-extrabold text-neutral-700">Lead Advisor Liaison:</span>
                      <a href={`mailto:${extended.pocEmail || 'liaison@sarvaankassociates.com'}`} className="text-[13.5px] text-neutral-600 hover:text-black font-semibold flex items-center gap-1.5 group break-all">
                        <svg className="w-4 h-4 text-neutral-400 group-hover:text-black transition-colors shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                        <span className="underline">{extended.pocEmail || 'liaison@sarvaankassociates.com'}</span>
                      </a>
                      {extended.pocPhone && (
                        <a href={`tel:${extended.pocPhone}`} className="text-[13.5px] text-neutral-600 hover:text-black font-semibold flex items-center gap-1.5 group">
                          <svg className="w-4 h-4 text-neutral-400 group-hover:text-black transition-colors shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                          <span>{extended.pocPhone}</span>
                        </a>
                      )}
                    </div>

                    {/* Central Firm Contact Details */}
                    <div className="flex flex-col gap-1.5 pt-3.5 border-t border-neutral-100">
                      <span className="text-[12.5px] font-extrabold text-neutral-700">Central Office:</span>
                      <a href="mailto:info@sarvaankassociates.com" className="text-[13.5px] text-neutral-600 hover:text-black font-semibold flex items-center gap-1.5 group break-all">
                        <svg className="w-4 h-4 text-neutral-400 group-hover:text-black transition-colors shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                        <span className="underline">info@sarvaankassociates.com</span>
                      </a>
                      <a href={`tel:${extended.firmPhone || '+918882469619'}`} className="text-[13.5px] text-neutral-600 hover:text-black font-semibold flex items-center gap-1.5 group">
                        <svg className="w-4 h-4 text-neutral-400 group-hover:text-black transition-colors shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0116 0z"/><circle cx="12" cy="10" r="3"/></svg>
                        <span>{extended.firmPhone || '+918882469619'}</span>
                      </a>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-neutral-100">
                    <a
                      href={`mailto:${extended.pocEmail || 'info@sarvaankassociates.com'}`}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-neutral-950 hover:bg-neutral-800 text-white text-[13px] font-bold rounded-lg transition-colors shadow-sm select-none cursor-pointer"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                      <span>Message Liaison</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 5: Reviews */}
            <div id="reviews-sec" className="py-8 border-b border-neutral-100 flex flex-col gap-4 scroll-mt-[125px]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-[17px] font-bold text-neutral-900">Founder Reviews & Testimonials</h3>
                  <p className="text-[13px] text-neutral-500 mt-1 font-normal">
                    Verified startup testimonials and satisfaction ratings.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 bg-neutral-50 px-3 py-1.5 rounded-full border border-neutral-200 self-start sm:self-center shrink-0">
                  <span className="text-neutral-400 font-bold text-xs select-none">Overall</span>
                  <span className="text-neutral-900 font-black text-xs">{selectedVendor.rating.toFixed(1)} / 5</span>
                </div>
              </div>
              
              {/* Horizontal reviews scroll with gradient fade cues */}
              <div className="relative w-full overflow-hidden">
                <div className="flex gap-4 overflow-x-auto scrollbar-none pb-3 select-none">
                  {extended.reviews.map((review, idx) => (
                    <div 
                      key={idx} 
                      className="min-w-[290px] sm:min-w-[420px] max-w-[460px] flex-1 p-5 border border-neutral-200 bg-white hover:bg-neutral-50/20 rounded-xl flex flex-col gap-3 shadow-sm"
                    >
                      <div className="flex justify-between items-start flex-wrap gap-2">
                        <div>
                          <span className="block text-[13px] font-bold text-neutral-900 leading-tight">{review.author}</span>
                          <span className="block text-[11.5px] text-neutral-500 font-medium mt-0.5">{review.role}, {review.company}</span>
                        </div>
                        <div className="flex flex-col items-end gap-1.5 shrink-0">
                          <div className="flex text-amber-500 select-none">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <svg key={i} className={`w-3.5 h-3.5 ${i < Math.floor(review.rating) ? 'fill-current' : 'stroke-current fill-none'}`} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                            ))}
                          </div>
                          <span className="text-[9.5px] font-extrabold text-emerald-800 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full select-none">✓ Verified Review</span>
                        </div>
                      </div>

                      <div className="text-[13.5px] font-extrabold text-neutral-900 leading-snug">"{review.title}"</div>
                      
                      <p className="text-[13px] text-neutral-600 font-normal leading-relaxed flex-1">
                        {review.content}
                      </p>
                    </div>
                  ))}
                </div>
                {/* Visual fading gradient signifier at the scroll edge */}
                <div className="absolute right-0 top-0 bottom-3 w-16 bg-gradient-to-r from-transparent to-white pointer-events-none hidden md:block" />
              </div>
            </div>

            {/* Section 6: Frequently Asked Questions */}
            <div id="faqs-sec" className="py-8 flex flex-col gap-4 scroll-mt-[125px]">
              <div>
                <h3 className="text-[17px] font-bold text-neutral-900">Frequently Asked Questions</h3>
                <p className="text-[13px] text-neutral-500 mt-1 font-normal">
                  Direct operational details regarding kickoff, engagement, and rebates.
                </p>
              </div>
              <div className="flex flex-col border-t border-neutral-100 mt-2">
                {faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="py-4 border-b border-neutral-100 flex flex-col gap-1.5 last:border-b-0"
                  >
                    <span className="text-[14px] font-bold text-neutral-900">{faq.q}</span>
                    <p className="text-[13.5px] text-neutral-600 leading-relaxed font-normal">{faq.a}</p>
                  </div>
                ))}
              </div>

              {/* Validity Conditions Card */}
              {extended.validityConditions && extended.validityConditions.length > 0 && (
                <div className="mt-8 border border-neutral-200 bg-neutral-50/30 rounded-xl p-5 flex flex-col gap-4">
                  <span className="text-[12.5px] font-extrabold text-neutral-500 uppercase tracking-wider select-none">
                    Offer Terms & Validity Conditions
                  </span>
                  <ol className="list-decimal pl-5 flex flex-col gap-2.5 text-[13.5px] text-neutral-700 leading-relaxed font-normal">
                    {extended.validityConditions.map((condition, idx) => (
                      <li key={idx}>
                        {condition}
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>

          </div>
        </div>
      );
    }
  }

  return (
    <div className="flex-1 flex flex-col gap-5 py-2 max-w-6xl mx-auto w-full">
      {/* Page Header */}
      <div>
        <h1 className="text-[24px] font-bold text-[var(--text-primary)]">Trusted Partner Directory</h1>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-slideInUp stagger-1">
          {filteredVendors.map((vendor) => (
            <Card
              key={vendor.id}
              onClick={() => setSelectedVendorId(vendor.id)}
              className="flex flex-col justify-between hover:shadow-[var(--shadow-md)] hover:-translate-y-0.5 transition-all cursor-pointer border border-[var(--border-subtle)] bg-white rounded-[12px] p-5 gap-4"
            >
              {/* Card Body */}
              <div className="flex-1 flex gap-4 items-start">
                <CompanyLogo src={vendor.logoUrl} name={vendor.name} size="lg" className="shrink-0 bg-white p-1 border border-neutral-100 shadow-sm rounded-lg" />
                <div className="min-w-0 flex-1">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="text-[19px] font-extrabold text-[var(--text-primary)] leading-tight truncate">
                      {vendor.name}
                    </h3>
                  </div>
                  
                  {/* Category & Location (No category icons) */}
                  <div className="flex items-center gap-1.5 text-[13px] text-[var(--text-muted)] mt-1 font-semibold select-none">
                    <span>{vendor.category}</span>
                    <span>•</span>
                    <span>{vendor.location}</span>
                  </div>

                  <p className="text-[13.5px] text-[var(--text-muted)] leading-relaxed mt-2.5 line-clamp-2 font-normal">
                    {vendor.description}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="flex justify-end items-center pt-3 border-t border-neutral-100 mt-2 shrink-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedVendorId(vendor.id);
                  }}
                  className="px-5 py-2 bg-[#C8102E] hover:bg-[#AE0E28] text-white font-extrabold text-[12.5px] rounded-lg cursor-pointer transition-colors shadow-sm text-center border-none shrink-0"
                >
                  View Details
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
