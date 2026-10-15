import { motion, useMotionValue, useMotionValueEvent, useScroll, useTransform } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { RevealText } from './RevealText';

const quickFacts = [
  { label: "Based in", value: "Dubai, UAE" },
  { label: "Experience", value: "7+ years" },
  { label: "Education", value: "BA, Visual Communication Design" },
  { label: "Languages", value: "English, Urdu" },
  { label: "Currently", value: "Design Specialist, MBLM" },
  { label: "Open to", value: "Lead, Design Manager roles" },
];

// Titles and dates follow LinkedIn (source of truth).
const experiences = [
  {
    years: "'18–'19",
    roles: [{ title: "UX Designer", dates: "September 2018 – November 2019" }],
    roleColor: "bg-[#C62828]",
    company: "TRUEBILL (NOW ROCKET MONEY)",
    current: false,
    description: "Ran 30+ usability and validation studies across account linking, subscription detection, and transactions. Improved financial data accuracy by 22% and reduced account-linking drop-offs by 18%.",
    logo: "Rocket Money",
    logoUrl: "/images/timeline-01.webp"
  },
  {
    years: "'18–'23",
    roles: [
      { title: "Senior Product Designer", dates: "January 2022 – September 2023" },
      { title: "User Experience Designer", dates: "September 2019 – December 2021" },
      { title: "Junior UX Designer", dates: "May 2018 – August 2019" }
    ],
    roleColor: "bg-[#D91B87]",
    company: "SALAMS (ACQ. MATCH GROUP)",
    current: false,
    description: "First design hire on a small team building the app from the ground up. Grew into Senior as it scaled past a million users, led the full app redesign, and worked with the founders through the Match Group acquisition in 2023.",
    logo: "Salams",
    logoUrl: "/images/timeline-02.webp"
  },
  {
    years: "'23–'24",
    roles: [
      { title: "Design Manager", dates: "February 2024 – October 2024" },
      { title: "Senior Product Designer", dates: "September 2023 – February 2024" }
    ],
    roleColor: "bg-[#717171]",
    company: "HAURAKI (ZEWST ECOSYSTEM)",
    current: false,
    description: "Managed a team of 2 to 3 designers and set design direction across four products. Shipped Zewst POS to 500+ restaurant merchants and owned the Zewards loyalty platform end to end.",
    logo: "Hauraki",
    logoUrl: "/images/timeline-03.webp"
  },
  {
    years: "'24–'25",
    roles: [{ title: "Product Team Lead", dates: "October 2024 – September 2025" }],
    roleColor: "bg-[#2A7B4B]",
    company: "AXION DYNAMIC",
    current: false,
    description: "Managed a team of 2 to 3 designers. Led product and design for Jobbit, an ERP platform for supply chain operations, from discovery through delivery, and built a scalable Figma design system.",
    logo: "Axion Dynamic",
    logoUrl: "/images/timeline-05.webp"
  },
  {
    years: "'25–'26",
    roles: [{ title: "Product Designer", dates: "October 2025 – March 2026" }],
    roleColor: "bg-[#00798F]",
    company: "UNITA WORLDWIDE",
    current: false,
    description: "Sole designer on a Swiss-headquartered B2B verified business network with offices in Geneva, Tirana, and Dubai. Owned the design system, discovery, and onboarding, and ran pricing tests with the founders.",
    logo: "Unita",
    logoUrl: "/images/timeline-06.webp"
  },
  {
    years: "'26–NOW",
    roles: [{ title: "Design Specialist", dates: "March 2026 – Present" }],
    roleColor: "bg-[#005E6A]",
    company: "MBLM DUBAI",
    current: true,
    description: "Designing government and regulated-sector web portals in the UAE, including VARA, plus an AI product website and product UI.",
    logo: "MBLM",
    logoUrl: "/images/timeline-07.webp"
  }
];

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // 0% - 12%: intro scrolls away, 12% - 95%: timeline sweeps across
  const progress = useTransform(scrollYProgress, [0.16, 0.94], [0, 1], { clamp: true });
  // Slide exactly far enough for the last card to land in view
  const trackRef = useRef<HTMLOListElement>(null);
  // Card i sits at the left edge when progress reaches i / (n - 1)
  const stops = useRef<number[]>([]);
  const maxShift = useMotionValue(0);
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => {
      const items = [...track.children] as HTMLElement[];
      stops.current = items.map((el) => el.offsetLeft - items[0].offsetLeft);
      maxShift.set(stops.current[stops.current.length - 1] ?? 0);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener("resize", measure);
    return () => { ro.disconnect(); window.removeEventListener("resize", measure); };
  }, [maxShift]);
  const x = useTransform([progress, maxShift], ([v]: number[]) => {
    const s = stops.current;
    if (s.length < 2) return 0;
    const pos = v * (s.length - 1);
    const i = Math.min(s.length - 2, Math.floor(pos));
    return -(s[i] + (s[i + 1] - s[i]) * (pos - i));
  });
  const fill = useTransform(progress, (v) => `${v * 100}%`);
  const [active, setActive] = useState(0);
  useMotionValueEvent(progress, "change", (v) => setActive(Math.min(experiences.length - 1, Math.round(v * (experiences.length - 1)))));

  return (
    <section id="about" ref={containerRef} className="relative z-40 h-[500vh] bg-white text-black overflow-x-clip">
      {/* 1. Intro */}
      <div className="w-full max-w-[1300px] mx-auto px-6 md:px-10 pt-16 md:pt-28 pb-16">
        <div className="flex items-center gap-3 mb-6 md:mb-10">
          <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-black" />
          <span className="text-base md:text-xl font-medium tracking-tight">About me</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <h2 className="lg:col-span-8 font-display text-3xl md:text-[56px] leading-[1.2] md:leading-[1.1] uppercase tracking-tighter text-black">
            <RevealText text="I lead design for" /> <RevealText text="products people actually use:" className="text-[#6F6F6F]" delay={0.15} /> <RevealText text="setting direction, growing designers, and" delay={0.3} /> <RevealText text="turning business goals into shipped work." className="text-[#6F6F6F]" delay={0.45} />
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 space-y-6"
          >
            <p className="text-[16px] md:text-[18px] leading-[1.65] text-black/80">
              I'm Umer, a product designer in Dubai. I started in 2018 as the first design hire at Salams, stayed through its acquisition by Match Group, and have since led small design teams and shipped products for fintech, restaurants, B2B networks, and UAE regulators. I'm still hands-on in Figma and React.
            </p>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-4 border-t border-black/10 pt-6 text-[13px]">
              {quickFacts.map((f) => (
                <div key={f.label}>
                  <dt className="text-black/60 uppercase tracking-widest text-[11px] font-semibold mb-1">{f.label}</dt>
                  <dd className="font-semibold">{f.value}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>
      </div>

      {/* 2. Sticky horizontal timeline */}
      <div className="sticky top-0 h-[100svh] flex flex-col overflow-hidden">
        {/* Header bar */}
        <div className="w-full max-w-[1300px] mx-auto px-6 md:px-10 pt-24 md:pt-28 md:[@media(max-height:860px)]:pt-20 flex items-end justify-between gap-6">
          <div>
            <h2 className="font-display text-4xl md:text-[64px] md:[@media(max-height:860px)]:text-[44px] leading-none uppercase tracking-tighter">Experience</h2>
            <p className="text-[12px] md:text-[13px] font-semibold uppercase tracking-[0.2em] text-black/60 mt-2">2018 to now · {experiences.length} roles</p>
          </div>
          <p className="font-display text-3xl md:text-5xl leading-none tabular-nums" aria-hidden="true">
            {String(active + 1).padStart(2, "0")}<span className="text-black/55"> / {String(experiences.length).padStart(2, "0")}</span>
          </p>
        </div>

        {/* Cards */}
        <div className="flex-1 flex items-center min-h-0 py-6">
          <motion.ol ref={trackRef} style={{ x }} className="flex w-max gap-8 md:gap-16 px-6 md:px-[max(2.5rem,calc((100vw-1300px)/2+2.5rem))]" aria-label="Experience">
            {experiences.map((exp, i) => (
              <li
                key={exp.company}
                className="w-[82vw] md:w-[640px] flex-shrink-0"
              >
                <div className="mb-4 md:mb-6 md:[@media(max-height:860px)]:mb-3">
                  <div className="min-w-0">
                    {exp.current && (
                      <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest bg-black text-white px-3 py-1.5 rounded-full mb-3">
                        <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" aria-hidden="true" /> Current
                      </span>
                    )}
                    <p className={`font-display text-[42px] md:text-[96px] md:[@media(max-height:860px)]:text-[64px] leading-none tracking-tighter whitespace-nowrap transition-colors duration-500 ${i === active ? "text-black" : "text-black/55"}`}>{exp.years}</p>
                  </div>
                </div>

                <h3 className="text-[15px] md:text-[20px] font-bold tracking-[0.02em] uppercase mb-1">{exp.company}</h3>
                <ul className="mb-4 space-y-0.5">
                  {exp.roles.map((role) => (
                    <li key={role.title + role.dates} className="text-[12px] md:text-[14px] text-black/70">
                      <span className="font-semibold text-black">{role.title}</span> · {role.dates}
                    </li>
                  ))}
                </ul>

                <p className="text-[13px] md:text-[15px] leading-[1.6] text-black/80 mb-5 md:mb-7 md:[@media(max-height:860px)]:mb-4">{exp.description}</p>

                <div className="w-44 md:w-64 md:[@media(max-height:860px)]:w-40 aspect-[16/10] bg-[#EEEEEE] rounded-2xl md:rounded-3xl overflow-hidden border border-black/[0.06] shadow-sm">
                  <img src={exp.logoUrl} alt={`${exp.logo} logo`} width={476} height={312} className="w-full h-full object-cover" />
                </div>

              </li>
            ))}
          </motion.ol>
        </div>

        {/* Progress rail with year stops */}
        <div className="w-full max-w-[1300px] mx-auto px-6 md:px-10 pb-8 md:pb-12 md:[@media(max-height:860px)]:pb-10">
          <div className="relative h-[2px] bg-black/10">
            <motion.div className="absolute left-0 top-0 h-full bg-black" style={{ width: fill }} />
            <ol className="absolute inset-0 flex justify-between" aria-hidden="true">
              {experiences.map((exp, i) => (
                <li key={exp.company} className="relative">
                  <span className={`block w-3 h-3 -mt-[5px] rounded-full border-2 transition-colors duration-300 ${i <= active ? "bg-black border-black" : "bg-white border-black/30"}`} />
                  <span className={`absolute top-4 whitespace-nowrap text-[10px] md:text-[12px] font-semibold uppercase tracking-widest transition-colors md:left-1/2 md:-translate-x-1/2 ${i === 0 ? "left-0" : i === experiences.length - 1 ? "right-0" : "left-1/2 -translate-x-1/2"} ${i === active ? "text-black" : "hidden md:block text-black/60"}`}>
                    {exp.logo}
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <p className="hidden md:block md:[@media(max-height:860px)]:hidden text-[11px] uppercase tracking-[0.25em] text-black/50 mt-10">Keep scrolling to move through the timeline</p>
        </div>
      </div>
    </section>
  );
}
