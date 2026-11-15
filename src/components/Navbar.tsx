import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS } from '../config/agency';
import { useRouter } from '../context/RouterContext';
import { LogoMark } from './LogoMark';

export function Navbar() {
  const { currentPath, navigate } = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const prefersReduced = useReducedMotion();

  const isNavActive = (itemPath: string) => {
    if (itemPath === '/') return currentPath === '/';
    return currentPath === itemPath || currentPath.startsWith(`${itemPath}/`);
  };

  useEffect(() => {
    setMobileOpen(false);
  }, [currentPath]);

  useEffect(() => {
    if (!mobileOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-[#080C15]/90 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            navigate('/');
          }}
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md py-1 whitespace-nowrap shrink-0"
          aria-label="Nexora Digital Home"
        >
          <LogoMark tone="light" />
        </a>

        {/* Zone 2: Concise single-line text links */}
        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-7">
          {NAV_ITEMS.map((item) => {
            const active = isNavActive(item.path);
            return (
              <a
                key={item.path}
                href={item.path}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(item.path);
                }}
                aria-current={active ? 'page' : undefined}
                className={`relative py-1.5 text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 ${
                  active ? 'text-white' : 'text-slate-300 hover:text-white'
                }`}
              >
                {item.label}
                {active && (
                  <motion.span
                    layoutId={prefersReduced ? undefined : 'nav-active-indicator'}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-blue-500 rounded-full"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Single primary action button (+ mobile menu trigger) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => navigate('/contact')}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 active:scale-[0.98] rounded-lg transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer shadow-sm shadow-blue-950/50"
          >
            Start a Project
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg text-slate-200 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Responsive Animated Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-navigation-drawer"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden border-t border-slate-800 bg-[#080C15] px-5 py-5"
          >
            <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => {
                const active = isNavActive(item.path);
                return (
                  <a
                    key={item.path}
                    href={item.path}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(item.path);
                      setMobileOpen(false);
                    }}
                    aria-current={active ? 'page' : undefined}
                    className={`min-h-[44px] flex items-center justify-between px-3.5 rounded-lg text-base font-medium transition-colors ${
                      active
                        ? 'bg-slate-800/90 text-white'
                        : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    {active && <span className="w-1.5 h-1.5 rounded-full bg-blue-500" aria-hidden="true" />}
                  </a>
                );
              })}
              <div className="pt-3 mt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    navigate('/contact');
                    setMobileOpen(false);
                  }}
                  className="w-full min-h-[44px] inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors cursor-pointer"
                >
                  Start a Project
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
