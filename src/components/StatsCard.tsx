import { Activity, Skull, Percent, Globe, TrendingUp, TrendingDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { StatsOverview } from '../types';

interface StatsCardProps {
  stats: StatsOverview | undefined;
  isLoading: boolean;
}

interface CardData {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: number;
  trendLabel?: string;
  color: string;
  bgGradient: string;
}

export default function StatsCard({ stats, isLoading }: StatsCardProps) {
  const { t } = useTranslation();

  if (isLoading || !stats) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="shimmer h-28 rounded-xl flex items-center justify-center">
            <span className="text-xs text-surface-500 font-medium">{t('stats.loading')}</span>
          </div>
        ))}
      </div>
    );
  }

  const cards: CardData[] = [
    {
      label: t('stats.confirmedCases'),
      value: stats.totalCases.toLocaleString(),
      icon: <Activity className="w-5 h-5" />,
      trend: stats.trendCases,
      trendLabel: 'vs año anterior',
      color: 'text-primary-400',
      bgGradient: 'from-primary-500/10 to-primary-600/5',
    },
    {
      label: t('stats.deaths'),
      value: stats.totalDeaths.toLocaleString(),
      icon: <Skull className="w-5 h-5" />,
      trend: stats.trendDeaths,
      trendLabel: 'vs año anterior',
      color: 'text-danger-400',
      bgGradient: 'from-danger-500/10 to-danger-600/5',
    },
    {
      label: t('stats.cfr'),
      value: `${stats.caseFatalityRate}%`,
      icon: <Percent className="w-5 h-5" />,
      color: 'text-warning-400',
      bgGradient: 'from-warning-500/10 to-warning-600/5',
    },
    {
      label: t('stats.countries'),
      value: stats.countriesAffected,
      icon: <Globe className="w-5 h-5" />,
      color: 'text-accent-400',
      bgGradient: 'from-accent-500/10 to-accent-600/5',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {cards.map((card, idx) => (
        <div
          key={card.label}
          className={`
            relative overflow-hidden rounded-xl
            bg-gradient-to-br ${card.bgGradient}
            border border-white/[0.06] 
            p-4 
            transition-all duration-300 hover:scale-[1.02] hover:border-white/[0.12]
            animate-fade-in
          `}
          style={{ animationDelay: `${idx * 80}ms` }}
        >
          {/* Subtle glow */}
          <div className={`absolute -top-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br ${card.bgGradient} opacity-40 blur-2xl`} />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <span className={`${card.color} opacity-80`}>{card.icon}</span>
              {card.trend !== undefined && (
                <div className={`flex items-center gap-1 text-xs font-medium ${card.trend >= 0 ? 'text-danger-400' : 'text-accent-400'}`}>
                  {card.trend >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  <span>{Math.abs(card.trend)}%</span>
                </div>
              )}
            </div>

            <p className="text-2xl font-bold text-surface-50 tracking-tight">
              {card.value}
            </p>
            <p className="text-xs text-surface-400 mt-1 font-medium uppercase tracking-wider">
              {card.label}
            </p>
          </div>

          {/* Light mode overrides inline */}
          <div className="light-mode-card-overlay hidden" />
        </div>
      ))}
    </div>
  );
}
