import {useEffect, useState} from 'react';
import {Check, Copy, Download, Github, Globe, Linkedin, Mail, Terminal, UserRound} from 'lucide-react';
import {AnimatePresence, motion} from 'motion/react';
import {developerProfile, heroMetrics} from '../data/portfolioData';
import {HighlightText} from './HighlightText';
import {ResumeModal} from './ResumeModal';

const rollingRoles = ['Full-Stack', 'Web', 'Software', 'Frontend'] as const;

const coderSkills = [
  'React.js',
  'Next.js',
  'TypeScript',
  'Tailwind CSS',
  'Redux Toolkit',
  'Framer Motion',
  'Supabase',
  'IndexedDB',
];

const coderSourceSnippet = `const coder = {
  name: '${developerProfile.name}',
  skills: [${coderSkills.map((s) => `'${s}'`).join(', ')}],
  hardWorker: true,
  quickLearner: true,
  problemSolver: true,
  hireable: function() {
    return (
      this.hardWorker &&
      this.problemSolver &&
      this.skills.length >= 5
    );
  }
};`;

export function HeroSection() {
  const [copiedCoder, setCopiedCoder] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [rolePaused, setRolePaused] = useState(false);

  useEffect(() => {
    if (rolePaused) return;
    const timer = window.setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % rollingRoles.length);
    }, 2200);
    return () => window.clearInterval(timer);
  }, [rolePaused]);

  const scrollTo = (selector: string) => {
    const target = document.querySelector(selector);
    if (target) {
      target.scrollIntoView({behavior: 'smooth'});
    }
  };

  const handleCopyCoder = async () => {
    try {
      await navigator.clipboard.writeText(coderSourceSnippet);
      setCopiedCoder(true);
      setTimeout(() => setCopiedCoder(false), 1800);
    } catch {
      setCopiedCoder(false);
    }
  };

  const currentRole = rollingRoles[roleIndex];

  return (
    <section
      id="top"
      className="relative overflow-hidden"
      style={{
        backgroundImage:
          'linear-gradient(to right, rgba(255, 122, 47, 0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 122, 47, 0.045) 1px, transparent 1px)',
        backgroundSize: '56px 56px',
      }}
    >
      <div className="mx-auto max-w-6xl px-6 pt-12 pb-16 lg:pt-20 lg:pb-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
          <motion.div
            initial={{opacity: 0, y: 14}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.45, ease: [0.16, 1, 0.3, 1]}}
            className="flex flex-col items-start lg:col-span-6"
          >
            <h1 className="text-[clamp(2.25rem,4.1vw,3.45rem)] font-bold leading-[1.18] tracking-tight text-white [text-wrap:balance]">
              Hello,
              <br />
              This is <HighlightText variant="accent">MASUM REZA</HighlightText>, I&apos;m a
              <br />
              Professional{' '}
              <span
                onMouseEnter={() => setRolePaused(true)}
                onMouseLeave={() => setRolePaused(false)}
                onClick={() => setRoleIndex((prev) => (prev + 1) % rollingRoles.length)}
                title="Hover to pause or click to cycle role"
                className="inline-flex cursor-pointer items-center overflow-hidden rounded-sm bg-[#C2410C] px-2.5 py-0.5 align-bottom text-white"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={currentRole}
                    initial={{y: '65%', opacity: 0}}
                    animate={{y: '0%', opacity: 1}}
                    exit={{y: '-65%', opacity: 0}}
                    transition={{duration: 0.28, ease: [0.16, 1, 0.3, 1]}}
                    className="inline-block whitespace-nowrap"
                  >
                    {currentRole}
                  </motion.span>
                </AnimatePresence>
              </span>{' '}
              <HighlightText variant="accent">Developer</HighlightText>.
            </h1>

            <div className="mt-7 flex items-center gap-5" aria-label="Social and developer profiles">
              <a
                href={developerProfile.githubUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub profile"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-[#14100E] text-[#FF7A2F] transition-all duration-150 hover:-translate-y-0.5 hover:border-[#FF7A2F] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A2F]"
              >
                <Github className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href={developerProfile.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn profile"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-[#14100E] text-[#FF7A2F] transition-all duration-150 hover:-translate-y-0.5 hover:border-[#FF7A2F] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A2F]"
              >
                <Linkedin className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href={`mailto:${developerProfile.email}`}
                aria-label="Send email"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-[#14100E] text-[#FF7A2F] transition-all duration-150 hover:-translate-y-0.5 hover:border-[#FF7A2F] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A2F]"
              >
                <Mail className="h-5 w-5" aria-hidden="true" />
              </a>
              <button
                type="button"
                onClick={() => scrollTo('#projects')}
                aria-label="Jump to projects"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-[#14100E] text-[#FF7A2F] transition-all duration-150 hover:-translate-y-0.5 hover:border-[#FF7A2F] hover:text-white cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A2F]"
              >
                <Terminal className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => scrollTo('#tech-stack')}
                aria-label="Jump to tech stack"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-[#14100E] text-[#FF7A2F] transition-all duration-150 hover:-translate-y-0.5 hover:border-[#FF7A2F] hover:text-white cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A2F]"
              >
                <Globe className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => scrollTo('#contact')}
                className="inline-flex h-12 items-center gap-2.5 rounded-full border border-[#EA580C]/70 bg-[#14100E] px-7 text-sm font-semibold tracking-wide text-white transition-all duration-150 hover:border-[#FF7A2F] hover:bg-[#1E1510] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A2F]"
              >
                Contact Me
                <UserRound className="h-4 w-4 text-[#FF7A2F]" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() => setResumeOpen(true)}
                className="inline-flex h-12 items-center gap-2.5 rounded-full bg-gradient-to-r from-[#C2410C] to-[#EA580C] px-7 text-sm font-semibold tracking-wide text-white transition-all duration-150 hover:from-[#EA580C] hover:to-[#FF7A2F] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Get Resume
                <Download className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{opacity: 0, y: 14}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1]}}
            className="lg:col-span-6"
          >
            <div className="overflow-hidden rounded-2xl border border-[#EA580C]/35 bg-gradient-to-br from-[#140F0C] to-[#0D0A08] shadow-2xl">
              <div className="flex items-center justify-between border-b border-[#EA580C]/20 px-5 py-3.5">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#EF4444]" />
                  <span className="h-3 w-3 rounded-full bg-[#F59E0B]" />
                  <span className="h-3 w-3 rounded-full bg-[#FDBA74]" />
                </div>

                <button
                  type="button"
                  onClick={handleCopyCoder}
                  className="inline-flex h-7 items-center gap-1.5 rounded-md border border-white/10 bg-[#1B1410] px-2.5 font-mono text-[11px] font-medium text-white/80 transition-colors hover:border-[#FF7A2F] hover:text-[#FF7A2F] cursor-pointer"
                >
                  {copiedCoder ? (
                    <>
                      <Check className="h-3 w-3 text-[#FF7A2F]" aria-hidden="true" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" aria-hidden="true" />
                      coder.ts
                    </>
                  )}
                </button>
              </div>

              <div className="overflow-x-auto px-5 py-6 font-mono text-[13px] leading-relaxed sm:px-7 sm:py-7 sm:text-sm">
                <pre className="whitespace-pre text-white">
                  <code>
                    <span className="text-[#FF7A2F]">const</span>{' '}
                    <span className="text-white">coder</span>{' '}
                    <span className="text-[#FF7A2F]">=</span>{' '}
                    <span className="text-white/60">{'{'}</span>
                    {'\n'}
                    {'  '}
                    <span className="text-white">name:</span>{' '}
                    <span className="text-white/60">&apos;</span>
                    <span className="text-[#FDBA74]">{developerProfile.name}</span>
                    <span className="text-white/60">&apos;,</span>
                    {'\n'}
                    {'  '}
                    <span className="text-white">skills: [</span>
                    {coderSkills.map((skill, idx) => (
                      <span key={skill}>
                        <span className="text-white/60">&apos;</span>
                        <span className="text-[#FDBA74]">{skill}</span>
                        <span className="text-white/60">&apos;</span>
                        {idx < coderSkills.length - 1 && (
                          <span className="text-white/60">, </span>
                        )}
                        {idx === 3 && '\n           '}
                      </span>
                    ))}
                    <span className="text-white">],</span>
                    {'\n'}
                    {'  '}
                    <span className="text-white">hardWorker:</span>{' '}
                    <span className="text-[#FF7A2F]">true</span>
                    <span className="text-white/60">,</span>
                    {'\n'}
                    {'  '}
                    <span className="text-white">quickLearner:</span>{' '}
                    <span className="text-[#FF7A2F]">true</span>
                    <span className="text-white/60">,</span>
                    {'\n'}
                    {'  '}
                    <span className="text-white">problemSolver:</span>{' '}
                    <span className="text-[#FF7A2F]">true</span>
                    <span className="text-white/60">,</span>
                    {'\n'}
                    {'  '}
                    <span className="text-[#FF8A47]">hireable:</span>{' '}
                    <span className="text-[#FF7A2F]">function</span>
                    <span className="text-white/60">() {'{'}</span>
                    {'\n'}
                    {'    '}
                    <span className="text-[#FF7A2F]">return</span>{' '}
                    <span className="text-white/60">(</span>
                    {'\n'}
                    {'      '}
                    <span className="text-white/90">this.</span>
                    <span className="text-white">hardWorker</span>{' '}
                    <span className="text-[#FF7A2F]">&amp;&amp;</span>
                    {'\n'}
                    {'      '}
                    <span className="text-white/90">this.</span>
                    <span className="text-white">problemSolver</span>{' '}
                    <span className="text-[#FF7A2F]">&amp;&amp;</span>
                    {'\n'}
                    {'      '}
                    <span className="text-white/90">this.</span>
                    <span className="text-white">skills.length</span>{' '}
                    <span className="text-[#FF7A2F]">&gt;=</span>{' '}
                    <span className="text-[#FDBA74]">5</span>
                    {'\n'}
                    {'    '}
                    <span className="text-white/60">);</span>
                    {'\n'}
                    {'  '}
                    <span className="text-white/60">{'}'}</span>
                    {'\n'}
                    <span className="text-white/60">{'};'}</span>
                  </code>
                </pre>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{opacity: 0, y: 12}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.45, delay: 0.14, ease: [0.16, 1, 0.3, 1]}}
          className="mt-12 grid grid-cols-2 gap-4 rounded-2xl border border-white/10 bg-[#14100E] p-6 sm:grid-cols-4"
        >
          {heroMetrics.map((metric, idx) => (
            <div
              key={metric.label}
              className={`flex flex-col gap-1 ${
                idx !== 0 ? 'sm:border-l sm:border-white/10 sm:pl-6' : ''
              }`}
            >
              <span className="font-display text-2xl font-bold text-[#FF7A2F] tabular-nums sm:text-3xl">
                {metric.value}
              </span>
              <span className="text-xs font-medium text-white/75 sm:text-sm">{metric.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
    </section>
  );
}
