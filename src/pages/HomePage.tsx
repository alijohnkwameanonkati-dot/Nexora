import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { AGENCY_BRAND } from '../config/agency';
import {
  DEMONSTRATION_BENCHMARKS,
  HERO_MEDIA,
  SAMPLE_TESTIMONIALS,
  TRUST_PILLARS,
  WHY_CHOOSE_ITEMS,
} from '../data/agencyContent';
import { PORTFOLIO_PROJECTS } from '../data/projects';
import { SERVICES_LIST } from '../data/services';
import { useRouter } from '../context/RouterContext';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { AnimatedStatistic, Reveal } from '../components/MotionPrimitives';

export function HomePage() {
  const { navigate } = useRouter();
  const featuredProjects = PORTFOLIO_PROJECTS.slice(0, 3);
  const previewServices = SERVICES_LIST.slice(0, 4);

  return (
    <div>
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-[#070B14] text-white border-b border-slate-800/80">
        {/* Subtle architectural grid & ambient lighting */}
        <div className="absolute inset-0 bg-architectural-grid pointer-events-none" aria-hidden="true" />
        <div
          className="absolute -top-40 right-0 w-[640px] h-[640px] rounded-full bg-blue-600/15 blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-6xl px-5 sm:px-8 py-16 sm:py-24 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            {/* Hero Copy Column */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <p className="text-xs sm:text-sm font-medium text-blue-400 tracking-wide mb-4">
                Nexora Digital <span aria-hidden="true" className="mx-1.5 text-slate-600">·</span> Web Design &amp; Digital Development
              </p>

              <h1 className="font-display font-bold tracking-tight text-white leading-[1.08] text-[clamp(2.1rem,4vw,3.35rem)]">
                WE TURN AMBITIOUS IDEAS INTO POWERFUL DIGITAL EXPERIENCES.
              </h1>

              <p className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
                From business websites to complete digital platforms, Nexora Digital helps ambitious businesses build their presence, attract customers and grow online.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <button
                  type="button"
                  onClick={() => navigate('/contact')}
                  className="min-h-[44px] inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 active:scale-[0.98] rounded-lg transition-all duration-150 cursor-pointer whitespace-nowrap shrink-0 shadow-lg shadow-blue-950/60"
                >
                  <span>Start a Project</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/portfolio')}
                  className="min-h-[44px] inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-slate-100 bg-slate-900/80 hover:bg-slate-800 border border-slate-700 hover:border-slate-500 rounded-lg transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span>Explore Our Work</span>
                </button>
              </div>

              <p className="mt-8 text-xs text-slate-400 tracking-wide">
                {AGENCY_BRAND.tagline}
              </p>
            </div>

            {/* Hero Visual Column */}
            <div className="lg:col-span-6 flex">
              <div className="relative w-full min-h-[300px] lg:min-h-[440px] rounded-2xl overflow-hidden border border-slate-800 bg-slate-900">
                <ImageWithFallback
                  src={HERO_MEDIA.workspaceImage}
                  alt={HERO_MEDIA.workspaceAlt}
                  lazy={false}
                  className="w-full h-full object-cover lg:h-full"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#070B14]/90 via-[#070B14]/25 to-transparent"
                  aria-hidden="true"
                />

                {/* Clean Floating Architectural UI Card */}
                <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-6 rounded-xl bg-[#0B1120]/90 backdrop-blur-md border border-slate-700/70 p-4 sm:p-5">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-xs text-blue-400 font-medium">Engineering Standard</p>
                      <p className="font-display text-sm sm:text-base font-semibold text-white mt-0.5">
                        Responsive Architecture · Validated Full-Stack Delivery
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => navigate('/services')}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-white hover:text-blue-300 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                    >
                      <span>7 Disciplines</span>
                      <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST AND VALUE SECTION */}
      <section className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-20 sm:py-24">
          <Reveal>
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-wider uppercase text-blue-600">
                Our Approach
              </p>
              <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                {AGENCY_BRAND.alternativeHeadline}
              </h2>
              <p className="mt-3 text-base text-slate-600 leading-relaxed">
                Every website we build combines intentional visual design with dependable software engineering—structured to serve real visitors and convert interest into action.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-slate-200 rounded-xl overflow-hidden">
            {TRUST_PILLARS.map((pillar, idx) => (
              <Reveal key={pillar.index} delay={idx * 0.05}>
                <div className="h-full p-6 sm:p-7 bg-white border-r border-b border-slate-200 flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-xs font-medium text-blue-600">
                      {pillar.index}
                    </span>
                    <h3 className="mt-3 font-display text-lg font-bold text-slate-900">
                      {pillar.title}
                    </h3>
                    <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SERVICES PREVIEW */}
      <section className="bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-20 sm:py-24">
          <Reveal>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold tracking-wider uppercase text-blue-600">
                  Services
                </p>
                <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                  Focused Digital Development for Modern Businesses
                </h2>
              </div>
              <button
                type="button"
                onClick={() => navigate('/services')}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:text-blue-600 transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>View All 7 Services</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </Reveal>

          {/* Asymmetric Bento Grid */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-6">
            {previewServices.map((service, idx) => {
              const spanClass =
                idx === 0 || idx === 3 ? 'md:col-span-7' : 'md:col-span-5';
              return (
                <Reveal key={service.id} delay={idx * 0.06} className={spanClass}>
                  <article className="h-full rounded-2xl bg-white border border-slate-200 p-7 sm:p-8 flex flex-col justify-between transition-all duration-200 hover:border-blue-300 hover:shadow-md">
                    <div>
                      <div className="flex items-center justify-between gap-3 text-xs text-slate-500">
                        <span className="font-medium text-blue-600">{service.accentLabel}</span>
                        <span className="font-mono">{service.timeline}</span>
                      </div>
                      <h3 className="mt-3 font-display text-xl font-bold text-slate-900">
                        {service.title}
                      </h3>
                      <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">
                        {service.description}
                      </p>
                      <ul className="mt-5 space-y-2">
                        {service.benefits.slice(0, 2).map((benefit) => (
                          <li key={benefit} className="flex items-start gap-2.5 text-sm text-slate-700">
                            <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" aria-hidden="true" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-7 pt-5 border-t border-slate-100 flex items-center justify-between gap-4">
                      <button
                        type="button"
                        onClick={() => navigate('/services')}
                        className="text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors cursor-pointer"
                      >
                        Explore Deliverables
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          navigate('/contact', { preselectedService: service.shortTitle === 'E-Commerce Stores' ? 'E-Commerce Development' : service.title.replace(/^\d+\.\s*/, '') })
                        }
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:text-blue-600 transition-colors cursor-pointer"
                      >
                        <span>Request Scope</span>
                        <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. FEATURED PROJECTS */}
      <section className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-20 sm:py-24">
          <Reveal>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold tracking-wider uppercase text-blue-600">
                  Selected Concept Demonstrations
                </p>
                <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                  Digital Platforms Built to Earn Trust and Convert
                </h2>
                <p className="mt-3 text-sm sm:text-base text-slate-600">
                  Each featured case study below is an interactive concept demonstration showing our design standards and engineering architecture across industries.
                </p>
              </div>
              <button
                type="button"
                onClick={() => navigate('/portfolio')}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:text-blue-600 transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>Browse All 5 Concepts</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-7">
            {featuredProjects.map((project, idx) => (
              <Reveal key={project.slug} delay={idx * 0.06}>
                <article className="group h-full rounded-2xl border border-slate-200 bg-white overflow-hidden flex flex-col justify-between transition-all duration-200 hover:border-slate-300 hover:shadow-md">
                  <div>
                    <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                      <ImageWithFallback
                        src={project.image}
                        alt={project.imageAlt}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span className="font-medium text-blue-700">{project.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{project.conceptBadge}</span>
                      </div>
                      <h3 className="mt-2 font-display text-xl font-bold text-slate-900">
                        {project.title}
                      </h3>
                      <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                        {project.shortDescription}
                      </p>
                      <p className="mt-4 text-xs text-slate-500 font-mono">
                        {project.technologies.slice(0, 3).join(' · ')}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-2">
                    <button
                      type="button"
                      onClick={() => navigate(`/portfolio/${project.slug}`)}
                      className="w-full min-h-[42px] inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-slate-900 bg-slate-100 hover:bg-slate-900 hover:text-white rounded-lg transition-colors duration-150 cursor-pointer"
                    >
                      <span>View Project Details</span>
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE US + DEMONSTRATION BENCHMARKS */}
      <section className="bg-[#080D18] text-white border-b border-slate-800/80">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-20 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
            <div className="lg:col-span-6">
              <Reveal>
                <p className="text-xs font-semibold tracking-wider uppercase text-blue-400">
                  Why Choose Nexora Digital
                </p>
                <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  Built With Agency Discipline From First Brief to Launch
                </h2>
                <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
                  Businesses partner with Nexora Digital when they want clear communication, durable front-end craft, and dependable back-end functionality without agency bloat.
                </p>
              </Reveal>

              <div className="mt-10 divide-y divide-slate-800 border-t border-b border-slate-800">
                {WHY_CHOOSE_ITEMS.map((item, idx) => (
                  <Reveal key={item.title} delay={idx * 0.04}>
                    <div className="py-5">
                      <h3 className="font-display text-base font-semibold text-white">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-sm text-slate-400 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* Demonstration Benchmarks */}
            <div className="lg:col-span-6">
              <Reveal>
                <div className="rounded-2xl border border-slate-800 bg-[#0D1424] p-7 sm:p-9">
                  <div className="border-b border-slate-800 pb-5">
                    <p className="text-xs font-medium text-blue-400">
                      Engineering &amp; Demonstration Benchmarks
                    </p>
                    <h3 className="mt-1 font-display text-xl font-bold text-white">
                      Measurable Build Standards Across Every Release
                    </h3>
                    <p className="mt-1.5 text-xs text-slate-400">
                      Transparent technical targets verified during quality review rather than inflated vanity statistics.
                    </p>
                  </div>

                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {DEMONSTRATION_BENCHMARKS.map((stat) => (
                      <div
                        key={stat.label}
                        className="p-5 rounded-xl bg-slate-900/70 border border-slate-800/90"
                      >
                        <div className="font-display text-3xl font-bold text-white tracking-tight">
                          <AnimatedStatistic targetText={stat.value} />
                        </div>
                        <p className="mt-2 text-sm font-medium text-slate-200">
                          {stat.label}
                        </p>
                        <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                          {stat.note}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SAMPLE TESTIMONIALS (TRANSPARENT DEMONSTRATION CONTENT) */}
      <section className="bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-20 sm:py-24">
          <Reveal>
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-wider uppercase text-blue-600">
                Sample Feedback · Demonstration Content
              </p>
              <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                How Well-Structured Websites Support Real Business Outcomes
              </h2>
              <p className="mt-2.5 text-sm text-slate-600">
                The quotes below are illustrative sample feedback linked directly to our concept demonstration builds.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {SAMPLE_TESTIMONIALS.map((item, idx) => (
              <Reveal key={item.author} delay={idx * 0.06}>
                <figure className="h-full rounded-2xl bg-white border border-slate-200 p-7 flex flex-col justify-between">
                  <div>
                    <p className="text-xs font-medium text-slate-500">
                      {item.sampleNotice}
                    </p>
                    <blockquote className="mt-4 text-sm text-slate-700 leading-relaxed">
                      “{item.quote}”
                    </blockquote>
                  </div>
                  <figcaption className="mt-6 pt-5 border-t border-slate-100">
                    <p className="font-display text-sm font-bold text-slate-900">
                      {item.author}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">{item.role}</p>
                    <p className="text-xs text-blue-700 font-medium mt-2">
                      Focus: {item.outcome}
                    </p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FINAL CALL TO ACTION */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-20 sm:py-24">
          <Reveal>
            <div className="rounded-2xl bg-[#080D18] text-white px-6 py-14 sm:px-14 sm:py-16 border border-slate-800 text-center">
              <p className="text-xs font-semibold tracking-wider uppercase text-blue-400">
                Start a Conversation
              </p>
              <h2 className="mt-3 font-display text-2xl sm:text-4xl font-bold tracking-tight text-white max-w-2xl mx-auto">
                READY TO BUILD SOMETHING EXTRAORDINARY?
              </h2>
              <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
                Share your goals, timeline, and the type of website your business needs. We review every brief carefully and respond with a practical plan.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => navigate('/contact')}
                  className="min-h-[46px] inline-flex items-center gap-2 px-7 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 active:scale-[0.98] rounded-lg transition-all duration-150 cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span>LET&apos;S TALK ABOUT YOUR PROJECT</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
