import { ArrowUp, ArrowUpRight, Check, Copy } from 'lucide-react';
import { useEffect, useState } from 'react';
import { scrollToSmooth } from '../lib/smoothScroll';

const EMAIL = 'umerkhalid141@gmail.com';

function DubaiTime() {
  const fmt = () => new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Dubai', hour: '2-digit', minute: '2-digit' }).format(new Date());
  const [time, setTime] = useState(fmt);
  useEffect(() => {
    const id = setInterval(() => setTime(fmt()), 15000);
    return () => clearInterval(id);
  }, []);
  return <time className="tabular-nums">{time}</time>;
}

const columns = [
  {
    title: 'Sections',
    links: [
      { label: 'About', href: '#about' },
      { label: 'Work', href: '#work' },
      { label: 'How I lead', href: '#how-i-lead' },
      { label: 'Experience', href: '#experience' },
      { label: 'Contact', href: '#contact' },
    ],
  },
  {
    title: 'Case studies',
    links: [
      { label: 'Unita', href: '/unita-casestudy' },
      { label: 'VARA', href: '/vara-casestudy' },
      { label: 'Salams', href: '/salams-casestudy' },
      { label: 'Zewards', href: '/zewards-casestudy' },
    ],
  },
  {
    title: 'Elsewhere',
    links: [
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/umar-khalid1/', external: true },
      { label: 'Instagram', href: 'https://www.instagram.com/umar_khalid1', external: true },
      { label: 'Email', href: `mailto:${EMAIL}` },
    ],
  },
] as { title: string; links: { label: string; href: string; external?: boolean }[] }[];

export function Footer() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <footer id="contact" className="bg-ink text-white px-6 md:px-14 pt-20 md:pt-28 pb-8 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        {/* Contact */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 pb-14 md:pb-20 border-b border-line-dark">
          <div>
            <p className="flex items-center gap-3 t-label mb-5">
              <span className="relative flex w-2.5 h-2.5" aria-hidden="true">
                <span className="absolute inset-0 rounded-full bg-success motion-safe:animate-ping opacity-60" />
                <span className="relative w-2.5 h-2.5 rounded-full bg-success" />
              </span>
              Open to new roles in Dubai
            </p>
            <h2 className="t-display-l">Let's build<br /><span className="text-muted-dark">something good.</span></h2>
            <a href={`mailto:${EMAIL}`} className="inline-block t-heading mt-6 underline decoration-line-dark underline-offset-8 hover:decoration-white">{EMAIL}</a>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={copy}
              className="flex items-center gap-2 rounded-full border border-white/40 hover:border-white px-5 py-3 t-label"
            >
              {copied ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
              {copied ? 'Copied' : 'Copy email'}
            </button>
            <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 rounded-full bg-white text-ink pl-5 pr-1.5 py-1.5 t-label">
              Email me
              <span className="w-9 h-9 rounded-full bg-accent text-ink flex items-center justify-center" aria-hidden="true"><ArrowUpRight size={16} /></span>
            </a>
            <span className="sr-only" aria-live="polite">{copied ? 'Email address copied' : ''}</span>
          </div>
        </div>

        {/* Link columns + local time */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-14 md:py-16">
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="t-label text-muted-dark mb-5">{col.title}</h3>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="inline-flex items-center gap-1.5 t-body text-white hover:underline underline-offset-4"
                    >
                      {l.label}
                      {l.external && <ArrowUpRight size={14} aria-hidden="true" />}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <div>
            <h3 className="t-label text-muted-dark mb-5">Dubai, UAE</h3>
            <p className="t-display-m"><DubaiTime /></p>
            <p className="t-body-s text-muted-dark mt-2">Local time · +971 52 134 5139</p>
          </div>
        </div>

        {/* Wordmark */}
        <p aria-hidden="true" className="font-display uppercase leading-[0.78] tracking-tighter text-[37vw] lg:text-[min(37vw,560px)] -mx-1 select-none text-white">
          UMER<span className="text-accent">.</span>
        </p>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-8 border-t border-line-dark t-body-s text-muted-dark">
          <p>© 2026 Muhammad Umer.</p>
          <button
            type="button"
            onClick={() => scrollToSmooth(0)}
            className="flex items-center gap-2 t-label text-white"
          >
            Back to top <ArrowUp size={14} aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
