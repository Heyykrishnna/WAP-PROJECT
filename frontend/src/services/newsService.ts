export interface NewsArticle {
  title: string;
  description: string;
  source: string;
  url: string;
  publishedAt: string;
}

export async function fetchNews(query = 'technology life productivity'): Promise<NewsArticle[]> {
  const key = import.meta.env.VITE_GNEWS_API_KEY;
  const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&token=${key}&lang=en&max=5`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('News fetch failed');
  const data = await res.json();
  return (data.articles || []).map((a: any) => ({
    title: a.title,
    description: a.description,
    source: a.source?.name || 'Unknown',
    url: a.url,
    publishedAt: a.publishedAt,
  }));
}
