import { motion } from 'framer-motion';

export function Contact() {
  const socialLinks = ['FIGMA', 'DRIBBBLE', 'LINKEDIN', 'X (TWITTER)'];

  return (
    <section id="contact" className="relative w-full bg-black text-white pt-32 pb-12 px-6 md:px-20 overflow-hidden">
      {/* Main Content */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-40">
        <h2 className="font-display text-[15vw] md:text-[220px] leading-[0.8] text-white uppercase tracking-tighter">
          QUESTIONS?
        </h2>
        
        <div className="mt-12 md:mt-0 flex flex-col items-end">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-12 py-6 bg-white text-black rounded-full overflow-hidden transition-colors"
          >
            <span className="relative z-10 font-display text-2xl md:text-3xl uppercase tracking-tight">LET'S TALK</span>
            <div className="absolute inset-0 bg-[#FF6B35] transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
          </motion.button>
        </div>
      </div>

      {/* Footer Area */}
      <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/10 gap-8">
        <div className="flex items-center gap-8">
          {socialLinks.map((link) => (
            <a 
              key={link} 
              href="#" 
              className="text-[12px] md:text-sm font-medium tracking-widest text-white/40 hover:text-white transition-colors"
            >
              {link}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4 text-[12px] md:text-sm font-medium text-white/20">
          <span>© 2024</span>
          <div className="w-1 h-1 rounded-full bg-white/20" />
          <span>ALL RIGHTS RESERVED</span>
        </div>
      </div>

      {/* Background Accent - Very subtle orange glow in corner */}
      <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-[#FF6B35]/10 blur-[150px] rounded-full pointer-events-none" />
    </section>
  );
}
