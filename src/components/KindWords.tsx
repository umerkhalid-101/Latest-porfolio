import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { SectionHeader } from './SectionHeader';

// One calm testimonial section: a rotating featured quote and the teams I've designed with.
const quotes = [
  { text: 'He was quick to move, easy to work with, and fully dedicated to shipping our product on time and on scope.', by: 'Head of Product, SaaS startup' },
  { text: 'Umer owned design end to end and made the hard calls. Our loyalty platform shipped faster and tighter because he was in the room.' },
  { text: 'The design system he built gave our engineers a real foundation. Consistent, documented, and easy to extend.' },
  { text: 'Umer brings research rigor most designers skip. He talked to users, mapped the problem, then shipped the right thing.' },
] as { text: string; by?: string }[];

const logos = [
  { name: 'Salams', url: '/images/team-01.webp' },
  { name: 'Zwilt', url: '/images/team-02.webp' },
  { name: 'Axion Dynamic', url: '/images/team-03.webp' },
  { name: 'Mailmunch', url: '/images/team-04.webp' },
  { name: 'Cayano', url: '/images/team-05.webp' },
  { name: 'Break Thirty', url: '/images/team-06.webp' },
];

const CYCLE_MS = 6500;

export function KindWords() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const playing = inView && !paused && !reduce;

  useEffect(() => {
    if (!playing) return;
    const id = setTimeout(() => setI((n) => (n + 1) % quotes.length), CYCLE_MS);
    return () => clearTimeout(id);
  }, [i, playing]);

  const q = quotes[i];

  return (
    <section id="kind-words" className="relative bg-white text-black px-6 md:px-14 py-24 md:py-32">
      <div ref={ref} className="max-w-[1400px] mx-auto">
        <SectionHeader label="Kind words" title="What it's like" muted="to work with me." />

        {/* Featured quote, full width */}
        <div
          className="bg-[#FAFAFA] border border-black/5 rounded-[30px] md:rounded-[40px] p-8 md:p-12 lg:p-14 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <span aria-hidden="true" className="lg:col-span-1 font-display text-brand text-[96px] md:text-[128px] leading-[0.75]">&ldquo;</span>
          <div className="lg:col-span-11 flex flex-col">
            <div className="relative min-h-[170px] md:min-h-[200px]" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={i}
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="text-[24px] md:text-[36px] lg:text-[44px] leading-[1.2] font-medium tracking-tight max-w-[1000px]">{q.text}</p>
                  {q.by && <footer className="mt-6 text-[13px] font-semibold uppercase tracking-[0.2em] text-[#6F6F6F]">{q.by}</footer>}
                </motion.blockquote>
              </AnimatePresence>
            </div>

            {/* Pager */}
            <div className="flex items-center gap-2 mt-8" role="tablist" aria-label="Choose a quote">
              {quotes.map((_, n) => (
                <button
                  key={n}
                  type="button"
                  role="tab"
                  aria-selected={n === i}
                  aria-label={`Quote ${n + 1} of ${quotes.length}`}
                  onClick={() => { setPaused(true); setI(n); }}
                  className="relative h-2 rounded-full overflow-hidden bg-black/10 transition-all duration-300"
                  style={{ width: n === i ? 48 : 12 }}
                >
                  {n === i && (
                    <motion.span
                      key={`${i}-${playing}`}
                      className="absolute inset-y-0 left-0 bg-black"
                      initial={{ width: playing ? '0%' : '100%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: playing ? CYCLE_MS / 1000 : 0, ease: 'linear' }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Teams: one quiet row of marks on the page itself */}
        <div className="mt-12 md:mt-16">
          <p className="text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.2em] text-[#6F6F6F] mb-5">Teams I've designed with</p>
          <ul className="grid grid-cols-3 md:grid-cols-6 border-t border-l border-black/10">
            {logos.map((l, n) => (
              <motion.li
                key={l.name}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: n * 0.06, duration: 0.5 }}
                className="group border-r border-b border-black/10 h-[96px] md:h-[120px] flex items-center justify-center px-5"
              >
                <img
                  src={l.url}
                  alt={`${l.name} logo`}
                  width={240}
                  height={72}
                  loading="lazy"
                  className="max-h-[34px] md:max-h-[40px] w-auto max-w-full opacity-45 group-hover:opacity-100 transition-opacity duration-300"
                />
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
