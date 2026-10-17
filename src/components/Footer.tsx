import { ArrowUp, ArrowUpRight, Check, Copy } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from 'motion/react';
import { Marquee } from './Marquee';
import { Magnetic } from './Magnetic';
import { scrollToSmooth } from '../lib/smoothScroll';

const EMAIL = 'umerkhalid141@gmail.com';

function DubaiTime() {
  const fmt = () => new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Dubai', hour: '2-digit', minute: '2-digit' }).format(new Date());
  const [time, setTime] = useState(fmt);
  useEffect(() => {
    const id = setInterval(() => setTime(fmt()), 15000);
    return () => clearInterval(id);
  }, []);
  return <time className="tabular-nums">{time}</time>;
}

/** A wordmark letter: drops in on view, then stretches up when the cursor passes over it */
function WordLetter({ char, index, center, pointer, show, accent = false }: { char: string; index: number; center: number; pointer: MotionValue<number>; show: boolean; accent?: boolean }) {
  const near = useTransform(pointer, (p) => (p < 0 ? 0 : Math.max(0, 1 - Math.abs(p - center) * 4)));
  const stretch = useSpring(useTransform(near, [0, 1], [1, 1.18]), { stiffness: 260, damping: 16 });
  const skew = useSpring(useTransform(pointer, (p) => (p < 0 ? 0 : (center - p) * 14)), { stiffness: 200, damping: 20 });
  return (
    <motion.span
      className={`inline-block ${accent ? 'text-accent' : ''}`}
      initial={{ y: '-110%', rotate: index % 2 ? 8 : -8 }}
      animate={show ? { y: 0, rotate: 0 } : undefined}
      transition={{ type: 'spring', stiffness: 260, damping: 13, delay: index * 0.08 }}
    >
      <motion.span className="inline-block origin-bottom" style={{ scaleY: stretch, skewX: skew }}>{char}</motion.span>
    </motion.span>
  );
}

const columns = [
  {
    title: 'Sections',
    links: [
      { label: 'About', href: '/#about' },
      { label: 'Work', href: '/#work' },
      { label: 'How I lead', href: '/#how-i-lead' },
      { label: 'Experience', href: '/#experience' },
      { label: 'Skills', href: '/#skills' },
      { label: 'Contact', href: '/#contact' },
    ],
  },
  {
    title: 'Case studies',
    links: [
      { label: 'Unita', href: '/unita-casestudy' },
      { label: 'VARA', href: '/vara-casestudy' },
      { label: 'Salams', href: '/salams-casestudy' },
      { label: 'Zewst', href: '/zewards-casestudy' },
    ],
  },
  {
    title: 'Elsewhere',
    links: [
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/umar-khalid1/', external: true },
      { label: 'Instagram', href: 'https://www.instagram.com/umar_khalid1', external: true },
      { label: 'Email', href: `mailto:${EMAIL}` },
    ],
  },
] as { title: string; links: { label: string; href: string; external?: boolean }[] }[];

export function Footer() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  const reduce = useReducedMotion();
  // Cursor spotlight across the whole footer
  const sx = useMotionValue(-1000);
  const sy = useMotionValue(-1000);
  const spot = useMotionTemplate`radial-gradient(520px circle at ${sx}px ${sy}px, color-mix(in srgb, var(--color-accent) 22%, transparent), transparent 70%)`;
  const gridMask = useMotionTemplate`radial-gradient(360px circle at ${sx}px ${sy}px, black, transparent 75%)`;
  const pointer = useMotionValue(-1);
  // Observe the wordmark itself: its letters start clipped above it, so they never intersect on their own
  const markRef = useRef<HTMLParagraphElement>(null);
  const markIn = useInView(markRef, { once: true, amount: 0.3 });

  return (
    <footer
      id="contact"
      className="relative bg-ink text-white pb-8 overflow-hidden"
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse' || reduce) return;
        const r = e.currentTarget.getBoundingClientRect();
        sx.set(e.clientX - r.left);
        sy.set(e.clientY - r.top);
      }}
      onPointerLeave={() => { sx.set(-1000); sy.set(-1000); }}
    >
      {/* Orange band: the hero color returns to close the page */}
      <Marquee
        items={['Open to Lead and Design Manager roles', 'Based in Dubai', "Let's talk"]}
        baseVelocity={-3}
        className="bg-accent text-ink t-display-l py-4 md:py-6"
      />

      {/* Spotlight and a faint grid it reveals */}
      {!reduce && (
        <>
          <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: spot }} />
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage: 'linear-gradient(var(--color-line-dark) 1px, transparent 1px), linear-gradient(90deg, var(--color-line-dark) 1px, transparent 1px)',
              backgroundSize: '56px 56px',
              WebkitMaskImage: gridMask,
              maskImage: gridMask,
            }}
          />
        </>
      )}

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-14 pt-16 md:pt-24">
        {/* Contact */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 pb-12 md:pb-16 border-b border-line-dark">
          <div>
            <p className="flex items-center gap-3 t-label mb-5">
              <span className="relative flex w-2.5 h-2.5" aria-hidden="true">
                <span className="absolute inset-0 rounded-full bg-success motion-safe:animate-ping opacity-60" />
                <span className="relative w-2.5 h-2.5 rounded-full bg-success" />
              </span>
              Open to new roles in Dubai
            </p>
            <h2 className="t-display-l">Let's build<br /><span className="text-muted-dark">something good.</span></h2>
            <a href={`mailto:${EMAIL}`} className="inline-block t-heading mt-6 underline decoration-line-dark underline-offset-8 hover:decoration-white">{EMAIL}</a>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={copy}
              className="flex items-center gap-2 rounded-full border border-white/40 hover:border-white px-5 py-3 t-label"
            >
              {copied ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
              {copied ? 'Copied' : 'Copy email'}
            </button>
            <Magnetic strength={0.35}>
              <a href={`mailto:${EMAIL}`} className="group flex items-center gap-3 rounded-full bg-white text-ink pl-6 pr-2 py-2 t-label">
                Email me
                <span className="w-11 h-11 rounded-full bg-accent text-ink flex items-center justify-center motion-safe:transition-transform group-hover:rotate-45" aria-hidden="true"><ArrowUpRight size={18} /></span>
              </a>
            </Magnetic>
            <span className="sr-only" aria-live="polite">{copied ? 'Email address copied' : ''}</span>
          </div>
        </div>

        {/* Link columns + local time */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-12 md:py-14">
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="t-label text-muted-dark mb-5">{col.title}</h3>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="inline-flex items-center gap-1.5 t-body text-white hover:underline underline-offset-4"
                    >
                      {l.label}
                      {l.external && <ArrowUpRight size={14} aria-hidden="true" />}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <div>
            <h3 className="t-label text-muted-dark mb-5">Dubai, UAE</h3>
            <p className="t-display-m"><DubaiTime /></p>
            <p className="t-body-s text-muted-dark mt-2">Local time · +971 52 134 5139</p>
          </div>
        </div>

        {/* Wordmark */}
        <p
          ref={markRef}
          aria-hidden="true"
          onPointerMove={(e) => {
            if (e.pointerType !== 'mouse' || reduce) return;
            const r = e.currentTarget.getBoundingClientRect();
            pointer.set((e.clientX - r.left) / r.width);
          }}
          onPointerLeave={() => pointer.set(-1)}
          className="overflow-hidden pt-[0.12em] font-display uppercase leading-[0.78] tracking-tighter text-[37vw] lg:text-[min(30vw,420px)] -mx-1 select-none text-white">
          {'UMER.'.split('').map((c, i, all) => (
            <WordLetter key={i} char={c} index={i} center={(i + 0.5) / all.length} pointer={pointer} accent={c === '.'} show={markIn} />
          ))}
        </p>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-8 border-t border-line-dark t-body-s text-muted-dark">
          <p>© 2026 Muhammad Umer.</p>
          <button
            type="button"
            onClick={() => scrollToSmooth(0)}
            className="flex items-center gap-2 t-label text-white"
          >
            Back to top <ArrowUp size={14} aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
