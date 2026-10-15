import { motion, useInView, useReducedMotion } from 'motion/react';
import { useRef } from 'react';

/** Words rise into place from a clipped baseline when scrolled into view. */
export function RevealText({ text, className = '', delay = 0 }: { text: string; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  // Observe the unclipped wrapper: the words themselves start fully clipped, so they never "intersect"
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -40px 0px' });
  if (reduce) return <span className={className}>{text}</span>;

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.split(' ').map((word, i, words) => (
          <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]">
            <motion.span
              className="inline-block"
              initial={{ y: '110%' }}
              animate={{ y: inView ? '0%' : '110%' }}
              transition={{ duration: 0.9, delay: delay + i * 0.04, ease: [0.16, 1, 0.3, 1] }}
            >
              {word}
            </motion.span>
            {i < words.length - 1 && '\u00A0'}
          </span>
        ))}
      </span>
    </span>
  );
}
