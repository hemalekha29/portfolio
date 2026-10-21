import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import Footer from './components/layout/Footer';
import SeoManager from './components/shared/SeoManager';
import NotFound from './pages/NotFound';

/* Below-the-fold sections are loaded on demand so the first paint only
   carries the code needed for the hero. */
const About = lazy(() => import('./components/sections/About'));
const Skills = lazy(() => import('./components/sections/Skills'));
const Experience = lazy(() => import('./components/sections/Experience'));
const Projects = lazy(() => import('./components/sections/Projects'));
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
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const [cursorEnabled, setCursorEnabled] = useState(true);
  const [notFound] = useState(
    () => window.location.pathname.replace(/\/+$/, '') !== '',
  );

  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-out-cubic', once: true, offset: 60 });
  }, []);

  /* The custom cursor is pointer-only: skip it on touch devices and when the
     user has asked for reduced motion, so it never obscures or lags content. */
  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const sync = () => setCursorEnabled(finePointer.matches && !reduceMotion.matches);
    sync();

    finePointer.addEventListener('change', sync);
    reduceMotion.addEventListener('change', sync);
    return () => {
      finePointer.removeEventListener('change', sync);
      reduceMotion.removeEventListener('change', sync);
    };
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;

    let ringX = 0, ringY = 0;
    let raf;

    const move = (e) => {
      const { clientX: x, clientY: y } = e;
      cursor.style.left = x + 'px';
      cursor.style.top = y + 'px';
    };

    const animate = () => {
      // ring lags behind cursor for smooth follow
      const target = { x: parseFloat(cursor.style.left) || 0, y: parseFloat(cursor.style.top) || 0 };
      ringX += (target.x - ringX) * 0.12;
      ringY += (target.y - ringY) * 0.12;
      ring.style.left = ringX + 'px';
      ring.style.top = ringY + 'px';
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    const over = () => { cursor.classList.add('expand'); ring.classList.add('expand'); };
    const out = () => { cursor.classList.remove('expand'); ring.classList.remove('expand'); };

    document.addEventListener('mousemove', move);
    document.querySelectorAll('a, button, .glass-card').forEach(el => {
      el.addEventListener('mouseenter', over);
      el.addEventListener('mouseleave', out);
    });

    return () => {
      document.removeEventListener('mousemove', move);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (notFound) {
    return (
      <>
        <SeoManager />
        <div className="grid-bg" />
        <NotFound />
        <Footer />
      </>
    );
  }

  return (
    <>
      <SeoManager />
      {cursorEnabled && (
        <>
          <div className="cursor" ref={cursorRef} />
          <div className="cursor-ring" ref={ringRef} />
        </>
      )}
      <div className="grid-bg" />
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      <Navbar />
      <main style={{ position: 'relative', zIndex: 1 }}>
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
