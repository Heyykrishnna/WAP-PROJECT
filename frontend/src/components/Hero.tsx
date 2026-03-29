import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { fetchWeather, type WeatherData } from '../services/weatherService';
import { getUserLocation } from '../services/locationService';


const Hero: React.FC = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const btnsRef = useRef<HTMLDivElement>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoadingWeather, setIsLoadingWeather] = useState(true);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(headingRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power4.out' })
      .fromTo(subRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
      .fromTo(btnsRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4');

    const getLocalWeather = async () => {
      try {
        const coords = await getUserLocation();
        const weather = await fetchWeather(coords.lat, coords.lon);
        setWeatherData(weather);
      } catch (err) {
        console.error('Failed to fetch weather:', err);
      } finally {
        setIsLoadingWeather(false);
      }
    };
    getLocalWeather();
  }, []);

  return (
    <section className="pt-20 pb-16">
      <div className="max-w-6xl mx-auto px-8">
        <div className="flex items-start gap-14">

          <div className="shrink-0 w-[380px] flex flex-col">
            <span className="text-[11px] font-semibold tracking-[0.12em] uppercase text-stone-400 mb-6">Neural Intelligence v1.0</span>
            <h1
              ref={headingRef}
              style={{ fontFamily: "'Doto', monospace" }}
              className="text-[58px] font-bold leading-[1.05] text-stone-900 mb-6"
            >
              FEWER IFS.<br />MORE CLARITY.
            </h1>
            <p ref={subRef} className="text-[14px] leading-[1.8] text-stone-400 mb-9 max-w-[310px]">
              Life OS combines multiple AI data sources in real-time and delivers intelligent suggestions, predictions, and warnings to help you make better daily decisions.
            </p>
            <div ref={btnsRef} className="flex items-center gap-3">
              <Link
                to="/apis"
                className="flex items-center gap-2 text-[13px] font-semibold bg-stone-900 text-white px-6 py-3 rounded-full hover:bg-stone-700 transition-colors duration-200"
              >
                Request Access <span>→</span>
              </Link>
              <Link
                to="/intelligence"
                className="text-[13px] font-medium px-6 py-3 rounded-full bg-white/60 backdrop-blur-xl border border-stone-200 text-stone-700 hover:bg-white transition-colors duration-200"
              >
                How it works
              </Link>
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-4">
            <div className="flex gap-4">
              <div className="flex-1 bg-white border border-stone-200 rounded-2xl p-7">
                <p className="text-[10px] font-semibold tracking-widest uppercase text-stone-400 mb-5">Weather Context</p>
                <p style={{ fontFamily: "'Doto', monospace" }} className="text-[48px] font-bold text-stone-900 mb-1 leading-none">
                  {isLoadingWeather ? '--°C' : weatherData ? `${weatherData.temp}°C` : '24°C'}
                </p>
                <p className="text-[13px] text-stone-400 leading-relaxed mt-3">
                  {isLoadingWeather ? (
                    <>Loading local weather...<br />Peak focus window: 8–11 AM.</>
                  ) : weatherData ? (
                    <>
                      {weatherData.description.charAt(0).toUpperCase() + weatherData.description.slice(1)} in {weatherData.city}.<br />
                      {weatherData.temp < 20 ? 'Ideal for a sweater. ' : weatherData.temp > 33 ? 'Stay hydrated. ' : 'Ideal for a morning run. '}
                      Peak focus window: 8–11 AM.
                    </>
                  ) : (
                    <>Ideal for a morning run.<br />Peak focus window: 8–11 AM.</>
                  )}
                </p>
              </div>
              <div className="flex-1 bg-white border border-stone-200 rounded-2xl p-7">
                <p className="text-[10px] font-semibold tracking-widest uppercase text-stone-400 mb-5">Mood Analysis</p>
                <p style={{ fontFamily: "'Doto', monospace" }} className="text-[48px] font-bold text-stone-900 mb-1 leading-none">+82%</p>
                <p className="text-[13px] text-stone-400 leading-relaxed mt-3">Positive sentiment today.<br />Journal streak: 14 days.</p>
              </div>
            </div>

            <div className="bg-white border border-stone-200 rounded-2xl p-7">
              <div className="flex items-center justify-between mb-6">
                <p className="text-[10px] font-semibold tracking-widest uppercase text-stone-400">Today — Intelligent Summary</p>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-stone-700 animate-pulse" />
                  <span className="text-[11px] text-stone-400">Live</span>
                </div>
              </div>
              <div className="flex flex-col">
                {[
                  { label: 'Commute', note: 'Traffic is 12 min above average. Leave by 8:45.' },
                  { label: 'Nutrition', note: 'Hydration low. High-protein meal suggested after 1 PM.' },
                  { label: 'Schedule', note: '3 meetings. Best focus block: 2:30–5:00 PM.' },
                ].map((item, i, arr) => (
                  <div key={item.label} className={`flex items-start gap-4 py-4 ${i < arr.length - 1 ? 'border-b border-stone-100' : ''}`}>
                    <span className="shrink-0 w-[88px] text-[12px] font-semibold text-stone-900">{item.label}</span>
                    <span className="text-[13px] text-stone-400 leading-relaxed">{item.note}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
