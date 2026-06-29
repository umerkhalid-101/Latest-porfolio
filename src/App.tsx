/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
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
                <SalamsCaseStudy onClose={() => setActiveCaseStudy(null)} />
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
                <FeaturedWork onOpenCaseStudy={(slug) => setActiveCaseStudy(slug)} />
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
