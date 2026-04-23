import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

const logos = [
  { name: "Salams", url: "https://drive.google.com/thumbnail?id=1dg7Y2OFMv9sPvrMzZkSQSdoPFtPQY3Pa&sz=w1000", className: "left-[10%] w-[150px]" },
  { name: "Zwilt", url: "https://drive.google.com/thumbnail?id=1MeZeIq-tZc5thjjJfGteEyscqwlmqOgh&sz=w1000", className: "bottom-[20%] left-[8%] w-[120px]" },
  { name: "AXD", url: "https://drive.google.com/thumbnail?id=1iMQo8Jd5Xj28z7n7PgeI3057cJH8twqI&sz=w1000", className: "top-[30%] right-[10%] w-[110px]" },
  { name: "Mailmunch", url: "https://drive.google.com/thumbnail?id=1pSIF4fQyXrAOhLSenmh5oA0kj9z6-iwX&sz=w1000", className: "top-[45%] right-[20%] w-[130px]" },
  { name: "Cayano", url: "https://drive.google.com/thumbnail?id=1qeG5LfijHLwwea-7ec95hDV53WC0Lj6n&sz=w1000", className: "bottom-[25%] right-[25%] w-[120px]" },
  { name: "Break Thirty", url: "https://drive.google.com/thumbnail?id=1Xcb91nHknORf8FkwoORJSguizQw563Jm&sz=w1000", className: "bottom-[15%] right-[5%] w-[140px]" },
];

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  return (
    <section 
      id="testimonials"
      ref={sectionRef} 
      className="relative w-full min-h-screen bg-black text-white flex items-center justify-center overflow-hidden py-32 md:py-60"
    >
      {/* High-Fidelity Grid Background */}
      <div 
        className="absolute inset-0 opacity-[0.2] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #444 1px, transparent 1px),
            linear-gradient(to bottom, #444 1px, transparent 1px)
          `,
          backgroundSize: 'clamp(40px, 8vw, 100px) clamp(40px, 8vw, 100px)'
        }}
      />
      
      {/* Radial Gradient overlay to fade the grid towards edges */}
      <div className="absolute inset-0 bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_0%,black_90%)] pointer-events-none" />

      {/* Floating Logos - Optimized for Desktop, hidden on small mobile if messy, or regrouped */}
      <div className="absolute inset-0 hidden md:block">
        {logos.map((logo, i) => (
          <motion.div
            key={logo.name}
            className={`absolute z-10 w-56 h-56 bg-black border border-white/10 flex items-center justify-center p-8 ${logo.name === 'Salams' ? 'top-[22%]' : ''} ${logo.className}`}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.8 }}
          >
            <img 
              src={logo.url} 
              alt={logo.name} 
              className="w-full opacity-60 hover:opacity-100 transition-opacity"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        ))}
      </div>

      {/* Mobile Logo Grid */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full px-6 grid grid-cols-3 gap-3 md:hidden z-10">
        {logos.map((logo, i) => (
          <motion.div
            key={logo.name}
            className="aspect-square bg-black border border-white/10 flex items-center justify-center p-4 rounded-xl"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <img src={logo.url} alt={logo.name} className="w-full opacity-40" />
          </motion.div>
        ))}
      </div>

      {/* Top Right Ticker Line - Absolute positioned */}
      <div className="absolute top-0 right-0 border-l border-b border-white/10 px-4 md:px-8 py-3 md:py-4 flex items-center gap-6 md:gap-12 overflow-hidden whitespace-nowrap opacity-40 z-30">
         <div className="flex items-center gap-4">
            <span className="text-[10px] md:text-[12px] uppercase tracking-[0.2em] font-medium">TRUSTED BY INNOVATORS</span>
            <div className="w-1 h-1 rounded-full bg-white/40" />
         </div>
         <div className="hidden md:flex items-center gap-4">
            <span className="text-[12px] uppercase tracking-[0.2em] font-medium">TRUSTED BY TEAMS THAT SHIP</span>
            <div className="w-1 h-1 rounded-full bg-white/40" />
         </div>
      </div>

      {/* Center Testimonial */}
      <div className="relative z-20 max-w-4xl px-6 pt-40 md:pt-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="md:border-l md:border-white/20 md:pl-12 text-center md:text-left"
        >
          <blockquote className="text-[28px] md:text-[52px] leading-[1.2] md:leading-[1.1] font-medium tracking-tight mb-10 md:mb-16">
            "He was quick to move, easy to work with, and fully dedicated to shipping our product on time and on scope."
          </blockquote>
          
          <div className="flex flex-col items-center md:items-start">
            <span className="text-[16px] md:text-[22px] font-bold uppercase tracking-tight">HEAD OF PRODUCT</span>
            <span className="text-[14px] md:text-[18px] text-white/50 font-medium lowercase italic">SaaS Startup</span>
          </div>
        </motion.div>
      </div>

      {/* Decorative lines / accents can be added here if needed to match the grid perfectly */}
    </section>
  );
}
