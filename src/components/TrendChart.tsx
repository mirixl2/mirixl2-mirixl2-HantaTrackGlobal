import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { MonthlyTrend } from '../types';

interface TrendChartProps {
  data: MonthlyTrend[] | undefined;
  isLoading: boolean;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; dataKey: string; color: string }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  const { t } = useTranslation();

  if (!active || !payload) return null;

  return (
    <div className="glass rounded-xl px-3 py-2.5 border border-white/[0.08] shadow-xl">
      <p className="text-[11px] font-semibold text-surface-200 mb-1.5">{t(`trends.months.${label}`, { defaultValue: label })} 2026</p>
      {payload.map((entry) => (
        <div key={entry.dataKey} className="flex items-center gap-2 text-[11px]">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-surface-400">
            {entry.dataKey === 'cases' ? t('trends.cases') : t('trends.deaths')}:
          </span>
          <span className="font-semibold text-surface-100">
            {entry.value.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function TrendChart({ data, isLoading }: TrendChartProps) {
  const { t } = useTranslation();

  if (isLoading || !data) {
    return <div className="shimmer h-full rounded-xl" />;
  }

  return (
    <div className="h-full rounded-xl bg-white/[0.02] border border-white/[0.06] p-4 flex flex-col">
      <div className="flex items-center gap-2 mb-3">
        <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary-500/15">
          <TrendingUp className="w-3.5 h-3.5 text-primary-400" />
        </div>
        <div>
          <h3 className="text-xs font-semibold text-surface-100">{t('trends.title')}</h3>
          <p className="text-[10px] text-surface-500">{t('trends.subtitle', { year: '2026' })}</p>
        </div>
      </div>

      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="casesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="deathsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis
              dataKey="month"
              tickFormatter={(value) => t(`trends.months.${value}`, { defaultValue: value })}
              tick={{ fill: '#64748b', fontSize: 10 }}
              axisLine={{ stroke: 'rgba(255,255,255,0.06)' }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: '#64748b', fontSize: 10 }}
              axisLine={{ stroke: 'rgba(255,255,255,0.06)' }}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: '10px', paddingTop: '8px' }}
              formatter={(value: string) => (
                <span className="text-surface-400 text-[10px]">
                  {value === 'cases' ? t('trends.cases') : t('trends.deaths')}
                </span>
              )}
            />
            <Area
              type="monotone"
              dataKey="cases"
              stroke="#3b82f6"
              strokeWidth={2}
              fill="url(#casesGradient)"
              dot={false}
              activeDot={{ r: 4, fill: '#3b82f6', stroke: '#1e40af', strokeWidth: 2 }}
            />
            <Area
              type="monotone"
              dataKey="deaths"
              stroke="#ef4444"
              strokeWidth={2}
              fill="url(#deathsGradient)"
              dot={false}
              activeDot={{ r: 4, fill: '#ef4444', stroke: '#991b1b', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
