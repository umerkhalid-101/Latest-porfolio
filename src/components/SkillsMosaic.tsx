import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { useRef, useState, useEffect } from 'react';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

const skills = [
  { label: "Design Systems", color: "bg-[#4C3B6B]" },
  { label: "UX Research", color: "bg-[#D97706]" },
  { label: "Cross-Functional Collaboration", color: "bg-[#064E3B]" },
  { label: "A/B Testing", color: "bg-[#171412]" },
  { label: "Information Architecture", color: "bg-[#1E3A5F]" },
  { label: "User Flows", color: "bg-[#9B1C31]" },
  { label: "Linear Design", color: "bg-[#5D22B1]" },
  { label: "High-Fidelity Prototyping", color: "bg-[#E5DFD3]", textColor: "text-black" },
  { label: "Interaction Design", color: "bg-[#137A63]" },
  { label: "Usability Testing", color: "bg-[#F59E0B]" },
  { label: "Product Discovery", color: "bg-[#4338CA]" },
  { label: "End-to-End Product Design", color: "bg-[#71593F]" },
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

  return (
    <section 
      ref={containerRef}
      className="relative w-full py-20 md:py-40 bg-white overflow-hidden flex items-center justify-center min-h-[100vh] md:min-h-[120vh]"
    >
      <div className="relative w-full max-w-screen-2xl mx-auto flex items-center justify-center h-full">
        
        {/* Central Text */}
        <div className="relative z-30 text-center flex flex-col items-center">
          <motion.h2 
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="font-display text-4xl md:text-8xl text-black uppercase tracking-tighter leading-none mb-1 shadow-sm"
          >
            SKILLS
          </motion.h2>
          <motion.span 
            initial={{ scale: 1.2, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-5xl md:text-9xl text-[#FF6B35] uppercase tracking-tighter leading-none shadow-sm"
          >
            I KNOW
          </motion.span>
        </div>

        {/* Mosaic Ring */}
        <motion.div 
          style={{ rotate: rotateSpring }}
          className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
        >
          <div className="relative w-full h-full max-w-[1200px] max-h-[1200px] flex items-center justify-center">
            {skills.map((skill, i) => {
              const angle = (i / skills.length) * 2 * Math.PI;
              
              // More compact radii for mobile
              const radius = isMobile ? 140 : 420;
              
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              return (
                <motion.div
                  key={skill.label}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.1, rotate: 5, zIndex: 50 }}
                  viewport={{ once: true }}
                  className={`absolute ${skill.color} rounded-[20px] md:rounded-[40px] flex items-center justify-center p-3 md:p-8 shadow-2xl pointer-events-auto w-24 h-24 md:w-52 md:h-52`}
                  style={{
                    left: '50%',
                    top: '50%',
                    x,
                    y,
                    translateX: '-50%',
                    translateY: '-50%',
                  }}
                  animate={{
                    y: [y, y - (isMobile ? 8 : 15), y],
                  }}
                  transition={{
                    y: { 
                      repeat: Infinity, 
                      duration: 3 + (i % 2), 
                      ease: "easeInOut" 
                    },
                    default: { 
                      initial: { duration: 0.5 },
                      whileInView: { delay: i * 0.05, duration: 0.8, ease: [0.16, 1, 0.3, 1] }
                    }
                  }}
                >
                  <span className={`font-display text-center text-[9px] md:text-lg uppercase tracking-tight md:tracking-tighter leading-tight ${skill.textColor || 'text-white'}`}>
                    {skill.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
