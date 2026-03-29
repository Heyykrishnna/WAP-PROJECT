import React, { useState, useEffect } from 'react';

const Footer: React.FC = () => {
  const [time, setTime] = useState(
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  );
  const [active, setActive] = useState('Core');

  useEffect(() => {
    const t = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <footer className="mt-auto border-t border-stone-200 py-10">
      <div className="max-w-6xl mx-auto px-8 flex items-center justify-between flex-wrap gap-6">

        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-md bg-stone-900 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-stone-100" />
          </div>
          <span className="text-[14px] font-semibold tracking-[-0.04em] text-stone-900">Life OS</span>
          <span className="text-[12px] text-stone-300 ml-2">v1.0 · Stable</span>
        </div>

        <nav className="flex items-center gap-6 flex-wrap">
          {['Core', 'Neural', 'Insights', 'System'].map((item) => (
            <button
              key={item}
              onClick={() => setActive(item)}
              className={`text-[13px] font-medium transition-colors duration-200 bg-transparent border-none cursor-pointer ${active === item ? 'text-stone-900' : 'text-stone-400 hover:text-stone-600'}`}
            >
              {item}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-stone-700 animate-pulse" />
            <span className="text-[11px] font-medium tracking-widest uppercase text-stone-400">Uplink Active</span>
          </div>
          <span className="text-[13px] font-medium text-stone-400 tabular-nums">{time}</span>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
