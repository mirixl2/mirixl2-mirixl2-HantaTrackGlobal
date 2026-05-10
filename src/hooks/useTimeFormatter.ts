import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Custom hook that provides a locale-aware relative time formatter.
 * Encapsulates the i18n translation function internally so consumers
 * only need to pass a date string.
 */
export function useTimeFormatter() {
  const { t, i18n } = useTranslation();

  const formatTimeAgo = useCallback(
    (dateString: string): string => {
      const now = new Date();
      const date = new Date(dateString);
      const diffMs = now.getTime() - date.getTime();
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      const diffDays = Math.floor(diffHours / 24);

      if (diffDays > 7)
        return date.toLocaleDateString(
          i18n.language === 'es' ? 'es-ES' : 'en-US',
          { month: 'short', day: 'numeric' },
        );
      if (diffDays > 0) return t('news.daysAgo', { count: diffDays });
      if (diffHours > 0) return t('news.hoursAgo', { count: diffHours });
      return t('news.justNow');
    },
    [t, i18n.language],
  );

  return { formatTimeAgo };
}
