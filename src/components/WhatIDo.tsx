import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { RevealText } from './RevealText';

const services = [
  {
    title: "Design leadership",
    body: "Lead small design teams through critique, reviews, and clear standards, and keep design, product, and engineering moving in the same direction.",
    tags: ["Team leadership", "Critique", "Mentoring", "Design ops"]
  },
  {
    title: "Product design",
    body: "End-to-end product design for SaaS, fintech, and consumer products, from the first flow to the shipped release.",
    tags: ["Mobile", "Web apps", "Dashboards", "Prototyping"]
  },
  {
    title: "Government portals",
    body: "Bilingual web portals for UAE government and regulated-sector clients, where clarity carries legal and financial weight.",
    tags: ["VARA", "Bilingual EN / AR", "Licensing flows", "Responsive systems"]
  },
  {
    title: "Design systems",
    body: "Build and govern design systems with tokens, component libraries, and documentation that engineering can ship from and extend.",
    tags: ["Tokens", "Components", "Documentation", "Handoff"]
  },
  {
    title: "Discovery and research",
    body: "Run interviews, usability tests, and pricing experiments to decide what to build, what to test, and what to launch first.",
    tags: ["Interviews", "Usability tests", "A/B tests", "Pricing"]
  }
];

export function WhatIDo() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="what-i-do" className="bg-[#E5E1DA] text-black pt-24 md:pt-40 pb-20 md:pb-32">
      <div className="px-6 md:px-20 flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-20">
        <h2 className="font-display text-[16vw] md:text-[200px] leading-[0.8] tracking-tighter uppercase">
          <RevealText text="What I do" />
        </h2>
        <p className="text-[15px] md:text-[18px] leading-[1.6] text-black/75 max-w-[340px] md:pb-4">
          Five things teams bring me in for. Hover or tap a row for the detail.
        </p>
      </div>

      <ul className="border-b border-black/20">
        {services.map((service, index) => {
          const isOpen = open === index;
          return (
            <li key={service.title} className="border-t border-black/20">
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : index)}
                onPointerEnter={(e) => { if (e.pointerType === 'mouse') setOpen(index); }}
                onPointerLeave={(e) => { if (e.pointerType === 'mouse') setOpen(null); }}
                className="relative w-full text-left px-6 md:px-20 py-8 md:py-10 overflow-hidden block"
              >
                {/* Sweep fill */}
                <motion.span
                  aria-hidden="true"
                  className="absolute inset-0 bg-black origin-bottom"
                  initial={false}
                  animate={{ scaleY: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                />
                <span className={`relative flex items-center gap-6 md:gap-12 transition-colors duration-300 ${isOpen ? 'text-white' : 'text-black'}`}>
                  <span className="text-[12px] md:text-[14px] font-semibold tracking-[0.2em] w-8 shrink-0">{String(index + 1).padStart(2, '0')}</span>
                  <motion.span
                    className="font-display text-[10vw] md:text-[96px] leading-[0.95] uppercase tracking-tighter flex-1"
                    animate={{ x: isOpen ? 24 : 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {service.title}
                  </motion.span>
                  <motion.span
                    aria-hidden="true"
                    className={`w-10 h-10 md:w-16 md:h-16 rounded-full border flex items-center justify-center shrink-0 text-xl md:text-3xl ${isOpen ? 'border-[#FF6B35] bg-[#FF6B35] text-black' : 'border-black'}`}
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    +
                  </motion.span>
                </span>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.span
                      className="relative block overflow-hidden"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <span className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 pt-6 md:pt-8 md:pl-20 text-white">
                        <span className="block text-[16px] md:text-[20px] leading-[1.6]">{service.body}</span>
                        <span className="flex flex-wrap gap-2 content-start">
                          {service.tags.map((tag) => (
                            <span key={tag} className="px-4 py-2 rounded-full border border-white/40 text-[12px] font-semibold uppercase tracking-widest">{tag}</span>
                          ))}
                        </span>
                      </span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
