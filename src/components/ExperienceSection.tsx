import {useState} from 'react';
import {AnimatePresence, motion} from 'motion/react';
import {experiences, type ExperienceItem} from '../data/portfolioData';
import {CodeArrayViewer} from './CodeArrayViewer';
import {HighlightText} from './HighlightText';

type ExperienceViewMode = 'split' | 'visual' | 'code';

export function ExperienceSection() {
  const [viewMode, setViewMode] = useState<ExperienceViewMode>('split');
  const [selectedExpId, setSelectedExpId] = useState<string>(experiences[0].id);

  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 py-20">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-[#FF7A2F]">01. Engineering Experience</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl [text-wrap:balance]">
            Track record across{' '}
            <HighlightText variant="marker">full-stack</HighlightText>{' '}
            architecture
          </h2>
          <p className="mt-3 text-base text-white/75">
            Select any role to inspect its corresponding TypeScript object inside the{' '}
            <HighlightText variant="underline">experiences</HighlightText> array.
          </p>
        </div>

        <div
          className="inline-flex w-fit items-center gap-1 rounded-lg border border-white/10 bg-[#14100E] p-1"
          role="tablist"
          aria-label="Experience view mode"
        >
          {(
            [
              {id: 'split', label: 'Split View'},
              {id: 'visual', label: 'Visual Cards'},
              {id: 'code', label: 'Array Code'},
            ] as const
          ).map((tab) => {
            const active = viewMode === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setViewMode(tab.id)}
                className={`relative rounded-md px-3.5 py-2 text-xs font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A2F] ${
                  active ? 'text-white' : 'text-white/65 hover:text-white'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="exp-view-pill"
                    transition={{duration: 0.2, ease: [0.16, 1, 0.3, 1]}}
                    className="absolute inset-0 rounded-md bg-[#C2410C]"
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={viewMode}
          initial={{opacity: 0, y: 10}}
          animate={{opacity: 1, y: 0}}
          exit={{opacity: 0, y: -8}}
          transition={{duration: 0.22, ease: [0.16, 1, 0.3, 1]}}
          className={`mt-10 grid gap-8 ${
            viewMode === 'split' ? 'grid-cols-1 lg:grid-cols-12' : 'grid-cols-1'
          }`}
        >
          {viewMode !== 'code' && (
            <div
              className={`flex flex-col gap-5 ${
                viewMode === 'split' ? 'lg:col-span-6' : 'grid grid-cols-1 lg:grid-cols-3'
              }`}
            >
              {experiences.map((exp: ExperienceItem) => {
                const isSelected = selectedExpId === exp.id;
                return (
                  <motion.article
                    key={exp.id}
                    layout="position"
                    onClick={() => setSelectedExpId(exp.id)}
                    className={`cursor-pointer rounded-2xl border p-6 transition-colors duration-150 ${
                      isSelected
                        ? 'border-[#EA580C] bg-[#1A130F]'
                        : 'border-white/10 bg-[#14100E] hover:border-white/25'
                    }`}
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2 text-xs text-white/65">
                      <span>
                        {exp.company} · {exp.location}
                      </span>
                      <span className="font-mono text-[#FF7A2F] tabular-nums">{exp.period}</span>
                    </div>

                    <h3 className="mt-2.5 text-xl font-bold text-white">{exp.role}</h3>

                    <p className="mt-2 text-sm font-semibold text-[#FF7A2F]">
                      {exp.impactMetric}
                    </p>

                    <p className="mt-3 text-sm leading-relaxed text-white/80">{exp.summary}</p>

                    <ul className="mt-4 space-y-2 border-t border-white/10 pt-4 text-sm text-white/80">
                      {exp.highlights.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF7A2F]" aria-hidden="true" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    <p className="mt-5 font-mono text-xs text-white/65">
                      {exp.stack.join(' · ')}
                    </p>
                  </motion.article>
                );
              })}
            </div>
          )}

          {viewMode !== 'visual' && (
            <div className={viewMode === 'split' ? 'lg:col-span-6' : ''}>
              <div className={viewMode === 'split' ? 'lg:sticky lg:top-24' : ''}>
                <CodeArrayViewer
                  variableName="experiences"
                  typeName="ExperienceItem"
                  fileName="src/data/experiences.ts"
                  items={experiences}
                  selectedId={selectedExpId}
                  onSelectItem={(item) => setSelectedExpId(item.id)}
                />
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
