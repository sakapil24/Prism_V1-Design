import { Startup, Deal, Vendor, ClaimAudit } from '../types';

export const mockStartup: Startup = {
  id: 'startup-aurelia',
  name: 'Aurelia Health',
  logo: 'https://logo.clearbit.com/modernhealth.com', // Updated to premium modern health logo
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
    logoUrl: 'https://logo.clearbit.com/aws.amazon.com',
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
    expiryDate: '2027-03-01',
    selectedVariationIndex: 0,
    variations: [
      { id: 'aws-5k', title: '$5,000 Cloud Credits', description: 'One-time cloud credits valid for up to 1 year.', value: '$5,000 Credits' },
      { id: 'aws-10k-match', title: 'Up to $10,000 matched credits', description: 'Co-invest match for early growth startups.', value: '1:1 Matched Credits' }
    ],
    websiteUrl: 'https://aws.amazon.com',
    supportContact: 'aws-startups@amazon.com',
    programDetailsUrl: 'https://aws.amazon.com/startups/activate/',
    githubUrl: 'https://github.com/aws/aws-cli',
    usageMetric: 'Used by 84% of portfolio companies this batch',
    screenshots: [
      { url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80', caption: 'AWS Compute & Cost Explorer dashboard showing monthly infrastructure usage' },
      { url: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=1200&q=80', caption: 'AWS Cloud Console architecture and serverless resource monitoring' }
    ]
  },
  {
    id: 'deal-stripe',
    title: 'Fee-Free Processing up to $20,000',
    vendorName: 'Stripe',
    description: 'Accept payments online with no fees on your first $20,000 in transaction volume.',
    value: '$20,000 Fee Waiver',
    category: 'SaaS',
    logoUrl: 'https://logo.clearbit.com/stripe.com',
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
    expiryDate: '2027-05-15',
    selectedVariationIndex: 0,
    variations: [
      { id: 'stripe-20k', title: 'Fee-Free Processing up to $20,000', description: 'No fees on your first $20,000 in payment volume.', value: '$20,000 Fee Waiver' },
      { id: 'stripe-100-atlas', title: 'Free Stripe Atlas Setup', description: 'Fully waive the $500 Stripe Atlas incorporation fee.', value: 'Atlas Fee Waiver' }
    ],
    websiteUrl: 'https://stripe.com',
    supportContact: 'startup-ops@stripe.com',
    programDetailsUrl: 'https://stripe.com/partners/startups',
    githubUrl: 'https://github.com/stripe/stripe-node',
    usageMetric: 'Processed $1.2M fee-free volume last month',
    screenshots: [
      { url: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80', caption: 'Stripe Payments and transactions ledger dashboard' },
      { url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80', caption: 'Stripe Customer Subscription billing and MRR graph analytics' }
    ]
  },
  {
    id: 'deal-notion',
    title: '$1,000 Notion Startup Credits',
    vendorName: 'Notion',
    description: 'Centralize your wiki, docs, and project boards in Notion with free credits.',
    value: '$1,000 Credits',
    category: 'SaaS',
    logoUrl: 'https://logo.clearbit.com/notion.so',
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
    expiryDate: '2027-05-26',
    selectedVariationIndex: 0,
    variations: [
      { id: 'notion-1k', title: '$1,000 Plus Plan Credits', description: 'Apply $1,000 in workspace billing credits.', value: '$1,000 Credits' },
      { id: 'notion-ai-free', title: '6 Months of Free Notion AI', description: 'Free AI add-on for up to 20 seats.', value: '6mo Free AI' }
    ],
    websiteUrl: 'https://notion.so',
    supportContact: 'startups-help@makenotion.com',
    programDetailsUrl: 'https://www.notion.so/startups',
    githubUrl: 'https://github.com/makenotion/notion-sdk-js',
    usageMetric: 'Active on 48 team workspaces in this fund',
    screenshots: [
      { url: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&w=1200&q=80', caption: 'Notion Workspace wiki and collaborative project documentation' },
      { url: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80', caption: 'Notion Sprint planning and engineering project board view' }
    ]
  },
  {
    id: 'deal-retool',
    title: '$1,200 Developer Platform Credits',
    vendorName: 'Retool',
    description: 'Build custom internal dashboards and admin tools 10x faster with Retool credits.',
    value: '$1,200 Credits',
    category: 'SaaS',
    logoUrl: 'https://logo.clearbit.com/retool.com',
    eligibilityCriteria: 'Available to all growth startups in the Accel network who have not claimed Retool credits previously.',
    redemptionSteps: [
      'Click "Claim Deal" to instantly generate your coupon.',
      'Register a new Retool account or visit your existing billing settings.',
      'Enter the code to apply $1,200 of credits to your Business or Team subscription.'
    ],
    longDescription: 'Retool makes it easy to build internal tools, database GUIs, and administrative dashboards. Connect to databases and APIs and build drag-and-drop components instantly. Credits can be used for any Retool Cloud team sizes.',
    status: 'available',
    selectedVariationIndex: 0,
    variations: [
      { id: 'retool-1200', title: '$1,200 Developer Platform Credits', description: 'A one-time credit maxed out at any time. Ideal for self-serve sizing.', value: '$1,200 Credits' },
      { id: 'retool-100-mo', title: '$100/month credit for 12 months', description: 'Monthly recurring credit applied directly to standard billing cycles.', value: '$100/mo for 12mo' }
    ],
    websiteUrl: 'https://retool.com',
    supportContact: 'partnerships@retool.com',
    programDetailsUrl: 'https://retool.com/startups',
    githubUrl: 'https://github.com/tryretool/retool-cli',
    usageMetric: 'Saved 120+ developer hours on internal tools',
    screenshots: [
      { url: 'https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&w=1200&q=80', caption: 'Retool IDE drag-and-drop designer UI for building internal admin tools' }
    ]
  },
  {
    id: 'deal-slack',
    title: '$500 Annual Plan Credit',
    vendorName: 'Slack',
    description: 'Boost team collaboration with discounts on Slack Pro or Business+ plans.',
    value: '$500 Discount',
    category: 'SaaS',
    logoUrl: 'https://logo.clearbit.com/slack.com',
    eligibilityCriteria: 'Applicable to new workspace upgrades or first-time annual commitments.',
    redemptionSteps: [
      'Generate code through the Portal.',
      'Visit your Slack billing settings and toggle to annual billing.',
      'Enter code at checkout to deduct $500 from your annual payment.'
    ],
    longDescription: 'Slack brings all your communication together, integrating with the tools you use daily. Pro and Business plans offer unlimited history, screen sharing, huddles, and external channels (Slack Connect).',
    status: 'available',
    websiteUrl: 'https://slack.com',
    supportContact: 'startups@slack-corp.com',
    programDetailsUrl: 'https://slack.com/solutions/startups',
    githubUrl: 'https://github.com/slackapi/bolt-js',
    usageMetric: 'Connected 32 Accel startups on Slack Connect',
    screenshots: [
      { url: 'https://cdn.prod.website-files.com/60473d8edc329c41a58f1151/6819ca163934dd62ddbd483e_664dc94e4c8b36c2f2d35a8e_slack-promo-code.jpeg', caption: 'FounderPass Slack Partner Promo: 25% Off Pro & Business+ Tiers' },
      { url: 'https://cdn.prod.website-files.com/60473d8edc329c41a58f1151/6792288be964fc2e6e9492aa_664f09883ca55052d28631e7_slack-coupon.jpeg', caption: 'Slack billing console showing coupon code applied successfully for 12 months' }
    ]
  },
  {
    id: 'deal-vercel',
    title: '$1,000 Vercel Pro Credits',
    vendorName: 'Vercel',
    description: 'Deploy web projects instantly with global CDN and serverless infrastructure credits.',
    value: '$1,000 Credits',
    category: 'Infrastructure',
    logoUrl: 'https://logo.clearbit.com/vercel.com',
    eligibilityCriteria: 'Startup must be under a Pro team plan with Vercel.',
    redemptionSteps: [
      'Claim code in Portal.',
      'Log in to Vercel and navigate to Team Settings -> Billing.',
      'Paste code to apply $1,000 credits to your team account.'
    ],
    longDescription: 'Vercel is the platform for frontend developers, providing speed and reliability. Deploy Next.js, React, or Vue apps with zero configuration. Credits cover team seats, bandwidth, and serverless executions.',
    status: 'available',
    websiteUrl: 'https://vercel.com',
    supportContact: 'startups@vercel.com',
    programDetailsUrl: 'https://vercel.com/startups',
    githubUrl: 'https://github.com/vercel/vercel',
    usageMetric: 'Hosts 18 production frontend deployments',
    screenshots: [
      { url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80', caption: 'Vercel Deployment panel with branch previews and serverless execution logs' }
    ]
  },
  {
    id: 'deal-hubspot',
    title: '90% Off HubSpot CRM Suite',
    vendorName: 'HubSpot',
    description: 'Scale your marketing, sales, and customer service teams with a huge discount.',
    value: '90% Off First Year',
    category: 'Operations',
    logoUrl: 'https://logo.clearbit.com/hubspot.com',
    eligibilityCriteria: 'Startups with under $1M in funding and new HubSpot customers only.',
    redemptionSteps: [
      'Click Claim Deal to start verification.',
      'Complete the HubSpot startup application with the pre-filled partner referral code.',
      'Upon HubSpot team verification, the 90% discount applies to your custom onboarding quote.'
    ],
    longDescription: 'HubSpot offers a complete CRM platform with marketing, sales, customer service, and content management software. This deal provides a 90% discount in your first year, 50% in your second, and 30% ongoing.',
    status: 'available',
    websiteUrl: 'https://hubspot.com',
    supportContact: 'startups@hubspot.com',
    programDetailsUrl: 'https://www.hubspot.com/startups',
    githubUrl: 'https://github.com/HubSpot/hubspot-api-nodejs',
    usageMetric: 'Used by 24 sales and marketing growth teams',
    isLocked: true
  },
  {
    id: 'deal-google-workspace',
    title: '1 Year Free Google Workspace',
    vendorName: 'Google',
    description: 'Professional business email, cloud storage, and video conferencing for your team.',
    value: '1 Year Free (Up to 10 users)',
    category: 'Operations',
    logoUrl: 'https://logo.clearbit.com/google.com',
    eligibilityCriteria: 'New Google Workspace tenants only, sponsored by Accel portfolio team.',
    redemptionSteps: [
      'Claim the deal and wait for verification from your partner VC manager.',
      'Once approved, copy the partner voucher code.',
      'Create your tenant on Google Workspace and apply code during payment setup.'
    ],
    longDescription: 'Get custom business emails with your domain name (you@yourcompany.com). Access Gmail, Drive, Calendar, Docs, Sheets, and Meet with extra security and admin controls.',
    status: 'available',
    websiteUrl: 'https://workspace.google.com',
    supportContact: 'workspace-partners@google.com',
    programDetailsUrl: 'https://workspace.google.com/solutions/startups/',
    githubUrl: 'https://github.com/googleapis/google-api-nodejs-client',
    usageMetric: 'Pre-configured for 14 early stage teams',
    isLocked: true
  },
  {
    id: 'deal-chatprd',
    title: '1 Year Free ChatPRD Pro',
    vendorName: 'ChatPRD',
    description: 'AI copilot to draft product requirements documents (PRDs) and automate product management workflows.',
    value: '$180 Value',
    category: 'SaaS',
    logoUrl: 'https://logo.clearbit.com/chatprd.com',
    eligibilityCriteria: 'Available to all Accel India portfolio startups subscribing to ChatPRD Pro.',
    redemptionSteps: [
      'Click "Claim Deal" to copy your partner voucher code.',
      'Go to ChatPRD and log in or sign up.',
      'Under account settings, upgrade to Pro and apply the code during payment setup.'
    ],
    longDescription: 'ChatPRD is an AI-powered assistant built specifically for Product Managers. It helps write high-quality PRDs, map features, brainstorm release plans, and automate tedious product documentation in seconds. Accel startups get 1 year of ChatPRD Pro completely free.',
    status: 'claimed',
    claimCode: 'PRISM-CHATPRD-921C',
    claimedDate: '2026-05-28',
    expiryDate: '2027-05-28',
    websiteUrl: 'https://chatprd.com',
    supportContact: 'help@chatprd.com',
    programDetailsUrl: 'https://www.chatprd.com/pricing',
    githubUrl: 'https://github.com/chatprd/chatprd-sdk',
    usageMetric: 'Used by 15 product teams to draft 80+ PRDs'
  },
  {
    id: 'deal-factory',
    title: '1 Year Free Factory Pro',
    vendorName: 'Factory',
    description: 'Software development agent designed to automate production engineering work, code generation, and reviews.',
    value: '$240 Value',
    category: 'SaaS',
    logoUrl: 'https://logo.clearbit.com/factory.ai',
    eligibilityCriteria: 'Valid for first-time Factory customers in the Accel portfolio.',
    redemptionSteps: [
      'Claim the voucher code from your Portals dashboard.',
      'Log into the Factory developer console.',
      'Apply the code in your billing profile to waive all Pro subscription fees for 12 months.'
    ],
    longDescription: 'Factory introduces autonomous software development agents that integrate into your codebase, automatically generating code, writing tests, reviewing PRs, and maintaining package updates. Startups get a full year of Factory Pro free.',
    status: 'claimed',
    claimCode: 'PRISM-FACTORY-419F',
    claimedDate: '2026-05-29',
    expiryDate: '2027-05-29',
    websiteUrl: 'https://factory.ai',
    supportContact: 'support@factory.ai',
    programDetailsUrl: 'https://www.factory.com/startups',
    githubUrl: 'https://github.com/factory-ai/factory-sdk',
    usageMetric: 'Automated 200+ PR reviews for 9 startups'
  },
  {
    id: 'deal-framer',
    title: '1 Year Free Framer Pro',
    vendorName: 'Framer',
    description: 'Design-first website builder to design, build, and publish high-performance marketing pages without engineering.',
    value: '$360 Value',
    category: 'SaaS',
    logoUrl: 'https://logo.clearbit.com/framer.com',
    eligibilityCriteria: 'Applicable to new Framer Pro workspace upgrades.',
    redemptionSteps: [
      'Claim your Framer voucher code.',
      'Open your Framer team workspace settings and select the Pro Plan upgrade.',
      'Paste the promo code at checkout to waive the cost for the first year.'
    ],
    longDescription: 'Framer is the design tool that publishes. It lets designers and marketers build state-of-the-art websites, landing pages, and blogs with stunning animations and absolute design control — all published with a single click. This voucher waives the Framer Pro annual fee.',
    status: 'available',
    websiteUrl: 'https://framer.com',
    supportContact: 'startups@framer.com',
    programDetailsUrl: 'https://www.framer.com/startups',
    githubUrl: 'https://github.com/framer/framer-motion',
    usageMetric: 'Powered 28 stunning landing page launches'
  },
  {
    id: 'deal-granola',
    title: '1 Year Free Granola Business (10 seats)',
    vendorName: 'Granola',
    description: 'AI notepad that automatically transcribes and extracts insights from your video meetings.',
    value: '$1,680 Value',
    category: 'SaaS',
    logoUrl: 'https://logo.clearbit.com/granola.so',
    eligibilityCriteria: 'Available to all active portfolio teams up to 10 seats.',
    redemptionSteps: [
      'Claim the voucher to get your custom registration link.',
      'Register your team domain on the Granola platform.',
      'Apply code to get 10 free seats of Granola Business for a full year.'
    ],
    longDescription: 'Granola is an AI notepad built specifically for engineering and product teams. It runs silently in the background of your Zoom, Google Meet, or Slack Huddles, creating highly structured meeting logs, transcription summaries, and tracking item deliverables automatically. Startup package provides 10 free seats for 12 months.',
    status: 'claimed',
    claimCode: 'PRISM-GRANOLA-782G',
    claimedDate: '2026-05-30',
    expiryDate: '2027-05-30',
    websiteUrl: 'https://granola.so',
    supportContact: 'support@granola.so',
    programDetailsUrl: 'https://www.granola.so/blog',
    githubUrl: 'https://github.com/granola-so/granola-sdk',
    usageMetric: 'Generated meeting summaries for 12 teams'
  },
  {
    id: 'deal-gumloop',
    title: '1 Year Free Gumloop Pro (20k credits/mo)',
    vendorName: 'Gumloop',
    description: 'No-code AI workflow builder to create and deploy AI agents across all your databases and apps.',
    value: '$444 Value',
    category: 'SaaS',
    logoUrl: 'https://logo.clearbit.com/gumloop.com',
    eligibilityCriteria: 'New Gumloop accounts sponsored by partner VC program.',
    redemptionSteps: [
      'Claim your voucher code.',
      'Log into the Gumloop dashboard.',
      'Enter code under billing to activate the Pro tier and add 20k recurring monthly credits.'
    ],
    longDescription: 'Gumloop is the drag-and-drop workspace for building advanced AI workflows and agents. Automate customer support, generate data reports, crawl web pages, and connect AI to your internal databases without writing code. This deal waives the Pro plan fee and credits your account with 20k monthly runs.',
    status: 'available',
    isNew: true,
    websiteUrl: 'https://gumloop.com',
    supportContact: 'support@gumloop.com',
    programDetailsUrl: 'https://www.gumloop.com/docs',
    githubUrl: 'https://github.com/gumloop/gumloop-sdk',
    usageMetric: 'Automated 1,200+ data workflows this week'
  },
  {
    id: 'deal-intercom',
    title: '1 Year Free Fin AI Agent + Intercom Advanced',
    vendorName: 'Intercom',
    description: 'Complete customer support suite with 5 free seats and $100/mo in Fin AI outcome credits.',
    value: '$7,140 Value',
    category: 'SaaS',
    logoUrl: 'https://logo.clearbit.com/intercom.com',
    eligibilityCriteria: 'Startups registered under Accel program with no prior Intercom subscriptions.',
    redemptionSteps: [
      'Generate code through Portals.',
      'Register your company details on Intercom.',
      'Submit the code on the payment page to receive 12 months free of Intercom Advanced plus Fin AI credits.'
    ],
    longDescription: 'Intercom helps companies deliver top-tier customer support. Scale your operations instantly using Fin, their advanced conversational AI agent. This exclusive startup deal includes 1 year free of Intercom Advanced (up to 5 seats) and $100/month in Fin AI outcome credits.',
    status: 'available',
    isNew: true,
    websiteUrl: 'https://intercom.com',
    supportContact: 'startups@intercom.io',
    programDetailsUrl: 'https://www.intercom.com/early-stage',
    githubUrl: 'https://github.com/intercom/intercom-node',
    usageMetric: 'Resolved 4,500+ customer chats automatically'
  }
];

export const mockVendors: Vendor[] = [
  {
    id: 'vendor-sarvaank',
    name: 'Sarvaank Associates LLP',
    category: 'Legal',
    description: 'Sarvaank Associates LLP is a full-service legal and advisory firm delivering strategic, business-focused solutions across corporate, regulatory, transactional, and dispute resolution matters.',
    logoUrl: 'src/buyer/components/sarvaank_logo.png',
    vcTrusted: true,
    tags: ['Venture Capital', 'M&A', 'Corporate Law', 'Disputes'],
    rating: 5.0,
    location: 'New Delhi, DL',
    details: 'Sarvaank Associates LLP is a boutique, full-service legal and advisory firm founded in 2019, recognized by leading legal directories including IFLR1000 and Legal 500 for its work in Private Equity & Venture Capital and Corporate & M&A. Built on the belief that legal advice should enable business objectives rather than constrain them, Sarvaank delivers practical, business-oriented solutions across corporate, commercial, transactional, and dispute resolution matters. With strong expertise in cap table structuring, equity dilution management, and investor negotiations, Sarvaank partners with startups, investors, and high-growth businesses to build compliant, scalable, and investment-ready enterprises.',
    specialties: ['Fundraising & ESOPs', 'Corporate Structuring & M&A', 'Commercial Contracts', 'Dispute Resolution & Risk'],
    typicalEngagement: 'VC Hub Member Offer: 30-min free initial consultation and preferential pricing on professional fees.'
  },
  {
    id: 'vendor-savanko',
    name: 'Savanko Partners',
    category: 'Legal',
    description: 'Savanko Partners is a boutique legal advisory firm specializing in fundraising, cap table compliance, ESOP setups, and corporate governance for high-growth, venture-backed startups.',
    logoUrl: 'https://logo.clearbit.com/savankopartners.com',
    vcTrusted: true,
    tags: ['Fundraising', 'ESOP Setup', 'Governance', 'Compliance'],
    rating: 5.0,
    location: 'Bangalore, KA',
    details: 'Savanko Partners acts as a true deal partner rather than a transactional vendor. They specialize in venture capital transactions, ESOP pool rollouts, corporate governance, and complex disputes.',
    specialties: ['Fundraising & Transactions', 'ESOP Pool Setup', 'Corporate Governance', 'Compliance & Restructuring'],
    typicalEngagement: 'VC Hub Member Offer: Free Initial Consultation & 20% discount on first fundraising or ESOP rollout mandate.'
  },
  {
    id: 'vendor-obvious',
    name: 'Obvious',
    category: 'Design',
    description: 'India\'s leading digital product design consultancy. They design apps, websites, and design systems for scale.',
    logoUrl: 'https://logo.clearbit.com/obvious.in',
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
    logoUrl: 'https://logo.clearbit.com/cyrilshroff.com',
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
    logoUrl: 'https://logo.clearbit.com/razorpay.com',
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
    logoUrl: 'https://logo.clearbit.com/codal.com',
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
  },
  {
    id: 'audit-chatprd',
    dealId: 'deal-deal-chatprd',
    dealTitle: '1 Year Free ChatPRD Pro',
    vendorName: 'ChatPRD',
    value: '$180 Value',
    claimCode: 'PRISM-CHATPRD-921C',
    claimedDate: '2026-05-28',
    status: 'claimed',
    auditLogs: [
      {
        timestamp: '2026-05-28 02:15 PM',
        action: 'Claim Submitted',
        note: 'Submitted by product lead.'
      }
    ]
  },
  {
    id: 'audit-factory',
    dealId: 'deal-deal-factory',
    dealTitle: '1 Year Free Factory Pro',
    vendorName: 'Factory',
    value: '$240 Value',
    claimCode: 'PRISM-FACTORY-419F',
    claimedDate: '2026-05-29',
    status: 'claimed',
    auditLogs: [
      {
        timestamp: '2026-05-29 11:42 AM',
        action: 'Claim Submitted',
        note: 'Submitted by engineering ops manager.'
      }
    ]
  },
  {
    id: 'audit-granola',
    dealId: 'deal-deal-granola',
    dealTitle: '1 Year Free Granola Business (10 seats)',
    vendorName: 'Granola',
    value: '$1,680 Value',
    claimCode: 'PRISM-GRANOLA-782G',
    claimedDate: '2026-05-30',
    status: 'claimed',
    auditLogs: [
      {
        timestamp: '2026-05-30 04:00 PM',
        action: 'Claim Submitted',
        note: 'Submitted by CEO.'
      }
    ]
  }
];
