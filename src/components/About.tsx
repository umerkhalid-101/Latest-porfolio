import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // More nuanced scroll: 
  // 0% - 15%: Heading moves up/off
  // 15% - 100%: Timeline sweeps across
  const x = useTransform(scrollYProgress, [0.15, 0.95], ["0%", "-82%"]);

  const experiences = [
    {
      years: "'18 — '19",
      role: "UX DESIGNER",
      roleColor: "bg-[#E94336]",
      company: "ROCKET MONEY",
      description: "Ran 30+ usability and validation studies across key flows. Focused on account linking, subscription detection, and transactions. Improved financial data accuracy by 22%. Reduced account-linking drop-offs by 18%.",
      logo: "Rocket Money",
      logoUrl: "https://drive.google.com/thumbnail?id=1gat-SXd5zqD_ptXcoWTb00iS68KIMVCz&sz=w1000"
    },
    {
      years: "'18 — '23 —",
      role: "SENIOR PRODUCT DESIGNER",
      roleColor: "bg-[#D91B87]",
      company: "SALAMS (ACQ. MATCH GROUP)",
      description: "SALAMS (ACQ. MATCH GROUP) First design hire. Grew into Senior over five years on a Muslim dating app serving millions. Led the full app redesign through the Match Group acquisition in 2023. Owned onboarding, matching, chat, profile cards etc",
      logo: "Salams",
      logoUrl: "https://drive.google.com/thumbnail?id=1HK0mt17u_KqSSN1VezhF7ftPrgRKCU6R&sz=w1000"
    },
    {
      years: "'23 — '24",
      role: "DESIGN MANAGER",
      roleColor: "bg-[#717171]",
      company: "HAURAKI (ZEWST ECOSYSTEM)",
      description: "Shipped Zewst POS to 500+ restaurant merchants. Owned Zewards loyalty platform end-to-end across merchant app, customer wallet, and Apple/Google Wallet. Designed Zewst Phone business comms with live transcription",
      logo: "Hauraki",
      logoUrl: "https://drive.google.com/thumbnail?id=1HvoNvX7moDNVvPe7-2pj0Q9s65bxIoe7&sz=w1000"
    },
    {
      years: "'24 — '25",
      role: "HEAD OF DESIGN",
      roleColor: "bg-[#2A7B4B]",
      company: "FOLIONOMICS",
      description: "Owned design strategy end-to-end for a crypto portfolio platform. Unified wallet view across EVM, Bitcoin, Solana, and 60+ chains. Retention lifted 25% after the unified view shipped.",
      logo: "Folionomics",
      logoUrl: "https://drive.google.com/thumbnail?id=1S0DzdRHwxSPF_nC523aXvOQ-4S7sHBGj&sz=w1000"
    },
    {
      years: "2025 —",
      role: "LEAD PRODUCT DESIGNER",
      roleColor: "bg-[#009BB8]",
      company: "AXION DYNAMIC",
      description: "Led end-to-end design for Jobbit, an ERP platform for supply chain operations. Built a scalable Figma design system and turned complex workflows into clear, usable interfaces.",
      logo: "Axion Dynamic",
      logoUrl: "https://drive.google.com/thumbnail?id=1f-buVskYSHUz43of9RL_KCK8v-PqcQVG&sz=w1000"
    },
    {
      years: "'26 — NOW",
      role: "LEAD PRODUCT MANAGER",
      roleColor: "bg-[#005E6A]",
      company: "UNITA",
      description: "Sole designer on a pre-launch B2B marketplace for UAE/GCC. Shipped design system from scratch with a dark teal and burnt orange language. Owning 10+ modules across 30 to 50 screens.",
      logo: "Unita",
      logoUrl: "https://drive.google.com/thumbnail?id=1uDFIVIFQipX_eSOUSPezG6D1ScVNMmUG&sz=w1000"
    }
  ];

  return (
    <section id="about" ref={containerRef} className="relative z-40 h-[450vh] bg-white text-black">
      {/* 1. Header Section - Flows naturally with the scroll at first */}
      <div className="w-full max-w-[1200px] mx-auto px-6 pt-12 md:pt-24 pb-12">
        <div className="flex flex-col lg:flex-row justify-start items-start gap-10 md:gap-24">
          <div className="w-full md:max-w-[700px]">
            <div className="flex items-center gap-3 mb-6 md:mb-10">
              <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-black" />
              <span className="text-base md:text-xl font-medium tracking-tight">About me</span>
            </div>
            
            <h2 className="font-display text-3xl md:text-[56px] leading-[1.2] md:leading-[1.1] uppercase tracking-tighter text-black">
              UMER IS <span className="text-[#6F6F6F]">A PRODUCT DESIGNER</span> BUILDING CLEAR, <span className="text-[#6F6F6F]">USABLE INTERFACES</span> FOR EVERY SCREEN USERS ACTUALLY SHOW UP ON.
            </h2>
          </div>

          <div className="relative w-32 h-32 md:w-64 md:h-64 flex items-center justify-center shrink-0">
            <div className="relative w-full h-full transform scale-90 md:scale-100">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full rotate-[45deg]">
                 <div className="absolute top-[18%] left-1/2 -translate-x-1/2 w-[20%] h-[40%] bg-[#F5F5F5] rounded-full" />
                 <div className="absolute bottom-[18%] left-1/2 -translate-x-1/2 w-[20%] h-[40%] bg-[#F5F5F5] rounded-full" />
                 <div className="absolute left-[18%] top-1/2 -translate-y-1/2 w-[40%] h-[20%] bg-[#F5F5F5] rounded-full" />
                 <div className="absolute right-[18%] top-1/2 -translate-y-1/2 w-[40%] h-[20%] bg-[#F5F5F5] rounded-full" />
                 <div className="absolute top-[28%] right-[28%] w-[20%] h-[40%] bg-[#FF6B35] rounded-full shadow-lg" />
                 <div className="absolute bottom-[28%] left-[28%] w-[20%] h-[40%] bg-[#E94336] rounded-full shadow-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Sticky Horizontal Timeline Section */}
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-12 md:gap-32 px-[10vw]">
          {experiences.map((exp, idx) => (
            <div key={idx} className="w-[280px] md:w-[600px] flex-shrink-0">
              <div className="mb-6 md:mb-8">
                <h3 className="font-display text-6xl md:text-[150px] leading-none mb-6 md:mb-10 tracking-tighter">{exp.years}</h3>
                <div className="flex">
                  <span className={`${exp.roleColor} text-white text-[10px] md:text-[14px] font-semibold px-4 py-1.5 md:px-6 md:py-2 tracking-widest uppercase inline-block`}>
                    {exp.role}
                  </span>
                </div>
              </div>
              
              <div className="h-[1px] bg-black/10 w-full mb-6 md:mb-10" />
              
              <div className="mb-8 md:mb-12 max-w-[480px]">
                <h4 className="text-[12px] md:text-[16px] font-semibold tracking-[0.05em] mb-2 md:mb-4 uppercase">{exp.company}</h4>
                <p className="text-[12px] md:text-[15px] leading-[1.6] md:leading-[1.65] text-black/80 font-sans">
                  {exp.description}
                </p>
              </div>
              
              <div className="w-full aspect-[16/10] bg-[#EEEEEE] rounded-[30px] md:rounded-[50px] overflow-hidden shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)] group transition-all duration-500 border border-black/[0.03]">
                {exp.logoUrl ? (
                  <img 
                    src={exp.logoUrl} 
                    alt={exp.company} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-12">
                    <div className="flex flex-col items-center gap-4 opacity-20 group-hover:opacity-40 transition-opacity">
                       <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-black flex items-center justify-center">
                          <span className="font-display text-2xl md:text-3xl">{exp.logo.charAt(0)}</span>
                       </div>
                       <span className="font-display text-[14px] md:text-[16px] uppercase tracking-widest">{exp.logo}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
