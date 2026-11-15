import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { applyPageSeo } from '../utils/seo';
import { PORTFOLIO_PROJECTS } from '../data/projects';

interface NavigationOptions {
  preselectedService?: string;
}

interface RouterContextValue {
  currentPath: string;
  preselectedService: string | null;
  clearPreselectedService: () => void;
  navigate: (to: string, options?: NavigationOptions) => void;
}

const RouterContext = createContext<RouterContextValue | null>(null);

function normalizePath(pathname: string): string {
  if (!pathname || pathname === '/') return '/';
  return pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
}

function updateSeoForPath(path: string): void {
  if (path === '/') {
    applyPageSeo({
      title: 'Nexora Digital – Web Design & Digital Development Agency',
      description:
        'Nexora Digital builds responsive business websites, restaurant platforms, e-commerce storefronts, and custom digital experiences that move businesses forward.',
    });
    return;
  }
  if (path === '/about') {
    applyPageSeo({
      title: 'About Nexora Digital – Mission, Vision & Engineering Approach',
      description:
        'Learn how Nexora Digital partners with businesses, startups, and hospitality brands to build reliable, modern websites and digital platforms.',
    });
    return;
  }
  if (path === '/services') {
    applyPageSeo({
      title: 'Services – Business, Restaurant & E-Commerce Web Development | Nexora Digital',
      description:
        'Explore Nexora Digital web development services: business websites, restaurant websites, e-commerce stores, portfolios, landing pages, redesigns, and maintenance.',
    });
    return;
  }
  if (path === '/portfolio') {
    applyPageSeo({
      title: 'Portfolio & Concept Demonstrations | Nexora Digital',
      description:
        'Browse Nexora Digital demonstration case studies spanning hospitality, corporate business, e-commerce retail, personal portfolios, and professional services.',
    });
    return;
  }
  if (path.startsWith('/portfolio/')) {
    const slug = path.replace('/portfolio/', '');
    const project = PORTFOLIO_PROJECTS.find((p) => p.slug === slug);
    if (project) {
      applyPageSeo({
        title: `${project.title} (${project.category} Concept) | Nexora Digital`,
        description: project.shortDescription,
      });
      return;
    }
  }
  if (path === '/contact') {
    applyPageSeo({
      title: 'Start a Project & Contact | Nexora Digital',
      description:
        'Tell Nexora Digital about your website project. Submit a validated project inquiry or connect directly via WhatsApp or email.',
    });
    return;
  }
  applyPageSeo({
    title: 'Nexora Digital – Web Design & Digital Development Agency',
    description:
      'Nexora Digital designs and builds responsive, modern websites for ambitious businesses.',
  });
}

export function RouterProvider({ children }: { children: React.ReactNode }) {
  const [currentPath, setCurrentPath] = useState<string>(() =>
    normalizePath(window.location.pathname)
  );
  const [preselectedService, setPreselectedService] = useState<string | null>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('service');
  });

  useEffect(() => {
    updateSeoForPath(currentPath);
  }, [currentPath]);

  useEffect(() => {
    const handlePopState = () => {
      const next = normalizePath(window.location.pathname);
      setCurrentPath(next);
      const params = new URLSearchParams(window.location.search);
      setPreselectedService(params.get('service'));
      window.scrollTo({ top: 0, behavior: 'auto' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = useCallback((to: string, options?: NavigationOptions) => {
    const [rawPath, rawSearch] = to.split('?');
    const normalized = normalizePath(rawPath || '/');
    const nextUrl = rawSearch ? `${normalized}?${rawSearch}` : normalized;

    if (options?.preselectedService) {
      setPreselectedService(options.preselectedService);
    } else if (rawSearch) {
      const params = new URLSearchParams(rawSearch);
      setPreselectedService(params.get('service'));
    } else if (normalized !== '/contact') {
      setPreselectedService(null);
    }

    window.history.pushState({}, '', nextUrl);
    setCurrentPath(normalized);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const clearPreselectedService = useCallback(() => {
    setPreselectedService(null);
  }, []);

  return (
    <RouterContext.Provider
      value={{ currentPath, preselectedService, clearPreselectedService, navigate }}
    >
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter(): RouterContextValue {
  const ctx = useContext(RouterContext);
  if (!ctx) {
    throw new Error('useRouter must be used inside RouterProvider');
  }
  return ctx;
}
