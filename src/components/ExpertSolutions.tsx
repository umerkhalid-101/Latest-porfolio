import { motion } from 'motion/react';

const services = [
  {
    title: "PRODUCT DESIGN",
    tags: ["USER INTERFACE", "USER EXPERIENCE", "APP DESIGN", "MOBILE-FIRST", "DASHBOARDS", "SAAS DESIGN"],
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "UX RESEARCH",
    tags: ["USER INTERVIEWS", "USABILITY TESTING", "A/B TESTING", "HEURISTIC EVALUATION", "INSIGHT SYNTHESIS", "VALIDATION STUDIES"],
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "DESIGN SYSTEMS",
    tags: ["DESIGN TOKENS", "COMPONENT LIBRARIES", "DOCUMENTATION", "GOVERNANCE", "ENGINEERING HANDOFF", "PATTERN LIBRARIES"],
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "PRODUCT DISCOVERY",
    tags: ["STAKEHOLDER ALIGNMENT", "WIREFRAMING", "RAPID PROTOTYPING", "INFORMATION ARCHITECTURE", "WORKSHOPS"],
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80"
  }
];

export function ExpertSolutions() {
  return (
    <section id="services" className="bg-[#E5E1DA] text-black pt-24 md:pt-40 pb-20 md:pb-24 px-6 md:px-20 min-h-screen">
      {/* Header */}
      <div className="relative mb-20 md:mb-32 border-b border-black/15 pb-12 md:pb-20">
        <div className="flex items-center gap-4 md:gap-x-8 flex-wrap">
          <h2 className="font-display text-[14vw] md:text-[200px] leading-[0.8] tracking-tighter uppercase flex flex-wrap items-center gap-x-4 md:gap-x-8">
            EXPERT 
            <span className="relative inline-block">
              <motion.span 
                initial={{ rotate: 0, scale: 0.8 }}
                whileInView={{ rotate: -6, scale: 1 }}
                viewport={{ once: true }}
                className="absolute -top-10 md:-top-24 left-1/2 -translate-x-1/2 bg-[#FF6B35] text-white text-[10px] md:text-lg font-bold px-4 py-1.5 md:px-6 md:py-2 uppercase tracking-widest whitespace-nowrap shadow-xl z-20"
              >
                5 STAR SERVICES
              </motion.span>
              <span className="relative z-10">SOLUTIONS</span>
            </span>
          </h2>
        </div>
      </div>

      {/* Services List */}
      <div className="space-y-20 md:space-y-32">
        {services.map((service, index) => (
          <motion.div 
            key={index} 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row gap-8 md:gap-24 items-center border-b border-black/5 pb-20 md:pb-32 last:border-0 last:pb-0"
          >
            {/* Content Side */}
            <div className="flex-1 text-center md:text-left">
              <motion.h3 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="font-display text-4xl md:text-8xl tracking-tighter uppercase mb-8 md:mb-12"
              >
                {service.title}
              </motion.h3>
              
              <div className="flex flex-wrap gap-2 md:gap-4 justify-center md:justify-start">
                {service.tags.map((tag, tIdx) => (
                  <motion.span 
                    key={tIdx} 
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + (tIdx * 0.05), duration: 0.4 }}
                    className="px-4 py-1.5 md:px-10 md:py-4 rounded-full bg-white border border-black/10 text-[10px] md:text-[15px] font-bold uppercase tracking-tight hover:bg-black hover:text-white transition-all duration-300 cursor-default shadow-md"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Image Side - Made smaller as per request */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-full md:w-[45%] aspect-[4/3] bg-black/10 rounded-[30px] md:rounded-[40px] overflow-hidden relative group shadow-2xl"
            >
              <img 
                src={service.image} 
                alt={service.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute bottom-8 right-8 w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                 <div className="flex gap-1">
                    <div className="w-1.5 h-6 bg-white/60" />
                    <div className="w-1.5 h-6 bg-white/60" />
                 </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
