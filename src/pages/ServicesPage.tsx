import { ArrowRight, Check } from 'lucide-react';
import { SERVICES_LIST } from '../data/services';
import { useRouter } from '../context/RouterContext';
import { Reveal } from '../components/MotionPrimitives';
import type { ServiceItem } from '../types';

function ServiceVisualDiagram({ service }: { service: ServiceItem }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-900 text-slate-100 p-5 sm:p-6 flex flex-col justify-between h-full">
      <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-3">
        <span className="font-medium text-blue-400">{service.accentLabel}</span>
        <span className="font-mono">{service.timeline}</span>
      </div>

      <div className="py-5 space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Included Deliverables
        </p>
        <ul className="space-y-2.5">
          {service.deliverables.map((del) => (
            <li
              key={del}
              className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200 bg-slate-800/70 border border-slate-700/70 rounded-lg px-3.5 py-2.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" aria-hidden="true" />
              <span>{del}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="pt-3 border-t border-slate-800 text-xs text-slate-400">
        <span className="text-slate-300 font-medium">Ideal For:</span> {service.idealFor}
      </div>
    </div>
  );
}

export function ServicesPage() {
  const { navigate } = useRouter();

  const scrollToService = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div>
      {/* Services Hero */}
      <section className="bg-[#070B14] text-white border-b border-slate-800/80">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-16 sm:py-22">
          <p className="text-xs font-semibold tracking-wider uppercase text-blue-400">
            Capabilities &amp; Scope
          </p>
          <h1 className="mt-3 font-display text-3xl sm:text-5xl font-bold tracking-tight text-white max-w-3xl leading-[1.1]">
            Web Design and Development Services Built Around Business Results
          </h1>
          <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            Whether you need a flagship company website, a restaurant menu and reservation platform, or ongoing technical maintenance, every engagement is tailored to your goals.
          </p>

          {/* Quick Jump Index */}
          <div className="mt-8 flex flex-wrap gap-2">
            {SERVICES_LIST.map((srv) => (
              <button
                key={srv.id}
                type="button"
                onClick={() => scrollToService(srv.id)}
                className="px-3.5 py-2 text-xs font-medium text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-600 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                {srv.index}. {srv.shortTitle}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* All 7 Services */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-16 sm:py-20 space-y-10">
          {SERVICES_LIST.map((service, idx) => (
            <Reveal key={service.id} delay={idx === 0 ? 0 : 0.04}>
              <article
                id={service.id}
                className="scroll-mt-24 rounded-2xl bg-white border border-slate-200 p-6 sm:p-10"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
                  <div className="lg:col-span-7 flex flex-col justify-between">
                    <div>
                      <p className="text-xs font-medium text-blue-600">
                        {service.accentLabel} <span aria-hidden="true" className="mx-1.5 text-slate-300">·</span> {service.timeline}
                      </p>
                      <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                        {service.title}
                      </h2>
                      <p className="mt-2 text-base font-medium text-slate-800">
                        {service.tagline}
                      </p>
                      <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                        {service.description}
                      </p>

                      <div className="mt-6">
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                          Key Business Benefits
                        </h3>
                        <ul className="mt-3 space-y-2.5">
                          {service.benefits.map((benefit) => (
                            <li key={benefit} className="flex items-start gap-2.5 text-sm text-slate-700">
                              <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" aria-hidden="true" />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center gap-4">
                      <button
                        type="button"
                        onClick={() =>
                          navigate('/contact', {
                            preselectedService: service.title.replace(/^\d+\.\s*/, ''),
                          })
                        }
                        className="min-h-[44px] inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
                      >
                        <span>Inquire About {service.shortTitle}</span>
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        onClick={() => navigate('/portfolio')}
                        className="min-h-[44px] inline-flex items-center px-4 py-2.5 text-sm font-semibold text-slate-700 hover:text-slate-900 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                      >
                        See Related Concept Work
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-5">
                    <ServiceVisualDiagram service={service} />
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
