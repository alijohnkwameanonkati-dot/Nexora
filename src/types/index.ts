export type RoutePath =
  | '/'
  | '/about'
  | '/services'
  | '/portfolio'
  | '/contact'
  | `/portfolio/${string}`;

export type ProjectCategory =
  | 'All'
  | 'Restaurant'
  | 'Business'
  | 'E-Commerce'
  | 'Portfolio'
  | 'Professional Services';

export interface ServiceItem {
  id: string;
  index: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  benefits: string[];
  deliverables: string[];
  idealFor: string;
  timeline: string;
  accentLabel: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
  context: string;
}

export interface ProjectCaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  category: Exclude<ProjectCategory, 'All'>;
  conceptBadge: string;
  shortDescription: string;
  overview: string;
  objectives: string[];
  designApproach: string;
  features: string[];
  technologies: string[];
  image: string;
  imageAlt: string;
  benchmarkMetrics: ProjectMetric[];
  previewVariant: 'restaurant' | 'business' | 'ecommerce' | 'portfolio' | 'professional';
  highlights: string[];
}

export interface AgencyPublicConfig {
  whatsappNumber: string;
  contactEmail: string;
  agencyLocation: string;
}

export interface InquiryFormPayload {
  fullName: string;
  businessName: string;
  email: string;
  phone: string;
  websiteType: string;
  budget: string;
  description: string;
  additionalRequirements: string;
  websiteConfirm: string;
  humanCheck: string;
  securityToken: string;
}

export interface InquirySubmissionResponse {
  success: boolean;
  referenceId: string;
  submittedAt: string;
  summary: {
    fullName: string;
    businessName: string;
    email: string;
    websiteType: string;
    budget: string;
  };
}
