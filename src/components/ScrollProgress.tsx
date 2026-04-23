import { motion, useScroll, useSpring } from 'motion/react';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-[3px] z-[9999] pointer-events-none">
        {/* Animated Progress Bar */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-full bg-[#FF6B35] origin-left shadow-[0_0_15px_rgba(255,107,53,0.5)]"
          style={{ scaleX }}
        />
      </div>

      {/* Glassy Right Edge Blur (The "Cool" Factor) */}
      <div className="fixed top-0 right-0 w-[10px] h-full z-[9998] pointer-events-none backdrop-blur-[2px] bg-black/[0.02]" />
    </>
  );
}
