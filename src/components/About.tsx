import { animate, motion, useInView, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { ArrowDown } from 'lucide-react';

const STATEMENT = 'I lead design for products people actually use: setting direction, growing designers, and turning business goals into shipped work.';

// Facts from LinkedIn and the resume
const stats = [
  { value: 7, suffix: '+', label: 'Years designing' },
  { value: 7, suffix: '', label: 'Companies' },
  { value: 10, suffix: '', label: 'Roles, junior to manager' },
  { value: 1, suffix: 'M+', label: "Users on products I've designed" },
];

const quickFacts = [
  { label: 'Based in', value: 'Dubai, UAE' },
  { label: 'Currently', value: 'Design Specialist, MBLM' },
  { label: 'Open to', value: 'Lead and Design Manager roles' },
  { label: 'Education', value: 'BA, Visual Communication Design' },
  { label: 'Languages', value: 'English, Urdu' },
  // TODO: Umer to confirm the visa line before deploy.
  { label: 'Visa', value: 'Own UAE residence visa' },
];

const toolkit = ['Figma', 'Adobe Suite', 'React', 'Next.js', 'Tailwind', 'Claude API', 'n8n'];

/** Each word lights up from muted to ink as the headline scrolls through the viewport */
function Word({ word, i, total, progress }: { word: string; i: number; total: number; progress: MotionValue<number> }) {
  const start = i / total;
  const opacity = useTransform(progress, [start, start + 1 / total], [0.18, 1]);
  return <motion.span style={{ opacity }}>{word} </motion.span>;
}

/** Counts up from zero the first time it scrolls into view */
function Count({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? to : 0);
  useEffect(() => {
    if (!inView || reduce) return;
    const c = animate(0, to, { duration: 1.4, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, reduce, to]);
  return <span ref={ref} className="tabular-nums">{n}{suffix}</span>;
}

export function About() {
  const reduce = useReducedMotion();
  const headRef = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({ target: headRef, offset: ['start 0.85', 'end 0.45'] });
  const words = STATEMENT.split(' ');

  return (
    <section id="about" className="relative z-40 bg-white text-ink">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-14 py-16 md:py-24">
        <div className="flex items-center gap-3 mb-6 md:mb-8">
          <span className="w-2.5 h-2.5 rounded-full bg-ink" aria-hidden="true" />
          <span className="t-label">About me</span>
        </div>

        {/* Statement: lit word by word as you scroll */}
        <h2 ref={headRef} className="t-display-l max-w-[18ch] lg:max-w-[22ch]">
          {reduce ? STATEMENT : (
            <>
              <span className="sr-only">{STATEMENT}</span>
              <span aria-hidden="true">
                {words.map((w, i) => <Word key={i} word={w} i={i} total={words.length} progress={scrollYProgress} />)}
              </span>
            </>
          )}
        </h2>

        {/* Numbers */}
        <dl className="grid grid-cols-2 lg:grid-cols-4 border-t border-l border-line mt-12 md:mt-16">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
              className="group relative border-r border-b border-line p-5 md:p-7 overflow-hidden"
            >
              <span aria-hidden="true" className="absolute inset-0 bg-ink origin-bottom scale-y-0 group-hover:scale-y-100 motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out" />
              <dd className="relative t-display-l group-hover:text-white motion-safe:transition-colors"><Count to={s.value} suffix={s.suffix} /></dd>
              <dt className="relative t-label text-muted group-hover:text-muted-dark mt-3 motion-safe:transition-colors">{s.label}</dt>
            </motion.div>
          ))}
        </dl>

        {/* Bio and details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mt-12 md:mt-16">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="lg:col-span-6"
          >
            <p className="t-body-l text-ink">
              I'm Umer, a product designer in Dubai. I started in 2018 as the first design hire at Salams and stayed through its acquisition by Match Group. I went on to lead design as Design Manager at Hauraki and Product Team Lead at Axion Dynamic, and I've since shipped products for B2B networks and UAE regulators. I'm still hands-on in Figma and React.
            </p>
            <div className="mt-8">
              <p className="t-label text-muted mb-3">Toolkit</p>
              <ul className="flex flex-wrap gap-2">
                {toolkit.map((t) => (
                  <li key={t} className="t-label rounded-full border border-line px-3.5 py-2 hover:bg-ink hover:text-white hover:border-ink motion-safe:transition-colors">{t}</li>
                ))}
              </ul>
            </div>
            <a
              href="/Muhammad_Umer_Resume.pdf"
              download="Muhammad_Umer_Resume.pdf"
              className="group mt-8 inline-flex items-center gap-3 rounded-full bg-ink text-white pl-6 pr-2 py-2 t-label"
            >
              Download my resume
              <span className="w-10 h-10 rounded-full bg-accent text-ink flex items-center justify-center motion-safe:transition-transform group-hover:translate-y-0.5" aria-hidden="true">
                <ArrowDown size={18} />
              </span>
              <span className="sr-only">(PDF)</span>
            </a>
          </motion.div>

          <dl className="lg:col-span-6 grid grid-cols-2 gap-x-6 gap-y-6 content-start">
            {quickFacts.map((f) => (
              <div key={f.label} className="border-t border-line pt-3">
                <dt className="t-label text-muted mb-1.5">{f.label}</dt>
                <dd className="t-body-s text-ink font-semibold">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
