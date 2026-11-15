import { ArrowRight } from 'lucide-react';
import { AGENCY_BRAND } from '../config/agency';
import { ABOUT_CONTENT, HERO_MEDIA } from '../data/agencyContent';
import { useRouter } from '../context/RouterContext';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { Reveal } from '../components/MotionPrimitives';

export function AboutPage() {
  const { navigate } = useRouter();

  return (
    <div>
      {/* Page Hero */}
      <section className="bg-[#070B14] text-white border-b border-slate-800/80">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-16 sm:py-22">
          <p className="text-xs font-semibold tracking-wider uppercase text-blue-400">
            About Nexora Digital
          </p>
          <h1 className="mt-3 font-display text-3xl sm:text-5xl font-bold tracking-tight text-white max-w-3xl leading-[1.1]">
            {AGENCY_BRAND.alternativeHeadline}
          </h1>
          <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            {ABOUT_CONTENT.whoWeAre}
          </p>
        </div>
      </section>

      {/* Studio Visual & Approach */}
      <section className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-16 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            <div className="lg:col-span-6">
              <div className="h-full min-h-[280px] rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
                <ImageWithFallback
                  src={HERO_MEDIA.workspaceImage}
                  alt={HERO_MEDIA.workspaceAlt}
                  className="w-full h-full object-cover lg:h-full"
                />
              </div>
            </div>
            <div className="lg:col-span-6 flex flex-col justify-center space-y-8">
              <Reveal>
                <div className="p-6 sm:p-7 rounded-2xl bg-slate-50 border border-slate-200">
                  <p className="text-xs font-semibold tracking-wider uppercase text-blue-600">
                    Our Mission
                  </p>
                  <p className="mt-2 font-display text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                    {ABOUT_CONTENT.mission}
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <div className="p-6 sm:p-7 rounded-2xl bg-slate-50 border border-slate-200">
                  <p className="text-xs font-semibold tracking-wider uppercase text-blue-600">
                    Our Vision
                  </p>
                  <p className="mt-2 font-display text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                    {ABOUT_CONTENT.vision}
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-16 sm:py-22">
          <Reveal>
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-wider uppercase text-blue-600">
                Core Values
              </p>
              <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                Standards That Guide Every Engagement
              </h2>
            </div>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ABOUT_CONTENT.values.map((val, idx) => (
              <Reveal key={val.name} delay={idx * 0.05}>
                <div className="h-full rounded-2xl bg-white border border-slate-200 p-7">
                  <span className="font-mono text-xs text-blue-600 font-medium">
                    0{idx + 1}
                  </span>
                  <h3 className="mt-3 font-display text-lg font-bold text-slate-900">
                    {val.name}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {val.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Development Methodology */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-16 sm:py-22">
          <Reveal>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold tracking-wider uppercase text-blue-600">
                  Methodology
                </p>
                <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                  How We Take a Project From Idea to Production
                </h2>
              </div>
              <button
                type="button"
                onClick={() => navigate('/contact')}
                className="min-h-[44px] inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ABOUT_CONTENT.process.map((item, idx) => (
              <Reveal key={item.step} delay={idx * 0.05}>
                <div className="h-full rounded-2xl border border-slate-200 bg-slate-50 p-6">
                  <h3 className="font-display text-base font-bold text-slate-900">
                    {item.step}
                  </h3>
                  <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
