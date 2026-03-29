import type { WeatherData } from './weatherService';
import type { MoodResult } from './nlpService';
import type { FitnessData } from './fitnessService';
import type { TransportData } from './transportService';
import type { HolidayData } from './calendarService';

export interface LifeScoreBreakdown {
  total: number;
  productivity: number;
  health: number;
  consistency: number;
}

export function calculateLifeScore(params: {
  sleep: number;
  energyLevel: number;
  mood: MoodResult;
  weather: WeatherData | null;
  hadBreakfast: boolean;
  exercised: boolean;
  fitness?: FitnessData;
}): LifeScoreBreakdown {
  const { sleep, energyLevel, mood, hadBreakfast, exercised, fitness } = params;

  const sleepScore = Math.min(100, (sleep / 8) * 100);
  const energyScore = energyLevel * 20;
  const moodScore = mood.score;
  const exerciseBonus = exercised ? 15 : 0;
  const breakfastBonus = hadBreakfast ? 10 : 0;
  const recoveryBonus = fitness ? (fitness.recoveryScore * 0.1) : 0;

  const health = Math.min(100, Math.round((sleepScore + energyScore + exerciseBonus + breakfastBonus + recoveryBonus) / 3.3));
  const productivity = Math.min(100, Math.round((energyScore * 0.5 + moodScore * 0.5)));
  
  const consistency = Math.min(100, Math.round(
    (sleep >= 7 ? 30 : 10) +
    (hadBreakfast ? 20 : 0) +
    (exercised ? 25 : 0) +
    (energyLevel >= 3 ? 25 : 10)
  ));

  const total = Math.round((health * 0.35 + productivity * 0.35 + consistency * 0.3));

  return { total, productivity, health, consistency };
}

export function generateAlerts(params: {
  sleep: number;
  energyLevel: number;
  mood: MoodResult;
  weather: WeatherData | null;
  hadBreakfast: boolean;
  holiday?: HolidayData;
  transport?: TransportData;
}): string[] {
  const alerts: string[] = [];
  const { sleep, energyLevel, mood, weather, hadBreakfast, holiday, transport } = params;

  if (sleep < 6) alerts.push('Sleep deficit detected. Cognitive performance may be reduced by up to 30% today.');
  if (energyLevel <= 2) alerts.push('Low energy level. Avoid scheduling deep work before 11 AM if possible.');
  if (!hadBreakfast) alerts.push('No breakfast logged. Blood sugar dip likely by 10 AM — eat something within the hour.');
  if (mood.label === 'Burned Out' || mood.label === 'Stressed') alerts.push('High stress indicators detected. Limit decision-making tasks this morning.');
  
  if (weather && weather.condition === 'Rain') alerts.push(`Rain expected in ${weather.city}. Account for 10–15 min extra commute time.`);
  if (weather && weather.temp > 36) alerts.push(`Heat alert: ${weather.temp}°C in ${weather.city}. Stay hydrated and avoid outdoor activity 12–4 PM.`);
  
  if (holiday && holiday.isMajor) alerts.push(`Today is ${holiday.holidayName}. Consider taking time off to recharge your mental battery.`);
  if (transport && transport.trafficState === 'Heavy') alerts.push(`Traffic delay expected (${transport.delayMinutes} mins). Adjust departure time accordingly.`);

  return alerts;
}

export function answerDecisionQuestion(question: string, weather: WeatherData | null, mood: MoodResult, holiday?: HolidayData, transport?: TransportData): string {
  const q = question.toLowerCase();

  if (q.includes('go out') || q.includes('outside') || q.includes('outdoor')) {
    if (!weather) return 'Location data unavailable. Check local conditions before heading out.';
    const good = weather.condition !== 'Rain' && weather.temp < 35 && weather.temp > 10;
    return good
      ? `Yes — conditions in ${weather.city} look good (${weather.temp}°C). ${transport?.trafficState === 'Heavy' ? 'Beware of traffic delays, though.' : 'Roads are relatively clear.'}`
      : `Exercise caution — ${weather.description} in ${weather.city} at ${weather.temp}°C. If you must go out, early morning is best.`;
  }

  if (q.includes('meeting') || q.includes('call') || q.includes('present') || q.includes('work')) {
    if (holiday?.isMajor) return `Today is ${holiday.holidayName}. You should seriously consider postponing heavy work to protect your baseline consistency.`;
    return mood.score > 55 ? 'Yes — your mood score supports engagement today. Schedule it during your peak energy hours.' : 'Proceed but keep it short. Your stress indicators are elevated.';
  }

  if (q.includes('focus') || q.includes('deep')) {
    return 'Yes, align your 90-minute focus block before 2 PM while your cognitive energy is highest.';
  }

  return `Based on your current life context — mood: ${mood.label.toLowerCase()}${holiday ? `, relevant event: ${holiday.holidayName}` : ''} — approaching this with awareness will lead to better outcomes.`;
}
