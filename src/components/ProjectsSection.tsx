import {useMemo, useState} from 'react';
import {ArrowUpRight} from 'lucide-react';
import {AnimatePresence, motion} from 'motion/react';
import {projects, type ProjectItem} from '../data/portfolioData';
import {CodeArrayViewer} from './CodeArrayViewer';
import {HighlightText} from './HighlightText';
import {ProjectModal} from './ProjectModal';
import {ResilientImage} from './ResilientImage';

const categories = ['All', 'Next.js', 'React.js', 'FinTech & RBAC', 'Full-Stack'] as const;
type CategoryFilter = (typeof categories)[number];
type ProjectViewMode = 'visual' | 'code';

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('All');
  const [viewMode, setViewMode] = useState<ProjectViewMode>('visual');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return projects;
    return projects.filter(
      (project) =>
        project.category === activeCategory ||
        project.stack.some((tech) => tech.toLowerCase().includes(activeCategory.toLowerCase()))
    );
  }, [activeCategory]);

  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-20">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-[#FF7A2F]">02. Selected Projects</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl [text-wrap:balance]">
            Production systems built with{' '}
            <HighlightText variant="accent">modern primitives</HighlightText>
          </h2>
          <p className="mt-3 text-base text-white/75">
            Filter by architecture layer or switch to{' '}
            <HighlightText variant="underline">Array Code</HighlightText> to inspect and copy the raw project object array.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div
            className="inline-flex flex-wrap items-center gap-1 rounded-lg border border-white/10 bg-[#14100E] p-1"
            role="group"
            aria-label="Filter projects by category"
          >
            {categories.map((cat) => {
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`relative rounded-md px-3 py-1.5 text-xs font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A2F] ${
                    active ? 'text-white' : 'text-white/65 hover:text-white'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="proj-cat-pill"
                      transition={{duration: 0.2, ease: [0.16, 1, 0.3, 1]}}
                      className="absolute inset-0 rounded-md bg-[#C2410C]"
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              );
            })}
          </div>

          <div
            className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-[#14100E] p-1"
            role="tablist"
            aria-label="Projects view mode"
          >
            {(
              [
                {id: 'visual', label: 'Showcase'},
                {id: 'code', label: 'Array Code'},
              ] as const
            ).map((mode) => {
              const active = viewMode === mode.id;
              return (
                <button
                  key={mode.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setViewMode(mode.id)}
                  className={`relative rounded-md px-3 py-1.5 text-xs font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A2F] ${
                    active ? 'text-white' : 'text-white/65 hover:text-white'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="proj-mode-pill"
                      transition={{duration: 0.2, ease: [0.16, 1, 0.3, 1]}}
                      className="absolute inset-0 rounded-md bg-[#2A1C15] ring-1 ring-[#EA580C]"
                    />
                  )}
                  <span className="relative z-10">{mode.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {viewMode === 'visual' ? (
          <motion.div
            key={`visual-${activeCategory}`}
            initial={{opacity: 0, y: 10}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: -8}}
            transition={{duration: 0.22, ease: [0.16, 1, 0.3, 1]}}
            className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2"
          >
            {filteredProjects.map((project, index) => (
              <motion.article
                key={project.id}
                layout="position"
                initial={{opacity: 0, y: 12}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.3, delay: index * 0.05, ease: [0.16, 1, 0.3, 1]}}
                onClick={() => setSelectedProject(project)}
                className="group cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-[#14100E] transition-colors duration-150 hover:border-[#EA580C]/70"
              >
                <div className="relative aspect-[4/3] overflow-hidden border-b border-white/10 bg-[#0E0B09]">
                  <ResilientImage
                    src={project.image}
                    alt={project.title}
                    fallbackTitle={project.title}
                    className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#14100E]/90 via-transparent to-transparent" />
                  <div className="absolute right-4 bottom-4 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#C2410C] text-white transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </div>
                </div>

                <div className="p-6 sm:p-7">
                  <div className="flex items-center justify-between gap-2 text-xs text-white/60">
                    <span>
                      {project.category} · {project.role}
                    </span>
                    <span className="font-mono text-[#FF7A2F] tabular-nums">{project.year}</span>
                  </div>

                  <h3 className="mt-2.5 text-xl font-bold text-white group-hover:text-[#FF7A2F] transition-colors duration-150 sm:text-2xl">
                    {project.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-white/80">{project.description}</p>

                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
                    <span className="text-xs font-semibold text-[#FF7A2F]">{project.impact}</span>
                    <span className="font-mono text-xs text-white/60 tabular-nums">
                      {project.metrics.latency} · {project.metrics.uptime}
                    </span>
                  </div>

                  <p className="mt-3 font-mono text-xs text-white/55">
                    {project.stack.join(' · ')}
                  </p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key={`code-${activeCategory}`}
            initial={{opacity: 0, y: 10}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: -8}}
            transition={{duration: 0.22, ease: [0.16, 1, 0.3, 1]}}
            className="mt-10"
          >
            <CodeArrayViewer
              variableName="projects"
              typeName="ProjectItem"
              fileName="src/data/projects.ts"
              items={filteredProjects}
              selectedId={selectedProject?.id}
              onSelectItem={(item) => setSelectedProject(item)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}
