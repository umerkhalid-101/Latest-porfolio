import { motion } from 'motion/react';
import { ArrowLeft, type LucideIcon } from 'lucide-react';
import { useEffect, type CSSProperties, type ReactNode } from 'react';
import { CaseStudyLeadership, type LeadershipContent } from './CaseStudyLeadership';
import { scrollToImmediate } from '../lib/smoothScroll';
import { Footer } from './Footer';
import { Header } from './Header';

/*
 * One template for every case study, built from the Salams layout.
 * Every section is optional: a case study shows only the sections it has real content for.
 */

export interface CsImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface CaseStudy {
  slug: string;
  title: string;
  tagline: string;
  theme: {
    /** Hero, gap and research backgrounds */
    primary: string;
    /** Headings and highlights on light backgrounds */
    accent: string;
    /** "Why it mattered" background */
    soft: string;
    /** Design system background */
    highlight: string;
    /** Callout and insight backgrounds */
    cream: string;
    /** Strategy background */
    tint: string;
  };
  roles: { label: string; value: string }[];
  heroImage?: CsImage;
  /** Enlarge a hero image that has built-in padding */
  heroScale?: number;
  context?: { title: string; body: ReactNode; highlights?: ReactNode[] };
  problem?: { image?: CsImage; questions: { q: string; a: string }[] };
  mattered?: { label: string; statement: string; note?: string }[];
  quote?: { label: string; text: string; flow?: string };
  problemSpaces?: { title: string; image?: CsImage; questions: string[] }[];
  /** Heading and column label for the problem spaces (defaults match Salams) */
  problemSpacesTitle?: string;
  problemSpaceLabel?: string;
  gap?: { lead: string; statement: ReactNode; image?: CsImage };
  strategy?: { statement: ReactNode; screens: { image: CsImage; caption: string }[]; wide?: boolean };
  research?: { title: string; body: ReactNode; image?: CsImage };
  synthesis?: { label: string; title: string; points: string[]; quote?: string };
  insights?: { title: string; body: ReactNode; image?: CsImage };
  ethos?: { title: string; principles: { title: string; body: string; icon?: LucideIcon; image?: CsImage }[] };
  solutions?: { modules: { tag: string; title: string; body: ReactNode; image?: CsImage; frame?: 'phone' | 'screen' }[] };
  designSystem?: { title: string; body: ReactNode; images?: CsImage[]; grid?: boolean };
  leadership: LeadershipContent;
  footerFacts: string[];
}

const ink = '#121115';

/** Fades and rises a block into view once */
function Reveal({ children, className = '', delay = 0, x = 0, y = 30 }: { children: ReactNode; className?: string; delay?: number; x?: number; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Bullets({ items, className = '' }: { items: string[]; className?: string }) {
  return (
    <ul className={`space-y-4 ${className}`}>
      {items.map((t) => (
        <li key={t} className="flex items-start gap-3">
          <span className="mt-1.5 text-xs" style={{ color: ink }}>•</span>
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

function Shot({ image, frame = 'phone', className = '' }: { image: CsImage; frame?: 'phone' | 'screen'; className?: string }) {
  return (
    <img
      width={image.width}
      height={image.height}
      loading="lazy"
      src={image.src}
      alt={image.alt}
      className={`w-full h-auto object-contain ${frame === 'phone' ? 'rounded-[40px] border-[8px] border-[#121115] shadow-2xl' : 'rounded-[20px] shadow-2xl'} ${className}`}
    />
  );
}

export function CaseStudyTemplate({ data, onClose }: { data: CaseStudy; onClose: () => void }) {
  useEffect(() => { scrollToImmediate(0); }, [data.slug]);

  const t = data.theme;
  const id = (s: string) => `${data.slug}-${s}`;
  const vars = {
    '--cs-primary': t.primary,
    '--cs-accent': t.accent,
    '--cs-soft': t.soft,
    '--cs-highlight': t.highlight,
    '--cs-cream': t.cream,
    '--cs-tint': t.tint,
  } as CSSProperties;


  return (
    <div style={vars} className="bg-[#FAF8F5] text-[#121115] min-h-screen relative font-sans selection:bg-[var(--cs-accent)] selection:text-white">
      <Header />

      {/* 1. Hero: same language as the homepage hero. The title sits huge, the product rises in front of it */}
      <section className="relative bg-[var(--cs-primary)] text-white overflow-hidden pt-28 md:pt-32 pb-12 md:pb-16 px-6 md:px-14" id={id('hero')}>
        <div className="max-w-[1500px] mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex items-center justify-between gap-4 t-label text-white/75"
          >
            <span className="flex items-center gap-2.5"><span className="w-2.5 h-2.5 rounded-full bg-white" aria-hidden="true" />Case study</span>
            <span>{data.roles.find((r) => /year/i.test(r.label))?.value}</span>
          </motion.div>

          <h1 aria-label={data.title} className="relative z-10 mt-4 font-display uppercase leading-[0.85] tracking-[-0.01em] text-[24vw] md:text-[18vw] min-[1500px]:text-[270px] flex overflow-hidden pt-[0.08em] select-none">
            {data.title.split('').map((c, i) => (
              <motion.span
                key={i}
                aria-hidden="true"
                className="block"
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.25 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              >
                {c === ' ' ? '\u00A0' : c}
              </motion.span>
            ))}
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-end mt-6 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-30 lg:col-span-5 order-2 lg:order-1 space-y-8"
            >
              <p className="t-body-l text-white/90">{data.tagline}</p>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-white/25 pt-6">
                {data.roles.map((r) => (
                  <div key={r.label}>
                    <dt className="t-label text-white/65">{r.label}</dt>
                    <dd className="t-heading mt-1">{r.value}</dd>
                  </div>
                ))}
              </dl>
            </motion.div>
            {data.heroImage && (
              <motion.div
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 70, damping: 16, delay: 0.55 }}
                className="relative z-20 lg:col-span-7 order-1 lg:order-2 lg:-mt-[11vw] min-[1500px]:-mt-[160px] flex justify-center lg:justify-end"
              >
                <img width={data.heroImage.width} height={data.heroImage.height} fetchPriority="high" src={data.heroImage.src} alt={data.heroImage.alt} style={{ scale: data.heroScale ?? 1 }} className="w-full max-w-[720px] h-auto max-h-[62svh] object-contain drop-shadow-2xl select-none" />
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* 2. Context */}
      {data.context && (
        <section className="py-24 px-6 max-w-7xl mx-auto" id={id('context')}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <Reveal className={`${data.context.highlights ? 'lg:col-span-7' : 'lg:col-span-9'} space-y-6`}>
              <span className="text-[var(--cs-accent)] text-xs font-bold uppercase tracking-widest block">// CONTEXT</span>
              <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight leading-none">{data.context.title}</h2>
              <div className="space-y-6 text-[#121115]/80 text-base md:text-lg leading-relaxed">{data.context.body}</div>
            </Reveal>
            {data.context.highlights && (
              <Reveal delay={0.15} y={40} className="lg:col-span-5 space-y-4 flex flex-col justify-center">
                {data.context.highlights.map((h, i) => (
                  <div key={i} className="bg-[var(--cs-cream)] border border-[#121115]/10 rounded-2xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-[var(--cs-accent)]" />
                    <p className="text-sm md:text-base leading-relaxed">{h}</p>
                  </div>
                ))}
              </Reveal>
            )}
          </div>
        </section>
      )}

      {/* 3. Problem definition */}
      {data.problem && (
        <section className="py-24 px-6 bg-white border-t border-b border-[#121115]/5">
          <div className="max-w-7xl mx-auto space-y-16">
            <Reveal y={20} className="text-center">
              <h2 className="text-2xl md:text-4xl font-medium text-[var(--cs-accent)] tracking-tight">What problem was I solving?</h2>
            </Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {data.problem.image && (
                <Reveal y={0} className="lg:col-span-6 flex justify-center">
                  <img width={data.problem.image.width} height={data.problem.image.height} loading="lazy" src={data.problem.image.src} alt={data.problem.image.alt} className="w-full max-w-lg h-auto object-contain select-none" />
                </Reveal>
              )}
              <Reveal x={30} y={0} delay={0.15} className={`${data.problem.image ? 'lg:col-span-6' : 'lg:col-span-8 lg:col-start-3'} space-y-12`}>
                {data.problem.questions.map((q) => (
                  <div key={q.q} className="space-y-4">
                    <h3 className="text-xl md:text-2xl font-semibold text-[var(--cs-accent)] leading-snug">{q.q}</h3>
                    <p className="text-base md:text-lg text-[#121115]/80 leading-relaxed">{q.a}</p>
                  </div>
                ))}
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* 4. Why it mattered */}
      {data.mattered && (
        <section className="py-24 md:py-32 px-6 bg-[var(--cs-soft)] text-[#121115]">
          <div className={`max-w-7xl mx-auto grid grid-cols-1 gap-16 lg:gap-24 ${data.mattered.length > 2 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'}`}>
            {data.mattered.map((m, i) => (
              <Reveal key={m.label} delay={i * 0.15} className="space-y-6 md:space-y-8">
                <h3 className="text-xl md:text-2xl font-normal tracking-tight">{m.label}</h3>
                <p className="text-3xl md:text-4xl lg:text-[44px] font-bold tracking-tight leading-[1.2]">{m.statement}</p>
                {m.note && <p className="text-sm md:text-base tracking-wide">{m.note}</p>}
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* 5. Editorial quote */}
      {data.quote && (
        <section className="py-24 md:py-32 px-6 bg-[var(--cs-cream)] border-b border-[#121115]/5">
          <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-12 md:space-y-16">
            <Reveal y={0} className="space-y-4 md:space-y-6">
              <h4 className="text-lg md:text-2xl font-normal tracking-tight">{data.quote.label}</h4>
              <p className="text-[var(--cs-accent)] text-2xl md:text-4xl lg:text-[40px] font-medium tracking-tight leading-[1.4] max-w-5xl mx-auto">{data.quote.text}</p>
            </Reveal>
            {data.quote.flow && (
              <motion.div
                initial={{ opacity: 0, width: '20%' }}
                whileInView={{ opacity: 1, width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="w-full py-6 md:py-8 flex justify-center"
                style={{ background: 'linear-gradient(90deg, transparent, color-mix(in srgb, var(--cs-soft) 25%, transparent), transparent)' }}
              >
                <span className="text-xs md:text-base lg:text-lg font-bold tracking-[0.2em]">{data.quote.flow}</span>
              </motion.div>
            )}
          </div>
        </section>
      )}

      {/* 6. Problem spaces */}
      {data.problemSpaces && (
        <section className="py-24 md:py-32 px-6 bg-[#FFFCF8]" id={id('problem-space')}>
          <div className="max-w-7xl mx-auto">
            <Reveal x={-20} y={0} className="mb-20">
              <h2 className="text-3xl md:text-[40px] font-medium tracking-tight">{data.problemSpacesTitle ?? 'Delving deeper into the problem space.'}</h2>
            </Reveal>
            <div className={`grid grid-cols-1 gap-12 md:gap-16 ${data.problemSpaces.length === 2 ? 'md:grid-cols-2' : data.problemSpaces.length === 4 ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3'}`}>
              {data.problemSpaces.map((p, i) => (
                <Reveal key={p.title} delay={0.1 * (i + 1)} className="space-y-8 flex flex-col">
                  <div className="flex items-center gap-4">
                    <span className="text-[var(--cs-accent)] text-sm font-semibold tracking-wider uppercase whitespace-nowrap">{data.problemSpaceLabel ?? 'Problem space'} {String(i + 1).padStart(2, '0')}</span>
                    {i < data.problemSpaces!.length - 1 && <span className="h-px bg-[#121115]/10 flex-grow hidden md:block" />}
                  </div>
                  {p.image && (
                    <div className={`${p.image.width > p.image.height ? 'w-full max-w-[320px] rounded-2xl overflow-hidden' : 'w-40 h-40 md:w-44 md:h-44'} flex items-center justify-center md:justify-start hover:scale-105 transition-transform duration-300`}>
                      <img width={p.image.width} height={p.image.height} loading="lazy" src={p.image.src} alt={p.image.alt} className="max-w-full max-h-full object-contain" />
                    </div>
                  )}
                  <div className="space-y-6">
                    <h3 className="text-2xl md:text-[26px] font-medium text-[var(--cs-accent)] tracking-tight">{p.title}</h3>
                    <Bullets items={p.questions} className="text-[#121115]/90 text-lg font-light leading-relaxed" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7. Identifying the gap */}
      {data.gap && (
        <section className="bg-[var(--cs-primary)] py-16 md:py-24 px-4 md:px-8 relative overflow-hidden text-center" id={id('gap')}>
          <Reveal y={40} className="max-w-4xl mx-auto flex flex-col items-center space-y-8">
            <div className="space-y-6">
              <p className="text-white/90 font-light tracking-wide text-sm md:text-lg">{data.gap.lead}</p>
              <h2 className="text-xl md:text-3xl lg:text-[32px] text-white font-light leading-relaxed max-w-3xl mx-auto px-2">{data.gap.statement}</h2>
              <div className="text-white font-serif text-6xl md:text-8xl lg:text-[9rem] font-bold tracking-tight select-none leading-none pt-4">{data.title}.</div>
            </div>
            {data.gap.image && (
              <img width={data.gap.image.width} height={data.gap.image.height} loading="lazy" src={data.gap.image.src} alt={data.gap.image.alt} className="w-full h-auto max-w-4xl mx-auto mt-12 object-contain select-none" />
            )}
          </Reveal>
        </section>
      )}

      {/* 8. Platform strategy */}
      {data.strategy && (
        <section className="py-24 px-6 bg-[var(--cs-tint)]" id={id('strategy')}>
          <div className="max-w-7xl mx-auto space-y-16">
            <Reveal y={25} className="text-center max-w-4xl mx-auto">
              <p className="text-2xl md:text-[34px] leading-relaxed tracking-tight text-[var(--cs-accent)]">{data.strategy.statement}</p>
            </Reveal>
            <div className={`grid grid-cols-1 gap-12 lg:gap-16 pt-8 justify-items-center ${data.strategy.screens.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
              {data.strategy.screens.map((s, i) => (
                <Reveal key={s.image.src} y={40} delay={0.1 * (i + 1)} className={`space-y-6 flex flex-col items-center md:items-start ${data.strategy!.wide ? 'max-w-[380px]' : 'max-w-[280px]'}`}>
                  <img width={s.image.width} height={s.image.height} loading="lazy" src={s.image.src} alt={s.image.alt} className="w-full h-auto object-contain rounded-[40px] shadow-2xl hover:scale-[1.03] transition-transform duration-500" />
                  <p className="text-sm md:text-base leading-relaxed">{s.caption}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 9. Research */}
      {data.research && (
        <section className="bg-[var(--cs-primary)] text-white py-24 px-6 border-t border-[#121115]/10" id={id('research')}>
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <Reveal x={-30} y={0} className={`${data.research.image ? 'lg:col-span-6' : 'lg:col-span-9'} space-y-6`}>
              <h3 className="text-3xl md:text-5xl lg:text-[44px] leading-tight font-bold tracking-tight">{data.research.title}</h3>
              <div className="text-white/90 text-base md:text-lg leading-relaxed font-light space-y-4">{data.research.body}</div>
            </Reveal>
            {data.research.image && (
              <Reveal x={30} y={0} delay={0.15} className="lg:col-span-6 flex justify-center lg:justify-end">
                <img width={data.research.image.width} height={data.research.image.height} loading="lazy" src={data.research.image.src} alt={data.research.image.alt} className="w-full max-w-[560px] h-auto object-contain rounded-[24px] shadow-2xl" />
              </Reveal>
            )}
          </div>
        </section>
      )}

      {/* 10. Observation to insights */}
      {data.synthesis && (
        <section className={`grid grid-cols-1 border-t border-[#121115]/10 ${data.synthesis.quote ? 'md:grid-cols-2' : ''}`} id={id('synthesis')}>
          <Reveal x={-30} y={0} className="bg-white py-20 px-8 md:px-16 lg:px-24 flex flex-col justify-center">
            <div className="space-y-10 max-w-xl">
              <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-[#0F55A8]">Observation to Insights</h2>
              <div className="space-y-6">
                <span className="text-[var(--cs-accent)] text-lg font-bold tracking-tight block">{data.synthesis.label}</span>
                <h3 className="text-xl md:text-2xl font-bold leading-snug">{data.synthesis.title}</h3>
                <Bullets items={data.synthesis.points} className="text-[#121115]/80 text-base md:text-[17px]" />
              </div>
            </div>
          </Reveal>
          {data.synthesis.quote && (
            <Reveal x={30} y={0} delay={0.15} className="bg-[var(--cs-cream)] py-20 px-8 md:px-16 lg:px-24 flex flex-col justify-center">
              <div className="max-w-xl space-y-6">
                <span className="font-serif text-[80px] leading-none block h-8 select-none">“</span>
                <blockquote className="text-xl md:text-3xl font-bold leading-relaxed">{data.synthesis.quote}</blockquote>
              </div>
            </Reveal>
          )}
        </section>
      )}

      {/* 11. Insights */}
      {data.insights && (
        <section className="bg-[var(--cs-cream)] py-24 px-6 md:px-12 border-t border-[#121115]/10" id={id('insights')}>
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <Reveal className={`${data.insights.image ? 'lg:col-span-5' : 'lg:col-span-9'} space-y-6`}>
              <h3 className="text-3xl md:text-4xl lg:text-[40px] font-bold tracking-tight text-[var(--cs-accent)] leading-tight">{data.insights.title}</h3>
              <div className="space-y-6 text-[#121115]/80 text-base md:text-lg leading-relaxed font-light">{data.insights.body}</div>
            </Reveal>
            {data.insights.image && (
              <Reveal y={0} delay={0.15} className="lg:col-span-7 flex justify-center lg:justify-end">
                <img width={data.insights.image.width} height={data.insights.image.height} loading="lazy" src={data.insights.image.src} alt={data.insights.image.alt} className="w-full max-w-[680px] h-auto object-contain rounded-[24px] shadow-xl" />
              </Reveal>
            )}
          </div>
        </section>
      )}

      {/* 12. Ethos and principles */}
      {data.ethos && (
        <section className="bg-white py-24 md:py-32 px-6 md:px-12 border-t border-[#121115]/10" id={id('ethos')}>
          <div className="max-w-7xl mx-auto space-y-16 md:space-y-24">
            <Reveal y={20}>
              <h2 className="text-3xl md:text-[40px] font-semibold tracking-tight leading-tight">{data.ethos.title}</h2>
            </Reveal>
            <div className={`grid grid-cols-1 gap-12 md:gap-16 lg:gap-20 ${data.ethos.principles.length === 4 ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3'}`}>
              {data.ethos.principles.map((p, i) => (
                <Reveal key={p.title} y={40} delay={0.1 * (i + 1)} className="space-y-8 flex flex-col items-start">
                  {(p.icon || p.image) && (
                    <div className="w-[140px] h-[140px] rounded-full bg-[#FAF8F5] flex items-center justify-center">
                      {p.icon ? <p.icon aria-hidden="true" size={64} strokeWidth={1.5} className="text-[var(--cs-accent)]" /> : <img width={p.image!.width} height={p.image!.height} loading="lazy" src={p.image!.src} alt={p.image!.alt} className="w-[84px] h-[84px] object-contain" />}
                    </div>
                  )}
                  <div className="space-y-4">
                    <h3 className="text-2xl md:text-[26px] font-bold text-[var(--cs-accent)] tracking-tight leading-tight">{p.title}</h3>
                    <p className="text-base md:text-lg text-[#121115]/80 leading-relaxed font-light">{p.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 13. Detailed solution */}
      {data.solutions && (
        <section className="py-24 px-6 bg-[#FAF8F5] border-t border-[#121115]/5" id={id('solutions')}>
          <div className="max-w-7xl mx-auto space-y-32">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <span className="text-[var(--cs-accent)] text-xs font-bold uppercase tracking-widest block">// DELIVERABLES</span>
              <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter">Detailed Solution</h2>
            </div>
            {data.solutions.modules.map((m, i) => {
              const flip = i % 2 === 1;
              const phone = (m.frame ?? 'phone') === 'phone';
              return (
                <Reveal key={m.title} y={40} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  <div className={`${m.image ? 'lg:col-span-6' : 'lg:col-span-8'} space-y-6 ${flip && m.image ? 'lg:order-2' : ''}`}>
                    <span className="text-[var(--cs-accent)] text-xs font-mono font-bold uppercase tracking-wider block">// {m.tag}</span>
                    <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight">{m.title}</h3>
                    <div className="space-y-4 text-sm md:text-base text-[#121115]/80 leading-relaxed">{m.body}</div>
                  </div>
                  {m.image && (
                    <div className={`lg:col-span-6 flex justify-center ${flip ? 'lg:order-1' : ''}`}>
                      <div className={`relative w-full hover:scale-[1.03] transition-transform duration-500 ${phone ? 'max-w-[280px]' : 'max-w-[620px]'}`}>
                        <Shot image={m.image} frame={phone ? 'phone' : 'screen'} />
                      </div>
                    </div>
                  )}
                </Reveal>
              );
            })}
          </div>
        </section>
      )}

      {/* 14. Design system */}
      {data.designSystem && (
        <section className="bg-[var(--cs-highlight)] text-[#121115] py-24 px-6 md:px-12 border-t border-[#121115]/10" id={id('design-system')}>
          <div className="max-w-5xl mx-auto space-y-16">
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest block">// DESIGN INFRASTRUCTURE</span>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">{data.designSystem.title}</h2>
              <div className="text-base md:text-xl font-medium max-w-3xl leading-relaxed">{data.designSystem.body}</div>
            </div>
            {data.designSystem.images && (
              <div className={data.designSystem.grid ? 'grid grid-cols-1 md:grid-cols-3 gap-6' : 'space-y-8 md:space-y-12'}>
                {data.designSystem.images.map((img, i) => (
                  <Reveal key={img.src} delay={i * 0.1} className="w-full rounded-[24px] md:rounded-[40px] overflow-hidden shadow-xl border border-[#121115]/10">
                    <img width={img.width} height={img.height} loading="lazy" src={img.src} alt={img.alt} className="w-full h-auto object-contain select-none bg-white" />
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      <CaseStudyLeadership content={data.leadership} accent={t.accent} />

      <Footer />
    </div>
  );
}
