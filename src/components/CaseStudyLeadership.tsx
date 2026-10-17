import { AnimatePresence, motion } from 'motion/react';
import { useState, type ReactNode } from 'react';

/**
 * Content still to be written by Umer. Shown as a visible placeholder in dev,
 * and hidden in production so unfinished copy never ships.
 */
export type Pending = { pending: string };
export type Content = ReactNode | Pending;

const isPending = (c: Content): c is Pending =>
  typeof c === 'object' && c !== null && 'pending' in (c as object);

export interface LeadershipContent {
  roleAndTeam: Content;
  bet: Content;
  hardCall: Content;
  howILed: Content;
  howILedTitle?: string;
  outcome: Content;
  differently: Content;
}

function Placeholder({ text }: { text: string }) {
  return (
    <div className="border-2 border-dashed border-white/40 rounded-2xl p-5">
      <p className="t-label text-white/70 mb-2">Placeholder, hidden in production</p>
      <p className="t-body-s text-white/80">{text}</p>
    </div>
  );
}

/**
 * "Behind the work": the bet as one big statement, then an index of the story
 * (role, how I led, the hard call, outcome) that swaps the panel beside it.
 */
export function CaseStudyLeadership({ content }: { content: LeadershipContent; accent?: string }) {
  const show = (c: Content) => import.meta.env.DEV || !isPending(c);
  const items = ([
    ['My role and team', content.roleAndTeam],
    [content.howILedTitle ?? 'How I led the work', content.howILed],
    ['The hard call', content.hardCall],
    ['The outcome', content.outcome],
    ["What I'd do differently", content.differently],
  ] as [string, Content][]).filter(([, c]) => show(c));
  const [active, setActive] = useState(0);
  if (items.length === 0 && !show(content.bet)) return null;
  const current = items[Math.min(active, items.length - 1)];

  return (
    <section className="bg-[var(--cs-primary)] text-white py-20 md:py-28 px-6 md:px-14" id="leadership">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center gap-3 mb-5">
          <span className="w-2.5 h-2.5 rounded-full bg-white" aria-hidden="true" />
          <span className="t-label">Behind the work</span>
        </div>
        <h2 className="t-display-l">How I led it.</h2>

        {/* The bet, as one statement */}
        {show(content.bet) && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-12 border-t border-white/20 pt-8"
          >
            <p className="lg:col-span-3 t-label text-white/65">The bet</p>
            <div className="lg:col-span-9 text-xl md:text-2xl lg:text-3xl leading-snug font-medium tracking-tight [&_p]:max-w-none">
              {isPending(content.bet) ? <Placeholder text={content.bet.pending} /> : content.bet}
            </div>
          </motion.div>
        )}

        {/* The story, as an index and a panel */}
        {current && (
          <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
            <ol className="lg:col-span-5 border-t border-white/20" role="tablist" aria-label="Leadership story">
              {items.map(([title], i) => {
                const on = items[i] === current;
                return (
                  <li key={title} className="border-b border-white/20">
                    <button
                      type="button"
                      role="tab"
                      aria-selected={on}
                      onClick={() => setActive(i)}
                      onPointerEnter={(e) => { if (e.pointerType === 'mouse') setActive(i); }}
                      className="group w-full flex items-baseline gap-5 py-4 md:py-5 text-left"
                    >
                      <span className={`t-label tabular-nums transition-colors ${on ? 'text-white' : 'text-white/45'}`}>{String(i + 1).padStart(2, '0')}</span>
                      <span className={`t-display-m transition-[color,transform] duration-300 ${on ? 'text-white translate-x-2' : 'text-white/40 group-hover:text-white/70'}`}>{title}</span>
                    </button>
                  </li>
                );
              })}
            </ol>

            <div className="lg:col-span-7 lg:sticky lg:top-28" role="tabpanel" aria-live="polite">
              <div className="relative rounded-3xl bg-white/[0.07] border border-white/15 p-6 md:p-10 min-h-[260px] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current[0]}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <p className="t-label text-white/65 mb-4">{current[0]}</p>
                    <div className="t-body-l text-white/90 space-y-4 [&_p]:max-w-none [&_ul]:space-y-3 [&_li]:relative [&_li]:pl-6 [&_li]:before:content-[''] [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-[0.7em] [&_li]:before:w-2.5 [&_li]:before:h-px [&_li]:before:bg-white/70">
                      {isPending(current[1]) ? <Placeholder text={current[1].pending} /> : current[1]}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
