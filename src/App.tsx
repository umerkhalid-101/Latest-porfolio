/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { HowILead } from './components/HowILead';
import { FeaturedWork } from './components/FeaturedWork';
import { Experience } from './components/Experience';
import { Marquee } from './components/Marquee';
import { startSmoothScroll, scrollToIdWhenReady } from './lib/smoothScroll';
import { KindWords } from './components/KindWords';
import { Footer } from './components/Footer';
import { ScrollProgress } from './components/ScrollProgress';
import { SalamsCaseStudy } from './components/SalamsCaseStudy';
import { CaseStudyPage } from './components/CaseStudyPage';
import { zewards, unita, vara } from './caseStudies';

const SITE = 'https://www.umerkhalid.co';

type Slug = 'unita' | 'vara' | 'salams' | 'zewards';

// Keep in sync with the static <head> in index.html and the per-route HTML files.
const pageMeta: Record<Slug | 'home', { title: string; description: string; image: string; path: string }> = {
  home: {
    title: 'Muhammad Umer | Lead Product Designer in Dubai',
    description: 'Lead Product Designer in Dubai with 7 years shipping SaaS, fintech, and consumer products, including leading small design teams. Past work includes Salams (acquired by Match Group) and the Zewst restaurant ecosystem.',
    image: `${SITE}/images/og.jpg`,
    path: '/'
  },
  unita: {
    title: 'Unita Case Study | Muhammad Umer, Lead Product Designer',
    description: 'Designing a pre-launch B2B verified business network as the sole designer: discovery, company profiles, onboarding, and a design system built from scratch.',
    image: `${SITE}/images/og-unita.jpg`,
    path: '/unita-casestudy'
  },
  vara: {
    title: 'VARA Case Study | Muhammad Umer, Lead Product Designer',
    description: "Designing the web portal for Dubai's Virtual Assets Regulatory Authority at MBLM: homepage, a five-step licensing guide, a reusable UI kit, and a 12-column layout system.",
    image: `${SITE}/images/og-vara.jpg`,
    path: '/vara-casestudy'
  },
  salams: {
    title: 'Salams Case Study | Muhammad Umer, Lead Product Designer',
    description: 'How I designed Salams, a Muslim matchmaking app, as its only designer for five years, through to its acquisition by Match Group in 2023.',
    image: `${SITE}/images/og-salams.jpg`,
    path: '/salams-casestudy'
  },
  zewards: {
    title: 'Zewards Case Study | Muhammad Umer, Lead Product Designer',
    description: 'Leading design as Design Manager for Zewards, a loyalty platform in the Zewst restaurant ecosystem. 38% more repeat visits and 2.3x faster activation.',
    image: `${SITE}/images/og-zewards.jpg`,
    path: '/zewards-casestudy'
  }
};

function slugFromLocation(): Slug | null {
  const path = window.location.pathname.replace(/(\.html|\/)$/, '').replace('/zewst-casestudy', '/zewards-casestudy');
  const hash = window.location.hash.replace(/^#\/?/, '');
  const params = new URLSearchParams(window.location.search);
  const query = params.get('p') || params.get('case-study') || params.get('project');
  for (const slug of ['unita', 'vara', 'salams', 'zewards'] as Slug[]) {
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
  const [activeCaseStudy, setActiveCaseStudy] = useState<Slug | null>(slugFromLocation);

  useEffect(() => startSmoothScroll(), []);

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
    if (from) scrollToIdWhenReady('work');
  };

  const caseStudy =
    activeCaseStudy === 'salams' ? <SalamsCaseStudy onClose={closeCaseStudy} /> :
    activeCaseStudy === 'zewards' ? <CaseStudyPage data={zewards} onClose={closeCaseStudy} /> :
    activeCaseStudy === 'unita' ? <CaseStudyPage data={unita} onClose={closeCaseStudy} /> :
    activeCaseStudy === 'vara' ? <CaseStudyPage data={vara} onClose={closeCaseStudy} /> :
    null;

  return (
    <div className="relative min-h-screen selection:bg-accent selection:text-white">
      <MotionConfig reducedMotion="user">
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
                <Marquee
                  items={['Lead Product Designer', 'Based in Dubai', 'Design leadership', 'Design systems', 'SaaS', 'Fintech', 'Government portals', 'Acquired by Match Group']}
                  className="bg-ink text-white t-display-l py-5 md:py-8 relative z-40"
                />
                <About />
                <FeaturedWork onOpenCaseStudy={openCaseStudy} />
                <HowILead />
                <Experience />
                <KindWords />
                <Footer />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </MotionConfig>
    </div>
  );
}
