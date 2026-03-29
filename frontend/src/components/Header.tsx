import React from 'react';
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

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-[#f5f4f0]/85 backdrop-blur-lg">
      <div className="max-w-6xl mx-auto px-8 h-16 flex items-center justify-between">

        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-stone-900 flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-[#f5f4f0]" />
          </div>
          <span style={{ fontFamily: "'Doto', monospace" }} className="text-[17px] font-bold tracking-tight text-stone-900">
            LIFE OS
          </span>
        </Link>

        <nav className="flex items-center gap-8">
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

        <Link
          to="/your-life"
          className="text-[13px] font-semibold bg-stone-900 text-white px-5 py-2.5 rounded-full hover:bg-stone-700 transition-colors duration-200"
        >
          Check My Life
        </Link>
      </div>
    </header>
  );
};

export default Header;
