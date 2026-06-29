/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { FeaturedWork } from './components/FeaturedWork';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ExpertSolutions } from './components/ExpertSolutions';
import { SkillsMosaic } from './components/SkillsMosaic';
import { ClientFeedback } from './components/ClientFeedback';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';
import { Process } from './components/Process';
import { Loader } from './components/Loader';
import { ScrollProgress } from './components/ScrollProgress';
import { SalamsCaseStudy } from './components/SalamsCaseStudy';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activeCaseStudy, setActiveCaseStudy] = useState<string | null>(null);

  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      const params = new URLSearchParams(window.location.search);
      const queryParam = params.get('p') || params.get('case-study') || params.get('project');

      if (
        path === '/salams-casestudy' || 
        path === '/salams-casestudy/' ||
        hash === '#/salams-casestudy' || 
        hash === '#salams-casestudy' ||
        queryParam === 'salams' ||
        queryParam === 'salams-casestudy'
      ) {
        setActiveCaseStudy('salams');
      } else {
        setActiveCaseStudy(null);
      }
    };

    // Check immediately
    handleLocationChange();

    // Listen to history state changes
    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  // Dynamically update document head metadata for Google Search Console & SEO
  useEffect(() => {
    if (activeCaseStudy === 'salams') {
      document.title = "Salams Case Study — Muhammad Umer, Product Designer";
      
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', "How I redesigned Salams, a Muslim matchmaking app, across onboarding, trust, retention and monetization. Acquired by Match Group.");
      }
      
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute('content', "Salams Case Study — Muhammad Umer, Product Designer");
      }

      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) {
        ogDesc.setAttribute('content', "How I redesigned Salams, a Muslim matchmaking app, across onboarding, trust, retention and monetization. Acquired by Match Group.");
      }
    } else {
      document.title = "Umer Khalid | Product Designer";
      
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', "Product Designer who shipped across SaaS, fintech, and consumer apps for 7+ years. Comfortable owning the full design process from discovery and research through to high-fidelity delivery and engineering handoff.");
      }
      
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute('content', "Umer Khalid | Product Designer");
      }

      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) {
        ogDesc.setAttribute('content', "Product Designer who's shipped across SaaS, fintech, and consumer apps for 7+ years.");
      }
    }
  }, [activeCaseStudy]);

  const openCaseStudy = (slug: string) => {
    if (slug === 'salams') {
      window.history.pushState(null, '', '/salams-casestudy');
      setActiveCaseStudy('salams');
    }
  };

  const closeCaseStudy = () => {
    window.history.pushState(null, '', '/');
    setActiveCaseStudy(null);
  };

  return (
    <div className="relative min-h-screen selection:bg-[#FF6B35] selection:text-white">
      <AnimatePresence mode="wait">
        {loading && <Loader key="loader" onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <main className="relative">
          <ScrollProgress />
          
          <AnimatePresence mode="wait">
            {activeCaseStudy === 'salams' ? (
              <motion.div
                key="salams-case-study"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <SalamsCaseStudy onClose={closeCaseStudy} />
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
                <Process />
                <FeaturedWork onOpenCaseStudy={openCaseStudy} />
                <TestimonialsSection />
                <ExpertSolutions />
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
