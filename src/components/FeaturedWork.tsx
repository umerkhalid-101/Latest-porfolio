import { motion } from 'motion/react';
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
  return (
    <section id="work" className="relative z-30 bg-paper text-ink py-16 md:py-24 px-6 md:px-14">
      <div className="max-w-[1400px] mx-auto">
        <SectionHeader
          label="Work"
          title="Featured work,"
          muted="four products I shaped."
          note="Each one opens a full case study: the problem, my role, the decisions, and what changed."
        />
        <div className="flex flex-col gap-5 md:gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} onOpen={onOpenCaseStudy} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen?: (slug: string) => void }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="group relative bg-ink-soft text-white rounded-3xl md:rounded-[40px] overflow-hidden grid grid-cols-1 md:grid-cols-2 md:h-[min(80vh,540px)]"
    >
      <div className="p-6 md:p-10 lg:p-12 flex flex-col justify-center">
        <h3 className="t-display-l">{project.title}</h3>
        <p className="t-label text-muted-dark mt-3">{project.subtitle}</p>
        <dl className="grid grid-cols-3 gap-4 border-y border-line-dark py-4 my-5 max-w-[460px]">
          {([['Role', project.meta.role], ['Year', project.meta.year], ['Impact', project.meta.impact]] as const).map(([k, v]) => (
            <div key={k}>
              <dt className="t-label text-muted-dark mb-1">{k}</dt>
              <dd className="t-body-s">{v}</dd>
            </div>
          ))}
        </dl>
        <p className="t-body text-muted-dark mb-6">{project.description}</p>
        {project.href && (
          <a
            href={project.href}
            onClick={(e) => {
              if (onOpen && !e.metaKey && !e.ctrlKey && !e.shiftKey) {
                e.preventDefault();
                onOpen(project.slug);
              }
            }}
            className="self-start inline-flex items-center gap-3 rounded-full bg-white text-ink pl-5 pr-1.5 py-1.5 t-label after:absolute after:inset-0 after:content-['']"
          >
            View case study<span className="sr-only">: {project.title}</span>
            <span aria-hidden="true" className="w-9 h-9 rounded-full bg-ink text-white flex items-center justify-center motion-safe:transition-transform group-hover:rotate-45"><ArrowUpRight size={16} /></span>
          </a>
        )}
      </div>

      {/* Media panel: the only place a project's brand color appears */}
      <div className="relative h-[200px] md:h-auto flex items-center justify-center overflow-hidden p-6 md:p-10" style={{ backgroundColor: project.brandColor }}>
        {project.image ? (
          <img
            src={project.image}
            alt={`${project.title} product screens`}
            width={2000}
            height={2000}
            loading="lazy"
            className="w-full h-full max-h-full object-contain motion-safe:transition-transform motion-safe:duration-700 group-hover:scale-[1.03]"
          />
        ) : (
          <ul className="w-full max-w-[420px] flex flex-col border-t border-line-dark">
            {project.highlights?.map((item) => (
              <li key={item} className="t-display-m py-4 border-b border-line-dark">{item}</li>
            ))}
          </ul>
        )}
      </div>
    </motion.article>
  );
}
