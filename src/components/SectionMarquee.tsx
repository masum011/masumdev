import type {ReactNode} from 'react';
import {motion} from 'motion/react';

interface SkillCardItem {
  name: string;
  icon: ReactNode;
}

const skillCards: SkillCardItem[] = [
  {
    name: 'JavaScript',
    icon: (
      <svg viewBox="0 0 36 36" className="h-9 w-9" aria-hidden="true">
        <rect width="36" height="36" rx="6" fill="#F7DF1E" />
        <path
          d="M15.4 25.5c0 2.4-1.4 3.5-3.4 3.5-1.6 0-2.7-.8-3.3-1.9l2-1.2c.4.7.8 1.2 1.6 1.2.8 0 1.3-.3 1.3-1.6V17h2.8v8.5zm9.6 3.5c-2.3 0-3.8-1.1-4.5-2.5l2-1.2c.6.9 1.3 1.6 2.5 1.6 1.1 0 1.7-.5 1.7-1.2 0-.9-.7-1.2-1.9-1.7l-.7-.3c-1.9-.8-3.1-1.8-3.1-4 0-2 1.5-3.5 3.9-3.5 1.7 0 2.9.6 3.8 2.1l-2 1.3c-.4-.8-.9-1.1-1.7-1.1-.8 0-1.3.5-1.3 1.1 0 .8.5 1.1 1.6 1.6l.7.3c2.2.9 3.5 1.9 3.5 4.1 0 2.4-1.9 3.7-4.5 3.7z"
          fill="#0A0807"
        />
      </svg>
    ),
  },
  {
    name: 'TypeScript',
    icon: (
      <svg viewBox="0 0 36 36" className="h-9 w-9" aria-hidden="true">
        <rect width="36" height="36" rx="6" fill="#3178C6" />
        <path
          d="M19.8 19.6H16v10h-2.9v-10H9.3v-2.4h10.5v2.4zm7.4 10.3c-2.5 0-4.2-1-4.9-2.5l2.2-1.3c.5.9 1.3 1.5 2.6 1.5 1.1 0 1.8-.5 1.8-1.2 0-.8-.6-1.1-2-1.7l-.8-.3c-2-.8-3.3-1.8-3.3-4 0-2 1.6-3.5 4-3.5 1.8 0 3.1.6 3.9 2.1l-2.1 1.3c-.4-.8-.9-1.1-1.8-1.1-.8 0-1.3.4-1.3 1.1 0 .7.5 1.1 1.7 1.6l.8.3c2.3.9 3.6 1.9 3.6 4.1 0 2.4-1.9 3.6-4.4 3.6z"
          fill="#FFFFFF"
        />
      </svg>
    ),
  },
  {
    name: 'React',
    icon: (
      <svg viewBox="0 0 36 36" className="h-9 w-9" fill="none" aria-hidden="true">
        <circle cx="18" cy="18" r="3" fill="#61DAFB" />
        <ellipse cx="18" cy="18" rx="14" ry="5.5" stroke="#61DAFB" strokeWidth="1.8" />
        <ellipse
          cx="18"
          cy="18"
          rx="14"
          ry="5.5"
          stroke="#61DAFB"
          strokeWidth="1.8"
          transform="rotate(60 18 18)"
        />
        <ellipse
          cx="18"
          cy="18"
          rx="14"
          ry="5.5"
          stroke="#61DAFB"
          strokeWidth="1.8"
          transform="rotate(120 18 18)"
        />
      </svg>
    ),
  },
  {
    name: 'Next.js',
    icon: (
      <svg viewBox="0 0 36 36" className="h-9 w-9" fill="none" aria-hidden="true">
        <circle cx="18" cy="18" r="15" fill="#0A0807" stroke="#FFFFFF" strokeOpacity="0.85" strokeWidth="1.8" />
        <path d="M13 24V12l11.5 14.5" stroke="#FFFFFF" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M23 12v8.5" stroke="#FFFFFF" strokeWidth="2.1" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'Tailwind',
    icon: (
      <svg viewBox="0 0 36 36" className="h-9 w-9" fill="none" aria-hidden="true">
        <path
          d="M18 10c-4.5 0-7.3 2.2-8.4 6.7 1.7-2.2 3.7-3.1 5.9-2.5 1.3.3 2.2 1.2 3.2 2.2 1.6 1.6 3.5 3.4 7.7 3.4 4.5 0 7.3-2.2 8.4-6.7-1.7 2.2-3.7 3.1-5.9 2.5-1.3-.3-2.2-1.2-3.2-2.2C24.1 11.8 22.2 10 18 10zM9.6 19.8c-4.5 0-7.3 2.2-8.4 6.7 1.7-2.2 3.7-3.1 5.9-2.5 1.3.3 2.2 1.2 3.2 2.2 1.6 1.6 3.5 3.4 7.7 3.4 4.5 0 7.3-2.2 8.4-6.7-1.7 2.2-3.7 3.1-5.9 2.5-1.3-.3-2.2-1.2-3.2-2.2-1.6-1.6-3.5-3.4-7.7-3.4z"
          fill="#38BDF8"
        />
      </svg>
    ),
  },
  {
    name: 'Framer Motion',
    icon: (
      <svg viewBox="0 0 36 36" className="h-9 w-9" fill="none" aria-hidden="true">
        <path d="M8 6h20v10H18L8 6z" fill="#FF7A2F" />
        <path d="M8 16h10l10 10H8V16z" fill="#EA580C" />
        <path d="M8 26h10v6L8 26z" fill="#FDBA74" />
      </svg>
    ),
  },
  {
    name: 'Redux Toolkit',
    icon: (
      <svg viewBox="0 0 36 36" className="h-9 w-9" fill="none" aria-hidden="true">
        <circle cx="18" cy="18" r="14" stroke="#A855F7" strokeWidth="1.8" strokeDasharray="16 6" />
        <circle cx="13.5" cy="21.5" r="2.2" fill="#A855F7" />
        <circle cx="22.5" cy="21.5" r="2.2" fill="#A855F7" />
        <circle cx="18" cy="13.5" r="2.2" fill="#A855F7" />
      </svg>
    ),
  },
  {
    name: 'Supabase',
    icon: (
      <svg viewBox="0 0 36 36" className="h-9 w-9" fill="none" aria-hidden="true">
        <path
          d="M20.4 30.5c-.8 1-2.4.4-2.4-.9V19.5h9.5c1.7 0 2.7 2 1.6 3.3L20.4 30.5z"
          fill="#3ECF8E"
        />
        <path
          d="M15.6 5.5c.8-1 2.4-.4 2.4.9v10.1H8.5c-1.7 0-2.7-2-1.6-3.3L15.6 5.5z"
          fill="#3ECF8E"
          fillOpacity="0.7"
        />
      </svg>
    ),
  },
  {
    name: 'Node.js & Express',
    icon: (
      <svg viewBox="0 0 36 36" className="h-9 w-9" fill="none" aria-hidden="true">
        <path
          d="M18 4l12 7v14l-12 7-12-7V11l12-7z"
          stroke="#68A063"
          strokeWidth="2.2"
          fill="#68A063"
          fillOpacity="0.16"
        />
        <text
          x="18"
          y="21"
          textAnchor="middle"
          fill="#8CC84B"
          fontSize="10"
          fontWeight="700"
          fontFamily="monospace"
        >
          JS
        </text>
      </svg>
    ),
  },
  {
    name: 'MongoDB',
    icon: (
      <svg viewBox="0 0 36 36" className="h-9 w-9" fill="none" aria-hidden="true">
        <path
          d="M18 5c3.8 4.4 6.5 9.1 6.5 14.3 0 4.5-2.6 8.2-6.5 10.4-3.9-2.2-6.5-5.9-6.5-10.4C11.5 14.1 14.2 9.4 18 5z"
          fill="#47A248"
        />
        <path d="M18 11v20" stroke="#A6E3A1" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'PostgreSQL',
    icon: (
      <svg viewBox="0 0 36 36" className="h-9 w-9" fill="none" aria-hidden="true">
        <ellipse cx="18" cy="11" rx="9" ry="4" stroke="#60A5FA" strokeWidth="2" />
        <path d="M9 11v14c0 2.2 4 4 9 4s9-1.8 9-4V11" stroke="#60A5FA" strokeWidth="2" />
        <path d="M9 18c0 2.2 4 4 9 4s9-1.8 9-4" stroke="#60A5FA" strokeWidth="2" />
      </svg>
    ),
  },
  {
    name: 'Git',
    icon: (
      <svg viewBox="0 0 36 36" className="h-9 w-9" fill="none" aria-hidden="true">
        <rect
          x="18"
          y="3.5"
          width="20.5"
          height="20.5"
          rx="3"
          transform="rotate(45 18 3.5)"
          fill="#F05032"
        />
        <circle cx="14.5" cy="14" r="2.1" fill="#FFFFFF" />
        <circle cx="14.5" cy="22.5" r="2.1" fill="#FFFFFF" />
        <circle cx="21.5" cy="18.5" r="2.1" fill="#FFFFFF" />
        <path d="M14.5 14v8.5M14.5 14l7 4.5" stroke="#FFFFFF" strokeWidth="2" />
      </svg>
    ),
  },
];

export function SectionMarquee() {
  return (
    <section
      aria-label="Technical Skills"
      className="relative border-t border-white/10 bg-[#0A0807] py-14"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-center justify-center">
          <span className="h-px w-20 bg-gradient-to-r from-transparent to-[#EA580C]/70 sm:w-28" />
          <h2 className="rounded-lg border border-[#EA580C]/35 bg-[#1B1410] px-6 py-2 font-display text-lg font-semibold tracking-tight text-white">
            Skills
          </h2>
          <span className="h-px w-20 bg-gradient-to-l from-transparent to-[#EA580C]/70 sm:w-28" />
        </div>
      </div>

      <div className="group relative mt-10 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#0A0807] to-transparent sm:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#0A0807] to-transparent sm:w-28" />

        <div className="flex w-max animate-marquee items-center gap-5 px-4 group-hover:[animation-play-state:paused]">
          {[...skillCards, ...skillCards].map((skill, index) => (
            <motion.div
              key={`${skill.name}-${index}`}
              whileHover={{y: -4}}
              transition={{duration: 0.16, ease: [0.16, 1, 0.3, 1]}}
              className="relative flex h-32 w-36 shrink-0 flex-col items-center justify-center gap-3 overflow-hidden rounded-xl border border-white/10 bg-[#14100E] px-4 transition-colors duration-150 hover:border-[#EA580C]"
            >
              <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-[#FF7A2F]/60 to-transparent" />
              <div className="flex h-10 w-10 items-center justify-center">{skill.icon}</div>
              <span className="text-center text-sm font-medium text-white whitespace-nowrap">
                {skill.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
