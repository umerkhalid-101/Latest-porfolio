import { motion, useReducedMotion } from 'motion/react';
import { useEffect, useState, type KeyboardEvent } from 'react';
import { SectionHeader } from './SectionHeader';

// Skills as a tactile keyboard: press a key, the retro screen types out where I used it.
// Every proof line comes from LinkedIn (experience entries and the summary).

type Kind = 'accent' | 'skill' | 'tool';
type Skill = { key: string; name: string; kind: Kind; lines: [string, string][] };

const skills: Skill[] = [
  // Leading
  { key: 'LEADERSHIP', name: 'Design leadership', kind: 'accent', lines: [
    ['Hauraki', 'Design Manager, set direction across four products'],
    ['Axion Dynamic', 'Product Team Lead on Jobbit'],
    ['Salams', 'Led design across the full product through the acquisition'],
  ] },
  { key: 'MENTORING', name: 'Team mentoring', kind: 'skill', lines: [
    ['Hauraki', 'Managed and mentored designers as Design Manager'],
    ['Axion Dynamic', 'Managed and mentored designers as Product Team Lead'],
  ] },
  { key: 'CRITIQUE', name: 'Design critique', kind: 'skill', lines: [
    ['Hauraki', 'Set the quality bar for the design team'],
    ['Axion Dynamic', 'Set the quality bar for the design team'],
  ] },
  { key: 'STAKEHOLDERS', name: 'Stakeholder management', kind: 'skill', lines: [
    ['Salams', 'Worked with the founders through the acquisition'],
    ['Axion Dynamic', 'Aligned founders and technical leads on decisions'],
    ['Unita', 'Kept founders and engineering aligned on priorities'],
  ] },
  { key: 'STRATEGY', name: 'Product strategy', kind: 'accent', lines: [
    ['Unita', 'Defined priorities across tiers, community and pricing'],
    ['Axion Dynamic', 'Defined modules and workflows for supply chain'],
    ['Hauraki', 'Shaped direction across products with the founders'],
  ] },
  { key: 'DISCOVERY', name: 'Product discovery', kind: 'skill', lines: [
    ['Axion Dynamic', 'Stakeholder interviews and flow analysis to cut build risk'],
    ['Unita', 'Discovery flows and map-based exploration'],
  ] },
  { key: 'HANDOFF', name: 'Engineering handoff', kind: 'skill', lines: [
    ['Axion Dynamic', 'Stayed with engineering until it shipped as scoped'],
    ['Hauraki', 'Aligned with engineering on shared standards'],
    ['MBLM', 'Built the 12-column grid with engineering'],
  ] },
  { key: 'A/B TESTING', name: 'A/B testing', kind: 'accent', lines: [
    ['Salams', 'Pricing models, ghost mode, voice telegrams'],
    ['Unita', 'Pricing and dedicated offerings before launch'],
  ] },
  // Designing
  { key: 'SYSTEMS', name: 'Design systems', kind: 'accent', lines: [
    ['Unita', 'Design system from scratch, full token coverage'],
    ['Hauraki', 'Scaled one pattern library across four products'],
    ['Axion Dynamic', 'Scalable Figma design system'],
    ['Salams', 'Built the first version of the design system'],
    ['MBLM', 'VARA layout system and reusable UI kit'],
  ] },
  { key: 'UX RESEARCH', name: 'UX research', kind: 'skill', lines: [
    ['Truebill', '30+ usability and validation studies'],
    ['Salams', 'Usability sessions with early users'],
  ] },
  { key: 'USABILITY', name: 'Usability testing', kind: 'skill', lines: [
    ['Salams', 'Tested new features before launch, fed the roadmap'],
    ['Truebill', 'Validation studies on account linking and transactions'],
  ] },
  { key: 'IA', name: 'Information architecture', kind: 'skill', lines: [
    ['Unita', 'Company profile architecture across 10+ modules'],
    ['Zewards', 'Shallow, clear IA across two apps'],
  ] },
  { key: 'USER FLOWS', name: 'User flows', kind: 'skill', lines: [
    ['Salams', 'Onboarding, profile setup and matching flows'],
    ['Axion Dynamic', 'User flow analysis for supply chain workflows'],
  ] },
  { key: 'PROTOTYPING', name: 'Prototyping', kind: 'skill', lines: [
    ['Axion Dynamic', 'Rapid prototyping to inform priorities'],
  ] },
  { key: 'ONBOARDING', name: 'Onboarding design', kind: 'skill', lines: [
    ['Salams', 'Activation flow redesigns for early retention'],
    ['Hauraki', 'QR onboarding for Zewards'],
    ['Unita', 'Onboarding for a verified business network'],
  ] },
  { key: 'MOBILE', name: 'Mobile apps', kind: 'skill', lines: [
    ['Salams', 'iOS and Android app, past a million users'],
    ['Hauraki', 'Zewst Phone and the Zewards apps'],
  ] },
  { key: 'DASHBOARDS', name: 'Dashboards & data', kind: 'skill', lines: [
    ['Hauraki', 'Zewst Portfolio BI dashboard'],
    ['Truebill', 'Financial dashboards and transactions'],
    ['MBLM', 'AI product admin dashboard'],
  ] },
  { key: 'WEB PORTALS', name: 'Responsive web portals', kind: 'skill', lines: [
    ['MBLM', 'VARA portal, desktop and mobile'],
    ['MBLM', 'Typography and responsive guidelines across breakpoints'],
  ] },
  { key: 'EN / AR', name: 'Bilingual English and Arabic', kind: 'skill', lines: [
    ['MBLM', 'Bilingual portals for government and regulated clients'],
  ] },
  { key: 'GOV', name: 'Government & regulated', kind: 'accent', lines: [
    ['MBLM', 'VARA portal and five-step licensing guide'],
  ] },
  { key: 'FINTECH', name: 'Fintech', kind: 'skill', lines: [
    ['Truebill', 'Payment and authorization journeys, -18% drop-offs'],
    ['Hauraki', 'Restaurant POS and one-tap payments'],
  ] },
  { key: 'AI PRODUCTS', name: 'AI product design', kind: 'skill', lines: [
    ['MBLM', 'AI chat and AI insights in a product UI'],
    ['Hauraki', 'AI order handling and AI receipt scanning'],
  ] },
  { key: 'MARKETPLACES', name: 'B2B marketplaces', kind: 'skill', lines: [
    ['Unita', 'Verified B2B network for the UAE and GCC'],
  ] },
  // Tools
  { key: 'FIGMA', name: 'Figma', kind: 'tool', lines: [['Toolkit', 'Still hands-on in Figma every day']] },
  { key: 'REACT', name: 'React', kind: 'tool', lines: [['Toolkit', 'Hands-on with React']] },
  { key: 'NEXT.JS', name: 'Next.js', kind: 'tool', lines: [['Toolkit', 'Hands-on with Next.js']] },
  { key: 'TAILWIND', name: 'Tailwind', kind: 'tool', lines: [['Toolkit', 'Hands-on with Tailwind']] },
  { key: 'CLAUDE API', name: 'Claude API', kind: 'tool', lines: [['Toolkit', 'AI workflows built on the Claude API']] },
  { key: 'N8N', name: 'n8n', kind: 'tool', lines: [['Toolkit', 'AI workflows built with n8n']] },
];

// Desktop keyboard rows (indices into skills), staggered like a real keyboard
const rows = [
  [0, 1, 2, 3, 4, 5, 6, 7],
  [8, 9, 10, 11, 12, 13, 14, 15],
  [16, 17, 18, 19, 20, 21, 22],
  [23, 24, 25, 26, 27, 28],
];
const rowIndent = ['lg:pl-0', 'lg:pl-4', 'lg:pl-8', 'lg:pl-16'];

const keyStyle: Record<Kind, { cap: string; edge: string; text: string }> = {
  accent: { cap: 'bg-accent', edge: 'color-mix(in srgb, var(--color-accent) 65%, black)', text: 'text-ink' },
  skill: { cap: 'bg-paper', edge: 'color-mix(in srgb, var(--color-paper) 70%, black)', text: 'text-ink' },
  tool: { cap: 'bg-ink-soft', edge: 'var(--color-ink)', text: 'text-white' },
};

/** Types its lines out character by character, restarting whenever the skill changes */
function Screen({ skill }: { skill: Skill }) {
  const reduce = useReducedMotion();
  const full = [`> ${skill.name.toUpperCase()}`, ...skill.lines.map(([who, what]) => `  ${who}: ${what}`)];
  const total = full.join('\n').length;
  const [typed, setTyped] = useState(reduce ? total : 0);

  useEffect(() => {
    if (reduce) { setTyped(total); return; }
    setTyped(0);
    let n = 0;
    const id = setInterval(() => {
      n += 3;
      setTyped(Math.min(n, total));
      if (n >= total) clearInterval(id);
    }, 16);
    return () => clearInterval(id);
  }, [skill, total, reduce]);

  // Slice the joined text, then split back into lines for styling
  const shown = full.join('\n').slice(0, typed).split('\n');

  return (
    <div className="relative rounded-3xl bg-ink border-8 border-ink-soft overflow-hidden">
      {/* scanlines */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none opacity-60" style={{ backgroundImage: 'repeating-linear-gradient(0deg, var(--color-line-dark) 0px, var(--color-line-dark) 1px, transparent 1px, transparent 3px)' }} />
      <div className="relative px-5 md:px-7 py-5 md:py-6 text-accent min-h-[220px] md:min-h-[260px]" aria-live="polite">
        <div className="flex items-center justify-between t-label text-muted-dark mb-4">
          <span>umer@portfolio ~ skills</span>
          <span>{skills.indexOf(skill) + 1}/{skills.length}</span>
        </div>
        <p className="sr-only">{skill.name}. {skill.lines.map(([w, t]) => `${w}: ${t}.`).join(' ')}</p>
        <div aria-hidden="true" className="t-body-s text-white">
          {shown.map((line, i) => (
            <p key={i} className={i === 0 ? 't-display-m text-accent mb-3' : 'whitespace-pre-wrap py-0.5'}>
              {line}
              {i === shown.length - 1 && <span className="inline-block w-[0.55em] h-[0.95em] bg-accent align-middle ml-0.5 motion-safe:animate-pulse" />}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

function Key({ skill, active, onPress, onKeyNav }: { skill: Skill; active: boolean; onPress: () => void; onKeyNav: (e: KeyboardEvent<HTMLButtonElement>) => void }) {
  const s = keyStyle[skill.kind];
  return (
    <motion.button
      type="button"
      data-key
      aria-pressed={active}
      aria-label={skill.name}
      onClick={onPress}
      onPointerEnter={(e) => { if (e.pointerType === 'mouse') onPress(); }}
      onFocus={onPress}
      onKeyDown={onKeyNav}
      animate={{ y: active ? 4 : 0 }}
      whileTap={{ y: 6 }}
      transition={{ type: 'spring', stiffness: 700, damping: 30 }}
      className={`relative min-w-0 h-14 md:h-16 rounded-xl ${s.cap} ${s.text} text-left px-2.5 pt-2 focus:outline-none focus-visible:ring-4 focus-visible:ring-accent/50`}
      style={{ flex: `${skill.key.length + 3} 1 ${skill.key.length * 9 + 24}px`, boxShadow: active ? `0 1px 0 ${s.edge}, inset 0 -2px 0 var(--color-line)` : `0 6px 0 ${s.edge}, inset 0 -3px 0 var(--color-line)` }}
    >
      <span className="block t-label whitespace-nowrap">{skill.key}</span>
      {active && <span aria-hidden="true" className="absolute right-2.5 top-2.5 w-1.5 h-1.5 rounded-full bg-success" />}
    </motion.button>
  );
}

export function Skills() {
  const [active, setActive] = useState(0);

  // Arrow keys move to the nearest visible keycap in that direction (works for both layouts)
  const nav = (e: KeyboardEvent<HTMLButtonElement>) => {
    const dir = { ArrowRight: [1, 0], ArrowLeft: [-1, 0], ArrowDown: [0, 1], ArrowUp: [0, -1] }[e.key as string];
    if (!dir) return;
    e.preventDefault();
    const from = e.currentTarget.getBoundingClientRect();
    const fx = from.left + from.width / 2, fy = from.top + from.height / 2;
    let best: HTMLButtonElement | null = null, bestScore = Infinity;
    for (const el of e.currentTarget.closest('[role=group]')!.querySelectorAll<HTMLButtonElement>('button[data-key]')) {
      if (el === e.currentTarget || el.offsetParent === null) continue;
      const r = el.getBoundingClientRect();
      const dx = r.left + r.width / 2 - fx, dy = r.top + r.height / 2 - fy;
      const along = dx * dir[0] + dy * dir[1];
      if (along <= 4) continue;
      const score = along + Math.abs(dx * dir[1] + dy * dir[0]) * 2;
      if (score < bestScore) { bestScore = score; best = el; }
    }
    best?.focus();
  };

  return (
    <section id="skills" className="relative bg-ink text-white px-6 md:px-14 py-16 md:py-24">
      <div className="max-w-[1400px] w-full mx-auto">
        <SectionHeader
          dark
          label="Skills"
          title="Press a key."
          muted="See where I used it."
          note="Orange keys are my strongest. Dark keys are the tools I build with. Arrow keys work too."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-4 order-1 lg:order-2">
            <Screen skill={skills[active]} />
          </div>

          {/* Keyboard */}
          <div className="lg:col-span-8 order-2 lg:order-1 rounded-3xl bg-ink-soft border border-line-dark p-3 md:p-5">
            <div role="group" aria-label="Skills keyboard" className="flex flex-col gap-2 md:gap-2.5">
              {/* Desktop: staggered rows */}
              {rows.map((row, r) => (
                <div key={r} className={`hidden lg:flex gap-2 ${rowIndent[r]}`}>
                  {row.map((i) => (
                    <Key key={skills[i].key} skill={skills[i]} active={i === active} onPress={() => setActive(i)} onKeyNav={nav} />
                  ))}
                </div>
              ))}
              {/* Phones and tablets: a simple grid */}
              <div className="flex flex-wrap lg:hidden gap-2">
                {skills.map((sk, i) => (
                  <Key key={sk.key} skill={sk} active={i === active} onPress={() => setActive(i)} onKeyNav={nav} />
                ))}
              </div>
              {/* Spacebar: jumps to the work */}
              <div className="flex gap-2 md:gap-3 lg:px-24">
                <motion.a
                  href="#work"
                  whileTap={{ y: 6 }}
                  transition={{ type: 'spring', stiffness: 700, damping: 30 }}
                  className="flex-1 h-14 md:h-16 rounded-xl bg-paper text-ink flex items-center justify-center t-label"
                  style={{ boxShadow: '0 6px 0 color-mix(in srgb, var(--color-paper) 70%, black), inset 0 -3px 0 var(--color-line)' }}
                >
                  See my work ↑
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
