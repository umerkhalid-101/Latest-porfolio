import { motion } from 'motion/react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    text: "Umer owned design end-to-end and made the hard calls. Our loyalty platform shipped faster and tighter because he was in the room.",
    stars: 5,
    variant: "light",
    rotate: -4,
    y: 40
  },
  {
    text: "He ships. Our retention moved 25% after the redesign. That's not UX theater, that's product impact.",
    stars: 5,
    variant: "dark",
    rotate: 2,
    y: 0
  },
  {
    text: "The design system he built gave our engineers a real foundation. Consistent, documented, and easy to extend.",
    stars: 5,
    variant: "light",
    rotate: -1,
    y: 60
  },
  {
    text: "Umer brings research rigor most designers skip. He talked to users, mapped the problem, then shipped the right thing.",
    stars: 5,
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
      <div className="flex gap-1 mb-8">
        {[...Array(testimonial.stars)].map((_, i) => (
          <Star 
            key={i} 
            size={20} 
            fill={isDark ? "#F59E0B" : "#FF6B35"} 
            stroke="none" 
          />
        ))}
      </div>
      <p className="text-[18px] md:text-[20px] leading-[1.4] font-medium">
        {testimonial.text}
      </p>
    </motion.div>
  );
}

export function ClientFeedback() {
  return (
    <section className="bg-white text-black py-20 md:py-40 px-6 md:px-10 overflow-hidden relative">
      {/* Heading Container */}
      <div className="max-w-7xl mx-auto mb-20 md:mb-32 relative flex flex-col items-center text-center">
        <h2 className="font-display text-[12vw] md:text-[180px] leading-[0.8] tracking-tighter uppercase relative">
          CLIENTS FEEDBACK
          <span className="absolute left-1/4 top-1/2 -translate-y-1/2 -translate-x-1/2">
             <motion.div 
               initial={{ rotate: -15, scale: 0.8, opacity: 0 }}
               whileInView={{ rotate: -6, scale: 1, opacity: 1 }}
               className="bg-[#FFB13B] text-black text-[8px] md:text-sm font-bold px-4 py-1 md:px-6 md:py-2 uppercase tracking-widest whitespace-nowrap shadow-lg"
             >
               5 STAR SERVICES
             </motion.div>
          </span>
        </h2>
      </div>

      {/* Cards Container */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row flex-wrap justify-center items-center md:items-start gap-8 md:gap-0 md:-space-x-12 min-h-[400px] md:min-h-[500px]">
        {testimonials.map((testimonial, index) => (
          <FeedbackCard key={index} testimonial={testimonial} index={index} />
        ))}
      </div>
    </section>
  );
}
