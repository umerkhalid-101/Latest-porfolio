import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { useRef, useState, useEffect } from 'react';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

const skills = [
  { label: "Design Leadership", color: "bg-[#4C3B6B]" },
  { label: "Team Mentoring", color: "bg-[#B45309]" },
  { label: "Design Critique", color: "bg-[#064E3B]" },
  { label: "Hiring", color: "bg-[#171412]" },
  { label: "Roadmap Planning", color: "bg-[#1E3A5F]" },
  { label: "Design Ops", color: "bg-[#9B1C31]" },
  { label: "Stakeholder Management", color: "bg-[#5D22B1]" },
  { label: "Design Systems", color: "bg-[#E5DFD3]", textColor: "text-black" },
  { label: "UX Research", color: "bg-[#137A63]" },
  { label: "Product Discovery", color: "bg-[#92400E]" },
  { label: "Information Architecture", color: "bg-[#4338CA]" },
  { label: "Interaction Design", color: "bg-[#71593F]" },
  { label: "Usability Testing", color: "bg-[#0F766E]" },
  { label: "High-Fidelity Prototyping", color: "bg-[#374151]" },
  { label: "A/B Testing", color: "bg-[#BE123C]" },
  { label: "Cross-Functional Collaboration", color: "bg-[#1F2937]" },
];

export function SkillsMosaic() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Smooth rotation spring
  const rotateSpring = useSpring(useTransform(scrollYProgress, [0, 1], [-15, 15]), {
    stiffness: 100,
    damping: 30
  });

  const heading = (
    <div className="relative z-30 text-center flex flex-col items-center">
      <motion.h2
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="font-display text-5xl md:text-8xl text-black uppercase tracking-tighter leading-none mb-1"
      >
        SKILLS <span className="block text-[#FF6B35] text-6xl md:text-9xl">I KNOW</span>
      </motion.h2>
    </div>
  );

  // Small screens: a simple wrapped grid, so tiles never overlap or overflow
  if (isMobile) {
    return (
      <section ref={containerRef} className="relative w-full py-20 md:py-32 px-6 bg-white">
        <div className="mb-12">{heading}</div>
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-w-[900px] mx-auto">
          {skills.map((skill) => (
            <li key={skill.label} className={`${skill.color} rounded-[20px] flex items-center justify-center p-4 min-h-[96px]`}>
              <span className={`font-display text-center text-[14px] uppercase tracking-tight leading-tight ${skill.textColor || 'text-white'}`}>
                {skill.label}
              </span>
            </li>
          ))}
        </ul>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      className="relative w-full py-40 bg-white overflow-hidden flex items-center justify-center min-h-[120vh]"
    >
      <div className="relative w-full max-w-screen-2xl mx-auto flex items-center justify-center h-full">
        {heading}

        {/* Mosaic Ring */}
        <motion.ul
          style={{ rotate: rotateSpring }}
          className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
        >
          {skills.map((skill, i) => {
            const angle = (i / skills.length) * 2 * Math.PI;
            const radius = 440;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            return (
              <motion.li
                key={skill.label}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.1, rotate: 5, zIndex: 50 }}
                viewport={{ once: true }}
                className={`absolute ${skill.color} rounded-[32px] flex items-center justify-center p-5 shadow-2xl pointer-events-auto w-40 h-40`}
                style={{ left: '50%', top: '50%', x, y, translateX: '-50%', translateY: '-50%' }}
                animate={{ y: [y, y - 15, y] }}
                transition={{
                  y: { repeat: Infinity, duration: 3 + (i % 2), ease: "easeInOut" },
                  default: { delay: i * 0.05, duration: 0.8, ease: [0.16, 1, 0.3, 1] }
                }}
              >
                <span className={`font-display text-center text-base uppercase tracking-tight leading-tight ${skill.textColor || 'text-white'}`}>
                  {skill.label}
                </span>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
