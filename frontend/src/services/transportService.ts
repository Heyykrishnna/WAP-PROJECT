import type { Coords } from './locationService';
import type { WeatherData } from './weatherService';

export interface TransportData {
  trafficState: 'Clear' | 'Moderate' | 'Heavy';
  delayMinutes: number;
  recommendation: string;
}

export async function fetchTransportIntelligence(coords: Coords | null, weather: WeatherData | null): Promise<TransportData> {
  const apiKey = import.meta.env.VITE_TOMTOM_API_KEY;
  const isBadWeather = weather?.condition === 'Rain' || weather?.condition === 'Snow';

  const defaultResult: TransportData = {
    trafficState: isBadWeather ? 'Heavy' : 'Moderate',
    delayMinutes: isBadWeather ? 18 : 6,
    recommendation: isBadWeather 
      ? `Bad weather in ${weather?.city || 'your area'}. Add 20 minutes to commute estimates.`
      : 'Routes operating normally. Standard departure time advised.',
  };

  if (!apiKey || !coords || apiKey === 'your_tomtom_api_key_here') return defaultResult;

  try {
    const url = `https://api.tomtom.com/traffic/services/4/flowSegmentData/absolute/10/json?key=${apiKey}&point=${coords.lat},${coords.lon}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('TomTom API fetch failed');
    
    const data = await res.json();
    const flow = data.flowSegmentData;

    if (!flow) return defaultResult;

    const { currentSpeed, freeFlowSpeed } = flow;
    const speedRatio = currentSpeed / freeFlowSpeed;

    let trafficState: 'Clear' | 'Moderate' | 'Heavy' = 'Clear';
    let delayMinutes = 0;

    if (speedRatio < 0.5) {
      trafficState = 'Heavy';
      delayMinutes = 20;
    } else if (speedRatio < 0.8) {
      trafficState = 'Moderate';
      delayMinutes = 10;
    } else {
      trafficState = 'Clear';
      delayMinutes = 2;
    }

    if (isBadWeather && trafficState !== 'Heavy') {
      trafficState = 'Moderate';
      delayMinutes += 10;
    }

    let recommendation = 'Traffic is flowing freely. Standard departure time advised.';
    if (trafficState === 'Heavy') recommendation = `Significant congestion detected globally near your coordinates. Add at least ${delayMinutes} minutes to your expected commute.`;
    else if (trafficState === 'Moderate') recommendation = `Minor congestion detected. Factor in a ${delayMinutes} minute delay.`;

    if (isBadWeather) recommendation += ` Exercise caution due to ${weather.condition.toLowerCase()}.`;

    return { trafficState, delayMinutes, recommendation };
  } catch (error) {
    console.error('Transport API Error:', error);
    return defaultResult;
  }
}
