import { Newspaper, ExternalLink, AlertTriangle, Beaker, FileText, ShieldAlert, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTimeFormatter } from '../hooks/useTimeFormatter';
import type { NewsArticle } from '../types';

interface NewsFeedProps {
  news: NewsArticle[] | undefined;
  isLoading: boolean;
}

const categoryConfig: Record<NewsArticle['category'], { icon: React.ReactNode; color: string; label: string }> = {
  outbreak: { icon: <AlertTriangle className="w-3.5 h-3.5" />, color: 'text-danger-400 bg-danger-500/15', label: 'Brote' },
  research: { icon: <Beaker className="w-3.5 h-3.5" />, color: 'text-primary-400 bg-primary-500/15', label: 'Investigación' },
  policy: { icon: <FileText className="w-3.5 h-3.5" />, color: 'text-accent-400 bg-accent-500/15', label: 'Política' },
  alert: { icon: <ShieldAlert className="w-3.5 h-3.5" />, color: 'text-warning-400 bg-warning-500/15', label: 'Alerta' },
};

// formatTimeAgo logic extracted to src/hooks/useTimeFormatter.ts

export default function NewsFeed({ news, isLoading }: NewsFeedProps) {
  const { t } = useTranslation();
  const { formatTimeAgo } = useTimeFormatter();
  
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-2.5 px-4 py-3 border-b border-white/[0.06]">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary-500/15">
          <Newspaper className="w-4 h-4 text-primary-400" />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-surface-100">{t('news.title')}</h2>
          <p className="text-[10px] text-surface-500 uppercase tracking-wider font-medium">ProMED-mail • WHO • CDC</p>
        </div>
        {/* Live indicator */}
        <div className="ml-auto flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-500"></span>
          </span>
          <span className="text-[10px] text-accent-400 font-semibold uppercase tracking-wider">{t('news.live')}</span>
        </div>
      </div>

      {/* News List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
        {isLoading ? (
          [...Array(5)].map((_, i) => (
            <div
              key={i}
              className="rounded-xl p-3.5 bg-white/[0.03] border border-white/[0.04] space-y-2.5 animate-pulse"
            >
              {/* Category badge + time */}
              <div className="flex items-center justify-between">
                <div className="h-4 w-20 rounded-full bg-white/[0.06]" />
                <div className="h-3 w-14 rounded-full bg-white/[0.04]" />
              </div>
              {/* Title (2 lines) */}
              <div className="h-4 w-full rounded bg-white/[0.06]" />
              <div className="h-4 w-3/4 rounded bg-white/[0.06]" />
              {/* Excerpt */}
              <div className="h-3 w-full rounded bg-white/[0.04]" />
              <div className="h-3 w-5/6 rounded bg-white/[0.04]" />
              {/* Footer */}
              <div className="flex items-center justify-between pt-1">
                <div className="h-3 w-16 rounded bg-white/[0.04]" />
                <div className="h-3 w-3 rounded bg-white/[0.04]" />
              </div>
            </div>
          ))
        ) : (
          news?.map((article, idx) => {
            const cat = categoryConfig[article.category];
            return (
              <a
                key={article.id}
                href={article.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  news-card block rounded-xl p-3.5
                  bg-white/[0.03] border border-white/[0.04]
                  hover:bg-white/[0.06] hover:border-white/[0.1]
                  transition-all duration-300 group
                  animate-fade-in
                "
                style={{ animationDelay: `${idx * 60}ms` }}
              >
                {/* Category badge + time */}
                <div className="flex items-center justify-between mb-2">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${cat.color}`}>
                    {cat.icon}
                    {t(`news.categories.${article.category}`, { defaultValue: cat.label })}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-surface-500">
                    <Clock className="w-3 h-3" />
                    {formatTimeAgo(article.publishedAt)}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-[13px] font-semibold text-surface-100 leading-snug mb-1.5 group-hover:text-primary-300 transition-colors line-clamp-2">
                  {article.title}
                </h3>

                {/* Excerpt */}
                <p className="text-[11px] text-surface-400 leading-relaxed line-clamp-2 mb-2">
                  {article.excerpt}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-surface-500 font-medium">{article.source}</span>
                  <ExternalLink className="w-3 h-3 text-surface-500 group-hover:text-primary-400 transition-colors" />
                </div>
              </a>
            );
          })
        )}
      </div>
    </div>
  );
}
