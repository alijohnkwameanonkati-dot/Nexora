import { ArrowUpRight, Mail, MessageSquare } from 'lucide-react';
import {
  AGENCY_BRAND,
  NAV_ITEMS,
  buildMailtoUrl,
  buildWhatsAppUrl,
} from '../config/agency';
import { PORTFOLIO_PROJECTS } from '../data/projects';
import { SERVICES_LIST } from '../data/services';
import { useRouter } from '../context/RouterContext';
import type { AgencyPublicConfig } from '../types';
import { LogoMark } from './LogoMark';

interface FooterProps {
  config: AgencyPublicConfig;
}

export function Footer({ config }: FooterProps) {
  const { navigate } = useRouter();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#070B14] text-slate-300 border-t border-slate-800/80">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigate('/');
              }}
              className="inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md"
            >
              <LogoMark tone="light" />
            </a>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              {AGENCY_BRAND.description}
            </p>
            <p className="text-xs font-display font-semibold tracking-wider text-blue-400 uppercase pt-1">
              {AGENCY_BRAND.footerTagline}
            </p>
          </div>

          {/* Navigation Column */}
          <div className="lg:col-span-2 space-y-3">
            <h2 className="text-xs font-semibold tracking-wider uppercase text-white">
              Navigation
            </h2>
            <ul className="space-y-2.5 text-sm">
              {NAV_ITEMS.map((item) => (
                <li key={item.path}>
                  <a
                    href={item.path}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(item.path);
                    }}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div className="lg:col-span-3 space-y-3">
            <h2 className="text-xs font-semibold tracking-wider uppercase text-white">
              Services
            </h2>
            <ul className="space-y-2.5 text-sm">
              {SERVICES_LIST.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <a
                    href="/services"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/services');
                    }}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {service.shortTitle}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Portfolio & Contact Column */}
          <div className="lg:col-span-3 space-y-5">
            <div className="space-y-3">
              <h2 className="text-xs font-semibold tracking-wider uppercase text-white">
                Concept Showcase
              </h2>
              <ul className="space-y-2 text-sm">
                {PORTFOLIO_PROJECTS.slice(0, 4).map((project) => (
                  <li key={project.slug}>
                    <a
                      href={`/portfolio/${project.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(`/portfolio/${project.slug}`);
                      }}
                      className="text-slate-400 hover:text-white transition-colors"
                    >
                      {project.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2.5 pt-2 border-t border-slate-800/80">
              <h2 className="text-xs font-semibold tracking-wider uppercase text-white">
                Direct Contact
              </h2>
              <div className="flex flex-col gap-2 text-sm">
                <a
                  href={buildMailtoUrl(config.contactEmail)}
                  className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 text-blue-400 shrink-0" aria-hidden="true" />
                  <span className="truncate">{config.contactEmail}</span>
                </a>
                <a
                  href={buildWhatsAppUrl(config.whatsappNumber)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-blue-400 shrink-0" aria-hidden="true" />
                  <span>WhatsApp: {config.whatsappNumber}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
                </a>
              </div>
              <p className="text-xs text-slate-500 pt-1">{config.agencyLocation}</p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-14 pt-7 border-t border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-500">
          <p>&copy; {currentYear} Nexora Digital. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-5">
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                typeof window !== 'undefined' ? window.location.origin : ''
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-300 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={`https://x.com/intent/tweet?text=${encodeURIComponent(
                'Nexora Digital — Web Design & Digital Development Agency'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-300 transition-colors"
            >
              X / Twitter
            </a>
            <a
              href="/contact"
              onClick={(e) => {
                e.preventDefault();
                navigate('/contact');
              }}
              className="hover:text-slate-300 transition-colors"
            >
              Start a Project
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
