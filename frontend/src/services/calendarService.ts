export interface HolidayData {
  holidayName: string;
  description: string;
  isMajor: boolean;
  suggestion: string;
}

export async function fetchHolidayIntelligence(): Promise<HolidayData> {
  const apiKey = import.meta.env.VITE_CHECKIDAY_API_KEY;

  const defaultResult: HolidayData = {
    holidayName: 'National Productivity Day',
    description: 'A day focused on deep work and achieving your goals.',
    isMajor: false,
    suggestion: 'Use today to tackle your biggest priorities without distraction.',
  };

  try {
    const url = 'https://api.checkiday.com/v1/events/';
    const options: RequestInit = {};
    if (apiKey && apiKey !== 'your_checkiday_api_key_here') {
      options.headers = { 'X-Api-Key': apiKey };
    }

    const res = await fetch(url, options);
    if (!res.ok) throw new Error('Checkiday API fetch failed');

    const data = await res.json();
    
    if (data && data.events && data.events.length > 0) {
      const event = data.events[0];
      const isMajor = event.name.toLowerCase().includes('national') || event.name.toLowerCase().includes('international');
      
      return {
        holidayName: event.name,
        description: event.description || 'A day to celebrate and observe this special occasion.',
        isMajor,
        suggestion: isMajor ? `It's a major celebration: ${event.name}. Try to incorporate the theme into your day!` : `Today marks ${event.name}. Use it as a fun conversation starter.`,
      };
    }

    return defaultResult;
  } catch (error) {
    console.error('Holiday API Error:', error);
    return defaultResult;
  }
}
