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
import { Skills } from './components/Skills';
import { Marquee } from './components/Marquee';
import { startSmoothScroll, scrollToIdWhenReady } from './lib/smoothScroll';
import { KindWords } from './components/KindWords';
import { Footer } from './components/Footer';
import { ScrollProgress } from './components/ScrollProgress';
import { CaseStudyTemplate } from './components/CaseStudyTemplate';
import { salams, zewards, juno, unita, snapflow } from './caseStudyData';
import { CustomCursor } from './components/CustomCursor';
import { NotFound } from './components/NotFound';
import { MARQUEE_ITEMS } from './data/marquee';

const SITE = 'https://www.umerkhalid.co';

type Slug = 'unita' | 'salams' | 'zewards' | 'juno' | 'snapflow';

// Keep in sync with the static <head> in index.html and the per-route HTML files.
const pageMeta: Record<Slug | 'home', { title: string; description: string; image: string; path: string }> = {
  home: {
    title: 'Muhammad Umer | Lead Product & UI/UX Designer in Dubai',
    description: 'Muhammad Umer (Umer Khalid) is a Lead Product Designer and UI/UX designer in Dubai with 7 years designing web and mobile products for SaaS, fintech, and government.',
    image: `${SITE}/images/og.jpg`,
    path: '/'
  },
  unita: {
    title: 'Unita Case Study | Muhammad Umer, Lead Product Designer',
    description: 'Designing a pre-launch B2B verified business network as the sole designer: discovery, company profiles, onboarding, and a design system built from scratch.',
    image: `${SITE}/images/og-unita.jpg`,
    path: '/unita-casestudy'
  },
  salams: {
    title: 'Salams Case Study | Muhammad Umer, Lead Product Designer',
    description: 'How I designed Salams, a Muslim matchmaking app, as its only designer for five years, through to its acquisition by Match Group in 2023.',
    image: `${SITE}/images/og-salams.jpg`,
    path: '/salams-casestudy'
  },
  zewards: {
    title: 'Zewst Case Study | Muhammad Umer, Lead Product Designer',
    description: 'Leading design as Design Manager for Zewards, a loyalty platform in the Zewst restaurant ecosystem. 38% more repeat visits and 2.3x faster activation.',
    image: `${SITE}/images/og-zewards.jpg`,
    path: '/zewards-casestudy'
  },
  juno: {
    title: 'Juno Case Study | Muhammad Umer, Lead Product Designer',
    description: 'Turning an abstract AI product into a story buyers get in 30 seconds: the story, design system, and nine-page marketing site for Juno, an AI chief of staff.',
    image: `${SITE}/images/og-juno.jpg`,
    path: '/juno-casestudy'
  },
  snapflow: {
    title: 'Snapflow Case Study | Muhammad Umer, Lead Product Designer',
    description: 'A self-initiated redesign of the Snapflow homepage: an agentic design system, shown precise and in motion, designed and built in English and Spanish.',
    image: `${SITE}/images/og-snapflow.jpg`,
    path: '/snapflow-casestudy'
  }
};

function slugFromLocation(): Slug | null {
  const path = window.location.pathname.replace(/(\.html|\/)$/, '').replace('/zewst-casestudy', '/zewards-casestudy');
  const hash = window.location.hash.replace(/^#\/?/, '');
  const params = new URLSearchParams(window.location.search);
  const query = params.get('p') || params.get('case-study') || params.get('project');
  for (const slug of ['unita', 'salams', 'zewards', 'juno', 'snapflow'] as Slug[]) {
    if (path === `/${slug}-casestudy` || hash === `${slug}-casestudy` || query === slug || query === `${slug}-casestudy`) {
      return slug;
    }
  }
  return null;
}

const KNOWN_PATHS = new Set(['', '/index', '/unita-casestudy', '/salams-casestudy', '/zewards-casestudy', '/zewst-casestudy', '/juno-casestudy', '/snapflow-casestudy']);

// Vercel rewrites every unknown path to the app, so the app decides what's a 404
function isNotFound() {
  const path = window.location.pathname.replace(/\/+$/, '').replace(/\.html$/, '');
  return !KNOWN_PATHS.has(path) && slugFromLocation() === null;
}

// A hello for anyone who opens dev tools
let greeted = false;
function greetInConsole() {
  if (greeted) return;
  greeted = true;
  console.log(
    '%cHey, you opened the console 👋%c\nSince you are here: this site is React, Motion, Tailwind, and a lot of nudging pixels.\nPress / anywhere on the page to leave a cursor chat. Or just email me: umerkhalid141@gmail.com',
    'font: 600 16px Inter, sans-serif; color: #FF953F;',
    'font: 13px Inter, sans-serif; color: inherit; line-height: 1.6;'
  );
}

function setMeta(selector: string, attr: string, value: string) {
  document.querySelector(selector)?.setAttribute(attr, value);
}

export default function App() {
  const [activeCaseStudy, setActiveCaseStudy] = useState<Slug | null>(slugFromLocation);
  const [notFound, setNotFound] = useState(isNotFound);

  useEffect(() => startSmoothScroll(), []);
  useEffect(greetInConsole, []);

  // When the visitor switches tabs, the tab asks them to come back
  useEffect(() => {
    let saved = '';
    const onVisibility = () => {
      if (document.hidden) {
        saved = document.title;
        document.title = '👀 Come back, the website misses you';
      } else if (saved) {
        document.title = saved;
        saved = '';
      }
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  useEffect(() => {
    const handleLocationChange = () => {
      setActiveCaseStudy(slugFromLocation());
      setNotFound(isNotFound());
    };
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  // Keep document head metadata in sync with the active route
  useEffect(() => {
    // Keep a 404 out of search results
    document.querySelector('meta[name="robots"]')?.remove();
    if (notFound) {
      document.title = 'Frame not found | Muhammad Umer';
      const robots = document.createElement('meta');
      robots.name = 'robots';
      robots.content = 'noindex';
      document.head.appendChild(robots);
      return;
    }
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
  }, [activeCaseStudy, notFound]);

  const openCaseStudy = (slug: string) => {
    window.history.pushState(null, '', `/${slug}-casestudy`);
    setNotFound(false);
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
    activeCaseStudy === 'salams' ? <CaseStudyTemplate data={salams} onClose={closeCaseStudy} onOpen={openCaseStudy} /> :
    activeCaseStudy === 'zewards' ? <CaseStudyTemplate data={zewards} onClose={closeCaseStudy} onOpen={openCaseStudy} /> :
    activeCaseStudy === 'unita' ? <CaseStudyTemplate data={unita} onClose={closeCaseStudy} onOpen={openCaseStudy} /> :
    activeCaseStudy === 'juno' ? <CaseStudyTemplate data={juno} onClose={closeCaseStudy} onOpen={openCaseStudy} /> :
    activeCaseStudy === 'snapflow' ? <CaseStudyTemplate data={snapflow} onClose={closeCaseStudy} onOpen={openCaseStudy} /> :
    null;

  return (
    <div className="relative min-h-screen selection:bg-accent selection:text-white">
      <CustomCursor />
      <MotionConfig reducedMotion="user">
        <main className="relative">
          <ScrollProgress />

          <AnimatePresence mode="wait">
            {notFound ? (
              <motion.div key="not-found" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <NotFound />
              </motion.div>
            ) : caseStudy ? (
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
                  items={MARQUEE_ITEMS}
                  className="bg-ink text-white t-display-l py-5 md:py-8 relative z-40"
                />
                <About />
                <FeaturedWork onOpenCaseStudy={openCaseStudy} />
                <HowILead />
                <Experience />
                <Skills />
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
