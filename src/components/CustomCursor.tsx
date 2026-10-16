import { AnimatePresence, motion, useMotionValue, useSpring } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

/**
 * A HUD-style cursor. Idle: an orange dot, a segmented reticle that eases behind it,
 * a soft trail and a coordinate readout. Over anything clickable, corner brackets fly
 * out and lock onto the element, the dot becomes a crosshair and a label decodes in.
 */

const CLICKABLE = 'a, button, [role="button"], [role="radio"], label, summary, select, [data-cursor]';
const IDLE_BOX = 34;
const PAD = 8;
const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/#_<>';

function labelFor(el: Element): string {
  const custom = el.getAttribute('data-cursor-label');
  if (custom !== null) return custom;
  if (el.getAttribute('data-cursor') === 'view') return 'View case';
  const href = el.getAttribute('href') ?? '';
  if (el.hasAttribute('download') || href.endsWith('.pdf')) return 'Download';
  if (href.startsWith('mailto:')) return 'Email';
  if (/^https?:/.test(href) && !href.includes(window.location.host)) return 'Visit';
  return 'Open';
}

/** Decodes text in from random glyphs, left to right */
function useScramble(text: string) {
  const [out, setOut] = useState(text);
  useEffect(() => {
    let frame = 0;
    const total = 10;
    const id = setInterval(() => {
      frame++;
      const settled = Math.floor((frame / total) * text.length);
      setOut(
        text
          .split('')
          .map((c, i) => (i < settled || c === ' ' ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
          .join(''),
      );
      if (frame >= total) clearInterval(id);
    }, 32);
    return () => clearInterval(id);
  }, [text]);
  return out;
}

/** Fine pointers only, and only when motion is welcome. Everyone else keeps the native cursor. */
function useEnabled() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)');
    const update = () => setOn(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return on;
}

export function CustomCursor() {
  const enabled = useEnabled();
  const [label, setLabel] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [down, setDown] = useState(false);
  const [pulses, setPulses] = useState<{ id: number; x: number; y: number }[]>([]);
  const readout = useRef<HTMLSpanElement>(null);
  const target = useRef<Element | null>(null);
  const pointer = useRef({ x: -100, y: -100 });

  // The dot is exact; everything else eases behind it
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const soft = { stiffness: 420, damping: 34, mass: 0.6 };
  const ringX = useSpring(x, soft);
  const ringY = useSpring(y, soft);
  const trailX = useSpring(x, { stiffness: 140, damping: 20, mass: 0.8 });
  const trailY = useSpring(y, { stiffness: 140, damping: 20, mass: 0.8 });

  // The bracket frame: a box that sits on the cursor, or locks onto the hovered element
  const lock = { stiffness: 380, damping: 32, mass: 0.7 };
  const bx = useSpring(-100, lock);
  const by = useSpring(-100, lock);
  const bw = useSpring(IDLE_BOX, lock);
  const bh = useSpring(IDLE_BOX, lock);

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    root.classList.add('has-custom-cursor');

    const retarget = () => {
      const { x: px, y: py } = pointer.current;
      const hit = document.elementFromPoint(px, py)?.closest(CLICKABLE) ?? null;
      if (hit === target.current) return;
      target.current = hit;
      setLabel(hit ? labelFor(hit) : null);
    };

    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      pointer.current = { x: e.clientX, y: e.clientY };
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      if (readout.current) {
        readout.current.textContent = `X${String(Math.round(e.clientX)).padStart(4, '0')}  Y${String(Math.round(e.clientY)).padStart(4, '0')}`;
      }
      retarget();
    };

    // Follow the locked element through scrolls and its own hover animations
    let raf = 0;
    const tick = () => {
      const el = target.current;
      if (el && el.isConnected) {
        // Lock onto the visible part, so tall cards keep all four corners on screen
        const r = el.getBoundingClientRect();
        const edge = 6;
        const left = Math.max(edge, r.left - PAD);
        const top = Math.max(edge, r.top - PAD);
        const right = Math.min(window.innerWidth - edge, r.right + PAD);
        const bottom = Math.min(window.innerHeight - edge, r.bottom + PAD);
        bx.set(left);
        by.set(top);
        bw.set(Math.max(0, right - left));
        bh.set(Math.max(0, bottom - top));
      } else {
        bx.set(pointer.current.x - IDLE_BOX / 2);
        by.set(pointer.current.y - IDLE_BOX / 2);
        bw.set(IDLE_BOX);
        bh.set(IDLE_BOX);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    let pulseId = 0;
    const press = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      setDown(true);
      const id = ++pulseId;
      setPulses((p) => [...p, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => setPulses((p) => p.filter((q) => q.id !== id)), 650);
    };
    const release = () => setDown(false);
    const leave = () => setVisible(false);

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('scroll', retarget, { passive: true });
    window.addEventListener('pointerdown', press);
    window.addEventListener('pointerup', release);
    root.addEventListener('pointerleave', leave);
    return () => {
      cancelAnimationFrame(raf);
      root.classList.remove('has-custom-cursor');
      window.removeEventListener('pointermove', move);
      window.removeEventListener('scroll', retarget);
      window.removeEventListener('pointerdown', press);
      window.removeEventListener('pointerup', release);
      root.removeEventListener('pointerleave', leave);
    };
  }, [enabled, x, y, bx, by, bw, bh]);

  const scrambled = useScramble(label ?? '');

  if (!enabled) return null;

  const active = label !== null;
  const spring = { type: 'spring' as const, stiffness: 320, damping: 26 };
  // Each blended layer is its own fixed element: a transformed parent would isolate the blend
  const layer = 'pointer-events-none fixed left-0 top-0 z-[9999]';
  const corner = active ? 12 : 7;

  return (
    <div aria-hidden="true" style={{ opacity: visible ? 1 : 0, transition: 'opacity 200ms' }}>
      {/* Soft trail, 40% */}
      <motion.div className={`${layer} mix-blend-difference`} style={{ x: trailX, y: trailY }}>
        <motion.div
          className="absolute h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white blur-[6px]"
          animate={{ opacity: active ? 0 : 0.4 }}
        />
      </motion.div>

      {/* Lock-on brackets */}
      <motion.div className={`${layer} mix-blend-difference`} style={{ x: bx, y: by, width: bw, height: bh }}>
        {[
          'left-0 top-0 border-l border-t',
          'right-0 top-0 border-r border-t',
          'left-0 bottom-0 border-l border-b',
          'right-0 bottom-0 border-r border-b',
        ].map((pos) => (
          <motion.span
            key={pos}
            className={`absolute border-white ${pos}`}
            animate={{ width: corner, height: corner, borderWidth: active ? 2 : 1.5, opacity: active ? 1 : 0.55 }}
            transition={spring}
          />
        ))}
      </motion.div>

      {/* Segmented reticle */}
      <motion.div className={`${layer} mix-blend-difference`} style={{ x: ringX, y: ringY }}>
        <motion.svg
          width="40"
          height="40"
          viewBox="-20 -20 40 40"
          className="absolute -left-5 -top-5 overflow-visible"
          animate={{ scale: (active ? 0.55 : 1) * (down ? 0.8 : 1) }}
          transition={spring}
        >
          <g className={active ? 'cursor-spin-fast' : 'cursor-spin'}>
            <circle r="12" fill="none" stroke="white" strokeWidth="1.5" strokeDasharray="14 4.85" />
          </g>
          <g stroke="white" strokeWidth="1.2" opacity={active ? 0 : 0.7}>
            <path d="M0 -17V-15M0 15V17M-17 0H-15M15 0H17" />
          </g>
        </motion.svg>
      </motion.div>

      {/* Dot, which turns into a crosshair over clickables */}
      <motion.div className={layer} style={{ x, y }}>
        <motion.div
          className="absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_8px_#FF953F]"
          animate={{ scale: active ? 0 : down ? 0.6 : 1 }}
          transition={spring}
        />
        <motion.svg
          width="16"
          height="16"
          viewBox="-8 -8 16 16"
          className="absolute -left-2 -top-2"
          style={{ filter: 'drop-shadow(0 0 3px #FF953F)' }}
          animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.3, rotate: active ? 0 : -90 }}
          transition={spring}
        >
          <path d="M0 -7V-2.5M0 2.5V7M-7 0H-2.5M2.5 0H7" stroke="#FF953F" strokeWidth="1.6" strokeLinecap="round" />
          <circle r="1" fill="#FF953F" />
        </motion.svg>
      </motion.div>

      {/* Readout: coordinates while idle, a decoded label while locked on */}
      <motion.div className={`${layer} mix-blend-difference`} style={{ x: ringX, y: ringY }}>
        <div className="absolute left-5 top-4 whitespace-nowrap font-mono text-[10px] uppercase leading-none tracking-[0.12em] text-white">
          <span ref={readout} className="transition-opacity duration-200" style={{ opacity: active ? 0 : 0.45 }} />
          {active && label && (
            <span className="absolute left-0 top-0 flex items-center gap-1.5">
              <span className="inline-block h-1.5 w-1.5 animate-pulse bg-white" />
              {scrambled}
            </span>
          )}
        </div>
      </motion.div>

      {/* Click pulse */}
      <AnimatePresence>
        {pulses.map((p) => (
          <motion.div
            key={p.id}
            className={`${layer} mix-blend-difference`}
            style={{ x: p.x, y: p.y }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <motion.div
              className="absolute h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white"
              initial={{ scale: 0.3 }}
              animate={{ scale: 1.8 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
