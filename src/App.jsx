import { lazy, Suspense, useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import Footer from './components/layout/Footer';
import SeoManager from './components/shared/SeoManager';
import DevCursor from './components/shared/devcursor/DevCursor';
import NotFound from './pages/NotFound';

/* Below-the-fold sections are loaded on demand so the first paint only
   carries the code needed for the hero. */
const About = lazy(() => import('./components/sections/About'));
const Skills = lazy(() => import('./components/sections/Skills'));
const Experience = lazy(() => import('./components/sections/Experience'));
const Projects = lazy(() => import('./components/sections/Projects'));
const Repositories = lazy(() => import('./components/sections/Repositories'));
const Education = lazy(() => import('./components/sections/Education'));
const Certifications = lazy(() => import('./components/sections/Certifications'));
const Contact = lazy(() => import('./components/sections/Contact'));

/** A quiet placeholder so the layout does not jump while a section loads. */
function SectionFallback({ label }) {
  return (
    <div className="section-fallback" aria-busy="true" aria-live="polite">
      <span className="section-fallback-label">{label}</span>
    </div>
  );
}

export default function App() {
  const [notFound] = useState(
    () => window.location.pathname.replace(/\/+$/, '') !== '',
  );

  /* Scroll animations are skipped entirely when the user prefers reduced
     motion. AOS's `disable` option removes the data-aos attributes, so the
     content is simply visible rather than stuck at opacity 0. */
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const init = () => {
      AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 60,
        disable: reduceMotion.matches,
      });
    };

    init();
    reduceMotion.addEventListener('change', init);
    return () => reduceMotion.removeEventListener('change', init);
  }, []);

  if (notFound) {
    return (
      <>
        <SeoManager />
        <div className="grid-bg" />
        <main id="main-content" style={{ position: 'relative', zIndex: 1 }}>
          <NotFound />
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <SeoManager />
      <DevCursor />
      <div className="grid-bg" />
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      <Navbar />
      <main id="main-content" style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <Suspense fallback={<SectionFallback label="about" />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionFallback label="skills" />}>
          <Skills />
        </Suspense>
        <Suspense fallback={<SectionFallback label="experience" />}>
          <Experience />
        </Suspense>
        <Suspense fallback={<SectionFallback label="projects" />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<SectionFallback label="repositories" />}>
          <Repositories />
        </Suspense>
        <Suspense fallback={<SectionFallback label="education" />}>
          <Education />
        </Suspense>
        <Suspense fallback={<SectionFallback label="certifications" />}>
          <Certifications />
        </Suspense>
        <Suspense fallback={<SectionFallback label="contact" />}>
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
