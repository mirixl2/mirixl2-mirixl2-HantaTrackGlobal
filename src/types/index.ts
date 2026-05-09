// ─── Case data types (aligned with WHO GHO OData structure) ───

export interface HantavirusCase {
  id: string;
  country: string;
  countryCode: string;
  region: Region;
  lat: number;
  lng: number;
  confirmedCases: number;
  deaths: number;
  caseFatalityRate: number;
  lastUpdated: string;
  source: DataSource;
  strain: string;
  year: number;
}

export type Region = 'Americas' | 'Europe' | 'Asia-Pacific' | 'Africa' | 'Global';

export type DataSource = 'WHO-GHO' | 'CDC-Socrata' | 'PAHO-PLISA' | 'ECDC' | 'National';

export interface CaseFilters {
  year: number | 'all';
  region: Region | 'Global';
}

// ─── News types (aligned with NewsAPI / ProMED-mail structure) ───

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  source: string;
  sourceUrl: string;
  publishedAt: string;
  imageUrl?: string;
  category: 'outbreak' | 'research' | 'policy' | 'alert';
}

// ─── Statistics summary ───

export interface StatsOverview {
  totalCases: number;
  totalDeaths: number;
  caseFatalityRate: number;
  countriesAffected: number;
  lastUpdated: string;
  trendCases: number; // percentage change
  trendDeaths: number;
}

// ─── Monthly trend data ───

export interface MonthlyTrend {
  month: string;
  cases: number;
  deaths: number;
}

// ─── Country ranking ───

export interface CountryRanking {
  country: string;
  countryCode: string;
  totalCases: number;
  totalDeaths: number;
  caseFatalityRate: number;
  region: Region;
}

// ─── Outbreak alert ───

export interface OutbreakAlert {
  id: string;
  severity: 'critical' | 'warning' | 'info';
  title: string;
  message: string;
  region: string;
  timestamp: string;
}

// ─── Theme ───

export type ThemeMode = 'dark' | 'light';
