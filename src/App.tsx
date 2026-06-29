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
      document.title = "Salams Case Study — Designed by Umer";
      
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', "I designed and scaled Salams, a Muslim matchmaking app, as the sole product designer for 5 years—directly leading to its acquisition by Match Group.");
      }
      
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute('content', "Salams Case Study — Designed by Umer");
      }

      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) {
        ogDesc.setAttribute('content', "As the sole product designer for 5 years, I designed and scaled Salams from the ground up, leading to its acquisition by Match Group in 2023. Read the complete end-to-end design case study.");
      }

      const ogImage = document.querySelector('meta[property="og:image"]');
      if (ogImage) {
        ogImage.setAttribute('content', "https://drive.google.com/thumbnail?id=1rEHrOHd-yhkUhr2qt3Lmwy0a3MS9NV5m&sz=w1200");
      }

      const twitterImage = document.querySelector('meta[property="twitter:image"]');
      if (twitterImage) {
        twitterImage.setAttribute('content', "https://drive.google.com/thumbnail?id=1rEHrOHd-yhkUhr2qt3Lmwy0a3MS9NV5m&sz=w1200");
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
        ogDesc.setAttribute('content', "Product Designer who shipped across SaaS, fintech, and consumer apps for 7+ years.");
      }

      const ogImage = document.querySelector('meta[property="og:image"]');
      if (ogImage) {
        ogImage.setAttribute('content', "https://drive.google.com/thumbnail?id=1FD0Z0ZZBRTWTjdeqpWr2X1UXgNhXUCjb&sz=w1200");
      }

      const twitterImage = document.querySelector('meta[property="twitter:image"]');
      if (twitterImage) {
        twitterImage.setAttribute('content', "https://drive.google.com/thumbnail?id=1FD0Z0ZZBRTWTjdeqpWr2X1UXgNhXUCjb&sz=w1200");
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
