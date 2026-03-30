import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { label: 'Overview', to: '/' },
  { label: 'Your Life', to: '/your-life' },
  { label: 'APIs', to: '/apis' },
  { label: 'Intelligence', to: '/intelligence' },
  { label: 'Docs', to: '/docs' },
];

const Header: React.FC = () => {
  const { pathname } = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  return (
    <header className={`sticky top-0 z-100 border-b border-stone-200 transition-colors duration-300 ${isMobileMenuOpen ? 'bg-[#f5f4f0]' : 'bg-[#f5f4f0]/95 backdrop-blur-md'}`}>
      <div className="max-w-6xl mx-auto px-6 md:px-8 h-16 flex items-center justify-between relative z-110">

        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-stone-900 flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-[#f5f4f0]" />
          </div>
          <span style={{ fontFamily: "'Doto', monospace" }} className="text-[17px] font-bold tracking-tight text-stone-900">
            LIFE OS
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className={`text-[13px] font-medium transition-colors duration-200 ${pathname === to ? 'text-stone-900' : 'text-stone-400 hover:text-stone-700'}`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            to="/your-life"
            className="hidden sm:block text-[13px] font-semibold bg-stone-900 text-white px-5 py-2.5 rounded-full hover:bg-stone-700 transition-colors duration-200"
          >
            Check My Life
          </Link>

          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex flex-col items-end gap-1.5 p-1 md:hidden relative z-120"
            aria-label="Toggle Menu"
          >
            <div className={`h-[2px] bg-stone-900 transition-all duration-300 ${isMobileMenuOpen ? 'w-6 translate-y-[8px] -rotate-45' : 'w-6'}`} />
            <div className={`h-[2px] bg-stone-900 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'w-4'}`} />
            <div className={`h-[2px] bg-stone-900 transition-all duration-300 ${isMobileMenuOpen ? 'w-6 -translate-y-[8px] rotate-45' : 'w-5'}`} />
          </button>
        </div>
      </div>

      <div 
        className={`fixed inset-0 z-100 bg-[#f5f4f0] transition-all duration-500 ease-[cubic-bezier(0.85,0,0.15,1)] md:hidden ${isMobileMenuOpen ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-full opacity-0 pointer-events-none'}`}
      >
        <div className="flex flex-col h-full pt-28 px-8 pb-12 overflow-y-auto">
          <nav className="flex flex-col gap-6">
            {navLinks.map(({ label, to }, i) => (
              <Link
                key={to}
                to={to}
                className={`text-[32px] sm:text-[40px] font-bold tracking-tight transition-all duration-500 ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} ${pathname === to ? 'text-stone-900' : 'text-stone-300 hover:text-stone-500'}`}
                style={{ fontFamily: "'Doto', monospace", transitionDelay: `${(i + 1) * 70}ms` }}
              >
                {label.toUpperCase()}
              </Link>
            ))}
          </nav>
          
          <div className="mt-auto pt-10 flex flex-col gap-8">
            <Link
              to="/get-started"
              className={`text-[14px] font-bold bg-stone-900 text-white px-8 py-5 rounded-2xl text-center shadow-lg transition-all duration-500 delay-300 ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
            >
              GET FULL ACCESS →
            </Link>
            <div className={`flex justify-between items-center transition-all duration-500 delay-400 ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              <span className="text-[10px] font-bold tracking-widest uppercase text-stone-400 font-mono">LIFE OS V1.0</span>
              <div className="flex gap-5">
                <span className="text-[12px] font-medium text-stone-500 hover:text-stone-900 cursor-pointer">TWITTER</span>
                <span className="text-[12px] font-medium text-stone-500 hover:text-stone-900 cursor-pointer">GITHUB</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
