import { motion, useAnimationFrame, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, useVelocity, wrap } from 'motion/react';
import { useRef } from 'react';

/** An endless text band that speeds up and flips direction with scroll velocity. */
export function Marquee({ items, baseVelocity = -2, className = '' }: { items: string[]; baseVelocity?: number; className?: string }) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const factor = useTransform(velocity, [-1000, 0, 1000], [-4, 0, 4], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-25, -50, v)}%`);
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let move = direction.current * baseVelocity * (delta / 1000);
    if (factor.get() < 0) direction.current = -1;
    else if (factor.get() > 0) direction.current = 1;
    move += direction.current * move * factor.get();
    baseX.set(baseX.get() + move);
  });

  const row = items.join('  ✦  ') + '  ✦  ';
  return (
    <div className={`overflow-hidden whitespace-nowrap flex ${className}`}>
      <span className="sr-only">{items.join(', ')}</span>
      <motion.div aria-hidden="true" className="flex whitespace-nowrap" style={{ x }}>
        {[0, 1, 2, 3].map((i) => <span key={i} className="block pr-6">{row}</span>)}
      </motion.div>
    </div>
  );
}
