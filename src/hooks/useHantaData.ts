import { useQuery } from '@tanstack/react-query';
import type { HantavirusCase, NewsArticle, StatsOverview, MonthlyTrend, CountryRanking, OutbreakAlert, CaseFilters } from '../types';
import { mockCases, mockNews, computeStats, mockMonthlyTrends, computeCountryRankings, mockAlerts } from '../data/mockData';

// Simulates network latency for realistic UX
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// ─── Fetch hantavirus cases (simulated WHO GHO OData / CDC Socrata / PAHO PLISA) ───

async function fetchCases(filters: CaseFilters): Promise<HantavirusCase[]> {
  await delay(600);

  let cases = [...mockCases];

  if (filters.year !== 'all') {
    cases = cases.filter(c => c.year === filters.year);
  }

  if (filters.region !== 'Global') {
    cases = cases.filter(c => c.region === filters.region);
  }

  return cases;
}

export function useCases(filters: CaseFilters) {
  return useQuery<HantavirusCase[]>({
    queryKey: ['hantavirus-cases', filters],
    queryFn: () => fetchCases(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 60 * 1000, // auto-refresh every 60s
  });
}

// ─── Fetch news feed (simulated NewsAPI / ProMED-mail RSS) ───

async function fetchNews(): Promise<NewsArticle[]> {
  await delay(400);
  return mockNews;
}

export function useNews() {
  return useQuery<NewsArticle[]>({
    queryKey: ['hantavirus-news'],
    queryFn: fetchNews,
    staleTime: 10 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
  });
}

// ─── Fetch statistics overview ───

async function fetchStats(year: number | 'all'): Promise<StatsOverview> {
  await delay(300);
  return computeStats(mockCases, year);
}

export function useStats(year: number | 'all') {
  return useQuery<StatsOverview>({
    queryKey: ['hantavirus-stats', year],
    queryFn: () => fetchStats(year),
    staleTime: 5 * 60 * 1000,
  });
}

// ─── Fetch monthly trend data ───

async function fetchTrends(): Promise<MonthlyTrend[]> {
  await delay(350);
  return mockMonthlyTrends;
}

export function useTrends() {
  return useQuery<MonthlyTrend[]>({
    queryKey: ['hantavirus-trends'],
    queryFn: fetchTrends,
    staleTime: 30 * 60 * 1000,
  });
}

// ─── Fetch country rankings ───

async function fetchRankings(filters: CaseFilters): Promise<CountryRanking[]> {
  await delay(250);
  let cases = [...mockCases];

  if (filters.year !== 'all') {
    cases = cases.filter(c => c.year === filters.year);
  }
  if (filters.region !== 'Global') {
    cases = cases.filter(c => c.region === filters.region);
  }

  return computeCountryRankings(cases);
}

export function useRankings(filters: CaseFilters) {
  return useQuery<CountryRanking[]>({
    queryKey: ['hantavirus-rankings', filters],
    queryFn: () => fetchRankings(filters),
    staleTime: 5 * 60 * 1000,
  });
}

// ─── Fetch outbreak alerts ───

async function fetchAlerts(): Promise<OutbreakAlert[]> {
  await delay(200);
  return mockAlerts;
}

export function useAlerts() {
  return useQuery<OutbreakAlert[]>({
    queryKey: ['hantavirus-alerts'],
    queryFn: fetchAlerts,
    staleTime: 5 * 60 * 1000,
    refetchInterval: 2 * 60 * 1000,
  });
}
