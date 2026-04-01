import React, { useMemo, useState } from 'react';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name-asc');

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(apis.map((api) => api.category)))],
    []
  );

  const visibleApis = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    const filtered = apis.filter((api) => {
      const matchesSearch =
        normalizedQuery.length === 0 ||
        api.name.toLowerCase().includes(normalizedQuery) ||
        api.desc.toLowerCase().includes(normalizedQuery) ||
        api.category.toLowerCase().includes(normalizedQuery);

      const matchesStatus =
        selectedStatus === 'All' || api.status === selectedStatus;

      const matchesCategory =
        selectedCategory === 'All' || api.category === selectedCategory;

      return matchesSearch && matchesStatus && matchesCategory;
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
      if (sortBy === 'status') return a.status.localeCompare(b.status);
      if (sortBy === 'category') return a.category.localeCompare(b.category);
      return a.name.localeCompare(b.name);
    });
  }, [searchQuery, selectedStatus, selectedCategory, sortBy]);

  return (
    <div className="flex-1">
      <section className="pt-10 md:pt-16 pb-8 md:pb-10 border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <span className="text-[10px] font-semibold tracking-[0.12em] uppercase text-stone-400">All APIs</span>
          <h1 style={{ fontFamily: "'Doto', monospace" }} className="text-[32px] sm:text-[42px] md:text-[52px] font-bold text-stone-900 mt-3 mb-4 leading-tight">
            INTELLIGENCE<br className="hidden sm:block" /> MODULES
          </h1>
          <p className="text-[13px] md:text-[14px] text-stone-400 max-w-lg leading-relaxed">
            Life OS integrates eight data domains into a single intelligence layer. Click any module to explore its data model, endpoints, and live output.
          </p>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="bg-white border border-stone-200 rounded-2xl p-4 md:p-5 mb-6 md:mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, category, or description"
                className="w-full border border-stone-200 rounded-xl px-3 py-2.5 text-[13px] text-stone-700 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-200"
              />

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full border border-stone-200 rounded-xl px-3 py-2.5 text-[13px] text-stone-700 bg-white focus:outline-none focus:ring-2 focus:ring-stone-200"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Beta">Beta</option>
              </select>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full border border-stone-200 rounded-xl px-3 py-2.5 text-[13px] text-stone-700 bg-white focus:outline-none focus:ring-2 focus:ring-stone-200"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === 'All' ? 'All Categories' : category}
                  </option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full border border-stone-200 rounded-xl px-3 py-2.5 text-[13px] text-stone-700 bg-white focus:outline-none focus:ring-2 focus:ring-stone-200"
              >
                <option value="name-asc">Sort: Name A-Z</option>
                <option value="name-desc">Sort: Name Z-A</option>
                <option value="status">Sort: Status</option>
                <option value="category">Sort: Category</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-3 md:gap-4">
            {visibleApis.map((api, i) => (
              <Link
                key={api.slug}
                to={`/apis/${api.slug}`}
                className="flex flex-col md:flex-row md:items-center justify-between bg-white border border-stone-200 rounded-2xl p-6 md:px-8 md:py-6 hover:border-stone-400 hover:shadow-sm transition-all duration-200 group gap-4 md:gap-8"
              >
                <div className="flex items-center gap-4 md:gap-8">
                  <span className="text-[10px] md:text-[11px] font-mono text-stone-300 w-6">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-8">
                    <span className="text-[9px] md:text-[10px] font-semibold tracking-widest uppercase text-stone-400 md:w-32">{api.category}</span>
                    <h3 className="text-[14px] md:text-[15px] font-semibold text-stone-900">{api.name}</h3>
                  </div>
                </div>
                <div className="flex items-center justify-between md:justify-end gap-6 border-t border-stone-100 md:border-none pt-4 md:pt-0">
                  <p className="text-[12px] md:text-[13px] text-stone-400 max-w-[300px] text-right hidden lg:block">{api.desc}</p>
                  <span className={`text-[9px] md:text-[10px] font-semibold tracking-[0.08em] uppercase px-3 py-1 rounded-full border ${api.status === 'Active' ? 'border-stone-200 text-stone-500 bg-stone-50' : 'border-amber-200 text-amber-600 bg-amber-50'}`}>
                    {api.status}
                  </span>
                  <span className="text-stone-300 group-hover:text-stone-700 transition-colors">→</span>
                </div>
              </Link>
            ))}

            {visibleApis.length === 0 && (
              <div className="bg-white border border-stone-200 rounded-2xl p-8 text-center">
                <p className="text-[13px] text-stone-500">No APIs found for the current filters.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default APIsPage;
