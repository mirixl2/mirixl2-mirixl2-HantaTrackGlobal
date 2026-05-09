import { useState, useCallback } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { CaseFilters, ThemeMode } from './types';
import { useCases, useNews, useStats, useTrends, useRankings, useAlerts } from './hooks/useHantaData';
import Header from './components/Header';
import StatsCard from './components/StatsCard';
import FilterBar from './components/FilterBar';
import MapComponent from './components/MapComponent';
import NewsFeed from './components/NewsFeed';
import AlertBanner from './components/AlertBanner';
import TrendChart from './components/TrendChart';
import CountryRanking from './components/CountryRanking';
import Footer from './components/Footer';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

function Dashboard() {
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [filters, setFilters] = useState<CaseFilters>({ year: 2026, region: 'Global' });

  const { data: cases, isLoading: casesLoading } = useCases(filters);
  const { data: news, isLoading: newsLoading } = useNews();
  const { data: stats, isLoading: statsLoading } = useStats(filters.year);
  const { data: trends, isLoading: trendsLoading } = useTrends();
  const { data: rankings, isLoading: rankingsLoading } = useRankings(filters);
  const { data: alerts, isLoading: alertsLoading } = useAlerts();

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  }, []);

  const isDarkMode = theme === 'dark';

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? '' : 'light-mode'}`}>
      <Header theme={theme} onToggleTheme={toggleTheme} isDarkMode={isDarkMode} cases={cases} />

      {/* Alert banner */}
      <AlertBanner alerts={alerts} isLoading={alertsLoading} />

      {/* Main content */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left: Map + Stats (70% on desktop) */}
        <div className="flex-1 lg:w-[70%] flex flex-col min-h-0 p-3 gap-3">
          {/* Stats row */}
          <StatsCard stats={stats} isLoading={statsLoading} />

          {/* Filters */}
          <FilterBar filters={filters} onFilterChange={setFilters} />

          {/* Map (fills remaining space) */}
          <div className="flex-1 min-h-[300px] lg:min-h-0">
            <MapComponent cases={cases} isLoading={casesLoading} isDarkMode={isDarkMode} />
          </div>

          {/* Charts row — below the map */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 h-[280px] shrink-0">
            <TrendChart data={trends} isLoading={trendsLoading} />
            <CountryRanking rankings={rankings} isLoading={rankingsLoading} />
          </div>
        </div>

        {/* Right: News Feed (30% on desktop) */}
        <aside className="
          lg:w-[30%] lg:max-w-[420px] lg:min-w-[320px]
          h-[50vh] lg:h-auto
          border-t lg:border-t-0 lg:border-l border-white/[0.06]
          bg-white/[0.01]
        ">
          <NewsFeed news={news} isLoading={newsLoading} />
        </aside>
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Dashboard />
    </QueryClientProvider>
  );
}
