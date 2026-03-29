import React, { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import Header from './components/Header';
import Hero from './components/Hero';
import APIModules from './components/APIModules';
import Footer from './components/Footer';

const App: React.FC = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    gsap.fromTo(
      '.reveal',
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out', delay: 0.15 }
    );

    return () => lenis.destroy();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#f5f4f0]">
      <Header />
      <main className="flex-1">
        <Hero />
        <APIModules />
      </main>
      <Footer />
    </div>
  );
};

export default App;