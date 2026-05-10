import { Bug, Sun, Moon, Radio, Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { HantavirusCase } from '../types';
import InfoPanel from './InfoPanel';
import ExportButton from './ExportButton';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  cases: HantavirusCase[] | undefined;
}

export default function Header({ cases }: HeaderProps) {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'es' ? 'en' : 'es');
  };

  return (
    <header className="glass border-b border-white/[0.06] px-4 py-2.5 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-3">
        {/* Logo */}
        <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 shadow-lg shadow-primary-500/20">
          <Bug className="w-5 h-5 text-white" />
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-danger-500 border-2 border-dark-bg animate-pulse" />
        </div>

        <div>
          <h1 className="text-base font-bold tracking-tight">
            <span className="gradient-text">{t('header.title')}</span>
            <span className="text-surface-400 font-medium ml-1">{t('header.subtitle')}</span>
          </h1>
          <div className="flex items-center gap-1.5">
            <Radio className="w-2.5 h-2.5 text-accent-500" />
            <span className="text-[10px] text-surface-500 font-medium uppercase tracking-widest">
              {t('header.livePanel')}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Info panel trigger */}
        <InfoPanel />

        {/* Export CSV */}
        <ExportButton cases={cases} />

        {/* Data freshness indicator */}
        <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent-500/10 border border-accent-500/20">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent-500"></span>
          </span>
          <span className="text-[10px] text-accent-400 font-semibold">{t('header.dataUpdated')}</span>
        </div>

        {/* Language toggle */}
        <button
          onClick={toggleLanguage}
          className="
            flex items-center justify-center w-8 h-8 rounded-lg
            bg-white/[0.05] border border-white/[0.08]
            hover:bg-white/[0.1] hover:border-white/[0.15]
            transition-all duration-200
            text-surface-400 hover:text-surface-200
          "
          aria-label={t('header.switchLanguage')}
        >
          <Languages className="w-4 h-4" />
        </button>

        {/* Theme toggle */}
        <button
          id="theme-toggle"
          onClick={toggleTheme}
          className="
            flex items-center justify-center w-8 h-8 rounded-lg
            bg-white/[0.05] border border-white/[0.08]
            hover:bg-white/[0.1] hover:border-white/[0.15]
            transition-all duration-200
            text-surface-400 hover:text-surface-200
          "
          aria-label={t('header.toggleTheme')}
        >
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
}
