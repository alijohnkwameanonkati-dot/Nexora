import type { ProjectCaseStudy } from '../types';
import savourHouseImg from '../assets/images/demo_savour_house_1794725272894.jpg';
import modernBusinessImg from '../assets/images/demo_modern_business_1794725272993.jpg';
import ecommerceStoreImg from '../assets/images/demo_ecommerce_store_1794725272759.jpg';
import personalPortfolioImg from '../assets/images/demo_personal_portfolio_1794725273630.jpg';
import serviceWebsiteImg from '../assets/images/demo_service_website_1794725273547.jpg';

export const PORTFOLIO_PROJECTS: ProjectCaseStudy[] = [
  {
    slug: 'savour-house-restaurant-website',
    title: 'Savour House',
    subtitle: 'Modern Bistro & Fine Hospitality Digital Platform',
    category: 'Restaurant',
    conceptBadge: 'Concept Demonstration',
    shortDescription:
      'An atmospheric hospitality website concept uniting live seasonal menu browsing, dietary filtering, and frictionless table reservations.',
    overview:
      'Savour House is a concept demonstration designed to show how independent restaurants and modern bistros can replace static PDF menus with a mobile-first digital dining experience. Every interaction—from checking evening availability to filtering gluten-free courses—is built for speed on a guest’s phone.',
    objectives: [
      'Replace hard-to-read downloadable PDF menus with an accessible, searchable course directory.',
      'Streamline table reservation requests into a three-step mobile-friendly booking drawer.',
      'Capture the warmth and tactile character of an upscale dining room through editorial framing.',
    ],
    designApproach:
      'We paired warm charcoal surfaces with brushed stone accents and restrained editorial serif headings for dish titles. High-contrast dietary indicators and crisp pricing columns let guests scan appetizers, mains, and cellar pairings effortlessly in low-light dining environments.',
    features: [
      'Interactive course tabs (Starters, Mains, Tasting, Desserts, Wine) with instant dietary filtering',
      'Integrated table reservation form with party size, seating zone, and date selection',
      'One-tap mobile click-to-call, opening hours, and embedded arrival directions',
      'Private dining inquiry pathway for group bookings and seasonal events',
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Express API', 'Responsive Grid'],
    image: savourHouseImg,
    imageAlt: 'Savour House restaurant dining table with plated duck breast, brass flatware, and dark slate menu',
    benchmarkMetrics: [
      { label: 'Target Mobile Menu Load', value: '< 1.0s', context: 'Lightweight HTML menu vs. 8MB PDFs' },
      { label: 'Booking Flow Steps', value: '3 Steps', context: 'Reduced friction from initial visit to request' },
      { label: 'Accessibility Contrast', value: 'WCAG AA', context: 'Verified legibility in dim ambient settings' },
    ],
    previewVariant: 'restaurant',
    highlights: [
      'Zero PDF downloads required for guests on mobile',
      'Clear separation between everyday dining and private events',
      'Structured JSON-LD hospitality metadata ready for local search',
    ],
  },
  {
    slug: 'vanguard-advisory-business-website',
    title: 'Vanguard Advisory',
    subtitle: 'Corporate Strategy & Operations Consultancy Platform',
    category: 'Business',
    conceptBadge: 'Concept Demonstration',
    shortDescription:
      'A structured multi-page corporate website concept engineered to communicate institutional trust, clarity of service, and qualified B2B lead capture.',
    overview:
      'Vanguard Advisory is a concept demonstration crafted for B2B firms and growing mid-market companies that need their digital presence to reflect operational maturity. The architecture guides executive visitors cleanly from core capabilities to structured engagement models.',
    objectives: [
      'Clarify complex multi-division advisory services into plain-English business outcomes.',
      'Establish immediate visual authority for enterprise buyers evaluating partner firms.',
      'Provide a structured executive consultation form with scope routing.',
    ],
    designApproach:
      'Built on a disciplined Swiss-inspired grid with deep navy anchors, crisp white reading panes, and electric cobalt action triggers. Dense capability matrices alternate with generous architectural imagery so the page feels composed rather than crowded.',
    features: [
      'Modular capability breakdown organized by client growth stage',
      'Interactive engagement scope estimator inside the project inquiry flow',
      'Download-free executive briefing cards with crisp typographic hierarchy',
      'Validated B2B consultation request routing with automated confirmation receipts',
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Motion', 'Node.js'],
    image: modernBusinessImg,
    imageAlt: 'Modern glass and steel corporate headquarters exterior at dusk representing Vanguard Advisory',
    benchmarkMetrics: [
      { label: 'Navigation Depth', value: '2 Clicks', context: 'Maximum depth to reach any service or contact page' },
      { label: 'Responsive Breakpoints', value: '320–1920px', context: 'Fluid layout scaling across phones to ultrawide displays' },
      { label: 'Semantic Headings', value: '100% Valid', context: 'Strict H1–H3 document outline for search indexing' },
    ],
    previewVariant: 'business',
    highlights: [
      'Balanced 60-30-10 neutral-to-accent visual hierarchy',
      'Scannable service breakdown tailored to decision-makers',
      'Full-stack inquiry validation with spam prevention',
    ],
  },
  {
    slug: 'kanso-goods-ecommerce-store',
    title: 'Kanso Goods',
    subtitle: 'Minimalist Audio & Architectural Homeware Storefront',
    category: 'E-Commerce',
    conceptBadge: 'Concept Demonstration',
    shortDescription:
      'A refined direct-to-consumer e-commerce storefront concept featuring instant variant switching, tactile product galleries, and a slide-over cart.',
    overview:
      'Kanso Goods is a concept demonstration illustrating how modern retail brands can showcase physical products without visual noise. Designed around clean studio photography and immediate cart feedback, the storefront keeps shoppers focused on craftsmanship and specifications.',
    objectives: [
      'Showcase hardware and homeware products with studio-grade visual restraint.',
      'Deliver instant category filtering and finish/color variant previews without page reloads.',
      'Design a transparent slide-over shopping bag with live subtotal calculation.',
    ],
    designApproach:
      'Travertine-inspired neutral surfaces let product finishes take center stage. Product cards avoid cluttered promotional stickers, relying instead on clean pricing alignment with tabular numerals, subtle hover framing, and concise material notes.',
    features: [
      'Real-time collection filtering (Audio, Ceramics, Desk Objects)',
      'Interactive product finish selector with live stock status and specification panel',
      'Slide-over shopping bag drawer with quantity controls and shipping threshold indicator',
      'Mobile thumb-friendly quick-add controls and clean checkout summary',
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'State Management', 'Express'],
    image: ecommerceStoreImg,
    imageAlt: 'Matte black wireless headphones and ceramic vessels on a travertine stone pedestal for Kanso Goods',
    benchmarkMetrics: [
      { label: 'Filter Response', value: '< 16ms', context: 'Client-side instant catalogue sorting and filtering' },
      { label: 'Cart Interactions', value: 'Zero Reload', context: 'Asynchronous quantity and subtotal updates' },
      { label: 'Touch Target Size', value: '>= 44px', context: 'Thumb-ergonomic controls across mobile checkout' },
    ],
    previewVariant: 'ecommerce',
    highlights: [
      'Tabular pricing numerals for clean vertical scanning',
      'Clear material, dimension, and delivery disclosures upfront',
      'Frictionless add-to-bag experience on mobile viewports',
    ],
  },
  {
    slug: 'elena-vance-personal-portfolio',
    title: 'Elena Vance Studio',
    subtitle: 'Architectural Photographer & Visual Director Portfolio',
    category: 'Portfolio',
    conceptBadge: 'Concept Demonstration',
    shortDescription:
      'An editorial portfolio concept built around generous whitespace, clean monograph typography, and a distraction-free project lightbox.',
    overview:
      'Elena Vance Studio is a concept demonstration showing how photographers, architects, and independent creatives can present high-resolution visual work online without generic template clutter. The interface stays quiet so every photograph holds full attention.',
    objectives: [
      'Frame monochrome and editorial architectural photography at museum-grade clarity.',
      'Provide effortless series filtering and fullscreen lightbox inspection.',
      'Convert editorial admiration into direct commission inquiries.',
    ],
    designApproach:
      'Minimalist stone-grey and crisp white canvases paired with disciplined editorial typography. Metadata such as location, series year, and medium sits quietly beneath each frame using subtle typographic separators rather than loud badges.',
    features: [
      'Curated series filter (Monographs, Commercial, Exhibitions)',
      'Keyboard-accessible fullscreen image inspection view with caption details',
      'Clean biography, exhibition history, and studio equipment notes',
      'Direct commission inquiry link pre-populating project brief context',
    ],
    technologies: ['React', 'TypeScript', 'Motion', 'Tailwind CSS', 'Lazy Media'],
    image: personalPortfolioImg,
    imageAlt: 'Editorial desk flatlay with monochrome architectural prints, laptop, and camera representing Elena Vance portfolio',
    benchmarkMetrics: [
      { label: 'Media Framing', value: '4:3 / 16:9', context: 'Zero aspect-ratio distortion or unintended cropping' },
      { label: 'Motion Discipline', value: 'Reduced-Safe', context: 'Respects system prefers-reduced-motion settings' },
      { label: 'Visual Focus', value: 'Single Anchor', context: 'Uncluttered gallery layout with zero UI distraction' },
    ],
    previewVariant: 'portfolio',
    highlights: [
      'Gallery-first hierarchy with quiet typographic metadata',
      'Smooth compositor-only transitions between project views',
      'Integrated commission brief workflow',
    ],
  },
  {
    slug: 'meridian-legal-professional-service',
    title: 'Meridian Partners',
    subtitle: 'Commercial Law & Engineering Advisory Website',
    category: 'Professional Services',
    conceptBadge: 'Concept Demonstration',
    shortDescription:
      'A high-trust professional services website concept combining practice area clarity, partner profiles, and confidential consultation booking.',
    overview:
      'Meridian Partners is a concept demonstration tailored to law firms, accounting practices, and engineering consultancies where clarity, discretion, and trustworthiness define client conversion. It balances authoritative tone with approachable modern navigation.',
    objectives: [
      'Organize complex practice areas so prospective clients immediately locate relevant counsel.',
      'Highlight senior partner credentials without dense walls of legal jargon.',
      'Enable confidential initial consultation scheduling with clear privacy assurances.',
    ],
    designApproach:
      'Structured slate and crisp off-white reading surfaces accented by deep navy borders and restrained cobalt links. Generous line height (1.65) and bounded text measure (65ch) ensure long-form practice descriptions remain effortless to read.',
    features: [
      'Interactive Practice Area directory with plain-language scope summaries',
      'Partner & advisor profile cards with direct contact routing',
      'Confidential intake form with automated submission confirmation reference',
      'Accessible keyboard navigation and high-contrast typography throughout',
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Express API', 'Input Validation'],
    image: serviceWebsiteImg,
    imageAlt: 'Executive glass-walled conference room with walnut table representing Meridian Partners professional services',
    benchmarkMetrics: [
      { label: 'Reading Measure', value: '65ch Max', context: 'Optimal line length for practice-area comprehension' },
      { label: 'Form Security', value: 'Sanitized', context: 'Server-side validation, rate limit, and spam guard' },
      { label: 'Contrast Ratio', value: '>= 7:1', context: 'High-clarity body text for executive readability' },
    ],
    previewVariant: 'professional',
    highlights: [
      'Clear navigation across practice areas and consultation steps',
      'Transparent confidentiality and privacy-first inquiry handling',
      'Mobile-ready layout for on-the-go executive visitors',
    ],
  },
];
