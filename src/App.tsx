/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About, Experience } from './components/About';
import { HowILead } from './components/HowILead';
import { FeaturedWork } from './components/FeaturedWork';
import { TestimonialsSection } from './components/TestimonialsSection';
import { WhatIDo } from './components/WhatIDo';
import { SkillsMosaic } from './components/SkillsMosaic';
import { ClientFeedback } from './components/ClientFeedback';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';
import { Process } from './components/Process';
import { Loader } from './components/Loader';
import { ScrollProgress } from './components/ScrollProgress';
import { SalamsCaseStudy } from './components/SalamsCaseStudy';
import { CaseStudyPage } from './components/CaseStudyPage';
import { zewards, folionomics } from './caseStudies';

const SITE = 'https://www.umerkhalid.co';

type Slug = 'salams' | 'zewards' | 'folionomics';

// Keep in sync with the static <head> in index.html and the per-route HTML files.
const pageMeta: Record<Slug | 'home', { title: string; description: string; image: string; path: string }> = {
  home: {
    title: 'Umer Khalid | Lead Product Designer in Dubai',
    description: 'Lead Product Designer in Dubai with 7 years shipping SaaS, fintech, and consumer products, including leading small design teams. Past work includes Salams (acquired by Match Group) and the Zewst restaurant ecosystem.',
    image: `${SITE}/images/og.jpg`,
    path: '/'
  },
  salams: {
    title: 'Salams Case Study | Umer Khalid, Lead Product Designer',
    description: 'How I designed Salams, a Muslim matchmaking app, as its only designer for five years, through to its acquisition by Match Group in 2023.',
    image: `${SITE}/images/og-salams.jpg`,
    path: '/salams-casestudy'
  },
  zewards: {
    title: 'Zewards Case Study | Umer Khalid, Lead Product Designer',
    description: 'Leading design as Design Manager for Zewards, a loyalty platform in the Zewst restaurant ecosystem. 38% more repeat visits and 2.3x faster activation.',
    image: `${SITE}/images/og-zewards.jpg`,
    path: '/zewards-casestudy'
  },
  folionomics: {
    title: 'Folionomics Case Study | Umer Khalid, Lead Product Designer',
    description: 'Redesigning a crypto wallet viewer into a strategy-first portfolio product. User retention rose 25% after the unified wallet view shipped.',
    image: `${SITE}/images/og-folionomics.jpg`,
    path: '/folionomics-casestudy'
  }
};

function slugFromLocation(): Slug | null {
  const path = window.location.pathname.replace(/(\.html|\/)$/, '').replace('/zewst-casestudy', '/zewards-casestudy');
  const hash = window.location.hash.replace(/^#\/?/, '');
  const params = new URLSearchParams(window.location.search);
  const query = params.get('p') || params.get('case-study') || params.get('project');
  for (const slug of ['salams', 'zewards', 'folionomics'] as Slug[]) {
    if (path === `/${slug}-casestudy` || hash === `${slug}-casestudy` || query === slug || query === `${slug}-casestudy`) {
      return slug;
    }
  }
  return null;
}

function setMeta(selector: string, attr: string, value: string) {
  document.querySelector(selector)?.setAttribute(attr, value);
}

export default function App() {
  const [loading, setLoading] = useState(() => slugFromLocation() === null);
  const [activeCaseStudy, setActiveCaseStudy] = useState<Slug | null>(slugFromLocation);

  useEffect(() => {
    const handleLocationChange = () => setActiveCaseStudy(slugFromLocation());
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  // Keep document head metadata in sync with the active route
  useEffect(() => {
    const meta = pageMeta[activeCaseStudy ?? 'home'];
    document.title = meta.title;
    setMeta('meta[name="description"]', 'content', meta.description);
    setMeta('meta[property="og:title"]', 'content', meta.title);
    setMeta('meta[property="og:description"]', 'content', meta.description);
    setMeta('meta[property="og:image"]', 'content', meta.image);
    setMeta('meta[property="og:url"]', 'content', SITE + meta.path);
    setMeta('meta[name="twitter:title"]', 'content', meta.title);
    setMeta('meta[name="twitter:description"]', 'content', meta.description);
    setMeta('meta[name="twitter:image"]', 'content', meta.image);
    setMeta('link[rel="canonical"]', 'href', SITE + meta.path);
  }, [activeCaseStudy]);

  const openCaseStudy = (slug: string) => {
    window.history.pushState(null, '', `/${slug}-casestudy`);
    setActiveCaseStudy(slug as Slug);
  };

  const closeCaseStudy = () => {
    const from = activeCaseStudy;
    window.history.pushState(null, '', '/');
    setActiveCaseStudy(null);
    // Return to the work section the visitor came from
    if (from) requestAnimationFrame(() => setTimeout(() => document.getElementById('work')?.scrollIntoView(), 600));
  };

  const caseStudy =
    activeCaseStudy === 'salams' ? <SalamsCaseStudy onClose={closeCaseStudy} /> :
    activeCaseStudy === 'zewards' ? <CaseStudyPage data={zewards} onClose={closeCaseStudy} /> :
    activeCaseStudy === 'folionomics' ? <CaseStudyPage data={folionomics} onClose={closeCaseStudy} /> :
    null;

  return (
    <div className="relative min-h-screen selection:bg-[#FF6B35] selection:text-white">
      <AnimatePresence mode="wait">
        {loading && <Loader key="loader" onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <main className="relative">
          <ScrollProgress />

          <AnimatePresence mode="wait">
            {caseStudy ? (
              <motion.div
                key={`case-study-${activeCaseStudy}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                {caseStudy}
              </motion.div>
            ) : (
              <motion.div
                key="portfolio-main"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <Header />
                <Hero />
                <About />
                <HowILead />
                <FeaturedWork onOpenCaseStudy={openCaseStudy} />
                <Experience />
                <Process />
                <TestimonialsSection />
                <WhatIDo />
                <SkillsMosaic />
                <ClientFeedback />
                <CTA />
                <Footer />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      )}
    </div>
  );
}
