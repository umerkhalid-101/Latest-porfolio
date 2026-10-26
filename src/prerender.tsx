/**
 * Build-time render of each page into its HTML file (see scripts/prerender.mjs),
 * so search engines and AI crawlers that don't run JavaScript still read the full page.
 * The browser app replaces this markup on load.
 */
import { renderToString } from 'react-dom/server';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { About } from './components/About';
import { FeaturedWork } from './components/FeaturedWork';
import { HowILead } from './components/HowILead';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { KindWords } from './components/KindWords';
import { Footer } from './components/Footer';
import { CaseStudyTemplate } from './components/CaseStudyTemplate';
import { salams, zewards, mblm, juno, unita, snapflow, docsalot } from './caseStudyData';
import { MARQUEE_ITEMS } from './data/marquee';

export type Route = 'home' | 'salams' | 'zewards' | 'unita' | 'mblm' | 'juno' | 'snapflow' | 'docsalot';

const noop = () => {};

function page(route: Route) {
  switch (route) {
    case 'salams': return <CaseStudyTemplate data={salams} onClose={noop} />;
    case 'zewards': return <CaseStudyTemplate data={zewards} onClose={noop} />;
    case 'unita': return <CaseStudyTemplate data={unita} onClose={noop} />;
    case 'mblm': return <CaseStudyTemplate data={mblm} onClose={noop} />;
    case 'juno': return <CaseStudyTemplate data={juno} onClose={noop} />;
    case 'snapflow': return <CaseStudyTemplate data={snapflow} onClose={noop} />;
    case 'docsalot': return <CaseStudyTemplate data={docsalot} onClose={noop} />;
    default:
      return (
        <>
          <Header />
          <Hero />
          <Marquee items={MARQUEE_ITEMS} className="bg-ink text-white t-display-l py-5 md:py-8 relative z-40" />
          <About />
          <FeaturedWork onOpenCaseStudy={noop} />
          <HowILead />
          <Experience />
          <Skills />
          <KindWords />
          <Footer />
        </>
      );
  }
}

export function render(route: Route) {
  return renderToString(<main className="relative">{page(route)}</main>);
}
