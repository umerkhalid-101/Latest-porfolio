import { motion } from 'motion/react';

const pillars = [
  {
    id: '01',
    title: 'Team leadership',
    body: 'Managed teams of 2 to 3 designers as Design Manager at Hauraki and Product Team Lead at Axion Dynamic. Ran critiques and design reviews, mentored designers, set the quality bar, and gave input on hiring.'
  },
  {
    id: '02',
    title: 'Design direction',
    body: 'Built design systems from scratch at three companies and owned product-level design decisions, including direction across the four-product Zewst ecosystem.'
  },
  {
    id: '03',
    title: 'Partnership',
    body: 'Work directly with founders, PMs, and engineering leads to decide what to build, what to test, and what to launch first, then stay close to engineering until it ships as scoped.'
  }
];

const outcomes = [
  { metric: 'Acquired', context: 'Salams, led design through the Match Group acquisition' },
  { metric: '500+', context: 'Merchants on Zewst POS at Hauraki' },
  { metric: '+38%', context: 'Repeat visits after the Zewards redesign' },
  { metric: '+25%', context: 'Retention after the Folionomics wallet redesign' },
  { metric: '-18%', context: 'Account-linking drop-offs at Truebill' }
];

export function HowILead() {
  return (
    <section id="how-i-lead" className="relative z-30 bg-black text-white px-6 md:px-20 py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-center gap-3 mb-6 md:mb-10">
          <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-[#FF6B35]" aria-hidden="true" />
          <span className="text-base md:text-xl font-medium tracking-tight">How I lead</span>
        </div>
        <h2 className="font-display text-4xl md:text-[72px] leading-[1] uppercase tracking-tighter mb-12 md:mb-16 max-w-[900px]">
          Direction, people, and the decisions in between.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: idx * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="border border-white/15 rounded-[30px] p-7 md:p-8"
            >
              <span className="text-[11px] font-semibold tracking-[0.2em] text-white/60 uppercase block mb-6">{pillar.id}</span>
              <h3 className="font-display text-2xl md:text-4xl uppercase tracking-tight mb-4">{pillar.title}</h3>
              <p className="text-[15px] md:text-[16px] leading-[1.65] text-white/85">{pillar.body}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="border border-white/15 rounded-[30px] p-7 md:p-8"
        >
          <span className="text-[11px] font-semibold tracking-[0.2em] text-white/60 uppercase block mb-6">04</span>
          <h3 className="font-display text-2xl md:text-4xl uppercase tracking-tight mb-8">Outcomes</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {outcomes.map((o) => (
              <li key={o.context}>
                <p className="font-display text-4xl md:text-5xl text-[#FF6B35] leading-none mb-3">{o.metric}</p>
                <p className="text-[13px] md:text-[14px] leading-[1.5] text-white/85">{o.context}</p>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
