import { useState } from 'react';
import { AlertTriangle, AlertCircle, Info, X, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { OutbreakAlert } from '../types';

interface AlertBannerProps {
  alerts: OutbreakAlert[] | undefined;
  isLoading: boolean;
}

const severityConfig = {
  critical: {
    icon: <AlertTriangle className="w-4 h-4" />,
    bg: 'bg-danger-500/10 border-danger-500/30',
    text: 'text-danger-300',
    badge: 'bg-danger-500 text-white',
    badgeLabel: 'CRÍTICO',
  },
  warning: {
    icon: <AlertCircle className="w-4 h-4" />,
    bg: 'bg-warning-500/10 border-warning-500/30',
    text: 'text-warning-300',
    badge: 'bg-warning-500 text-white',
    badgeLabel: 'ADVERTENCIA',
  },
  info: {
    icon: <Info className="w-4 h-4" />,
    bg: 'bg-primary-500/10 border-primary-500/30',
    text: 'text-primary-300',
    badge: 'bg-primary-500 text-white',
    badgeLabel: 'INFORMACIÓN',
  },
};

export default function AlertBanner({ alerts, isLoading }: AlertBannerProps) {
  const { t } = useTranslation();
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const [expanded, setExpanded] = useState<string | null>(null);

  if (isLoading || !alerts) return null;

  const activeAlerts = alerts.filter(a => !dismissed.has(a.id));
  if (activeAlerts.length === 0) return null;

  return (
    <div className="space-y-1.5 px-3 pt-2">
      {activeAlerts.map((alert, idx) => {
        const config = severityConfig[alert.severity];
        const isExpanded = expanded === alert.id;

        return (
          <div
            key={alert.id}
            className={`
              relative rounded-xl border ${config.bg}
              transition-all duration-300 overflow-hidden
              animate-fade-in
            `}
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            <div className="flex items-center gap-3 px-4 py-2.5">
              <span className={config.text}>{config.icon}</span>

              <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${config.badge}`}>
                {t(`alerts.${alert.severity}`)}
              </span>

              <p className={`flex-1 text-xs font-medium ${config.text} truncate`}>
                {t(`mockData.alerts.${alert.id}.title`, { defaultValue: alert.title })}
              </p>

              <span className="text-[10px] text-surface-500 hidden sm:block">
                {t(`filters.regions.${alert.region}`, { defaultValue: alert.region })}
              </span>

              <button
                onClick={() => setExpanded(isExpanded ? null : alert.id)}
                className={`p-1 rounded-lg hover:bg-white/[0.05] transition-all ${config.text}`}
                aria-label="Expandir alerta"
              >
                <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} />
              </button>

              <button
                onClick={() => setDismissed(prev => new Set(prev).add(alert.id))}
                className="p-1 rounded-lg hover:bg-white/[0.05] transition-all text-surface-500 hover:text-surface-300"
                aria-label="Descartar alerta"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Expanded detail */}
            <div
              className={`
                overflow-hidden transition-all duration-300 ease-in-out
                ${isExpanded ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}
              `}
            >
              <p className="px-4 pb-3 text-[11px] text-surface-400 leading-relaxed">
                {t(`mockData.alerts.${alert.id}.message`, { defaultValue: alert.message })}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
