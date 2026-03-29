import type { WeatherData } from './weatherService';

export interface FitnessData {
  recoveryScore: number;
  suggestion: string;
  optimalWindow: string;
}

export type EquipmentAvailability = 'None' | 'Dumbbells' | 'Full Gym';

export async function fetchFitnessIntelligence(sleep: number, weather: WeatherData | null, equipment: EquipmentAvailability): Promise<FitnessData> {
  const baseRecovery = Math.min(100, Math.round((sleep / 8) * 100));
  const isRaining = weather?.condition.toLowerCase().includes('rain');
  
  let defaultSuggestion = '';
  if (baseRecovery < 50) {
    defaultSuggestion = 'Recovery is low. Limit to light stretching or a 15-minute walk.';
  } else if (baseRecovery < 80) {
    defaultSuggestion = isRaining ? 'Indoor session recommended due to rain.' : 'Moderate outdoor or gym session.';
  } else {
    defaultSuggestion = 'Prime recovery state. Green light for high-intensity training.';
  }

  const result: FitnessData = {
    recoveryScore: baseRecovery,
    suggestion: defaultSuggestion,
    optimalWindow: isRaining ? 'Lunchtime' : '5:00 PM – 6:30 PM',
  };

  try {
    let equipmentQuery = '&equipment=7';
    if (equipment === 'Dumbbells') equipmentQuery = '&equipment=3';
    else if (equipment === 'Full Gym') equipmentQuery = '';

    const url = `https://wger.de/api/v2/exercise/?language=2&limit=20${equipmentQuery}`;
    const apiKey = import.meta.env.VITE_WGER_API_KEY;
    const options: RequestInit = {};
    if (apiKey && apiKey !== 'your_wger_api_key_here') {
      options.headers = { 'Authorization': `Token ${apiKey}` };
    }

    const res = await fetch(url, options);
    if (!res.ok) throw new Error('Wger API fetch failed');
    
    const data = await res.json();

    if (data && data.results && data.results.length > 0) {
      const exercise = data.results[Math.floor(Math.random() * data.results.length)];
      result.suggestion = `Recommended Wger Exercise based on your equipment (${equipment}): ${exercise.name}. ${defaultSuggestion}`;
    }

    return result;
  } catch (error) {
    console.error('Fitness API Error:', error);
    return result;
  }
}
