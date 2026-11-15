import { useMemo, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { PORTFOLIO_PROJECTS } from '../data/projects';
import { useRouter } from '../context/RouterContext';
import type { ProjectCategory } from '../types';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { Reveal } from '../components/MotionPrimitives';

const CATEGORIES: ProjectCategory[] = [
  'All',
  'Restaurant',
  'Business',
  'E-Commerce',
  'Portfolio',
  'Professional Services',
];

export function PortfolioPage() {
  const { navigate } = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') return PORTFOLIO_PROJECTS;
    return PORTFOLIO_PROJECTS.filter((project) => project.category === selectedCategory);
  }, [selectedCategory]);

  const getCategoryCount = (category: ProjectCategory) => {
    if (category === 'All') return PORTFOLIO_PROJECTS.length;
    return PORTFOLIO_PROJECTS.filter((p) => p.category === category).length;
  };

  return (
    <div>
      {/* Portfolio Header */}
      <section className="bg-[#070B14] text-white border-b border-slate-800/80">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-16 sm:py-22">
          <p className="text-xs font-semibold tracking-wider uppercase text-blue-400">
            Portfolio &amp; Concept Demonstrations
          </p>
          <h1 className="mt-3 font-display text-3xl sm:text-5xl font-bold tracking-tight text-white max-w-3xl leading-[1.1]">
            Concept Case Studies Across Core Industries
          </h1>
          <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            Explore our demonstration builds crafted to illustrate how Nexora Digital designs, structures, and engineers websites across hospitality, corporate advisory, retail, creative portfolios, and professional services.
          </p>
        </div>
      </section>

      {/* Filter & Grid */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-14 sm:py-20">
          {/* Interactive Category Filter Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-slate-200">
            <div
              role="tablist"
              aria-label="Filter projects by industry category"
              className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-slate-200/70 w-fit"
            >
              {CATEGORIES.map((category) => {
                const active = selectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      active
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <span>{category}</span>
                    <span className="ml-1.5 font-mono text-[11px] text-slate-400 tabular-nums">
                      ({getCategoryCount(category)})
                    </span>
                  </button>
                );
              })}
            </div>

            <p className="text-xs text-slate-500">
              Showing {filteredProjects.length} of {PORTFOLIO_PROJECTS.length} concept demonstrations
            </p>
          </div>

          {/* Project Grid */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredProjects.map((project, idx) => (
              <Reveal key={project.slug} delay={idx * 0.04}>
                <article className="group h-full rounded-2xl bg-white border border-slate-200 overflow-hidden flex flex-col justify-between transition-all duration-200 hover:border-blue-300 hover:shadow-md">
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
                        <span className="font-semibold text-blue-700">{project.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{project.conceptBadge}</span>
                      </div>
                      <h2 className="mt-2 font-display text-xl font-bold text-slate-900">
                        {project.title}
                      </h2>
                      <p className="mt-1 text-xs font-medium text-slate-500">
                        {project.subtitle}
                      </p>
                      <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                        {project.shortDescription}
                      </p>
                      <p className="mt-4 font-mono text-xs text-slate-500">
                        {project.technologies.join(' · ')}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-2">
                    <button
                      type="button"
                      onClick={() => navigate(`/portfolio/${project.slug}`)}
                      className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-blue-600 rounded-lg transition-colors duration-150 cursor-pointer"
                    >
                      <span>View Project</span>
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
