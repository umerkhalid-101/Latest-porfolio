import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { useRef } from 'react';

const projects: Project[] = [
  {
    slug: "unita",
    title: "Unita",
    subtitle: "Global B2B verified business network",
    description: "Sole designer on a Swiss-headquartered B2B network with offices in Geneva, Tirana, and Dubai. Built the design system from scratch with full token coverage, and designed discovery, company profiles, and onboarding across 10+ modules.",
    image: "/images/work-04.webp",
    color: "bg-[#0A2E2E]",
    accentColors: ["bg-[#FF6B35]", "bg-orange-600", "bg-teal-600"],
    textColor: "text-white",
    href: "/unita-casestudy"
  },
  {
    slug: "vara",
    title: "VARA",
    subtitle: "Regulator web portal, Dubai",
    description: "Designed the web portal for Dubai's Virtual Assets Regulatory Authority at MBLM, from the homepage to a five-step licensing guide, backed by a reusable UI kit and a 12-column layout system.",
    highlights: ["Five-step licensing guide", "Reusable UI kit", "12-column layout system", "Desktop and mobile"],
    color: "bg-[#0B1F3A]",
    accentColors: ["bg-[#1E3A5F]", "bg-[#2B5283]", "bg-[#3B6BA5]"],
    textColor: "text-white",
    href: "/vara-casestudy"
  },
  {
    slug: "salams",
    title: "Salams",
    subtitle: "Consumer app redesign, acquired by Match Group",
    description: "Led the full redesign across home, explore, matches, chat, events, and profile. Designed onboarding and the identity attribute system specific to Muslim dating.",
    image: "/images/work-01.webp",
    color: "bg-[#C2185B]",
    accentColors: ["bg-white/20", "bg-white/40", "bg-white/60"],
    textColor: "text-white",
    href: "/salams-casestudy"
  },
  {
    slug: "zewards",
    title: "Zewst",
    subtitle: "Zewards loyalty platform, Zewst ecosystem",
    description: "As Design Manager, I owned Zewards end to end across the consumer app, business app, and marketing site. Repeat visits rose 38% and first-time activation got 2.3x faster.",
    image: "/images/work-02.webp",
    color: "bg-[#A3E635]",
    accentColors: ["bg-green-600", "bg-green-700", "bg-green-800"],
    textColor: "text-black",
    href: "/zewards-casestudy"
  },
  {
    slug: "folionomics",
    title: "Folionomics",
    subtitle: "Crypto portfolio platform",
    description: "Reframed a wallet viewer into a strategy-first portfolio product across 60+ chains. The unified wallet view lifted retention by 25%.",
    image: "/images/work-03.webp",
    color: "bg-[#0D0D0D]",
    accentColors: ["bg-blue-600", "bg-indigo-600", "bg-cyan-600"],
    textColor: "text-white",
    href: "/folionomics-casestudy"
  }
];

interface FeaturedWorkProps {
  onOpenCaseStudy?: (slug: string) => void;
}

export function FeaturedWork({ onOpenCaseStudy }: FeaturedWorkProps) {
  return (
    <section id="work" className="relative z-30 bg-white pt-24 pb-24 md:pb-32 px-6 md:px-20 overflow-hidden">

      {/* Heading Section */}
      <div className="relative mb-20 md:mb-[15vw] flex flex-col items-center">
        <h2 className="font-display text-[10vw] md:text-[180px] leading-[0.85] text-black uppercase tracking-tighter text-center">
          FEATURED WORKS
        </h2>
        {/* Lime Sticker */}
        <div className="absolute top-[20%] right-[10%] md:right-[15%] rotate-[8deg] bg-[#DFFF2B] px-4 py-2 md:px-6 md:py-3 shadow-xl" aria-hidden="true">
           <span className="text-black font-display text-[14px] md:text-[24px] uppercase font-bold tracking-tight">DIGITAL SCREENS</span>
        </div>
      </div>

      {/* Single Column Sequence */}
      <div className="max-w-[1200px] mx-auto flex flex-col gap-32 md:gap-48">
        {projects.map((project) => (
          <WorkCard key={project.slug} project={project} onOpen={onOpenCaseStudy} />
        ))}
      </div>
    </section>
  );
}

interface Project {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  /** Product screens; without one the card shows `highlights` instead */
  image?: string;
  highlights?: string[];
  color: string;
  accentColors: string[];
  textColor: "text-white" | "text-black";
  href?: string;
}

function WorkCard({ project, onOpen }: { project: Project; onOpen?: (slug: string) => void }) {
  const cardRef = useRef(null);
  const isDark = project.textColor === 'text-white';
  const isInteractive = Boolean(project.href);

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

  const buttonBase = `flex items-center gap-4 md:gap-6 px-6 md:px-10 py-3 md:py-5 rounded-full border-2 ${isDark ? 'border-white' : 'border-black'} w-fit`;

  return (
    <motion.article
      ref={cardRef}
      style={{ opacity, y }}
      className={`group relative w-full min-h-[550px] md:h-[700px] ${project.color} rounded-[30px] md:rounded-[60px] overflow-hidden flex flex-col md:flex-row shadow-2xl py-12 md:py-0`}
    >
      {/* Layout Grid */}
      <div className="flex flex-col md:flex-row w-full h-full p-8 md:p-20 relative z-10">

        {/* Text Side */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h3 className={`font-display text-4xl md:text-8xl ${project.textColor} uppercase tracking-tighter mb-3 md:mb-4 leading-none`}>
            {project.title}
          </h3>
          <p className={`text-[12px] md:text-[14px] font-semibold uppercase tracking-[0.15em] ${project.textColor} mb-5 md:mb-6`}>
            {project.subtitle}
          </p>
          <p className={`text-[14px] md:text-[20px] ${project.textColor} font-medium max-w-[450px] leading-relaxed mb-10 md:mb-12`}>
            {project.description}
          </p>

          {project.href ? (
            <a
              href={project.href}
              onClick={(e) => {
                if (onOpen && !e.metaKey && !e.ctrlKey && !e.shiftKey) {
                  e.preventDefault();
                  onOpen(project.slug);
                }
              }}
              className={`${buttonBase} group/btn hover:bg-black transition-all duration-300 after:absolute after:inset-0 after:content-[''] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4`}
            >
              <span aria-hidden="true" className={`w-8 md:w-10 h-[2px] ${isDark ? 'bg-white' : 'bg-black'} group-hover/btn:bg-white transition-colors`} />
              <span className={`font-display text-base md:text-xl uppercase tracking-tight ${project.textColor} group-hover/btn:text-white transition-colors`}>
                View case study<span className="sr-only">: {project.title}</span>
              </span>
            </a>
          ) : (
            <div className={buttonBase}>
              <span className={`font-display text-base md:text-xl uppercase tracking-tight ${project.textColor}`}>
                Case study coming soon
              </span>
            </div>
          )}
        </div>

        {/* Visual Side */}
        <div className="w-full md:w-1/2 flex items-center justify-center md:justify-end mt-12 md:mt-0 relative">
          {project.image ? (
            <div className={`relative w-full md:w-[130%] transform ${isInteractive ? 'group-hover:scale-105' : ''} transition-transform duration-700 ease-out translate-x-0 md:translate-x-12`}>
              <img
                src={project.image}
                alt={`${project.title} product screens`}
                width={2000}
                height={2000}
                loading="lazy"
                className="w-full h-auto drop-shadow-3xl rounded-xl"
              />
            </div>
          ) : (
            <ul className={`w-full md:max-w-[420px] flex flex-col border-t ${isDark ? 'border-white/30' : 'border-black/30'}`}>
              {project.highlights?.map((item) => (
                <li key={item} className={`font-display text-2xl md:text-4xl uppercase tracking-tight leading-tight py-4 md:py-6 border-b ${isDark ? 'border-white/30' : 'border-black/30'} ${project.textColor}`}>
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Signature Stacked Borders */}
      <div className="absolute bottom-0 left-0 w-full flex flex-col z-20" aria-hidden="true">
         <div className="h-4 w-full bg-black/5" />
         <div className={`h-5 w-full ${project.accentColors[0]}`} />
         <div className={`h-5 w-full ${project.accentColors[1]}`} />
         <div className={`h-5 w-full ${project.accentColors[2]}`} />
      </div>

      {/* Hover Overlay Gradient */}
      <div className={`absolute inset-0 bg-black/5 opacity-0 ${isInteractive ? 'group-hover:opacity-100' : ''} transition-opacity duration-500 pointer-events-none`} />
    </motion.article>
  );
}
