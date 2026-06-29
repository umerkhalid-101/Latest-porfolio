import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  ExternalLink, 
  Sparkles, 
  ShieldCheck, 
  Compass, 
  Heart, 
  UserCheck, 
  Ghost, 
  Award, 
  Check, 
  HelpCircle, 
  MessageSquare, 
  Lock, 
  Grid, 
  Smartphone, 
  CheckCircle2, 
  Zap, 
  Mail, 
  MapPin, 
  Phone 
} from 'lucide-react';
import { useEffect } from 'react';

interface SalamsCaseStudyProps {
  onClose: () => void;
}

export function SalamsCaseStudy({ onClose }: SalamsCaseStudyProps) {
  // Scroll to top when mounting the case study
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="bg-[#FAF8F5] text-[#121115] min-h-screen relative font-sans selection:bg-[#FF4D8D] selection:text-white">
      {/* Native React 19 document metadata hoisting */}
      <title>Salams Case Study — Designed by Umer</title>
      <meta name="description" content="I designed and scaled Salams, a Muslim matchmaking app, as the sole product designer for 5 years—directly leading to its acquisition by Match Group." />
      <meta property="og:title" content="Salams Case Study — Designed by Umer" />
      <meta property="og:description" content="As the sole product designer for 5 years, I designed and scaled Salams from the ground up, leading to its acquisition by Match Group in 2023. Read the complete end-to-end design case study." />
      <meta property="og:image" content="https://drive.google.com/thumbnail?id=1POHWBzcAJTVXUKs_B1HFJmbrn8EbJ8p1&sz=w1200" />
      <meta property="og:url" content="https://www.umerkhalid.co/salams-casestudy" />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:image" content="https://drive.google.com/thumbnail?id=1POHWBzcAJTVXUKs_B1HFJmbrn8EbJ8p1&sz=w1200" />
      <link rel="canonical" href="https://www.umerkhalid.co/salams-casestudy" />
      
      {/* Fixed Navigation Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 w-full z-50 px-4 md:px-10 bg-[#FAF8F5]/90 backdrop-blur-xl border-b border-[#121115]/5 py-4 flex items-center"
      >
        <div className="flex items-center w-full">
          {/* Logo */}
          <div className="flex items-center gap-4 min-w-max">
            <button 
              onClick={onClose}
              className="font-display text-3xl tracking-tighter flex items-center gap-1 text-[#121115] hover:text-[#FF4D8D] transition-colors cursor-pointer"
            >
              <span>UMER</span>
            </button>
          </div>
          
          <div className="flex-1 flex items-center">
            <div className="h-[1px] bg-[#121115]/20 w-full mx-4" />
            
            <nav className="hidden lg:flex items-center gap-0 flex-1">
              {[
                { label: 'CONTEXT', href: '#salams-context' },
                { label: 'SOLUTION', href: '#salams-gap' },
                { label: 'RESEARCH', href: '#salams-interviews' },
                { label: 'ETHOS', href: '#salams-ethos' },
              ].map((item, index) => (
                <a key={index} href={item.href} className="flex flex-1 items-center gap-4 group cursor-pointer h-10 no-underline">
                  <div className="w-1.5 h-1.5 rounded-full border-[1px] border-[#121115] group-hover:bg-[#FF4D8D] group-hover:border-[#FF4D8D] transition-colors" />
                  <span className="text-[10px] font-bold tracking-[0.25em] text-[#121115]/80 group-hover:text-[#FF4D8D] transition-colors whitespace-nowrap">
                    {item.label}
                  </span>
                  <div className="h-[1px] bg-[#121115]/20 flex-1" />
                </a>
              ))}
            </nav>
          </div>

          {/* Back Action */}
          <div className="flex items-center pl-4 md:pl-12">
            <button 
              onClick={onClose}
              className="flex items-center gap-2 text-[#121115]/70 hover:text-[#FF4D8D] transition-colors group cursor-pointer"
              id="salams-back-btn"
            >
              <ArrowLeft size={16} className="transform group-hover:-translate-x-1 transition-transform" />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase">BACK</span>
            </button>
          </div>
        </div>
      </motion.header>

      {/* 1. HERO SECTION (Vibrant Pink, White Text) */}
      <section className="bg-[#FF4D8D] text-white pt-32 pb-24 md:pt-40 md:pb-32 px-6 relative overflow-hidden" id="salams-hero">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Metadata and Main Text */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 space-y-8"
            >
              <div className="space-y-4">
                <h1 className="text-6xl md:text-[110px] leading-none tracking-tight font-serif font-black text-white" id="salams-title">
                  Salams.
                </h1>
                <p className="text-xl md:text-[26px] text-white/95 font-medium tracking-tight leading-relaxed max-w-2xl">
                  Designing a marriage-focused matchmaking app from the ground up, across onboarding, trust, retention, and monetization, until Match Group came calling.
                </p>
              </div>
 
              {/* Roles Table (Matches PDF layout precisely with unified border) */}
              <div className="border border-white/30 rounded-2xl grid grid-cols-2 md:grid-cols-4 overflow-hidden mt-8 max-w-3xl">
                <div className="p-5 md:p-6 border-r border-b md:border-b-0 border-white/20">
                  <p className="text-white/70 text-[10px] md:text-xs font-bold uppercase tracking-widest">Role</p>
                  <p className="text-sm md:text-lg font-black uppercase mt-1.5 text-white">UX Designer</p>
                </div>
                <div className="p-5 md:p-6 border-b md:border-b-0 md:border-r border-white/20">
                  <p className="text-white/70 text-[10px] md:text-xs font-bold uppercase tracking-widest">Platform</p>
                  <p className="text-sm md:text-lg font-black uppercase mt-1.5 text-white">iOS & Android</p>
                </div>
                <div className="p-5 md:p-6 border-r border-white/20">
                  <p className="text-white/70 text-[10px] md:text-xs font-bold uppercase tracking-widest">Years</p>
                  <p className="text-sm md:text-lg font-black uppercase mt-1.5 text-white">2018–2023</p>
                </div>
                <div className="p-5 md:p-6">
                  <p className="text-white/70 text-[10px] md:text-xs font-bold uppercase tracking-widest">Outcome</p>
                  <p className="text-sm md:text-lg font-black uppercase mt-1.5 text-white flex items-center gap-1">
                     Acquired <span className="font-sans text-sm md:text-xl leading-none">↗</span>
                  </p>
                </div>
              </div>
            </motion.div>
 
            {/* Right Column: Beautiful Aligned Horizontal Phone Screens (Matches PDF Page 1 layout) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 flex justify-center items-center"
            >
              <img 
                src="https://drive.google.com/thumbnail?id=1YLF5FBoPRUhiIj16V6NQn7h3mUZSbLyA&sz=w1200" 
                alt="Salams Mobile Screens" 
                referrerPolicy="no-referrer"
                className="w-full h-auto object-contain max-h-[480px] drop-shadow-2xl select-none"
              />
            </motion.div>
 
          </div>
        </div>
      </section>

      {/* 2. CONTEXT SECTION (Off-white background, editorial) */}
      <section className="py-24 px-6 max-w-7xl mx-auto" id="salams-context">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Left Column: Context Text */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            <span className="text-[#FF4D8D] text-xs font-bold uppercase tracking-widest block">// CONTEXT</span>
            <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight leading-none">
              A dating app built for people who are serious about marriage.
            </h2>
            <div className="space-y-6 text-[#121115]/80 text-base md:text-lg leading-relaxed">
              <p>
                Muslim matchmaking sits at the intersection of modern app conventions and deeply held cultural values around marriage, family, and community. When I joined Salams in 2018, it already had an established user base, but the experience was letting people down at every stage.
              </p>
              <p>
                The app looked like every other dating app on the market. That was exactly the wrong signal for an audience that wasn't here to swipe casually. They were here to find a life partner. Users were dropping off during onboarding, fake profiles were eroding trust, ghosting was rampant, and the monetization felt awkward against the emotional weight of what people were trying to do.
              </p>
              <p>
                I was the sole designer across all of these problems for <span className="font-bold">5 years</span>, until <span className="text-[#FF4D8D] font-bold">Match Group acquired Salams in 2023</span>.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Highlight boxes (Mimicking PDF right side column) */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 space-y-4 flex flex-col justify-center"
          >
            
            <div className="bg-[#FFFDEE] border border-[#121115]/10 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#FF4D8D]" />
              <p className="text-sm md:text-base leading-relaxed">
                Users were <mark className="bg-[#FF4D8D]/20 text-[#121115] font-bold px-1 rounded">more serious than Tinder users</mark>. They wanted depth, not just swiping. Every interaction carried the weight of a potential life decision.
              </p>
            </div>

            <div className="bg-[#FFFDEE] border border-[#121115]/10 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#FF4D8D]" />
              <p className="text-sm md:text-base leading-relaxed">
                Ghosting carried <mark className="bg-[#FF4D8D]/20 text-[#121115] font-bold px-1 rounded">real cultural weight</mark>. Being ignored after connecting felt disrespectful in a way that a generic dating app never accounts for.
              </p>
            </div>

            <div className="bg-[#FFFDEE] border border-[#121115]/10 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#FF4D8D]" />
              <p className="text-sm md:text-base leading-relaxed">
                Many users had <mark className="bg-[#FF4D8D]/20 text-[#121115] font-bold px-1 rounded">family involved in their search</mark>. Trust and legitimacy weren't nice to have features. They were the product itself.
              </p>
            </div>

          </motion.div>

        </div>
      </section>

      {/* 3. PROBLEM DEFINITION SECTION (White Editorial Style with Illustration) */}
      <section className="py-24 px-6 bg-white border-t border-b border-[#121115]/5">
        <div className="max-w-7xl mx-auto space-y-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-2xl md:text-4xl font-medium text-[#FF4D8D] tracking-tight">
              What is the problem we are trying to solve?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Image Illustration */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-6 flex justify-center"
            >
              <img 
                src="https://drive.google.com/thumbnail?id=1jZIzyVreu9T6VJkRv9FLbaLDKvX0keU5&sz=w1000" 
                alt="Matchmaking problem illustration" 
                referrerPolicy="no-referrer"
                className="w-full max-w-lg h-auto object-contain select-none"
              />
            </motion.div>

            {/* Right Column: Questions & Text */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="lg:col-span-6 space-y-12"
            >
              <div className="space-y-4">
                <h3 className="text-xl md:text-2xl font-semibold text-[#FF4D8D] leading-snug">
                  When was the last time a Muslim dating app felt like it understood you?
                </h3>
                <p className="text-base md:text-lg text-[#121115]/80 leading-relaxed font-normal">
                  Generic dating apps are designed for casual connection. Salams users came for something far more serious: marriage. The app's look, feel, and flows sent the wrong message from the very first screen, and users were leaving before they ever matched.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl md:text-2xl font-semibold text-[#FF4D8D] leading-snug">
                  When was the last time you trusted every profile you saw on a matchmaking app?
                </h3>
                <p className="text-base md:text-lg text-[#121115]/80 leading-relaxed font-normal">
                  Fake profiles were a real crisis for this audience. In a community making marriage decisions, encountering a fraudulent profile wasn't just annoying. It was a betrayal of the platform's entire promise. Trust was collapsing and users felt it.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. WHY IT MATTERED & METRIC BANNER (Vibrant Brand Pink Editorial Columns) */}
      <section className="py-24 md:py-32 px-6 bg-[#FF8FAB] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Left Column */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="space-y-6 md:space-y-8"
            >
              <h3 className="text-white/90 text-xl md:text-2xl font-normal tracking-tight">
                Why it mattered?
              </h3>
              <p className="text-3xl md:text-4xl lg:text-[44px] font-bold text-[#121115] tracking-tight leading-[1.2]">
                60—70% of new users were dropping off during onboarding before ever seeing a single profile.
              </p>
              <p className="text-white/90 text-sm md:text-base font-normal tracking-wide flex items-center gap-1.5">
                <span>↓</span> Brought down to 40% after redesign
              </p>
            </motion.div>

            {/* Right Column */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="space-y-6 md:space-y-8"
            >
              <h3 className="text-white/90 text-xl md:text-2xl font-normal tracking-tight">
                The cultural reality
              </h3>
              <p className="text-3xl md:text-4xl lg:text-[44px] font-bold text-[#121115] tracking-tight leading-[1.2]">
                Ghosting someone on a Muslim marriage app doesn't just hurt. In this community, it's disrespectful and it was destroying retention.
              </p>
              <p className="text-white/90 text-sm md:text-base font-normal tracking-wide flex items-center gap-1.5">
                <span>→</span> Led to the anti-ghosting mechanic
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 5. WHY DO THESE NUMBERS MATTER? (Editorial Quote) */}
      <section className="py-24 md:py-32 px-6 bg-[#FAF9E2] border-b border-[#121115]/5">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center space-y-12 md:space-y-16">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="space-y-4 md:space-y-6"
          >
            <h4 className="text-[#121115] text-lg md:text-2xl font-normal tracking-tight">
              Why do these numbers matter?
            </h4>
            <p className="text-[#FF8FAB] text-2xl md:text-4xl lg:text-[40px] font-medium tracking-tight leading-[1.4] max-w-5xl mx-auto">
              In a community built on trust and intention, every broken experience is a person who gave up on finding a life partner.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, width: "20%" }}
            whileInView={{ opacity: 1, width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full py-6 md:py-8 bg-gradient-to-r from-transparent via-[#FF8FAB]/15 to-transparent flex justify-center items-center"
          >
            <span className="text-xs md:text-base lg:text-lg font-bold tracking-[0.2em] text-[#121115]">
              ONBOARDING → TRUST → RETENTION → REVENUE
            </span>
          </motion.div>

        </div>
      </section>

      {/* 6. DELVING DEEPER INTO PROBLEM SPACE */}
      <section className="py-24 md:py-32 px-6 bg-[#FFFCF8]" id="salams-problem-space">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Heading (Left-aligned, elegant, medium weight) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <h2 className="text-3xl md:text-[40px] font-medium text-[#121115] tracking-tight">
              Delving deeper into the problem space.
            </h2>
          </motion.div>

        {/* Stepper Header (Problem Space 01 -> 02 -> 03 with connecting lines) */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center mb-16"
        >
          <div className="flex items-center gap-4 w-full">
            <span className="text-[#FF8FAB] text-sm font-semibold tracking-wider uppercase whitespace-nowrap">
              Problem Space — 01
            </span>
            <div className="h-[1px] bg-[#121115]/10 flex-grow hidden md:block"></div>
          </div>
          <div className="flex items-center gap-4 w-full">
            <span className="text-[#FF8FAB] text-sm font-semibold tracking-wider uppercase whitespace-nowrap">
              Problem Space — 02
            </span>
            <div className="h-[1px] bg-[#121115]/10 flex-grow hidden md:block"></div>
          </div>
          <div className="flex items-center gap-4 w-full">
            <span className="text-[#FF8FAB] text-sm font-semibold tracking-wider uppercase whitespace-nowrap">
              Problem Space — 03
            </span>
          </div>
        </motion.div>

        {/* The 3 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          
          {/* Column 1: Getting in the door */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-8 flex flex-col"
          >
            {/* Centered Illustration */}
            <div className="flex justify-center md:justify-start">
              <div className="w-40 h-40 md:w-44 md:h-44 flex items-center justify-center transition-transform hover:scale-105 duration-300">
                <img 
                  src="https://lh3.googleusercontent.com/d/18IEiXpNnQNmeg_uEQX_iyPJxOMrqSWZa" 
                  alt="Getting in the door illustration" 
                  className="max-w-full max-h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            {/* Column Header and Content */}
            <div className="space-y-6">
              <h3 className="text-2xl md:text-[26px] font-medium text-[#FF8FAB] tracking-tight">
                Getting in the door
              </h3>
              <ul className="space-y-4 text-[#121115]/90 text-lg font-light leading-relaxed">
                <li className="flex items-start gap-3">
                  <span className="text-[#121115] mt-1.5 text-xs">•</span>
                  <span>Why were users abandoning onboarding?</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#121115] mt-1.5 text-xs">•</span>
                  <span>What fields were unnecessary friction?</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#121115] mt-1.5 text-xs">•</span>
                  <span>How many steps was too many?</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#121115] mt-1.5 text-xs">•</span>
                  <span>What did &ldquo;trustworthy&rdquo; look like on screen one?</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Column 2: Building trust */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8 flex flex-col"
          >
            {/* Centered Illustration */}
            <div className="flex justify-center md:justify-start">
              <div className="w-40 h-40 md:w-44 md:h-44 flex items-center justify-center transition-transform hover:scale-105 duration-300">
                <img 
                  src="https://lh3.googleusercontent.com/d/1Ereolg7L_aGuCAWCeF8Fxnc3Jv4VP1cR" 
                  alt="Building trust illustration" 
                  className="max-w-full max-h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            {/* Column Header and Content */}
            <div className="space-y-6">
              <h3 className="text-2xl md:text-[26px] font-medium text-[#FF8FAB] tracking-tight">
                Building trust
              </h3>
              <ul className="space-y-4 text-[#121115]/90 text-lg font-light leading-relaxed">
                <li className="flex items-start gap-3">
                  <span className="text-[#121115] mt-1.5 text-xs">•</span>
                  <span>How do you prove someone is real?</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#121115] mt-1.5 text-xs">•</span>
                  <span>What verification methods are acceptable?</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#121115] mt-1.5 text-xs">•</span>
                  <span>How do you surface trust signals without feeling invasive?</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#121115] mt-1.5 text-xs">•</span>
                  <span>What does a &ldquo;safe&rdquo; profile card look like?</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Column 3: Making matches meaningful */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-8 flex flex-col"
          >
            {/* Centered Illustration */}
            <div className="flex justify-center md:justify-start">
              <div className="w-40 h-40 md:w-44 md:h-44 flex items-center justify-center transition-transform hover:scale-105 duration-300">
                <img 
                  src="https://lh3.googleusercontent.com/d/1_h06vrRCtTw-aoFS8_ZiLxIqvNC8a2nc" 
                  alt="Making matches meaningful illustration" 
                  className="max-w-full max-h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
             {/* Column Header and Content */}
            <div className="space-y-6">
              <h3 className="text-2xl md:text-[26px] font-medium text-[#FF8FAB] tracking-tight">
                Making matches meaningful
              </h3>
              <ul className="space-y-4 text-[#121115]/90 text-lg font-light leading-relaxed">
                <li className="flex items-start gap-3">
                  <span className="text-[#121115] mt-1.5 text-xs">•</span>
                  <span>Why were matches not converting to conversations?</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#121115] mt-1.5 text-xs">•</span>
                  <span>How do you discourage ghosting without being preachy?</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#121115] mt-1.5 text-xs">•</span>
                  <span>How do monetization prompts serve the user's goal?</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#121115] mt-1.5 text-xs">•</span>
                  <span>What does a respectful upsell look like?</span>
                </li>
              </ul>
            </div>
          </motion.div>

        </div>
      </div>
    </section>

      {/* 6. IDENTIFYING THE GAP (Vibrant Pink Background, Full Graphic Image) */}
      <section className="bg-[#FF4D8D] py-16 md:py-24 px-4 md:px-8 relative overflow-hidden text-center" id="salams-gap">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto flex flex-col items-center space-y-8"
        >
          <div className="space-y-6">
            <p className="text-white/90 font-light tracking-wide text-sm md:text-lg">
              Identifying the gap, led to our solution;
            </p>
            <h2 className="text-xl md:text-3xl lg:text-[32px] text-white font-light leading-relaxed max-w-3xl mx-auto tracking-normal px-2">
              A matchmaking app built <span className="font-semibold text-white">specifically for Muslim users seeking marriage</span> with trust built in, not bolted on, and monetization that serves people rather than manipulates them.
            </h2>
            <div className="text-white font-serif text-6xl md:text-8xl lg:text-[9rem] font-bold tracking-tight select-none leading-none pt-4">
              Salams.
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-5xl mt-12"
          >
            <img 
              src="https://lh3.googleusercontent.com/d/1w-O63A9n20Bn9vMZjmuODPKXUaAtyW6-" 
              alt="Identifying the gap, led to our solution: A matchmaking app built specifically for Muslim users seeking marriage with trust built in, not bolted on, and monetization that serves people rather than manipulates them. Salams."
              className="w-full h-auto max-w-4xl mx-auto object-contain select-none transition-transform duration-300 hover:scale-[1.01]"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* 7. HOLISTIC PLATFORM STRATEGY (3 Phone Screens side by side, light yellow-green background) */}
      <section className="py-24 px-6 bg-[#EEF7D2]" id="salams-strategy">
        <div className="max-w-7xl mx-auto space-y-16">
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <p className="text-2xl md:text-[34px] leading-relaxed font-normal tracking-tight text-[#FF4D8D]">
              <span className="font-extrabold">Salams</span> aims to provide a <span className="font-extrabold text-[#FF4D8D]">holistic platform for Muslim matchmaking</span> by offering a tailored experience built on trust, depth, and genuine intention.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 pt-8 justify-items-center">
            
            {/* Screen Block 1: Onboarding Mode */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="space-y-6 flex flex-col items-center md:items-start max-w-[280px]"
            >
              {/* Phone Mockup with direct image link */}
              <div className="relative group transition-transform duration-500 hover:scale-[1.03]">
                <img
                  src="https://lh3.googleusercontent.com/d/1RAnh77QIjb2qY-DCDbvioWYSf0_AGBsK"
                  alt="Redesigned Onboarding Screen"
                  className="w-full h-auto object-contain rounded-[40px] shadow-2xl"
                  referrerPolicy="no-referrer"
                />
              </div>
              {/* Caption */}
              <p className="text-sm md:text-base text-[#121115] leading-relaxed text-left">
                A redesigned onboarding with progressive disclosure, simplified steps, and a modern visual identity that signals trust from screen one.
              </p>
            </motion.div>

            {/* Screen Block 2: Selfie Verification */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="space-y-6 flex flex-col items-center md:items-start max-w-[280px]"
            >
              {/* Phone Mockup with direct image link */}
              <div className="relative group transition-transform duration-500 hover:scale-[1.03]">
                <img
                  src="https://lh3.googleusercontent.com/d/192GkuuSr2AkPo0B2__xtxoJ4LTUjUkfg"
                  alt="Selfie Verification Screen"
                  className="w-full h-auto object-contain rounded-[40px] shadow-2xl"
                  referrerPolicy="no-referrer"
                />
              </div>
              {/* Caption */}
              <p className="text-sm md:text-base text-[#121115] leading-relaxed text-left">
                ID verification badge and selfie verification, surfaced prominently on every profile card to rebuild community trust at scale.
              </p>
            </motion.div>

            {/* Screen Block 3: Anti-Ghosting */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="space-y-6 flex flex-col items-center md:items-start max-w-[280px]"
            >
              {/* Phone Mockup with direct image link */}
              <div className="relative group transition-transform duration-500 hover:scale-[1.03]">
                <img
                  src="https://lh3.googleusercontent.com/d/1-bmwXRuwIGjQ--CR2IAd0VW5mm9coUSw"
                  alt="Anti-Ghosting Screen"
                  className="w-full h-auto object-contain rounded-[40px] shadow-2xl"
                  referrerPolicy="no-referrer"
                />
              </div>
              {/* Caption */}
              <p className="text-sm md:text-base text-[#121115] leading-relaxed text-left">
                Anti-ghosting mechanic: if you haven't replied, the app forces a decision. Reply or unmatch. No silent disappearing allowed.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 9. WE CONDUCTED USER INTERVIEWS (Vibrant Pink, White Text) */}
      <section className="bg-[#FF4D8D] text-white py-24 px-6 border-t border-[#121115]/10" id="salams-interviews">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 space-y-6"
          >
            <h3 className="text-3xl md:text-5xl lg:text-[44px] leading-tight font-bold tracking-tight text-white">
              We conducted user interviews, gaining invaluable insights.
            </h3>
            <p className="text-white/90 text-base md:text-lg leading-relaxed font-light">
              Participants were recruited through surveys and community outreach, helping us identify users across our two main archetypes. We ran usability tests alongside interviews to validate assumptions in real time.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-6 flex justify-center lg:justify-end"
          >
            <div className="relative group transition-transform duration-500 hover:scale-[1.02] w-full max-w-[560px]">
              <img
                src="https://lh3.googleusercontent.com/d/1wEqCPTfvQJDWUghYiXP6neBHHP36_jah"
                alt="User Interview Call Screenshots"
                className="w-full h-auto object-contain rounded-[24px] shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 10. OBSERVATION TO INSIGHTS (Split Screen Layout - White Left, Cream-Yellow Right) */}
      <section className="grid grid-cols-1 md:grid-cols-2 border-t border-[#121115]/10" id="salams-synthesis">
        {/* Left Column (White) */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="bg-white py-20 px-8 md:px-16 lg:px-24 flex flex-col justify-center space-y-12"
        >
          <div className="space-y-10 max-w-xl">
            <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-[#0F55A8]">
              Observation to Insights
            </h2>

            <div className="space-y-6">
              <span className="text-[#FF4D8D] text-lg font-bold tracking-tight block">
                // 1 Onboarding Drop-off
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-[#121115] leading-snug">
                The flow was asking too much, too soon.
              </h3>
              <ul className="space-y-4 text-[#121115]/80 text-base md:text-[17px] list-none pl-0">
                <li className="flex items-start gap-3">
                  <span className="text-[#121115] font-extrabold text-lg mt-[-2px]">•</span>
                  <span>Users wanted to see profiles before committing personal details.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#121115] font-extrabold text-lg mt-[-2px]">•</span>
                  <span>Fields like "sect" and "income" felt intrusive on first use.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#121115] font-extrabold text-lg mt-[-2px]">•</span>
                  <span>Progress indicators were absent, so the end felt unknowable.</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Right Column (Pale Yellow/Cream Background) */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="bg-[#FAFCE5] py-20 px-8 md:px-16 lg:px-24 flex flex-col justify-center"
        >
          <div className="max-w-xl space-y-6">
            {/* Quote Icon */}
            <span className="font-serif text-[80px] leading-none text-[#121115] block h-8 select-none">
              “
            </span>
            <blockquote className="text-xl md:text-3xl font-bold leading-relaxed text-[#121115]">
              I stopped using the app because I matched with someone who turned out to be completely fake. There was nothing to tell me they were real before I invested time in them.
            </blockquote>
          </div>
        </motion.div>
      </section>

      {/* 11. INSIGHTS THAT SHAPED OUR APPROACH (Pale Yellow/Cream Background, Split Column with Diagram) */}
      <section className="bg-[#FAFCE5] text-[#121115] py-24 px-6 md:px-12 border-t border-[#121115]/10" id="salams-insights">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 space-y-6"
          >
            <h3 className="text-3xl md:text-4xl lg:text-[40px] font-bold tracking-tight text-[#FF4D8D] leading-tight">
              Insights that shaped our approach
            </h3>
            <div className="space-y-6 text-[#121115]/80 text-base md:text-lg leading-relaxed font-light">
              <p>
                With each of the key themes we discovered from our research, we conducted affinity mapping to highlight insights that could guide us towards solutions.
              </p>
              <p>
                From our insights, we derived solution criteria which acted as design principles: trust must be visible, onboarding must feel effortless, and monetization must always serve the user's goal of marriage, not the platform's goal of revenue extraction.
              </p>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-7 flex justify-center lg:justify-end"
          >
            <div className="relative group transition-transform duration-500 hover:scale-[1.01] w-full max-w-[680px]">
              <img
                src="https://lh3.googleusercontent.com/d/12WN7iALTZr3kx0UBgbV8SoanU0LsKrXg"
                alt="Insights affinity mapping diagram"
                className="w-full h-auto object-contain rounded-[24px] shadow-xl"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 12. BUILDING THE BRAND ETHOS (White background, 3 elegant columns with custom icons) */}
      <section className="bg-white text-[#121115] py-24 md:py-32 px-6 md:px-12 border-t border-[#121115]/10" id="salams-ethos">
        <div className="max-w-7xl mx-auto space-y-16 md:space-y-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-left"
          >
            <h2 className="text-3xl md:text-[40px] font-semibold tracking-tight text-[#121115] leading-tight">
              Building the brand ethos.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 lg:gap-24">
            
            {/* Column 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="space-y-8 flex flex-col items-start text-left"
            >
              <div className="w-[140px] h-[140px] rounded-full bg-[#FAF8F5] flex items-center justify-center">
                <img
                  src="https://lh3.googleusercontent.com/d/1uHz69kzl8_oBPOthzHy6pr9kf9hZE_Ih"
                  alt="Safety over speed"
                  className="w-[84px] h-[84px] object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl md:text-[26px] font-bold text-[#FF4D8D] tracking-tight leading-tight">
                  Safety over speed.
                </h3>
                <p className="text-base md:text-lg text-[#121115]/80 leading-relaxed font-light">
                  We verify every user with selfie and ID checks. Trust isn't a feature you toggle on. It's the foundation the whole product is built on.
                </p>
              </div>
            </motion.div>

            {/* Column 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="space-y-8 flex flex-col items-start text-left"
            >
              <div className="w-[140px] h-[140px] rounded-full bg-[#FAF8F5] flex items-center justify-center">
                <img
                  src="https://lh3.googleusercontent.com/d/1zoF93tbN3kyUm7z3qp1L-ChFxOshSYlw"
                  alt="Respect is the floor"
                  className="w-[84px] h-[84px] object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl md:text-[26px] font-bold text-[#FF4D8D] tracking-tight leading-tight">
                  Respect is the floor.
                </h3>
                <p className="text-base md:text-lg text-[#121115]/80 leading-relaxed font-light">
                  Ghosting isn't allowed here. Every user deserves a response. Our mechanics enforce dignity, not just good manners.
                </p>
              </div>
            </motion.div>

            {/* Column 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="space-y-8 flex flex-col items-start text-left"
            >
              <div className="w-[140px] h-[140px] rounded-full bg-[#FAF8F5] flex items-center justify-center">
                <img
                  src="https://lh3.googleusercontent.com/d/1FALRcwO22_I71jN4_nPhPBBQtvo5i1W7"
                  alt="Your goal is our goal"
                  className="w-[84px] h-[84px] object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl md:text-[26px] font-bold text-[#FF4D8D] tracking-tight leading-tight">
                  Your goal is our goal.
                </h3>
                <p className="text-base md:text-lg text-[#121115]/80 leading-relaxed font-light">
                  We're committed to helping you find a life partner. Every upsell, every feature, every flow is designed to serve that goal not extract from it.
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 13. DETAILED SOLUTION (Off-white / Beige) */}
      <section className="py-24 px-6 bg-[#FAF8F5] border-t border-[#121115]/5" id="salams-solutions">
        <div className="max-w-7xl mx-auto space-y-32">
          
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-[#FF4D8D] text-xs font-bold uppercase tracking-widest block">// DELIVERABLES</span>
            <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter">
              Detailed Solution
            </h2>
          </div>

          {/* Module 1: Redesigned Onboarding */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
          >
            <div className="lg:col-span-6 space-y-6">
              <span className="text-[#FF4D8D] text-xs font-mono font-bold uppercase tracking-wider block">// REDESIGNED ONBOARDING</span>
              <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight">Redesigned Onboarding</h3>
              <div className="space-y-4 text-sm md:text-base text-[#121115]/80 leading-relaxed">
                <p>
                  Shortened the number of steps significantly and removed fields that created friction before users had a reason to trust us. Progressive disclosure means users build their profile over time, not all at once on day one.
                </p>
                <p>
                  The UI redesign also sent a new signal: this isn't Tinder. Clean typography, warm tones, and a clear sense of progress made the experience feel serious and modern from the first screen.
                </p>
              </div>
            </div>
            {/* Screen Image with Elegant Phone Frame */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="relative max-w-[280px] w-full group transition-transform duration-500 hover:scale-[1.03]">
                <img
                  src="https://lh3.googleusercontent.com/d/1MJmpv238hy_tvO1PL_O5pZ9XLxlohzeU"
                  alt="Redesigned Onboarding High Fidelity Screen"
                  className="w-full h-auto object-contain rounded-[40px] border-[8px] border-[#121115] shadow-2xl"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </motion.div>

          {/* Module 2: ID Verification */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center lg:flex-row-reverse"
          >
            <div className="lg:col-span-6 lg:order-2 space-y-6">
              <span className="text-[#FF4D8D] text-xs font-mono font-bold uppercase tracking-wider block">// SECURITY FLOW</span>
              <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight">ID Verification & Trust System</h3>
              <div className="space-y-4 text-sm md:text-base text-[#121115]/80 leading-relaxed">
                <p>
                  Selfie verification tied directly to profile creation. The ID verification badge appears on every profile card not as a one-time gate, but as a constant, visible signal throughout the entire app experience.
                </p>
                <p>
                  The reporting and blocking flows were also completely redesigned to feel useful rather than futile, and to surface in context rather than buried in settings.
                </p>
              </div>
            </div>
            {/* Screen Image with Elegant Phone Frame */}
            <div className="lg:col-span-6 lg:order-1 flex justify-center">
              <div className="relative max-w-[280px] w-full group transition-transform duration-500 hover:scale-[1.03]">
                <img
                  src="https://lh3.googleusercontent.com/d/1xryN5_Fxx1Ur8MUc3rA5kFjkw5nIm0Ci"
                  alt="ID Verification High Fidelity Screen"
                  className="w-full h-auto object-contain rounded-[40px] border-[8px] border-[#121115] shadow-2xl"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </motion.div>

          {/* Module 3: Anti-Ghosting */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
          >
            <div className="lg:col-span-6 space-y-6">
              <span className="text-[#FF4D8D] text-xs font-mono font-bold uppercase tracking-wider block">// ENGAGEMENT STRATEGY</span>
              <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight">Anti-Ghosting Mechanic</h3>
              <div className="space-y-4 text-sm md:text-base text-[#121115]/80 leading-relaxed">
                <p>
                  If you hadn't replied to a match and tried to move on in the app, a screen appeared forcing a decision: reply or unmatch. No silent disappearing allowed.
                </p>
                <p>
                  In a community where ghosting carries real cultural weight, this wasn't just a retention play. It was a statement about the kind of community Salams wanted to be.
                </p>
              </div>
            </div>
            {/* Screen Image with Elegant Phone Frame */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="relative max-w-[280px] w-full group transition-transform duration-500 hover:scale-[1.03]">
                <img
                  src="https://lh3.googleusercontent.com/d/1cxUHrsOABciHZc3puayZuTEcwfS53F5P"
                  alt="Anti-Ghosting High Fidelity Screen"
                  className="w-full h-auto object-contain rounded-[40px] border-[8px] border-[#121115] shadow-2xl"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </motion.div>

          {/* Module 4: Monetization */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center lg:flex-row-reverse"
          >
            <div className="lg:col-span-6 lg:order-2 space-y-6">
              <span className="text-[#FF4D8D] text-xs font-mono font-bold uppercase tracking-wider block">// REVENUE SHIELD</span>
              <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight">Monetization That Doesn't Manipulate</h3>
              <div className="space-y-4 text-sm md:text-base text-[#121115]/80 leading-relaxed">
                <p>
                  Designed the full monetization stack: Telegrams (paid ice breaker messages), Gold and Diamond subscription tiers, Boosts for visibility, and upsell prompts placed at high-intent moments like right after a match.
                </p>
                <p>
                  Every prompt was framed as a tool to increase your chances, not a gate to basic respect. This was the hardest design challenge of the 5 years and the one that taught me the most about ethical design.
                </p>
              </div>
            </div>
            {/* Screen Image with Elegant Phone Frame */}
            <div className="lg:col-span-6 lg:order-1 flex justify-center">
              <div className="relative max-w-[280px] w-full group transition-transform duration-500 hover:scale-[1.03]">
                <img
                  src="https://lh3.googleusercontent.com/d/1qglqoh8VzYQG2DeFWDttZ6hXTUmADSVx"
                  alt="Monetization High Fidelity Screen"
                  className="w-full h-auto object-contain rounded-[40px] border-[8px] border-[#121115] shadow-2xl"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 14. DESIGN SYSTEM (Vibrant Pink, Black Text, Huge Canvas) */}
      <section className="bg-[#FF4D8D] text-[#121115] py-24 px-6 md:px-12 border-t border-[#121115]/10" id="salams-design-system">
        <div className="max-w-5xl mx-auto space-y-16">
          <div className="space-y-6">
            <span className="text-[#121115]/60 text-xs font-bold uppercase tracking-widest block">// DESIGN INFRASTRUCTURE</span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
              Building a Design System
            </h2>
            <p className="text-white text-base md:text-xl font-medium max-w-3xl leading-relaxed">
              Building a design system made the non-linear, iterative process much smoother. Creating color and typography tokens, and reusable components allowed me to make consistent updates across the product.
            </p>
          </div>

          {/* High-Fidelity Design System Stack */}
          <div className="space-y-8 md:space-y-12">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full rounded-[24px] md:rounded-[40px] overflow-hidden shadow-xl border border-[#121115]/10"
            >
              <img 
                src="https://lh3.googleusercontent.com/d/1BQIRGFtxPtDeJcUMAID_82AShr8ak-Ee" 
                alt="Salams Design System - Icons & Foundational Tokens" 
                className="w-full h-auto object-contain select-none bg-white"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="w-full rounded-[24px] md:rounded-[40px] overflow-hidden shadow-xl border border-[#121115]/10"
            >
              <img 
                src="https://lh3.googleusercontent.com/d/1Bw-9N4UuabTtoMx2dU1POwAZabLkNarF" 
                alt="Salams Design System - Interactive Components & Buttons" 
                className="w-full h-auto object-contain select-none bg-white"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full rounded-[24px] md:rounded-[40px] overflow-hidden shadow-xl border border-[#121115]/10"
            >
              <img 
                src="https://lh3.googleusercontent.com/d/1S_xZz_kqrva6BLZGJrnVk5eiYZeWIrTj" 
                alt="Salams Design System - State Tags & Layout Views" 
                className="w-full h-auto object-contain select-none bg-white"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 15. BRAND SIGNATURE FOOTER (Grey & White gradient, Matches UMER logo from PDF) */}
      <section className="bg-white py-24 px-6 border-t border-[#121115]/5 relative overflow-hidden" id="salams-footer">
        <div className="max-w-7xl mx-auto space-y-16">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-8">
            {/* Contact Card */}
            <div className="space-y-4">
              <h4 className="text-xs uppercase font-black tracking-widest text-[#121115]/40">// Contact</h4>
              <ul className="space-y-2.5 text-sm">
                <li className="flex items-center gap-2.5 text-[#121115]/80">
                  <MapPin size={16} className="text-[#FF4D8D]" />
                  <span>Dubai, UAE</span>
                </li>
                <li className="flex items-center gap-2.5 text-[#121115]/80">
                  <Mail size={16} className="text-[#FF4D8D]" />
                  <a href="mailto:umerkhalid141@gmail.com" className="hover:underline">umerkhalid141@gmail.com</a>
                </li>
                <li className="flex items-center gap-2.5 text-[#121115]/80">
                  <Phone size={16} className="text-[#FF4D8D]" />
                  <span>+971 52 134 5139</span>
                </li>
              </ul>
            </div>

            {/* Page Sitemap */}
            <div className="space-y-4">
              <h4 className="text-xs uppercase font-black tracking-widest text-[#121115]/40">// Case study context</h4>
              <ul className="space-y-2.5 text-sm text-[#121115]/80">
                <li>Acquisition: Match Group 2023</li>
                <li>Design Tenure: 5 Years</li>
                <li>Redesign Reach: Worldwide Diaspora</li>
              </ul>
            </div>

            {/* Quick Action */}
            <div className="space-y-4 flex flex-col justify-between">
              <div>
                <h4 className="text-xs uppercase font-black tracking-widest text-[#121115]/40">// Actions</h4>
                <p className="text-xs text-[#121115]/60 mt-1">Acquisition strategy, design system tokens, and full UX flow implementation.</p>
              </div>
              <button 
                onClick={onClose}
                className="w-full bg-[#121115] hover:bg-[#FF4D8D] text-white hover:text-white py-3.5 rounded-full text-xs font-black uppercase tracking-widest transition-colors duration-300 flex items-center justify-center gap-2 cursor-pointer mt-4"
              >
                <ArrowLeft size={14} /> Back to Portfolio
              </button>
            </div>
          </div>

          {/* Huge Brand Typography footer: "// UMER" (Matches PDF bottom perfectly) */}
          <div className="pt-12 text-center relative overflow-hidden">
            <motion.h2 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-[14vw] font-black tracking-tighter text-[#121115]/45 uppercase select-none leading-none leading-[0.85]"
            >
              // UMER
            </motion.h2>
            <p className="text-xs text-[#121115]/40 uppercase tracking-[0.3em] mt-4">
              © 2026 UMER. ALL RIGHTS RESERVED.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}
