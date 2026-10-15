import { motion } from 'motion/react';

const services = [
  {
    title: "Design leadership",
    body: "Lead small design teams through critique, reviews, and clear standards, and keep design, product, and engineering moving in the same direction."
  },
  {
    title: "Product design",
    body: "End-to-end product design for SaaS, fintech, consumer, and government products, from the first flow to the shipped release."
  },
  {
    title: "Design systems",
    body: "Build and govern design systems with tokens, component libraries, and documentation that engineering can ship from and extend."
  },
  {
    title: "Discovery and research",
    body: "Run interviews, usability tests, and pricing experiments to decide what to build, what to test, and what to launch first."
  }
];

export function WhatIDo() {
  return (
    <section id="what-i-do" className="bg-[#E5E1DA] text-black pt-24 md:pt-40 pb-20 md:pb-32 px-6 md:px-20">
      {/* Header */}
      <div className="relative mb-16 md:mb-24 border-b border-black/15 pb-12 md:pb-20">
        <h2 className="font-display text-[14vw] md:text-[200px] leading-[0.8] tracking-tighter uppercase">
          What I do
        </h2>
      </div>

      {/* Services List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-14 md:gap-y-20">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: (index % 2) * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="border-t border-black/15 pt-8"
          >
            <span className="text-[12px] font-semibold tracking-[0.2em] text-black/60 block mb-4">{String(index + 1).padStart(2, '0')}</span>
            <h3 className="font-display text-4xl md:text-6xl tracking-tighter uppercase mb-5">
              {service.title}
            </h3>
            <p className="text-[16px] md:text-[19px] leading-[1.6] text-black/80 max-w-[520px]">
              {service.body}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
