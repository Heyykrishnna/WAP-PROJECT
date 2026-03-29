import React from 'react';

const modules = [
  { name: 'Weather Engine', desc: 'Suggests optimal routines based on real-time atmospheric data.', status: 'Active' },
  { name: 'Spatial Awareness', desc: 'Location-aware insights that personalise every recommendation.', status: 'Active' },
  { name: 'News Intelligence', desc: 'Filters global narratives down to what is actually relevant to you.', status: 'Active' },
  { name: 'NLP / Text Analysis', desc: 'Reads your notes and journal to surface patterns, stress, and mood.', status: 'Active' },
  { name: 'Temporal Logic', desc: 'Optimises your calendar for deep work and recovery windows.', status: 'Beta' },
  { name: 'Bio-Sync Health', desc: 'Meal and fitness suggestions tuned to your body and activity level.', status: 'Beta' },
];

const APIModules: React.FC = () => {
  return (
    <section className="py-24 border-t border-stone-200">
      <div className="max-w-6xl mx-auto px-8">

        <div className="flex items-end justify-between mb-14">
          <div>
            <p className="text-[11px] font-medium tracking-[0.07em] uppercase text-stone-400 mb-3">
              Intelligence Modules
            </p>
            <h2 className="text-[40px] font-bold tracking-[-0.04em] text-stone-900 leading-[1.1]">
              Every layer of your life,<br />connected.
            </h2>
          </div>
          <a
            href="#"
            className="shrink-0 text-[13px] font-medium bg-white/60 backdrop-blur-xl border border-stone-200 text-stone-700 px-5 py-2.5 rounded-full hover:bg-white transition-colors duration-200"
          >
            View all APIs →
          </a>
        </div>

        <div className="flex flex-wrap" style={{ margin: '-12px' }}>
          {modules.map((mod) => (
            <div
              key={mod.name}
              className="w-1/3 p-3"
            >
              <div className="h-full bg-white border border-stone-200 rounded-2xl p-7 hover:border-stone-300 transition-all duration-300 hover:-translate-y-1 group">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-8 h-8 rounded-lg bg-stone-100 group-hover:bg-stone-900 transition-colors duration-300" />
                  <span className={`text-[10px] font-semibold tracking-[0.07em] uppercase px-2.5 py-1 rounded-full border ${
                    mod.status === 'Active'
                      ? 'border-stone-200 text-stone-500 bg-stone-50'
                      : 'border-amber-200 text-amber-600 bg-amber-50'
                  }`}>
                    {mod.status}
                  </span>
                </div>
                <h3 className="text-[16px] font-semibold tracking-[-0.02em] text-stone-900 mb-2">
                  {mod.name}
                </h3>
                <p className="text-[13px] text-stone-400 leading-relaxed">
                  {mod.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default APIModules;
