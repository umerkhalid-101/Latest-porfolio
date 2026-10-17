import { motion } from 'motion/react';
import { ArrowLeft, Mail, MapPin, Phone, type LucideIcon } from 'lucide-react';
import { useEffect, type CSSProperties, type ReactNode } from 'react';
import { CaseStudyLeadership, type LeadershipContent } from './CaseStudyLeadership';
import { scrollToImmediate } from '../lib/smoothScroll';

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
  context?: { title: string; body: ReactNode; highlights?: ReactNode[] };
  problem?: { image?: CsImage; questions: { q: string; a: string }[] };
  mattered?: { label: string; statement: string; note?: string }[];
  quote?: { label: string; text: string; flow?: string };
  problemSpaces?: { title: string; image?: CsImage; questions: string[] }[];
  gap?: { lead: string; statement: ReactNode; image?: CsImage };
  strategy?: { statement: ReactNode; screens: { image: CsImage; caption: string }[] };
  research?: { title: string; body: ReactNode; image?: CsImage };
  synthesis?: { label: string; title: string; points: string[]; quote?: string };
  insights?: { title: string; body: ReactNode; image?: CsImage };
  ethos?: { title: string; principles: { title: string; body: string; icon?: LucideIcon; image?: CsImage }[] };
  solutions?: { modules: { tag: string; title: string; body: ReactNode; image?: CsImage; frame?: 'phone' | 'screen' }[] };
  designSystem?: { title: string; body: ReactNode; images?: CsImage[] };
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

  const nav = [
    data.context && { label: 'CONTEXT', href: `#${id('context')}` },
    (data.gap || data.solutions) && { label: 'SOLUTION', href: `#${id(data.gap ? 'gap' : 'solutions')}` },
    data.research && { label: 'RESEARCH', href: `#${id('research')}` },
    data.ethos && { label: 'ETHOS', href: `#${id('ethos')}` },
    data.designSystem && { label: 'SYSTEM', href: `#${id('design-system')}` },
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <div style={vars} className="bg-[#FAF8F5] text-[#121115] min-h-screen relative font-sans selection:bg-[var(--cs-accent)] selection:text-white">
      {/* Fixed navigation */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 w-full z-50 px-4 md:px-10 bg-[#FAF8F5]/90 backdrop-blur-xl border-b border-[#121115]/5 py-4 flex items-center"
      >
        <div className="flex items-center w-full">
          <button onClick={onClose} className="font-display text-3xl tracking-tighter min-w-max hover:text-[var(--cs-accent)] transition-colors">
            UMER
          </button>
          <div className="flex-1 flex items-center">
            <div className="h-px bg-[#121115]/20 w-full mx-4" />
            <nav className="hidden lg:flex items-center flex-1">
              {nav.map((item) => (
                <a key={item.href} href={item.href} className="flex flex-1 items-center gap-4 group h-10">
                  <span className="w-1.5 h-1.5 rounded-full border border-[#121115] group-hover:bg-[var(--cs-accent)] group-hover:border-[var(--cs-accent)] transition-colors" />
                  <span className="text-xs font-bold tracking-[0.2em] text-[#121115]/80 group-hover:text-[var(--cs-accent)] transition-colors whitespace-nowrap">{item.label}</span>
                  <span className="h-px bg-[#121115]/20 flex-1" />
                </a>
              ))}
            </nav>
          </div>
          <button onClick={onClose} className="flex items-center gap-2 pl-4 md:pl-12 text-[#121115]/70 hover:text-[var(--cs-accent)] transition-colors group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase">Back</span>
          </button>
        </div>
      </motion.header>

      {/* 1. Hero */}
      <section className="bg-[var(--cs-primary)] text-white pt-32 pb-24 md:pt-40 md:pb-32 px-6 relative overflow-hidden" id={id('hero')}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`${data.heroImage ? 'lg:col-span-7' : 'lg:col-span-12'} space-y-8`}
          >
            <div className="space-y-4">
              <h1 className="text-6xl md:text-[110px] leading-none tracking-tight font-serif font-black">{data.title}.</h1>
              <p className="text-xl md:text-[26px] text-white/95 font-medium tracking-tight leading-relaxed max-w-2xl">{data.tagline}</p>
            </div>
            <div className="border border-white/30 rounded-2xl grid grid-cols-2 md:grid-cols-4 overflow-hidden max-w-3xl">
              {data.roles.map((r, i) => (
                <div key={r.label} className={`p-5 md:p-6 border-white/20 ${i % 2 === 0 ? 'border-r' : ''} ${i < 2 ? 'border-b md:border-b-0' : ''} ${i === 1 ? 'md:border-r' : ''} ${i === 2 ? 'md:border-r' : ''}`}>
                  <p className="text-xs font-bold uppercase tracking-widest">{r.label}</p>
                  <p className="text-sm md:text-lg font-black uppercase mt-1.5">{r.value}</p>
                </div>
              ))}
            </div>
          </motion.div>
          {data.heroImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 flex justify-center items-center"
            >
              <img width={data.heroImage.width} height={data.heroImage.height} fetchPriority="high" src={data.heroImage.src} alt={data.heroImage.alt} className="w-full h-auto object-contain max-h-[480px] drop-shadow-2xl select-none" />
            </motion.div>
          )}
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
              <h2 className="text-3xl md:text-[40px] font-medium tracking-tight">Delving deeper into the problem space.</h2>
            </Reveal>
            <div className={`grid grid-cols-1 gap-12 md:gap-16 ${data.problemSpaces.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
              {data.problemSpaces.map((p, i) => (
                <Reveal key={p.title} delay={0.1 * (i + 1)} className="space-y-8 flex flex-col">
                  <div className="flex items-center gap-4">
                    <span className="text-[var(--cs-accent)] text-sm font-semibold tracking-wider uppercase whitespace-nowrap">Problem space {String(i + 1).padStart(2, '0')}</span>
                    {i < data.problemSpaces!.length - 1 && <span className="h-px bg-[#121115]/10 flex-grow hidden md:block" />}
                  </div>
                  {p.image && (
                    <div className="w-40 h-40 md:w-44 md:h-44 flex items-center justify-center md:justify-start hover:scale-105 transition-transform duration-300">
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
                <Reveal key={s.image.src} y={40} delay={0.1 * (i + 1)} className="space-y-6 flex flex-col items-center md:items-start max-w-[280px]">
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
              <div className="space-y-8 md:space-y-12">
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

      {/* 15. Footer */}
      <section className="bg-white py-24 px-6 border-t border-[#121115]/5 relative overflow-hidden" id={id('footer')}>
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-8">
            <div className="space-y-4">
              <h4 className="text-xs uppercase font-black tracking-widest text-[#121115]/70">// Contact</h4>
              <ul className="space-y-2.5 text-sm text-[#121115]/80">
                <li className="flex items-center gap-2.5"><MapPin size={16} className="text-[var(--cs-accent)]" /><span>Dubai, UAE</span></li>
                <li className="flex items-center gap-2.5"><Mail size={16} className="text-[var(--cs-accent)]" /><a href="mailto:umerkhalid141@gmail.com" className="hover:underline">umerkhalid141@gmail.com</a></li>
                <li className="flex items-center gap-2.5"><Phone size={16} className="text-[var(--cs-accent)]" /><span>+971 52 134 5139</span></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-xs uppercase font-black tracking-widest text-[#121115]/70">// Case study context</h4>
              <ul className="space-y-2.5 text-sm text-[#121115]/80">
                {data.footerFacts.map((f) => <li key={f}>{f}</li>)}
              </ul>
            </div>
            <div className="space-y-4 flex flex-col justify-between">
              <h4 className="text-xs uppercase font-black tracking-widest text-[#121115]/70">// Actions</h4>
              <button
                onClick={onClose}
                className="w-full bg-[#121115] hover:bg-[var(--cs-accent)] text-white py-3.5 rounded-full text-xs font-black uppercase tracking-widest transition-colors duration-300 flex items-center justify-center gap-2 mt-4"
              >
                <ArrowLeft size={14} /> Back to Portfolio
              </button>
            </div>
          </div>
          <div className="pt-12 text-center relative overflow-hidden">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-[14vw] font-black tracking-tighter text-[#121115]/45 uppercase select-none leading-[0.85]"
            >
              // UMER
            </motion.h2>
            <p className="text-xs text-[#121115]/70 uppercase tracking-[0.3em] mt-4">© 2026 Muhammad Umer.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
