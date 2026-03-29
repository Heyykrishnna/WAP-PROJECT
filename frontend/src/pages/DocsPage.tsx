import React from 'react';
import { Link } from 'react-router-dom';

const sections = [
  {
    title: 'Quick Start',
    items: [
      { heading: 'What is Life OS?', desc: 'An AI-powered personal dashboard that combines multiple data sources to deliver real-world recommendations.' },
      { heading: 'Getting Started', desc: 'Request access, connect your first API module, and configure your profile to personalise intelligence output.' },
      { heading: 'Authentication', desc: 'Life OS uses API key authentication. All requests must include an Authorization header.' },
    ],
  },
  {
    title: 'API Reference',
    items: [
      { heading: 'Weather Endpoints', desc: 'GET /v1/intelligence/weather — Returns real-time conditions and activity recommendations.' },
      { heading: 'NLP Endpoints', desc: 'POST /v1/intelligence/nlp/analyse — Submit text; receive mood score, stress level, and topic clusters.' },
      { heading: 'Calendar Endpoints', desc: 'GET /v1/intelligence/calendar — Returns schedule density, focus blocks, and recovery windows.' },
    ],
  },
  {
    title: 'Concepts',
    items: [
      { heading: 'Context Model', desc: 'How Life OS builds a situational model of your life from raw API data.' },
      { heading: 'Decision Synthesis', desc: 'The algorithm that ranks and surfaces recommendations based on urgency and relevance.' },
      { heading: 'Privacy Model', desc: 'Life OS processes data ephemerally. No raw personal data is stored server-side.' },
    ],
  },
];

const DocsPage: React.FC = () => {
  return (
    <div className="flex-1">
      <section className="pt-14 pb-10 border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-8">
          <span className="text-[10px] font-semibold tracking-[0.12em] uppercase text-stone-400">Documentation</span>
          <h1 style={{ fontFamily: "'Doto', monospace" }} className="text-[50px] font-bold text-stone-900 mt-3 mb-4 leading-tight">
            DOCS
          </h1>
          <p className="text-[14px] text-stone-400 max-w-lg leading-relaxed">
            Everything you need to integrate, configure, and extend Life OS. Minimal, precise, and always up to date.
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-6xl mx-auto px-8">
          <div className="flex flex-col gap-14">
            {sections.map((section) => (
              <div key={section.title}>
                <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-stone-400 mb-6">{section.title}</p>
                <div className="flex flex-col gap-3">
                  {section.items.map((item) => (
                    <div key={item.heading} className="bg-white border border-stone-200 rounded-2xl px-7 py-5 hover:border-stone-300 transition-colors duration-200">
                      <div className="flex items-start gap-8">
                        <h3 className="shrink-0 w-[220px] text-[14px] font-semibold text-stone-900">{item.heading}</h3>
                        <p className="text-[13px] text-stone-400 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 border border-stone-200 rounded-2xl p-8 flex items-center justify-between">
            <p className="text-[14px] text-stone-500">Can't find what you need?</p>
            <Link
              to="/apis"
              className="text-[13px] font-medium text-stone-700 hover:text-stone-900 transition-colors"
            >
              Browse API reference →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DocsPage;
