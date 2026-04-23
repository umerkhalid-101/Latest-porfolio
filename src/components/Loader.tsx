import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

const words = ["DESIGNER", "STRATEGIST", "ENGINEER", "CREATOR", "UMER"];

export function Loader({ onComplete }: { onComplete: () => void, key?: string | number }) {
  const [index, setIndex] = useState(0);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    // Word cycler
    const wordInterval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 400);

    // Progress counter
    const counterInterval = setInterval(() => {
      setCounter((prev) => {
        if (prev >= 100) {
          clearInterval(counterInterval);
          clearInterval(wordInterval);
          setTimeout(onComplete, 800);
          return 100;
        }
        return prev + Math.floor(Math.random() * 8) + 2;
      });
    }, 60);

    return () => {
      clearInterval(wordInterval);
      clearInterval(counterInterval);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        clipPath: 'inset(0 0 100% 0)',
        transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } 
      }}
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Grid Accent */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="grid grid-cols-12 h-full w-full">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="border-r border-white/20 h-full" />
          ))}
        </div>
      </div>

      <div className="relative flex flex-col items-center">
        {/* Rapidly Changing Words */}
        <div className="h-20 md:h-32 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="font-display text-[12vw] md:text-[180px] text-white uppercase tracking-tighter leading-none"
            >
              {words[index]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Massive Progress Number in Background */}
        <motion.div 
          className="absolute -bottom-20 md:-bottom-40 font-display text-[40vw] md:text-[400px] text-white/5 uppercase tracking-tighter whitespace-nowrap pointer-events-none select-none"
        >
          {counter.toString().padStart(3, '0')}
        </motion.div>
      </div>

      {/* Footer Info */}
      <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end border-t border-white/10 pt-6">
        <div className="flex flex-col gap-1">
          <p className="text-[10px] tracking-widest text-white/40 uppercase font-medium">DESIGN & STRATEGY PORTFOLIO</p>
          <p className="text-[10px] tracking-widest text-white/40 uppercase font-medium">© 2026 EDITION</p>
        </div>
        
        <div className="flex items-baseline gap-2">
           <span className="font-display text-2xl text-white">{counter}</span>
           <span className="text-[10px] tracking-widest text-white/40 uppercase font-medium">PROCESS</span>
        </div>
      </div>
    </motion.div>
  );
}
