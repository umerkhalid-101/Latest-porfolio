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
      <motion.div style={{ y: nameY, opacity: nameOpacity }} className="absolute inset-x-0 top-[17svh] md:top-[13svh] z-10">
        <motion.h1
          aria-label="Muhammad Umer"
          style={{ x: nameX }}
          onPointerMove={(e) => {
            if (e.pointerType !== 'mouse' || reduce) return;
            const r = e.currentTarget.getBoundingClientRect();
            pointer.set((e.clientX - r.left) / r.width);
          }}
          onPointerLeave={() => pointer.set(-1)}
          className="font-display text-[17vw] md:text-[12.6vw] min-[1900px]:text-[240px] uppercase leading-[0.85] tracking-[-0.01em] text-white flex flex-wrap justify-center gap-x-[0.25em] overflow-hidden pt-[0.1em] px-4 select-none"
        >
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
        className="absolute bottom-0 left-1/2 z-20 h-[64svh] md:h-[66svh] aspect-[777/947] -translate-x-1/2 pointer-events-none"
        style={{ y: personY, scale: personScale, originY: 1 }}
      >
        <motion.img
          src="/images/hero-person.webp"
          alt="Muhammad Umer"
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
