import {useState} from 'react';
import {AnimatePresence, motion} from 'motion/react';
import {techStackCategories} from '../data/portfolioData';
import {CodeArrayViewer} from './CodeArrayViewer';
import {HighlightText} from './HighlightText';

export function TechStackSection() {
  const [showCodeArray, setShowCodeArray] = useState(false);

  return (
    <section id="tech-stack" className="mx-auto max-w-6xl px-6 py-20">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-[#FF7A2F]">03. Core Tech Stack</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl [text-wrap:balance]">
            Engineered on{' '}
            <HighlightText variant="marker">Next.js 16 &amp; React 19</HighlightText>
          </h2>
          <p className="mt-3 text-base text-white/75">
            Every layer from React server rendering and Tailwind CSS tokens to Framer Motion transitions and relational databases.
          </p>
        </div>

        <div
          className="inline-flex w-fit items-center gap-1 rounded-lg border border-white/10 bg-[#14100E] p-1"
          role="tablist"
          aria-label="Tech stack view mode"
        >
          <button
            type="button"
            role="tab"
            aria-selected={!showCodeArray}
            onClick={() => setShowCodeArray(false)}
            className={`relative rounded-md px-3.5 py-2 text-xs font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
              !showCodeArray ? 'text-white' : 'text-white/65 hover:text-white'
            }`}
          >
            {!showCodeArray && (
              <motion.span
                layoutId="stack-view-pill"
                transition={{duration: 0.2, ease: [0.16, 1, 0.3, 1]}}
                className="absolute inset-0 rounded-md bg-[#C2410C]"
              />
            )}
            <span className="relative z-10">Matrix View</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={showCodeArray}
            onClick={() => setShowCodeArray(true)}
            className={`relative rounded-md px-3.5 py-2 text-xs font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
              showCodeArray ? 'text-white' : 'text-white/65 hover:text-white'
            }`}
          >
            {showCodeArray && (
              <motion.span
                layoutId="stack-view-pill"
                transition={{duration: 0.2, ease: [0.16, 1, 0.3, 1]}}
                className="absolute inset-0 rounded-md bg-[#C2410C]"
              />
            )}
            <span className="relative z-10">Array Code</span>
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!showCodeArray ? (
          <motion.div
            key="stack-matrix"
            initial={{opacity: 0, y: 10}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: -8}}
            transition={{duration: 0.22, ease: [0.16, 1, 0.3, 1]}}
            className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3"
          >
            {techStackCategories.map((category) => (
              <div
                key={category.id}
                className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#14100E] p-7"
              >
                <div>
                  <h3 className="text-xl font-bold text-white">{category.domain}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">{category.summary}</p>

                  <div className="mt-6 divide-y divide-white/10 border-t border-white/10">
                    {category.tools.map((tool) => (
                      <div key={tool.name} className="py-3.5">
                        <div className="flex items-baseline justify-between gap-2">
                          <span className="font-semibold text-white">{tool.name}</span>
                          <span className="font-mono text-xs text-[#FF7A2F] tabular-nums">
                            {tool.version}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-white/65">{tool.focus}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="stack-code"
            initial={{opacity: 0, y: 10}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: -8}}
            transition={{duration: 0.22, ease: [0.16, 1, 0.3, 1]}}
            className="mt-10"
          >
            <CodeArrayViewer
              variableName="techStack"
              typeName="TechStackCategory"
              fileName="src/data/techStack.ts"
              items={techStackCategories}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
