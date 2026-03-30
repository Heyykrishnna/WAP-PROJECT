import React from 'react';
import { Link } from 'react-router-dom';

const modules = [
  { slug: 'weather', name: 'Weather Engine', desc: 'Suggests optimal routines based on real-time atmospheric data.', status: 'Active' },
  { slug: 'geolocation', name: 'Spatial Awareness', desc: 'Location-aware insights that personalise every recommendation.', status: 'Active' },
  { slug: 'news', name: 'News Intelligence', desc: 'Filters global narratives down to what is actually relevant to you.', status: 'Active' },
  { slug: 'nlp', name: 'NLP / Text Analysis', desc: 'Reads your notes and journal to surface patterns, stress, and mood.', status: 'Active' },
  { slug: 'calendar', name: 'Temporal Logic', desc: 'Optimises your calendar for deep work and recovery windows.', status: 'Beta' },
  { slug: 'health', name: 'Bio-Sync Health', desc: 'Meal and fitness suggestions tuned to your body and activity level.', status: 'Beta' },
];

const APIModules: React.FC = () => {
  return (
    <section className="py-16 md:py-20 border-t border-stone-200">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-10 md:mb-12">
          <div>
            <p className="text-[10px] font-semibold tracking-widest uppercase text-stone-400 mb-2 md:mb-3">Intelligence Modules</p>
            <h2 style={{ fontFamily: "'Doto', monospace" }} className="text-[30px] md:text-[38px] font-bold text-stone-900 leading-[1.1]">
              EVERY LAYER<br />CONNECTED.
            </h2>
          </div>
          <Link
            to="/apis"
            className="shrink-0 text-[12px] md:text-[13px] font-medium bg-white/60 backdrop-blur-xl border border-stone-200 text-stone-700 px-5 py-2.5 rounded-full hover:bg-white transition-colors duration-200"
          >
            View all APIs →
          </Link>
        </div>

        <div className="flex flex-wrap -mx-[10px]">
          {modules.map((mod) => (
            <div key={mod.slug} className="w-full sm:w-1/2 lg:w-1/3 p-[10px]">
              <Link to={`/apis/${mod.slug}`} className="block h-full bg-white border border-stone-200 rounded-2xl p-6 md:p-7 hover:border-stone-300 hover:-translate-y-1 transition-all duration-300 group">
                <div className="flex items-start justify-between mb-5 md:mb-6">
                  <div className="w-8 h-8 rounded-xl bg-stone-100 group-hover:bg-stone-900 transition-colors duration-300" />
                  <span className={`text-[9px] md:text-[10px] font-semibold tracking-[0.08em] uppercase px-2.5 py-1 rounded-full border ${mod.status === 'Active' ? 'border-stone-200 text-stone-500 bg-stone-50' : 'border-amber-200 text-amber-600 bg-amber-50'}`}>
                    {mod.status}
                  </span>
                </div>
                <h3 className="text-[14px] md:text-[15px] font-semibold text-stone-900 mb-2">{mod.name}</h3>
                <p className="text-[12px] md:text-[13px] text-stone-400 leading-relaxed">{mod.desc}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default APIModules;
