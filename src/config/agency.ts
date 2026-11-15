import type { AgencyPublicConfig } from '../types';

export const AGENCY_BRAND = {
  name: 'Nexora Digital',
  tagline: 'WE BUILD DIGITAL EXPERIENCES THAT MOVE BUSINESSES FORWARD.',
  footerTagline: 'BUILDING THE FUTURE, ONE DIGITAL EXPERIENCE AT A TIME.',
  alternativeHeadline: 'Your Business Deserves More Than Just a Website.',
  description:
    'Nexora Digital is a modern web design and digital development agency helping businesses establish an authoritative online presence through responsive, purposeful engineering.',
  defaultConfig: {
    whatsappNumber: '0249736777',
    contactEmail: 'alijohnkwameanonkati@gmail.com',
    agencyLocation: 'Accra · Remote Worldwide',
  } satisfies AgencyPublicConfig,
};

export const NAV_ITEMS = [
  { label: 'Home', path: '/' as const },
  { label: 'About', path: '/about' as const },
  { label: 'Services', path: '/services' as const },
  { label: 'Portfolio', path: '/portfolio' as const },
  { label: 'Contact', path: '/contact' as const },
];

export const WEBSITE_TYPE_OPTIONS = [
  'Business Website Development',
  'Restaurant Website Development',
  'E-Commerce Development',
  'Portfolio Website',
  'Landing Page Development',
  'Website Redesign',
  'Website Maintenance & Support',
  'Custom Web Application',
];

export const BUDGET_OPTIONS = [
  '$1,500 – $3,000',
  '$3,000 – $6,000',
  '$6,000 – $12,000',
  '$12,000+',
  'Ongoing Maintenance Retainer',
];

export function buildWhatsAppUrl(number: string, customMessage?: string): string {
  const digitsOnly = number.replace(/[^\d]/g, '');
  const e164 =
    digitsOnly.startsWith('0') && digitsOnly.length === 10
      ? `233${digitsOnly.slice(1)}`
      : digitsOnly;
  const message =
    customMessage ||
    'Hello Nexora Digital, I would like to discuss a website or digital development project.';
  return `https://wa.me/${e164}?text=${encodeURIComponent(message)}`;
}

export function buildMailtoUrl(email: string, subject?: string): string {
  const cleanSubject = subject || 'Project Inquiry — Nexora Digital';
  return `mailto:${email}?subject=${encodeURIComponent(cleanSubject)}`;
}
