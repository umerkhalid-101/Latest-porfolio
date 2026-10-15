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
      { label: 'How I lead', href: '#how-i-lead' },
      { label: 'Work', href: '#work' },
      { label: 'What I do', href: '#what-i-do' },
      { label: 'Skills', href: '#skills' },
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
    <footer className="bg-black text-white px-6 md:px-14 pt-20 md:pt-28 pb-8 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        {/* Closing line + email */}
        <div className="flex items-center gap-3 mb-6">
          <span className="relative flex w-3 h-3" aria-hidden="true">
            <span className="absolute inset-0 rounded-full bg-[#22C55E] animate-ping opacity-60" />
            <span className="relative w-3 h-3 rounded-full bg-[#22C55E]" />
          </span>
          <span className="text-base md:text-xl font-medium tracking-tight">Open to Lead and Design Manager roles in Dubai</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-14 md:pb-20 border-b border-white/15">
          <a href={`mailto:${EMAIL}`} className="group font-display text-[7.4vw] md:text-[6.6vw] lg:text-[clamp(64px,6.6vw,104px)] leading-[0.95] uppercase tracking-tighter whitespace-nowrap">
            <span className="bg-[linear-gradient(#FF6B35,#FF6B35)] bg-no-repeat bg-[length:0%_6px] bg-[position:0_100%] group-hover:bg-[length:100%_6px] transition-[background-size] duration-500">
              {EMAIL}
            </span>
          </a>
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={copy}
              className="flex items-center gap-2 rounded-full border border-white/25 hover:border-white px-5 py-3 text-[12px] font-bold uppercase tracking-widest transition-colors"
            >
              {copied ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
              {copied ? 'Copied' : 'Copy email'}
            </button>
            <a
              href={`mailto:${EMAIL}`}
              className="flex items-center gap-2 rounded-full bg-[#FF6B35] text-black px-5 py-3 text-[12px] font-bold uppercase tracking-widest"
            >
              Email me <ArrowUpRight size={15} aria-hidden="true" />
            </a>
            <span className="sr-only" aria-live="polite">{copied ? 'Email address copied' : ''}</span>
          </div>
        </div>

        {/* Link columns + local time */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-14 md:py-16">
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.2em] text-white/50 mb-5">{col.title}</h3>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="inline-flex items-center gap-1.5 text-[15px] md:text-[17px] text-white/85 hover:text-[#FF6B35] transition-colors"
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
            <h3 className="text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.2em] text-white/50 mb-5">Dubai, UAE</h3>
            <p className="font-display text-[44px] md:text-[56px] leading-none tracking-tight"><DubaiTime /></p>
            <p className="text-[13px] text-white/55 mt-2">Local time · +971 52 134 5139</p>
          </div>
        </div>

        {/* Wordmark */}
        <p aria-hidden="true" className="font-display uppercase leading-[0.78] tracking-tighter text-[37vw] lg:text-[min(37vw,560px)] -mx-1 select-none text-white">
          UMER<span className="text-[#FF6B35]">.</span>
        </p>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-8 border-t border-white/15 text-[12px] text-white/55">
          <p>© 2026 Muhammad Umer. Designed in Figma, built in React.</p>
          <button
            type="button"
            onClick={() => scrollToSmooth(0)}
            className="flex items-center gap-2 font-semibold uppercase tracking-widest text-white/80 hover:text-white"
          >
            Back to top <ArrowUp size={14} aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
