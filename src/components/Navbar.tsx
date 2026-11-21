import {useEffect, useState} from 'react';
import {ArrowRight, Menu, X} from 'lucide-react';
import {AnimatePresence, motion} from 'motion/react';
import {
  developerProfile,
  experiences,
  projects,
  techStackCategories,
} from '../data/portfolioData';

type NavHref = '#experience' | '#projects' | '#tech-stack' | '#contact';

interface NavTab {
  label: string;
  href: NavHref;
  summary: string;
  items: {title: string; meta: string}[];
}

const navTabs: NavTab[] = [
  {
    label: 'Experience',
    href: '#experience',
    summary: '3 years building scalable React.js, Next.js, and full-stack web applications.',
    items: experiences.map((exp) => ({
      title: `${exp.role} · ${exp.company}`,
      meta: exp.period,
    })),
  },
  {
    label: 'Projects',
    href: '#projects',
    summary: 'Live client platforms: YenoPay, Jeevan Amruttam, Apna Tea & offline RBAC consoles.',
    items: projects.map((proj) => ({
      title: proj.title,
      meta: `${proj.category} · ${proj.metrics.uptime}`,
    })),
  },
  {
    label: 'Tech Stack',
    href: '#tech-stack',
    summary: 'React.js, Next.js, TypeScript, Redux Toolkit, Supabase, IndexedDB & VPS hosting.',
    items: techStackCategories.map((cat) => ({
      title: cat.domain,
      meta: cat.tools.map((t) => t.name).join(' · '),
    })),
  },
  {
    label: 'Contact',
    href: '#contact',
    summary: developerProfile.availability,
    items: [
      {title: developerProfile.email, meta: 'Direct Email'},
      {title: developerProfile.phone, meta: 'Phone'},
      {title: developerProfile.location, meta: 'Location'},
    ],
  },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredHref, setHoveredHref] = useState<NavHref | null>(null);
  const [activeHref, setActiveHref] = useState<NavHref>('#experience');

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setHoveredHref(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const scrollToSection = (href: NavHref) => {
    setMobileOpen(false);
    setHoveredHref(null);
    setActiveHref(href);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({behavior: 'smooth'});
    }
  };

  const hoveredTab = navTabs.find((t) => t.href === hoveredHref) ?? null;

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0A0807]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-8 px-6">
        <a
          href="#top"
          aria-label="Masum Reza — Back to top"
          onClick={(e) => {
            e.preventDefault();
            setHoveredHref(null);
            window.scrollTo({top: 0, behavior: 'smooth'});
          }}
          className="flex items-center shrink-0 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A2F]"
        >
          <img
            src="/assets/MR_Logo-selection__4__fc4e93fc.png"
            alt="MR Logo"
            referrerPolicy="no-referrer"
            className="h-9 w-auto object-contain"
          />
        </a>

        <div
          className="relative hidden md:flex items-center"
          onMouseLeave={() => setHoveredHref(null)}
        >
          <nav className="flex items-center gap-2" aria-label="Primary Navigation">
            {navTabs.map((tab) => {
              const isHovered = hoveredHref === tab.href;
              const isActive = activeHref === tab.href;

              return (
                <a
                  key={tab.href}
                  href={tab.href}
                  onMouseEnter={() => setHoveredHref(tab.href)}
                  onFocus={() => setHoveredHref(tab.href)}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(tab.href);
                  }}
                  className={`relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A2F] ${
                    isHovered || isActive ? 'text-white' : 'text-white/75 hover:text-white'
                  }`}
                >
                  {isHovered && (
                    <motion.span
                      layoutId="nav-hover-bg"
                      transition={{duration: 0.18, ease: [0.16, 1, 0.3, 1]}}
                      className="absolute inset-0 rounded-lg bg-[#C2410C]/25 ring-1 ring-[#FF7A2F]/40"
                    />
                  )}
                  {(isHovered || (!hoveredHref && isActive)) && (
                    <motion.span
                      layoutId="nav-hover-underline"
                      transition={{duration: 0.2, ease: [0.16, 1, 0.3, 1]}}
                      className="absolute right-3.5 bottom-1 left-3.5 h-[2px] rounded-full bg-[#FF7A2F]"
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </a>
              );
            })}
          </nav>

          <AnimatePresence>
            {hoveredTab && (
              <motion.div
                key={hoveredTab.href}
                initial={{opacity: 0, y: 6}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0, y: 4}}
                transition={{duration: 0.16, ease: [0.16, 1, 0.3, 1]}}
                className="absolute top-full left-1/2 z-50 w-[380px] -translate-x-1/2 pt-2.5"
              >
                <div className="rounded-2xl border border-[#EA580C]/40 bg-[#14100E] p-5 shadow-2xl">
                  <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3">
                    <span className="font-display text-sm font-bold text-[#FF7A2F]">
                      {hoveredTab.label}
                    </span>
                    <button
                      type="button"
                      onClick={() => scrollToSection(hoveredTab.href)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-white/80 transition-colors hover:text-[#FF7A2F] cursor-pointer"
                    >
                      Jump to section
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  </div>

                  <p className="mt-3 text-xs leading-relaxed text-white/75">
                    {hoveredTab.summary}
                  </p>

                  <div className="mt-3.5 space-y-2">
                    {hoveredTab.items.map((item) => (
                      <button
                        key={item.title}
                        type="button"
                        onClick={() => scrollToSection(hoveredTab.href)}
                        className="flex w-full items-baseline justify-between gap-3 rounded-lg border border-white/5 bg-[#1B1512] px-3 py-2 text-left transition-colors duration-150 hover:border-[#EA580C]/50 hover:bg-[#221915] cursor-pointer"
                      >
                        <span className="truncate text-xs font-semibold text-white">
                          {item.title}
                        </span>
                        <span className="shrink-0 font-mono text-[11px] text-[#FDBA74]">
                          {item.meta}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#contact');
            }}
            className="hidden md:inline-flex items-center justify-center rounded-lg bg-[#C2410C] px-4 py-2 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#EA580C] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Hire Me
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 text-white transition-colors hover:border-[#FF7A2F] md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A2F]"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{opacity: 0, y: -8}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: -8}}
            transition={{duration: 0.18, ease: [0.16, 1, 0.3, 1]}}
            className="border-t border-white/10 bg-[#120E0C] px-6 py-4 md:hidden"
          >
            <nav className="flex flex-col gap-3" aria-label="Mobile Navigation">
              {navTabs.map((tab) => (
                <a
                  key={tab.href}
                  href={tab.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(tab.href);
                  }}
                  className="py-2 text-base font-medium text-white/90 hover:text-[#FF7A2F] transition-colors whitespace-nowrap"
                >
                  {tab.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('#contact');
                }}
                className="mt-2 inline-flex h-11 items-center justify-center rounded-lg bg-[#C2410C] px-4 text-sm font-semibold text-white hover:bg-[#EA580C] transition-colors whitespace-nowrap"
              >
                Hire Me
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
