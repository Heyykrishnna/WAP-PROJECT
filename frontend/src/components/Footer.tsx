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
    <footer className="border-t border-stone-200 py-8">
      <div className="max-w-6xl mx-auto px-8 flex items-center justify-between flex-wrap gap-6">

        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-md bg-stone-900 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-stone-100" />
          </div>
          <span style={{ fontFamily: "'Doto', monospace" }} className="text-[14px] font-bold text-stone-900">LIFE OS</span>
          <span className="text-[11px] text-stone-300 ml-1">v1.0 · Stable</span>
        </Link>

        <nav className="flex items-center gap-8">
          {[
            { label: 'Overview', to: '/' },
            { label: 'APIs', to: '/apis' },
            { label: 'Intelligence', to: '/intelligence' },
            { label: 'Docs', to: '/docs' },
          ].map(({ label, to }) => (
            <Link key={to} to={to} className="text-[13px] text-stone-400 hover:text-stone-700 transition-colors duration-200">
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-stone-700 animate-pulse" />
            <span className="text-[10px] font-semibold tracking-widest uppercase text-stone-400">Uplink Active</span>
          </div>
          <span className="text-[13px] font-medium text-stone-400 tabular-nums">{time}</span>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
