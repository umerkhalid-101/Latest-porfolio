import type { CaseStudyData } from './components/CaseStudyPage';

export const unita: CaseStudyData = {
  slug: 'unita',
  title: 'Unita',
  tagline: 'Designing a pre-launch B2B verified business network as the sole designer, working with the founders to decide what the platform would launch with.',
  heroBg: '#0A2E2E',
  heroText: '#FFFFFF',
  accent: '#00695C',
  facts: [
    { label: 'Role', value: 'Product Designer' },
    { label: 'Team', value: 'Founders, engineers, me' },
    { label: 'Years', value: '2025 to 2026' },
    { label: 'Scope', value: '10+ modules' }
  ],
  heroImage: { src: '/images/work-04.webp', alt: 'Unita product screens', width: 2000, height: 2000 },
  sections: [
    {
      id: 'unita-context',
      label: 'Context',
      title: 'A verified network for businesses across the UAE, the GCC, and beyond.',
      body: (
        <>
          <p>Unita Worldwide is a Swiss-headquartered B2B business network with offices in Geneva, Tirana, and Dubai. It connects verified companies so they can find, vet, and work with each other, starting with the UAE and GCC.</p>
          <p>I joined before launch as the only designer, owning product direction, scope, and delivery alongside the founders across more than ten modules.</p>
        </>
      )
    },
    {
      id: 'unita-product',
      label: 'What I designed',
      title: 'Discovery, profiles, and the path to joining.',
      body: (
        <ul>
          <li>Company profile architecture that shows who a business is and why it can be trusted.</li>
          <li>Discovery flows and map-based exploration for finding companies by sector and location.</li>
          <li>Onboarding, membership tiers, and pricing flows.</li>
          <li>Community surfaces that give members a reason to come back.</li>
        </ul>
      )
    },
    {
      id: 'unita-system',
      label: 'Design system',
      title: 'A design system built from scratch.',
      body: (
        <p>I built the design system with full token coverage and component libraries, in a dark teal and burnt orange visual language, so engineering could ship every module from one source of truth.</p>
      )
    }
  ],
  leadership: {
    roleAndTeam: (
      <p>I was the sole designer from October 2025 to March 2026, working directly with the founders and engineering. I owned product direction, scope, and delivery across 10+ modules, from discovery through the design system.</p>
    ),
    bet: (
      <p>A network only has value once businesses are on it. Before launch, Unita had to decide which membership tiers, community surfaces, and pricing would make companies join a network that did not exist yet.</p>
    ),
    hardCall: { pending: 'One decision with tradeoffs, who disagreed, and how it was resolved. A candidate: what the pricing and dedicated-offering A/B tests showed, and what you chose to launch with.' },
    howILed: (
      <ul>
        <li>Defined product priorities and scope across membership tiers, community surfaces, and pricing flows.</li>
        <li>Ran A/B tests on pricing and dedicated offerings with the founders to decide what to launch with.</li>
        <li>Worked directly with founders and engineering to keep product direction and feature priorities aligned.</li>
      </ul>
    ),
    howILedTitle: 'How I worked with the founders',
    outcome: { pending: 'What changed for the business: launch status, sign-ups, or what the pricing tests decided.' },
    differently: { pending: 'What you would do differently, looking back.' }
  }
};

export const vara: CaseStudyData = {
  slug: 'vara',
  title: 'VARA',
  tagline: "Designing the web portal for Dubai's Virtual Assets Regulatory Authority, from the homepage to a five-step licensing guide, on a layout system built with engineering.",
  heroBg: '#0B1F3A',
  heroText: '#FFFFFF',
  accent: '#1E3A5F',
  facts: [
    { label: 'Role', value: 'Design Specialist' },
    { label: 'Agency', value: 'MBLM Dubai' },
    { label: 'Year', value: '2026' },
    { label: 'Platform', value: 'Desktop and mobile' }
  ],
  sections: [
    {
      id: 'vara-context',
      label: 'Context',
      title: 'The front door to a regulated industry.',
      body: (
        <>
          <p>VARA regulates virtual assets in Dubai. Its website is where firms learn the rules and start the licensing process, so clarity has real legal and financial weight.</p>
          <p>I designed the portal at MBLM as part of my work on government and regulated-sector clients in the UAE, covering desktop and mobile end to end.</p>
        </>
      )
    },
    {
      id: 'vara-scope',
      label: 'What I designed',
      title: 'Homepage, internal pages, and a licensing guide.',
      body: (
        <ul>
          <li>The desktop and mobile homepage and the internal page templates.</li>
          <li>A five-step licensing guide with continue and recovery states, so applicants can pick up where they left off and get back on track when something goes wrong.</li>
          <li>A reusable UI kit covering forms, tables, the step wizard, and search and filters.</li>
        </ul>
      )
    },
    {
      id: 'vara-system',
      label: 'Layout system',
      title: 'A 12-column grid built with engineering.',
      body: (
        <p>I built the VARA layout system on a 12-column grid together with engineering, and set the typography and responsive guidelines that keep pages consistent across every breakpoint. The same foundation now keeps MBLM's other portal projects consistent too.</p>
      )
    }
  ],
  leadership: {
    roleAndTeam: (
      <p>I joined MBLM Dubai as a Design Specialist in March 2026. On VARA I owned the portal design across desktop and mobile, and worked with engineering on the layout system and UI kit.</p>
    ),
    bet: { pending: "The business problem and why it mattered to VARA, for example what went wrong for applicants before, and what the portal had to fix." },
    hardCall: { pending: 'One decision with tradeoffs, who disagreed, and how it was resolved. A candidate: how the licensing guide handles continue and recovery states.' },
    howILed: (
      <ul>
        <li>Defined the 12-column layout system with engineering so design and build used the same structure.</li>
        <li>Set typography and responsive guidelines that every page and breakpoint follows.</li>
        <li>Built the UI kit once, for forms, tables, the wizard, and search, so new pages reuse proven components.</li>
      </ul>
    ),
    howILedTitle: 'How I worked with engineering',
    outcome: { pending: 'What changed for VARA: launch status, and any results or feedback you are cleared to share.' },
    differently: { pending: 'What you would do differently, looking back.' }
  }
};
