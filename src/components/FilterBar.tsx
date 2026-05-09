import { Filter, Calendar, Globe2, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { CaseFilters, Region } from '../types';

interface FilterBarProps {
  filters: CaseFilters;
  onFilterChange: (filters: CaseFilters) => void;
}

const years = [2026, 2025, 'all'] as const;
const regions: (Region | 'Global')[] = ['Global', 'Americas', 'Europe', 'Asia-Pacific'];

export default function FilterBar({ filters, onFilterChange }: FilterBarProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex items-center gap-1.5 text-surface-400 mr-1">
        <Filter className="w-3.5 h-3.5" />
        <span className="text-[11px] font-semibold uppercase tracking-wider">{t('filters.title')}</span>
      </div>

      {/* Year filter */}
      <div className="relative">
        <div className="flex items-center gap-1.5 text-surface-500 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
          <Calendar className="w-3.5 h-3.5" />
        </div>
        <select
          id="filter-year"
          value={String(filters.year)}
          onChange={(e) => onFilterChange({
            ...filters,
            year: e.target.value === 'all' ? 'all' : parseInt(e.target.value),
          })}
          className="
            appearance-none pl-8 pr-7 py-1.5
            rounded-lg text-xs font-medium
            bg-white/[0.05] border border-white/[0.08]
            text-surface-200
            hover:bg-white/[0.08] hover:border-white/[0.12]
            focus:outline-none focus:ring-1 focus:ring-primary-500/50 focus:border-primary-500/30
            transition-all duration-200
            cursor-pointer
          "
        >
          {years.map(y => (
            <option key={String(y)} value={String(y)} className="bg-dark-card text-surface-200">
              {y === 'all' ? t('filters.allYears') : y}
            </option>
          ))}
        </select>
        <ChevronDown className="w-3 h-3 text-surface-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>

      {/* Region pills */}
      <div className="flex items-center gap-1">
        <Globe2 className="w-3.5 h-3.5 text-surface-500 mr-0.5" />
        {regions.map(region => (
          <button
            key={region}
            id={`filter-region-${region.toLowerCase().replace(/[^a-z]/g, '')}`}
            onClick={() => onFilterChange({ ...filters, region })}
            className={`
              px-2.5 py-1 rounded-full text-[11px] font-semibold
              transition-all duration-200
              ${filters.region === region
                ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                : 'bg-white/[0.05] text-surface-400 hover:bg-white/[0.08] hover:text-surface-200 border border-white/[0.06]'
              }
            `}
          >
            {t(`filters.regions.${region}`)}
          </button>
        ))}
      </div>
    </div>
  );
}
