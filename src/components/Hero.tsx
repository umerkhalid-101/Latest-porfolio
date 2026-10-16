import { motion, useMotionValue, useScroll, useSpring, useTransform, useReducedMotion, type MotionValue } from 'motion/react';
import { useRef } from 'react';
import { Linkedin, Instagram } from 'lucide-react';

const NAME = "MUHAMMAD UMER";

/** One letter of the name: rises in on load, then stretches up toward the cursor like a wave */
function Letter({ char, index, center, pointer }: { char: string; index: number; center: number; pointer: MotionValue<number> }) {
  // 1 when the cursor is right over this letter, falling to 0 a few letters away
  const near = useTransform(pointer, (p) => (p < 0 ? 0 : Math.max(0, 1 - Math.abs(p - center) * 7)));
  const lift = useSpring(useTransform(near, [0, 1], [0, -0.14]), { stiffness: 260, damping: 18 });
  const stretch = useSpring(useTransform(near, [0, 1], [1, 1.22]), { stiffness: 260, damping: 18 });
  const y = useTransform(lift, (v) => `${v}em`);
  return (
    <motion.span
      aria-hidden="true"
      initial={{ y: "110%" }}
      animate={{ y: 0 }}
      transition={{ duration: 1, delay: 0.3 + index * 0.03, ease: [0.16, 1, 0.3, 1] }}
      style={{ display: char === " " ? "inline-block" : "block", minWidth: char === " " ? "0.3em" : "auto" }}
    >
      <motion.span className="block origin-bottom" style={{ y, scaleY: stretch }}>{char}</motion.span>
    </motion.span>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-25%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const pointer = useMotionValue(-1);
  const reduce = useReducedMotion();

  return (
    <section ref={ref} className="relative z-10 min-h-[100svh] flex flex-col overflow-hidden bg-ink">

      {/* 1. Image Layer (Edge-to-Edge) */}
      {/* TODO: replace with a professional portrait once supplied. */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 z-10"
      >
        <motion.img
          style={{ y: imageY, scale: imageScale }}
          src="/images/hero-01.webp"
          alt="Muhammad Umer"
          width={2000}
          height={1531}
          fetchPriority="high"
          className="w-full h-full object-cover object-center select-none"
        />
        <div className="absolute inset-0 bg-black/10" />
      </motion.div>

      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="relative z-30 flex-1 flex flex-col justify-between gap-10 px-6 md:px-14 pt-28 md:pt-36 pb-10 md:pb-14 w-full max-w-[1800px] mx-auto">

        {/* 2. Name: full text for screen readers and search, animated letters are decorative */}
        <h1
          aria-label="Muhammad Umer"
          onPointerMove={(e) => {
            if (e.pointerType !== 'mouse' || reduce) return;
            const r = e.currentTarget.getBoundingClientRect();
            pointer.set((e.clientX - r.left) / r.width);
          }}
          onPointerLeave={() => pointer.set(-1)}
          className="t-display-xl text-white drop-shadow-2xl flex flex-wrap justify-center gap-x-[0.3em] overflow-hidden pt-[0.15em] -mt-[0.15em]"
        >
          {/* Words stay whole; on phones they stack onto two lines */}
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
        </h1>

        {/* 3. Location and positioning */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="space-y-5"
          >
            <p className="inline-flex items-center gap-2.5 bg-black/30 backdrop-blur-md border border-white/20 rounded-full pl-2.5 pr-3.5 py-1 t-body-s text-white">
              <span className="relative flex w-2 h-2" aria-hidden="true">
                <span className="absolute inset-0 rounded-full bg-success motion-safe:animate-ping opacity-75" />
                <span className="relative w-2 h-2 rounded-full bg-success" />
              </span>
              Open to Lead and Manager roles
            </p>
            <p className="t-display-l text-white drop-shadow-lg">
              Based in<br />Dubai, UAE
            </p>
          </motion.div>

          <motion.p
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="t-body-l text-white max-w-[440px] drop-shadow-md"
          >
            Product design leader in Dubai with 7 years shipping SaaS, fintech, and consumer products. I've led design teams, set direction across multi-product ecosystems, and worked side by side with founders from first design hire through acquisition.
          </motion.p>
        </div>

        {/* 4. Socials and stats */}
        <div className="w-full flex flex-col gap-8 md:flex-row justify-between items-start md:items-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex items-center gap-6"
          >
            <div className="flex items-center gap-4">
              <span className="t-label text-white">Follow</span>
              <div className="h-px w-8 md:w-12 bg-white/40" aria-hidden="true" />
            </div>
            <div className="flex gap-4">
              <a href="https://www.linkedin.com/in/umar-khalid1/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-white hover:opacity-70 transition-opacity"><Linkedin size={18} aria-hidden="true" /></a>
              <a href="https://www.instagram.com/umar_khalid1" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-white hover:opacity-70 transition-opacity"><Instagram size={18} aria-hidden="true" /></a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="flex items-center gap-6 md:gap-8"
          >
            {/* Pixel Grid 4x4 */}
            <div className="grid grid-cols-4 gap-1" aria-hidden="true">
              {[
                0, 0, 0, 1,
                0, 0, 1, 1,
                0, 1, 1, 1,
                1, 0, 1, 1
              ].map((v, i) => (
                <div key={i} className={`w-1 h-1 md:w-1.5 md:h-1.5 ${v ? 'bg-white' : 'bg-white/20'}`} />
              ))}
            </div>
            <p className="flex flex-col items-start">
              <span className="t-display-m text-white">1M+</span>
              <span className="t-label text-white mt-1">
                Users on products<br />I've designed
              </span>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
