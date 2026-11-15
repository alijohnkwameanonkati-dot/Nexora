import { useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from 'motion/react';
import { AGENCY_BRAND } from './config/agency';
import { RouterProvider, useRouter } from './context/RouterContext';
import { fetchPublicConfig } from './services/inquiryService';
import type { AgencyPublicConfig } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { ContactPage } from './pages/ContactPage';

function AppShell() {
  const { currentPath } = useRouter();
  const [config, setConfig] = useState<AgencyPublicConfig>(AGENCY_BRAND.defaultConfig);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    let mounted = true;
    fetchPublicConfig().then((loaded) => {
      if (mounted) setConfig(loaded);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const renderPage = () => {
    if (currentPath === '/') return <HomePage />;
    if (currentPath === '/about') return <AboutPage />;
    if (currentPath === '/services') return <ServicesPage />;
    if (currentPath === '/portfolio') return <PortfolioPage />;
    if (currentPath.startsWith('/portfolio/')) {
      const slug = currentPath.replace('/portfolio/', '');
      return <ProjectDetailPage slug={slug} />;
    }
    if (currentPath === '/contact') return <ContactPage config={config} />;
    return <HomePage />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-blue-600 focus:text-white focus:text-xs focus:font-semibold"
      >
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content" className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPath}
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReduced ? { opacity: 1 } : { opacity: 0, y: -4 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer config={config} />
    </div>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <RouterProvider>
        <AppShell />
      </RouterProvider>
    </MotionConfig>
  );
}
