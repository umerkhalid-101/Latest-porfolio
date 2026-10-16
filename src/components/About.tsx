import { motion, useMotionValue, useMotionValueEvent, useScroll, useTransform } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { RevealText } from './RevealText';
import { scrollToSmooth } from '../lib/smoothScroll';

// Section scroll progress where the horizontal sweep starts and ends
// END < 1 leaves a pause on the last ticket before the page scrolls on
const START = 0.06;
const END = 0.84;

const quickFacts = [
  { label: "Based in", value: "Dubai, UAE" },
  { label: "Experience", value: "7+ years" },
  { label: "Education", value: "BA, Visual Communication Design" },
  { label: "Languages", value: "English, Urdu" },
  { label: "Currently", value: "Design Specialist, MBLM" },
  { label: "Open to", value: "Lead, Design Manager roles" },
];

// Titles, dates, durations and locations follow LinkedIn (source of truth).
type Role = { title: string; dates: string; duration?: string };
type Experience = {
  years: string;
  company: string;
  /** Short name and optional subtitle for the ticket */
  name: string;
  tagline?: string;
  /** Three-letter ticket code and the travel details printed on the pass */
  code: string;
  from: string;
  to: string;
  span: string;
  path: string;
  location?: string;
  total?: string;
  roles: Role[];
  description: string;
  logo: string;
  logoUrl: string;
  /** Brand panel colour, and the light tint the whole section takes on while this role is active */
  panel: string;
  tint: string;
  current?: boolean;
  caseStudy?: string;
};

const experiences: Experience[] = [
  {
    years: "'18–'19",
    company: "Truebill (now Rocket Money)",
    name: "Truebill", tagline: "Now Rocket Money",
    code: "TRB", from: "Sep 2018", to: "Nov 2019", span: "1y 3m", path: "UX Designer",
    location: "California, United States",
    roles: [{ title: "UX Designer", dates: "September 2018 – November 2019", duration: "1 year 3 months" }],
    description: "Ran 30+ usability and validation studies across account linking, subscription detection, and transactions. Improved financial data accuracy by 22% and reduced account-linking drop-offs by 18%.",
    logo: "Rocket Money",
    logoUrl: "/images/timeline-01.webp",
    panel: "#C62828",
    tint: "#F3EEE6"
  },
  {
    years: "'18–'23",
    company: "Salams (acq. Match Group)",
    name: "Salams", tagline: "Acquired by Match Group",
    code: "SLM", from: "May 2018", to: "Sep 2023", span: "5y 5m", path: "Junior → Senior",
    total: "5 years 5 months",
    roles: [
      { title: "Senior Product Designer", dates: "January 2022 – September 2023", duration: "1 year 9 months" },
      { title: "User Experience Designer", dates: "September 2019 – December 2021", duration: "2 years 4 months" },
      { title: "Junior UX Designer", dates: "May 2018 – August 2019", duration: "1 year 4 months" }
    ],
    description: "First design hire on a small team building the app from the ground up. Grew into Senior as it scaled past a million users, led the full app redesign, and worked with the founders through the Match Group acquisition.",
    logo: "Salams",
    logoUrl: "/images/timeline-02.webp",
    panel: "#D91B87",
    tint: "#F6ECEF",
    caseStudy: "/salams-casestudy"
  },
  {
    years: "'23–'24",
    company: "Hauraki (Zewst ecosystem)",
    name: "Hauraki", tagline: "Zewst ecosystem",
    code: "HRK", from: "Sep 2023", to: "Oct 2024", span: "1y 2m", path: "Senior → Manager",
    location: "Lahore, Pakistan",
    total: "1 year 2 months",
    roles: [
      { title: "Design Manager", dates: "February 2024 – October 2024", duration: "9 months" },
      { title: "Senior Product Designer", dates: "September 2023 – February 2024", duration: "6 months" }
    ],
    description: "Led the design team and set design direction across four products. Shipped Zewst POS to 500+ restaurant merchants and owned the Zewards loyalty platform end to end.",
    logo: "Hauraki",
    logoUrl: "/images/timeline-03.webp",
    panel: "#A3E635",
    tint: "#EFF2E2",
    caseStudy: "/zewards-casestudy"
  },
  {
    years: "'24–'25",
    company: "Axion Dynamic",
    name: "Axion Dynamic",
    code: "AXD", from: "Oct 2024", to: "Sep 2025", span: "1y", path: "Team Lead",
    location: "Lahore, Pakistan",
    roles: [{ title: "Product Team Lead", dates: "October 2024 – September 2025", duration: "1 year" }],
    description: "Led product and design for Jobbit, an ERP platform for supply chain operations, from discovery through delivery, and built a scalable Figma design system.",
    logo: "Axion Dynamic",
    logoUrl: "/images/timeline-05.webp",
    panel: "#2A7B4B",
    tint: "#E9F0EB"
  },
  {
    years: "'25–'26",
    company: "Unita Worldwide",
    name: "Unita Worldwide",
    code: "UNT", from: "Oct 2025", to: "Mar 2026", span: "6m", path: "Product Designer",
    location: "Dubai, United Arab Emirates",
    roles: [{ title: "Product Designer", dates: "October 2025 – March 2026", duration: "6 months" }],
    description: "Sole designer on a Swiss-headquartered B2B verified business network with offices in Geneva, Tirana, and Dubai. Owned the design system, discovery, and onboarding, and ran pricing tests with the founders.",
    logo: "Unita",
    logoUrl: "/images/timeline-06.webp",
    panel: "#0A4D4D",
    tint: "#E6EEEE",
    caseStudy: "/unita-casestudy"
  },
  {
    years: "'26–Now",
    company: "MBLM Dubai",
    name: "MBLM",
    code: "MBL", from: "Mar 2026", to: "Now", span: "Ongoing", path: "Design Specialist",
    location: "Dubai, United Arab Emirates",
    roles: [{ title: "Design Specialist", dates: "March 2026 – Present" }],
    description: "Designing government and regulated-sector web portals in the UAE, including VARA, plus an AI product website and product UI.",
    logo: "MBLM",
    logoUrl: "/images/timeline-07.webp",
    panel: "#111111",
    tint: "#ECEAE6",
    current: true,
    caseStudy: "/vara-casestudy"
  }
];

export function About() {
  // Progress is measured over the pinned timeline only, not the intro above it
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // 0% - 12%: intro scrolls away, 12% - 95%: timeline sweeps across
  const progress = useTransform(scrollYProgress, [START, END], [0, 1], { clamp: true });
  // Slide exactly far enough for the last card to land in view
  const trackRef = useRef<HTMLOListElement>(null);
  // Card i sits at the left edge when progress reaches i / (n - 1)
  const stops = useRef<number[]>([]);
  const maxShift = useMotionValue(0);
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => {
      // Stop i centres ticket i in the viewport (layout offsets ignore the tilt transforms)
      const items = [...track.children] as HTMLElement[];
      const firstLeft = (track.parentElement?.getBoundingClientRect().left ?? 0) + parseFloat(getComputedStyle(track).paddingLeft);
      stops.current = items.map((el) => firstLeft + (el.offsetLeft - items[0].offsetLeft) + el.offsetWidth / 2 - window.innerWidth / 2);
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
  const tint = useTransform(progress, experiences.map((_, i) => i / (experiences.length - 1)), experiences.map((e) => e.tint));
  const [active, setActive] = useState(0);

  // Scroll so role i is the one in view
  const goTo = (i: number) => {
    const el = containerRef.current;
    if (!el) return;
    const range = el.offsetHeight - window.innerHeight;
    const t = START + (i / (experiences.length - 1)) * (END - START);
    scrollToSmooth(el.getBoundingClientRect().top + window.scrollY + t * range);
  };
  useMotionValueEvent(progress, "change", (v) => setActive(Math.min(experiences.length - 1, Math.round(v * (experiences.length - 1)))));

  return (
    <section id="about" className="relative z-40 bg-white text-black overflow-x-clip">
      {/* 1. Intro */}
      <div className="w-full max-w-[1300px] mx-auto px-6 md:px-10 pt-16 md:pt-28 pb-16">
        <div className="flex items-center gap-3 mb-6 md:mb-10">
          <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-brand" />
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
      <div ref={containerRef} id="experience" className="relative h-[320vh]">
      <motion.div className="sticky top-0 h-[100svh] flex flex-col overflow-hidden" style={{ backgroundColor: tint, ["--ticket-bg" as string]: tint }}>
        {/* Header bar */}
        <div className={`w-full max-w-[1300px] mx-auto px-6 md:px-10 pt-20 md:pt-28 [@media(max-height:700px)]:pt-[72px] md:[@media(max-height:860px)]:pt-20 flex items-end justify-between gap-6`}>
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-brand" aria-hidden="true" />
              <span className="text-base md:text-xl font-medium tracking-tight">Experience</span>
            </div>
            <h2 className="font-display text-[9vw] md:text-[48px] lg:text-[clamp(36px,5.4vh,56px)] leading-[0.95] uppercase tracking-tighter">
              May 2018 to now <span className="text-[#6F6F6F]">· six companies</span>
            </h2>
          </div>
          <p className="font-display text-3xl md:text-5xl leading-none tabular-nums whitespace-nowrap" aria-hidden="true">
            {String(active + 1).padStart(2, "0")}<span className="text-black/55"> / {String(experiences.length).padStart(2, "0")}</span>
          </p>
        </div>

        {/* Tickets */}
        <div className="flex-1 flex items-center min-h-0 py-4">
          <motion.ol ref={trackRef} style={{ x }} className="flex items-stretch w-max gap-5 md:gap-8 px-6 md:px-[max(2.5rem,calc((100vw-1300px)/2+2.5rem))]" aria-label="Experience">
            {experiences.map((exp, i) => (
              <motion.li
                key={exp.company}
                animate={{ y: i === active ? -12 : 0, rotate: i === active ? 0 : (i % 2 ? 1.5 : -1.5) }}
                whileHover={{ y: -18, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 22 }}
                className="flex-shrink-0 flex"
              >
                <Ticket exp={exp} index={i} total={experiences.length} active={i === active} />
              </motion.li>
            ))}
          </motion.ol>
        </div>

        {/* Year scrubber: click a stop to jump to that role */}
        <div className={`w-full max-w-[1300px] mx-auto px-6 md:px-10 pb-9 md:pb-12 md:[@media(max-height:860px)]:pb-9`}>
          <div className="relative h-[2px] bg-black/10">
            <motion.div className="absolute left-0 top-0 h-full bg-black" style={{ width: fill }} />
            <ol className="absolute inset-0 flex justify-between">
              {experiences.map((exp, i) => (
                <li key={exp.company} className="relative">
                  <button
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Show ${exp.logo}, ${exp.years}`}
                    aria-current={i === active ? "step" : undefined}
                    className="group absolute -top-[13px] -left-[13px] w-[26px] h-[26px] flex items-center justify-center"
                  >
                    <span className={`block w-3 h-3 rounded-full border-2 transition-all duration-300 group-hover:scale-125 ${i <= active ? "bg-black border-black" : "bg-white border-black/30"}`} />
                  </button>
                  <span aria-hidden="true" className={`absolute top-4 whitespace-nowrap text-[10px] md:text-[12px] font-semibold uppercase tracking-widest transition-colors md:left-1/2 md:-translate-x-1/2 ${i === 0 ? "left-0" : i === experiences.length - 1 ? "right-0" : "left-1/2 -translate-x-1/2"} ${i === active ? "text-black" : "hidden md:block text-black/60"}`}>
                    {exp.years}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </motion.div>
      </div>
    </section>
  );
}

/** Deterministic barcode bars from the company code */
function Barcode({ seed }: { seed: string }) {
  let h = 0;
  for (const c of seed) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  const bars = Array.from({ length: 38 }, (_, i) => {
    h = (h * 1103515245 + 12345) >>> 0;
    return { w: 1 + (h % 3), gap: i % 5 === 4 ? 3 : 1.5 };
  });
  return (
    <div className="flex items-stretch h-9 md:h-10 [@media(max-height:700px)]:h-6" aria-hidden="true">
      {bars.map((b, i) => <span key={i} className="bg-black block" style={{ width: b.w, marginRight: b.gap }} />)}
    </div>
  );
}

function Ticket({ exp, index, total, active }: { exp: Experience; index: number; total: number; active: boolean }) {
  const ink = exp.panel === "#A3E635" ? "text-black" : "text-white";
  return (
    <article
      className={`relative h-full w-[84vw] max-w-[380px] md:w-[420px] md:max-w-none bg-[#FFFDF8] rounded-[24px] overflow-hidden flex flex-col transition-shadow duration-500 ${active ? "shadow-[0_30px_60px_-20px_rgba(0,0,0,0.35)]" : "shadow-[0_16px_40px_-24px_rgba(0,0,0,0.3)]"}`}
    >
      {/* Stub */}
      <header className={`relative px-5 md:px-6 pt-4 pb-5 ${ink}`} style={{ backgroundColor: exp.panel }}>
        <div className="flex items-center justify-between text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.2em] opacity-90">
          {exp.current ? (
            <span className="inline-flex items-center gap-1.5 bg-[#22C55E] text-black font-bold px-2.5 py-1 -my-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" aria-hidden="true" /> Now boarding
            </span>
          ) : (
            <span>Boarding pass</span>
          )}
          <span className="tabular-nums">No. {String(index + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}</span>
        </div>
        <div className="flex items-end justify-between gap-3 mt-4">
          <div className="min-w-0">
            <h3 className="font-display text-[30px] md:text-[36px] leading-[0.95] uppercase tracking-tight truncate">{exp.name}</h3>
            <p className="text-[11px] md:text-[12px] font-medium opacity-90 mt-1.5 truncate">{[exp.tagline, exp.location].filter(Boolean).join(" · ") || "\u00A0"}</p>
          </div>
          <div className="w-16 md:w-20 aspect-[16/10] bg-white rounded-xl overflow-hidden shrink-0 shadow-sm">
            <img src={exp.logoUrl} alt={`${exp.logo} logo`} width={476} height={312} className="w-full h-full object-cover" />
          </div>
        </div>
      </header>

      {/* Flight details */}
      <dl className="grid grid-cols-[1fr_auto_1fr] gap-x-3 gap-y-3 px-5 md:px-6 pt-4 text-black">
        <div>
          <dt className="text-[9px] md:text-[10px] font-semibold uppercase tracking-[0.2em] text-black/55">From</dt>
          <dd className="font-display text-[20px] md:text-[22px] leading-none mt-1 uppercase whitespace-nowrap">{exp.from}</dd>
        </div>
        <div className="text-center self-end pb-1 text-black/40" aria-hidden="true">✈</div>
        <div className="text-right">
          <dt className="text-[9px] md:text-[10px] font-semibold uppercase tracking-[0.2em] text-black/55">To</dt>
          <dd className="font-display text-[20px] md:text-[22px] leading-none mt-1 uppercase whitespace-nowrap">{exp.to}</dd>
        </div>
        <div className="[@media(max-height:700px)]:hidden">
          <dt className="text-[9px] md:text-[10px] font-semibold uppercase tracking-[0.2em] text-black/55">Duration</dt>
          <dd className="text-[13px] font-bold mt-0.5">{exp.span}</dd>
        </div>
        <div className="text-center [@media(max-height:700px)]:hidden">
          <dt className="text-[9px] md:text-[10px] font-semibold uppercase tracking-[0.2em] text-black/55">Gate</dt>
          <dd className="text-[13px] font-bold mt-0.5">{exp.code}</dd>
        </div>
        <div className="text-right [@media(max-height:700px)]:hidden">
          <dt className="text-[9px] md:text-[10px] font-semibold uppercase tracking-[0.2em] text-black/55">Class</dt>
          <dd className="text-[12px] font-bold mt-0.5 whitespace-nowrap">{exp.path}</dd>
        </div>
      </dl>

      {/* Perforation */}
      <div className="relative my-3 md:my-4" aria-hidden="true">
        <span className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[var(--ticket-bg)]" />
        <span className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[var(--ticket-bg)]" />
        <div className="mx-5 border-t-2 border-dashed border-black/15" />
      </div>

      {/* Role stamps, most recent first */}
      <ol className="px-5 md:px-6 space-y-1.5">
        {exp.roles.map((role, r) => (
          <li key={role.title + role.dates} className={`border-[1.5px] rounded-lg px-3 py-1.5 ${r === 0 ? "border-black" : "border-black/25"}`}>
            <p className="text-[12px] md:text-[13px] font-bold leading-tight uppercase tracking-tight">{role.title}</p>
            <p className="text-[10.5px] md:text-[11.5px] text-black/65 leading-snug">{role.dates}{role.duration && ` · ${role.duration}`}</p>
          </li>
        ))}
      </ol>

      <p className="px-5 md:px-6 mt-3 text-[12px] md:text-[13px] leading-[1.55] text-black/75 line-clamp-3 [@media(max-height:820px)]:hidden">{exp.description}</p>

      {/* Footer: barcode and boarding link */}
      <footer className="mt-auto px-5 md:px-6 pt-3 pb-4 flex items-end justify-between gap-4">
        <Barcode seed={exp.code} />
        {exp.caseStudy ? (
          <a href={exp.caseStudy} className="group inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest whitespace-nowrap">
            Board <span className="sr-only">the {exp.logo} case study</span>
            <span aria-hidden="true" className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center transition-transform group-hover:translate-x-1">→</span>
          </a>
        ) : (
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/55">{exp.years}</span>
        )}
      </footer>
    </article>
  );
}
