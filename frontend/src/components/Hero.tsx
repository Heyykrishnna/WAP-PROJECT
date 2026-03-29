import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const apiList = ['Weather', 'Geolocation', 'News', 'NLP', 'Calendar', 'Fitness', 'Food', 'Transport'];

const Hero: React.FC = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 1.1, ease: 'power4.out' }
    );
  }, []);

  return (
    <section className="pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-8">

        <div className="flex items-start gap-16">

          <div className="shrink-0 w-[380px] flex flex-col">
            <h1
              ref={headingRef}
              className="text-[62px] font-bold leading-[1.05] tracking-[-0.04em] text-stone-900 mb-7"
            >
              Fewer ifs.<br />More clarity.
            </h1>
            <p className="text-[15px] leading-[1.75] text-stone-400 mb-10 max-w-[320px]">
              Life OS combines multiple AI data sources in real-time and delivers intelligent suggestions, predictions, and warnings to help you make better daily decisions.
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              <a
                href="#"
                className="flex items-center gap-2 text-[13px] font-medium bg-stone-900 text-white px-6 py-3 rounded-full hover:bg-stone-700 transition-colors duration-200"
              >
                Request Access <span>→</span>
              </a>
              <a
                href="#"
                className="text-[13px] font-medium px-6 py-3 rounded-full bg-white/60 backdrop-blur-xl border border-stone-200 text-stone-700 hover:bg-white transition-colors duration-200"
              >
                See how it works
              </a>
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-4">

            <div className="flex gap-4">
              <div className="flex-1 bg-white border border-stone-200 rounded-2xl p-7">
                <p className="text-[11px] font-medium tracking-[0.07em] uppercase text-stone-400 mb-5">
                  Weather Context
                </p>
                <p className="text-[44px] font-semibold tracking-[-0.04em] text-stone-900 mb-2 leading-none">
                  24°C
                </p>
                <p className="text-[13px] text-stone-400 leading-relaxed mt-3">
                  Ideal for a morning run.<br />Peak focus window: 8–11 AM.
                </p>
              </div>

              <div className="flex-1 bg-white border border-stone-200 rounded-2xl p-7">
                <p className="text-[11px] font-medium tracking-[0.07em] uppercase text-stone-400 mb-5">
                  Mood Analysis
                </p>
                <p className="text-[44px] font-semibold tracking-[-0.04em] text-stone-900 mb-2 leading-none">
                  +82%
                </p>
                <p className="text-[13px] text-stone-400 leading-relaxed mt-3">
                  Positive sentiment today.<br />Journal streak: 14 days.
                </p>
              </div>
            </div>

            <div className="bg-white border border-stone-200 rounded-2xl p-7">
              <div className="flex items-center justify-between mb-6">
                <p className="text-[11px] font-medium tracking-[0.07em] uppercase text-stone-400">
                  Today — Intelligent Summary
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-stone-900 animate-pulse" />
                  <span className="text-[11px] text-stone-400">Live</span>
                </div>
              </div>

              <div className="flex flex-col">
                {[
                  { label: 'Commute', note: 'Traffic is 12 min above average. Leave by 8:45.' },
                  { label: 'Nutrition', note: 'Hydration low. High-protein meal suggested after 1 PM.' },
                  { label: 'Schedule', note: '3 meetings. Best focus block: 2:30–5:00 PM.' },
                ].map((item, i, arr) => (
                  <div
                    key={item.label}
                    className={`flex items-start gap-4 py-4 ${i < arr.length - 1 ? 'border-b border-stone-100' : ''}`}
                  >
                    <span className="shrink-0 w-[88px] text-[13px] font-semibold text-stone-900">
                      {item.label}
                    </span>
                    <span className="text-[13px] text-stone-400 leading-relaxed">{item.note}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        <div className="mt-16 pt-7 border-t border-stone-200 flex items-center gap-10 flex-wrap">
          <span className="text-[11px] font-medium tracking-[0.07em] uppercase text-stone-400">
            APIs Connected
          </span>
          {apiList.map((api) => (
            <span key={api} className="text-[13px] font-medium text-stone-400">
              {api}
            </span>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Hero;
