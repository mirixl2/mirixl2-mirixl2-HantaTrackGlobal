import { Bug, Heart, Database, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  return (
    <footer className="border-t border-white/[0.06] bg-white/[0.01] mt-auto">
      <div className="max-w-screen-2xl mx-auto px-4 py-4">
        {/* Main footer content */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700">
              <Bug className="w-3 h-3 text-white" />
            </div>
            <span className="text-xs font-semibold text-surface-400">
              HantaTrack Global
            </span>
            <span className="text-[10px] text-surface-600">
              v1.0.0
            </span>
          </div>

          {/* Data sources */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              { name: 'OMS/WHO', url: 'https://who.int' },
              { name: 'CDC', url: 'https://cdc.gov' },
              { name: 'OPS/PAHO', url: 'https://paho.org' },
              { name: 'ECDC', url: 'https://ecdc.europa.eu' },
              { name: 'ProMED', url: 'https://promedmail.org' },
            ].map(source => (
              <a
                key={source.name}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[10px] text-surface-500 hover:text-primary-400 transition-colors"
              >
                <Database className="w-2.5 h-2.5" />
                {source.name}
                <ExternalLink className="w-2 h-2 opacity-50" />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="flex items-center gap-1 text-[10px] text-surface-600">
            <span>© {currentYear} HantaTrack Global</span>
            <span className="text-surface-700">•</span>
            <span className="flex items-center gap-0.5">
              {t('footer.madeWith')} <Heart className="w-2.5 h-2.5 text-danger-500 fill-danger-500" />
            </span>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-3 pt-3 border-t border-white/[0.04]">
          <p className="text-[9px] text-surface-600 text-center leading-relaxed max-w-3xl mx-auto">
            {t('footer.disclaimer')}
          </p>
        </div>
      </div>
    </footer>
  );
}
