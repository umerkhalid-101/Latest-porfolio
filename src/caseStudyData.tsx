import { ShieldCheck } from 'lucide-react';
import type { CaseStudy } from './components/CaseStudyTemplate';

// Case studies on the shared Salams template. Every fact comes from LinkedIn, the resume, or the earlier case study copy.

export const salams: CaseStudy = {
  slug: 'salams',
  title: 'Salams',
  tagline: 'Designing a marriage-focused matchmaking app from the ground up, across onboarding, trust, retention, and monetization, through to the Match Group acquisition in 2023.',
  theme: { primary: '#D81B60', accent: '#C2185B', soft: '#FF8FAB', highlight: '#FF4D8D', cream: '#FFFDEE', tint: '#EEF7D2' },
  roles: [
    { label: 'Role', value: 'Junior UX Designer to Senior Product Designer' },
    { label: 'Platform', value: 'iOS & Android' },
    { label: 'Years', value: '2018 to 2023' },
    { label: 'Outcome', value: 'Acquired ↗' },
  ],
  heroImage: { src: '/images/salams-02.webp', alt: 'Salams mobile screens', width: 704, height: 524 },
  context: {
    title: 'A dating app built for people who are serious about marriage.',
    body: (
      <>
        <p>Muslim matchmaking sits at the intersection of modern app conventions and deeply held cultural values around marriage, family, and community. I joined Salams in 2018 as the first design hire on a small team building the app from the ground up. As it scaled past its first million users, the experience was letting people down at every stage.</p>
        <p>The app looked like every other dating app on the market. That was exactly the wrong signal for an audience that wasn't here to swipe casually. They were here to find a life partner. Users were dropping off during onboarding, fake profiles were eroding trust, ghosting was rampant, and the monetization felt awkward against the emotional weight of what people were trying to do.</p>
        <p>I was the sole designer across all of these problems for <span className="font-bold">5 years</span>, until <span className="text-[var(--cs-accent)] font-bold">Match Group acquired Salams in 2023</span>.</p>
      </>
    ),
    highlights: [
      <>Users were <mark className="bg-[#FF4D8D]/20 font-bold px-1 rounded">more serious than Tinder users</mark>. They wanted depth, not just swiping. Every interaction carried the weight of a potential life decision.</>,
      <>Ghosting carried <mark className="bg-[#FF4D8D]/20 font-bold px-1 rounded">real cultural weight</mark>. Being ignored after connecting felt disrespectful in a way that a generic dating app never accounts for.</>,
      <>Many users had <mark className="bg-[#FF4D8D]/20 font-bold px-1 rounded">family involved in their search</mark>. Trust and legitimacy weren't nice to have features. They were the product itself.</>,
    ],
  },
  problem: {
    image: { src: '/images/salams-03.webp', alt: 'Matchmaking problem illustration', width: 1543, height: 1377 },
    questions: [
      { q: 'When was the last time a Muslim dating app felt like it understood you?', a: "Generic dating apps are designed for casual connection. Salams users came for something far more serious: marriage. The app's look, feel, and flows sent the wrong message from the very first screen, and users were leaving before they ever matched." },
      { q: 'When was the last time you trusted every profile you saw on a matchmaking app?', a: "Fake profiles were a real crisis for this audience. In a community making marriage decisions, encountering a fraudulent profile wasn't just annoying. It was a betrayal of the platform's entire promise. Trust was collapsing and users felt it." },
    ],
  },
  mattered: [
    { label: 'Why it mattered?', statement: '60 to 70% of new users were dropping off during onboarding before ever seeing a single profile.', note: '↓ Brought down to 40% after redesign' },
    { label: 'The cultural reality', statement: "Ghosting someone on a Muslim marriage app doesn't just hurt. In this community, it's disrespectful and it was destroying retention.", note: '→ Led to the anti-ghosting mechanic' },
  ],
  quote: {
    label: 'Why do these numbers matter?',
    text: 'In a community built on trust and intention, every broken experience is a person who gave up on finding a life partner.',
    flow: 'ONBOARDING → TRUST → RETENTION → REVENUE',
  },
  problemSpaces: [
    { title: 'Getting in the door', image: { src: '/images/salams-04.webp', alt: 'Getting in the door illustration', width: 214, height: 214 }, questions: ['Why were users abandoning onboarding?', 'What fields were unnecessary friction?', 'How many steps was too many?', 'What did “trustworthy” look like on screen one?'] },
    { title: 'Building trust', image: { src: '/images/salams-05.webp', alt: 'Building trust illustration', width: 214, height: 214 }, questions: ['How do you prove someone is real?', 'What verification methods are acceptable?', 'How do you surface trust signals without feeling invasive?', 'What does a “safe” profile card look like?'] },
    { title: 'Making matches meaningful', image: { src: '/images/salams-06.webp', alt: 'Making matches meaningful illustration', width: 214, height: 214 }, questions: ['Why were matches not converting to conversations?', 'How do you discourage ghosting without being preachy?', "How do monetization prompts serve the user's goal?", 'What does a respectful upsell look like?'] },
  ],
  gap: {
    lead: 'Identifying the gap led to the solution:',
    statement: <>A matchmaking app built <span className="font-semibold">specifically for Muslim users seeking marriage</span> with trust built in, not bolted on, and monetization that serves people rather than manipulates them.</>,
    image: { src: '/images/salams-07.webp', alt: 'The Salams app, built for Muslim users seeking marriage', width: 800, height: 991 },
  },
  strategy: {
    statement: <><span className="font-extrabold">Salams</span> aims to provide a <span className="font-extrabold">holistic platform for Muslim matchmaking</span> by offering a tailored experience built on trust, depth, and genuine intention.</>,
    screens: [
      { image: { src: '/images/salams-08.webp', alt: 'Redesigned onboarding screen', width: 800, height: 1444 }, caption: 'A redesigned onboarding with progressive disclosure, simplified steps, and a modern visual identity that signals trust from screen one.' },
      { image: { src: '/images/salams-09.webp', alt: 'Selfie verification screen', width: 800, height: 1444 }, caption: 'ID verification badge and selfie verification, surfaced prominently on every profile card to rebuild community trust at scale.' },
      { image: { src: '/images/salams-10.webp', alt: 'Anti-ghosting screen', width: 800, height: 1444 }, caption: "Anti-ghosting mechanic: if you haven't replied, the app forces a decision. Reply or unmatch. No silent disappearing allowed." },
    ],
  },
  research: {
    title: 'I ran user interviews to understand what people needed.',
    body: <p>Participants were recruited through surveys and community outreach, helping me reach users across the two main archetypes. I ran usability tests alongside interviews to validate assumptions in real time.</p>,
    image: { src: '/images/salams-11.webp', alt: 'User interview call screenshots', width: 1485, height: 837 },
  },
  synthesis: {
    label: '// 1 Onboarding Drop-off',
    title: 'The flow was asking too much, too soon.',
    points: ['Users wanted to see profiles before committing personal details.', 'Fields like "sect" and "income" felt intrusive on first use.', 'Progress indicators were absent, so the end felt unknowable.'],
    quote: 'I stopped using the app because I matched with someone who turned out to be completely fake. There was nothing to tell me they were real before I invested time in them.',
  },
  insights: {
    title: 'Insights that shaped the approach',
    body: (
      <>
        <p>For each key theme from the research, I ran affinity mapping to surface the insights that would guide the solutions.</p>
        <p>From those insights, I derived solution criteria which acted as design principles: trust must be visible, onboarding must feel effortless, and monetization must always serve the user's goal of marriage, not the platform's goal of revenue extraction.</p>
      </>
    ),
    image: { src: '/images/salams-12.webp', alt: 'Insights affinity mapping diagram', width: 2000, height: 1447 },
  },
  ethos: {
    title: 'Building the brand ethos.',
    principles: [
      { title: 'Safety over speed.', body: "We verify every user with selfie and ID checks. Trust isn't a feature you toggle on. It's the foundation the whole product is built on.", icon: ShieldCheck },
      { title: 'Respect is the floor.', body: "Ghosting isn't allowed here. Every user deserves a response. Our mechanics enforce dignity, not just good manners.", image: { src: '/images/salams-14.webp', alt: '', width: 200, height: 200 } },
      { title: 'Your goal is our goal.', body: "We're committed to helping you find a life partner. Every upsell, every feature, every flow is designed to serve that goal not extract from it.", image: { src: '/images/salams-15.webp', alt: '', width: 200, height: 200 } },
    ],
  },
  solutions: {
    modules: [
      { tag: 'REDESIGNED ONBOARDING', title: 'Redesigned Onboarding', image: { src: '/images/salams-16.webp', alt: 'Redesigned onboarding high fidelity screen', width: 800, height: 1501 }, body: (
        <>
          <p>Shortened the number of steps significantly and removed fields that created friction before users had a reason to trust us. Progressive disclosure means users build their profile over time, not all at once on day one.</p>
          <p>The UI redesign also sent a new signal: this isn't Tinder. Clean typography, warm tones, and a clear sense of progress made the experience feel serious and modern from the first screen.</p>
        </>
      ) },
      { tag: 'SECURITY FLOW', title: 'ID Verification & Trust System', image: { src: '/images/salams-17.webp', alt: 'ID verification high fidelity screen', width: 800, height: 1501 }, body: (
        <>
          <p>Selfie verification tied directly to profile creation. The ID verification badge appears on every profile card not as a one-time gate, but as a constant, visible signal throughout the entire app experience.</p>
          <p>The reporting and blocking flows were also completely redesigned to feel useful rather than futile, and to surface in context rather than buried in settings.</p>
        </>
      ) },
      { tag: 'ENGAGEMENT STRATEGY', title: 'Anti-Ghosting Mechanic', image: { src: '/images/salams-18.webp', alt: 'Anti-ghosting high fidelity screen', width: 800, height: 1501 }, body: (
        <>
          <p>If you hadn't replied to a match and tried to move on in the app, a screen appeared forcing a decision: reply or unmatch. No silent disappearing allowed.</p>
          <p>In a community where ghosting carries real cultural weight, this wasn't just a retention play. It was a statement about the kind of community Salams wanted to be.</p>
        </>
      ) },
      { tag: 'REVENUE SHIELD', title: "Monetization That Doesn't Manipulate", image: { src: '/images/salams-19.webp', alt: 'Monetization high fidelity screen', width: 800, height: 1502 }, body: (
        <>
          <p>Designed the full monetization stack: Telegrams (paid ice breaker messages), Gold and Diamond subscription tiers, Boosts for visibility, and upsell prompts placed at high-intent moments like right after a match.</p>
          <p>Every prompt was framed as a tool to increase your chances, not a gate to basic respect. This was the hardest design challenge of the 5 years and the one that taught me the most about ethical design.</p>
        </>
      ) },
    ],
  },
  designSystem: {
    title: 'Building a Design System',
    body: <p>Building a design system made the non-linear, iterative process much smoother. Creating color and typography tokens, and reusable components allowed me to make consistent updates across the product.</p>,
    images: [
      { src: '/images/salams-20.webp', alt: 'Salams design system: icons and foundational tokens', width: 2000, height: 948 },
      { src: '/images/salams-21.webp', alt: 'Salams design system: interactive components and buttons', width: 2000, height: 563 },
      { src: '/images/salams-22.webp', alt: 'Salams design system: state tags and layout views', width: 2000, height: 488 },
    ],
  },
  leadership: {
    roleAndTeam: (
      <>
        <p>I joined in May 2018 as the first design hire and grew from Junior UX Designer to UX Designer (Sep 2019) to Senior Product Designer (Jan 2022 to Sep 2023).</p>
        <p>I was the only designer for the whole run, working directly with the founders and the engineering team. I owned every part of the product experience: research, flows, UI, the design system, and usability testing.</p>
      </>
    ),
    bet: <p>Salams was betting that a dating app built around marriage, not swiping, could win a serious audience the big apps were failing. That only works if people trust it. With 60 to 70% of new users dropping off in onboarding and fake profiles eroding trust, the product had to earn that trust before it could grow or charge for anything.</p>,
    hardCall: { pending: 'One decision with tradeoffs, who disagreed, and how it was resolved. For example, a pricing model or feature rollout from the A/B tests (ghost mode, voice telegrams).' },
    howILed: (
      <ul>
        <li>Ran pricing and feature experiments with the founders, including A/B tests on pricing models, ghost mode, and voice telegrams.</li>
        <li>Ran usability tests on new features before launch and fed the findings back into the roadmap.</li>
        <li>Built the first version of the design system so the app stayed consistent as the team grew.</li>
        <li>Stayed on for 5 months after the acquisition to manage design continuity through the Match Group integration.</li>
      </ul>
    ),
    howILedTitle: 'How I led the work',
    outcome: <p>The app scaled past its first million users, and the activation redesigns improved early retention and first-session engagement. Match Group acquired Salams in 2023.</p>,
    differently: { pending: 'What you would do differently, looking back.' },
  },
  footerFacts: ['Acquisition: Match Group 2023', 'Design tenure: 5 years', 'Redesign reach: worldwide diaspora'],
};

export const zewards: CaseStudy = {
  slug: 'zewards',
  title: 'Zewst',
  tagline: 'Setting one design direction across the Zewst restaurant ecosystem as Design Manager, and owning the Zewards loyalty platform end to end.',
  theme: { primary: '#3E1A6B', accent: '#6E36A7', soft: '#CDB8F0', highlight: '#E9DCFB', cream: '#F6F1FC', tint: '#EFE7FA' },
  roles: [
    { label: 'Role', value: 'Design Manager' },
    { label: 'Scope', value: '4 products' },
    { label: 'Years', value: '2023 to 2024' },
    { label: 'Merchants', value: '500+ on POS' },
  ],
  heroImage: { src: '/images/zewst-pos.webp', alt: 'Zewst point of sale interface', width: 800, height: 785 },
  context: {
    title: 'Four restaurant products, one design direction.',
    body: (
      <>
        <p>Hauraki built the Zewst ecosystem of restaurant tech: Zewst POS for 500+ merchants, Zewst Portfolio for business intelligence, Zewst Phone for business calling, and Zewards for loyalty. I joined as Senior Product Designer in September 2023 and became Design Manager in February 2024.</p>
        <p>As Design Manager I set design direction across all four products, scaled one shared pattern library, and owned Zewards end to end: a consumer app for people, a business app for operators, and a marketing site for decision makers.</p>
      </>
    ),
    highlights: [
      <><mark className="bg-[#6E36A7]/15 font-bold px-1 rounded">No training time for staff.</mark> They learn it on shift one.</>,
      <>Every flow had to fit <mark className="bg-[#6E36A7]/15 font-bold px-1 rounded">inside a busy service</mark>, while an order is being made.</>,
      <>Owners want <mark className="bg-[#6E36A7]/15 font-bold px-1 rounded">answers, not dashboards</mark>. Is this working, and what do I change?</>,
    ],
  },
  problem: {
    image: { src: '/images/zewst-portfolio.webp', alt: 'Zewst Portfolio dashboard', width: 800, height: 785 },
    questions: [
      { q: 'Why do restaurant tools fail during a busy shift?', a: 'Staff have no time to learn complex software, customers will not download an app they do not understand, and owners stop opening dashboards after the first month. Most tools felt either outdated or over engineered.' },
      { q: 'How do four products feel like one?', a: 'Each Zewst product was growing on its own. Without one direction, merchants would learn four different interfaces, and a small engineering team would build the same components four times.' },
    ],
  },
  mattered: [
    { label: 'Repeat visits', statement: '38% more repeat visits with Zewards.', note: 'After improving reward clarity and progress visibility.' },
    { label: 'Activation', statement: '2.3x faster first-time activation.', note: 'Through a single-decision onboarding flow.' },
    { label: 'Redemption', statement: '54% higher reward redemption.', note: 'Driven by simpler rules and clearer next steps.' },
  ],
  quote: {
    label: 'Why does this matter?',
    text: 'In a restaurant, every extra tap happens while a customer is waiting. Good design here is measured in seconds at the counter.',
    flow: 'POS → PORTFOLIO → PHONE → ZEWARDS',
  },
  problemSpacesTitle: 'The four products I set direction for.',
  problemSpaceLabel: 'Product',
  problemSpaces: [
    { title: 'Zewst POS', image: { src: '/images/zewst-pos-menu.webp', alt: 'Zewst POS menu categories', width: 704, height: 533 }, questions: ['Menu categories organized for fast access', 'Customer preferences and allergies on the order', 'Comp items applied right from the POS'] },
    { title: 'Zewst Portfolio', image: { src: '/images/zewst-demand.webp', alt: 'Zewst Portfolio demand spike chart', width: 704, height: 533 }, questions: ['Food waste insights to reduce losses', 'Demand spikes surfaced in real time', 'Menu performance and customer satisfaction'] },
    { title: 'Zewst Phone', image: { src: '/images/zewst-transcript.webp', alt: 'Zewst Phone call transcript', width: 704, height: 533 }, questions: ['Business calling built into the platform', 'Call transcripts linked to orders', 'Contact details one tap away'] },
    { title: 'Zewards', image: { src: '/images/zewards-5.avif', alt: 'Zewards consumer app onboarding', width: 430, height: 495 }, questions: ['Loyalty that rewards real visits', 'A consumer app, a business app, and a site', 'Owned end to end'] },
  ],
  gap: {
    lead: 'Reducing everything to one loop led to the solution:',
    statement: <>One platform where <span className="font-semibold">every screen answers what happens next</span>, for customers, staff, and owners alike, built on a single shared pattern library.</>,
    image: { src: '/images/zewards-1.webp', alt: 'Zewards product ecosystem: consumer app, business app, and marketing site', width: 1060, height: 600 },
  },
  strategy: {
    wide: true,
    statement: <><span className="font-extrabold">Zewst</span> gives restaurants <span className="font-extrabold">one connected platform</span> to run service, understand the business, and bring customers back.</>,
    screens: [
      { image: { src: '/images/zewst-preferences.webp', alt: 'Customer preferences and allergies on a Zewst POS order', width: 704, height: 533 }, caption: 'Customer preferences and allergies travel with the order, so the kitchen gets it right the first time.' },
      { image: { src: '/images/zewst-waste.webp', alt: 'Zewst Portfolio food waste and demand insights', width: 704, height: 533 }, caption: 'Portfolio turns daily sales into plain answers: what was wasted, what spiked, and why.' },
      { image: { src: '/images/zewst-calling.webp', alt: 'In-app calling in Zewst', width: 704, height: 533 }, caption: 'Calls happen inside the platform, so orders and conversations stay in one place.' },
    ],
  },
  research: {
    title: 'I started from how restaurants already work.',
    body: <p>I interviewed shoppers and owners about punch cards, ad hoc free coffees, and tools they had abandoned, then mapped one visit and one month of the journey for customers, staff, and owners.</p>,
    image: { src: '/images/zewst-satisfaction.webp', alt: 'Zewst customer satisfaction analytics', width: 704, height: 533 },
  },
  insights: {
    title: 'Testing where friction shows up',
    body: (
      <>
        <p>I tested onboarding, first scan, and first redemption with realistic service scripts, then simplified copy and campaign presets where people hesitated.</p>
        <p>The same rule carried across the ecosystem: speak in business language like repeat visits and average ticket size, and tune layouts and contrast for shared devices and poor lighting.</p>
      </>
    ),
    image: { src: '/images/zewst-menu.webp', alt: 'Zewst menu engineering view', width: 704, height: 533 },
  },
  solutions: {
    modules: [
      { tag: 'POINT OF SALE', title: 'Zewst POS', frame: 'screen', image: { src: '/images/zewst-pos.webp', alt: 'Zewst POS ordering interface', width: 800, height: 785 }, body: (
        <p>The point of sale at the center of the ecosystem, used by 500+ merchants. Menu categories are organized for fast access, customer preferences ride along with each order, and comp items apply without leaving the POS.</p>
      ) },
      { tag: 'BUSINESS INTELLIGENCE', title: 'Zewst Portfolio', frame: 'screen', image: { src: '/images/zewst-portfolio.webp', alt: 'Zewst Portfolio analytics dashboard', width: 800, height: 785 }, body: (
        <p>Portfolio gives owners one view of the business: food waste, demand spikes, menu performance, and customer satisfaction, framed as answers rather than raw charts.</p>
      ) },
      { tag: 'BUSINESS CALLING', title: 'Zewst Phone', frame: 'screen', image: { src: '/images/zewst-phone.webp', alt: 'Zewst Phone app', width: 800, height: 785 }, body: (
        <p>Business calling built into the platform, with call history, transcripts, and contact details next to the orders they belong to.</p>
      ) },
      { tag: 'LOYALTY, CONSUMER', title: 'Zewards for customers', frame: 'screen', image: { src: '/images/zewards-2.avif', alt: 'Zewards consumer app screens', width: 430, height: 495 }, body: (
        <p>The consumer app centers on today, progress, and reward details. Onboarding became a single decision instead of a form, so a customer can join while their order is being made.</p>
      ) },
      { tag: 'LOYALTY, BUSINESS', title: 'Zewards for operators', frame: 'screen', image: { src: '/images/zewards-4.avif', alt: 'Zewards business app campaign and dashboard views', width: 530, height: 300 }, body: (
        <ul className="list-disc pl-5 space-y-2">
          <li>Campaign creation framed in business language like repeat visits and average ticket size.</li>
          <li>QR placements organized around how staff actually interact with customers.</li>
          <li>A performance overview that answers one question first: is this worth continuing?</li>
        </ul>
      ) },
    ],
  },
  designSystem: {
    title: 'One pattern library for four products',
    grid: true,
    body: <p>I scaled one pattern library across all four Zewst products and documented components, tokens, and interaction rules for scanning, redemption, and error states, so engineering had one source of truth.</p>,
    images: [
      { src: '/images/zewst-shifts.webp', alt: 'Zewst staff shift planning component', width: 704, height: 533 },
      { src: '/images/zewst-comp.webp', alt: 'Zewst comp item modal', width: 704, height: 533 },
      { src: '/images/zewst-contact.webp', alt: 'Zewst contact details screen', width: 704, height: 533 },
    ],
  },
  leadership: {
    roleAndTeam: (
      <>
        <p>I joined Hauraki in September 2023 as Senior Product Designer and became Design Manager in February 2024. I led the design team and worked directly with the founders and engineering.</p>
        <p>Across the ecosystem I set design direction and the shared pattern library. On Zewards I owned UX strategy, research, flows, information architecture, interaction design, the design system, and handoff.</p>
      </>
    ),
    bet: <p>Merchants already had tools that were either too simple to drive behavior or too heavy to survive a busy shift. The bet was that one connected platform, with loyalty tying real visits to tangible rewards, would give merchants a reason to stay in the Zewst ecosystem.</p>,
    hardCall: { pending: 'One decision with tradeoffs, who disagreed, and how it was resolved. A candidate: making Zewards onboarding a single decision instead of a form, trading customer data for activation speed.' },
    howILed: (
      <ul>
        <li>Set the design direction across the four Zewst products and aligned with engineering on shared standards.</li>
        <li>Scaled one pattern library across all four products to reduce design-to-development friction.</li>
        <li>Documented components, tokens, and interaction rules so engineering had one source of truth.</li>
      </ul>
    ),
    outcome: <p>On Zewards, repeat visits rose 38%, first-time activation got 2.3x faster, and reward redemption rose 54%. Merchants got a loyalty program they could launch from presets without a playbook.</p>,
    differently: { pending: 'What you would do differently, looking back.' },
  },
  footerFacts: ['Ecosystem: Zewst by Hauraki', 'Merchants on Zewst POS: 500+', 'Role: Design Manager'],
};
