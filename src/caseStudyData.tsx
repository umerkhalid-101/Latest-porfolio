import { FileText, Landmark, Layers, Mail, Moon, Play, ShieldCheck, Smile, UserCheck } from 'lucide-react';
import type { CaseStudy, CsImage } from './components/CaseStudyTemplate';

// Case studies on the shared Salams template. Every fact comes from LinkedIn, the resume, or the earlier case study copy.

export const salams: CaseStudy = {
  slug: 'salams',
  title: 'Salams',
  tagline: 'Designing a marriage-focused matchmaking app from the ground up, across onboarding, trust, retention, and monetization, through to the Match Group acquisition in 2023.',
  // Salams pink for every fill; a deeper shade of it for text on light backgrounds, so it stays readable
  theme: { primary: '#FF5186', accent: '#D42A60', soft: '#FF8FAB', highlight: '#FF5186', cream: '#FFFDEE', tint: '#EEF7D2' },
  roles: [
    { label: 'Role', value: 'Junior UX Designer to Senior Product Designer' },
    { label: 'Platform', value: 'iOS & Android' },
    { label: 'Years', value: '2018 to 2023' },
    { label: 'Outcome', value: 'Acquired ↗' },
  ],
  live: { href: 'https://www.salams.app/', label: 'Visit Salams' },
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
      <>Users were <mark className="bg-[#FF5186]/20 font-bold px-1 rounded">more serious than Tinder users</mark>. They wanted depth, not just swiping. Every interaction carried the weight of a potential life decision.</>,
      <>Ghosting carried <mark className="bg-[#FF5186]/20 font-bold px-1 rounded">real cultural weight</mark>. Being ignored after connecting felt disrespectful in a way that a generic dating app never accounts for.</>,
      <>Many users had <mark className="bg-[#FF5186]/20 font-bold px-1 rounded">family involved in their search</mark>. Trust and legitimacy weren't nice to have features. They were the product itself.</>,
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
  theme: { primary: '#2A1250', accent: '#6E36A7', soft: '#CDB8F0', highlight: '#E9DCFB', cream: '#F6F1FC', tint: '#EFE7FA' },
  roles: [
    { label: 'Role', value: 'Design Manager' },
    { label: 'Scope', value: '4 products' },
    { label: 'Years', value: '2023 to 2024' },
    { label: 'Merchants', value: '500+ on POS' },
  ],
  live: { href: 'https://www.zewst.com/', label: 'Visit Zewst' },
  links: [{ href: 'https://www.zewards.com/', label: 'Zewards' }],
  heroImage: { src: '/images/work-02.webp', alt: 'Zewst product screens', width: 2000, height: 2000 },
  heroScale: 1.4,
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

export const mblm: CaseStudy = {
  slug: 'mblm',
  title: 'MBLM',
  tagline: "Government websites people have to use, and an AI product people choose to. At MBLM Dubai, I designed public portals for government and regulated-sector clients in the UAE, plus allumni, MBLM's award-winning AI marketing advisor.",
  // MBLM's near-black, one copper accent, a pale copper, and two light neutrals
  theme: { primary: '#161616', accent: '#B8572A', soft: '#F2C9A8', highlight: '#FFFFFF', cream: '#FFFFFF', tint: '#FAF8F5' },
  roles: [
    { label: 'Role', value: 'Design Specialist' },
    { label: 'Agency', value: 'MBLM Dubai' },
    { label: 'Year', value: '2026' },
    { label: 'Work', value: 'Government portals, 1 AI product' },
  ],
  // Client work is shown as abstract wireframes, never screenshots or links
  heroImage: { src: '/images/mblm-regulation.svg', alt: 'Abstract wireframe of a five-step application with saved progress', width: 960, height: 540 },
  heroCards: [
    { name: 'Regulation', label: 'Website and licensing portal', image: { src: '/images/mblm-regulation.svg', alt: 'Abstract wireframe of a five-step application with saved progress and an error state', width: 960, height: 540 } },
    { name: 'Compliance', label: 'Reporting and guidance portal', image: { src: '/images/mblm-compliance.svg', alt: 'Abstract wireframe of audience tabs, a report button, and a filterable guidance library', width: 960, height: 540 } },
    { name: 'Events', label: 'Events and venue website', image: { src: '/images/mblm-events.svg', alt: 'Abstract wireframe of a mobile events calendar and an enquiry form', width: 960, height: 540 } },
    { name: 'allumni', label: "MBLM's in-house AI product", image: { src: '/images/mblm-allumni.svg', alt: 'Abstract composition of glass shapes and a giant allumni wordmark on black', width: 960, height: 540 } },
  ],
  context: {
    title: 'Government websites are the front door to the law.',
    body: (
      <>
        <p>Most of my work at MBLM was for government and regulated-sector clients, where nobody visits for fun. People come because they must: to get licensed, to report, to take part. They arrive with a task and a deadline.</p>
        <p>That changes the job. Every page carries legal weight, has to work in Arabic and English, has to be usable by everyone, and has to pass legal, communications, and leadership review before it ships. My goal on every project was the same: make a required task feel clear and calm, without cutting a word the law needs.</p>
      </>
    ),
    highlights: [
      <>Arabic and English, designed with <mark className="bg-[#B8572A]/10 text-[#B8572A] font-bold px-1 rounded">equal care</mark>.</>,
      <>Usable by <mark className="bg-[#B8572A]/10 text-[#B8572A] font-bold px-1 rounded">everyone</mark>, not just the average user.</>,
      <>Signed off by <mark className="bg-[#B8572A]/10 text-[#B8572A] font-bold px-1 rounded">legal, comms, and leadership</mark> before it ships.</>,
    ],
  },
  problem: {
    image: { src: '/images/mblm-users.svg', alt: 'Three people who arrive with a job to do: a founder abroad who needs a licence, a compliance officer filing a report, and an event visitor planning a trip', width: 800, height: 880 },
    questions: [
      { q: 'Who is the user?', a: 'Never one person. A founder abroad reading local regulations for the first time, a compliance officer filing a report, a visitor planning a trip to an event. Each arrives with a job to do, not curiosity.' },
      { q: 'Why is government design hard?', a: 'The content is dense and legally exact, so I couldn’t simplify by cutting words. Instead, I simplified the path: what to read first, what to do next, and where you are in the process.' },
      { q: 'How do you design for many approvers?', a: 'With a shared UI kit and grid that engineering, communications, and the client sign off once, so each new page is assembled from approved parts instead of debated from scratch.' },
    ],
  },
  projects: {
    title: 'Three kinds of pressure.',
    intro: 'Each project had a different audience and a different reason the stakes were high.',
    items: [
      {
        name: 'Regulation',
        full: 'Website and licensing portal',
        sector: 'Regulator',
        image: { src: '/images/mblm-regulation.svg', alt: 'Abstract wireframe of a five-step application with saved progress and an error state', width: 960, height: 540 },
        challenge: 'Businesses from around the world needed to understand complex rules and start a long, high-stakes application. One wrong step costs time and money.',
        moves: [
          'Turn dense regulation into a guided path, with clear progress, the ability to pick up where you left off, and a way back on track when something goes wrong.',
          'Build every page from a shared kit of forms, tables, and filters so the experience stays consistent.',
        ],
        tags: ['Guided journeys', 'Reusable UI kit', 'Desktop and mobile'],
      },
      {
        name: 'Compliance',
        full: 'Reporting and guidance portal',
        sector: 'Regulated sector',
        image: { src: '/images/mblm-compliance.svg', alt: 'Abstract wireframe of audience tabs, a report button, and a filterable guidance library', width: 960, height: 540 },
        challenge: 'An expert, busy audience needed to complete serious reporting tasks and find the right guidance fast.',
        moves: [
          'Organize the experience around who you are and what you need to do, not around the org chart.',
          'Keep the most important action one click away, and make guidance easy to filter.',
          'Keep the visual tone restrained and high contrast to match the seriousness of the work.',
        ],
        tags: ['Audience-first navigation', 'Guidance library', 'Accessibility'],
      },
      {
        name: 'Events',
        full: 'Events and venue website',
        sector: 'Events and venues',
        image: { src: '/images/mblm-events.svg', alt: 'Abstract wireframe of a mobile events calendar and an enquiry form', width: 960, height: 540 },
        challenge: 'Visitors, exhibitors, and organizers all needed different things from the same experience, often in a hurry and often on a phone.',
        moves: [
          'Split journeys by audience at the top level.',
          'Design a fast-scanning, filterable events calendar for mobile, and keep practical info one tap away.',
          'Design enquiry flows that ask only what the team needs to respond.',
        ],
        tags: ['Multi-audience', 'Events calendar', 'Mobile first'],
      },
    ],
  },
  bilingual: {
    title: 'Every screen, designed twice.',
    intro: <p>In the UAE, Arabic isn't a translation layer. It reads right to left, often runs longer, and needs its own type rhythm. I designed key templates in both languages from the start, guided by three rules.</p>,
    rules: [
      { demo: 'mirror', title: 'Mirror the layout, not just the text', text: 'Navigation, progress, and arrows follow reading direction, so the Arabic experience feels native rather than flipped.' },
      { demo: 'length', title: 'Size for the longer language', text: 'Buttons, tabs, and headings are sized for whichever language runs longer, so nothing breaks after translation.' },
      { demo: 'type', title: 'Give Arabic room to breathe', text: 'Arabic letters have taller ascenders, deeper descenders, and dots, so Arabic text gets its own line height and type scale.' },
    ],
  },
  showcase: {
    label: "MBLM's in-house product",
    title: 'allumni',
    summary: 'An AI marketing advisor that learns a brand, then thinks, writes, and sounds like it. I designed both the website that sells it and the product people work in every day.',
    facts: [
      { label: 'My role', value: 'Website and product UI' },
      { label: 'Platforms', value: 'Website and desktop app' },
      { label: 'Recognition', value: 'W3 Silver, two categories' },
    ],
    color: '#5B3DF5',
    // No public link or product screenshots until MBLM signs off; the visuals are abstract
    chapters: [
      {
        tag: 'Website',
        problem: 'Every AI tool looks like a chat window',
        title: 'Sell it as a brand first',
        text: 'A black stage, floating glass shapes, and a giant wordmark present allumni as a brand you’d trust with yours, not another chatbot.',
        image: { src: '/images/mblm-allumni.svg', alt: 'Abstract composition: glass shapes floating on a black stage above a giant allumni wordmark.', width: 960, height: 540 },
      },
      {
        tag: 'Product',
        problem: 'An AI is only as good as the context you give it',
        title: 'Make context effortless to give',
        text: 'Adding documents, images, and decks became a single gesture, and they stay visible for the whole conversation, so people always know what allumni is working from.',
        sequence: [
          { image: { src: '/images/allumni-abstract-drop.svg', alt: 'Abstract wireframe: a file dragged over a conversation shows a drop target.', width: 1040, height: 560 }, caption: 'Drop files anywhere in the conversation.' },
          { image: { src: '/images/allumni-abstract-composer.svg', alt: 'Abstract wireframe: attached images, documents, and files held above the prompt.', width: 1040, height: 560 }, caption: 'Review everything before you send.' },
          { image: { src: '/images/allumni-abstract-attachments.svg', alt: 'Abstract wireframe: a conversation with an attachments panel on the right.', width: 1040, height: 560 }, caption: 'Keep it in view while you chat.' },
        ],
      },
      {
        tag: 'Product',
        problem: 'A blank prompt is hard to start from',
        title: 'Start from a task, not a prompt',
        text: 'Repeat jobs like campaign plans, reports, and social posts became shortcuts, with favorites on top and color coding, so a team’s most common work is one click away.',
        image: { src: '/images/allumni-abstract-shortcuts.svg', alt: 'Abstract wireframe: color-coded favorite shortcuts above more shortcuts.', width: 960, height: 540 },
      },
      {
        tag: 'Product',
        problem: 'Teams couldn’t see what the AI knew',
        title: 'Turn a brand into a checklist',
        text: 'The brand model breaks a brand into parts, from promise and mission to personality, each with a clear status, so teams see at a glance what’s learned and what’s missing.',
        image: { src: '/images/allumni-abstract-brand-model.svg', alt: 'Abstract wireframe: brand parts listed with learned or missing status.', width: 960, height: 540 },
      },
    ],
  },
  designSystem: {
    title: 'One grid, one kit, every portal.',
    body: <p>I built a 12-column layout system with engineering, set typography and responsive guidelines for Arabic and English, and turned recurring patterns into a reusable UI kit. That foundation kept MBLM's portal projects consistent, so new pages started from approved parts.</p>,
    chips: ['Forms', 'Tables', 'Step wizard', 'Search and filters', 'Arabic and English type', 'Responsive guidelines'],
    columns: 12,
    images: [{ src: '/images/mblm-ui-kit.svg', alt: 'Abstract UI kit sheet: buttons in English and Arabic, input states, the step wizard, a status table, search and filters, and Latin and Arabic type', width: 1600, height: 1000 }],
  },
  leadership: {
    roleAndTeam: <p>I joined MBLM Dubai as a Design Specialist in March 2026. I owned portal design across desktop and mobile for government clients, worked with engineering on the layout system and UI kit, and designed the website and product UI for allumni.</p>,
    bet: <p>Government users don't browse, they comply. When a required task is confusing, the cost is real: delayed licences, missed reports, and calls to support. The bet was that a clear path, saved progress, and one shared system would do more for these clients than any visual flourish.</p>,
    hardCall: <p>Whether to design Arabic as a mirror of English or as an equal. Mirroring is faster, but Arabic runs longer and reads right to left, so mirrored pages break after translation. I pushed to design key templates in both directions from the start. It cost time up front, and saved rework on every page after.</p>,
    howILed: (
      <ul>
        <li>Defined the 12-column layout system with engineering so design and build used the same structure.</li>
        <li>Set typography and responsive guidelines for Arabic and English that every page and breakpoint follows.</li>
        <li>Built the UI kit once, for forms, tables, the wizard, and search, so new pages reuse approved components.</li>
      </ul>
    ),
    howILedTitle: 'How I worked with engineering',
    outcome: <p>The guided application, UI kit, and grid became the foundation for MBLM's other government portals, and allumni, MBLM's in-house AI product, went on to win W3 Silver in two categories.</p>,
    differently: { pending: 'What you would do differently, looking back.' },
  },
  footerFacts: ['Agency: MBLM Dubai', 'Clients: government and regulated sector', 'In-house product: allumni'],
};

const junoShot = (name: string, alt: string): CsImage => ({ src: `/images/juno-${name}.webp`, alt, width: 1600, height: 1000 });

export const juno: CaseStudy = {
  slug: 'juno',
  title: 'Juno',
  tagline: 'Every AI assistant site looks the same: a glowing orb, a chat box, and big claims. I made Juno stand out by showing the product doing real work, and rebuilt its story, design system, and all nine pages in one week.',
  // Juno is dark mode only, so the page sticks to its near-black, one blue, and two light neutrals
  theme: { primary: '#07090D', accent: '#324CFF', soft: '#8F9DFF', highlight: '#FFFFFF', cream: '#FFFFFF', tint: '#FAF8F5' },
  roles: [
    { label: 'Role', value: 'Brand, web design and design system' },
    { label: 'Industry', value: 'AI and B2B SaaS' },
    { label: 'Year', value: '2026' },
    { label: 'Timeline', value: '1 week, 9 pages' },
  ],
  // Preview domain until the new site replaces runjuno.ai
  live: { href: 'https://juno-lovat.vercel.app/', label: 'Visit the live site' },
  heroImage: junoShot('homepage-hero', 'The Juno homepage hero: a glowing mascot orbited by tasks like Investor update and Triage 6 bugs, above the headline Knows your company. Gets things done.'),
  context: {
    title: 'A crowded category where every site makes the same promise.',
    body: (
      <>
        <p>Juno is an AI chief of staff for teams: it connects to a company's tools, builds apps from a sentence, works on a computer of its own, and runs automations on a schedule. But "AI assistant" is one of the most crowded categories on the web, and most sites in it describe the same magic in the same words.</p>
        <p>Juno's old site was no exception. It opened on the promise, told rather than showed, and gave buyers no reason to trust an AI with real work. My goal wasn't to explain Juno better. It was to make it impossible to mistake for any other AI product, by letting visitors watch it work and see it ask before it acts.</p>
      </>
    ),
    highlights: [
      <>Explain Juno <mark className="bg-[#324CFF]/10 text-[#324CFF] font-bold px-1 rounded">without jargon</mark>.</>,
      <>Build trust in an AI that <mark className="bg-[#324CFF]/10 text-[#324CFF] font-bold px-1 rounded">acts on your behalf</mark>.</>,
      <>Feel premium and confident, <mark className="bg-[#324CFF]/10 text-[#324CFF] font-bold px-1 rounded">not another generic AI landing page</mark>.</>,
    ],
  },
  beforeAfter: {
    title: 'Same promise. Everything around it changed.',
    intro: <p>Drag to compare the old homepage with the new one. I kept the promise and changed what visitors see first, how the product proves itself, and how all nine pages hold together.</p>,
    before: junoShot('before-home', 'Before: the old Juno homepage, the mascot above Knows your company. Gets things done. on a plain dark gradient.'),
    after: junoShot('homepage-hero', 'After: the new Juno homepage, the mascot orbited by live tasks.'),
    changes: [
      { title: 'Pain before pitch', text: 'The old homepage opened on the promise. The new one opens on the overdue alerts every founder recognizes, then makes Juno the answer.' },
      { title: 'Shown, not told', text: "Apps, Juno's own computer, and automations now run as live UI in one sequence, so visitors watch the product work." },
      { title: 'One story, nine pages', text: 'One cast and one design system run through every page, where the old site introduced new sample brands section by section.' },
    ],
  },
  story: {
    title: 'A homepage told as a story, not a feature list.',
    intro: 'Six beats, from the pain every founder knows to a clear next step. Scroll through them.',
    beats: [
      { title: 'Open on the pain', before: 'The old homepage opened straight on the product promise.', now: '"You started a company. Now it runs you." A pile of overdue Slack, Gmail, HubSpot, and Linear alerts makes the pain instantly familiar.', image: junoShot('beat-1-chaos', 'Stacked alert cards from Slack, Gmail, HubSpot and Linear beside the headline You started a company. Now it runs you.') },
      { title: 'Make Juno the answer', before: 'The product arrived before the problem did.', now: '"What if someone took this off your plate? That\'s Juno." The mascot pulls every tool into one ring.', image: junoShot('beat-2-reveal', 'The Juno mascot at the center of a ring of connected app icons, under the headline Finally, someone has the whole picture.') },
      { title: 'Show it working', before: "Juno's own computer sat near the end of the page, after the integrations.", now: "Apps built from a sentence, Juno's own computer for tools with no integration, and automations on a schedule, back to back as live UI.", image: junoShot('beat-3-computer', 'Juno working on its own computer, filling in an app store submission with a live activity log beside it.') },
      { title: 'One stack, one teammate', before: 'I kept this line from the old site.', now: '"Your whole stack. One Juno." Ask in one tool, get it done in another.', image: junoShot('beat-4-integrations', 'Juno connected to Slack, Gmail, Google Drive, Notion, HubSpot, Linear and other tools.') },
      { title: 'An FAQ that demos', before: 'The old homepage had no FAQ at all.', now: 'Juno answers the questions in a chat, so the FAQ itself demonstrates the product.', image: junoShot('beat-5-faq', 'A list of questions on the left and Juno answering the selected one in a chat card on the right.') },
      { title: 'Close on action', before: 'It ended on "Imagine having Juno on your team."', now: '"Put Juno to work." One clear request for access.', image: junoShot('beat-6-cta', 'The closing section of the Juno homepage with the headline Put Juno to work and a Request access button.') },
    ],
  },
  ethos: {
    title: 'Decisions that shaped the site',
    principles: [
      { title: 'Dark mode only', icon: Moon, body: 'One confident look, so every page and every product mockup sits in the same world.' },
      { title: 'Animation that explains', icon: Play, body: 'Live UI instead of screenshots. Motion shows the product working; it never just decorates.' },
      { title: 'One mascot shape', icon: Smile, body: 'The mascot animates but never changes shape, so it stays recognizable on every page.' },
      { title: 'Structure first', icon: Layers, body: 'Placeholder logos and testimonials let the structure ship before final content was ready.' },
    ],
  },
  solutions: {
    modules: [
      { tag: 'TRUST', title: 'Needs your yes', frame: 'screen', image: { src: '/images/juno-detail-approval-card.webp', alt: "Juno's run log for an app store submission, ending in a Needs your yes card with Approve and Review buttons.", width: 3200, height: 2000 }, body: <p>The biggest fear with an AI that acts for you is that it acts without you. Other sites answer that with a line of copy. I designed an approval card that repeats on every page, so visitors see Juno ask before it submits, sends, or ships anything.</p> },
      { tag: 'ONE CAST', title: 'One fictional company', frame: 'screen', image: { src: '/images/juno-detail-shared-cast.webp', alt: 'The recurring cast of the Juno site: Maya Chen, Sam Rivera, Leo Park, Priya Shah and the customer Northwind, in Slack, HubSpot, Linear and customer update cards.', width: 3200, height: 2000 }, body: <p>Most product sites use a new fake brand in every mockup, which makes each section feel staged. I wrote one fictional company instead: the same people (Maya, Sam, Leo, Priya), customer (Northwind), and launch (Scheduled Reports) run through all nine pages, so the site reads like one real week at one real company.</p> },
      { tag: 'LIVE UI', title: 'A command palette, not a grid', frame: 'screen', image: { src: '/images/juno-detail-live-ui.webp', alt: "Juno's live command palette, typing Ask Juno to build a launch page, with 16 features grouped by what they do.", width: 1968, height: 1176 }, body: <p>Every AI site has a features grid. I turned Juno's into a working ⌃⌘J command palette that types itself out, with 16 features grouped by what they do for you, so the page demos the product instead of listing it.</p> },
      { tag: 'VOICE', title: 'Short, human lines', frame: 'screen', image: { src: '/images/juno-detail-copy-samples.webp', alt: "Short headlines from the Juno site: Knows your company. Gets things done. Off your plate. On Juno's. Keep Juno close. Put Juno to work.", width: 3200, height: 2000 }, body: <p>The category talks in buzzwords: "supercharge", "10x", "agentic". I wrote short, human lines instead, like "Off your plate. On Juno's.", "Keep Juno close.", and "Put Juno to work.", so Juno sounds like a teammate, not a model.</p> },
    ],
  },
  pages: {
    title: 'Nine pages, one system.',
    intro: 'After the homepage, the same system rolled out across every page. Hover to pause.',
    pages: [
      { name: 'Product', line: 'A full product tour told through one feature launch.', image: junoShot('page-product', 'The Juno product page: Inside Juno.') },
      { name: 'Features', line: '16 features in a command-palette browser.', image: junoShot('page-features', 'The Juno features page: So much built in.') },
      { name: 'Automations', line: '12 recurring jobs, framed as worries you can hand off.', image: junoShot('page-automations', "The Juno automations page: Off your plate. On Juno's.") },
      { name: 'Apps', line: 'Six working mini-apps, including a real ROI calculator.', image: junoShot('page-apps', 'The Juno apps page: The app your team wishes it had.') },
      { name: 'Download', line: 'The keyboard shortcut is the hero, not the app icon.', image: junoShot('page-download', 'The Juno download page: Keep Juno close.') },
      { name: 'Contact', line: 'A form styled like writing an email.', image: junoShot('page-contact', "The Juno contact page: Let's talk.") },
      { name: 'Privacy and Terms', line: 'One readable template with a sticky table of contents.', image: junoShot('page-privacy', 'The Juno privacy policy page.') },
    ],
  },
  designSystem: {
    title: 'One dark system for every page',
    body: <p>A near-black surface scale with blue, cyan, and violet accents, Geist for type, four radii, and three motion curves for everything from quick UI responses to story-scale moves. Task cards, approval cards, and chat mockups are the core components every page is built from.</p>,
    tokens: {
      colors: [
        { name: 'Background', value: '#07090d' },
        { name: 'Surface', value: '#0e1218' },
        { name: 'Surface 2', value: '#151a22' },
        { name: 'Text', value: '#f4f6f8' },
        { name: 'Muted', value: '#9aa6b8' },
        { name: 'Blue', value: '#324cff' },
        { name: 'Cyan', value: '#50e5ff' },
        { name: 'Violet', value: '#8f7cff' },
        { name: 'Success', value: '#3dd68c' },
        { name: 'Warning', value: '#ffb547' },
        { name: 'Danger', value: '#ff6568' },
      ],
      font: 'Geist Sans and Geist Mono',
      type: [
        { name: 'Display XL', size: '48 to 88px', sample: 'Knows your company.' },
        { name: 'Display L', size: '40 to 64px', sample: 'Put Juno to work.' },
        { name: 'Heading 2', size: '28 to 36px', sample: 'Your whole stack.' },
        { name: 'Heading 3', size: '20px', sample: 'Needs your yes' },
        { name: 'Body', size: '16 to 18px', sample: 'Juno keeps up with your company.' },
        { name: 'Eyebrow', size: '12px', sample: "JUNO'S COMPUTER" },
      ],
      motion: [
        { name: 'Snap', curve: 'cubic-bezier(0.3, 0, 0, 1)', use: 'Quick UI responses' },
        { name: 'Base', curve: 'cubic-bezier(0.2, 0.8, 0.2, 1)', use: 'Most transitions' },
        { name: 'Calm', curve: 'cubic-bezier(0.16, 1, 0.3, 1)', use: 'Story-scale moves' },
      ],
    },
  },
  stats: {
    title: 'Launch-ready in one week.',
    items: [
      { value: 1, unit: 'week', label: 'From kickoff to a launch-ready site' },
      { value: 9, unit: 'pages', label: 'Rebuilt on one design system' },
      { value: 6, unit: 'beats', label: 'In a homepage told as a story' },
      { value: 1, unit: 'cast', label: 'Running through every page' },
    ],
  },
  leadership: {
    roleAndTeam: <p>I owned the design end to end, from tone and design guidelines through the homepage and the rollout across all nine pages, working directly with Juno's team from kickoff to a launch-ready site in one week.</p>,
    bet: <p>"AI assistant" is a crowded, vague category. The bet was that buyers would trust an AI that acts on their behalf only if they could watch it work, so every page shows the product doing real jobs and asking for approval, instead of describing features.</p>,
    hardCall: { pending: 'One decision with tradeoffs, who disagreed, and how it was resolved. A candidate: going dark mode only, or shipping with placeholder logos and testimonials.' },
    howILed: (
      <ul>
        <li>Started with tone and design guidelines, so the homepage and every page after it shared one voice and one system.</li>
        <li>Wrote the homepage as six story beats, from pain to action, before designing any section.</li>
        <li>Kept one fictional cast and launch across all nine pages, so the site reads as one story.</li>
      </ul>
    ),
    howILedTitle: 'How I approached it',
    outcome: <p>A launch-ready, nine-page marketing site in one week, built on one design system, with a homepage told in six beats that shows Juno working and earns trust before anyone signs up.</p>,
    differently: { pending: 'What you would do differently, looking back.' },
  },
  footerFacts: ['Client: Juno, AI chief of staff', 'Pages: 9 on one design system', 'Timeline: 1 week'],
};

const unitaShot = (name: string, alt: string): CsImage => ({ src: `/images/unita-${name}.webp`, alt, width: 1600, height: 1000 });

export const unita: CaseStudy = {
  slug: 'unita',
  title: 'Unita',
  tagline: 'B2B directories all look the same: grey lists of listings nobody can vouch for. As the sole designer, I made Unita stand out on the two things they get wrong, trust and finding, and made a directory feel like an app people want to open.',
  // Unita's dark teal, one teal accent, a pale teal, and two light neutrals
  theme: { primary: '#0A2E2E', accent: '#0E7C7B', soft: '#BFEDEA', highlight: '#FFFFFF', cream: '#FFFFFF', tint: '#FAF8F5' },
  roles: [
    { label: 'Role', value: 'Sole Product Designer' },
    { label: 'Industry', value: 'B2B verified business network' },
    { label: 'Years', value: '2025 to 2026' },
    { label: 'Scope', value: '10+ modules' },
  ],
  live: { href: 'https://unitaw.com/', label: 'Visit the live site' },
  heroImage: { src: '/images/work-04.webp', alt: 'Unita on desktop and laptop: a verified company profile, the Switzerland market overview, and the homepage.', width: 1870, height: 1289 },
  context: {
    title: 'Business directories have a trust problem.',
    body: (
      <>
        <p>Unita's real edge was invisible. Every company on it is checked against national trade registers before it is listed, which no ordinary directory does. But a verified listing and an unverified one look the same on a screen, and buyers had learned to scroll past directories that all felt like spreadsheets.</p>
        <p>I joined before launch as the only designer, working with the founders across 10+ modules. My job wasn't to describe Unita. It was to make its edge something you could see in the first five seconds, and to make finding a partner feel as easy as searching an app.</p>
      </>
    ),
    highlights: [
      <>Make verification <mark className="bg-[#0E7C7B]/10 text-[#0E7C7B] font-bold px-1 rounded">visible, not a footnote</mark>.</>,
      <>Replace ten filters with <mark className="bg-[#0E7C7B]/10 text-[#0E7C7B] font-bold px-1 rounded">one question</mark>.</>,
      <>Make a directory feel like <mark className="bg-[#0E7C7B]/10 text-[#0E7C7B] font-bold px-1 rounded">an app, not a database</mark>.</>,
    ],
  },
  contrast: {
    title: 'Where I broke from the category.',
    intro: <p>I studied how business directories usually look and work, then made a deliberate call wherever Unita should do the opposite.</p>,
    them: 'A typical B2B directory',
    us: 'What I designed for Unita',
    rows: [
      { topic: 'First screen', them: 'A search form and a wall of filters.', us: 'A promise, "Unita is the business SuperApp", with listing types as photo cards on a phone.' },
      { topic: 'Trust', them: 'Verification buried on an About page, if it exists at all.', us: 'Verification in the hero line, a badge on every profile, and a joining flow you can see.' },
      { topic: 'Search', them: 'Category dropdowns, location fields, and keyword boxes.', us: 'One AI-assisted search bar, with tabs for companies, chambers, creators, and countries.' },
      { topic: 'Profiles', them: 'A logo, an address, and a phone number.', us: 'Tier, badge, real locations on a map, products, documents, ratings, and a button to message.' },
      { topic: 'Markets', them: 'A country dropdown.', us: 'Country pages with an AI market summary, top industries, and top categories.' },
      { topic: 'Look', them: 'Grey tables built for data entry.', us: 'Photography-led cards, a calm light interface, and dark teal saved for action.' },
    ],
  },
  flow: {
    title: 'I designed trust before I designed search.',
    intro: <p>Most directories ask you to take their listings on faith. I made the vetting a visible, four-step journey and ended it on a badge that travels with the company everywhere it appears.</p>,
    steps: [
      { title: 'Apply', icon: FileText, text: 'I kept it to one short submission, so good companies are not scared off before they start.' },
      { title: 'Checked at the source', icon: Landmark, text: 'Matched against the national trade register. I named the register on screen, so the check feels real.' },
      { title: 'Reviewed by a person', icon: UserCheck, text: 'A human review, said plainly, because "reviewed by a person" builds more trust than "AI-verified".' },
      { title: 'Invited by email', icon: Mail, text: 'The invite is a moment, not a form confirmation, so joining feels selective.' },
    ],
    result: { label: 'Verified', text: 'The badge sits next to the company name on every card, profile, and search result, so trust is shown where decisions happen.' },
  },
  fullPage: {
    title: 'A homepage that sells trust before it sells search.',
    intro: <p>Scroll to move through it. I ordered the page as an argument: what Unita is, proof it is everywhere, what you can find, and how to join, before a single form appears.</p>,
    url: 'unitaw.com',
    image: { src: '/images/unita-full.webp', alt: 'The full Unita homepage, from the hero to the FAQ.', width: 1200, height: 6750 },
  },
  story: {
    title: 'Six decisions, top to bottom.',
    intro: 'Each section of the homepage answers one doubt a buyer has about a directory. Keep scrolling to slide through them.',
    layout: 'horizontal',
    beats: [
      { title: 'Lead with a promise', now: 'Directories open on a form. I opened on "Unita is the business SuperApp", with a gradient that borrows from consumer apps and listing types as phone cards, so it reads as a product, not a database.', image: unitaShot('hero', 'The Unita homepage hero: Unita is the business SuperApp, with phone screens of verified listings.') },
      { title: 'Show reach, don\'t claim it', now: 'Instead of saying "global", I showed every country Unita is live in, so reach is proven at a glance.', image: unitaShot('beat-countries', 'All the countries Unita is present in.') },
      { title: 'Browse like a shopper', now: 'Big, photographic industry tiles for people who know the field but not the company name, instead of a category dropdown.', image: unitaShot('beat-categories', 'Browse by category on Unita.') },
      { title: 'Name what you\'ll find', now: 'Companies, chambers, creators, and more, each introduced in plain words, so the directory never feels like a black box.', image: unitaShot('beat-find', 'What you can find on Unita.') },
      { title: 'Draw the path to a deal', now: 'I laid out how companies go from finding each other to working together, step by step, so the value is clear before signing up.', image: unitaShot('beat-connect', 'How companies connect in Unita.') },
      { title: 'Give everyone a door', now: '"Three ways into Unita." A clear choice for buyers, businesses, and creators, then the questions people actually ask.', image: unitaShot('beat-ways', 'Three ways into Unita.') },
    ],
  },
  mattered: [
    { label: 'Why it stands out', statement: 'It looks like an app, not a database.', note: 'Photography, phone cards, and a SuperApp promise make a B2B directory feel worth opening.' },
    { label: 'Why buyers trust it', statement: 'The proof is on the listing itself.', note: 'The verified badge sits where decisions happen, not on a page nobody reads.' },
    { label: 'Why it is faster', statement: 'One question replaces ten filters.', note: 'AI-assisted search and clear tabs start every visit with what you want, not how the data is stored.' },
  ],
  explorer: {
    title: 'One system, built to scale.',
    intro: 'I designed every page type from the same components, so new markets and listing types slot straight in. Pick a tab, or let it play.',
    url: 'unitaw.com',
    tabs: [
      { tag: 'Companies', title: 'Profiles that earn trust', image: unitaShot('page-companies', 'The Unita companies page: This Week on Unita.'), body: <p>I put the badge and tier next to the name and real locations on a map above the fold, so proof comes before the pitch. The companies page reads like an editorial front page, with new companies every week, to give people a reason to come back.</p> },
      { tag: 'Countries', title: 'Markets, not dropdowns', image: unitaShot('page-country', 'The Unita country page for Switzerland, with an economy snapshot alongside its listings.'), body: <p>A country is a decision, not a filter. Each one gets an AI market summary, top industries, and top categories beside its listings, so buyers understand the market before they pick a partner in it.</p> },
      { tag: 'Categories', title: 'Scannable at a glance', image: unitaShot('page-categories', 'The Unita categories page, every industry grouped on one page.'), body: <p>Every industry on one page, grouped for scanning rather than nested in menus, so nobody has to guess where a company lives.</p> },
      { tag: 'Technology', title: 'From industry to shortlist', image: unitaShot('page-technology', 'The Unita Technology category page with top matches.'), body: <p>Category pages open on top matches, from SaaS to cybersecurity, so discovery goes from an industry to a shortlist in one step.</p> },
      { tag: 'Artists', title: 'New listing type, zero new components', image: unitaShot('page-artists', 'The Unita artists page.'), body: <p>When creators joined the platform, they slotted into the same system as companies. That was the test of the design system: new content, no new components.</p> },
      { tag: 'Join', title: 'Joining that feels selective', image: unitaShot('page-join', 'The Unita join page: Become part of Unita.'), body: <p>Onboarding, membership tiers, and pricing. One short submission, reviewed by a person, invite by email, so being on Unita means something.</p> },
    ],
  },
  designSystem: {
    title: 'A visual language that breaks from directory grey',
    body: <p>I built the design system from scratch with full token coverage: a calm light base so a large directory stays easy to scan, photography-led cards so listings feel human, and dark teal reserved for the things you can act on. Every module ships from one source of truth, which is why engineering could build 10+ modules without the product drifting.</p>,
    images: [unitaShot('beat-faq', 'The Unita FAQ: questions people ask, built from the same cards, type, and teal as every other page.')],
  },
  stats: {
    title: 'Live, and ready to grow.',
    items: [
      { value: 8, unit: 'countries', label: 'Live at launch' },
      { value: 10, unit: 'modules', label: 'Designed as the sole designer' },
      { value: 9, unit: 'categories', label: 'To browse by industry' },
      { value: 1, unit: 'search bar', label: 'Instead of a wall of filters' },
    ],
  },
  leadership: {
    roleAndTeam: <p>I was the sole designer from October 2025 to March 2026, working directly with the founders and engineering. I owned product direction, scope, and delivery across 10+ modules, from discovery through the design system.</p>,
    bet: <p>A directory only has value once businesses are on it, and buyers only use it if they trust what they find. The bet was that making verification visible, and making Unita feel like an app instead of a database, would win both sides before launch.</p>,
    hardCall: { pending: 'One decision with tradeoffs, who disagreed, and how it was resolved. A candidate: what the pricing and dedicated-offering A/B tests showed, and what you chose to launch with.' },
    howILed: (
      <ul>
        <li>Defined product priorities and scope across membership tiers, community surfaces, and pricing flows.</li>
        <li>Ran A/B tests on pricing and dedicated offerings with the founders to decide what to launch with.</li>
        <li>Worked directly with founders and engineering to keep product direction and feature priorities aligned.</li>
      </ul>
    ),
    howILedTitle: 'How I worked with the founders',
    outcome: <p>Unita launched live across eight countries, with trust shown on every listing, search at the center, and a system of profile, category, and country pages ready to grow one verified listing at a time.</p>,
    differently: { pending: 'What you would do differently, looking back.' },
  },
  footerFacts: ['Headquarters: Geneva, Switzerland', 'Live in: 8 countries', 'Role: Sole Product Designer'],
};

const snapShot = (name: string, alt: string): CsImage => ({ src: `/images/snapflow-${name}.webp`, alt, width: 1600, height: 833 });

export const snapflow: CaseStudy = {
  slug: 'snapflow',
  title: 'Snapflow',
  tagline: "A self-initiated redesign of Snapflow's homepage. Snapflow sells a design system that makes every screen snap into place, so I designed and built a homepage that does the same: precise, in motion, and live in English and Spanish.",
  // Obsidian glass, one steel-blue accent, and two light neutrals
  theme: { primary: '#0B0F15', accent: '#4F6B8A', soft: '#C9D6E3', highlight: '#FFFFFF', cream: '#FFFFFF', tint: '#FAF8F5' },
  roles: [
    { label: 'Role', value: 'Concept, design and build' },
    { label: 'Type', value: 'Self-initiated redesign' },
    { label: 'Year', value: '2026' },
    { label: 'Built with', value: 'Next.js, GSAP, three.js' },
  ],
  live: { href: 'https://snapflow-tau.vercel.app/', label: 'After: see the concept' },
  links: [{ href: 'https://www.snapflow.design/en/', label: 'Before: live Snapflow site' }],
  heroImage: { src: '/images/snapflow-after.webp', alt: 'The redesigned Snapflow homepage hero: Your agent already writes UI. Give it a design system, in a Snap, above floating glass UI pieces and a glowing hexagon.', width: 1600, height: 911 },
  context: {
    title: 'A precise product on a page that stood still.',
    body: (
      <>
        <p>Snapflow is an agentic design system: tokens, components, and usage rules in React, Vue, and Angular. Teams brand it, and their AI coding agent builds every screen from it, inside their own repo.</p>
        <p>The live homepage had the right headline, but a flat grey canvas and static isometric cards that never showed the product doing anything. I redesigned and built the homepage as a concept to pitch to Snapflow's founder as a live link. I kept every fact and line of copy from the live site, and changed the story, the look, and the motion.</p>
      </>
    ),
    highlights: [
      <>Make a design system <mark className="bg-[#4F6B8A]/10 text-[#4F6B8A] font-bold px-1 rounded">feel precise</mark> before anyone reads a word.</>,
      <>Show the product <mark className="bg-[#4F6B8A]/10 text-[#4F6B8A] font-bold px-1 rounded">moving</mark>, not posed.</>,
      <>Pitch it as <mark className="bg-[#4F6B8A]/10 text-[#4F6B8A] font-bold px-1 rounded">a working site</mark>, not a mockup.</>,
    ],
  },
  beforeAfter: {
    title: 'Same headline. A different first impression.',
    intro: <p>Drag to compare the live homepage with my concept. The words are the same. What changed is how it feels and what it shows.</p>,
    before: { src: '/images/snapflow-before.webp', alt: 'Before: the live Snapflow homepage on a pale grey canvas with static isometric cards.', width: 1600, height: 911 },
    after: { src: '/images/snapflow-after.webp', alt: 'After: the redesigned Snapflow homepage on an obsidian glass canvas.', width: 1600, height: 911 },
    changes: [
      { title: 'An obsidian lab', text: 'A dark glass canvas, with a white mode one click away, so a precision tool looks precise.' },
      { title: 'Product in motion', text: 'A 3D glass hexagon and scroll-driven scenes show pieces snapping into place, instead of static cards.' },
      { title: 'One clear story', text: 'Twelve sections in order: why it matters, what it does, how it gets into your codebase, then governance and pricing.' },
    ],
  },
  reel: {
    title: 'It shows instead of tells.',
    intro: <p>Every section gets one animation that proves its point. The reel walks through the concept in motion: the 3D glass hexagon, pieces snapping into place, and scroll-driven scenes, side by side with the live site.</p>,
    src: '/images/snapflow-reel.mp4',
    poster: '/images/snapflow-reel-poster.webp',
  },
  solutions: {
    modules: [
      { tag: 'WHY', title: 'Mirrored, shown not claimed', frame: 'screen', image: snapShot('mirrored', 'Your design and your code, mirrored: a Figma button and a code button sharing one token.'), body: <p>The core promise is that design and code stay the same. Instead of saying it, the section shows a Figma button and a code button sharing one token, then the Figma sync and the web editor for teams without Figma.</p> },
      { tag: 'WHAT IT DOES', title: 'Capabilities beside a live window', frame: 'screen', image: snapShot('does', 'What Snapflow does: a list of capabilities beside a window showing a sign-up screen and its code in React, Vue, or Angular.'), body: <p>Each capability sits next to a real window: a branded sign-up screen and the same screen as code, switchable between React, Vue, and Angular. One design, three frameworks, in one glance.</p> },
      { tag: 'INTO YOUR CODEBASE', title: 'What it brings, what you bring', frame: 'screen', image: snapShot('codebase', 'How Snapflow gets into your codebase: Snapflow brings the design system, your repo brings your stack, rules, lint, and types.'), body: <p>Engineers want to know what touches their repo. Two cards joined by a line split it cleanly: Snapflow brings the system, your repo keeps its stack, agent rules, lint, and types. A five-step walkthrough follows.</p> },
      { tag: 'TOOLS', title: 'One shows, the other edits', frame: 'screen', image: snapShot('editor', 'The Playground and the web editor side by side as real windows.'), body: <p>The Playground and the web editor are easy to confuse, so they sit side by side as real windows, labelled by where they run and what they do: local and shows, cloud and edits.</p> },
      { tag: 'GOVERNANCE', title: 'A system you can govern', frame: 'screen', image: snapShot('govern', 'Govern your agentic design system: a glowing glass hexagon with roadmap, accessibility, and token badges around it.'), body: <p>Governance is abstract, so the glass hexagon, Snapflow's logo, becomes the center of the system, with roadmap, accessibility, and tokens around it and every team sharing one source.</p> },
    ],
  },
  pages: {
    title: 'Twelve sections, one story.',
    intro: 'The rest of the page, in order: where it runs, how you get it, which models it works with, and how to start. Hover to pause.',
    pages: [
      { name: 'Surfaces', line: 'From wherever each person works: IDE, CLI, Figma, and more.', image: snapShot('surfaces', 'From wherever each person works: cards for the agent in your IDE, the CLI, and other surfaces.') },
      { name: 'How it works', line: 'You don\'t build it. You receive it, make it yours, and build.', image: snapShot('receive', 'You don\'t build it. You receive it: three steps, receive, make it yours, design and build.') },
      { name: 'Models', line: 'Bring any model or tool: Claude, Cursor, Codex, Antigravity.', image: snapShot('models', 'Bring any model or tool to your design system: Claude, Cursor, Codex, and Antigravity orbiting the hexagon.') },
      { name: 'Teams', line: 'For one team or the whole company.', image: snapShot('teams', 'For one team or the whole company: Snapflow Cloud and the company plan.') },
      { name: 'Getting started', line: 'From the waitlist to your first governed screen.', image: snapShot('waitlist', 'From the waitlist to your first governed screen, in four steps.') },
      { name: 'Access', line: 'Fifteen days free, then the footer.', image: snapShot('pricing', 'Fifteen days free: the waitlist form and the footer.') },
    ],
  },
  designSystem: {
    title: 'Built as a real site, not a mockup',
    body: <p>A pitch lands harder as a link than as a deck, so I built the concept as a working site: scroll-driven scenes with GSAP ScrollTrigger and Lenis, a three.js glass hand and 3D hexagon, a dark and light theme, and the full page in English and Spanish, checked on mobile.</p>,
    chips: ['Next.js 15', 'React 19', 'Tailwind CSS 4', 'GSAP ScrollTrigger', 'Lenis', 'three.js', 'Motion', 'English and Spanish', 'Dark and light'],
  },
  stats: {
    title: 'A concept you can click.',
    items: [
      { value: 12, unit: 'sections', label: 'Redesigned, top to bottom' },
      { value: 2, unit: 'languages', label: 'English and Spanish' },
      { value: 2, unit: 'themes', label: 'Obsidian and white' },
      { value: 1, unit: 'link', label: 'To pitch with, instead of a deck' },
    ],
  },
  leadership: {
    roleAndTeam: <p>Self-initiated, solo. I wrote the brief, designed the homepage, and built it end to end, using only facts and copy from Snapflow's live site.</p>,
    bet: <p>Snapflow sells precision: one token change moving consistently through every screen. The bet was that the strongest pitch was a homepage that feels as precise as the product, built and live, so the founder could click it rather than imagine it.</p>,
    hardCall: { pending: 'One decision with tradeoffs. A candidate: going dark by default when the live brand is light, or keeping every line of the live copy instead of rewriting it.' },
    howILed: (
      <ul>
        <li>Kept every fact and line of copy from the live site, so the redesign was judged on design, not on new claims.</li>
        <li>Reordered the page into one story, from why it matters to how it gets into your codebase.</li>
        <li>Built it as a working site in two languages and two themes, and checked it on mobile.</li>
      </ul>
    ),
    howILedTitle: 'How I approached it',
    outcome: { pending: 'What happened after the pitch: the founder\'s response, or whether it led to work.' },
    differently: { pending: 'What you would do differently, looking back.' },
  },
  footerFacts: ['Type: self-initiated concept', 'Languages: English and Spanish', 'Built with: Next.js, GSAP, three.js'],
};

const docsShot = (name: string, alt: string): CsImage => ({ src: `/images/docsalot-${name}.webp`, alt, width: 1600, height: 1000 });

export const docsalot: CaseStudy = {
  slug: 'docsalot',
  title: 'DocsAlot',
  tagline: "A redesign concept of DocsAlot's homepage. The live site talked about AI-readable docs; the redesign shows them, flipping the whole page between what people read and what AI agents read.",
  // DocsAlot's ink and cobalt, its sky band, and two light neutrals
  theme: { primary: '#0F172A', accent: '#2563EB', soft: '#DCE6FB', highlight: '#FFFFFF', cream: '#FFFFFF', tint: '#FAF8F5' },
  roles: [
    { label: 'Role', value: 'Concept, design and build' },
    { label: 'Type', value: 'Homepage redesign concept' },
    { label: 'Year', value: '2026' },
    { label: 'Built with', value: 'Next.js' },
  ],
  live: { href: 'https://docs-alot.vercel.app/', label: 'After: see the concept' },
  links: [{ href: 'https://docsalot.dev/', label: 'Before: live DocsAlot site' }],
  heroImage: docsShot('hero', 'The redesigned DocsAlot homepage hero: Your docs have two readers now. DocsAlot writes for both., with a Human and Machine switch in the header.'),
  context: {
    title: 'A product about showing, on a page that only told.',
    body: (
      <>
        <p>DocsAlot turns scattered help articles, API references, and product notes into one source of truth: hosted docs for people, plus llms.txt, skill.md, clean markdown, and a hosted MCP server for AI agents.</p>
        <p>The live homepage, fresh off its Product Hunt launch, described all of that without showing any of it. A launch block pushed the headline down, many small cards carried the same weight, up to five buttons competed in every section, and body text was 13px. I redesigned the homepage as a working concept, keeping DocsAlot's blue, fonts, and logo, and rebuilt the story so the product proves itself on the page.</p>
      </>
    ),
    highlights: [
      <>Land the main idea in <mark className="bg-[#2563EB]/10 text-[#2563EB] font-bold px-1 rounded">the first 3 seconds</mark>.</>,
      <>Show "agent-readable", <mark className="bg-[#2563EB]/10 text-[#2563EB] font-bold px-1 rounded">don't claim it</mark>.</>,
      <>One clear path: <mark className="bg-[#2563EB]/10 text-[#2563EB] font-bold px-1 rounded">Try DocsAlot</mark>.</>,
    ],
  },
  beforeAfter: {
    title: 'A site that talks. A site that shows.',
    intro: <p>Drag to compare the live homepage with the redesign. Same product, same blue, a different first three seconds.</p>,
    before: docsShot('before-hero', 'Before: the live DocsAlot homepage, a Product Hunt block above the headline Agent-readable docs for developers and AI agents.'),
    after: docsShot('hero', 'After: the redesigned DocsAlot homepage, a slim launch bar above the headline Your docs have two readers now.'),
    changes: [
      { title: 'The idea, first', text: 'A slim launch bar replaces the Product Hunt block, so the bold headline is the first thing anyone reads.' },
      { title: 'Proof, not claims', text: 'A Human / Machine switch turns the whole site into the markdown AI agents read.' },
      { title: 'One main action', text: 'At most two buttons per section, down from five, with "Try DocsAlot" always the main one.' },
    ],
  },
  quote: {
    label: 'In one line',
    text: 'Before, a site that talks about AI-readable docs. After, a site that shows it, flipping between the human and agent views of the same page.',
    flow: 'HUMAN ⇄ MACHINE',
  },
  story: {
    title: 'Eleven changes, before and after.',
    intro: 'The five biggest changes, one at a time, then six smaller ones at a glance.',
    beats: [
      { title: 'First impression', before: 'A Product Hunt block sat on top and pushed a generic headline ("Agent-readable docs…") down, above a static screenshot.', now: 'A slim launch bar and a bold headline, "Your docs have two readers now." A live split view shows the same page for people and for AI. The main idea lands in the first 3 seconds.', image: docsShot('hero', 'The redesigned hero: Your docs have two readers now. DocsAlot writes for both.') },
      { title: 'Agent-readable, shown', before: 'Mostly claimed in the copy, with a small view toggle tucked into a corner.', now: 'A Human / Machine switch in the header turns the whole site into the markdown AI agents read. It proves the product instead of describing it.', image: docsShot('machine', 'Machine view: the DocsAlot homepage rendered as the markdown an AI agent reads.') },
      { title: 'The problem, as a story', before: 'Described in text: "stale help-center pages…"', now: 'A scroll story: a rate limit changes, the docs go stale, an AI gives a wrong answer, and one request fixes it everywhere. Visitors watch the pain and the fix happen.', image: docsShot('story-stale', 'A rate limit changes. Watch who finds out: production says 1,000 requests a minute while the docs still say 100.') },
      { title: 'One source, every surface', before: 'Six static cards.', now: 'An interactive wiring diagram. Visitors edit the product name and rate limit and watch all six outputs rebuild, so "one source, every surface" becomes hands-on.', image: docsShot('surfaces', 'Edit the source: a product name and rate limit slider feeding hosted docs, API reference, llms.txt, skill.md, hosted MCP, and an AI visibility audit.') },
      { title: 'The benchmark, in numbers', before: 'A link to the leaderboard.', now: 'A live scan scores a demo site 41, then 96 "with DocsAlot", next to real leaderboard rows. The value shows up as a number.', image: docsShot('benchmark', 'Before an agent reads your docs, check the benchmark: a demo site scanned at 41, 96 with DocsAlot, beside leaderboard rows.') },
    ],
    more: [
      { title: 'One clear flow', before: 'Many small, abstract cards with similar weight, so nothing stood out.', now: 'One flow, with animated diagrams: connect your sources, package them for agents, publish everywhere. One story is easier to follow than ten cards.' },
      { title: 'Logos you recognize', before: 'Integrations as plain text names, with Product Hunt badges tucked into the footer.', now: 'Real logos, from GitHub, Notion, and Zendesk to ChatGPT, Claude, and Cursor, with Product Hunt badges under the hero and in the footer. Faster recognition, stronger credibility.' },
      { title: 'One main action', before: 'Five competing buttons per section: try, demo, audit, leaderboard, score.', now: 'At most two per section, with one main action, "Try DocsAlot". A clear path and less decision fatigue.' },
      { title: 'Readable by default', before: '13px body text, in low contrast.', now: '16 to 19px body text under large, confident headings. Easier to read, and it looks more premium.' },
      { title: 'A section with its own color', before: 'Flat off-white and thin lines, so every section looked the same.', now: "Bold color bands (ink, cobalt, sky, butter), outlined cards, stickers, and motion, keeping DocsAlot's blue, fonts, and logo. Each section has its own identity, and the site feels like a funded product." },
      { title: 'A close worth remembering', before: 'A dense list of links.', now: 'Organized links, the "for agents" files (llms.txt and index.md), Product Hunt badges, and a giant wordmark. A strong, memorable close.' },
    ],
  },
  pages: {
    title: 'More of the new homepage.',
    intro: 'The rest of the redesign, in page order. Hover to pause.',
    pages: [
      { name: 'Connect', line: 'Real logos for the tools teams already use.', image: docsShot('connect', 'Connect once: GitHub, OpenAPI, Notion, Intercom, Zendesk, and Confluence logos wired into DocsAlot.') },
      { name: 'The story opens', line: 'Acme ships a new rate limit, and the docs fall behind.', image: docsShot('story-open', 'The story opens on a changelog: Acme ships a new rate limit.') },
      { name: 'The fix', line: 'One sentence to an agent updates every page that mentions it.', image: docsShot('story-fix', 'You ask DocsAlot to fix it: one request updates every page that mentions the rate limit.') },
      { name: 'How it works', line: 'Connect, package, publish: one flow instead of ten cards.', image: docsShot('how', 'Three steps. From scattered to agent-ready: connect, package, publish.') },
      { name: 'Setup', line: 'Install the CLI, then just ask your agent.', image: docsShot('setup', 'Install the CLI. Then just ask your agent, beside a terminal window.') },
      { name: 'Team stories', line: 'A butter band, outlined cards, and large type.', image: docsShot('stories', 'Three teams. One source of truth, on a butter band with outlined cards.') },
      { name: 'Pricing', line: 'Three plans, with the launch offer as a sticker.', image: docsShot('pricing', 'Simple pricing for docs that maintain themselves: Startup, Team, and Enterprise plans.') },
      { name: 'Questions', line: 'The FAQ technical buyers ask first, in readable type.', image: docsShot('faq', 'Questions technical buyers ask first, in large type on a sky band.') },
      { name: 'Footer', line: 'Agent files, Product Hunt badges, and a giant wordmark.', image: docsShot('footer', 'The footer: Product Hunt badges above a giant DocsAlot wordmark.') },
    ],
  },
  designSystem: {
    title: "DocsAlot's blue, with more to say",
    body: <p>I kept DocsAlot's blue and logo and built around them: four color bands give each section its own identity, outlined cards and stickers add character, larger type makes it easy to read, and a separate dark palette powers the machine view.</p>,
    tokens: {
      colors: [
        { name: 'Ink', value: '#0f172a' },
        { name: 'Cobalt', value: '#2563eb' },
        { name: 'Sky', value: '#dce6fb' },
        { name: 'Butter', value: '#f5e6b3' },
        { name: 'Canvas', value: '#f9f8f5' },
        { name: 'Slate', value: '#5e6b80' },
        { name: 'Pass', value: '#2f7a4d' },
        { name: 'Fail', value: '#c2352b' },
        { name: 'Amber', value: '#a8710a' },
        { name: 'Machine canvas', value: '#0d1117' },
        { name: 'Machine blue', value: '#6ea1ff' },
      ],
      font: 'Geist Sans, Work Sans and JetBrains Mono',
      type: [
        { name: 'Display', size: '95px', sample: 'Your docs have two readers now.' },
        { name: 'Heading 2', size: '54px', sample: 'Connect once.' },
        { name: 'Heading 3', size: '27px', sample: 'Package for agents.' },
        { name: 'Body', size: '16 to 19px', sample: 'People get docs they trust.' },
        { name: 'Mono', size: '12.5px', sample: 'npm install -g docsalot-cli' },
      ],
      motion: [
        { name: 'Snap', curve: 'cubic-bezier(0.2, 0.9, 0.25, 1)', use: 'Quick UI responses' },
        { name: 'Scan', curve: 'cubic-bezier(0.7, 0, 0.2, 1)', use: 'Scans and sweeps' },
        { name: 'Standard', curve: 'cubic-bezier(0.4, 0, 0.2, 1)', use: 'Everyday transitions' },
      ],
    },
  },
  stats: {
    title: 'Shown, not told.',
    items: [
      { value: 11, unit: 'changes', label: 'Before and after, top to bottom' },
      { value: 2, unit: 'views', label: 'Human and Machine, one page' },
      { value: 2, unit: 'buttons', label: 'At most per section, down from five' },
      { value: 19, unit: 'px', label: 'Body text, up from 13px' },
    ],
  },
  leadership: {
    roleAndTeam: { pending: 'Who the redesign was for, who worked on it with you, and how long it took.' },
    bet: <p>DocsAlot sells docs that AI agents can actually read. The bet was that the strongest homepage would prove that on the spot: let visitors flip the page into what an agent sees, watch stale docs cause a wrong answer, and watch one request fix it.</p>,
    hardCall: { pending: 'One decision with tradeoffs. A candidate: moving the Product Hunt block out of the hero during launch week, or cutting each section to two buttons.' },
    howILed: (
      <ul>
        <li>Wrote the homepage as one story, from the problem to the fix, before designing any section.</li>
        <li>Turned every claim into something visitors can see or try: the machine view, the wiring diagram, and the benchmark scan.</li>
        <li>Kept DocsAlot's blue, fonts, and logo, so the redesign reads as DocsAlot, only louder.</li>
      </ul>
    ),
    howILedTitle: 'How I approached it',
    outcome: { pending: "What happened after the redesign: the team's response, or whether it shipped." },
    differently: { pending: 'What you would do differently, looking back.' },
  },
  footerFacts: ['Type: homepage redesign concept', 'Views: Human and Machine', 'Built with: Next.js'],
};
