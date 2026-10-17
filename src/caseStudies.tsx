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

