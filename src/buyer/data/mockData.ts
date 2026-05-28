import { Startup, Deal, Vendor, ClaimAudit } from '../types';

export const mockStartup: Startup = {
  id: 'startup-aurelia',
  name: 'Aurelia Health',
  logo: 'https://logos.hunter.io/aurelia.io', // Restore the Aurelia framework logo as requested
  vcPartner: 'Accel India',
  tier: 'Growth Series A',
  domain: 'aureliahealth.ai',
  employees: 42,
  contactEmail: 'ops@aureliahealth.ai',
  savingsTotal: 7200,
  activeClaimsCount: 1, // Notion (Claimed - pending)
  utilizationsCount: 2, // AWS (Active), Stripe (Approved)
  trustedVendorsCount: 1 // Obvious (engaged)
};

export const mockDeals: Deal[] = [
  {
    id: 'deal-aws',
    title: '$5,000 Cloud Credits',
    vendorName: 'AWS',
    description: 'Build, deploy, and scale your application with free cloud infrastructure credits.',
    value: '$5,000 Credits',
    category: 'Infrastructure',
    logoUrl: 'https://logos.hunter.io/aws.amazon.com',
    eligibilityCriteria: 'Available to all Accel India portfolio startups who have not previously received AWS credit activations.',
    redemptionSteps: [
      'Click the "Claim Deal" button to generate your unique claim code.',
      'Copy the generated code and click "Go to AWS Console".',
      'Under Billing Dashboard -> Credits, enter the code.',
      'Credits will be applied instantly to your monthly infrastructure bill.'
    ],
    longDescription: 'Amazon Web Services provides startups with low-cost, easy-to-use infrastructure needed to scale and grow. This deal offers $5,000 in cloud credits valid for up to 1 year, applicable to AWS services (excluding Route 53, Domain Registrations, and certain third-party SaaS purchases).',
    status: 'active',
    claimCode: 'PRISM-AWS-883A',
    claimedDate: '2026-03-01',
    expiryDate: '2027-03-01'
  },
  {
    id: 'deal-stripe',
    title: 'Fee-Free Processing up to $20,000',
    vendorName: 'Stripe',
    description: 'Accept payments online with no fees on your first $20,000 in transaction volume.',
    value: '$20,000 Fee Waiver',
    category: 'SaaS',
    logoUrl: 'https://logos.hunter.io/stripe.com',
    eligibilityCriteria: 'Valid for new Stripe accounts registered under Aurelia Health tax IDs.',
    redemptionSteps: [
      'Claim the deal and wait for verification from your partner VC manager.',
      'Once approved, check your email for the activation link.',
      'Click the link to log into your Stripe account or register a new one.',
      'The waiver will be automatically active on your account profile.'
    ],
    longDescription: 'Stripe is a suite of APIs powering online payment processing and commerce solutions. With this exclusive waiver, you pay 0% fees on your first $20,000 in credit card or network transactions. Standard pricing applies after the limit is reached.',
    status: 'approved',
    claimCode: 'PRISM-STRIPE-771S',
    claimedDate: '2026-05-15',
    expiryDate: '2027-05-15'
  },
  {
    id: 'deal-notion',
    title: '$1,000 Notion Startup Credits',
    vendorName: 'Notion',
    description: 'Centralize your wiki, docs, and project boards in Notion with free credits.',
    value: '$1,000 Credits',
    category: 'SaaS',
    logoUrl: 'https://logos.hunter.io/notion.so',
    eligibilityCriteria: 'Must be on an active workspace with fewer than 50 members.',
    redemptionSteps: [
      'Click "Claim Deal" to submit a request to the VC partner manager.',
      'The partner manager verifies your active portfolio status.',
      'After approval, copy the claim code and paste it under Notion Settings -> Billing -> Apply Code.'
    ],
    longDescription: 'Notion is the single workspace where you can write, plan, collaborate, and get organized. This startup package gives you $1,000 in credits toward the Notion Plus Plan (with AI add-ons supported). Ideal for organizing documentation, sprint planning, and client wikis.',
    status: 'claimed',
    claimCode: 'PRISM-NOTION-992N',
    claimedDate: '2026-05-26',
    expiryDate: '2027-05-26'
  },
  {
    id: 'deal-retool',
    title: '$1,200 Developer Platform Credits',
    vendorName: 'Retool',
    description: 'Build custom internal dashboards and admin tools 10x faster with Retool credits.',
    value: '$1,200 Credits',
    category: 'SaaS',
    logoUrl: 'https://logos.hunter.io/retool.com',
    eligibilityCriteria: 'Available to all growth startups in the Accel network who have not claimed Retool credits previously.',
    redemptionSteps: [
      'Click "Claim Deal" to instantly generate your coupon.',
      'Register a new Retool account or visit your existing billing settings.',
      'Enter the code to apply $1,200 of credits to your Business or Team subscription.'
    ],
    longDescription: 'Retool makes it easy to build internal tools, database GUIs, and administrative dashboards. Connect to databases and APIs and build drag-and-drop components instantly. Credits can be used for any Retool Cloud team sizes.',
    status: 'available'
  },
  {
    id: 'deal-slack',
    title: '$500 Annual Plan Credit',
    vendorName: 'Slack',
    description: 'Boost team collaboration with discounts on Slack Pro or Business+ plans.',
    value: '$500 Discount',
    category: 'SaaS',
    logoUrl: 'https://logos.hunter.io/slack.com',
    eligibilityCriteria: 'Applicable to new workspace upgrades or first-time annual commitments.',
    redemptionSteps: [
      'Generate code through the Portal.',
      'Visit your Slack billing settings and toggle to annual billing.',
      'Enter code at checkout to deduct $500 from your annual payment.'
    ],
    longDescription: 'Slack brings all your communication together, integrating with the tools you use daily. Pro and Business plans offer unlimited history, screen sharing, huddles, and external channels (Slack Connect).',
    status: 'available'
  },
  {
    id: 'deal-vercel',
    title: '$1,000 Vercel Pro Credits',
    vendorName: 'Vercel',
    description: 'Deploy web projects instantly with global CDN and serverless infrastructure credits.',
    value: '$1,000 Credits',
    category: 'Infrastructure',
    logoUrl: 'https://logos.hunter.io/vercel.com',
    eligibilityCriteria: 'Startup must be under a Pro team plan with Vercel.',
    redemptionSteps: [
      'Claim code in Portal.',
      'Log in to Vercel and navigate to Team Settings -> Billing.',
      'Paste code to apply $1,000 credits to your team account.'
    ],
    longDescription: 'Vercel is the platform for frontend developers, providing speed and reliability. Deploy Next.js, React, or Vue apps with zero configuration. Credits cover team seats, bandwidth, and serverless executions.',
    status: 'available'
  },
  {
    id: 'deal-hubspot',
    title: '90% Off HubSpot CRM Suite',
    vendorName: 'HubSpot',
    description: 'Scale your marketing, sales, and customer service teams with a huge discount.',
    value: '90% Off First Year',
    category: 'Operations',
    logoUrl: 'https://logos.hunter.io/hubspot.com',
    eligibilityCriteria: 'Startups with under $1M in funding and new HubSpot customers only.',
    redemptionSteps: [
      'Click Claim Deal to start verification.',
      'Complete the HubSpot startup application with the pre-filled partner referral code.',
      'Upon HubSpot team verification, the 90% discount applies to your custom onboarding quote.'
    ],
    longDescription: 'HubSpot offers a complete CRM platform with marketing, sales, customer service, and content management software. This deal provides a 90% discount in your first year, 50% in your second, and 30% ongoing.',
    status: 'available'
  },
  {
    id: 'deal-google-workspace',
    title: '1 Year Free Google Workspace',
    vendorName: 'Google',
    description: 'Professional business email, cloud storage, and video conferencing for your team.',
    value: '1 Year Free (Up to 10 users)',
    category: 'Operations',
    logoUrl: 'https://logos.hunter.io/google.com',
    eligibilityCriteria: 'New Google Workspace tenants only, sponsored by Accel portfolio team.',
    redemptionSteps: [
      'Claim the deal and wait for verification from your partner VC manager.',
      'Once approved, copy the partner voucher code.',
      'Create your tenant on Google Workspace and apply code during payment setup.'
    ],
    longDescription: 'Get custom business emails with your domain name (you@yourcompany.com). Access Gmail, Drive, Calendar, Docs, Sheets, and Meet with extra security and admin controls.',
    status: 'available'
  }
];

export const mockVendors: Vendor[] = [
  {
    id: 'vendor-obvious',
    name: 'Obvious',
    category: 'Design',
    description: 'India\'s leading digital product design consultancy. They design apps, websites, and design systems for scale.',
    logoUrl: 'https://logos.hunter.io/obvious.in',
    vcTrusted: true,
    tags: ['Product Strategy', 'UI/UX Design', 'Design Systems'],
    rating: 4.9,
    location: 'Bangalore, KA',
    details: 'Obvious has designed some of India\'s largest digital products including Swiggy, Flipkart, and Myntra. They partner with VC firms to accelerate seed and Series A portfolio companies.',
    specialties: ['Mobile & Web Product Design', 'Brand Identity', 'Heuristic Audits', 'Design Operations'],
    typicalEngagement: '3-6 months sprint-based contract. Accel startups receive a 15% discount on kickoff sprints.'
  },
  {
    id: 'vendor-cyril',
    name: 'Cyril Amarchand Mangaldas',
    category: 'Legal',
    description: 'Premier Indian corporate law firm specializing in venture funding, compliance, IP, and ESOP schemes.',
    logoUrl: 'https://logos.hunter.io/cyrilshroff.com',
    vcTrusted: true,
    tags: ['Venture Funding', 'IP Law', 'ESOP Structure', 'Compliance'],
    rating: 4.8,
    location: 'Mumbai, MH',
    details: 'CAM handles major merger-acquisition and corporate funding setups in the Indian tech ecosystem. They offer special startup packages for seed stage entities.',
    specialties: ['Venture Capital Transactions', 'ESOP Pool Setup & Documentation', 'Corporate Compliance & Filing', 'Intellectual Property Protection'],
    typicalEngagement: 'Retainer-based or project-specific billing. Free initial consultation for portfolio members.'
  },
  {
    id: 'vendor-razorpay-capital',
    name: 'Razorpay Capital',
    category: 'Finance',
    description: 'Flexible debt financing and working capital loans tailored for fast-growing SaaS and ecommerce startups.',
    logoUrl: 'https://logos.hunter.io/razorpay.com',
    vcTrusted: true,
    tags: ['Debt Financing', 'Revenue-Based Loans', 'Cash Flow Management'],
    rating: 4.7,
    location: 'Bangalore, KA',
    details: 'Razorpay Capital offers quick collateral-free capital. Startups can borrow based on recurring subscription revenues or monthly transaction processing volumes.',
    specialties: ['Collateral-Free Capital Loans', 'Recurring Revenue Financing', 'Corporate Cards with No Personal Guarantees'],
    typicalEngagement: 'Quick approval workflow (under 48 hours). Special interest rate rebates for VC referred founders.'
  },
  {
    id: 'vendor-codal',
    name: 'Codal India',
    category: 'Development',
    description: 'Full-stack software engineering firm building scalable web backends, APIs, and mobile applications.',
    logoUrl: 'https://logos.hunter.io/codal.com',
    vcTrusted: false,
    tags: ['Node.js', 'React Native', 'AWS Devops', 'Full-stack Development'],
    rating: 4.5,
    location: 'Ahmedabad, GJ',
    details: 'Codal delivers cloud-native software architectures with high security and speed. They have worked with over 100 startups on MVP delivery.',
    specialties: ['MVP Development & Launch', 'API Integrations & Migrations', 'Serverless Backends', 'QA Automation'],
    typicalEngagement: 'Team augmentation or fixed-bid projects. Dedicated project manager included for all startups.'
  }
];

export const mockAudits: ClaimAudit[] = [
  {
    id: 'audit-aws',
    dealId: 'deal-aws',
    dealTitle: '$5,000 Cloud Credits',
    vendorName: 'AWS',
    value: '$5,000 Credits',
    claimCode: 'PRISM-AWS-883A',
    claimedDate: '2026-03-01',
    status: 'active',
    auditLogs: [
      {
        timestamp: '2026-03-01 10:14 AM',
        action: 'Claim Initiated',
        note: 'Code requested by operations manager ops@aureliahealth.ai.'
      },
      {
        timestamp: '2026-03-01 10:15 AM',
        action: 'Voucher Generated',
        note: 'Unique code PRISM-AWS-883A assigned.'
      },
      {
        timestamp: '2026-03-05 04:30 PM',
        action: 'Status Updated: Active',
        note: 'AWS Billing API verified credit redemption on target account tenant.'
      }
    ]
  },
  {
    id: 'audit-stripe',
    dealId: 'deal-stripe',
    dealTitle: 'Fee-Free Processing up to $20,000',
    vendorName: 'Stripe',
    value: '$20,000 Fee Waiver',
    claimCode: 'PRISM-STRIPE-771S',
    claimedDate: '2026-05-15',
    status: 'approved',
    auditLogs: [
      {
        timestamp: '2026-05-15 11:22 AM',
        action: 'Claim Submitted',
        note: 'Submitted to Accel India review dashboard.'
      },
      {
        timestamp: '2026-05-16 02:00 PM',
        action: 'VC Verified',
        note: 'Approved by Accel Portfolio Relationship Manager (Karan Sharma).'
      },
      {
        timestamp: '2026-05-16 02:05 PM',
        action: 'Status Updated: Approved',
        note: 'Stripe API link dispatched to register Aurelia Health Stripe ID.'
      }
    ]
  },
  {
    id: 'audit-notion',
    dealId: 'deal-notion',
    dealTitle: '$1,000 Notion Startup Credits',
    vendorName: 'Notion',
    value: '$1,000 Credits',
    claimCode: 'PRISM-NOTION-992N',
    claimedDate: '2026-05-26',
    status: 'claimed',
    auditLogs: [
      {
        timestamp: '2026-05-26 09:30 AM',
        action: 'Claim Submitted',
        note: 'Awaiting portfolio manager authorization.'
      }
    ]
  }
];
