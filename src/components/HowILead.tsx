import { animate, motion, useInView, useMotionValueEvent, useScroll, useTransform, type MotionValue } from 'motion/react';
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { RevealText } from './RevealText';

const cards = [
  {
    id: '01',
    title: 'Team leadership',
    body: 'Managed teams of 2 to 3 designers as Design Manager at Hauraki and Product Team Lead at Axion Dynamic. I run critiques and design reviews, mentor designers, set the quality bar, and give input on hiring.',
    tags: ['Critique', 'Mentoring', 'Hiring input', 'Quality bar'],
    className: 'bg-[#FF6B35] text-black'
  },
  {
    id: '02',
    title: 'Design direction',
    body: 'Built design systems from scratch at three companies and owned product-level design decisions, including direction across the four-product Zewst ecosystem.',
    tags: ['Design systems', 'Product vision', 'Standards'],
    className: 'bg-[#DFFF2B] text-black'
  },
  {
    id: '03',
    title: 'Partnership',
    body: 'I work in the room with founders, PMs, and engineering leads to decide what to build, what to test, and what to launch first, then stay close to engineering until it ships as scoped.',
    tags: ['Founders', 'Product', 'Engineering', 'Experiments'],
    className: 'bg-[#E5E1DA] text-black'
  }
];

const steps = [
  { title: 'Discover', body: 'Talk to users and stakeholders to find the real problem and what it is worth to the business.' },
  { title: 'Architect', body: 'Shape the information model, flows, and scope with product and engineering before any pixels.' },
  { title: 'Design', body: 'Prototype, test with users, and build on a shared design system so the team moves fast.' },
  { title: 'Ship and learn', body: 'Stay close to engineering through release, then measure and feed results into the roadmap.' }
];

const outcomes: { value: number | string; prefix?: string; suffix?: string; context: string }[] = [
  { value: 'Acquired', context: 'Salams, through the Match Group acquisition' },
  { value: 500, suffix: '+', context: 'Merchants on Zewst POS' },
  { value: 38, prefix: '+', suffix: '%', context: 'Repeat visits on Zewards' },
  { value: 18, prefix: '−', suffix: '%', context: 'Account-linking drop-offs at Truebill' }
];

function CountUp({ value, prefix = '', suffix = '' }: { value: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, { duration: 1.6, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setN(Math.round(v)) });
    return () => controls.stop();
  }, [inView, value]);
  return <span ref={ref}>{prefix}{n}{suffix}</span>;
}

function StackCard({ i, total, progress, className, children }: { i: number; total: number; progress: MotionValue<number>; className: string; children: ReactNode }) {
  // Earlier cards shrink slightly as later ones stack on top of them
  const scale = useTransform(progress, [i / total, 1], [1, 1 - (total - 1 - i) * 0.04]);
  const [stacked, setStacked] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const update = () => setStacked(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return (
    <div className="relative md:sticky md:top-[var(--stack-top)] md:h-[100svh] flex items-center justify-center px-4 md:px-10 mb-4 md:mb-0" style={{ '--stack-top': `${i * 24}px` } as CSSProperties}>
      <motion.article
        style={stacked ? { scale } : undefined}
        className={`relative w-full max-w-[1300px] md:min-h-[72vh] rounded-[30px] md:rounded-[50px] p-7 md:p-16 flex flex-col justify-between origin-top shadow-[0_-20px_60px_rgba(0,0,0,0.35)] ${className}`}
      >
        {children}
      </motion.article>
    </div>
  );
}

export function HowILead() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });
  const total = cards.length + 2;
  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, 'change', (v) => setActive(Math.min(total - 1, Math.floor(v * total))));

  return (
    <section id="how-i-lead" className="relative z-30 bg-black text-white pb-16">
      <div className="max-w-[1300px] mx-auto px-6 md:px-10 pt-24 md:pt-40 pb-8 md:pb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <h2 className="font-display text-[18vw] md:text-[180px] leading-[0.85] uppercase tracking-tighter">
          <RevealText text="How I" /><br /><RevealText text="lead" className="text-[#FF6B35]" delay={0.1} />
        </h2>
        <p className="text-[15px] md:text-[18px] leading-[1.6] text-white/80 max-w-[380px] md:pb-6">
          Direction, people, and the decisions in between. Here's what I bring to a design team, and how I work day to day.
        </p>
      </div>

      <div ref={containerRef} className="relative">
        {/* Progress rail */}
        <div className="hidden md:flex sticky top-1/2 z-20 h-0 justify-end pr-3 pointer-events-none" aria-hidden="true">
          <div className="flex flex-col gap-2 -translate-y-1/2">
            {Array.from({ length: total }).map((_, i) => (
              <span key={i} className={`block w-1.5 rounded-full transition-all duration-500 ${i === active ? 'h-8 bg-white' : 'h-1.5 bg-white/40'}`} />
            ))}
          </div>
        </div>

        {cards.map((card, i) => (
          <StackCard key={card.id} i={i} total={total} progress={scrollYProgress} className={card.className}>
            <div className="flex justify-between items-start gap-6">
              <span className="font-display text-[64px] md:text-[200px] leading-[0.8] tracking-tighter" aria-hidden="true">{card.id}</span>
              <ul className="hidden md:flex flex-wrap justify-end gap-2 max-w-[420px]">
                {card.tags.map((t) => (
                  <li key={t} className="px-4 py-2 rounded-full border border-current text-[12px] font-semibold uppercase tracking-widest">{t}</li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-16 items-end mt-6 md:mt-10">
              <h3 className="font-display text-5xl md:text-[110px] leading-[0.9] uppercase tracking-tighter">{card.title}</h3>
              <p className="text-[16px] md:text-[21px] leading-[1.55] font-medium">{card.body}</p>
            </div>
          </StackCard>
        ))}

        <StackCard i={cards.length} total={total} progress={scrollYProgress} className="bg-white text-black">
          <div className="flex justify-between items-start gap-6">
            <span className="font-display text-[64px] md:text-[200px] leading-[0.8] tracking-tighter" aria-hidden="true">04</span>
            <h3 className="font-display text-5xl md:text-[110px] leading-[0.9] uppercase tracking-tighter text-right">How I work</h3>
          </div>
          <ol className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-x-6 gap-y-6 md:gap-x-10 mt-10">
            {steps.map((step, i) => (
              <li key={step.title} className="border-t border-black/20 pt-5">
                <p className="text-[12px] font-semibold uppercase tracking-widest text-black/60 mb-2">Step {i + 1}</p>
                <p className="text-[20px] md:text-[26px] font-bold leading-tight mb-2">{step.title}</p>
                <p className="text-[14px] md:text-[16px] leading-[1.55] text-black/80">{step.body}</p>
              </li>
            ))}
          </ol>
        </StackCard>

        <StackCard i={cards.length + 1} total={total} progress={scrollYProgress} className="bg-[#141414] text-white border border-white/10">
          <div className="flex justify-between items-start gap-6">
            <span className="font-display text-[64px] md:text-[200px] leading-[0.8] tracking-tighter text-[#FF6B35]" aria-hidden="true">05</span>
            <h3 className="font-display text-5xl md:text-[110px] leading-[0.9] uppercase tracking-tighter text-right">Outcomes</h3>
          </div>
          <ul className="grid grid-cols-2 xl:grid-cols-4 gap-x-6 gap-y-8 md:gap-x-10 mt-10">
            {outcomes.map((o) => (
              <li key={o.context} className="border-t border-white/20 pt-5">
                <p className="font-display text-4xl md:text-6xl xl:text-7xl leading-none mb-3 text-[#FF6B35] whitespace-nowrap">
                  {typeof o.value === 'number' ? <CountUp value={o.value} prefix={o.prefix} suffix={o.suffix} /> : o.value}
                </p>
                <p className="text-[13px] md:text-[15px] leading-[1.5] text-white/85">{o.context}</p>
              </li>
            ))}
          </ul>
        </StackCard>
      </div>
    </section>
  );
}
