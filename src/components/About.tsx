import { motion } from 'motion/react';

// Titles and dates follow LinkedIn (source of truth).
const experiences = [
  {
    years: "'18 to '19",
    dates: "Sep 2018 to Nov 2019",
    role: "UX Designer",
    roleColor: "bg-[#C62828]",
    company: "Truebill (now Rocket Money)",
    description: "Ran 30+ usability and validation studies across account linking, subscription detection, and transactions. Improved financial data accuracy by 22% and reduced account-linking drop-offs by 18%.",
    logoUrl: "/images/timeline-01.webp"
  },
  {
    years: "'18 to '23",
    dates: "May 2018 to Sep 2023",
    role: "Junior UX Designer to Senior Product Designer",
    roleColor: "bg-[#AD1457]",
    company: "Salams (acq. Match Group)",
    description: "Joined as the first design hire on a small team building the app from the ground up, and grew into Senior over five years as it scaled past a million users. Led the full app redesign, ran pricing and feature experiments, and worked with the founders through to the Match Group acquisition in 2023.",
    logoUrl: "/images/timeline-02.webp"
  },
  {
    years: "'23 to '24",
    dates: "Sep 2023 to Oct 2024",
    role: "Senior Product Designer, then Design Manager",
    roleColor: "bg-[#616161]",
    company: "Hauraki (Zewst ecosystem)",
    description: "Managed a team of 2 to 3 designers and set design direction across four products. Shipped Zewst POS to 500+ restaurant merchants, owned the Zewards loyalty platform end to end, and designed Zewst Phone business calling with live transcription.",
    logoUrl: "/images/timeline-03.webp"
  },
  {
    years: "'24 to '25",
    dates: "Oct 2024 to Sep 2025",
    role: "Product Team Lead",
    roleColor: "bg-[#2E7D32]",
    company: "Axion Dynamic",
    description: "Managed a team of 2 to 3 designers. Led product and design for Jobbit, an ERP platform for supply chain operations, from discovery through delivery with the founders and engineering. Built a scalable Figma design system.",
    logoUrl: "/images/timeline-05.webp"
  },
  {
    years: "'25 to '26",
    dates: "Oct 2025 to Mar 2026",
    role: "Product Designer",
    roleColor: "bg-[#00695C]",
    company: "Unita Worldwide",
    description: "Sole designer on a Swiss-headquartered global B2B verified business network with offices in Geneva, Tirana, and Dubai. Owned the design system, the discovery experience, and onboarding, and ran pricing tests with the founders to decide what to launch with.",
    logoUrl: "/images/timeline-06.webp"
  },
  {
    years: "'26 to now",
    dates: "Mar 2026 to present",
    role: "Design Specialist",
    roleColor: "bg-[#37474F]",
    company: "MBLM Dubai",
    description: "Designing bilingual government and enterprise web portals for clients in the UAE, plus an AI product website recognized with two W3 Silver Awards.",
    logoUrl: null
  }
];

export function About() {
  return (
    <section id="about" className="relative z-40 bg-white text-black">
      <div className="w-full max-w-[1200px] mx-auto px-6 pt-12 md:pt-24 pb-16 md:pb-24">
        <div className="flex flex-col lg:flex-row justify-start items-start gap-10 md:gap-24">
          <div className="w-full md:max-w-[760px]">
            <div className="flex items-center gap-3 mb-6 md:mb-10">
              <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-black" />
              <span className="text-base md:text-xl font-medium tracking-tight">About me</span>
            </div>

            <h2 className="font-display text-3xl md:text-[56px] leading-[1.2] md:leading-[1.1] uppercase tracking-tighter text-black">
              I lead design for <span className="text-[#6F6F6F]">products people actually use:</span> setting direction, growing designers, and <span className="text-[#6F6F6F]">turning business goals into shipped work.</span>
            </h2>
          </div>

          <div className="relative w-32 h-32 md:w-64 md:h-64 flex items-center justify-center shrink-0" aria-hidden="true">
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

    </section>
  );
}

export function Experience() {
  return (
    <section id="experience" className="relative z-30 bg-white text-black">
      <div className="w-full max-w-[1200px] mx-auto px-6 pt-8 pb-20 md:pb-32">
        <h2 className="font-display text-4xl md:text-[80px] leading-none uppercase tracking-tighter mb-8 md:mb-14">Experience</h2>
        <ol className="border-t border-black/10">
          {experiences.map((exp) => (
            <motion.li
              key={exp.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 md:grid-cols-[240px_1fr_160px] gap-4 md:gap-10 py-8 md:py-10 border-b border-black/10 items-start"
            >
              <p className="font-display text-4xl md:text-[44px] leading-none tracking-tight uppercase whitespace-nowrap">{exp.years}</p>

              <div>
                <span className={`${exp.roleColor} text-white text-[10px] md:text-[12px] font-semibold px-3 py-1 md:px-4 md:py-1.5 tracking-widest uppercase inline-block mb-3`}>
                  {exp.role}
                </span>
                <h4 className="text-[14px] md:text-[17px] font-semibold tracking-[0.03em] uppercase">{exp.company}</h4>
                <p className="text-[12px] md:text-[13px] text-black/60 mb-3">{exp.dates}</p>
                <p className="text-[14px] md:text-[15px] leading-[1.65] text-black/80 max-w-[640px]">
                  {exp.description}
                </p>
              </div>

              <div className="hidden md:block w-full aspect-[16/10] bg-[#EEEEEE] rounded-[20px] overflow-hidden border border-black/[0.03]">
                {exp.logoUrl ? (
                  <img
                    src={exp.logoUrl}
                    alt={`${exp.company} logo`}
                    width={476}
                    height={312}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center" aria-hidden="true">
                    <span className="font-display text-[14px] uppercase tracking-widest text-black/40">{exp.company}</span>
                  </div>
                )}
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
