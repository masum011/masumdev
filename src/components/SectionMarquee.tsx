const marqueeItems = [
  'Next.js 16 App Router',
  'React 19 Server Components',
  'Tailwind CSS 4',
  'Framer Motion 12',
  'TypeScript',
  'Node.js & Express',
  'PostgreSQL',
  'Distributed Edge Architecture',
];

export function SectionMarquee() {
  return (
    <div className="overflow-hidden border-y border-white/10 bg-[#120E0C] py-3.5" aria-hidden="true">
      <div className="flex w-max animate-marquee items-center gap-6 whitespace-nowrap">
        {[...marqueeItems, ...marqueeItems].map((item, index) => (
          <div key={`${item}-${index}`} className="flex items-center gap-6 text-sm font-medium text-white/75">
            <span>{item}</span>
            <span className="text-[#FF7A2F]">·</span>
          </div>
        ))}
      </div>
    </div>
  );
}
