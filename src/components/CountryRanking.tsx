import { Trophy, Skull, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { CountryRanking } from '../types';

interface CountryRankingPanelProps {
  rankings: CountryRanking[] | undefined;
  isLoading: boolean;
}

// Convert country code to flag emoji
function getFlagEmoji(countryCode: string): string {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 0x1f1e6 + char.charCodeAt(0) - 65);
  return String.fromCodePoint(...codePoints);
}

const regionLabels: Record<string, string> = {
  'Americas': 'Américas',
  'Europe': 'Europa',
  'Asia-Pacific': 'Asia-Pacífico',
  'Africa': 'África',
  'Global': 'Global',
};

export default function CountryRankingPanel({ rankings, isLoading }: CountryRankingPanelProps) {
  const { t } = useTranslation();

  if (isLoading || !rankings) {
    return <div className="shimmer h-full rounded-xl" />;
  }

  const maxCases = rankings[0]?.totalCases || 1;
  const top8 = rankings.slice(0, 8);

  return (
    <div className="h-full rounded-xl bg-white/[0.02] border border-white/[0.06] p-4 flex flex-col">
      <div className="flex items-center gap-2 mb-3">
        <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-warning-500/15">
          <Trophy className="w-3.5 h-3.5 text-warning-400" />
        </div>
        <div>
          <h3 className="text-xs font-semibold text-surface-100">{t('ranking.title')}</h3>
          <p className="text-[10px] text-surface-500">{t('ranking.subtitle')}</p>
        </div>
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto">
        {top8.map((country, idx) => {
          const barWidth = (country.totalCases / maxCases) * 100;
          const medalColors = ['text-yellow-400', 'text-surface-300', 'text-amber-600'];

          return (
            <div
              key={country.countryCode}
              className="group animate-fade-in"
              style={{ animationDelay: `${idx * 60}ms` }}
            >
              <div className="flex items-center gap-2 mb-1">
                {/* Position */}
                <span className={`text-xs font-bold w-5 text-center ${idx < 3 ? medalColors[idx] : 'text-surface-500'}`}>
                  {idx + 1}
                </span>

                {/* Flag + Country */}
                <span className="text-sm">{getFlagEmoji(country.countryCode)}</span>
                <span className="text-[11px] font-semibold text-surface-200 flex-1 truncate">
                  {t(`mockData.countries.${country.countryCode}`, { defaultValue: country.country })}
                </span>

                {/* Region */}
                <span className="text-[9px] text-surface-500 hidden sm:block">
                  {t(`filters.regions.${country.region}`, { defaultValue: regionLabels[country.region] || country.region })}
                </span>

                {/* Cases */}
                <div className="flex items-center gap-1 text-[11px] text-primary-400 font-semibold">
                  <Users className="w-3 h-3" />
                  {country.totalCases.toLocaleString()}
                </div>

                {/* Deaths */}
                <div className="flex items-center gap-1 text-[11px] text-danger-400 font-medium w-12 justify-end">
                  <Skull className="w-3 h-3" />
                  {country.totalDeaths}
                </div>
              </div>

              {/* Progress bar */}
              <div className="ml-7 h-1 rounded-full bg-white/[0.04] overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{
                    width: `${barWidth}%`,
                    background: idx === 0
                      ? 'linear-gradient(90deg, #ef4444, #f59e0b)'
                      : idx < 3
                        ? 'linear-gradient(90deg, #f59e0b, #3b82f6)'
                        : 'linear-gradient(90deg, #3b82f6, #14b8a6)',
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend footer */}
      <div className="flex items-center gap-4 pt-3 mt-2 border-t border-white/[0.06]">
        <div className="flex items-center gap-1 text-[10px] text-surface-500">
          <Users className="w-3 h-3 text-primary-400" />
          <span>{t('ranking.cases')}</span>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-surface-500">
          <Skull className="w-3 h-3 text-danger-400" />
          <span>{t('ranking.deaths')}</span>
        </div>
      </div>
    </div>
  );
}
