import {useEffect, useState} from 'react';
import {Check, Download, FileText, Printer, X} from 'lucide-react';
import {AnimatePresence, motion} from 'motion/react';
import {
  developerProfile,
  education,
  experiences,
  projects,
  techStackCategories,
} from '../data/portfolioData';
import {downloadCvPdf} from '../utils/downloadCv';
import {HighlightText} from './HighlightText';

interface ResumeModalProps {
  open: boolean;
  onClose: () => void;
}

export function ResumeModal({open, onClose}: ResumeModalProps) {
  const [activeTab, setActiveTab] = useState<'summary' | 'sheet'>('summary');
  const [downloadState, setDownloadState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  const handleDownloadPdf = async () => {
    setDownloadState('loading');
    const ok = await downloadCvPdf(developerProfile.cvPdfPath, developerProfile.cvFileName);
    setDownloadState(ok ? 'done' : 'error');
    window.setTimeout(() => setDownloadState('idle'), 2600);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          transition={{duration: 0.18}}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm sm:p-6"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="resume-modal-title"
        >
          <motion.div
            initial={{opacity: 0, scale: 0.97, y: 12}}
            animate={{opacity: 1, scale: 1, y: 0}}
            exit={{opacity: 0, scale: 0.97, y: 12}}
            transition={{duration: 0.22, ease: [0.16, 1, 0.3, 1]}}
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-[#EA580C]/40 bg-[#120E0C] p-6 sm:p-8"
          >
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <p className="text-xs font-medium text-[#FF7A2F]">Curriculum Vitae</p>
                <h3 id="resume-modal-title" className="mt-1 text-2xl font-bold text-white">
                  {developerProfile.name}
                </h3>
                <p className="mt-1 text-xs text-white/70 sm:text-sm">
                  {developerProfile.role} · {developerProfile.location} · {developerProfile.phone} ·{' '}
                  {developerProfile.email}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div
                  className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-[#1B1512] p-1"
                  role="tablist"
                  aria-label="CV view format"
                >
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeTab === 'summary'}
                    onClick={() => setActiveTab('summary')}
                    className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                      activeTab === 'summary'
                        ? 'bg-[#C2410C] text-white'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    Structured CV
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeTab === 'sheet'}
                    onClick={() => setActiveTab('sheet')}
                    className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                      activeTab === 'sheet'
                        ? 'bg-[#C2410C] text-white'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                    A4 CV Sheet
                  </button>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-[#1B1512] text-white transition-colors hover:border-[#FF7A2F] hover:text-[#FF7A2F] cursor-pointer"
                  aria-label="Close resume preview"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="mt-5 flex-1 overflow-y-auto pr-1">
              {activeTab === 'summary' ? (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-semibold tracking-wide text-[#FF7A2F]">
                      Professional Summary
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-white/85">
                      {developerProfile.summary}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-semibold tracking-wide text-[#FF7A2F]">
                      Technical Skills
                    </h4>
                    <div className="mt-2.5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                      {techStackCategories.map((cat) => (
                        <div
                          key={cat.id}
                          className="rounded-xl border border-white/10 bg-[#17120F] p-3.5"
                        >
                          <p className="text-xs font-bold text-white">{cat.domain}</p>
                          <p className="mt-1.5 font-mono text-[11px] leading-relaxed text-white/75">
                            {cat.tools.map((t) => t.name).join(' · ')}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-semibold tracking-wide text-[#FF7A2F]">
                      Work Experience
                    </h4>
                    <div className="mt-3 space-y-3.5">
                      {experiences.map((exp) => (
                        <div
                          key={exp.id}
                          className="rounded-xl border border-white/10 bg-[#17120F] p-4"
                        >
                          <div className="flex flex-wrap items-baseline justify-between gap-2">
                            <p className="text-sm font-bold text-white">
                              {exp.role} —{' '}
                              <HighlightText variant="accent">{exp.company}</HighlightText>{' '}
                              <span className="font-normal text-white/60">({exp.location})</span>
                            </p>
                            <span className="font-mono text-xs text-[#FDBA74] tabular-nums">
                              {exp.period}
                            </span>
                          </div>
                          <ul className="mt-2.5 space-y-1 text-xs leading-relaxed text-white/80">
                            {exp.highlights.map((h, i) => (
                              <li key={i}>• {h}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-semibold tracking-wide text-[#FF7A2F]">
                      Projects
                    </h4>
                    <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {projects.slice(0, 3).map((proj) => (
                        <div
                          key={proj.id}
                          className="rounded-xl border border-white/10 bg-[#17120F] p-4"
                        >
                          <p className="text-sm font-bold text-white">{proj.title}</p>
                          <p className="mt-1 text-xs leading-relaxed text-white/75">
                            {proj.description}
                          </p>
                          <p className="mt-2 font-mono text-[11px] text-[#FF7A2F]">
                            {proj.stack.join(' · ')}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-semibold tracking-wide text-[#FF7A2F]">
                      Education
                    </h4>
                    <div className="mt-2.5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {education.map((edu) => (
                        <div
                          key={edu.id}
                          className="rounded-xl border border-white/10 bg-[#17120F] p-3.5"
                        >
                          <p className="text-xs font-bold text-white">{edu.degree}</p>
                          <p className="mt-1 text-xs text-white/75">
                            {edu.institution} · {edu.location}
                          </p>
                          <p className="mt-1 font-mono text-[11px] text-[#FDBA74] tabular-nums">
                            {edu.period}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mx-auto max-w-3xl rounded-xl bg-white p-8 text-slate-900 shadow-lg">
                  <div className="border-b border-slate-300 pb-4 text-center">
                    <h4 className="font-display text-2xl font-bold tracking-tight text-slate-900">
                      MASUM REZA
                    </h4>
                    <p className="mt-0.5 text-sm font-semibold text-[#C2410C]">
                      {developerProfile.role}
                    </p>
                    <p className="mt-1.5 text-xs text-slate-600">
                      {developerProfile.phone} · {developerProfile.email} · masumrezadev.netlify.app · github.com/masum011
                    </p>
                  </div>

                  <div className="mt-4 space-y-4 text-xs leading-relaxed text-slate-800">
                    <section>
                      <h5 className="border-b border-slate-300 pb-1 font-bold uppercase tracking-wide text-[#C2410C]">
                        Professional Summary
                      </h5>
                      <p className="mt-1.5">{developerProfile.summary}</p>
                    </section>

                    <section>
                      <h5 className="border-b border-slate-300 pb-1 font-bold uppercase tracking-wide text-[#C2410C]">
                        Work Experience
                      </h5>
                      <div className="mt-2 space-y-3">
                        {experiences.map((exp) => (
                          <div key={exp.id}>
                            <div className="flex items-baseline justify-between font-bold text-slate-900">
                              <span>
                                {exp.role} — {exp.company} ({exp.location})
                              </span>
                              <span className="font-mono text-[11px]">{exp.period}</span>
                            </div>
                            <ul className="mt-1 space-y-0.5 text-slate-700">
                              {exp.highlights.map((h, idx) => (
                                <li key={idx}>• {h}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </section>

                    <section>
                      <h5 className="border-b border-slate-300 pb-1 font-bold uppercase tracking-wide text-[#C2410C]">
                        Projects
                      </h5>
                      <div className="mt-2 space-y-2.5">
                        {projects.slice(0, 3).map((proj) => (
                          <div key={proj.id}>
                            <div className="flex items-baseline justify-between font-bold text-slate-900">
                              <span>{proj.title}</span>
                              <span className="font-mono text-[11px] text-[#C2410C]">
                                {proj.metrics.uptime}
                              </span>
                            </div>
                            <p className="text-slate-600">{proj.stack.join(', ')}</p>
                            <p className="mt-0.5 text-slate-700">{proj.description}</p>
                          </div>
                        ))}
                      </div>
                    </section>

                    <section>
                      <h5 className="border-b border-slate-300 pb-1 font-bold uppercase tracking-wide text-[#C2410C]">
                        Education
                      </h5>
                      <div className="mt-2 space-y-1.5">
                        {education.map((edu) => (
                          <div key={edu.id} className="flex items-baseline justify-between">
                            <span>
                              <strong>{edu.degree}</strong> — {edu.institution}, {edu.location}
                            </span>
                            <span className="font-mono text-[11px]">{edu.period}</span>
                          </div>
                        ))}
                      </div>
                    </section>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5">
              <p className="text-xs text-white/60">
                {downloadState === 'error'
                  ? 'Browser blocked automatic download — use Print / Save as PDF.'
                  : downloadState === 'done'
                  ? 'CV PDF downloaded successfully.'
                  : 'Original PDF ready for download or print.'}
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex h-10 items-center gap-2 rounded-lg border border-white/15 px-4 text-xs font-semibold text-white transition-colors hover:border-[#FF7A2F] hover:text-[#FF7A2F] cursor-pointer whitespace-nowrap"
                >
                  <Printer className="h-4 w-4" aria-hidden="true" />
                  Print / Save PDF
                </button>
                <button
                  type="button"
                  disabled={downloadState === 'loading'}
                  onClick={handleDownloadPdf}
                  className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#C2410C] px-5 text-xs font-semibold text-white transition-colors hover:bg-[#EA580C] disabled:opacity-60 cursor-pointer whitespace-nowrap"
                >
                  {downloadState === 'done' ? (
                    <>
                      <Check className="h-4 w-4" aria-hidden="true" />
                      Downloaded
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4" aria-hidden="true" />
                      {downloadState === 'loading' ? 'Preparing PDF...' : 'Download CV (PDF)'}
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
