import React from 'react';
import { Link } from 'react-router-dom';

const apis = [
  { slug: 'weather', name: 'Weather Engine', category: 'Environment', desc: 'Provides real-time weather data and suggests optimal activities and routines based on atmospheric conditions.', status: 'Active' },
  { slug: 'geolocation', name: 'Spatial Awareness', category: 'Location', desc: 'Detects user location to personalise all recommendations contextually and accurately.', status: 'Active' },
  { slug: 'news', name: 'News Intelligence', category: 'Media', desc: 'Fetches relevant news and filters it based on user context, location, and life patterns.', status: 'Active' },
  { slug: 'nlp', name: 'NLP / Text Analysis', category: 'AI / Language', desc: 'Analyses user input — notes and journal entries — to detect mood, stress, and behavioural patterns.', status: 'Active' },
  { slug: 'calendar', name: 'Temporal Logic', category: 'Scheduling', desc: 'Accesses user schedule and helps optimise daily planning around focus, recovery, and commitments.', status: 'Beta' },
  { slug: 'food', name: 'Food Intelligence', category: 'Nutrition', desc: 'Suggests meals based on weather, detected mood, and user health patterns for optimal energy.', status: 'Beta' },
  { slug: 'fitness', name: 'Bio-Sync Health', category: 'Fitness', desc: 'Recommends workouts based on activity level, sleep quality, and daily energy patterns.', status: 'Beta' },
  { slug: 'transport', name: 'Transport Engine', category: 'Mobility', desc: 'Provides traffic insights and suggests the best travel timing to minimise commute friction.', status: 'Active' },
];

const APIsPage: React.FC = () => {
  return (
    <div className="flex-1">
      <section className="pt-16 pb-10 border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-8">
          <span className="text-[10px] font-semibold tracking-[0.12em] uppercase text-stone-400">All APIs</span>
          <h1 style={{ fontFamily: "'Doto', monospace" }} className="text-[52px] font-bold text-stone-900 mt-3 mb-4">
            INTELLIGENCE<br />MODULES
          </h1>
          <p className="text-[14px] text-stone-400 max-w-lg leading-relaxed">
            Life OS integrates eight data domains into a single intelligence layer. Click any module to explore its data model, endpoints, and live output.
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-6xl mx-auto px-8">
          <div className="flex flex-col gap-3">
            {apis.map((api, i) => (
              <Link
                key={api.slug}
                to={`/apis/${api.slug}`}
                className="flex items-center justify-between bg-white border border-stone-200 rounded-2xl px-8 py-6 hover:border-stone-400 hover:shadow-sm transition-all duration-200 group"
              >
                <div className="flex items-center gap-8">
                  <span className="text-[11px] font-mono text-stone-300 w-6">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] font-semibold tracking-widest uppercase text-stone-400 w-32">{api.category}</span>
                  <h3 className="text-[15px] font-semibold text-stone-900">{api.name}</h3>
                </div>
                <div className="flex items-center gap-6">
                  <p className="text-[13px] text-stone-400 max-w-[300px] text-right hidden lg:block">{api.desc}</p>
                  <span className={`text-[10px] font-semibold tracking-[0.08em] uppercase px-3 py-1 rounded-full border ${api.status === 'Active' ? 'border-stone-200 text-stone-500 bg-stone-50' : 'border-amber-200 text-amber-600 bg-amber-50'}`}>
                    {api.status}
                  </span>
                  <span className="text-stone-300 group-hover:text-stone-700 transition-colors">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default APIsPage;
