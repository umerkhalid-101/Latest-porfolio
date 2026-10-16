import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { SectionHeader } from './SectionHeader';

import { Linkedin } from 'lucide-react';
import { namedTestimonials, type Testimonial } from '../data/testimonials';

// Only named, approved quotes are shown.
type Slide = { quote: string; by?: string; person?: Testimonial };
const slides: Slide[] = namedTestimonials.map((t) => ({ quote: t.quote, person: t }));

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
    const id = setTimeout(() => setI((n) => (n + 1) % slides.length), CYCLE_MS);
    return () => clearTimeout(id);
  }, [i, playing]);

  const q = slides[i];

  return (
    <section id="kind-words" className="relative bg-white text-ink px-6 md:px-14 py-16 md:py-24">
      <div ref={ref} className="max-w-[1400px] mx-auto">
        <SectionHeader label="Kind words" title="What it's like" muted="to work with me." />

        {/* Featured quote, full width */}
        <div
          className="bg-paper rounded-3xl md:rounded-[40px] p-6 md:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <span aria-hidden="true" className="lg:col-span-1 t-display-xl text-accent">&ldquo;</span>
          <div className="lg:col-span-11 flex flex-col">
            <div className="relative min-h-[120px] md:min-h-[120px]" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={i}
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="t-body-l !max-w-none text-ink">{q.quote}</p>
                  {q.person ? (
                    <footer className="mt-6 flex items-center gap-4">
                      {q.person.photo && <img src={q.person.photo} alt="" width={48} height={48} className="w-12 h-12 rounded-full object-cover" />}
                      <div>
                        <p className="t-heading">{q.person.name}</p>
                        <p className="t-body-s text-muted">{[q.person.title, q.person.company].filter(Boolean).join(', ')}</p>
                      </div>
                      {q.person.linkedinUrl && (
                        <a href={q.person.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label={`${q.person.name} on LinkedIn`} className="ml-2"><Linkedin size={18} aria-hidden="true" /></a>
                      )}
                    </footer>
                  ) : q.by && <footer className="mt-6 t-label text-muted">{q.by}</footer>}
                </motion.blockquote>
              </AnimatePresence>
            </div>

            {/* Pager */}
            <div className="flex items-center gap-2 mt-8" role="tablist" aria-label="Choose a quote">
              {slides.map((_, n) => (
                <button
                  key={n}
                  type="button"
                  role="tab"
                  aria-selected={n === i}
                  aria-label={`Quote ${n + 1} of ${slides.length}`}
                  onClick={() => { setPaused(true); setI(n); }}
                  className="relative h-2 rounded-full overflow-hidden bg-ink/10 transition-all duration-300"
                  style={{ width: n === i ? 48 : 12 }}
                >
                  {n === i && (
                    <motion.span
                      key={`${i}-${playing}`}
                      className="absolute inset-y-0 left-0 bg-ink"
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
        <div className="mt-10 md:mt-12">
          <p className="t-label text-muted mb-5">Teams I've designed with</p>
          <ul className="grid grid-cols-3 md:grid-cols-6 border-t border-l border-line">
            {logos.map((l, n) => (
              <motion.li
                key={l.name}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: n * 0.06, duration: 0.5 }}
                className="group border-r border-b border-line h-20 md:h-24 flex items-center justify-center px-5"
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
