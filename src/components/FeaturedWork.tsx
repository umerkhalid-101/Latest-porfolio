import { motion, useReducedMotion } from 'motion/react';
import type { MouseEvent } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SectionHeader } from './SectionHeader';

interface Project {
  slug: string;
  meta: { role: string; year: string; impact: string };
  title: string;
  subtitle: string;
  description: string;
  image?: string;
  highlights?: string[];
  /** Client cards shown as a grid instead of one screenshot */
  gallery?: { src: string; alt: string }[];
  /** Hover label when the link is not this project's own case study */
  cta?: string;
  /** The project's own color, used only behind its screenshots */
  brandColor: string;
  href?: string;
}

const projects: Project[] = [
  {
    slug: "unita",
    meta: { role: "Sole designer", year: "2025 to 2026", impact: "10+ modules" },
    title: "Unita",
    subtitle: "Global B2B verified business network",
    description: "Sole designer on a Swiss-headquartered B2B network with offices in Geneva, Tirana, and Dubai. Built the design system from scratch with full token coverage, and designed discovery, company profiles, and onboarding across 10+ modules.",
    image: "/images/work-04.webp",
    brandColor: "#0A2E2E",
    href: "/unita-casestudy"
  },
  {
    slug: "vara",
    meta: { role: "Design Specialist", year: "2026", impact: "4 UAE clients" },
    title: "MBLM",
    subtitle: "Government and enterprise work, Dubai",
    description: "At MBLM Dubai I design web portals and product UI for UAE government and enterprise clients, including VARA, the Financial Intelligence Unit, Dubai World Trade Centre, and allumni.",
    gallery: [
      { src: "/images/mblm-vara.webp", alt: "VARA, Virtual Assets Regulatory Authority" },
      { src: "/images/mblm-fiu.webp", alt: "Financial Intelligence Unit" },
      { src: "/images/mblm-dwtc.webp", alt: "Dubai World Trade Centre" },
      { src: "/images/mblm-allumni.webp", alt: "allumni" },
    ],
    cta: "View the VARA case study",
    brandColor: "#1C1C1C",
    href: "/vara-casestudy"
  },
  {
    slug: "salams",
    meta: { role: "First design hire to Senior", year: "2018 to 2023", impact: "Acquired by Match Group" },
    title: "Salams",
    subtitle: "Consumer app redesign, acquired by Match Group",
    description: "Led the full redesign across home, explore, matches, chat, events, and profile. Designed onboarding and the identity attribute system specific to Muslim dating.",
    image: "/images/work-01.webp",
    brandColor: "#C2185B",
    href: "/salams-casestudy"
  },
  {
    slug: "zewards",
    meta: { role: "Design Manager", year: "2024", impact: "+38% repeat visits" },
    title: "Zewst",
    subtitle: "Zewards loyalty platform, Zewst ecosystem",
    description: "As Design Manager, I owned Zewards end to end across the consumer app, business app, and marketing site. Repeat visits rose 38% and first-time activation got 2.3x faster.",
    image: "/images/work-02.webp",
    brandColor: "#A3E635",
    href: "/zewards-casestudy"
  }
];

interface FeaturedWorkProps {
  onOpenCaseStudy?: (slug: string) => void;
}

// Bento layout: Unita leads as the big tile, VARA and Salams sit beside it, Zewst runs across the bottom
const layout = [
  'lg:col-span-2 lg:row-span-2',
  'lg:col-span-1',
  'lg:col-span-1',
  'lg:col-span-3',
];

/** Light brand colors (Zewst lime) need dark text */
function isLight(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  return 0.299 * r + 0.587 * g + 0.114 * b > 160;
}

export function FeaturedWork({ onOpenCaseStudy }: FeaturedWorkProps) {
  return (
    <section id="work" className="relative z-30 bg-paper text-ink py-16 md:py-24 px-6 md:px-14">
      <div className="max-w-[1400px] mx-auto">
        <SectionHeader
          label="Work"
          title="Featured work,"
          muted="four products I shaped."
          note="Each one opens a full case study: the problem, my role, the decisions, and what changed."
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-[repeat(3,minmax(300px,auto))] gap-4 md:gap-5">
          {projects.map((project, i) => (
            <Tile key={project.slug} project={project} index={i} total={projects.length} className={layout[i]} onOpen={onOpenCaseStudy} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Tile({ project, index, total, className, onOpen }: { project: Project; index: number; total: number; className: string; onOpen?: (slug: string) => void }) {
  const reduce = useReducedMotion();
  const light = isLight(project.brandColor);
  const big = index === 0;
  const wide = index === total - 1;
  const ink = light ? 'text-ink' : 'text-white';
  const soft = light ? 'text-ink/70' : 'text-white/70';

  const open = (e: MouseEvent) => {
    if (onOpen && !e.metaKey && !e.ctrlKey && !e.shiftKey) {
      e.preventDefault();
      onOpen(project.slug);
    }
  };

  return (
    <motion.a
      href={project.href}
      onClick={open}
      initial={reduce ? false : { opacity: 0, y: 24, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative block overflow-hidden rounded-3xl md:rounded-[32px] min-h-[380px] ${ink} ${className} focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-accent`}
      style={{ backgroundColor: project.brandColor }}
    >
      <div className={`relative h-full flex ${wide ? 'flex-col md:flex-row' : 'flex-col'}`}>
        {/* Top bar and title */}
        <div className={`relative z-10 p-6 md:p-8 flex flex-col ${wide ? 'md:w-[38%] md:justify-between' : ''}`}>
          <div className={`flex items-center justify-between t-label ${soft}`}>
            <span className="tabular-nums">{String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
            <span>{project.meta.year}</span>
          </div>
          <div className={wide ? 'mt-6 md:mt-0' : 'mt-6'}>
            <h3 className={big ? 't-display-l' : 't-display-m'}>{project.title}</h3>
            <p className={`t-body-s mt-2 ${soft}`}>{project.subtitle}</p>
          </div>
          {wide && <ImpactRow project={project} light={light} className="hidden md:flex" />}
        </div>

        {/* The work itself */}
        <div className={`relative flex-1 flex items-center justify-center px-6 ${project.image ? (big ? 'min-h-[260px] lg:min-h-[420px]' : wide ? 'min-h-[220px] md:min-h-[300px]' : 'min-h-[260px] lg:min-h-[240px]') : ''}`}>
          {project.image ? (
            <img
              src={project.image}
              alt={`${project.title} product screens`}
              width={2000}
              height={2000}
              loading="lazy"
              className={`absolute inset-0 w-full h-full object-contain motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out ${big ? 'scale-[0.96] group-hover:scale-[1.02]' : wide ? 'scale-[1.25] group-hover:scale-[1.32]' : 'scale-[0.9] group-hover:scale-[0.96]'} group-hover:-rotate-1`}
            />
          ) : project.gallery ? (
            <ul className="w-full grid grid-cols-2 gap-2 py-2">
              {project.gallery.map((g, n) => (
                <li
                  key={g.src}
                  className="overflow-hidden rounded-xl motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out group-hover:-translate-y-1"
                  style={{ transitionDelay: `${n * 60}ms` }}
                >
                  <img src={g.src} alt={g.alt} width={960} height={540} loading="lazy" className="w-full aspect-video object-cover" />
                </li>
              ))}
            </ul>
          ) : (
            <ol className="w-full flex flex-col gap-2 py-2">
              {project.highlights?.map((item, n) => (
                <li
                  key={item}
                  className="flex items-center gap-3 rounded-full border border-line-dark px-4 py-2.5 motion-safe:transition-transform motion-safe:duration-500 group-hover:translate-x-2"
                  style={{ transitionDelay: `${n * 50}ms` }}
                >
                  <span className="t-label text-white/60 tabular-nums">{String(n + 1).padStart(2, '0')}</span>
                  <span className="t-label">{item}</span>
                </li>
              ))}
            </ol>
          )}
        </div>

        {!wide && <ImpactRow project={project} light={light} className="relative z-10 p-6 md:p-8 pt-4 md:pt-4" />}
        {wide && <ImpactRow project={project} light={light} className="md:hidden relative z-10 p-6 pt-4" />}
      </div>

      {/* Summary slides up on hover (desktop) */}
      <div className="hidden lg:block absolute inset-x-3 bottom-3 z-20 rounded-2xl bg-ink-soft text-white p-5 translate-y-[120%] group-hover:translate-y-0 group-focus-visible:translate-y-0 motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out">
        <p className="t-body-s text-muted-dark">{project.description}</p>
        <p className="t-label mt-3 flex items-center gap-2">{project.cta ?? 'View case study'} <ArrowUpRight size={14} aria-hidden="true" /></p>
      </div>
    </motion.a>
  );
}

function ImpactRow({ project, light, className = '' }: { project: Project; light: boolean; className?: string }) {
  return (
    <div className={`flex items-end justify-between gap-4 ${className}`}>
      <div>
        <p className={`t-label ${light ? 'text-ink/70' : 'text-white/70'}`}>{project.meta.role}</p>
        <p className="t-heading mt-1">{project.meta.impact}</p>
      </div>
      <span aria-hidden="true" className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center motion-safe:transition-transform motion-safe:duration-300 group-hover:rotate-45 ${light ? 'bg-ink text-white' : 'bg-white text-ink'}`}>
        <ArrowUpRight size={20} />
      </span>
    </div>
  );
}
