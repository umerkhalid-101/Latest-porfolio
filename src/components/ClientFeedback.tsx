import { motion } from 'motion/react';
import { RevealText } from './RevealText';

const logos = [
  { name: "Salams", url: "/images/logo-01.webp" },
  { name: "Zewst", url: "/images/logo-02.webp" },
  { name: "Axion Dynamic", url: "/images/logo-03.webp" },
  { name: "Mailmunch", url: "/images/logo-04.webp" },
  { name: "Cayano", url: "/images/logo-05.webp" },
  { name: "Break Thirty", url: "/images/logo-06.webp" },
];

const testimonials = [
  {
    text: "Umer owned design end-to-end and made the hard calls. Our loyalty platform shipped faster and tighter because he was in the room.",
    variant: "light",
    rotate: -4,
    y: 40
  },
  {
    text: "He ships. Our retention moved 25% after the redesign.",
    variant: "dark",
    rotate: 2,
    y: 0
  },
  {
    text: "The design system he built gave our engineers a real foundation. Consistent, documented, and easy to extend.",
    variant: "light",
    rotate: -1,
    y: 60
  },
  {
    text: "Umer brings research rigor most designers skip. He talked to users, mapped the problem, then shipped the right thing.",
    variant: "dark",
    rotate: 3,
    y: 20
  }
];

function FeedbackCard({ testimonial, index }: { testimonial: typeof testimonials[0], index: number, key?: string | number }) {
  const isDark = testimonial.variant === "dark";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotate: 0 }}
      whileInView={{ 
        opacity: 1, 
        y: window.innerWidth < 768 ? 0 : testimonial.y, 
        rotate: window.innerWidth < 768 ? (index % 2 === 0 ? -1 : 1) : testimonial.rotate 
      }}
      viewport={{ once: true }}
      transition={{ 
        delay: index * 0.1, 
        duration: 0.8, 
        ease: [0.215, 0.61, 0.355, 1] 
      }}
      whileHover={{ 
        y: (window.innerWidth < 768 ? 0 : testimonial.y) - 10,
        rotate: (window.innerWidth < 768 ? 0 : testimonial.rotate) * 0.5,
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      className={`relative w-full max-w-[320px] p-8 md:p-10 rounded-[30px] md:rounded-[40px] shadow-2xl z-10 ${
        isDark ? 'bg-[#71645C] text-white' : 'bg-white text-black'
      }`}
    >
      <span aria-hidden="true" className={`block font-serif text-7xl leading-[0.6] mb-6 ${isDark ? "text-[#FFB13B]" : "text-[#FF6B35]"}`}>&ldquo;</span>
      <p className="text-[18px] md:text-[20px] leading-[1.4] font-medium">
        {testimonial.text}
      </p>
    </motion.div>
  );
}

export function ClientFeedback() {
  return (
    <section id="kind-words" className="bg-white text-black py-20 md:py-40 px-6 md:px-10 overflow-hidden relative">
      {/* Heading Container */}
      <div className="max-w-7xl mx-auto mb-16 md:mb-24 relative flex flex-col items-center text-center">
        <h2 className="font-display text-[12vw] md:text-[180px] leading-[0.8] tracking-tighter uppercase relative">
          <RevealText text="KIND WORDS" />
        </h2>
      </div>

      {/* Lead quote */}
      <motion.figure
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-4xl mx-auto mb-20 md:mb-32 text-center"
      >
        <blockquote className="text-[26px] md:text-[48px] leading-[1.2] md:leading-[1.1] font-medium tracking-tight mb-6 md:mb-10">
          "He was quick to move, easy to work with, and fully dedicated to shipping our product on time and on scope."
        </blockquote>
        <figcaption className="text-[14px] md:text-[17px] text-black/70">Head of Product, SaaS startup</figcaption>
      </motion.figure>

      {/* Cards Container */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row flex-wrap justify-center items-center md:items-start gap-8 md:gap-0 md:-space-x-12 min-h-[400px] md:min-h-[500px]">
        {testimonials.map((testimonial, index) => (
          <FeedbackCard key={index} testimonial={testimonial} index={index} />
        ))}
      </div>

      {/* Teams I've designed with */}
      <div className="max-w-6xl mx-auto mt-24 md:mt-40">
        <p className="text-center text-[12px] md:text-[13px] font-semibold uppercase tracking-[0.2em] text-black/60 mb-8 md:mb-10">Teams I've designed with</p>
        <ul className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
          {logos.map((logo) => (
            <li key={logo.name} className="aspect-square bg-black rounded-2xl flex items-center justify-center p-4 md:p-6">
              <img src={logo.url} alt={`${logo.name} logo`} width={164} height={164} loading="lazy" className="w-full opacity-80" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
