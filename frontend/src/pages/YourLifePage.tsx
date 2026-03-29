import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { fetchWeather, type WeatherData } from '../services/weatherService';
import { fetchNews, type NewsArticle } from '../services/newsService';
import { getUserLocation } from '../services/locationService';
import { analyseText, type MoodResult } from '../services/nlpService';
import { fetchHolidayIntelligence, type HolidayData } from '../services/calendarService';
import { fetchFoodIntelligence, type FoodData } from '../services/foodService';
import { fetchFitnessIntelligence, type FitnessData, type EquipmentAvailability } from '../services/fitnessService';
import { fetchTransportIntelligence, type TransportData } from '../services/transportService';
import { calculateLifeScore, generateAlerts, answerDecisionQuestion, type LifeScoreBreakdown } from '../services/lifeScore';

interface Answers {
  name: string;
  feeling: number;
  sleep: number;
  journal: string;
  question: string;
  hadBreakfast: boolean;
  exercised: boolean;
  energyLevel: number;
  equipment: EquipmentAvailability;
}

interface LifeData {
  weather: WeatherData | null;
  news: NewsArticle[];
  mood: MoodResult;
  score: LifeScoreBreakdown;
  alerts: string[];
  decisionAnswer: string;
  holiday: HolidayData;
  food: FoodData;
  fitness: FitnessData;
  transport: TransportData;
}

type Phase = 'questions' | 'loading' | 'dashboard';

const TOTAL_STEPS = 5;

const feelingLabels = ['Terrible', 'Low', 'Okay', 'Good', 'Amazing'];
const energyLabels = ['Drained', 'Low', 'Moderate', 'High', 'Peak'];

const YourLifePage: React.FC = () => {
  const [phase, setPhase] = useState<Phase>('questions');
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({
    name: '', feeling: 2, sleep: 7, journal: '', question: '',
    hadBreakfast: false, exercised: false, energyLevel: 2, equipment: 'None' as EquipmentAvailability
  });
  const [lifeData, setLifeData] = useState<LifeData | null>(null);
  const [decisionInput, setDecisionInput] = useState('');
  const [decisionAnswer, setDecisionAnswer] = useState('');
  const cardRef = useRef<HTMLDivElement>(null);

  const animateNext = () => {
    gsap.fromTo(cardRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' });
  };

  const next = () => {
    if (step < TOTAL_STEPS - 1) {
      setStep(s => s + 1);
      setTimeout(animateNext, 10);
    } else {
      runAnalysis();
    }
  };

  const back = () => {
    if (step > 0) {
      setStep(s => s - 1);
      setTimeout(animateNext, 10);
    }
  };

  const runAnalysis = async () => {
    setPhase('loading');
    try {
      const coords = await getUserLocation();

      const [weather, news, holidayRes] = await Promise.allSettled([
        fetchWeather(coords.lat, coords.lon),
        fetchNews(answers.question || 'productivity wellness life'),
        fetchHolidayIntelligence()
      ]);

      const weatherData = weather.status === 'fulfilled' ? weather.value : null;
      const newsData = news.status === 'fulfilled' ? news.value : [];
      const holidayData = holidayRes.status === 'fulfilled' ? holidayRes.value : await fetchHolidayIntelligence();

      const mood = analyseText(answers.journal || feelingLabels[answers.feeling]);

      const [food, fitness, transport] = await Promise.all([
        fetchFoodIntelligence(weatherData, mood),
        fetchFitnessIntelligence(answers.sleep, weatherData, answers.equipment),
        fetchTransportIntelligence(coords, weatherData)
      ]);

      const score = calculateLifeScore({ sleep: answers.sleep, energyLevel: answers.energyLevel, mood, weather: weatherData, hadBreakfast: answers.hadBreakfast, exercised: answers.exercised, fitness });
      const alerts = generateAlerts({ sleep: answers.sleep, energyLevel: answers.energyLevel, mood, weather: weatherData, hadBreakfast: answers.hadBreakfast, holiday: holidayData, transport });
      const da = answerDecisionQuestion(answers.question || 'how should I approach today?', weatherData, mood, holidayData, transport);

      setLifeData({
        weather: weatherData, news: newsData, mood, score, alerts, decisionAnswer: da,
        holiday: holidayData, food, fitness, transport
      });
      setPhase('dashboard');
    } catch {
      setPhase('dashboard');
    }
  };

  const askDecision = () => {
    if (!decisionInput.trim() || !lifeData) return;
    const answer = answerDecisionQuestion(decisionInput, lifeData.weather, lifeData.mood, lifeData.holiday, lifeData.transport);
    setDecisionAnswer(answer);
  };

  if (phase === 'loading') return <LoadingScreen />;
  if (phase === 'dashboard' && lifeData) {
    return <Dashboard answers={answers} data={lifeData} decisionInput={decisionInput} setDecisionInput={setDecisionInput} decisionAnswer={decisionAnswer} onAsk={askDecision} />;
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="max-w-2xl mx-auto w-full px-8 pt-16 pb-32 flex-1">
        <div className="flex items-center justify-between mb-12">
          <span className="text-[10px] font-semibold tracking-widest uppercase text-stone-400">
            Your Life — Step {step + 1} of {TOTAL_STEPS}
          </span>
          <div className="flex gap-1.5">
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
              <div key={i} className={`h-1 rounded-full transition-all duration-500 ${i <= step ? 'bg-stone-900 w-8' : 'bg-stone-200 w-3'}`} />
            ))}
          </div>
        </div>

        <div ref={cardRef}>
          {step === 0 && (
            <StepCard heading="Let's start with you." sub="This takes about 90 seconds. Location auto-detect is enabled to personalize your recommendations.">
              <div className="flex flex-col gap-6">
                <div className="bg-[#f5f4f0] text-stone-600 text-[12px] px-4 py-3 rounded-lg border border-stone-200 flex items-center gap-2 font-medium">
                  Geolocation API will sync on analysis.
                </div>
                <div>
                  <label className="text-[11px] font-semibold tracking-widest uppercase text-stone-400 block mb-3">Your name</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={answers.name}
                    onChange={e => setAnswers(a => ({ ...a, name: e.target.value }))}
                    className="w-full text-[15px] bg-white border border-stone-200 rounded-xl px-5 py-3.5 text-stone-900 placeholder-stone-300 focus:outline-none focus:border-stone-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold tracking-widest uppercase text-stone-400 block mb-3">
                    How are you feeling? — <span className="text-stone-600 normal-case">{feelingLabels[answers.feeling]}</span>
                  </label>
                  <div className="flex gap-3">
                    {feelingLabels.map((label, i) => (
                      <button
                        key={i}
                        onClick={() => setAnswers(a => ({ ...a, feeling: i }))}
                        className={`flex-1 py-3 rounded-xl border text-[12px] font-medium transition-all duration-200 ${answers.feeling === i ? 'bg-stone-900 text-white border-stone-900' : 'bg-white border-stone-200 text-stone-500 hover:border-stone-400'}`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </StepCard>
          )}

          {step === 1 && (
            <StepCard heading={`Good morning${answers.name ? ', ' + answers.name : ''}. How was your night?`} sub="Sleep and energy are the foundation of everything Life OS analyses.">
              <div className="flex flex-col gap-6">
                <div>
                  <label className="text-[11px] font-semibold tracking-widest uppercase text-stone-400 block mb-3">
                    Hours of sleep — <span className="text-stone-600 normal-case">{answers.sleep}h</span>
                  </label>
                  <input
                    type="range" min={0} max={12} step={0.5}
                    value={answers.sleep}
                    onChange={e => setAnswers(a => ({ ...a, sleep: parseFloat(e.target.value) }))}
                    className="w-full accent-stone-900"
                  />
                  <div className="flex justify-between text-[11px] text-stone-300 mt-1"><span>0h</span><span>12h</span></div>
                </div>
                <div>
                  <label className="text-[11px] font-semibold tracking-widest uppercase text-stone-400 block mb-3">
                    Energy level — <span className="text-stone-600 normal-case">{energyLabels[answers.energyLevel]}</span>
                  </label>
                  <div className="flex gap-3">
                    {energyLabels.map((label, i) => (
                      <button
                        key={i}
                        onClick={() => setAnswers(a => ({ ...a, energyLevel: i }))}
                        className={`flex-1 py-3 rounded-xl border text-[11px] font-medium transition-all duration-200 ${answers.energyLevel === i ? 'bg-stone-900 text-white border-stone-900' : 'bg-white border-stone-200 text-stone-500 hover:border-stone-400'}`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </StepCard>
          )}

          {step === 2 && (
            <StepCard heading="Write today's journal entry." sub="Life OS will analyse your mood, stress level, and recurring themes. Be honest — it's private.">
              <textarea
                rows={6}
                placeholder="How are you feeling about today? What's on your mind? Any worries or things you're excited about?"
                value={answers.journal}
                onChange={e => setAnswers(a => ({ ...a, journal: e.target.value }))}
                className="w-full text-[14px] bg-white border border-stone-200 rounded-xl px-5 py-4 text-stone-900 placeholder-stone-300 focus:outline-none focus:border-stone-400 transition-colors resize-none leading-relaxed"
              />
            </StepCard>
          )}

          {step === 3 && (
            <StepCard heading="Ask Life OS anything." sub="This becomes your decision engine prompt. It evaluates weather, mood, schedule, and traffic to give a concrete answer.">
              <div className="flex flex-col gap-4">
                {['Should I go out today?', 'Is this a good day to exercise?', 'Should I schedule that tough meeting?'].map((example) => (
                  <button
                    key={example}
                    onClick={() => setAnswers(a => ({ ...a, question: example }))}
                    className={`text-left px-5 py-3.5 rounded-xl border text-[14px] transition-all duration-200 ${answers.question === example ? 'bg-stone-900 text-white border-stone-900' : 'bg-white border-stone-200 text-stone-600 hover:border-stone-400'}`}
                  >
                    {example}
                  </button>
                ))}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Or type your own question..."
                    value={answers.question}
                    onChange={e => setAnswers(a => ({ ...a, question: e.target.value }))}
                    className="w-full text-[14px] bg-white border border-stone-200 rounded-xl px-5 py-3.5 text-stone-900 placeholder-stone-300 focus:outline-none focus:border-stone-400 transition-colors"
                  />
                </div>
              </div>
            </StepCard>
          )}

          {step === 4 && (
            <StepCard heading="Health & Fitness context." sub="These help Life OS calculate your daily score and Wger fitness recommendations.">
              <div className="flex flex-col gap-4">
                {[
                  { key: 'hadBreakfast' as const, label: 'Did you have breakfast?', value: answers.hadBreakfast },
                  { key: 'exercised' as const, label: 'Did you exercise today?', value: answers.exercised },
                ].map(({ key, label, value }) => (
                  <button
                    key={key}
                    onClick={() => setAnswers(a => ({ ...a, [key]: !a[key] }))}
                    className={`flex items-center justify-between px-6 py-4 rounded-xl border text-[14px] font-medium transition-all duration-200 ${value ? 'bg-stone-900 text-white border-stone-900' : 'bg-white border-stone-200 text-stone-700 hover:border-stone-400'}`}
                  >
                    <span>{label}</span>
                    <span className="text-[12px]">{value ? 'Yes ✓' : 'No'}</span>
                  </button>
                ))}
                <div className="mt-2">
                  <label className="text-[11px] font-semibold tracking-widest uppercase text-stone-400 block mb-3">
                    Available Workout Equipment
                  </label>
                  <div className="flex gap-2">
                    {['None', 'Dumbbells', 'Full Gym'].map((eq) => (
                      <button
                        key={eq}
                        onClick={() => setAnswers(a => ({ ...a, equipment: eq as EquipmentAvailability }))}
                        className={`flex-1 py-3 rounded-xl border text-[12px] font-medium transition-all duration-200 ${answers.equipment === eq ? 'bg-stone-900 text-white border-stone-900' : 'bg-white border-stone-200 text-stone-500 hover:border-stone-400'}`}
                      >
                        {eq}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </StepCard>
          )}
        </div>

        <div className="mt-10 flex items-center justify-between">
          <button
            onClick={back}
            className={`text-[13px] font-medium text-stone-400 hover:text-stone-700 transition-colors ${step === 0 ? 'invisible' : ''}`}
          >
            ← Back
          </button>
          <button
            onClick={next}
            className="text-[13px] font-semibold bg-stone-900 text-white px-7 py-3 rounded-full hover:bg-stone-700 transition-colors duration-200"
          >
            {step === TOTAL_STEPS - 1 ? 'Analyse My Life →' : 'Continue →'}
          </button>
        </div>

      </div>
    </div>
  );
};

const StepCard: React.FC<{ heading: string; sub: string; children: React.ReactNode }> = ({ heading, sub, children }) => (
  <div className="flex flex-col gap-8">
    <div>
      <h2 style={{ fontFamily: "'Doto', monospace" }} className="text-[34px] font-bold text-stone-900 leading-tight mb-3">
        {heading.toUpperCase()}
      </h2>
      <p className="text-[14px] text-stone-400 leading-relaxed">{sub}</p>
    </div>
    {children}
  </div>
);

const LoadingScreen: React.FC = () => (
  <div className="flex-1 flex flex-col items-center justify-center gap-6 py-32">
    <div className="flex gap-2">
      {[0, 1, 2].map(i => (
        <div key={i} className="w-2 h-2 rounded-full bg-stone-400 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
      ))}
    </div>
    <p style={{ fontFamily: "'Doto', monospace" }} className="text-[22px] font-bold text-stone-900">SYNCING 8 UNIFIED APIS...</p>
    <p className="text-[13px] text-stone-400 max-w-sm text-center">Fetching Weather, Geolocation, News, NLP, Holiday Data, Food, Fitness, and Transport context.</p>
  </div>
);

const Dashboard: React.FC<{
  answers: Answers;
  data: LifeData;
  decisionInput: string;
  setDecisionInput: (v: string) => void;
  decisionAnswer: string;
  onAsk: () => void;
}> = ({ answers, data, decisionInput, setDecisionInput, decisionAnswer, onAsk }) => {
  const { weather, news, mood, score, alerts, holiday, food, fitness, transport } = data;

  return (
    <div className="flex-1 pb-20">
      <section className="pt-12 pb-10 border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-8">
          <span className="text-[10px] font-semibold tracking-widest uppercase text-stone-400">Your Life — 8-Point Intelligence</span>
          <h1 style={{ fontFamily: "'Doto', monospace" }} className="text-[48px] font-bold text-stone-900 mt-2 leading-tight">
            {answers.name ? `GOOD DAY, ${answers.name.toUpperCase()}.` : 'YOUR LIFE REPORT.'}
          </h1>
          <p className="text-[14px] text-stone-400 mt-3">
            Synthesised from 8 APIs covering your location, weather, mood, holidays, and physiology.
          </p>
        </div>
      </section>

      <section className="pt-12">
        <div className="max-w-6xl mx-auto px-8 flex flex-col gap-8">

          <div className="flex gap-6 flex-col md:flex-row">
            <div className="flex-1 bg-white border border-stone-200 rounded-2xl p-8">
              <p className="text-[10px] font-semibold tracking-widest uppercase text-stone-400 mb-5">Smart Morning Brief</p>
              <div className="flex flex-col gap-4">
                {weather && (
                  <div className="flex items-start gap-4 pb-4 border-b border-stone-100">
                    <span className="shrink-0 w-24 text-[12px] font-semibold text-stone-900">Weather API</span>
                    <span className="text-[13px] text-stone-500 leading-relaxed">
                      {weather.temp}°C in {weather.city}. {weather.description.charAt(0).toUpperCase() + weather.description.slice(1)}.
                      {weather.temp < 20 ? ' Dress in layers.' : weather.temp > 33 ? ' Stay hydrated.' : ' Comfortable conditions.'}
                    </span>
                  </div>
                )}
                <div className="flex items-start gap-4 pb-4 border-b border-stone-100">
                  <span className="shrink-0 w-24 text-[12px] font-semibold text-stone-900">National Holiday</span>
                  <span className="text-[13px] text-stone-500 leading-relaxed">
                    Today is {holiday.holidayName}. {holiday.suggestion}
                  </span>
                </div>
                <div className="flex items-start gap-4 pb-4 border-b border-stone-100">
                  <span className="shrink-0 w-24 text-[12px] font-semibold text-stone-900">NLP API</span>
                  <span className="text-[13px] text-stone-500 leading-relaxed">System detects prevailing {mood.label.toLowerCase()} subtext. {mood.suggestions[0]}</span>
                </div>
                <div className="flex items-start gap-4">
                  <span className="shrink-0 w-24 text-[12px] font-semibold text-stone-900">Transport API</span>
                  <span className="text-[13px] text-stone-500 leading-relaxed">{transport.recommendation} Traffic is currently {transport.trafficState.toLowerCase()}.</span>
                </div>
              </div>
            </div>

            <div className="shrink-0 w-full md:w-[260px] bg-white border border-stone-200 rounded-2xl p-8 flex flex-col">
              <p className="text-[10px] font-semibold tracking-widest uppercase text-stone-400 mb-6">Daily Life Score</p>
              <div className="flex flex-col items-center justify-center flex-1 gap-2 mb-6">
                <p style={{ fontFamily: "'Doto', monospace" }} className="text-[64px] font-bold text-stone-900 leading-none">{score.total}</p>
                <p className="text-[11px] text-stone-400">out of 100</p>
              </div>
              <div className="flex flex-col gap-3">
                {[
                  { label: 'Productivity', val: score.productivity },
                  { label: 'Health', val: score.health },
                  { label: 'Consistency', val: score.consistency },
                ].map(({ label, val }) => (
                  <div key={label}>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-stone-500">{label}</span>
                      <span className="font-medium text-stone-700">{val}</span>
                    </div>
                    <div className="h-1 bg-stone-100 rounded-full">
                      <div className="h-1 bg-stone-900 rounded-full transition-all duration-700" style={{ width: `${val}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white border border-stone-200 rounded-2xl p-8 flex flex-col items-center">
            <p className="text-[10px] font-semibold tracking-widest uppercase text-stone-400 mb-5 w-full text-left">Decision Engine</p>
            <div className="flex items-start gap-4 mb-6 w-full">
              <div className="flex-1 border border-stone-200 rounded-xl overflow-hidden flex bg-white outline-none focus-within:ring-2 focus-within:ring-stone-200 transition-shadow">
                <input
                  type="text"
                  value={decisionInput}
                  onChange={e => setDecisionInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && onAsk()}
                  placeholder={data.decisionAnswer ? 'Ask another question...' : (answers.question || 'Ask Life OS anything about your day...')}
                  className="flex-1 text-[14px] px-5 py-3.5 focus:outline-none bg-transparent text-stone-900 placeholder-stone-300 border-none"
                />
                <button
                  onClick={onAsk}
                  className="px-6 text-[13px] font-semibold text-white bg-stone-900 hover:bg-stone-700 transition-colors"
                >
                  Ask →
                </button>
              </div>
            </div>
            <div className="bg-[#f5f4f0] rounded-xl p-6 w-full border border-stone-200">
              <p className="text-[11px] font-semibold tracking-widest uppercase text-stone-400 mb-3">Life OS Answer</p>
              <p className="text-[15px] text-stone-800 leading-relaxed font-medium">
                {decisionAnswer || data.decisionAnswer}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white border border-stone-200 rounded-2xl p-8 flex flex-col">
              <p className="text-[10px] font-semibold tracking-widest uppercase text-stone-400 mb-5">Food / Core Body API</p>
              <p className="text-[20px] font-bold text-stone-900 mb-4">{food.mealSuggestion}</p>
              <p className="text-[13px] text-stone-500 leading-relaxed mb-4 flex-1">{food.hydrationStatus}</p>
              <p className="text-[11px] font-medium text-stone-400 bg-[#f5f4f0] px-3 py-1.5 rounded-md w-fit">{food.timing}</p>
            </div>

            <div className="bg-white border border-stone-200 rounded-2xl p-8 flex flex-col">
              <p className="text-[10px] font-semibold tracking-widest uppercase text-stone-400 mb-5">Fitness / Bio-Sync API</p>
              <div className="flex items-end gap-3 mb-4">
                <p style={{ fontFamily: "'Doto', monospace" }} className="text-[54px] font-bold text-stone-900 leading-none">{fitness.recoveryScore}%</p>
                <p className="text-[12px] text-stone-400 pb-2 border-b border-stone-200">Recovery Baseline</p>
              </div>
              <p className="text-[13px] text-stone-500 leading-relaxed mb-4 flex-1">{fitness.suggestion}</p>
              <p className="text-[11px] font-medium text-stone-400 bg-[#f5f4f0] px-3 py-1.5 rounded-md w-fit">Optimal Window: {fitness.optimalWindow}</p>
            </div>

            <div className="bg-white border border-stone-200 rounded-2xl p-8 flex flex-col relative overflow-hidden">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#f5f4f0] rounded-full blur-2xl opacity-60" />
              <div className="flex justify-between items-center mb-5 relative z-10">
                <p className="text-[10px] font-semibold tracking-widest uppercase text-stone-400">Life Alerts API</p>
                {alerts.length > 0 && <span className="text-[10px] font-bold px-2 py-0.5 bg-red-100 text-red-600 rounded-full">{alerts.length} Warnings</span>}
              </div>
              
              {alerts.length === 0 ? (
                <p className="text-[14px] font-medium text-stone-500 mt-2 relative z-10">All systems green. No alerts today.</p>
              ) : (
                <div className="flex flex-col gap-3 relative z-10">
                  {alerts.map((alert, i) => (
                    <div key={i} className={`flex items-start gap-3 pb-3 ${i < alerts.length - 1 ? 'border-b border-stone-100' : ''}`}>
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                      <p className="text-[13px] text-stone-600 leading-snug">{alert}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {news.length > 0 && (
            <div className="bg-white border border-stone-200 rounded-2xl p-8">
              <p className="text-[10px] font-semibold tracking-widest uppercase text-stone-400 mb-6">Curated News API (Location & Context Synced)</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {news.slice(0, 3).map((article, i) => (
                  <a key={i} href={article.url} target="_blank" rel="noopener noreferrer" className="group flex flex-col gap-2">
                    <p className="text-[14px] font-medium text-stone-900 group-hover:text-stone-600 transition-colors leading-relaxed line-clamp-3">{article.title}</p>
                    <div className="flex items-center justify-between mt-auto pt-2">
                       <p className="text-[11px] font-mono text-stone-400 uppercase tracking-widest truncate max-w-[120px]">{article.source}</p>
                       <span className="text-[16px] text-stone-300 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">→</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>
    </div>
  );
};

export default YourLifePage;
