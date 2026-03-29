import React from 'react';
import { Link } from 'react-router-dom';

const steps = [
  { num: '01', title: 'Data Collection', desc: 'Life OS pulls from 8 external data sources simultaneously on each session load — weather, location, news, calendar, and more.' },
  { num: '02', title: 'Context Building', desc: 'Raw data is cross-referenced against your profile, historical patterns, and current time context to establish a situational model.' },
  { num: '03', title: 'NLP Processing', desc: 'Your journal entries and notes are analysed for mood, stress, and topic clusters that provide the subjective layer of your life context.' },
  { num: '04', title: 'Decision Synthesis', desc: 'The intelligence layer combines objective data with subjective context to generate ranked, actionable recommendations.' },
  { num: '05', title: 'Delivery', desc: 'Insights are surfaced as a daily summary and proactive alerts — no feeds, no noise, just what you need to act on.' },
];

const IntelligencePage: React.FC = () => {
  return (
    <div className="flex-1">
      <section className="pt-14 pb-10 border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-8">
          <span className="text-[10px] font-semibold tracking-[0.12em] uppercase text-stone-400">How It Works</span>
          <h1 style={{ fontFamily: "'Doto', monospace" }} className="text-[50px] font-bold text-stone-900 mt-3 mb-4 leading-tight">
            THE INTELLIGENCE<br />ARCHITECTURE
          </h1>
          <p className="text-[14px] text-stone-400 max-w-lg leading-relaxed">
            Life OS is not a dashboard. It is a decision proxy — a system that understands your life context and translates it into concrete, time-sensitive actions.
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-6xl mx-auto px-8">

          <div className="flex flex-col gap-0">
            {steps.map((step, i) => (
              <div key={step.num} className={`flex items-start gap-12 py-10 ${i < steps.length - 1 ? 'border-b border-stone-100' : ''}`}>
                <span style={{ fontFamily: "'Doto', monospace" }} className="shrink-0 text-[13px] font-bold text-stone-300 w-10">{step.num}</span>
                <h3 className="shrink-0 w-[200px] text-[16px] font-semibold text-stone-900">{step.title}</h3>
                <p className="text-[14px] text-stone-400 leading-relaxed max-w-lg">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 bg-white border border-stone-200 rounded-2xl p-10 flex items-center justify-between">
            <div>
              <h3 style={{ fontFamily: "'Doto', monospace" }} className="text-[28px] font-bold text-stone-900 mb-2">READY TO CONNECT?</h3>
              <p className="text-[14px] text-stone-400">Explore the individual APIs that power the intelligence layer.</p>
            </div>
            <Link
              to="/apis"
              className="shrink-0 text-[13px] font-semibold bg-stone-900 text-white px-6 py-3 rounded-full hover:bg-stone-700 transition-colors duration-200"
            >
              View all APIs →
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
};

export default IntelligencePage;
