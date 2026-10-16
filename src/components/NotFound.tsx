import { motion, useReducedMotion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

/** 404 as an empty frame on a design canvas, with a teammate who swears it was here */
export function NotFound() {
  const reduce = useReducedMotion();
  const path = typeof window !== 'undefined' ? window.location.pathname : '/';

  return (
    <section
      className="relative min-h-screen bg-paper text-ink flex items-center justify-center px-6 py-24 overflow-hidden"
      style={{
        backgroundImage: 'radial-gradient(rgba(11,11,11,0.14) 1px, transparent 1px)',
        backgroundSize: '22px 22px',
      }}
    >
      {/* Canvas chrome: zoom level and page name, like the corners of a design tool */}
      <p className="absolute top-6 left-6 md:left-10 t-label text-muted">Page 1 / Portfolio</p>
      <p className="absolute top-6 right-6 md:right-10 t-label text-muted tabular-nums">100%</p>

      <div className="relative w-full max-w-[640px]">
        <p className="t-body-s text-muted mb-2 flex items-center gap-2">
          <span aria-hidden="true" className="inline-block w-3 h-3 border-[1.5px] border-muted" />
          Frame 404
        </p>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative border-[1.5px] border-dashed border-accent bg-white/70 backdrop-blur-sm px-6 py-12 md:px-12 md:py-16"
        >
          {['-left-[5px] -top-[5px]', '-right-[5px] -top-[5px]', '-left-[5px] -bottom-[5px]', '-right-[5px] -bottom-[5px]'].map((pos) => (
            <span key={pos} aria-hidden="true" className={`absolute h-2.5 w-2.5 border-[1.5px] border-accent bg-white ${pos}`} />
          ))}

          <h1 className="t-display-xl">Frame not<br /><span className="text-accent">found.</span></h1>
          <p className="t-body-l text-muted mt-6">
            Nothing lives at <code className="font-mono text-[0.9em] text-ink bg-ink/5 rounded px-1.5 py-0.5 break-all">{path}</code>. It was deleted, renamed, or never existed. Even the best files have a few of those.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="/" className="inline-flex items-center gap-2 rounded-full bg-ink text-white px-5 py-3 t-label hover:bg-accent hover:text-ink motion-safe:transition-colors">
              <ArrowLeft size={15} aria-hidden="true" /> Back to the homepage
            </a>
            <a href="/#work" className="inline-flex items-center rounded-full border border-ink/25 hover:border-ink px-5 py-3 t-label">
              See the work
            </a>
          </div>

          <span aria-hidden="true" className="absolute left-1/2 -translate-x-1/2 -bottom-[26px] rounded-[3px] bg-accent px-1.5 py-[3px] text-[11px] font-medium leading-none text-white tabular-nums">
            404 × 404
          </span>
        </motion.div>

        {/* The Engineer, looking for it */}
        <motion.div
          aria-hidden="true"
          className="hidden md:block absolute -right-24 bottom-6"
          initial={reduce ? false : { opacity: 0, x: 60, y: 40 }}
          animate={reduce ? { opacity: 1 } : { opacity: 1, x: [0, -14, 6, 0], y: [0, 8, -6, 0] }}
          transition={{ opacity: { delay: 0.6 }, x: { delay: 0.6, duration: 7, repeat: Infinity, ease: 'easeInOut' }, y: { delay: 0.6, duration: 7, repeat: Infinity, ease: 'easeInOut' } }}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" className="drop-shadow">
            <path d="M3 2 L3 18 L7.5 13.8 L10.5 20.5 L13.5 19.2 L10.6 12.6 L16.8 12.6 Z" fill="var(--color-ink)" stroke="var(--color-white)" strokeWidth="1.4" strokeLinejoin="round" />
          </svg>
          <span className="absolute left-4 top-5 w-max max-w-[220px] rounded-[14px] rounded-tl-sm bg-ink text-white px-2.5 py-1.5 shadow-lg">
            <span className="t-label block text-muted-dark">Engineer</span>
            <span className="block text-[14px] leading-snug">I swear it was here a minute ago</span>
          </span>
        </motion.div>
      </div>
    </section>
  );
}
