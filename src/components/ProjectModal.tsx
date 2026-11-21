import {useEffect} from 'react';
import {ExternalLink, Github, X} from 'lucide-react';
import {AnimatePresence, motion} from 'motion/react';
import type {ProjectItem} from '../data/portfolioData';
import {CodeArrayViewer} from './CodeArrayViewer';
import {HighlightText} from './HighlightText';
import {ResilientImage} from './ResilientImage';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export function ProjectModal({project, onClose}: ProjectModalProps) {
  useEffect(() => {
    if (!project) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          transition={{duration: 0.18}}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm sm:p-6"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          <motion.div
            initial={{opacity: 0, scale: 0.97, y: 12}}
            animate={{opacity: 1, scale: 1, y: 0}}
            exit={{opacity: 0, scale: 0.97, y: 12}}
            transition={{duration: 0.22, ease: [0.16, 1, 0.3, 1]}}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-[#EA580C]/40 bg-[#120E0C] p-6 sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium text-white/65">
                  {project.category} · {project.year} · {project.role}
                </p>
                <h3 id="project-modal-title" className="mt-1.5 text-2xl font-bold text-white sm:text-3xl">
                  {project.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-[#1B1512] text-white transition-colors hover:border-[#FF7A2F] hover:text-[#FF7A2F] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A2F]"
                aria-label="Close project details"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6 overflow-hidden rounded-xl border border-white/10">
              <ResilientImage
                src={project.image}
                alt={project.title}
                fallbackTitle={project.title}
                className="aspect-[16/9] w-full object-cover"
              />
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4 rounded-xl border border-white/10 bg-[#181310] p-4">
              <div>
                <p className="text-xs text-white/60">Median Latency</p>
                <p className="mt-1 font-mono text-lg font-bold text-[#FF7A2F] tabular-nums">
                  {project.metrics.latency}
                </p>
              </div>
              <div className="border-l border-white/10 pl-4">
                <p className="text-xs text-white/60">Throughput</p>
                <p className="mt-1 font-mono text-lg font-bold text-white tabular-nums">
                  {project.metrics.throughput}
                </p>
              </div>
              <div className="border-l border-white/10 pl-4">
                <p className="text-xs text-white/60">Reliability</p>
                <p className="mt-1 font-mono text-lg font-bold text-white tabular-nums">
                  {project.metrics.uptime}
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <p className="text-base leading-relaxed text-white/85">{project.description}</p>
              <p className="text-sm text-white/80">
                <span className="font-semibold text-white">Architecture: </span>
                <HighlightText variant="underline">{project.architecture}</HighlightText>
              </p>
              <p className="text-sm text-white/80">
                <span className="font-semibold text-white">Measured Impact: </span>
                <HighlightText variant="accent">{project.impact}</HighlightText>
              </p>
            </div>

            <div className="mt-6">
              <CodeArrayViewer
                variableName="selectedProject"
                typeName="ProjectItem"
                fileName={`src/data/projects/${project.id}.ts`}
                items={[project]}
              />
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
              <p className="font-mono text-xs text-white/65">{project.stack.join(' · ')}</p>
              <div className="flex items-center gap-3">
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-10 items-center gap-2 rounded-lg border border-white/15 px-4 text-xs font-semibold text-white transition-colors hover:border-[#FF7A2F] hover:text-[#FF7A2F] whitespace-nowrap"
                >
                  <Github className="h-4 w-4" aria-hidden="true" />
                  Source Code
                </a>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#C2410C] px-4 text-xs font-semibold text-white transition-colors hover:bg-[#EA580C] whitespace-nowrap"
                >
                  Live Deployment
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
