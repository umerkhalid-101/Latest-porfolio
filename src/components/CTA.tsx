import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { useRef, useState } from 'react';
import { ArrowRight, Check, Copy } from 'lucide-react';
import { Magnetic } from './Magnetic';

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

  const [copied, setCopied] = useState(false);
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('umerkhalid141@gmail.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = 'mailto:umerkhalid141@gmail.com';
    }
  };

  const text = "LET'S TALK. ";
  const repeatedText = Array(4).fill(text).join("");

  return (
    <section 
      ref={sectionRef} 
      id="contact" className="relative w-full py-32 md:py-48 bg-white overflow-hidden flex flex-col justify-center items-center"
    >
      {/* Scrolling Text Container */}
      <div aria-hidden="true" className="absolute inset-0 flex flex-col justify-center gap-4 md:gap-8 opacity-[0.07] scale-110 pointer-events-none select-none">
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

      {/* Contact */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-[760px]">
        <p className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.2em] text-black/70 mb-6">
          <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" aria-hidden="true" /> Open to new roles in Dubai
        </p>
        <h2 className="font-display text-5xl md:text-[110px] leading-[0.9] uppercase tracking-tighter text-black mb-6">
          Hiring a design lead?
        </h2>
        <p className="text-[16px] md:text-[19px] leading-[1.6] text-black/75 mb-10 max-w-[560px]">
          I'm looking for Lead Product Designer, Design Lead, and Design Manager roles. The fastest way to reach me is email.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Magnetic strength={0.35}>
            <motion.a
              href="mailto:umerkhalid141@gmail.com"
              whileTap={{ scale: 0.96 }}
              className="group flex items-center gap-5 bg-black text-white pl-8 pr-3 py-3 rounded-full"
            >
              <span className="font-display text-xl md:text-2xl uppercase tracking-tight">Email me</span>
              <span aria-hidden="true" className="w-11 h-11 rounded-full bg-[#DFFF2B] text-black flex items-center justify-center group-hover:-rotate-45 transition-transform duration-300">
                <ArrowRight size={22} strokeWidth={2.5} />
              </span>
            </motion.a>
          </Magnetic>
          <button
            type="button"
            onClick={copyEmail}
            className="flex items-center gap-2 px-6 py-4 rounded-full border border-black text-[13px] font-semibold uppercase tracking-widest text-black hover:bg-black hover:text-white transition-colors"
          >
            {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
            {copied ? 'Copied' : 'Copy email'}
          </button>
          <a
            href="https://www.linkedin.com/in/umar-khalid1/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-4 rounded-full border border-black text-[13px] font-semibold uppercase tracking-widest text-black hover:bg-black hover:text-white transition-colors"
          >
            LinkedIn
          </a>
        </div>
        <span className="sr-only" aria-live="polite">{copied ? 'Email address copied' : ''}</span>
      </div>
    </section>
  );
}
