import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from 'motion/react';
import { useRef, useState, type MouseEvent } from 'react';
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
    meta: { role: "Design Specialist", year: "2026", impact: "5-step licensing guide" },
    title: "VARA",
    subtitle: "Regulator web portal, Dubai",
    description: "Designed the web portal for Dubai's Virtual Assets Regulatory Authority at MBLM, from the homepage to a five-step licensing guide, backed by a reusable UI kit and a 12-column layout system.",
    highlights: ["Five-step licensing guide", "Reusable UI kit", "12-column layout system", "Desktop and mobile"],
    brandColor: "#0B1F3A",
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

export function FeaturedWork({ onOpenCaseStudy }: FeaturedWorkProps) {
  const stackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: stackRef, offset: ['start start', 'end end'] });
  return (
    <section id="work" className="relative z-30 bg-paper text-ink py-16 md:py-24 px-6 md:px-14">
      <div className="max-w-[1400px] mx-auto">
        <SectionHeader
          label="Work"
          title="Featured work,"
          muted="four products I shaped."
          note="Each one opens a full case study: the problem, my role, the decisions, and what changed."
        />
        {/* Cards pile up as you scroll: each one sticks, then shrinks back under the next */}
        <div ref={stackRef} className="flex flex-col gap-5 md:gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} onOpen={onOpenCaseStudy} index={i} total={projects.length} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, onOpen, index, total, progress }: { project: Project; onOpen?: (slug: string) => void; index: number; total: number; progress: MotionValue<number> }) {
  const reduce = useReducedMotion();
  // Once the next card starts covering this one, push it back and dim it
  const start = index / total;
  const scale = useTransform(progress, [start, 1], [1, 1 - (total - 1 - index) * 0.05]);
  const dim = useTransform(progress, [start, Math.min(1, start + 1 / total)], [0, index === total - 1 ? 0 : 0.45]);

  // The screenshots drift toward the cursor, and a "View" badge follows it over the media panel
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const spring = { stiffness: 150, damping: 20 };
  const imgX = useSpring(useTransform(mx, [0, 1], [-18, 18]), spring);
  const imgY = useSpring(useTransform(my, [0, 1], [-14, 14]), spring);
  const badgeX = useSpring(useTransform(mx, (v) => `${v * 100}%`), { stiffness: 400, damping: 30 });
  const badgeY = useSpring(useTransform(my, (v) => `${v * 100}%`), { stiffness: 400, damping: 30 });
  const [hover, setHover] = useState(false);

  const open = (e: MouseEvent) => {
    if (onOpen && !e.metaKey && !e.ctrlKey && !e.shiftKey) {
      e.preventDefault();
      onOpen(project.slug);
    }
  };

  return (
    <div className="md:sticky" style={{ top: `calc(96px + ${index * 18}px)` }}>
    <motion.article
      style={reduce ? undefined : { scale }}
      className="group relative origin-top bg-ink-soft text-white rounded-3xl md:rounded-[40px] overflow-hidden grid grid-cols-1 md:grid-cols-[5fr_7fr] md:h-[min(80vh,560px)]"
    >
      <div className="p-6 md:p-10 lg:p-12 flex flex-col">
        <div className="flex items-center justify-between t-label text-muted-dark">
          <span className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: project.brandColor }} aria-hidden="true" />
            <span className="tabular-nums">{String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
          </span>
          <span>{project.meta.year}</span>
        </div>

        <div className="mt-8 md:mt-auto">
          <h3 className="t-display-l">{project.title}</h3>
          <p className="t-body-s text-muted-dark mt-2">{project.subtitle}</p>
        </div>

        <div className="border-t border-line-dark mt-6 pt-5">
          <p className="t-label text-muted-dark">Impact</p>
          <p className="t-display-m mt-2">{project.meta.impact}</p>
          <p className="t-body-s text-muted-dark mt-2">{project.meta.role}</p>
        </div>

        <p className="t-body-s text-muted-dark mt-5 md:[@media(max-height:820px)]:hidden">{project.description}</p>

        {project.href && (
          <a
            href={project.href}
            onClick={open}
            className="self-start mt-6 md:mt-auto inline-flex items-center gap-3 rounded-full bg-white text-ink pl-5 pr-1.5 py-1.5 t-label after:absolute after:inset-0 after:content-[''] md:after:content-none"
          >
            View case study<span className="sr-only">: {project.title}</span>
            <span aria-hidden="true" className="w-9 h-9 rounded-full bg-ink text-white flex items-center justify-center motion-safe:transition-transform group-hover:rotate-45"><ArrowUpRight size={16} /></span>
          </a>
        )}
      </div>

      {/* Media panel: the only place a project's brand color appears */}
      <a
        href={project.href}
        onClick={open}
        tabIndex={-1}
        aria-hidden="true"
        onPointerMove={(e) => {
          if (e.pointerType !== 'mouse' || reduce) return;
          const r = e.currentTarget.getBoundingClientRect();
          mx.set((e.clientX - r.left) / r.width);
          my.set((e.clientY - r.top) / r.height);
        }}
        onPointerEnter={(e) => { if (e.pointerType === 'mouse') setHover(true); }}
        onPointerLeave={() => { setHover(false); mx.set(0.5); my.set(0.5); }}
        className="relative h-[220px] md:h-auto flex items-center justify-center overflow-hidden p-6 md:p-10 md:cursor-none"
        style={{ backgroundColor: project.brandColor }}
      >
        {project.image ? (
          <motion.img
            src={project.image}
            alt=""
            width={2000}
            height={2000}
            loading="lazy"
            style={reduce ? undefined : { x: imgX, y: imgY }}
            className="w-full h-full max-h-full object-contain scale-[1.18] motion-safe:transition-[scale] motion-safe:duration-700 group-hover:scale-[1.26]"
          />
        ) : (
          <ol className="w-full max-w-[460px] flex flex-col border-t border-line-dark">
            {project.highlights?.map((item, n) => (
              <li key={item} className="flex items-baseline gap-5 py-4 border-b border-line-dark">
                <span className="t-label text-muted-dark tabular-nums">{String(n + 1).padStart(2, '0')}</span>
                <span className="t-display-m">{item}</span>
              </li>
            ))}
          </ol>
        )}

        {/* Cursor badge */}
        {!reduce && (
          <motion.span
            className="hidden md:flex absolute top-0 left-0 w-28 h-28 -ml-14 -mt-14 rounded-full bg-accent text-ink t-label items-center justify-center text-center pointer-events-none"
            style={{ left: badgeX, top: badgeY }}
            animate={{ scale: hover ? 1 : 0, rotate: hover ? 0 : -45 }}
            transition={{ type: 'spring', stiffness: 400, damping: 22 }}
          >
            View<br />case study
          </motion.span>
        )}
      </a>
      {!reduce && <motion.div aria-hidden="true" className="absolute inset-0 bg-ink pointer-events-none hidden md:block" style={{ opacity: dim }} />}
    </motion.article>
    </div>
  );
}
