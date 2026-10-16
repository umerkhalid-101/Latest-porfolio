import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';
import { SectionHeader } from './SectionHeader';

// Every fact here comes from LinkedIn. No invented rituals, numbers or schedules.
// White cards on ink that invert to ink-soft on hover.

const EASE = [0.16, 1, 0.3, 1] as const;

/** Four Zewst products merging into one pattern library */
function LibraryArtifact() {
  const products = ['Zewst POS', 'Portfolio', 'Zewst Phone', 'Zewards'];
  return (
    <div aria-hidden="true" className="flex flex-col gap-2">
      <div className="grid grid-cols-2 gap-2">
        {products.map((p, i) => (
          <motion.span
            key={p}
            initial={{ opacity: 0, y: -8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.08, duration: 0.5, ease: EASE }}
            className="rounded-full bg-paper group-hover:bg-white/10 text-ink group-hover:text-white t-label px-3 py-2 text-center transition-colors duration-300"
          >
            {p}
          </motion.span>
        ))}
      </div>
      <motion.span
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.35, ease: EASE }}
        className="mx-auto w-px h-4 bg-line group-hover:bg-white/40 origin-top transition-colors"
      />
      <motion.span
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.75, duration: 0.5, ease: EASE }}
        className="rounded-full bg-ink group-hover:bg-white text-white group-hover:text-ink t-label text-center py-3 transition-colors"
      >
        1 pattern library
      </motion.span>
    </div>
  );
}

/** The A/B tests actually run at Salams and Unita */
function TestsArtifact() {
  const tests = [
    { name: 'Pricing models', where: 'Salams' },
    { name: 'Ghost mode', where: 'Salams' },
    { name: 'Voice telegrams', where: 'Salams' },
    { name: 'Pricing + offerings', where: 'Unita' },
  ];
  return (
    <ul aria-hidden="true" className="flex flex-col gap-1.5">
      {tests.map((t, i) => (
        <motion.li
          key={t.name}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 + i * 0.08, duration: 0.45, ease: EASE }}
          className="flex items-center gap-3 rounded-full bg-paper group-hover:bg-white/10 pl-1.5 pr-4 py-1.5 transition-colors duration-300"
        >
          <span className="flex shrink-0">
            <span className="w-6 h-6 rounded-full bg-ink group-hover:bg-white text-white group-hover:text-ink t-label flex items-center justify-center transition-colors">A</span>
            <span className="w-6 h-6 rounded-full bg-accent text-ink t-label flex items-center justify-center -ml-1.5 ring-2 ring-paper group-hover:ring-transparent">B</span>
          </span>
          <span className="t-body-s font-semibold text-ink group-hover:text-white flex-1 transition-colors">{t.name}</span>
          <span className="t-label text-muted group-hover:text-muted-dark transition-colors">{t.where}</span>
        </motion.li>
      ))}
    </ul>
  );
}

/** Jobbit's path from discovery to shipped */
function ShipArtifact() {
  const steps = ['Stakeholder interviews', 'User flows', 'Rapid prototypes', 'Build with engineering', 'Shipped as scoped'];
  return (
    <ol aria-hidden="true" className="relative pl-6">
      <motion.span
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.9, ease: EASE }}
        className="absolute left-[5px] top-3 bottom-3 border-l-2 border-dashed border-line group-hover:border-white/30 origin-top"
      />
      {steps.map((s, i) => {
        const last = i === steps.length - 1;
        return (
          <motion.li
            key={s}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 + i * 0.15, duration: 0.3 }}
            className="relative py-1.5 t-body-s font-semibold transition-colors text-ink group-hover:text-white"
          >
            <span className={`absolute -left-6 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full ${last ? 'bg-accent' : 'bg-ink group-hover:bg-white'} transition-colors`} />
            {s}
          </motion.li>
        );
      })}
    </ol>
  );
}

const practices: { n: string; title: string; body: string; where: string; artifact: ReactNode }[] = [
  {
    n: '01',
    title: 'One library, four products',
    body: 'At Hauraki I led the design team and set one direction across four Zewst products, all built on a single shared pattern library.',
    where: 'Hauraki · Design Manager',
    artifact: <LibraryArtifact />,
  },
  {
    n: '02',
    title: "Test it, don't argue it",
    body: 'At Salams and Unita, A/B tests with the founders settled pricing and feature calls, not opinions in a meeting.',
    where: 'Salams · Unita',
    artifact: <TestsArtifact />,
  },
  {
    n: '03',
    title: 'In the room until it ships',
    body: 'On Jobbit I ran discovery up front, then stayed with engineering through build until it shipped as scoped.',
    where: 'Axion Dynamic · Team Lead',
    artifact: <ShipArtifact />,
  },
];

export function HowILead() {
  const reduce = useReducedMotion();

  return (
    <section id="how-i-lead" className="relative z-30 bg-ink text-white px-6 md:px-14 py-16 md:py-24 lg:py-0 lg:min-h-[100svh] lg:flex lg:items-center">
      <div className="max-w-[1400px] w-full mx-auto lg:pt-[88px] lg:pb-10">
        <div>
          <SectionHeader
            dark
            label="How I lead"
            title="Three habits"
            muted="I bring to every team."
            note="Each one comes from a real team, with the company it happened at."
          />

          <ol className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-6">
            {practices.map((p, i) => (
              <motion.li
                key={p.n}
                initial={reduce ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.12, duration: 0.8, ease: EASE }}
                className="group relative overflow-hidden bg-white hover:bg-ink-soft rounded-3xl md:rounded-[40px] p-3 md:p-3.5 transition-colors duration-300 flex flex-col"
              >
                {/* Artifact panel: same height on every card so the row lines up */}
                <div className="rounded-[24px] md:rounded-[30px] bg-paper group-hover:bg-white/5 h-[160px] lg:h-[clamp(168px,24vh,214px)] px-5 flex items-center justify-center transition-colors duration-300">
                  <div className="w-full max-w-[300px]">{p.artifact}</div>
                </div>

                <div className="relative px-4 md:px-5 pt-4 pb-3 lg:pt-[clamp(14px,2.4vh,22px)] flex-1 flex flex-col">
                  <span aria-hidden="true" className="absolute right-4 md:right-5 top-3 t-display-l text-ink/10 group-hover:text-white/10 transition-colors">{p.n}</span>
                  <span className="self-start rounded-full border border-line group-hover:border-line-dark px-3 py-1 t-label text-muted group-hover:text-muted-dark transition-colors">
                    {p.where}
                  </span>
                  <h3 className="t-display-m text-ink group-hover:text-white mt-3 mb-2.5 transition-colors">
                    {p.title}
                  </h3>
                  <p className="t-body text-muted group-hover:text-muted-dark transition-colors">
                    {p.body}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
