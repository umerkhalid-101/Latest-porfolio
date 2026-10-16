import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { SectionHeader } from './SectionHeader';

// Titles, dates, durations and locations follow LinkedIn (source of truth).
type Role = { title: string; dates: string; duration?: string };
type Job = {
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
  current?: boolean;
  caseStudy?: string;
};

const experiences: Job[] = [
  {
    years: "2018 to 2019",
    company: "Truebill (now Rocket Money)",
    name: "Truebill", tagline: "Now Rocket Money",
    code: "TRB", from: "Sep 2018", to: "Nov 2019", span: "1y 3m", path: "Contract",
    location: "Remote contract",
    roles: [{ title: "UX Designer (Contract)", dates: "September 2018 to November 2019", duration: "1 year 3 months" }],
    description: "Ran 30+ usability and validation studies across account linking, subscription detection, and transactions. Improved financial data accuracy by 22% and reduced account-linking drop-offs by 18%.",
    logo: "Rocket Money",
    logoUrl: "/images/timeline-01.webp",
  },
  {
    years: "2018 to 2023",
    company: "Salams (acq. Match Group)",
    name: "Salams", tagline: "Acquired by Match Group",
    code: "SLM", from: "May 2018", to: "Sep 2023", span: "5y 5m", path: "Junior → Senior",
    total: "5 years 5 months",
    roles: [
      { title: "Senior Product Designer", dates: "January 2022 to September 2023", duration: "1 year 9 months" },
      { title: "User Experience Designer", dates: "September 2019 to December 2021", duration: "2 years 4 months" },
      { title: "Junior UX Designer", dates: "May 2018 to August 2019", duration: "1 year 4 months" }
    ],
    description: "First design hire on a small team building the app from the ground up. Grew into Senior as it scaled past a million users, led the full app redesign, and worked with the founders through the Match Group acquisition.",
    logo: "Salams",
    logoUrl: "/images/timeline-02.webp",
    caseStudy: "/salams-casestudy"
  },
  {
    years: "2020 to 2022",
    company: "Mailmunch",
    name: "Mailmunch", tagline: "SaaS email marketing",
    code: "MMC", from: "Oct 2020", to: "Jun 2022", span: "1y 9m", path: "Contract",
    location: "Lahore, hybrid contract",
    roles: [{ title: "UI/UX Designer (Contract)", dates: "October 2020 to June 2022", duration: "1 year 9 months" }],
    description: "Designed web and in-product experiences for a SaaS email platform, supporting user acquisition, onboarding, and feature adoption.",
    logo: "Mailmunch",
    logoUrl: "/images/team-04.webp",
  },
  {
    years: "2023 to 2024",
    company: "Hauraki (Zewst ecosystem)",
    name: "Hauraki", tagline: "Zewst ecosystem",
    code: "HRK", from: "Sep 2023", to: "Oct 2024", span: "1y 2m", path: "Senior → Manager",
    location: "Remote",
    total: "1 year 2 months",
    roles: [
      { title: "Design Manager", dates: "February 2024 to October 2024", duration: "9 months" },
      { title: "Senior Product Designer", dates: "September 2023 to February 2024", duration: "6 months" }
    ],
    // TODO: Umer to confirm the "three-person design team" wording before deploy.
    description: "Led a three-person design team and set design direction across four products. Shipped Zewst POS to 500+ restaurant merchants and owned the Zewards loyalty platform end to end.",
    logo: "Hauraki",
    logoUrl: "/images/timeline-03.webp",
    caseStudy: "/zewards-casestudy"
  },
  {
    years: "2024 to 2025",
    company: "Axion Dynamic",
    name: "Axion Dynamic",
    code: "AXD", from: "Oct 2024", to: "Sep 2025", span: "1y", path: "Team Lead",
    location: "Lahore, Pakistan",
    roles: [{ title: "Product Team Lead", dates: "October 2024 to September 2025", duration: "1 year" }],
    // TODO: Umer to confirm the "three-person design team" wording before deploy.
    description: "Led a three-person design team on Jobbit, an ERP platform for supply chain operations, from discovery through delivery, and built a scalable Figma design system.",
    logo: "Axion Dynamic",
    logoUrl: "/images/timeline-05.webp",
  },
  {
    years: "2025 to 2026",
    company: "Unita Worldwide",
    name: "Unita Worldwide",
    code: "UNT", from: "Oct 2025", to: "Mar 2026", span: "6m", path: "Product Designer",
    location: "Dubai, United Arab Emirates",
    roles: [{ title: "Product Designer", dates: "October 2025 to March 2026", duration: "6 months" }],
    description: "Sole designer on a Swiss-headquartered B2B verified business network with offices in Geneva, Tirana, and Dubai. Owned the design system, discovery, and onboarding, and ran pricing tests with the founders.",
    logo: "Unita",
    logoUrl: "/images/timeline-06.webp",
    caseStudy: "/unita-casestudy"
  },
  {
    years: "2026 to now",
    company: "MBLM Dubai",
    name: "MBLM",
    code: "MBL", from: "Mar 2026", to: "Now", span: "Ongoing", path: "Design Specialist",
    location: "Dubai, United Arab Emirates",
    roles: [{ title: "Design Specialist", dates: "March 2026 to Present" }],
    description: "Designing government and regulated-sector web portals in the UAE, including VARA, plus an AI product website and product UI.",
    logo: "MBLM",
    logoUrl: "/images/timeline-07.webp",
    current: true,
    caseStudy: "/vara-casestudy"
  }
];

export function Experience() {
  const rowRef = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);

  // The dots follow whichever pass is nearest the left edge of the row
  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const onScroll = () => {
      const items = [...row.children] as HTMLElement[];
      const left = row.scrollLeft;
      const atEnd = left + row.clientWidth >= row.scrollWidth - 4;
      let best = 0;
      items.forEach((el, i) => { if (Math.abs(el.offsetLeft - row.offsetLeft - left) < Math.abs(items[best].offsetLeft - row.offsetLeft - left)) best = i; });
      setActive(atEnd ? items.length - 1 : best);
    };
    onScroll();
    row.addEventListener('scroll', onScroll, { passive: true });
    return () => row.removeEventListener('scroll', onScroll);
  }, []);

  const goTo = (i: number) => {
    const row = rowRef.current;
    const el = row?.children[Math.max(0, Math.min(experiences.length - 1, i))] as HTMLElement | undefined;
    if (!row || !el) return;
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    row.scrollTo({ left: el.offsetLeft - row.offsetLeft, behavior: smooth ? 'smooth' : 'auto' });
  };

  return (
    <section id="experience" className="relative bg-paper text-ink py-20 md:py-24">
      <div className="max-w-[1400px] mx-auto px-6 md:px-14 flex items-end justify-between gap-6">
        <SectionHeader label="Experience" title="May 2018 to present" muted="7 companies · 10 roles" className="!mb-8" />
        <div className="hidden md:flex gap-3 mb-8 shrink-0">
          <button type="button" onClick={() => goTo(active - 1)} disabled={active === 0} aria-label="Previous role" className="w-12 h-12 rounded-full border border-ink flex items-center justify-center disabled:opacity-30">
            <ArrowLeft size={18} aria-hidden="true" />
          </button>
          <button type="button" onClick={() => goTo(active + 1)} disabled={active === experiences.length - 1} aria-label="Next role" className="w-12 h-12 rounded-full border border-ink flex items-center justify-center disabled:opacity-30">
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>

      <ol
        ref={rowRef}
        aria-label="Experience, most recent last"
        className="flex gap-5 md:gap-6 overflow-x-auto snap-x snap-mandatory scroll-px-6 md:scroll-px-14 px-6 md:px-14 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {experiences.map((exp, i) => (
          <li key={exp.company} className="snap-start shrink-0 flex">
            <Ticket exp={exp} index={i} total={experiences.length} />
          </li>
        ))}
      </ol>

      {/* Position dots, synced to the row */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-14 mt-6">
        <ol className="flex items-center gap-2">
          {experiences.map((exp, i) => (
            <li key={exp.company}>
              <button
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Show ${exp.logo}, ${exp.years}`}
                aria-current={i === active ? 'step' : undefined}
                className="w-6 h-6 flex items-center justify-center"
              >
                <span className={`block h-2.5 rounded-full transition-all duration-300 ${i === active ? 'w-8 bg-accent' : 'w-2.5 bg-ink/25'}`} />
              </button>
            </li>
          ))}
        </ol>
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
    <div className="flex items-stretch h-9" aria-hidden="true">
      {bars.map((b, i) => <span key={i} className="bg-ink block" style={{ width: b.w, marginRight: b.gap }} />)}
    </div>
  );
}

function Ticket({ exp, index, total }: { exp: Job; index: number; total: number }) {
  return (
    <article className="relative h-full w-[82vw] max-w-[400px] md:w-[440px] md:max-w-none bg-white rounded-3xl overflow-hidden flex flex-col">
      {/* Stub */}
      <header className="px-6 pt-5 pb-6 bg-ink-soft text-white">
        <div className="flex items-center justify-between t-label">
          {exp.current ? (
            <span className="inline-flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-success motion-safe:animate-pulse" aria-hidden="true" /> Now boarding</span>
          ) : (
            <span className="text-muted-dark">Boarding pass</span>
          )}
          <span className="tabular-nums text-muted-dark">{String(index + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}</span>
        </div>
        <div className="flex items-end justify-between gap-4 mt-5">
          <div className="min-w-0">
            <h3 className="t-display-m truncate">{exp.name}</h3>
            <p className="t-body-s text-muted-dark mt-1 truncate">{[exp.tagline, exp.location].filter(Boolean).join(" · ") || "\u00A0"}</p>
          </div>
          <div className="w-20 aspect-[16/10] bg-white rounded-xl overflow-hidden shrink-0">
            <img src={exp.logoUrl} alt={`${exp.logo} logo`} width={476} height={312} loading="lazy" className="w-full h-full object-cover" />
          </div>
        </div>
      </header>

      {/* Flight details */}
      <dl className="grid grid-cols-2 gap-x-4 gap-y-4 px-6 pt-5">
        <div><dt className="t-label text-muted">From</dt><dd className="t-heading mt-1">{exp.from}</dd></div>
        <div className="text-right"><dt className="t-label text-muted">To</dt><dd className="t-heading mt-1">{exp.to}</dd></div>
        <div><dt className="t-label text-muted">Duration</dt><dd className="t-body-s mt-1">{exp.span}</dd></div>
        <div className="text-right"><dt className="t-label text-muted">Class</dt><dd className="t-body-s mt-1">{exp.path}</dd></div>
      </dl>

      {/* Perforation */}
      <div className="relative my-5" aria-hidden="true">
        <span className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-paper" />
        <span className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-paper" />
        <div className="mx-6 border-t-2 border-dashed border-line" />
      </div>

      {/* Roles, most recent first */}
      <ol className="px-6 space-y-2">
        {exp.roles.map((role, r) => (
          <li key={role.title + role.dates} className={`border rounded-xl px-3 py-2 ${r === 0 ? "border-ink" : "border-line"}`}>
            <p className="t-label">{role.title}</p>
            <p className="t-body-s text-muted mt-0.5">{role.dates}{role.duration && ` · ${role.duration}`}</p>
          </li>
        ))}
      </ol>

      <p className="t-body-s text-muted px-6 mt-4">{exp.description}</p>

      <footer className="mt-auto px-6 pt-5 pb-5 flex items-end justify-between gap-4">
        <Barcode seed={exp.code} />
        {exp.caseStudy && (
          <a href={exp.caseStudy} className="group inline-flex items-center gap-2 t-label">
            Board <span className="sr-only">the {exp.logo} case study</span>
            <span aria-hidden="true" className="w-9 h-9 rounded-full bg-ink text-white flex items-center justify-center motion-safe:transition-transform group-hover:translate-x-1">→</span>
          </a>
        )}
      </footer>
    </article>
  );
}
