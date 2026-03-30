import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const [time, setTime] = useState(
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  );

  useEffect(() => {
    const t = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <footer className="border-t border-stone-200 py-10 md:py-8">
      <div className="max-w-6xl mx-auto px-6 md:px-8 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-6 text-center md:text-left">

        <div className="flex flex-col items-center md:items-start gap-2">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-stone-900 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-stone-100" />
            </div>
            <span style={{ fontFamily: "'Doto', monospace" }} className="text-[14px] font-bold text-stone-900">LIFE OS</span>
          </Link>
          <span className="text-[10px] md:text-[11px] text-stone-300 uppercase tracking-widest font-semibold">v1.0 · Systems Stable</span>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {[
            { label: 'Overview', to: '/' },
            { label: 'APIs', to: '/apis' },
            { label: 'Intelligence', to: '/intelligence' },
            { label: 'Docs', to: '/docs' },
          ].map(({ label, to }) => (
            <Link key={to} to={to} className="text-[12px] md:text-[13px] text-stone-400 hover:text-stone-700 transition-colors duration-200 font-medium">
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-stone-100 shadow-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-stone-700 animate-pulse" />
            <span className="text-[10px] font-bold tracking-widest uppercase text-stone-400">Uplink Active</span>
          </div>
          <span className="text-[12px] md:text-[13px] font-semibold text-stone-600 tabular-nums">{time}</span>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
