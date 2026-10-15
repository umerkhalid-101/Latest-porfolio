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
