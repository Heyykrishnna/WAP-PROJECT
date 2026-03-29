import type { WeatherData } from './weatherService';
import type { MoodResult } from './nlpService';

export interface FoodData {
  mealSuggestion: string;
  hydrationStatus: string;
  timing: string;
}

export async function fetchFoodIntelligence(weather: WeatherData | null, mood: MoodResult): Promise<FoodData> {
  const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;

  const isHot = weather && weather.temp > 28;
  const isStressed = mood.label === 'Stressed' || mood.label === 'Burned Out';

  let defaultSuggestion = 'Balanced proteins and complex carbs.';
  let hydrationStatus = 'Maintain standard hydration (2L).';
  
  if (isHot) {
    defaultSuggestion = 'Light, hydrating meals. Avoid heavy carbs.';
    hydrationStatus = 'Hydration critical today — target 3L minimum.';
  }
  if (isStressed) {
    defaultSuggestion = 'Omega-3 rich foods with sustained energy release to stabilise cortisol.';
  }

  if (!apiKey || apiKey === 'your_spoonacular_api_key_here') {
    return { mealSuggestion: defaultSuggestion, hydrationStatus, timing: 'Next optimal meal window: 1:30 PM.' };
  }

  try {
    let query = 'healthy';
    if (isHot) query = 'salad';
    if (isStressed) query = 'comfort';

    const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}&diet=healthy&number=1`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Spoonacular fetch failed');
    const data = await res.json();

    let mealSuggestion = defaultSuggestion;
    if (data.results && data.results.length > 0) {
      mealSuggestion = `Optimal meal detected: ${data.results[0].title}. ${defaultSuggestion}`;
    }

    return {
      mealSuggestion,
      hydrationStatus,
      timing: 'Next optimal meal window: 1:30 PM (post-focus block).',
    };
  } catch (error) {
    console.error('Food API Error:', error);
    return { mealSuggestion: defaultSuggestion, hydrationStatus, timing: 'Next optimal meal window: 1:30 PM.' };
  }
}
