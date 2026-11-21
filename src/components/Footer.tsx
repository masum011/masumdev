import {developerProfile} from '../data/portfolioData';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[#080605]">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-6 py-8 sm:flex-row sm:items-center">
        <p className="text-sm text-white/65">
          © {year} {developerProfile.name}. Built with Next.js 16, React 19, Tailwind CSS &amp; Framer Motion.
        </p>

        <div className="flex items-center gap-6 text-sm font-medium text-white/75">
          <a
            href={developerProfile.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-[#FF7A2F] whitespace-nowrap"
          >
            GitHub
          </a>
          <a
            href={developerProfile.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-[#FF7A2F] whitespace-nowrap"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${developerProfile.email}`}
            className="transition-colors hover:text-[#FF7A2F] whitespace-nowrap"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
