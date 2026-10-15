import { motion } from 'motion/react';
import type { ReactNode } from 'react';

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

function Block({ label, title, content, accent }: { label: string; title: string; content: Content; accent: string }) {
  if (isPending(content)) {
    if (!import.meta.env.DEV) return null;
    return (
      <div className="border-2 border-dashed border-[#B45309] bg-[#FFFBEB] rounded-2xl p-6 md:p-8">
        <p className="text-xs font-bold uppercase tracking-widest text-[#B45309] mb-2">{label} · Placeholder, hidden in production</p>
        <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3 text-[#121115]">{title}</h3>
        <p className="text-base text-[#121115]/80">{content.pending}</p>
      </div>
    );
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-12 border-t border-[#121115]/10 pt-10"
    >
      <div className="lg:col-span-4">
        <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: accent }}>{label}</p>
        <h3 className="text-2xl md:text-4xl font-extrabold tracking-tight leading-tight text-[#121115]">{title}</h3>
      </div>
      <div className="lg:col-span-8 text-base md:text-lg leading-relaxed text-[#121115]/85 space-y-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_strong]:text-[#121115]">
        {content}
      </div>
    </motion.div>
  );
}

export function CaseStudyLeadership({ content, accent }: { content: LeadershipContent; accent: string }) {
  const blocks: [string, string, Content][] = [
    ['01', 'My role and team', content.roleAndTeam],
    ['02', 'The bet', content.bet],
    ['03', 'The hard call', content.hardCall],
    ['04', content.howILedTitle ?? 'How I led the team', content.howILed],
    ['05', 'Outcome', content.outcome],
    ['06', "What I'd do differently", content.differently],
  ];
  const visible = blocks.filter(([, , c]) => import.meta.env.DEV || !isPending(c));
  if (visible.length === 0) return null;

  return (
    <section className="py-24 px-6 bg-white border-t border-[#121115]/5" id="leadership">
      <div className="max-w-7xl mx-auto space-y-12">
        <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight leading-none text-[#121115]">
          Leadership and decisions
        </h2>
        {visible.map(([label, title, c]) => (
          <Block key={label} label={label} title={title} content={c} accent={accent} />
        ))}
      </div>
    </section>
  );
}
