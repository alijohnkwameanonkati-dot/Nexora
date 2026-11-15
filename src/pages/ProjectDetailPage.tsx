import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { PORTFOLIO_PROJECTS } from '../data/projects';
import { useRouter } from '../context/RouterContext';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { InteractiveDemoPreview } from '../components/InteractiveDemoPreview';
import { Reveal } from '../components/MotionPrimitives';

interface ProjectDetailPageProps {
  slug: string;
}

export function ProjectDetailPage({ slug }: ProjectDetailPageProps) {
  const { navigate } = useRouter();
  const projectIndex = PORTFOLIO_PROJECTS.findIndex((p) => p.slug === slug);
  const project = projectIndex >= 0 ? PORTFOLIO_PROJECTS[projectIndex] : null;

  if (!project) {
    return (
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-2xl px-5 text-center">
          <h1 className="font-display text-2xl font-bold text-slate-900">
            Concept Project Not Found
          </h1>
          <p className="mt-3 text-sm text-slate-600">
            The requested demonstration case study does not exist or has moved.
          </p>
          <button
            type="button"
            onClick={() => navigate('/portfolio')}
            className="mt-6 min-h-[44px] inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Back to Portfolio</span>
          </button>
        </div>
      </section>
    );
  }

  const prevProject =
    PORTFOLIO_PROJECTS[(projectIndex - 1 + PORTFOLIO_PROJECTS.length) % PORTFOLIO_PROJECTS.length];
  const nextProject = PORTFOLIO_PROJECTS[(projectIndex + 1) % PORTFOLIO_PROJECTS.length];

  const categoryToServiceMap: Record<string, string> = {
    Restaurant: 'Restaurant Website Development',
    Business: 'Business Website Development',
    'E-Commerce': 'E-Commerce Development',
    Portfolio: 'Portfolio Website',
    'Professional Services': 'Business Website Development',
  };

  return (
    <div>
      {/* Header Band */}
      <section className="bg-[#070B14] text-white border-b border-slate-800/80">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-14 sm:py-20">
          <button
            type="button"
            onClick={() => navigate('/portfolio')}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Back to All Concept Projects</span>
          </button>

          <div className="mt-6 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <p className="text-xs sm:text-sm font-medium text-blue-400">
                {project.category} <span aria-hidden="true" className="mx-1.5 text-slate-600">·</span> {project.conceptBadge}
              </p>
              <h1 className="mt-2 font-display text-3xl sm:text-5xl font-bold tracking-tight text-white">
                {project.title}
              </h1>
              <p className="mt-2 text-base sm:text-lg text-slate-300">
                {project.subtitle}
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                navigate('/contact', {
                  preselectedService: categoryToServiceMap[project.category] || 'Business Website Development',
                })
              }
              className="min-h-[44px] inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 w-fit"
            >
              <span>Request a Similar Website</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-14 sm:py-20 space-y-14">
          {/* Showcase Media */}
          <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 aspect-[16/9] max-h-[540px] w-full">
            <ImageWithFallback
              src={project.image}
              alt={project.imageAlt}
              lazy={false}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Engineering Benchmark Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {project.benchmarkMetrics.map((metric) => (
              <div
                key={metric.label}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200"
              >
                <p className="font-display text-2xl sm:text-3xl font-bold text-slate-900 tabular-nums">
                  {metric.value}
                </p>
                <p className="mt-1.5 text-sm font-semibold text-slate-800">{metric.label}</p>
                <p className="mt-1 text-xs text-slate-500">{metric.context}</p>
              </div>
            ))}
          </div>

          {/* Case Study Narrative Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
            <div className="lg:col-span-7 space-y-10">
              <Reveal>
                <div>
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900">
                    Project Overview
                  </h2>
                  <p className="mt-3 text-base text-slate-600 leading-relaxed">
                    {project.overview}
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.05}>
                <div>
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900">
                    Project Objectives
                  </h2>
                  <ul className="mt-4 space-y-3">
                    {project.objectives.map((obj) => (
                      <li key={obj} className="flex items-start gap-3 text-sm sm:text-base text-slate-700">
                        <Check className="w-4 h-4 text-blue-600 shrink-0 mt-1" aria-hidden="true" />
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <div>
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900">
                    Design &amp; UX Approach
                  </h2>
                  <p className="mt-3 text-base text-slate-600 leading-relaxed">
                    {project.designApproach}
                  </p>
                </div>
              </Reveal>
            </div>

            <aside className="lg:col-span-5 space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-7 space-y-6">
                <div>
                  <h3 className="font-display text-base font-bold text-slate-900">
                    Main Features Implemented
                  </h3>
                  <ul className="mt-3 space-y-2.5">
                    {project.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm text-slate-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 mt-2" aria-hidden="true" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-5 border-t border-slate-200">
                  <h3 className="font-display text-base font-bold text-slate-900">
                    Architecture &amp; Stack
                  </h3>
                  <p className="mt-2 font-mono text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {project.technologies.join(' · ')}
                  </p>
                </div>

                <div className="pt-5 border-t border-slate-200">
                  <h3 className="font-display text-base font-bold text-slate-900">
                    Key Highlights
                  </h3>
                  <ul className="mt-2.5 space-y-2 text-xs sm:text-sm text-slate-600">
                    {project.highlights.map((hl) => (
                      <li key={hl}>• {hl}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>
          </div>

          {/* Interactive Live Concept Preview */}
          <Reveal>
            <InteractiveDemoPreview project={project} />
          </Reveal>

          {/* Next / Previous Project Navigation */}
          <div className="pt-8 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => navigate(`/portfolio/${prevProject.slug}`)}
              className="p-5 rounded-xl border border-slate-200 hover:border-blue-300 bg-slate-50 hover:bg-white text-left transition-all cursor-pointer"
            >
              <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
                <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Previous Concept</span>
              </span>
              <p className="mt-1 font-display text-base font-bold text-slate-900">
                {prevProject.title}
              </p>
            </button>

            <button
              type="button"
              onClick={() => navigate(`/portfolio/${nextProject.slug}`)}
              className="p-5 rounded-xl border border-slate-200 hover:border-blue-300 bg-slate-50 hover:bg-white text-left sm:text-right transition-all cursor-pointer"
            >
              <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
                <span>Next Concept</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </span>
              <p className="mt-1 font-display text-base font-bold text-slate-900">
                {nextProject.title}
              </p>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
