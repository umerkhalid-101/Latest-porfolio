import type { CaseStudyData } from './components/CaseStudyPage';

export const zewards: CaseStudyData = {
  slug: 'zewards',
  title: 'Zewards',
  tagline: 'Leading design for a loyalty and cashback platform in the Zewst restaurant ecosystem, built to fit inside a thirty second interaction at the counter.',
  heroBg: '#3E1A6B',
  heroText: '#FFFFFF',
  accent: '#6E36A7',
  facts: [
    { label: 'Role', value: 'Design Manager' },
    { label: 'Team', value: '2 to 3 designers' },
    { label: 'Years', value: '2024' },
    { label: 'Product', value: 'B2B2C loyalty' }
  ],
  heroImage: { src: '/images/zewards-1.webp', alt: 'Zewards product ecosystem: consumer app, business app, and marketing site', width: 1060, height: 600 },
  metrics: [
    { value: '38%', label: 'More repeat visits', context: 'After improving reward clarity and progress visibility.' },
    { value: '2.3x', label: 'Faster first-time activation', context: 'Through a single-decision onboarding flow.' },
    { value: '54%', label: 'Higher reward redemption', context: 'Driven by simpler rules and clearer next steps.' }
  ],
  sections: [
    {
      id: 'zewards-ecosystem',
      label: 'Context',
      title: 'One product inside a four-product ecosystem.',
      body: (
        <>
          <p>Hauraki built the Zewst ecosystem of restaurant tech: Zewst POS (500+ merchants), Zewst Portfolio for BI, Zewst Phone for business calling, and Zewards for loyalty. As Design Manager I set design direction across all four and owned Zewards end to end.</p>
          <p>Zewards rewards real visits instead of generic points. I treated it as one system with three views: a consumer app for people, a business app for operators, and a marketing site for decision makers.</p>
        </>
      )
    },
    {
      id: 'zewards-problem',
      label: 'Problem',
      title: 'Loyalty felt either outdated or over engineered.',
      body: (
        <>
          <p>Most loyalty programs fail at the counter. Staff have no time to explain complex rules, customers will not download an app they do not understand, and owners stop opening dashboards after the first month.</p>
          <h3>Constraints I designed around</h3>
          <ul>
            <li>No training time for staff. They learn it on shift one.</li>
            <li>Signups must fit inside a single visit while an order is being made.</li>
            <li>Owners want repeat visits, not another analytics product.</li>
            <li>A small engineering team, so the design system had to be realistic to ship.</li>
          </ul>
        </>
      ),
      image: { src: '/images/zewards-2.avif', alt: 'Zewards consumer app screens side by side', width: 430, height: 495 }
    },
    {
      id: 'zewards-process',
      label: 'Process',
      title: 'From real behavior to one mental model.',
      body: (
        <>
          <h3>Start from how loyalty already works</h3>
          <p>I interviewed shoppers and owners about punch cards, ad hoc free coffees, and tools they had abandoned, then mapped one visit and one month of the journey for customers, staff, and owners.</p>
          <h3>Reduce everything to one loop</h3>
          <p>Scan once, see progress, know what happens next, on every screen. The consumer app centers on today, progress, and reward details. The business app centers on set up, run, and understand.</p>
          <h3>Test where friction shows up</h3>
          <p>I tested onboarding, first scan, and first redemption with realistic service scripts, then simplified copy and campaign presets where people hesitated.</p>
        </>
      ),
      images: [
        { src: '/images/zewards-5.avif', alt: 'Zewards consumer app onboarding and wallet setup', width: 430, height: 495 },
        { src: '/images/zewards-6.avif', alt: 'Zewards consumer app reward details and progress', width: 430, height: 495 }
      ]
    },
    {
      id: 'zewards-business',
      label: 'Business app',
      title: 'Giving merchants control without overwhelming them.',
      body: (
        <ul>
          <li>Campaign creation framed in business language like repeat visits and average ticket size.</li>
          <li>QR placements organized around how staff actually interact with customers.</li>
          <li>A performance overview that answers one question first: is this worth continuing?</li>
          <li>Layouts and contrast tuned for shared devices and poor lighting.</li>
        </ul>
      ),
      image: { src: '/images/zewards-4.avif', alt: 'Zewards business app campaign and dashboard views', width: 530, height: 300 }
    }
  ],
  leadership: {
    roleAndTeam: (
      <>
        <p>I joined Hauraki in September 2023 as Senior Product Designer and became Design Manager in February 2024. I managed a team of 2 to 3 designers and worked directly with the founders and engineering.</p>
        <p>On Zewards I owned UX strategy, research, flows, information architecture, interaction design, the design system, and handoff.</p>
      </>
    ),
    bet: (
      <p>Merchants already had loyalty tools that were either too simple to drive behavior or too heavy to survive a busy shift. The bet was that a QR-based flow tying real visits to tangible rewards would bring people back on purpose, and give Zewst a reason for merchants to stay in the ecosystem.</p>
    ),
    hardCall: { pending: 'One decision with tradeoffs, who disagreed, and how it was resolved. A candidate: making onboarding a single decision instead of a form, trading customer data for activation speed.' },
    howILed: (
      <ul>
        <li>Set the design direction across the four Zewst products and aligned with engineering on shared standards.</li>
        <li>Scaled one pattern library across all four products to reduce design-to-development friction.</li>
        <li>Documented components, tokens, and interaction rules for scanning, redemption, and error states so engineering had one source of truth.</li>
      </ul>
    ),
    outcome: (
      <p>Repeat visits rose 38%, first-time activation got 2.3x faster, and reward redemption rose 54%. Merchants got a loyalty program they could launch from presets without a playbook.</p>
    ),
    differently: { pending: 'What you would do differently, looking back.' }
  }
};

export const folionomics: CaseStudyData = {
  slug: 'folionomics',
  title: 'Folionomics',
  tagline: 'Redesigning a wallet viewer into a strategy-first portfolio product for multi-chain investors who care about risk and runway, not just balances.',
  heroBg: '#0D0D0D',
  heroText: '#FFFFFF',
  accent: '#217346',
  facts: [
    { label: 'Role', value: 'Product designer' },
    { label: 'Team', value: 'Founder, engineer, me' },
    { label: 'Product', value: 'Crypto portfolio' },
    { label: 'Outcome', value: '+25% retention' }
  ],
  heroImage: { src: '/images/folionomics-1.webp', alt: 'Folionomics portfolio dashboard', width: 1060, height: 600 },
  metrics: [
    { value: '+25%', label: 'User retention', context: 'After the unified wallet view shipped.' },
    { value: '60+', label: 'Chains in one view', context: 'EVM, Bitcoin, Solana, and more, organized by strategy.' },
    { value: '1', label: 'Session to first insight', context: 'New users reach a strategy view without bouncing between wallets.' }
  ],
  sections: [
    {
      id: 'folionomics-problem',
      label: 'Problem',
      title: 'Balances per wallet, but no picture of the portfolio.',
      body: (
        <>
          <p>Folionomics showed what sat inside each wallet, but not how people think about their crypto wealth. Serious users exported data into spreadsheets just to see which bets were long term, which were experiments, and where their real risk was.</p>
          <p>The product answered where a token lived, not what the capital was doing. It informed, but it did not support decisions.</p>
        </>
      ),
      image: { src: '/images/folionomics-2.webp', alt: 'Folionomics portfolio breakdown by strategy', width: 860, height: 990 }
    },
    {
      id: 'folionomics-research',
      label: 'Research',
      title: 'People group assets into strategies, not chains.',
      body: (
        <ul>
          <li>Investors think in strategies: long term bets, experiments, yield, and reserves.</li>
          <li>Most do not know their real concentration risk until it is shown at portfolio level.</li>
          <li>Plain-language risk bands work better than dense metrics for non-institutional users.</li>
          <li>Being honest about data quality builds more trust than pretending every number is exact.</li>
        </ul>
      )
    },
    {
      id: 'folionomics-decisions',
      label: 'Design decisions',
      title: 'Decisions that changed what investors could answer.',
      body: (
        <>
          <h3>Simple risk bands instead of complex ratios</h3>
          <p>Most users are not quants. Bands and concentration flags communicate fragility without scaring people away, and more users now engage with risk views instead of skipping them.</p>
          <h3>Separate confirmed data from estimates</h3>
          <p>On-chain data can be delayed or partial. Marking estimates clearly set better expectations and made the product feel more serious.</p>
          <h3>Validated with real questions</h3>
          <p>In moderated sessions, investors had to find an overexposed strategy in under a minute, estimate stablecoin runway, and read cross-chain exposure for a core token. The strategy-first model held up.</p>
        </>
      ),
      image: { src: '/images/folionomics-3.avif', alt: 'Folionomics cross-chain exposure view', width: 430, height: 495 }
    },
    {
      id: 'folionomics-screens',
      label: 'Screens',
      title: 'One tracker for all chains, organized by strategy.',
      body: <p>The home view brings strategies, risk bands, and chain exposure into one place. Color is reserved for meaning, such as performance, risk, and status, not decoration.</p>,
      images: [
        { src: '/images/folionomics-4.webp', alt: 'Folionomics detailed screens', width: 1060, height: 600 }
      ]
    }
  ],
  leadership: {
    roleAndTeam: (
      <p>I was the only product designer on a three-person team with the founder and an engineer. I owned the work from problem framing through research, information architecture, flows, the visual system, and usability tests.</p>
    ),
    bet: (
      <p>Crypto trackers were commodities that all showed balances. The bet was that mapping on-chain data to how investors actually think about their capital would turn Folionomics into a tool people return to for decisions, and set it up for tax, reporting, and analytics later.</p>
    ),
    hardCall: (
      <>
        <p><strong>Make portfolios the primary object, not wallets.</strong> Wallets became sources of liquidity feeding one or more portfolios, and chains moved from the top level to attributes of assets.</p>
        <p>The tradeoff was reshaping the product's core model instead of polishing the existing wallet screens. It gave the team a stable base for navigation, metrics, and future modules without fighting the data.</p>
      </>
    ),
    howILed: (
      <ul>
        <li>Worked with the founder and engineer to reshape the object model before designing screens.</li>
        <li>Prototyped with realistic synthetic portfolios and price movement to see how the interface held up in volatile markets.</li>
        <li>Built a modular design system so tax, reporting, and analytics can share the same hierarchy later.</li>
      </ul>
    ),
    howILedTitle: 'How I worked with the team',
    outcome: (
      <p>User retention rose 25% after the unified wallet view shipped, and new users reached a strategy view in their first session instead of bouncing between wallets.</p>
    ),
    differently: { pending: 'What you would do differently, looking back.' }
  }
};

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
