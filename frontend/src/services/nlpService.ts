export interface MoodResult {
  score: number;
  label: 'Positive' | 'Neutral' | 'Stressed' | 'Low Energy' | 'Burned Out';
  themes: string[];
  suggestions: string[];
}

const STRESS_WORDS = ['stressed', 'anxious', 'overwhelmed', 'tired', 'exhausted', 'worried', 'panic', 'burnout', 'deadline', 'can\'t', 'difficult', 'frustrated', 'stuck', 'lost'];
const POSITIVE_WORDS = ['happy', 'great', 'excited', 'motivated', 'good', 'amazing', 'productive', 'focused', 'energetic', 'confident', 'calm', 'ready', 'glad', 'love'];
const LOW_ENERGY_WORDS = ['tired', 'sleepy', 'slow', 'drained', 'heavy', 'low', 'lazy', 'unmotivated'];

export function analyseText(text: string): MoodResult {
  const lower = text.toLowerCase();
  const words = lower.split(/\s+/);

  const stressCount = words.filter(w => STRESS_WORDS.some(s => w.includes(s))).length;
  const positiveCount = words.filter(w => POSITIVE_WORDS.some(p => w.includes(p))).length;
  const lowCount = words.filter(w => LOW_ENERGY_WORDS.some(l => w.includes(l))).length;

  const themes: string[] = [];
  if (lower.includes('deadline') || lower.includes('meeting') || lower.includes('work')) themes.push('Work pressure');
  if (lower.includes('sleep') || lower.includes('tired') || lower.includes('rest')) themes.push('Fatigue');
  if (lower.includes('family') || lower.includes('friend') || lower.includes('social')) themes.push('Social connection');
  if (lower.includes('health') || lower.includes('exercise') || lower.includes('eat')) themes.push('Health awareness');
  if (themes.length === 0) themes.push('Daily routine');

  let score: number;
  let label: MoodResult['label'];
  let suggestions: string[];

  if (stressCount >= 3 || (stressCount >= 2 && positiveCount === 0)) {
    score = 20 + Math.random() * 20;
    label = 'Burned Out';
    suggestions = ['Take a 10-min walk away from screens', 'Limit your task list to 3 priorities', 'Schedule a no-meeting afternoon this week'];
  } else if (stressCount >= 2) {
    score = 35 + Math.random() * 15;
    label = 'Stressed';
    suggestions = ['Try a 5-min breathing exercise', 'Break your biggest task into 3 smaller steps', 'Block 30 mins of focus time before your next meeting'];
  } else if (lowCount >= 2) {
    score = 45 + Math.random() * 15;
    label = 'Low Energy';
    suggestions = ['Drink a glass of water now', 'A 15-min nap before 3 PM can help', 'Light movement (stretch or short walk) boosts cognition'];
  } else if (positiveCount >= 2) {
    score = 72 + Math.random() * 20;
    label = 'Positive';
    suggestions = ['Protect your focus window — turn off notifications', 'Channel your energy into your top priority first', 'You\'re in a good state — tackle the hard thing today'];
  } else {
    score = 55 + Math.random() * 15;
    label = 'Neutral';
    suggestions = ['Set one clear intention for the afternoon', 'A short walk between tasks can lift your mood', 'Reach out to one person today — social connection helps'];
  }

  return { score: Math.round(score), label, themes, suggestions };
}
