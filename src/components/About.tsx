import { motion } from 'motion/react';

const quickFacts = [
  { label: "Based in", value: "Dubai, UAE" },
  { label: "Experience", value: "7+ years" },
  { label: "Education", value: "BA, Visual Communication Design" },
  { label: "Languages", value: "English, Urdu" },
  { label: "Currently", value: "Design Specialist, MBLM" },
  // TODO: Umer to confirm the visa line before deploy.
  { label: "Visa", value: "Own UAE residence visa" },
  { label: "Open to", value: "Lead and Design Manager roles" },
];

const toolkit = 'Figma, Adobe Suite, React, Next.js, Tailwind, Claude API, n8n';

export function About() {
  return (
    <section id="about" className="relative z-40 bg-white text-ink">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-[1400px] mx-auto px-6 md:px-14 py-12 md:py-20"
      >
        <div className="flex items-center gap-3 mb-6 md:mb-8">
          <span className="w-2.5 h-2.5 rounded-full bg-ink" aria-hidden="true" />
          <span className="t-label">About me</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <h2 className="lg:col-span-7 t-display-l">
            I lead design for products people actually use: <span className="text-muted">setting direction, growing designers, and turning business goals into shipped work.</span>
          </h2>
          <p className="lg:col-span-5 t-body-l text-muted">
            I'm Umer, a product designer in Dubai. I started in 2018 as the first design hire at Salams and stayed through its acquisition by Match Group. I went on to lead design as Design Manager at Hauraki and Product Team Lead at Axion Dynamic, and I've since shipped products for B2B networks and UAE regulators. I'm still hands-on in Figma and React.
          </p>
        </div>

        <dl className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-6 border-t border-line mt-10 md:mt-12 pt-6">
          {quickFacts.map((f) => (
            <div key={f.label}>
              <dt className="t-label text-muted mb-1.5">{f.label}</dt>
              <dd className="t-body-s text-ink font-semibold">{f.value}</dd>
            </div>
          ))}
        </dl>
        <p className="border-t border-line mt-6 pt-5 flex flex-col md:flex-row gap-1.5 md:gap-4">
          <span className="t-label text-muted">Toolkit</span>
          <span className="t-body-s text-ink font-semibold">{toolkit}</span>
        </p>
      </motion.div>
    </section>
  );
}
