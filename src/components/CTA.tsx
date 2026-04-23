import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';

export function CTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Smooth scroll transformations for the text
  const xLeft = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const xRight = useTransform(scrollYProgress, [0, 1], [-500, 0]);

  const xLeftSmooth = useSpring(xLeft, { stiffness: 100, damping: 30 });
  const xRightSmooth = useSpring(xRight, { stiffness: 100, damping: 30 });

  const text = "LET'S CONNECT AND LET'S WORK TOGETHER ";
  const repeatedText = Array(4).fill(text).join("");

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full py-40 md:py-60 bg-white overflow-hidden flex flex-col justify-center items-center"
    >
      {/* Scrolling Text Container */}
      <div className="absolute inset-0 flex flex-col justify-center gap-4 md:gap-8 opacity-[0.15] scale-110 pointer-events-none select-none">
        {/* Top Row - Solid */}
        <motion.div 
          style={{ x: xLeftSmooth }}
          className="whitespace-nowrap font-display text-[12vw] md:text-[220px] leading-none text-black tracking-tighter uppercase"
        >
          {repeatedText}
        </motion.div>

        {/* Bottom Row - Outline */}
        <motion.div 
          className="whitespace-nowrap font-display text-[12vw] md:text-[220px] leading-none text-transparent tracking-tighter uppercase"
          style={{
            WebkitTextStroke: "1px black",
            x: xRightSmooth
          }}
        >
          {repeatedText}
        </motion.div>
      </div>

      {/* Floating CTA Button */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group flex items-center gap-6 md:gap-10 bg-[#E2F6B5] border border-black px-10 py-6 md:px-16 md:py-10 rounded-[60px] shadow-2xl transition-all duration-300 hover:shadow-[#E2F6B5]/30 hover:bg-[#D9F0A3]"
        >
          <span className="font-display text-3xl md:text-5xl uppercase tracking-tighter text-black">
            LET'S CONTACT
          </span>
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-black flex items-center justify-center text-[#E2F6B5] transform group-hover:rotate-[-45deg] transition-transform duration-300">
            <ArrowRight size={32} strokeWidth={2.5} />
          </div>
        </motion.button>
      </div>
    </section>
  );
}
