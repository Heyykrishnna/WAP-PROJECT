import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-[#f5f4f0]/80 backdrop-blur-lg">
      <div className="max-w-6xl mx-auto px-8 h-16 flex items-center justify-between">

        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-stone-900 flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-[#f5f4f0]" />
          </div>
          <span className="text-[17px] font-semibold tracking-[-0.04em] text-stone-900">
            Life OS
          </span>
        </div>

        <nav className="flex items-center gap-8">
          {['Overview', 'APIs', 'Intelligence', 'Docs'].map((item) => (
            <a
              key={item}
              href="#"
              className="text-sm text-stone-400 hover:text-stone-900 transition-colors duration-200 no-underline"
            >
              {item}
            </a>
          ))}
        </nav>

        <a
          href="#"
          className="text-[13px] font-medium bg-stone-900 text-white px-5 py-2.5 rounded-full hover:bg-stone-700 transition-all duration-200 no-underline"
        >
          Get Started
        </a>
      </div>
    </header>
  );
};

export default Header;
