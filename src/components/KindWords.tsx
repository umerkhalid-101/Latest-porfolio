import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { RevealText } from './RevealText';

// One calm testimonial section: a rotating featured quote and the teams I've designed with.
const quotes = [
  { text: 'He was quick to move, easy to work with, and fully dedicated to shipping our product on time and on scope.', by: 'Head of Product, SaaS startup' },
  { text: 'Umer owned design end to end and made the hard calls. Our loyalty platform shipped faster and tighter because he was in the room.' },
  { text: 'The design system he built gave our engineers a real foundation. Consistent, documented, and easy to extend.' },
  { text: 'Umer brings research rigor most designers skip. He talked to users, mapped the problem, then shipped the right thing.' },
] as { text: string; by?: string }[];

const logos = [
  { name: 'Salams', url: '/images/logo-01.webp' },
  { name: 'Zewst', url: '/images/logo-02.webp' },
  { name: 'Axion Dynamic', url: '/images/logo-03.webp' },
  { name: 'Mailmunch', url: '/images/logo-04.webp' },
  { name: 'Cayano', url: '/images/logo-05.webp' },
  { name: 'Break Thirty', url: '/images/logo-06.webp' },
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
        <div className="flex items-center gap-3 mb-5 md:mb-6">
          <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-black" />
          <span className="text-base md:text-xl font-medium tracking-tight">Kind words</span>
        </div>
        <h2 className="font-display text-[11vw] md:text-[64px] lg:text-[68px] leading-[0.95] uppercase tracking-tighter mb-12 md:mb-16">
          <RevealText text="What it's like" /><br />
          <RevealText text="to work with me." className="text-[#6F6F6F]" delay={0.12} />
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Featured quote */}
          <div
            className="lg:col-span-8 bg-[#FAFAFA] border border-black/5 rounded-[30px] md:rounded-[40px] p-8 md:p-12 flex flex-col"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <span aria-hidden="true" className="font-display text-[#FF6B35] text-[96px] md:text-[128px] leading-[0.6] h-[48px] md:h-[64px]">&ldquo;</span>
            <div className="relative flex-1 min-h-[180px] md:min-h-[220px] mt-6" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={i}
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="text-[24px] md:text-[34px] lg:text-[38px] leading-[1.25] font-medium tracking-tight">{q.text}</p>
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

          {/* Teams */}
          <div className="lg:col-span-4 flex flex-col">
            <p className="text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.2em] text-[#6F6F6F] mb-4">Teams I've designed with</p>
            <ul className="grid grid-cols-3 lg:grid-cols-2 gap-3 flex-1">
              {logos.map((l) => (
                <li key={l.name} className="bg-black rounded-[24px] aspect-square lg:aspect-auto flex items-center justify-center p-5">
                  <img src={l.url} alt={`${l.name} logo`} width={164} height={164} loading="lazy" className="w-full max-w-[110px] opacity-90" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
