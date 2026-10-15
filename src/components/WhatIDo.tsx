import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { RevealText } from './RevealText';

// Capabilities as an index: each row is backed by a proof card from a real role (facts from LinkedIn).
const capabilities = [
  {
    title: 'Design leadership',
    company: 'Hauraki',
    role: 'Design Manager',
    stat: '4 products',
    proof: 'One design direction across the whole Zewst ecosystem.',
    moves: ['Set direction for 4 products', 'Scaled one pattern library', 'Shared standards with engineering'],
    logo: '/images/timeline-03.webp',
    bg: '#A3E635',
    dark: false,
    href: '/zewards-casestudy',
  },
  {
    title: 'Product design',
    company: 'Salams',
    role: 'Junior UX to Senior Product Designer',
    stat: 'Acquired',
    proof: 'First design hire, through to the Match Group acquisition.',
    moves: ['Full app redesign', 'Pricing and feature A/B tests', 'Identity system for Muslim dating'],
    logo: '/images/timeline-02.webp',
    bg: '#C2185B',
    dark: true,
    href: '/salams-casestudy',
  },
  {
    title: 'Design systems',
    company: 'Unita Worldwide',
    role: 'Product Designer',
    stat: 'From scratch',
    proof: 'Sole designer on a global B2B verified business network.',
    moves: ['Full token coverage', 'Component libraries', 'Map-based discovery'],
    logo: '/images/timeline-06.webp',
    bg: '#0A4D4D',
    dark: true,
    href: '/unita-casestudy',
  },
  {
    title: 'Government portals',
    company: 'VARA · MBLM',
    role: 'Design Specialist',
    stat: '5-step guide',
    proof: "VARA's portal and licensing guide, desktop and mobile.",
    moves: ['Five-step licensing guide', 'Reusable UI kit', '12-column layout system'],
    logo: '/images/timeline-07.webp',
    bg: '#0B1F3A',
    dark: true,
    href: '/vara-casestudy',
  },
  {
    title: 'Research & testing',
    company: 'Truebill',
    role: 'UX Designer',
    stat: '−18%',
    proof: 'Account-linking drop-offs, after 30+ usability studies.',
    moves: ['30+ validation studies', '+22% data accuracy', 'Payment flow redesign'],
    logo: '/images/timeline-01.webp',
    bg: '#C62828',
    dark: true,
    href: undefined,
  },
] as const;

type Capability = (typeof capabilities)[number];
const CYCLE_MS = 5000;

function ProofCard({ c, index, compact = false, progressKey, playing }: { c: Capability; index: number; compact?: boolean; progressKey?: string; playing?: boolean }) {
  const ink = c.dark ? 'text-white' : 'text-black';
  const muted = c.dark ? 'text-white/80' : 'text-black/70';
  const chip = c.dark ? 'bg-white/12 text-white' : 'bg-black/10 text-black';
  return (
    <div className={`relative h-full rounded-[30px] md:rounded-[40px] overflow-hidden flex flex-col ${compact ? 'p-6' : 'p-8 xl:p-10'} ${ink}`} style={{ backgroundColor: c.bg }}>
      {/* Oversized index number in the background */}
      <span aria-hidden="true" className={`absolute -right-4 -bottom-10 font-display leading-none select-none pointer-events-none ${compact ? 'text-[180px]' : 'text-[clamp(220px,34vh,320px)]'} ${c.dark ? 'text-white/[0.07]' : 'text-black/[0.07]'}`}>
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className="relative flex items-center justify-between gap-4">
        <div>
          <p className="text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.2em]">{c.company}</p>
          <p className={`text-[13px] md:text-[14px] ${muted}`}>{c.role}</p>
        </div>
        <span className="w-16 md:w-20 aspect-[16/10] bg-white rounded-xl overflow-hidden shrink-0 shadow-sm">
          <img src={c.logo} alt="" width={476} height={312} loading="lazy" className="w-full h-full object-cover" />
        </span>
      </div>

      <div className={`relative ${compact ? 'mt-7' : 'mt-auto pt-6'}`}>
        <p className={`font-display uppercase tracking-tighter leading-[0.85] ${compact ? 'text-[56px]' : 'text-[clamp(60px,10vh,112px)]'}`}>{c.stat}</p>
        <p className={`mt-3 text-[15px] md:text-[17px] leading-[1.45] max-w-[420px] ${muted}`}>{c.proof}</p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {c.moves.map((m, i) => (
            <motion.li
              key={m}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.06 }}
              className={`rounded-full px-3.5 py-1.5 text-[12px] md:text-[13px] font-semibold ${chip}`}
            >
              {m}
            </motion.li>
          ))}
        </ul>

        <div className="mt-6 flex items-center justify-between gap-4">
          {c.href ? (
            <a href={c.href} className="inline-flex items-center gap-2 rounded-full bg-white text-black pl-5 pr-2 py-2 text-[12px] font-bold uppercase tracking-widest group/link">
              See the case study
              <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center transition-transform group-hover/link:rotate-45" aria-hidden="true">
                <ArrowUpRight size={16} />
              </span>
            </a>
          ) : (
            <a href="#about" className={`text-[12px] font-bold uppercase tracking-widest underline underline-offset-4 ${ink}`}>See it in Experience</a>
          )}
        </div>
      </div>

      {/* Auto-advance progress */}
      {progressKey && (
        <div className={`absolute left-0 right-0 bottom-0 h-1 ${c.dark ? 'bg-white/10' : 'bg-black/10'}`} aria-hidden="true">
          <motion.div
            key={progressKey}
            className={`h-full ${c.dark ? 'bg-white/70' : 'bg-black/60'}`}
            initial={{ width: '0%' }}
            animate={{ width: playing ? '100%' : '0%' }}
            transition={{ duration: playing ? CYCLE_MS / 1000 : 0, ease: 'linear' }}
          />
        </div>
      )}
    </div>
  );
}

export function WhatIDo() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5 });
  // Auto-play only on desktop, where the proof panel sits beside the list (on phones it would reflow the page)
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const update = () => setWide(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  const playing = wide && inView && !paused && !reduce;
  const current = capabilities[active];

  // Gently cycle through the capabilities until the visitor takes over
  useEffect(() => {
    if (!playing) return;
    const id = setTimeout(() => setActive((a) => (a + 1) % capabilities.length), CYCLE_MS);
    return () => clearTimeout(id);
  }, [active, playing]);

  const pick = (i: number) => { setPaused(true); setActive(i); };

  return (
    <section id="what-i-do" className="relative bg-[#E5E1DA] text-black px-6 md:px-14 py-24 md:py-28 lg:py-0 lg:min-h-[100svh] lg:flex lg:items-center">
      <div ref={ref} className="max-w-[1400px] w-full mx-auto lg:pt-[88px] lg:pb-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
        {/* Index */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="flex items-center gap-3 mb-5 md:mb-6">
            <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-black" />
            <span className="text-base md:text-xl font-medium tracking-tight">What I do</span>
          </div>
          <h2 className="font-display text-[11vw] md:text-[64px] lg:text-[clamp(40px,6.4vh,68px)] leading-[0.95] uppercase tracking-tighter mb-8 lg:mb-[clamp(16px,3.5vh,40px)]">
            <RevealText text="Five things I do well," /><br />
            <RevealText text="and where I proved it." className="text-[#6F6F6F]" delay={0.12} />
          </h2>

          <ol className="flex flex-col gap-1.5" onMouseLeave={() => setPaused(false)}>
            {capabilities.map((c, i) => {
              const isActive = i === active;
              return (
                <li key={c.title}>
                  <button
                    type="button"
                    aria-expanded={isActive}
                    onClick={() => pick(i)}
                    onPointerEnter={(e) => { if (e.pointerType === 'mouse') pick(i); }}
                    onFocus={() => pick(i)}
                    className="relative w-full flex items-center gap-5 md:gap-7 pl-5 md:pl-6 pr-4 md:pr-5 py-3 lg:py-[clamp(8px,1.6vh,16px)] text-left rounded-full"
                  >
                    {isActive && (
                      <motion.span layoutId="what-i-do-pill" className="absolute inset-0 rounded-full bg-black" transition={{ type: 'spring', stiffness: 380, damping: 34 }} aria-hidden="true" />
                    )}
                    <span className={`relative text-[12px] md:text-[13px] font-semibold tracking-[0.2em] w-7 shrink-0 tabular-nums transition-colors ${isActive ? 'text-[#FF6B35]' : 'text-black/55'}`}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className={`relative font-display text-[8.5vw] md:text-[48px] lg:text-[clamp(30px,5vh,54px)] leading-[1] uppercase tracking-tighter flex-1 transition-colors duration-200 ${isActive ? 'text-white' : 'text-black/55 hover:text-black'}`}>
                      {c.title}
                    </span>
                    <span className={`relative hidden md:flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.15em] whitespace-nowrap transition-colors ${isActive ? 'text-white/80' : 'text-black/55'}`}>
                      {c.company}
                      <ArrowUpRight size={16} className={`transition-transform ${isActive ? 'rotate-45 text-[#FF6B35]' : ''}`} aria-hidden="true" />
                    </span>
                  </button>

                  {/* Phones: the proof card opens under its row */}
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:hidden overflow-hidden"
                      >
                        <div className="pt-2 pb-3"><ProofCard c={c} index={i} compact /></div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Desktop: proof panel that changes with the active row */}
        <div className="hidden lg:block lg:col-span-5 relative min-h-[460px]" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.title}
              initial={reduce ? false : { opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, y: -16, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <ProofCard c={current} index={active} progressKey={`${current.title}-${playing}`} playing={playing} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
