import { AnimatePresence, animate, motion, useInView, useMotionValue, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ChevronsLeftRight, type LucideIcon } from 'lucide-react';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import type { CsImage } from './CaseStudyTemplate';

/*
 * Optional, richer blocks for the case study template: a before/after slider,
 * a scroll-driven story, an auto-scrolling page strip, design tokens, and count-up stats.
 */

export interface BeforeAfterContent {
  title: string;
  intro: ReactNode;
  before: CsImage;
  after: CsImage;
  changes: { title: string; text: string }[];
}

export interface StoryBeat {
  title: string;
  /** What the old design did here, when there was one */
  before?: string;
  now: string;
  image: CsImage;
}

export interface StoryContent {
  title: string;
  intro?: string;
  beats: StoryBeat[];
  /** 'sticky' pins a crossfading screen beside the copy; 'horizontal' slides cards sideways as you scroll */
  layout?: 'sticky' | 'horizontal';
}

export interface ContrastContent {
  title: string;
  intro?: ReactNode;
  /** Column headings, e.g. the category norm and this product */
  them: string;
  us: string;
  rows: { topic: string; them: string; us: string }[];
}

export interface FlowContent {
  title: string;
  intro?: ReactNode;
  steps: { title: string; text: string; icon: LucideIcon }[];
  /** The badge the flow ends on */
  result: { label: string; text: string };
}

export interface ExplorerContent {
  title: string;
  intro?: string;
  url: string;
  tabs: { tag: string; title: string; body: ReactNode; image: CsImage }[];
}

export interface FullPageContent {
  title: string;
  intro?: ReactNode;
  url: string;
  image: CsImage;
}

export interface PagesContent {
  title: string;
  intro?: string;
  pages: { name: string; line: string; image: CsImage }[];
}

export interface TokensContent {
  colors: { name: string; value: string }[];
  type: { name: string; size: string; sample: string }[];
  font: string;
  motion: { name: string; curve: string; use: string }[];
}

export interface StatsContent {
  title: string;
  items: { value: number; unit: string; label: string }[];
}

function Label({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return <span className={`text-xs font-bold uppercase tracking-widest block ${dark ? 'text-white/60' : 'text-[var(--cs-accent)]'}`}>// {children}</span>;
}

/** Drag (or use arrow keys) between the old design and the new one. Sweeps once on first view as a hint. */
export function BeforeAfter({ data, id }: { data: BeforeAfterContent; id: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-25% 0px' });
  const pos = useMotionValue(50);
  const clip = useTransform(pos, (p) => `inset(0 ${100 - p}% 0 0)`);
  const left = useTransform(pos, (p) => `${p}%`);
  const [value, setValue] = useState(50);
  const touched = useRef(false);

  useEffect(() => pos.on('change', (v) => setValue(Math.round(v))), [pos]);

  useEffect(() => {
    if (!inView || reduce || touched.current) return;
    const controls = animate(pos, [50, 18, 82, 50], { duration: 2.6, ease: 'easeInOut', delay: 0.3 });
    return () => controls.stop();
  }, [inView, reduce, pos]);

  const set = (v: number) => {
    touched.current = true;
    pos.stop();
    pos.set(Math.max(0, Math.min(100, v)));
  };

  return (
    <section className="bg-[var(--cs-primary)] text-white py-24 md:py-32 px-6" id={id}>
      <div className="max-w-7xl mx-auto space-y-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="lg:col-span-7 space-y-5">
            <Label dark>Before and after</Label>
            <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight leading-none">{data.title}</h2>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }} className="lg:col-span-5 text-white/75 text-base md:text-lg leading-relaxed">
            {data.intro}
          </motion.div>
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-[16/10] rounded-2xl md:rounded-[28px] overflow-hidden border border-white/15 shadow-2xl select-none touch-pan-y cursor-ew-resize"
          onPointerDown={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            (e.currentTarget as Element).setPointerCapture(e.pointerId);
            set(((e.clientX - r.left) / r.width) * 100);
          }}
          onPointerMove={(e) => {
            if (!(e.currentTarget as Element).hasPointerCapture(e.pointerId)) return;
            const r = e.currentTarget.getBoundingClientRect();
            set(((e.clientX - r.left) / r.width) * 100);
          }}
        >
          <img src={data.after.src} alt={data.after.alt} width={data.after.width} height={data.after.height} loading="lazy" draggable={false} className="absolute inset-0 w-full h-full object-cover" />
          <motion.div className="absolute inset-0" style={{ clipPath: clip }}>
            <img src={data.before.src} alt={data.before.alt} width={data.before.width} height={data.before.height} loading="lazy" draggable={false} className="absolute inset-0 w-full h-full object-cover" />
          </motion.div>
          <span className="absolute top-4 left-4 t-label rounded-full bg-black/60 backdrop-blur px-3 py-1.5">Before</span>
          <span className="absolute top-4 right-4 t-label rounded-full bg-[var(--cs-accent)] px-3 py-1.5">After</span>
          <motion.div className="absolute inset-y-0 w-0.5 bg-white -translate-x-1/2 pointer-events-none" style={{ left }}>
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white text-[#121115] flex items-center justify-center shadow-xl">
              <ChevronsLeftRight size={22} aria-hidden="true" />
            </span>
          </motion.div>
          <input
            type="range"
            min={0}
            max={100}
            value={value}
            onChange={(e) => set(Number(e.target.value))}
            aria-label="Compare before and after"
            className="absolute inset-0 w-full h-full opacity-0 pointer-events-none focus-visible:pointer-events-auto"
          />
        </motion.div>

        <ol className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {data.changes.map((c, i) => (
            <motion.li
              key={c.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="rounded-2xl border border-white/15 bg-white/[0.04] p-6 md:p-7 space-y-3 hover:border-[var(--cs-accent)] transition-colors"
            >
              <span className="t-label text-[var(--cs-soft)] tabular-nums">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="text-xl md:text-2xl font-bold tracking-tight">{c.title}</h3>
              <p className="text-white/70 leading-relaxed">{c.text}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Beat({ beat, index, total, onActive }: { beat: StoryBeat; index: number; total: number; onActive: (i: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-45% 0px -45% 0px' });
  useEffect(() => { if (inView) onActive(index); }, [inView, index, onActive]);

  return (
    <div ref={ref} className="lg:min-h-[70vh] flex flex-col justify-center py-10 lg:py-0">
      <img src={beat.image.src} alt={beat.image.alt} width={beat.image.width} height={beat.image.height} loading="lazy" className="lg:hidden w-full h-auto rounded-2xl shadow-xl mb-8" />
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6 }} className="space-y-5">
        <span className="t-label text-[var(--cs-accent)] tabular-nums">Beat {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
        <h3 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight leading-none">{beat.title}</h3>
        <p className="text-lg md:text-xl leading-relaxed text-[#121115]/85">{beat.now}</p>
        {beat.before && (
          <p className="flex gap-3 text-sm md:text-base text-[#121115]/55 border-t border-[#121115]/10 pt-4">
            <span className="t-label text-[#121115]/45 pt-0.5 shrink-0">Before</span>
            <span>{beat.before}</span>
          </p>
        )}
      </motion.div>
    </div>
  );
}

/** The story in beats: the copy scrolls on the right while the screen beside it crossfades. */
export function StoryBeats({ data, id }: { data: StoryContent; id: string }) {
  const [active, setActive] = useState(0);
  const total = data.beats.length;

  return (
    <section className="bg-white py-24 md:py-32 px-6 border-t border-[#121115]/5" id={id}>
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="max-w-3xl space-y-5 mb-10 lg:mb-0">
          <Label>The story</Label>
          <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight leading-none">{data.title}</h2>
          {data.intro && <p className="text-base md:text-lg text-[#121115]/75 leading-relaxed">{data.intro}</p>}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="hidden lg:block lg:col-span-7">
            <div className="sticky top-[15vh] h-[70vh] flex flex-col justify-center gap-6">
              <div className="relative aspect-[16/10] rounded-[24px] overflow-hidden shadow-2xl bg-[var(--cs-primary)]">
                {data.beats.map((b, i) => (
                  <motion.img
                    key={b.image.src}
                    src={b.image.src}
                    alt={i === active ? b.image.alt : ''}
                    aria-hidden={i !== active}
                    width={b.image.width}
                    height={b.image.height}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={false}
                    animate={{ opacity: i === active ? 1 : 0, scale: i === active ? 1 : 1.04 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  />
                ))}
              </div>
              <div className="flex gap-2" aria-hidden="true">
                {data.beats.map((b, i) => (
                  <span key={b.title} className="h-1 flex-1 rounded-full bg-[#121115]/10 overflow-hidden">
                    <motion.span className="block h-full bg-[var(--cs-accent)] origin-left" initial={false} animate={{ scaleX: i <= active ? 1 : 0 }} transition={{ duration: 0.5 }} />
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="lg:col-span-5">
            {data.beats.map((b, i) => <Beat key={b.title} beat={b} index={i} total={total} onActive={setActive} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

/** The category norm against what this product does instead, row by row */
export function Contrast({ data, id }: { data: ContrastContent; id: string }) {
  return (
    <section className="bg-[var(--cs-primary)] text-white py-24 md:py-32 px-6" id={id}>
      <div className="max-w-7xl mx-auto space-y-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="lg:col-span-7 space-y-5">
            <Label dark>Standing out</Label>
            <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight leading-none">{data.title}</h2>
          </motion.div>
          {data.intro && (
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }} className="lg:col-span-5 text-white/75 text-base md:text-lg leading-relaxed">
              {data.intro}
            </motion.div>
          )}
        </div>

        <div role="table" aria-label={data.title} className="rounded-2xl md:rounded-[28px] border border-white/15 overflow-hidden">
          <div role="row" className="hidden md:grid grid-cols-12 border-b border-white/15 bg-white/[0.04]">
            <span role="columnheader" className="col-span-2 px-6 py-4 t-label text-white/50">Where</span>
            <span role="columnheader" className="col-span-5 px-6 py-4 t-label text-white/50">{data.them}</span>
            <span role="columnheader" className="col-span-5 px-6 py-4 t-label text-[var(--cs-soft)]">{data.us}</span>
          </div>
          {data.rows.map((r, i) => (
            <motion.div
              key={r.topic}
              role="row"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group grid grid-cols-1 md:grid-cols-12 border-b last:border-b-0 border-white/10 hover:bg-white/[0.03] transition-colors"
            >
              <span role="rowheader" className="md:col-span-2 px-6 pt-5 md:py-6 t-label text-white/60">{r.topic}</span>
              <span role="cell" className="md:col-span-5 px-6 py-3 md:py-6 text-white/45 leading-relaxed flex gap-3">
                <span aria-hidden="true" className="shrink-0">✕</span>
                <span><span className="md:hidden t-label text-white/40 block mb-1">{data.them}</span>{r.them}</span>
              </span>
              <span role="cell" className="relative md:col-span-5 px-6 pb-6 pt-1 md:py-6 font-medium leading-relaxed flex gap-3">
                <motion.span
                  aria-hidden="true"
                  className="hidden md:block absolute left-0 top-4 bottom-4 w-0.5 bg-[var(--cs-soft)] origin-top"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                />
                <span aria-hidden="true" className="shrink-0 text-[var(--cs-soft)]">✓</span>
                <span><span className="md:hidden t-label text-[var(--cs-soft)] block mb-1">{data.us}</span>{r.us}</span>
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Steps light up one after another along a line that fills as the section comes into view */
export function Flow({ data, id }: { data: FlowContent; id: string }) {
  const ref = useRef<HTMLOListElement>(null);
  const inView = useInView(ref, { once: true, margin: '-20% 0px' });
  const step = 0.45;

  return (
    <section className="bg-white py-24 md:py-32 px-6 border-t border-[#121115]/5" id={id}>
      <div className="max-w-7xl mx-auto space-y-16">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="max-w-3xl space-y-5">
          <Label>How it works</Label>
          <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight leading-none">{data.title}</h2>
          {data.intro && <div className="text-base md:text-lg text-[#121115]/75 leading-relaxed">{data.intro}</div>}
        </motion.div>

        <ol ref={ref} className="relative grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6">
          {/* The line that fills from step to step */}
          <span aria-hidden="true" className="hidden md:block absolute top-7 left-[12.5%] right-[12.5%] h-0.5 bg-[#121115]/10">
            <motion.span
              className="block h-full bg-[var(--cs-accent)] origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: inView ? 1 : 0 }}
              transition={{ duration: step * (data.steps.length - 1), ease: 'linear', delay: 0.2 }}
            />
          </span>
          {data.steps.map((s, i) => (
            <li key={s.title} className="relative flex md:flex-col md:items-center md:text-center gap-5">
              <motion.span
                className="relative z-10 w-14 h-14 shrink-0 rounded-full flex items-center justify-center border-2"
                initial={{ scale: 0.6, backgroundColor: '#FFFFFF', borderColor: 'rgba(18,17,21,0.15)', color: 'rgba(18,17,21,0.4)' }}
                animate={inView ? { scale: 1, backgroundColor: 'var(--cs-accent)', borderColor: 'var(--cs-accent)', color: '#FFFFFF' } : {}}
                transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.2 + i * step }}
              >
                <s.icon size={24} aria-hidden="true" />
              </motion.span>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * step }}
                className="space-y-2"
              >
                <span className="t-label text-[var(--cs-accent)] tabular-nums">Step {i + 1}</span>
                <h3 className="text-xl font-bold tracking-tight">{s.title}</h3>
                <p className="text-[#121115]/70 leading-relaxed">{s.text}</p>
              </motion.div>
            </li>
          ))}
        </ol>

        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.4 + data.steps.length * step }}
          className="mx-auto max-w-xl flex items-center gap-4 rounded-2xl bg-[var(--cs-primary)] text-white p-5 md:p-6 shadow-2xl"
        >
          <span className="t-label rounded-full bg-[var(--cs-soft)] text-[var(--cs-primary)] px-3 py-1.5 shrink-0">✓ {data.result.label}</span>
          <p className="text-sm md:text-base text-white/85">{data.result.text}</p>
        </motion.div>
      </div>
    </section>
  );
}

/** The story as cards that slide sideways while the section is pinned */
export function HorizontalStory({ data, id }: { data: StoryContent; id: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const n = data.beats.length;
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  // Slide until the last card's right edge meets the screen's right edge
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const measure = () => setDistance(Math.max(0, el.scrollWidth - window.innerWidth + 24));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener('resize', measure);
    return () => { ro.disconnect(); window.removeEventListener('resize', measure); };
  }, []);
  const x = useTransform(scrollYProgress, [0.05, 0.95], [0, -distance]);

  const card = (b: StoryBeat, i: number) => (
    <article key={b.title} className="w-[82vw] md:w-[58vw] lg:w-[46vw] shrink-0 snap-start space-y-5">
      <div className="relative rounded-[20px] overflow-hidden shadow-2xl border border-[#121115]/10 bg-white">
        <img src={b.image.src} alt={b.image.alt} width={b.image.width} height={b.image.height} loading="lazy" className="w-full h-auto" />
        <span className="absolute top-4 left-4 font-display text-5xl md:text-6xl leading-none text-[var(--cs-primary)] bg-white/90 backdrop-blur rounded-xl px-3 pt-2 pb-1 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
      </div>
      <div className="space-y-2 pr-6">
        <h3 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight">{b.title}</h3>
        <p className="text-base md:text-lg text-[#121115]/75 leading-relaxed">{b.now}</p>
      </div>
    </article>
  );

  const header = (
    <div className="max-w-7xl mx-auto w-full px-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div className="space-y-5 max-w-2xl">
        <Label>The story</Label>
        <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight leading-none">{data.title}</h2>
        {data.intro && <p className="text-base md:text-lg text-[#121115]/75 leading-relaxed">{data.intro}</p>}
      </div>
      {!reduce && (
        <div className="hidden lg:flex items-center gap-3 t-label text-[#121115]/50" aria-hidden="true">
          Scroll
          <span className="w-24 h-1 rounded-full bg-[#121115]/10 overflow-hidden">
            <motion.span className="block h-full bg-[var(--cs-accent)] origin-left" style={{ scaleX: scrollYProgress }} />
          </span>
        </div>
      )}
    </div>
  );

  if (reduce) {
    return (
      <section className="bg-[var(--cs-tint)] py-24 space-y-12" id={id}>
        {header}
        <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory px-6 pb-4">{data.beats.map(card)}</div>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative bg-[var(--cs-tint)]" style={{ height: `${n * 70}vh` }} id={id}>
      <div className="sticky top-0 h-svh flex flex-col justify-center gap-10 md:gap-14 overflow-hidden py-16">
        {header}
        <motion.div ref={track} className="flex gap-6 md:gap-10 pl-6 md:pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] w-max" style={{ x }}>
          {data.beats.map(card)}
        </motion.div>
      </div>
    </section>
  );
}

/** Tabs down the side swap the screen beside them, advancing on their own until the visitor picks one */
export function Explorer({ data, id }: { data: ExplorerContent; id: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: '-20% 0px' });
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const playing = auto && inView && !reduce;
  const tab = data.tabs[active];
  const pick = (i: number) => { setAuto(false); setActive(i); };

  return (
    <section ref={ref} className="bg-[#FAF8F5] py-24 md:py-32 px-6 border-t border-[#121115]/5" id={id}>
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="max-w-3xl space-y-5">
          <Label>Explore the platform</Label>
          <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight leading-none">{data.title}</h2>
          {data.intro && <p className="text-base md:text-lg text-[#121115]/75 leading-relaxed">{data.intro}</p>}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div role="tablist" aria-label={data.title} className="lg:col-span-4 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible -mx-6 px-6 lg:mx-0 lg:px-0 pb-2 lg:pb-0">
            {data.tabs.map((t, i) => {
              const on = i === active;
              return (
                <button
                  key={t.title}
                  role="tab"
                  id={`${id}-tab-${i}`}
                  aria-selected={on}
                  aria-controls={`${id}-panel`}
                  onClick={() => pick(i)}
                  className={`relative shrink-0 text-left rounded-2xl px-5 py-4 overflow-hidden transition-colors ${on ? 'bg-[var(--cs-primary)] text-white' : 'bg-white hover:bg-white/60 border border-[#121115]/10'}`}
                >
                  <span className={`t-label block ${on ? 'text-[var(--cs-soft)]' : 'text-[var(--cs-accent)]'}`}>{t.tag}</span>
                  <span className="block text-lg font-bold tracking-tight mt-1 whitespace-nowrap lg:whitespace-normal">{t.title}</span>
                  {on && playing && (
                    <motion.span
                      key={`bar-${active}`}
                      aria-hidden="true"
                      className="absolute left-0 bottom-0 h-1 w-full bg-[var(--cs-soft)] origin-left"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 6, ease: 'linear' }}
                      onAnimationComplete={() => setActive((a) => (a + 1) % data.tabs.length)}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${active}`} className="lg:col-span-8 space-y-6" onPointerEnter={() => setAuto(false)}>
            <div className="rounded-2xl md:rounded-[20px] bg-[var(--cs-primary)] p-1.5 md:p-2 shadow-2xl">
              <div className="flex items-center gap-2 px-2 pb-2 pt-0.5" aria-hidden="true">
                <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
                <span className="ml-3 flex-1 max-w-sm rounded-md bg-white/10 px-3 py-1 text-[11px] text-white/60 truncate">{data.url}/{tab.tag.toLowerCase()}</span>
              </div>
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-white">
                <AnimatePresence initial={false} mode="popLayout">
                  <motion.img
                    key={tab.image.src}
                    src={tab.image.src}
                    alt={tab.image.alt}
                    width={tab.image.width}
                    height={tab.image.height}
                    className="absolute inset-0 w-full h-full object-cover object-top"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -24 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  />
                </AnimatePresence>
              </div>
            </div>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={tab.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-base md:text-lg text-[#121115]/80 leading-relaxed max-w-3xl"
              >
                {tab.body}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

/** A whole page, scrolled inside a browser frame as the visitor scrolls past it */
export function FullPage({ data, id }: { data: FullPageContent; id: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  // Frame is 16:10; scroll the image until its bottom meets the frame's bottom
  const end = -(1 - (10 / 16) / (data.image.height / data.image.width)) * 100;
  const y = useTransform(scrollYProgress, [0.05, 0.95], ['0%', `${end}%`]);
  const progress = useTransform(scrollYProgress, [0.05, 0.95], [0, 1]);

  return (
    <section ref={ref} className={`relative bg-[var(--cs-primary)] text-white px-6 ${reduce ? 'py-24' : 'h-[300vh]'}`} id={id}>
      <div className={`${reduce ? '' : 'sticky top-0 h-svh'} max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center content-center py-20`}>
        <div className="lg:col-span-4 space-y-5">
          <Label dark>The whole page</Label>
          <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight leading-none">{data.title}</h2>
          {data.intro && <div className="text-white/75 text-base md:text-lg leading-relaxed">{data.intro}</div>}
          {!reduce && (
            <div className="hidden lg:block h-1 w-40 rounded-full bg-white/15 overflow-hidden" aria-hidden="true">
              <motion.span className="block h-full bg-[var(--cs-soft)] origin-left" style={{ scaleX: progress }} />
            </div>
          )}
        </div>
        <div className="lg:col-span-8 rounded-2xl md:rounded-[20px] bg-[#1c1f24] p-1.5 md:p-2 shadow-2xl border border-white/10">
          <div className="flex items-center gap-2 px-2 pb-2 pt-0.5" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-3 flex-1 max-w-sm rounded-md bg-white/10 px-3 py-1 text-[11px] text-white/60 truncate">{data.url}</span>
          </div>
          <div className={`relative aspect-[16/10] rounded-xl bg-white ${reduce ? 'overflow-y-auto' : 'overflow-hidden'}`}>
            <motion.img
              src={data.image.src}
              alt={data.image.alt}
              width={data.image.width}
              height={data.image.height}
              loading="lazy"
              className="w-full h-auto block"
              style={reduce ? undefined : { y }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/** Every page of the site on an endless, hover-to-pause strip */
export function PagesStrip({ data, id }: { data: PagesContent; id: string }) {
  const row = [...data.pages, ...data.pages];
  return (
    <section className="bg-[var(--cs-primary)] text-white py-24 md:py-32 overflow-hidden" id={id}>
      <div className="max-w-7xl mx-auto px-6 mb-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
        <div className="lg:col-span-7 space-y-5">
          <Label dark>Every page</Label>
          <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight leading-none">{data.title}</h2>
        </div>
        {data.intro && <p className="lg:col-span-5 text-white/75 text-base md:text-lg leading-relaxed">{data.intro}</p>}
      </div>
      <ul className="sr-only">
        {data.pages.map((p) => <li key={p.name}>{p.name}: {p.line}</li>)}
      </ul>
      <div aria-hidden="true" className="group flex">
        <div className="flex gap-5 pr-5 shrink-0 motion-safe:animate-[cs-scroll_60s_linear_infinite] group-hover:[animation-play-state:paused]">
          {row.map((p, i) => (
            <figure key={`${p.name}-${i}`} className="w-[78vw] sm:w-[420px] md:w-[520px] shrink-0 space-y-4">
              <img src={p.image.src} alt="" width={p.image.width} height={p.image.height} loading="lazy" className="w-full h-auto rounded-2xl border border-white/15 shadow-2xl" />
              <figcaption className="flex items-baseline gap-3">
                <span className="t-label text-[var(--cs-soft)] shrink-0">{p.name}</span>
                <span className="text-sm text-white/65">{p.line}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Colors, type and motion pulled from the product's own tokens */
export function Tokens({ data }: { data: TokensContent }) {
  return (
    <div className="space-y-14">
      <div className="space-y-5">
        <h3 className="t-label">Color</h3>
        <ul className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
          {data.colors.map((c, i) => (
            <motion.li
              key={c.name}
              initial={{ opacity: 0, y: 16, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              className="rounded-2xl bg-white border border-[#121115]/10 p-2 hover:-translate-y-1 transition-transform"
            >
              <span className="block aspect-[4/3] rounded-xl border border-[#121115]/10" style={{ backgroundColor: c.value }} />
              <span className="block text-sm font-semibold mt-2 px-1">{c.name}</span>
              <span className="block text-xs font-mono text-[#121115]/55 px-1 pb-1 uppercase">{c.value}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-5">
          <h3 className="t-label">Type · {data.font}</h3>
          <ul className="rounded-2xl bg-white border border-[#121115]/10 divide-y divide-[#121115]/10">
            {data.type.map((t, i) => (
              <li key={t.name} className="flex items-baseline justify-between gap-4 px-5 py-4">
                <span className="tracking-tight font-semibold truncate" style={{ fontSize: `${Math.max(14, 30 - i * 3)}px` }}>{t.sample}</span>
                <span className="text-xs font-mono text-[#121115]/55 shrink-0 text-right">{t.name}<br />{t.size}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-5">
          <h3 className="t-label">Motion</h3>
          <ul className="rounded-2xl bg-white border border-[#121115]/10 divide-y divide-[#121115]/10">
            {data.motion.map((m, i) => (
              <li key={m.name} className="px-5 py-5 space-y-3">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="font-semibold">{m.name} <span className="font-normal text-[#121115]/60">· {m.use}</span></span>
                  <span className="text-xs font-mono text-[#121115]/55 hidden sm:block">{m.curve}</span>
                </div>
                <div className="relative h-3 rounded-full bg-[#121115]/[0.06]">
                  <span
                    className="absolute top-0 left-0 w-3 h-3 rounded-full bg-[var(--cs-accent)] motion-safe:animate-[cs-travel_2.4s_infinite_alternate]"
                    style={{ animationTimingFunction: m.curve, animationDelay: `${i * 0.2}s` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Count({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [n, setN] = useState(to);
  useEffect(() => {
    if (!inView || reduce) return;
    const c = animate(0, to, { duration: 1.2, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, reduce, to]);
  return <span ref={ref} className="tabular-nums">{n}</span>;
}

export function Stats({ data, id }: { data: StatsContent; id: string }) {
  return (
    <section className="py-24 px-6 bg-[#FAF8F5] border-t border-[#121115]/5" id={id}>
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="space-y-5">
          <Label>Delivery</Label>
          <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight leading-none">{data.title}</h2>
        </div>
        <dl className="grid grid-cols-2 lg:grid-cols-4 border-t border-[#121115]/15">
          {data.items.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="pt-8 pb-4 pr-6 border-b lg:border-b-0 border-[#121115]/10"
            >
              <dd className="font-display uppercase leading-none text-[var(--cs-accent)] text-7xl md:text-8xl">
                <Count to={s.value} /> <span className="text-3xl md:text-4xl text-[#121115]">{s.unit}</span>
              </dd>
              <dt className="mt-4 text-[#121115]/70 leading-relaxed">{s.label}</dt>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export interface ProjectsContent {
  title: string;
  intro?: string;
  items: { name: string; full: string; sector: string; image: CsImage; challenge: string; moves: string[]; tags: string[]; href?: string }[];
}

/** One card per project; each sticks and the next slides over it */
export function Projects({ data, id }: { data: ProjectsContent; id: string }) {
  const total = data.items.length;
  return (
    <section className="bg-[#FAF8F5] py-24 md:py-32 px-6 border-t border-[#121115]/5" id={id}>
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="max-w-3xl space-y-5 mb-14">
          <Label>The projects</Label>
          <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight leading-none">{data.title}</h2>
          {data.intro && <p className="text-base md:text-lg text-[#121115]/75 leading-relaxed">{data.intro}</p>}
        </motion.div>
        <div className="space-y-8 md:space-y-12">
          {data.items.map((p, i) => (
            <div key={p.name} className="lg:sticky" style={{ top: `calc(10vh + ${i * 32}px)` }}>
              <motion.article
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-[24px] md:rounded-[32px] bg-white border border-[#121115]/10 shadow-[0_-12px_40px_-20px_rgba(18,17,21,0.25)] overflow-hidden grid grid-cols-1 lg:grid-cols-12"
              >
                <div className="lg:col-span-5 bg-[var(--cs-primary)] text-white p-6 md:p-10 flex flex-col gap-8 justify-between">
                  <div className="flex items-center justify-between t-label text-white/60">
                    <span className="tabular-nums">{String(i + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
                    <span>{p.sector}</span>
                  </div>
                  <img src={p.image.src} alt={p.image.alt} width={p.image.width} height={p.image.height} loading="lazy" className="w-full h-auto rounded-xl" />
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <h3 className="font-display uppercase text-5xl md:text-6xl leading-none">{p.name}</h3>
                      <p className="mt-2 text-white/70">{p.full}</p>
                    </div>
                    {p.href && (
                      <a href={p.href} target="_blank" rel="noopener noreferrer" className="shrink-0 inline-flex items-center gap-1.5 rounded-full border border-white/30 px-4 py-2.5 t-label hover:bg-white hover:text-[#121115] transition-colors">
                        Visit site <span aria-hidden="true">↗</span><span className="sr-only">(opens in a new tab)</span>
                      </a>
                    )}
                  </div>
                </div>
                <div className="lg:col-span-7 p-6 md:p-10 space-y-8">
                  <div className="space-y-3">
                    <span className="t-label text-[var(--cs-accent)]">The challenge</span>
                    <p className="text-lg md:text-xl leading-relaxed font-medium">{p.challenge}</p>
                  </div>
                  <div className="space-y-3">
                    <span className="t-label text-[var(--cs-accent)]">What I did</span>
                    <ul className="space-y-3">
                      {p.moves.map((m) => (
                        <li key={m} className="flex gap-3 text-[#121115]/80 leading-relaxed">
                          <span aria-hidden="true" className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[var(--cs-accent)] shrink-0" />
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <ul className="flex flex-wrap gap-2 pt-2">
                    {p.tags.map((t) => <li key={t} className="t-label rounded-full border border-[#121115]/15 px-3 py-1.5 text-[#121115]/70">{t}</li>)}
                  </ul>
                </div>
              </motion.article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export interface BilingualContent {
  title: string;
  intro: ReactNode;
  /** Each rule gets a small live illustration */
  rules: { title: string; text: string; demo: 'mirror' | 'length' | 'type' }[];
}

/** A tiny page that flips between left to right and right to left */
function MirrorDemo() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const [rtl, setRtl] = useState(false);
  useEffect(() => {
    if (reduce || !inView) return;
    const t = setInterval(() => setRtl((r) => !r), 2400);
    return () => clearInterval(t);
  }, [reduce, inView]);
  const spring = { type: 'spring' as const, stiffness: 240, damping: 28 };
  return (
    <div ref={ref} className="w-full space-y-3">
      <div dir={rtl ? 'rtl' : 'ltr'} className="w-full rounded-xl bg-white p-3 space-y-3 shadow-sm">
        <motion.div layout transition={spring} className="flex items-center gap-2">
          <motion.span layout transition={spring} className="w-5 h-5 rounded-md bg-[var(--cs-accent)]" />
          <motion.span layout transition={spring} className="h-1.5 w-8 rounded-full bg-[#121115]/20" />
          <motion.span layout transition={spring} className="h-1.5 w-6 rounded-full bg-[#121115]/20" />
          <motion.span layout transition={spring} className="ms-auto h-4 w-8 rounded-full border border-[#121115]/20" />
        </motion.div>
        <motion.span layout transition={spring} className="block h-2.5 w-2/3 rounded-full bg-[#121115]/70" />
        <motion.span layout transition={spring} className="block h-1.5 w-full rounded-full bg-[#121115]/15" />
        <motion.span layout transition={spring} className="block h-1.5 w-4/5 rounded-full bg-[#121115]/15" />
        <motion.div layout transition={spring} className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => <motion.span key={i} layout transition={spring} className={`h-1.5 flex-1 rounded-full ${i === 0 ? 'bg-[var(--cs-accent)]' : 'bg-[#121115]/10'}`} />)}
          <motion.span layout transition={spring} className="ms-2 w-6 h-6 rounded-full bg-[#121115] text-white text-[11px] flex items-center justify-center">{rtl ? '←' : '→'}</motion.span>
        </motion.div>
      </div>
      <p className="text-center text-xs font-mono text-[#121115]/60">{rtl ? 'العربية · RTL' : 'English · LTR'}</p>
    </div>
  );
}

/** The same label in both languages, sharing the width of the longer one */
function LengthDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const pairs = [['Licensing guide', 'دليل الترخيص'], ['Virtual asset rules', 'قواعد الأصول الافتراضية']];
  return (
    <div ref={ref} className="space-y-4 w-full">
      {pairs.map(([en, ar], i) => (
        <div key={en} className="relative grid gap-1.5 w-full">
          <motion.span
            aria-hidden="true"
            className="absolute -inset-1.5 rounded-xl border-2 border-dashed border-[var(--cs-accent)]/60"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.25 }}
          />
          <span className="rounded-lg bg-white px-3 py-2 text-sm font-semibold shadow-sm">{en}</span>
          <span dir="rtl" lang="ar" className="rounded-lg bg-white px-3 py-2 text-sm font-semibold shadow-sm">{ar}</span>
        </div>
      ))}
    </div>
  );
}

/** Latin and Arabic specimens with their line-height guides */
function TypeDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const guide = (top: string, d: number) => (
    <motion.span
      aria-hidden="true"
      className="absolute inset-x-0 h-px bg-[var(--cs-accent)]/60 origin-left"
      style={{ top }}
      initial={{ scaleX: 0 }}
      animate={inView ? { scaleX: 1 } : {}}
      transition={{ duration: 0.6, delay: d }}
    />
  );
  return (
    <div ref={ref} className="grid grid-cols-2 gap-3 w-full">
      <div className="relative rounded-xl bg-white h-28 flex items-center justify-center shadow-sm overflow-hidden">
        {guide('30%', 0.2)}{guide('70%', 0.3)}
        <span className="text-5xl font-semibold leading-none">Aa</span>
        <span className="absolute bottom-1.5 text-[10px] font-mono text-[#121115]/50">Latin</span>
      </div>
      <div className="relative rounded-xl bg-white h-28 flex items-center justify-center shadow-sm overflow-hidden">
        {guide('18%', 0.4)}{guide('82%', 0.5)}
        <span lang="ar" className="text-5xl font-semibold leading-none">أبج</span>
        <span className="absolute bottom-1.5 text-[10px] font-mono text-[#121115]/50">Arabic</span>
      </div>
    </div>
  );
}

/** Bilingual design, explained as a few rules with a live illustration each */
export function Bilingual({ data, id }: { data: BilingualContent; id: string }) {
  const demos = { mirror: <MirrorDemo />, length: <LengthDemo />, type: <TypeDemo /> };
  return (
    <section className="bg-[var(--cs-primary)] text-white py-24 md:py-32 px-6" id={id}>
      <div className="max-w-7xl mx-auto space-y-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="lg:col-span-6 space-y-5">
            <Label dark>Arabic and English</Label>
            <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight leading-none">{data.title}</h2>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }} className="lg:col-span-6 text-white/75 text-base md:text-lg leading-relaxed">
            {data.intro}
          </motion.div>
        </div>
        <ol className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {data.rules.map((r, i) => (
            <motion.li
              key={r.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4 md:p-5 flex flex-col gap-6"
            >
              <div aria-hidden="true" className="rounded-2xl bg-[#F4F2EE] text-[#121115] p-5 min-h-[200px] flex items-center">{demos[r.demo]}</div>
              <div className="space-y-2 px-1 pb-1">
                <span className="t-label text-[var(--cs-soft)] tabular-nums">Rule {String(i + 1).padStart(2, '0')}</span>
                <h3 className="text-xl md:text-2xl font-bold tracking-tight">{r.title}</h3>
                <p className="text-white/70 leading-relaxed">{r.text}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export interface ShowcaseContent {
  label: string;
  title: string;
  /** One line on what the product is */
  summary: string;
  /** Short facts in a row: role, platforms, recognition */
  facts: { label: string; value: string }[];
  /** The product's own accent, used only inside this section */
  color: string;
  link?: { href: string; label: string };
  /** Each chapter: the problem, what I designed, and either one screen or a short sequence of screens */
  chapters: { tag?: string; problem: string; title: string; text: string; image?: CsImage; sequence?: { image: CsImage; caption: string }[] }[];
}

/** Another product, told as a few clear chapters in its own colors */
export function Showcase({ data, id }: { data: ShowcaseContent; id: string }) {
  return (
    <section className="bg-black text-white py-24 md:py-32 px-6" id={id} style={{ '--sc': data.color } as React.CSSProperties}>
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="max-w-3xl space-y-5">
          <span className="text-xs font-bold uppercase tracking-widest block text-[var(--sc)]">// {data.label}</span>
          <h2 className="font-display uppercase text-6xl md:text-8xl leading-none">{data.title}</h2>
          <p className="text-xl md:text-2xl text-white/85 leading-snug">{data.summary}</p>
        </motion.div>

        <motion.dl initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 border-y border-white/15 py-6">
          {data.facts.map((f) => (
            <div key={f.label}>
              <dt className="t-label text-white/50">{f.label}</dt>
              <dd className="t-heading mt-1.5">{f.value}</dd>
            </div>
          ))}
        </motion.dl>

        {data.link && (
          <a href={data.link.href} target="_blank" rel="noopener noreferrer" className="group mt-8 inline-flex items-center gap-3 rounded-full bg-[var(--sc)] text-white pl-5 pr-1.5 py-1.5 t-label hover:bg-white hover:text-black transition-colors">
            {data.link.label}
            <span aria-hidden="true" className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center group-hover:bg-[var(--sc)] group-hover:text-white transition-colors">↗</span>
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        )}

        <ol className="mt-20 md:mt-28 space-y-20 md:space-y-28">
          {data.chapters.map((c, i) => {
            const copy = (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="font-display text-5xl text-[var(--sc)] tabular-nums leading-none">{String(i + 1).padStart(2, '0')}</span>
                  {c.tag && <span className="t-label rounded-full border border-white/20 px-3 py-1.5 text-white/70">{c.tag}</span>}
                </div>
                <p className="t-label text-white/50">{c.problem}</p>
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight leading-tight">{c.title}</h3>
                <p className="text-white/70 leading-relaxed">{c.text}</p>
              </div>
            );
            return (
              <motion.li
                key={c.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                {c.sequence ? (
                  <div className="space-y-10">
                    <div className="max-w-2xl">{copy}</div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
                      {c.sequence.map((sq, n) => (
                        <motion.figure
                          key={sq.image.src}
                          initial={{ opacity: 0, y: 24 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: n * 0.15 }}
                          className="space-y-3"
                        >
                          <img src={sq.image.src} alt={sq.image.alt} width={sq.image.width} height={sq.image.height} loading="lazy" className="w-full h-auto rounded-2xl border border-white/10 bg-white" />
                          <figcaption className="flex gap-3 items-baseline">
                            <span className="t-label text-[var(--sc)] tabular-nums">Step {n + 1}</span>
                            <span className="text-sm text-white/75">{sq.caption}</span>
                          </figcaption>
                        </motion.figure>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                    <div className={`lg:col-span-4 ${i % 2 ? 'lg:order-2' : ''}`}>{copy}</div>
                    {c.image && (
                      <div className={`lg:col-span-8 ${i % 2 ? 'lg:order-1' : ''}`}>
                        <img src={c.image.src} alt={c.image.alt} width={c.image.width} height={c.image.height} loading="lazy" className="w-full h-auto rounded-[20px] md:rounded-[24px] border border-white/10" />
                      </div>
                    )}
                  </div>
                )}
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/** Twelve columns rise, then a page layout snaps onto them */
export function GridDemo({ columns = 12 }: { columns?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });
  const blocks = [
    { col: '1 / -1', h: 'h-10', label: 'Header · 12' },
    { col: '1 / span 8', h: 'h-32 md:h-40', label: 'Content · 8' },
    { col: '9 / span 4', h: 'h-32 md:h-40', label: 'Side · 4' },
    { col: '1 / span 4', h: 'h-20', label: '4' },
    { col: '5 / span 4', h: 'h-20', label: '4' },
    { col: '9 / span 4', h: 'h-20', label: '4' },
  ];
  return (
    <div ref={ref} aria-hidden="true" className="relative rounded-[24px] bg-[#FAF8F5] border border-[#121115]/10 p-4 md:p-6">
      <div className="absolute inset-4 md:inset-6 grid gap-2 md:gap-3" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {Array.from({ length: columns }).map((_, i) => (
          <motion.span
            key={i}
            className="rounded-md bg-[var(--cs-accent)]/15 origin-bottom"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: inView ? 1 : 0 }}
            transition={{ duration: 0.5, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
      </div>
      <div className="relative grid gap-2 md:gap-3" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {blocks.map((b, i) => (
          <motion.div
            key={i}
            style={{ gridColumn: b.col }}
            className={`${b.h} rounded-lg bg-white/55 backdrop-blur-[1px] border border-[var(--cs-accent)]/50 flex items-center justify-center text-[11px] font-mono font-semibold text-[var(--cs-accent)]`}
            initial={{ opacity: 0, y: -16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: 'spring', stiffness: 260, damping: 22, delay: 0.7 + i * 0.12 }}
          >
            {b.label}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export interface HeroCard {
  name: string;
  label: string;
  image: CsImage;
}

/** A fanned deck of project cards; the front card cycles on its own, or on a dot click */
export function HeroCards({ cards }: { cards: HeroCard[] }) {
  const reduce = useReducedMotion();
  const [front, setFront] = useState(0);
  const [auto, setAuto] = useState(true);
  const n = cards.length;

  useEffect(() => {
    if (!auto || reduce) return;
    const t = setInterval(() => setFront((f) => (f + 1) % n), 3000);
    return () => clearInterval(t);
  }, [auto, reduce, n]);

  const current = cards[front];
  return (
    <div className="w-full max-w-[720px]">
      <div className="relative aspect-[16/11] md:aspect-[16/10]">
        {cards.map((c, i) => {
          const depth = (i - front + n) % n;
          return (
            <motion.div
              key={c.name}
              className="absolute left-0 bottom-0 w-[82%] rounded-2xl overflow-hidden shadow-2xl border border-white/10"
              initial={reduce ? false : { opacity: 0, y: 80, rotate: 0 }}
              animate={{
                opacity: depth > 3 ? 0 : 1 - depth * 0.12,
                x: `${depth * 7}%`,
                y: `${-depth * 9}%`,
                rotate: depth * 3,
                scale: 1 - depth * 0.05,
                zIndex: n - depth,
              }}
              transition={{ type: 'spring', stiffness: 120, damping: 20, delay: reduce ? 0 : 0.5 + (n - i) * 0.08 }}
              aria-hidden={depth !== 0}
            >
              <img src={c.image.src} alt={depth === 0 ? c.image.alt : ''} width={c.image.width} height={c.image.height} fetchPriority={i === 0 ? 'high' : undefined} className="w-full aspect-video object-cover select-none" draggable={false} />
            </motion.div>
          );
        })}
      </div>
      <div className="mt-6 flex items-center justify-between gap-4">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p key={current.name} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }} className="min-w-0">
            <span className="t-heading block truncate">{current.name}</span>
            <span className="t-label text-white/60">{current.label}</span>
          </motion.p>
        </AnimatePresence>
        <div className="flex gap-2 shrink-0" role="group" aria-label="Show project">
          {cards.map((c, i) => (
            <button
              key={c.name}
              onClick={() => { setAuto(false); setFront(i); }}
              aria-label={c.name}
              aria-pressed={i === front}
              className={`h-2 rounded-full transition-all ${i === front ? 'w-8 bg-white' : 'w-2 bg-white/35 hover:bg-white/60'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export interface ReelContent {
  title: string;
  intro?: ReactNode;
  src: string;
  poster: string;
  /** Short markers for what the reel covers, shown under it */
  chapters?: string[];
}

/** A muted reel that loads near the viewport, plays in view and pauses out of it */
export function Reel({ data, id }: { data: ReelContent; id: string }) {
  const reduce = useReducedMotion();
  const video = useRef<HTMLVideoElement>(null);
  const near = useInView(video, { once: true, margin: '400px 0px' });
  const inView = useInView(video, { amount: 0.4 });
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [userPaused, setUserPaused] = useState(false);

  useEffect(() => {
    const v = video.current;
    if (!v || !near) return;
    if (inView && !reduce && !userPaused) v.play().catch(() => {});
    else v.pause();
  }, [inView, near, reduce, userPaused]);

  const toggle = () => {
    const v = video.current;
    if (!v) return;
    if (v.paused) { setUserPaused(false); v.play().catch(() => {}); }
    else { setUserPaused(true); v.pause(); }
  };

  return (
    <section className="bg-[var(--cs-primary)] text-white py-24 md:py-32 px-6" id={id}>
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="lg:col-span-7 space-y-5">
            <Label dark>In motion</Label>
            <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight leading-none">{data.title}</h2>
          </motion.div>
          {data.intro && (
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }} className="lg:col-span-5 text-white/75 text-base md:text-lg leading-relaxed">
              {data.intro}
            </motion.div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-[20px] md:rounded-[28px] overflow-hidden border border-white/10 shadow-2xl bg-black"
        >
          <video
            ref={video}
            src={near ? data.src : undefined}
            poster={data.poster}
            muted={muted}
            loop
            playsInline
            preload="none"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            className="w-full aspect-video object-cover"
            aria-label={data.title}
          />
          <div className="absolute left-4 bottom-4 flex gap-2">
            <button onClick={toggle} className="rounded-full bg-black/60 backdrop-blur px-4 py-2 t-label hover:bg-black/80 transition-colors">
              {playing ? 'Pause' : 'Play'}
            </button>
            <button onClick={() => setMuted((m) => !m)} className="rounded-full bg-black/60 backdrop-blur px-4 py-2 t-label hover:bg-black/80 transition-colors">
              {muted ? 'Sound on' : 'Sound off'}
            </button>
          </div>
        </motion.div>

        {data.chapters && (
          <ol className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {data.chapters.map((c, i) => (
              <li key={c} className="rounded-xl border border-white/10 px-4 py-3 text-sm text-white/75">
                <span className="t-label text-[var(--cs-soft)] tabular-nums block mb-1">{String(i + 1).padStart(2, '0')}</span>
                {c}
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}

/** End of a case study: back to the work on the homepage, or straight on to the next one */
export function NextUp({ next, onHome, onOpen }: { next: { slug: string; title: string; tagline: string; image?: CsImage; color: string }; onHome: () => void; onOpen?: (slug: string) => void }) {
  const href = `/${next.slug}-casestudy`;
  const plain = (e: React.MouseEvent) => !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey && e.button === 0;
  return (
    <nav aria-label="More case studies" className="bg-[#FAF8F5] text-[#121115] px-6 py-16 md:py-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-5">
        <a
          href="/#work"
          onClick={(e) => { if (plain(e)) { e.preventDefault(); onHome(); } }}
          className="group lg:col-span-4 rounded-[28px] border border-[#121115]/15 bg-white p-8 flex flex-col justify-between gap-10 hover:border-[#121115] transition-colors"
        >
          <span className="t-label text-[#121115]/60">All work</span>
          <span className="space-y-3">
            <span aria-hidden="true" className="w-12 h-12 rounded-full bg-[#121115] text-white flex items-center justify-center group-hover:-translate-x-1 transition-transform">←</span>
            <span className="block text-3xl md:text-4xl font-extrabold uppercase tracking-tight leading-none">Back to home</span>
            <span className="block text-[#121115]/60">Return to the work section</span>
          </span>
        </a>
        <a
          href={href}
          onClick={(e) => { if (onOpen && plain(e)) { e.preventDefault(); onOpen(next.slug); } }}
          className="group lg:col-span-8 relative overflow-hidden rounded-[28px] text-white p-8 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center min-h-[320px]"
          style={{ backgroundColor: next.color }}
        >
          <span className="space-y-4 relative z-10">
            <span className="t-label text-white/70 block">Next case study</span>
            <span className="block font-display uppercase text-6xl md:text-7xl leading-none">{next.title}</span>
            <span className="block text-white/75 leading-relaxed line-clamp-3">{next.tagline}</span>
            <span className="inline-flex items-center gap-3 t-label pt-2">
              Read it
              <span aria-hidden="true" className="w-10 h-10 rounded-full bg-white text-[#121115] flex items-center justify-center group-hover:rotate-45 transition-transform">↗</span>
            </span>
          </span>
          {next.image && (
            <img src={next.image.src} alt="" width={next.image.width} height={next.image.height} loading="lazy" className="relative w-full h-auto max-h-[260px] object-contain drop-shadow-2xl motion-safe:transition-transform motion-safe:duration-700 group-hover:scale-[1.04] group-hover:-rotate-1" />
          )}
        </a>
      </div>
    </nav>
  );
}
