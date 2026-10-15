import { motion } from 'motion/react';
import { ArrowLeft, Mail, MapPin } from 'lucide-react';
import { useEffect, type MouseEvent, type ReactNode } from 'react';
import { CaseStudyLeadership, type LeadershipContent } from './CaseStudyLeadership';

export interface CaseStudyImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface CaseStudySection {
  id: string;
  label: string;
  title: string;
  body: ReactNode;
  image?: CaseStudyImage;
  images?: CaseStudyImage[];
}

export interface CaseStudyData {
  slug: string;
  title: string;
  tagline: string;
  /** Hero background and the text color that passes contrast on it */
  heroBg: string;
  heroText: string;
  /** Accent for labels on white, must pass 4.5:1 */
  accent: string;
  facts: { label: string; value: string }[];
  heroImage?: CaseStudyImage;
  metrics?: { value: string; label: string; context: string }[];
  sections: CaseStudySection[];
  leadership: LeadershipContent;
}

function Img({ image, className = '' }: { image: CaseStudyImage; className?: string }) {
  return (
    <img
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      loading="lazy"
      className={`w-full h-auto rounded-2xl ${className}`}
    />
  );
}

export function CaseStudyPage({ data, onClose }: { data: CaseStudyData; onClose: () => void }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [data.slug]);

  const back = (e: MouseEvent) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    onClose();
  };

  return (
    <div className="bg-[#FAF8F5] text-[#121115] min-h-screen relative font-sans">
      <header className="fixed top-0 left-0 w-full z-50 px-4 md:px-10 bg-[#FAF8F5]/90 backdrop-blur-xl border-b border-[#121115]/5 py-4 flex items-center">
        <div className="flex items-center w-full">
          <a href="/" onClick={back} aria-label="Umer, home" className="font-display text-3xl tracking-tighter text-[#121115]">UMER</a>
          <div className="h-[1px] bg-[#121115]/20 flex-1 mx-4" aria-hidden="true" />
          <a href="/#work" onClick={back} className="flex items-center gap-2 text-[#121115] group">
            <ArrowLeft size={16} aria-hidden="true" className="transform group-hover:-translate-x-1 transition-transform" />
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase">Back</span>
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 px-6" style={{ background: data.heroBg, color: data.heroText }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`${data.heroImage ? 'lg:col-span-7' : 'lg:col-span-10'} space-y-8`}
          >
            <h1 className="text-6xl md:text-[110px] leading-none tracking-tight font-serif font-black">{data.title}.</h1>
            <p className="text-xl md:text-[26px] font-medium tracking-tight leading-relaxed max-w-2xl">{data.tagline}</p>
            <dl className="border rounded-2xl grid grid-cols-2 md:grid-cols-4 overflow-hidden max-w-3xl" style={{ borderColor: 'currentColor' }}>
              {data.facts.map((fact) => (
                <div key={fact.label} className="p-5 md:p-6 border-[0.5px]" style={{ borderColor: 'currentColor' }}>
                  <dt className="text-[11px] md:text-xs font-bold uppercase tracking-widest">{fact.label}</dt>
                  <dd className="text-sm md:text-base font-black uppercase mt-1.5">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
          {data.heroImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5"
            >
              <img
                src={data.heroImage.src}
                alt={data.heroImage.alt}
                width={data.heroImage.width}
                height={data.heroImage.height}
                fetchPriority="high"
                className="w-full h-auto rounded-2xl drop-shadow-2xl"
              />
            </motion.div>
          )}
        </div>
      </section>

      {/* Metrics */}
      {data.metrics && (
        <section className="py-16 md:py-20 px-6 bg-white border-b border-[#121115]/5" aria-label="Results">
          <ul className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
            {data.metrics.map((m) => (
              <li key={m.label}>
                <p className="font-display text-6xl md:text-7xl leading-none mb-3" style={{ color: data.accent }}>{m.value}</p>
                <p className="text-lg font-bold mb-1">{m.label}</p>
                <p className="text-[#121115]/75">{m.context}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Story sections */}
      {data.sections.map((section, i) => (
        <section key={section.id} id={section.id} className={`py-20 md:py-24 px-6 ${i % 2 ? 'bg-white' : ''}`}>
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className={`${section.image ? 'lg:col-span-6' : 'lg:col-span-9'} space-y-6`}
            >
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: data.accent }}>{section.label}</p>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">{section.title}</h2>
              <div className="space-y-4 text-base md:text-lg leading-relaxed text-[#121115]/85 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-[#121115] [&_h3]:pt-2">
                {section.body}
              </div>
            </motion.div>
            {section.image && (
              <div className="lg:col-span-6">
                <Img image={section.image} />
              </div>
            )}
            {section.images && (
              <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                {section.images.map((img) => <Img key={img.src} image={img} className="bg-white" />)}
              </div>
            )}
          </div>
        </section>
      ))}

      <CaseStudyLeadership content={data.leadership} accent={data.accent} />

      {/* Footer */}
      <footer className="bg-[#121115] text-white py-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10 items-start md:items-center">
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2"><MapPin size={16} aria-hidden="true" /> Dubai, UAE</li>
            <li className="flex items-center gap-2"><Mail size={16} aria-hidden="true" /> <a href="mailto:umerkhalid141@gmail.com" className="underline underline-offset-4">umerkhalid141@gmail.com</a></li>
          </ul>
          <a href="/#work" onClick={back} className="inline-flex items-center gap-2 bg-white text-[#121115] px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest">
            <ArrowLeft size={14} aria-hidden="true" /> Back to all work
          </a>
        </div>
      </footer>
    </div>
  );
}
