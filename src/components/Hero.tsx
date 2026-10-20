import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from 'motion/react';
import { useRef } from 'react';
import { Linkedin, Instagram } from 'lucide-react';

const NAME = "MUHAMMAD UMER";
const EASE = [0.16, 1, 0.3, 1] as const;

/** One letter of the name: rises in on load, then stretches up toward the cursor like a wave */
function Letter({ char, index, center, pointer }: { char: string; index: number; center: number; pointer: MotionValue<number> }) {
  const near = useTransform(pointer, (p) => (p < 0 ? 0 : Math.max(0, 1 - Math.abs(p - center) * 7)));
  const lift = useSpring(useTransform(near, [0, 1], [0, -0.08]), { stiffness: 260, damping: 18 });
  const stretch = useSpring(useTransform(near, [0, 1], [1, 1.14]), { stiffness: 260, damping: 18 });
  const y = useTransform(lift, (v) => `${v}em`);
  return (
    <motion.span
      aria-hidden="true"
      className="block"
      initial={{ y: "110%" }}
      animate={{ y: 0 }}
      transition={{ duration: 1.1, delay: 0.25 + index * 0.035, ease: EASE }}
    >
      <motion.span className="block origin-bottom" style={{ y, scaleY: stretch }}>{char}</motion.span>
    </motion.span>
  );
}

/** A teammate's cursor with a name tag, wandering slowly */
function Collaborator({ name, tone, className, path, delay }: { name: string; tone: 'ink' | 'white'; className: string; path: { x: number[]; y: number[] }; delay: number }) {
  const ink = tone === 'ink';
  return (
    <motion.div
      className={`absolute ${className}`}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1, x: path.x, y: path.y }}
      transition={{
        opacity: { delay, duration: 0.4 },
        scale: { delay, type: 'spring', stiffness: 300, damping: 18 },
        x: { delay, duration: 9, repeat: Infinity, ease: 'easeInOut' },
        y: { delay, duration: 9, repeat: Infinity, ease: 'easeInOut' },
      }}
    >
      <svg width="22" height="22" viewBox="0 0 22 22" className="drop-shadow">
        <path d="M3 2 L3 18 L7.5 13.8 L10.5 20.5 L13.5 19.2 L10.6 12.6 L16.8 12.6 Z" fill={ink ? 'var(--color-ink)' : 'var(--color-white)'} stroke={ink ? 'var(--color-white)' : 'var(--color-ink)'} strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
      <span className={`absolute left-4 top-5 whitespace-nowrap rounded-full rounded-tl-sm t-label px-2.5 py-1 ${ink ? 'bg-ink text-white' : 'bg-white text-ink'}`}>{name}</span>
    </motion.div>
  );
}

/**
 * Layered hero: the gradient, the name set huge behind me, and my cutout in front.
 * Layers rise in on load, then drift at different depths with the cursor and the scroll.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // Cursor depth: each layer moves a different amount
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const soft = { stiffness: 60, damping: 18 };
  const bgX = useSpring(useTransform(mx, (v) => v * -14), soft);
  const bgY = useSpring(useTransform(my, (v) => v * -10), soft);
  const nameX = useSpring(useTransform(mx, (v) => v * -28), soft);
  const personX = useSpring(useTransform(mx, (v) => v * 36), soft);
  const personRot = useSpring(useTransform(mx, (v) => v * 2.5), soft);
  const pointer = useMotionValue(-1);

  // Scroll: the name sinks and fades, I rise and grow slightly, the details fade out
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const nameY = useTransform(scrollYProgress, [0, 1], ['0%', '60%']);
  const nameOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const personY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);
  const personScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const detailsOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative z-10 h-[100svh] min-h-[620px] overflow-hidden bg-accent"
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse' || reduce) return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerLeave={() => { mx.set(0); my.set(0); }}
    >
      {/* 1. Gradient */}
      <motion.div
        aria-hidden="true"
        className="absolute -inset-6"
        style={{ x: bgX, y: bgY }}
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: EASE }}
      >
        <img src="/images/hero-bg.webp" alt="" width={1600} height={1225} fetchPriority="high" className="w-full h-full object-cover" />
      </motion.div>

      {/* 2. The name, behind me */}
      <motion.div style={{ y: nameY, opacity: nameOpacity }} className="absolute inset-x-0 top-[17svh] md:top-[9svh] z-10">
        <motion.h1
          style={{ x: nameX }}
          onPointerMove={(e) => {
            if (e.pointerType !== 'mouse' || reduce) return;
            const r = e.currentTarget.getBoundingClientRect();
            pointer.set((e.clientX - r.left) / r.width);
          }}
          onPointerLeave={() => pointer.set(-1)}
          className="font-display text-[17vw] md:text-[12.6vw] min-[1900px]:text-[240px] uppercase leading-[0.85] tracking-[-0.01em] text-white flex flex-wrap justify-center gap-x-[0.25em] overflow-hidden pt-[0.1em] px-4 select-none"
        >
          {/* The full heading for screen readers and search; the letters below are decorative */}
          <span className="sr-only">Muhammad Umer (Umer Khalid), Lead Product Designer and UI/UX Designer in Dubai</span>
          {NAME.split(" ").map((word, w, words) => {
            const offset = words.slice(0, w).join(" ").length + (w ? 1 : 0);
            return (
              <span key={w} className="flex">
                {word.split("").map((char, i) => (
                  <Letter key={i} char={char} index={offset + i} center={(offset + i + 0.5) / NAME.length} pointer={pointer} />
                ))}
              </span>
            );
          })}
        </motion.h1>
      </motion.div>

      {/* 3. Me, in front of the name */}
      <motion.div
        className="absolute bottom-0 left-1/2 z-20 h-[64svh] md:h-[84svh] aspect-[777/947] -translate-x-1/2 pointer-events-none"
        style={{ y: personY, scale: personScale, originY: 1 }}
      >
        <motion.img
          src="/images/hero-person.webp"
          alt="Muhammad Umer (Umer Khalid)"
          width={777}
          height={947}
          fetchPriority="high"
          style={{ x: personX, rotate: personRot }}
          initial={{ y: '35%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          transition={{ type: 'spring', stiffness: 70, damping: 16, delay: 0.55 }}
          className="w-full h-full object-contain object-bottom"
        />

      </motion.div>

      {/* Multiplayer cursors drifting in the open space, like teammates in a shared file */}
      {!reduce && (
        <div aria-hidden="true" className="hidden md:block absolute inset-0 z-30 pointer-events-none">
          <Collaborator name="Founder" tone="ink" className="left-[13%] top-[42%]" path={{ x: [0, 40, 10, -20, 0], y: [0, -24, 30, 10, 0] }} delay={1.8} />
          <Collaborator name="Engineer" tone="white" className="left-[22%] top-[60%]" path={{ x: [0, -36, -8, 22, 0], y: [0, 20, 34, -10, 0] }} delay={2.1} />
        </div>
      )}

      {/* Spinning badge: a quick way down to the work */}
      <motion.a
        href="#work"
        aria-label="See my work"
        className="hidden md:flex absolute right-[9%] top-[40%] z-30 w-36 h-36 lg:w-40 lg:h-40 items-center justify-center group"
        initial={{ opacity: 0, scale: 0.6, rotate: -90 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ delay: 1.6, type: 'spring', stiffness: 120, damping: 14 }}
      >
        <motion.svg
          viewBox="0 0 160 160"
          className="absolute inset-0 w-full h-full"
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          aria-hidden="true"
        >
          <defs>
            <path id="hero-badge-circle" d="M80,80 m-62,0 a62,62 0 1,1 124,0 a62,62 0 1,1 -124,0" />
          </defs>
          <text className="t-label" fill="var(--color-ink)" style={{ fontSize: 12, letterSpacing: '0.22em' }}>
            <textPath href="#hero-badge-circle">LEAD PRODUCT DESIGNER ✦ SEE THE WORK ✦ </textPath>
          </text>
        </motion.svg>
        <span className="w-14 h-14 rounded-full bg-ink text-white flex items-center justify-center motion-safe:transition-transform motion-safe:duration-300 group-hover:scale-110 group-hover:rotate-45" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M19 12l-7 7-7-7" /></svg>
        </span>
      </motion.a>

      {/* 4. Details, in front of everything */}
      <motion.div
        style={{ opacity: detailsOpacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="absolute inset-x-0 bottom-0 z-30 px-6 md:px-14 pb-8 md:pb-10"
      >
        <div className="max-w-[1800px] mx-auto flex items-end justify-between gap-6">
          <div className="space-y-3">
            <p className="inline-flex items-center gap-2.5 bg-white/80 backdrop-blur-md rounded-full pl-2.5 pr-3.5 py-1 t-body-s text-ink">
              <span className="relative flex w-2 h-2" aria-hidden="true">
                <span className="absolute inset-0 rounded-full bg-success motion-safe:animate-ping opacity-75" />
                <span className="relative w-2 h-2 rounded-full bg-success" />
              </span>
              Open to Lead and Manager roles
            </p>
            <p className="t-display-m text-ink">Based in<br />Dubai, UAE</p>
            <div className="flex items-center gap-3 pt-1">
              <a href="https://www.linkedin.com/in/umar-khalid1/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-9 h-9 rounded-full bg-ink text-white flex items-center justify-center hover:bg-white hover:text-ink motion-safe:transition-colors"><Linkedin size={16} aria-hidden="true" /></a>
              <a href="https://www.instagram.com/umar_khalid1" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-9 h-9 rounded-full bg-ink text-white flex items-center justify-center hover:bg-white hover:text-ink motion-safe:transition-colors"><Instagram size={16} aria-hidden="true" /></a>
              <a href="https://x.com/designsbyumer" target="_blank" rel="noopener noreferrer" aria-label="X" className="w-9 h-9 rounded-full bg-ink text-white flex items-center justify-center hover:bg-white hover:text-ink motion-safe:transition-colors"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg></a>
            </div>
          </div>

          <div className="hidden md:block max-w-[340px] text-right">
            <p className="t-body-s text-ink">
              Product design leader in Dubai with 7 years shipping SaaS, fintech, and consumer products. I've led design teams, set direction across multi-product ecosystems, and worked side by side with founders from first design hire through acquisition.
            </p>
            <p className="mt-4 flex items-end justify-end gap-3">
              <span className="t-label text-ink/70">Users on products<br />I've designed</span>
              <span className="t-display-m text-ink">1M+</span>
            </p>
          </div>
          <p className="hidden">
            <span className="t-display-m text-ink">1M+</span>
            <span className="t-label text-ink/70 mt-1">Users on products<br />I've designed</span>
          </p>
        </div>
      </motion.div>
    </section>
  );
}
