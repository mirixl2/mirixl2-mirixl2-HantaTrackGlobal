import { Download, FileSpreadsheet } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { HantavirusCase } from '../types';
import { exportCasesToCSV } from '../data/mockData';

interface ExportButtonProps {
  cases: HantavirusCase[] | undefined;
}

export default function ExportButton({ cases }: ExportButtonProps) {
  const { t } = useTranslation();

  const handleExport = () => {
    if (!cases || cases.length === 0) return;

    const csv = exportCasesToCSV(cases);
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `hantatrack_datos_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      id="export-csv"
      onClick={handleExport}
      disabled={!cases || cases.length === 0}
      className="
        flex items-center gap-1.5 px-3 py-1.5
        rounded-lg text-xs font-medium
        bg-white/[0.05] border border-white/[0.08]
        text-surface-300 hover:text-surface-100
        hover:bg-white/[0.08] hover:border-white/[0.12]
        transition-all duration-200
        disabled:opacity-40 disabled:cursor-not-allowed
      "
      title={t('header.export')}
    >
      <Download className="w-3.5 h-3.5" />
      <FileSpreadsheet className="w-3.5 h-3.5 hidden sm:block" />
      <span className="hidden sm:inline">{t('header.export')}</span>
    </button>
  );
}
