import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';

const projects = [
  {
    id: 1,
    title: "Unita",
    description: "B2B Marketplace for UAE/GCC Description: Sole designer on a pre-launch B2B platform. Built the design system from scratch with full token coverage and a dark teal and burnt orange visual language. Shipped 10+ modules across 30 to 50 screens.",
    image: "https://drive.google.com/thumbnail?id=1nouxdrvItr_1p2vvVUTMSaWma_6SM_5R&sz=w1000",
    color: "bg-[#0A2E2E]", // Dark Teal mood for Unita
    accentColors: ["bg-[#FF6B35]", "bg-orange-600", "bg-teal-600"],
    textColor: "text-white"
  },
  {
    id: 2,
    title: "Salams",
    description: "Consumer App Redesign (Match Group) Description: Led the full redesign covering home, explore, matches, chat, events, and a deep profile editing system. Designed onboarding across dozens of screens and the identity attribute system specific to Muslim dating.",
    image: "https://drive.google.com/thumbnail?id=1XDQGUMSp2hRDLQlCqnv8PK2a8QPOBzBJ&sz=w1000",
    color: "bg-[#FF4D8D]", // Iconic Salams Pink/Red
    accentColors: ["bg-white/20", "bg-white/40", "bg-white/60"],
    textColor: "text-white"
  },
  {
    id: 3,
    title: "Zewst",
    description: "Restaurant Operating System Description: Restaurant-grade POS scaled to 500+ merchants. Orders, inventory, real-time sales, staff clock-in, and comp items, paired with a BI dashboard for franchise performance and food waste analytics.",
    image: "https://drive.google.com/thumbnail?id=1PoCTLNPMa2fiyALYCay77uNKEhSgKVzR&sz=w1000",
    color: "bg-[#A3E635]", // Fresh Green for Restaurant OS
    accentColors: ["bg-green-600", "bg-green-700", "bg-green-800"],
    textColor: "text-black"
  },
  {
    id: 4,
    title: "Folionomics",
    description: "Crypto Portfolio Platform Description: Designed the full product across portfolio dashboard, market assets, wallet explorer, swap flow, and Portfolio AI chat. Unified wallet view across 60+ chains lifted retention by 25%. Tags: Fintech · Data Visualization",
    image: "https://drive.google.com/thumbnail?id=1_YA_eRt-nstKY2jroczQOcDdzxTsHQlI&sz=w1000",
    color: "bg-[#0D0D0D]", // Deep Dark Crypto mood
    accentColors: ["bg-blue-600", "bg-indigo-600", "bg-cyan-600"],
    textColor: "text-white"
  }
];

export function FeaturedWork() {
  return (
    <section id="work" className="relative z-30 bg-white pt-24 pb-48 px-6 md:px-20 overflow-hidden">
      
      {/* Heading Section */}
      <div className="relative mb-20 md:mb-[15vw] flex flex-col items-center">
        <h2 className="font-display text-[10vw] md:text-[180px] leading-[0.85] text-black uppercase tracking-tighter text-center">
          FEATURED WORKS
        </h2>
        {/* Lime Sticker */}
        <div className="absolute top-[20%] right-[10%] md:right-[15%] rotate-[8deg] bg-[#DFFF2B] px-4 py-2 md:px-6 md:py-3 shadow-xl">
           <span className="text-black font-display text-[14px] md:text-[24px] uppercase font-bold tracking-tight">DIGITAL SCREENS</span>
        </div>
      </div>

      {/* Single Column Sequence */}
      <div className="max-w-[1200px] mx-auto flex flex-col gap-32 md:gap-48">
        {projects.map((project) => (
          <div key={project.id}>
            <WorkCard project={project} />
          </div>
        ))}
      </div>
    </section>
  );
}

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  color: string;
  accentColors: string[];
  textColor: string;
}

function WorkCard({ project }: { project: Project }) {
  const cardRef = useRef(null);
  
  // Reveal on scroll animation
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };

  const opacityRaw = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);
  const yRaw = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [150, 0, 0, -150]);

  const opacity = useSpring(opacityRaw, springConfig);
  const y = useSpring(yRaw, springConfig);

  return (
    <motion.div 
      ref={cardRef}
      style={{ opacity, y }}
      className={`group relative w-full min-h-[550px] md:h-[700px] ${project.color} rounded-[30px] md:rounded-[60px] overflow-hidden flex flex-col md:flex-row shadow-2xl cursor-pointer py-12 md:py-0`}
    >
      {/* Layout Grid */}
      <div className="flex flex-col md:flex-row w-full h-full p-8 md:p-20 relative z-10">
        
        {/* Text Side */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h3 className={`font-display text-4xl md:text-8xl ${project.textColor} uppercase tracking-tighter mb-6 md:mb-8 leading-none`}>
            {project.title}
          </h3>
          <p className={`text-[13px] md:text-[22px] ${project.textColor === 'text-black' ? 'text-black/80' : 'text-white/80'} font-medium max-w-[450px] leading-relaxed mb-10 md:mb-12`}>
            {project.description}
          </p>

          <div className={`flex items-center gap-4 md:gap-6 px-6 md:px-10 py-3 md:py-5 rounded-full border-2 ${project.textColor === 'text-black' ? 'border-black' : 'border-white'} w-fit group/btn hover:bg-black transition-all duration-300`}>
             <div className={`w-8 md:w-10 h-[2px] ${project.textColor === 'text-black' ? 'bg-black' : 'bg-white'} group-hover/btn:bg-white transition-colors`} />
             <span className={`font-display text-base md:text-xl uppercase tracking-tight ${project.textColor === 'text-black' ? 'text-black' : 'text-white'} group-hover/btn:text-white transition-colors`}>Learn More</span>
          </div>
        </div>

        {/* Visual Side */}
        <div className="w-full md:w-1/2 flex items-center justify-center md:justify-end mt-12 md:mt-0 relative">
          <div className="relative w-full md:w-[130%] transform group-hover:scale-105 transition-transform duration-700 ease-out translate-x-0 md:translate-x-12">
            <img 
              src={project.image} 
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-auto drop-shadow-3xl rounded-xl" 
            />
          </div>
        </div>
      </div>

      {/* Signature Stacked Borders */}
      <div className="absolute bottom-0 left-0 w-full flex flex-col z-20">
         <div className="h-4 w-full bg-black/5" />
         <div className={`h-5 w-full ${project.accentColors[0]}`} />
         <div className={`h-5 w-full ${project.accentColors[1]}`} />
         <div className={`h-5 w-full ${project.accentColors[2]}`} />
      </div>

      {/* Hover Overlay Gradient */}
      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  );
}
