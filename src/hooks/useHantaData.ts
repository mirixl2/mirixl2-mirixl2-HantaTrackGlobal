import { useQuery } from '@tanstack/react-query';
import type { HantavirusCase, NewsArticle, StatsOverview, MonthlyTrend, CountryRanking, OutbreakAlert, CaseFilters } from '../types';
import { mockCases, mockNews, computeStats, mockMonthlyTrends, computeCountryRankings, mockAlerts } from '../data/mockData';

// Simulates network latency for realistic UX
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Shared filter utility
function applyFilters(cases: HantavirusCase[], filters: CaseFilters): HantavirusCase[] {
  let filtered = [...cases];
  if (filters.year !== 'all') {
    filtered = filtered.filter(c => c.year === filters.year);
  }
  if (filters.region !== 'Global') {
    filtered = filtered.filter(c => c.region === filters.region);
  }
  return filtered;
}

// ─── Fetch hantavirus cases (simulated WHO GHO OData / CDC Socrata / PAHO PLISA) ───

async function fetchCases(filters: CaseFilters): Promise<HantavirusCase[]> {
  try {
    await delay(600);
    return applyFilters(mockCases, filters);
  } catch (error) {
    throw new Error('Error al obtener los casos de hantavirus.');
  }
}

export function useCases(filters: CaseFilters) {
  return useQuery<HantavirusCase[]>({
    queryKey: ['hantavirus-cases', filters],
    queryFn: () => fetchCases(filters),
    staleTime: 60 * 1000, // 1 minute
    refetchInterval: 2 * 60 * 1000, // auto-refresh every 2m
  });
}

// ─── Fetch news feed (simulated NewsAPI / ProMED-mail RSS) ───

async function fetchNews(language: string): Promise<NewsArticle[]> {
  try {
    const isEn = language.startsWith('en');
    const rssUrl = isEn
      ? 'https://news.google.com/rss/search?q=hantavirus&hl=en-US&gl=US&ceid=US:en'
      : 'https://news.google.com/rss/search?q=hantavirus&hl=es-419&gl=US&ceid=US:es-419';

    const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`);
    if (!response.ok) throw new Error('Error al obtener las noticias.');
    const data = await response.json();
    
    if (data.status !== 'ok') throw new Error('Error en la API de noticias');

    return data.items.map((item: any, index: number): NewsArticle => {
      // Basic heuristic to categorize news
      let category: NewsArticle['category'] = 'alert';
      const t = item.title.toLowerCase();
      if (t.includes('vacuna') || t.includes('estudio') || t.includes('investigador') || t.includes('científico') || t.includes('vaccine') || t.includes('study') || t.includes('research')) category = 'research';
      else if (t.includes('brote') || t.includes('casos') || t.includes('fallece') || t.includes('muerte') || t.includes('outbreak') || t.includes('cases') || t.includes('death')) category = 'outbreak';
      else if (t.includes('oms') || t.includes('ops') || t.includes('cdc') || t.includes('ministerio') || t.includes('alerta') || t.includes('who') || t.includes('ministry') || t.includes('alert')) category = 'policy';

      // Clean HTML from description
      const cleanDesc = item.description ? item.description.replace(/<[^>]*>?/gm, '').trim() : '';

      return {
        id: item.guid || `real-news-${index}`,
        title: item.title,
        excerpt: cleanDesc.length > 140 ? cleanDesc.substring(0, 140) + '...' : cleanDesc,
        source: item.title.split(' - ').pop()?.trim() || 'Noticias',
        sourceUrl: item.link,
        publishedAt: item.pubDate,
        category,
      };
    });
  } catch (error) {
    console.error("Error fetching real news, falling back to mock", error);
    return mockNews;
  }
}

export function useNews(language: string = 'es') {
  return useQuery<NewsArticle[]>({
    queryKey: ['hantavirus-news', language],
    queryFn: () => fetchNews(language),
    staleTime: 60 * 1000,
    refetchInterval: 2 * 60 * 1000,
  });
}

// ─── Fetch statistics overview ───

async function fetchStats(year: number | 'all'): Promise<StatsOverview> {
  try {
    await delay(300);
    return computeStats(mockCases, year);
  } catch (error) {
    throw new Error('Error al calcular las estadísticas.');
  }
}

export function useStats(year: number | 'all') {
  return useQuery<StatsOverview>({
    queryKey: ['hantavirus-stats', year],
    queryFn: () => fetchStats(year),
    staleTime: 60 * 1000,
  });
}

// ─── Fetch monthly trend data ───

async function fetchTrends(): Promise<MonthlyTrend[]> {
  try {
    await delay(350);
    return mockMonthlyTrends;
  } catch (error) {
    throw new Error('Error al obtener las tendencias mensuales.');
  }
}

export function useTrends() {
  return useQuery<MonthlyTrend[]>({
    queryKey: ['hantavirus-trends'],
    queryFn: fetchTrends,
    staleTime: 60 * 1000,
  });
}

// ─── Fetch country rankings ───

async function fetchRankings(filters: CaseFilters): Promise<CountryRanking[]> {
  try {
    await delay(250);
    const filteredCases = applyFilters(mockCases, filters);
    return computeCountryRankings(filteredCases);
  } catch (error) {
    throw new Error('Error al obtener el ranking de países.');
  }
}

export function useRankings(filters: CaseFilters) {
  return useQuery<CountryRanking[]>({
    queryKey: ['hantavirus-rankings', filters],
    queryFn: () => fetchRankings(filters),
    staleTime: 60 * 1000,
  });
}

// ─── Fetch outbreak alerts ───

async function fetchAlerts(): Promise<OutbreakAlert[]> {
  try {
    await delay(200);
    return mockAlerts;
  } catch (error) {
    throw new Error('Error al obtener las alertas de brotes.');
  }
}

export function useAlerts() {
  return useQuery<OutbreakAlert[]>({
    queryKey: ['hantavirus-alerts'],
    queryFn: fetchAlerts,
    staleTime: 60 * 1000,
    refetchInterval: 2 * 60 * 1000,
  });
}
