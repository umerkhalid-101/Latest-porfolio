import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';
import { SectionHeader } from './SectionHeader';

// Every fact here comes from LinkedIn. No invented rituals, numbers or schedules.
// Styling follows the rest of the site: #FAFAFA panel, white rounded cards that invert to black on hover.

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
            className="rounded-full bg-[#F2F2F2] group-hover:bg-white/10 text-black group-hover:text-white text-[11px] font-semibold uppercase tracking-wider px-3 py-2 text-center transition-colors duration-300"
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
        className="mx-auto w-px h-4 bg-black/20 group-hover:bg-white/40 origin-top transition-colors"
      />
      <motion.span
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.75, duration: 0.5, ease: EASE }}
        className="rounded-full bg-brand text-white font-display text-[18px] uppercase tracking-tight text-center py-2.5"
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
          className="flex items-center gap-3 rounded-full bg-[#F2F2F2] group-hover:bg-white/10 pl-1.5 pr-4 py-1.5 transition-colors duration-300"
        >
          <span className="flex shrink-0">
            <span className="w-6 h-6 rounded-full bg-black group-hover:bg-white text-white group-hover:text-black text-[10px] font-bold flex items-center justify-center transition-colors">A</span>
            <span className="w-6 h-6 rounded-full bg-brand text-white text-[10px] font-bold flex items-center justify-center -ml-1.5 ring-2 ring-[#F2F2F2] group-hover:ring-transparent">B</span>
          </span>
          <span className="text-[13px] font-semibold text-black group-hover:text-white flex-1 transition-colors">{t.name}</span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#6F6F6F] group-hover:text-white/70 transition-colors">{t.where}</span>
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
        className="absolute left-[5px] top-3 bottom-3 border-l-[1.5px] border-dashed border-black/20 group-hover:border-white/30 origin-top"
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
            className={`relative py-1.5 text-[13px] font-semibold transition-colors text-black group-hover:text-white`}
          >
            <span className={`absolute -left-6 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full ${last ? 'bg-brand' : 'bg-black group-hover:bg-white'} transition-colors`} />
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
    // TODO: Umer to confirm the "three-person design team" wording before deploy.
    body: 'At Hauraki I led a three-person design team and set one direction across four Zewst products, all built on a single shared pattern library.',
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
    <section id="how-i-lead" className="relative z-30 bg-black text-white px-6 md:px-14 py-24 md:py-28 lg:py-0 lg:min-h-[100svh] lg:flex lg:items-center">
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
                className="group relative overflow-hidden bg-white hover:bg-brand rounded-[30px] md:rounded-[40px] p-3 md:p-3.5 shadow-sm transition-colors duration-300 flex flex-col"
              >
                {/* Artifact panel: same height on every card so the row lines up */}
                <div className="rounded-[24px] md:rounded-[30px] bg-[#F4F4F4] group-hover:bg-white/[0.06] h-[200px] lg:h-[clamp(168px,24vh,214px)] px-5 flex items-center justify-center transition-colors duration-300">
                  <div className="w-full max-w-[300px]">{p.artifact}</div>
                </div>

                <div className="relative px-4 md:px-5 pt-5 pb-4 lg:pt-[clamp(14px,2.4vh,22px)] flex-1 flex flex-col">
                  <span aria-hidden="true" className="absolute right-4 md:right-5 top-3 font-display text-[56px] lg:text-[clamp(44px,7vh,64px)] leading-none text-black/[0.07] group-hover:text-white/[0.12] transition-colors">{p.n}</span>
                  <span className="self-start rounded-full border border-black/10 group-hover:border-white/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#6F6F6F] group-hover:text-white/70 transition-colors">
                    {p.where}
                  </span>
                  <h3 className="font-display text-[28px] md:text-[32px] lg:text-[clamp(24px,3.7vh,34px)] leading-[1] uppercase tracking-tight text-black group-hover:text-white mt-3 mb-2.5 transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-[15px] md:text-[16px] lg:text-[clamp(14px,1.9vh,16.5px)] leading-[1.5] text-[#555555] group-hover:text-white/80 transition-colors">
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
