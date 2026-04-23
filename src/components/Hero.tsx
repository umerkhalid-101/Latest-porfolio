import { motion } from 'motion/react';
import { Linkedin, Instagram } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative z-10 h-screen flex flex-col justify-between overflow-hidden bg-[#FE330A]">
      
      {/* 1. Image Layer (Now truly Edge-to-Edge) */}
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 z-10"
      >
        <img 
          src="https://lh3.googleusercontent.com/d/1VmxvQtIFNifHleEW9iRP0U44O9IVPfzB" 
          alt="Muhammad Umer VR" 
          className="w-full h-full object-cover object-center select-none"
          referrerPolicy="no-referrer"
        />
        {/* Subtle overlay to help text legibility if needed, but keeping it direct as per brutalist style */}
        <div className="absolute inset-0 bg-black/10" />
      </motion.div>

      {/* 2. MUHAMMAD UMER Title (Smaller and at the Top) */}
      <div className="absolute top-[17%] left-0 w-full flex justify-center z-20 pointer-events-none px-4 md:-mt-[10px] overflow-hidden">
        <motion.h1 
          className="font-display text-[12vw] md:text-[14vw] leading-none tracking-[-0.04em] uppercase text-white whitespace-nowrap drop-shadow-2xl flex"
        >
          {"MUHAMMAD UMER".split("").map((char, index) => (
            <motion.span
              key={index}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ 
                duration: 1, 
                delay: 0.5 + index * 0.03, 
                ease: [0.16, 1, 0.3, 1] 
              }}
              style={{ display: char === " " ? "inline-block" : "block", minWidth: char === " " ? "3vw" : "auto" }}
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>
      </div>

      {/* 3. Global Information Overlays (Dubai, Bio, Footer) */}
      <div className="relative z-30 flex-1 flex flex-col justify-between px-6 md:px-14 py-20 md:py-32 h-full">
        
        {/* Top Info Row (Dubai and Bio) */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full max-w-[1800px] mx-auto flex-1 md:pt-60">
          {/* BASED IN DUBAI */}
          <motion.div 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="w-full md:w-1/2 pt-20 md:pt-0"
          >
            <h2 className="font-display text-4xl md:text-[5.5vw] leading-[1.1] uppercase tracking-tight text-white drop-shadow-lg">
              Based in<br />Dubai, UAE
            </h2>
          </motion.div>

          {/* BIO TEXT */}
          <motion.div 
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="w-full md:w-[28%] mt-12 md:mt-0 flex md:justify-end"
          >
            <p className="text-[9px] md:text-[11px] font-medium leading-[1.6] tracking-[0.2em] uppercase text-white max-w-[340px] drop-shadow-md">
              A SENIOR PRODUCT DESIGNER SHIPPING SAAS, FINTECH, AND CONSUMER APPS FOR GLOBAL TEAMS SINCE 2018. END-TO-END OWNERSHIP FROM DISCOVERY TO DELIVERY.
            </p>
          </motion.div>
        </div>

        {/* Footer Area (Socials and Stats) */}
        <div className="w-full flex flex-col gap-8 md:flex-row justify-between items-start md:items-end">
          {/* Socials */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex items-center gap-6"
          >
            <div className="flex items-center gap-4">
              <span className="text-[10px] md:text-[11px] font-semibold tracking-widest uppercase text-white/90">Follow us</span>
              <div className="h-[1px] w-8 md:w-12 bg-white/40" />
            </div>
            <div className="flex gap-4">
              <a href="https://www.linkedin.com/in/umar-khalid1/" target="_blank" rel="noopener noreferrer" className="text-white hover:opacity-70 transition-opacity"><Linkedin size={18} /></a>
              <a href="https://www.instagram.com/umar_khalid1" target="_blank" rel="noopener noreferrer" className="text-white hover:opacity-70 transition-opacity"><Instagram size={18} /></a>
            </div>
          </motion.div>

          {/* Stats and Pixel Grid */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="flex items-center gap-6 md:gap-8"
          >
            {/* Pixel Grid 4x4 */}
            <div className="grid grid-cols-4 gap-1">
              {[
                0, 0, 0, 1,
                0, 0, 1, 1,
                0, 1, 1, 1,
                1, 0, 1, 1
              ].map((v, i) => (
                <div key={i} className={`w-1 h-1 md:w-1.5 md:h-1.5 ${v ? 'bg-white' : 'bg-white/20'}`} />
              ))}
            </div>
            <div className="flex flex-col items-start">
              <span className="font-display text-4xl md:text-6xl leading-none uppercase tracking-tighter text-white">500K+</span>
              <span className="text-[8px] md:text-[10px] font-semibold tracking-[0.2em] md:tracking-[0.3em] uppercase text-white/90 leading-tight">
                USERS REACHED ACROSS<br />SHIPPED PRODUCTS
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
