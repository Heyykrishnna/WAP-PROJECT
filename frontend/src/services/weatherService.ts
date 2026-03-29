export interface WeatherData {
  temp: number;
  feelsLike: number;
  condition: string;
  description: string;
  humidity: number;
  wind: number;
  city: string;
  uvi?: number;
}

export async function fetchWeather(lat: number, lon: number): Promise<WeatherData> {
  const key = import.meta.env.VITE_WEATHERSTACK_API_KEY;
  const url = `http://api.weatherstack.com/current?access_key=${key}&query=${lat},${lon}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Weather fetch failed');
  const data = await res.json();
  
  if (data.error) throw new Error(data.error.info || 'Weather fetch failed');
  
  return {
    temp: data.current.temperature,
    feelsLike: data.current.feelslike,
    condition: data.current.weather_descriptions[0],
    description: data.current.weather_descriptions[0],
    humidity: data.current.humidity,
    wind: data.current.wind_speed,
    city: data.location.name,
    uvi: data.current.uv_index,
  };
}
