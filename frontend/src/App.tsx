import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import Header from './components/Header';
import Hero from './components/Hero';
import APIModules from './components/APIModules';
import Footer from './components/Footer';
import APIsPage from './pages/APIsPage';
import APIDetailPage from './pages/APIDetailPage';
import IntelligencePage from './pages/IntelligencePage';
import DocsPage from './pages/DocsPage';
import YourLifePage from './pages/YourLifePage';

const LandingLayout: React.FC = () => {
  return (
    <>
      <Hero />
      <APIModules />
    </>
  );
};

const App: React.FC = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
    });
    const raf = (time: number) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);

    gsap.fromTo('.reveal', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out', delay: 0.1 });

    return () => lenis.destroy();
  }, []);

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-[#f5f4f0]">
        <Header />
        <main className="flex-1 flex flex-col">
          <Routes>
            <Route path="/" element={<LandingLayout />} />
            <Route path="/apis" element={<APIsPage />} />
            <Route path="/apis/:slug" element={<APIDetailPage />} />
            <Route path="/intelligence" element={<IntelligencePage />} />
            <Route path="/docs" element={<DocsPage />} />
            <Route path="/your-life" element={<YourLifePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;