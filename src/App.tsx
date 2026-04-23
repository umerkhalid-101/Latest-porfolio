/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
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

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative min-h-screen selection:bg-[#FF6B35] selection:text-white">
      <AnimatePresence mode="wait">
        {loading && <Loader key="loader" onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <main className="relative">
          <ScrollProgress />
          <Header />
          <Hero />
          <About />
          <Process />
          <FeaturedWork />
          <TestimonialsSection />
          <ExpertSolutions />
          <SkillsMosaic />
          <ClientFeedback />
          <CTA />
          <Footer />
        </main>
      )}
    </div>
  );
}
