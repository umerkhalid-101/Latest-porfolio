import { motion, useMotionValue, useSpring } from 'motion/react';
import { useEffect, useState } from 'react';

type Mode = 'idle' | 'link' | 'view';

const IDLE = 24;
const ACTIVE = 54;
const CLICKABLE = 'a, button, [role="button"], [role="radio"], label, summary, select, [data-cursor]';

/** A wavy circle: radius r, wobbling by amp, with k waves around it */
function wavyPath(r: number, amp: number, k: number, steps = 120) {
  let d = '';
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * Math.PI * 2;
    const rr = r + amp * Math.sin(k * t);
    d += `${i ? 'L' : 'M'}${(Math.cos(t) * rr).toFixed(2)} ${(Math.sin(t) * rr).toFixed(2)}`;
  }
  return d + 'Z';
}
const WAVE = wavyPath(30, 1.6, 7);
// A comet of particles riding the wave, brightest at the head
const PARTICLES = [
  { a: 0, r: 2.2, o: 1 },
  { a: -9, r: 1.7, o: 0.6 },
  { a: -18, r: 1.3, o: 0.35 },
  { a: -27, r: 0.9, o: 0.18 },
];

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
  const [mode, setMode] = useState<Mode>('idle');
  const [visible, setVisible] = useState(false);
  const [down, setDown] = useState(false);

  // The dot sits exactly on the pointer; the ring lags a little and the trail lags more
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 420, damping: 34, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 420, damping: 34, mass: 0.6 });
  const trailX = useSpring(x, { stiffness: 140, damping: 20, mass: 0.8 });
  const trailY = useSpring(y, { stiffness: 140, damping: 20, mass: 0.8 });

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add('has-custom-cursor');

    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const over = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.(CLICKABLE);
      setMode(!el ? 'idle' : el.getAttribute('data-cursor') === 'view' ? 'view' : 'link');
    };
    const leave = () => setVisible(false);
    const press = () => setDown(true);
    const release = () => setDown(false);

    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerover', over, { passive: true });
    document.documentElement.addEventListener('pointerleave', leave);
    window.addEventListener('pointerdown', press);
    window.addEventListener('pointerup', release);
    return () => {
      document.documentElement.classList.remove('has-custom-cursor');
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerover', over);
      document.documentElement.removeEventListener('pointerleave', leave);
      window.removeEventListener('pointerdown', press);
      window.removeEventListener('pointerup', release);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const active = mode !== 'idle';
  const size = (active ? ACTIVE : IDLE) * (down ? 0.88 : 1);
  const ease = { type: 'spring' as const, stiffness: 320, damping: 26 };
  // Each blended layer is its own fixed element: a transformed parent would isolate the blend
  const layer = 'pointer-events-none fixed left-0 top-0 z-[9999]';

  return (
    <div aria-hidden="true" style={{ opacity: visible ? 1 : 0, transition: 'opacity 200ms' }}>
      {/* Soft trail, 40% */}
      <motion.div className={`${layer} mix-blend-difference`} style={{ x: trailX, y: trailY }}>
        <motion.div
          className="absolute rounded-full bg-white blur-[6px]"
          animate={{ width: size, height: size, opacity: active ? 0 : 0.4 }}
          transition={ease}
          style={{ translateX: '-50%', translateY: '-50%' }}
        />
      </motion.div>

      {/* Ring, which fills into an inverting disc with a wavy edge on hover */}
      <motion.div className={`${layer} mix-blend-difference`} style={{ x: ringX, y: ringY }}>
        <motion.div
          className="absolute rounded-full border-[1.5px] border-white"
          animate={{ width: size, height: size, backgroundColor: active ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0)' }}
          transition={ease}
          style={{ translateX: '-50%', translateY: '-50%' }}
        />
        <motion.svg
          width="72"
          height="72"
          viewBox="-36 -36 72 72"
          className="absolute -left-9 -top-9 overflow-visible"
          animate={{ opacity: active ? 1 : 0, scale: active ? (down ? 0.88 : 1) : 0.4 }}
          transition={ease}
        >
          <g className="cursor-spin">
            <path d={WAVE} fill="none" stroke="white" strokeWidth="1.2" />
          </g>
        </motion.svg>
      </motion.div>

      {/* Top layer, no blend: particles, the dot, the crosshair and the label */}
      <motion.div className={layer} style={{ x: ringX, y: ringY }}>
        <motion.svg
          width="72"
          height="72"
          viewBox="-36 -36 72 72"
          className="absolute -left-9 -top-9 overflow-visible"
          animate={{ opacity: active ? 1 : 0, scale: active ? (down ? 0.88 : 1) : 0.4 }}
          transition={ease}
        >
          <g className="cursor-orbit" style={{ filter: 'drop-shadow(0 0 3px #FF953F) drop-shadow(0 0 6px #FF953F)' }}>
            {PARTICLES.map((p) => {
              const t = (p.a * Math.PI) / 180;
              return <circle key={p.a} cx={Math.cos(t) * 30} cy={Math.sin(t) * 30} r={p.r} fill="#FF953F" opacity={p.o} />;
            })}
          </g>
        </motion.svg>

        {/* Crosshair on links */}
        <motion.svg
          width="14"
          height="14"
          viewBox="-7 -7 14 14"
          className="absolute -left-[7px] -top-[7px]"
          animate={{ opacity: mode === 'link' ? 1 : 0, scale: mode === 'link' ? 1 : 0.3, rotate: mode === 'link' ? 0 : -45 }}
          transition={ease}
        >
          <path d="M0 -6V-2M0 2V6M-6 0H-2M2 0H6" stroke="#FF953F" strokeWidth="1.6" strokeLinecap="round" />
          <circle r="0.9" fill="#FF953F" />
        </motion.svg>

        {/* VIEW on case study cards */}
        <motion.span
          className="absolute -translate-x-1/2 -translate-y-1/2 font-sans text-[10px] font-semibold tracking-[0.14em] text-accent"
          animate={{ opacity: mode === 'view' ? 1 : 0, scale: mode === 'view' ? 1 : 0.5 }}
          transition={ease}
        >
          VIEW
        </motion.span>
      </motion.div>

      {/* The 6px dot rides the pointer with no lag, so clicks stay precise */}
      <motion.div className={layer} style={{ x, y }}>
        <motion.div
          className="absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
          animate={{ scale: active ? 0 : 1 }}
          transition={ease}
        />
      </motion.div>
    </div>
  );
}
