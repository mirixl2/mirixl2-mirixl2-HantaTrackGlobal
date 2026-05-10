import { useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import { MapPin, Calendar, Database, Bug, Users, Skull } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { HantavirusCase } from '../types';
import 'leaflet/dist/leaflet.css';

interface MapComponentProps {
  cases: HantavirusCase[] | undefined;
  isLoading: boolean;
  isDarkMode: boolean;
}

// Fix Leaflet rendering on mobile: force invalidateSize on mount & resize
function MapResizeHandler() {
  const map = useMap();

  useEffect(() => {
    // Force Leaflet to recalculate container size after mount
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 100);

    // Also invalidate on any subsequent resizes (orientation change, etc.)
    const handleResize = () => {
      map.invalidateSize();
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', () => {
      setTimeout(handleResize, 200);
    });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, [map]);

  return null;
}

// Dynamically adjust map view when cases change
function MapUpdater({ cases }: { cases: HantavirusCase[] | undefined }) {
  const map = useMap();

  useEffect(() => {
    if (cases && cases.length > 0) {
      const bounds = cases.map(c => [c.lat, c.lng] as [number, number]);
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 5 });
    }
  }, [cases, map]);

  return null;
}

// Color scale based on severity
function getCaseColor(cases: number): string {
  if (cases >= 1000) return '#ef4444';   // danger-500
  if (cases >= 100) return '#f59e0b';    // warning-500
  if (cases >= 50) return '#3b82f6';     // primary-500
  return '#14b8a6';                       // accent-500
}

function getCaseRadius(cases: number): number {
  if (cases >= 5000) return 24;
  if (cases >= 1000) return 18;
  if (cases >= 100) return 13;
  if (cases >= 50) return 10;
  return 7;
}

function getSeverityLabel(cases: number): string {
  if (cases >= 1000) return 'Crítico';
  if (cases >= 100) return 'Alto';
  if (cases >= 50) return 'Moderado';
  return 'Bajo';
}

const regionLabelsMap: Record<string, string> = {
  'Americas': 'Américas',
  'Europe': 'Europa',
  'Asia-Pacific': 'Asia-Pacífico',
  'Africa': 'África',
  'Global': 'Global',
};

function getSeverityBadgeColor(cases: number): string {
  if (cases >= 1000) return 'bg-danger-500/20 text-danger-400';
  if (cases >= 100) return 'bg-warning-500/20 text-warning-400';
  if (cases >= 50) return 'bg-primary-500/20 text-primary-400';
  return 'bg-accent-500/20 text-accent-400';
}

// Dark tile layer from CartoDB
const DARK_TILES = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
const LIGHT_TILES = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
const ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>';

export default function MapComponent({ cases, isLoading, isDarkMode }: MapComponentProps) {
  const { t, i18n } = useTranslation();

  if (isLoading) {
    return (
      <div className="w-full h-full rounded-xl shimmer flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 animate-pulse">
          <MapPin className="w-8 h-8 text-surface-600" />
          <span className="text-sm text-surface-500 font-medium">{t('map.loading')}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full rounded-xl overflow-hidden border border-white/[0.06] relative">
      <MapContainer
        center={[20, 0]}
        zoom={2}
        scrollWheelZoom={true}
        dragging={true}
        touchZoom={true}
        tap={false}
        className="w-full h-full"
        zoomControl={true}
        minZoom={2}
        maxBounds={[[-85, -180], [85, 180]]}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url={isDarkMode ? DARK_TILES : LIGHT_TILES}
          attribution={ATTRIBUTION}
        />
        <MapResizeHandler />
        <MapUpdater cases={cases} />

        {cases?.map((caseData) => (
          <CircleMarker
            key={caseData.id}
            center={[caseData.lat, caseData.lng]}
            radius={getCaseRadius(caseData.confirmedCases)}
            pathOptions={{
              color: getCaseColor(caseData.confirmedCases),
              fillColor: getCaseColor(caseData.confirmedCases),
              fillOpacity: 0.35,
              weight: 2,
              opacity: 0.8,
            }}
          >
            <Popup maxWidth={280} minWidth={240}>
                <div className="p-1">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{getFlagEmoji(caseData.countryCode)}</span>
                      <div>
                        <h3 className="text-sm font-bold">{t(`mockData.countries.${caseData.countryCode}`, { defaultValue: caseData.country })}</h3>
                        <p className="text-[10px] text-surface-400 font-medium">
                          {t(`filters.regions.${caseData.region}`, { defaultValue: regionLabelsMap[caseData.region] || caseData.region })}
                        </p>
                      </div>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${getSeverityBadgeColor(caseData.confirmedCases)}`}>
                      {t(`map.severity.${getSeverityLabel(caseData.confirmedCases).toLowerCase().split(' ')[0].replace('í', 'i')}`, { defaultValue: getSeverityLabel(caseData.confirmedCases) })}
                    </span>
                  </div>

                  {/* Stats grid */}
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="bg-white/[0.04] rounded-lg p-2">
                      <div className="flex items-center gap-1 text-primary-400 mb-0.5">
                        <Users className="w-3 h-3" />
                        <span className="text-[10px] font-semibold uppercase">{t('map.popup.cases')}</span>
                      </div>
                      <p className="text-lg font-bold">{caseData.confirmedCases.toLocaleString()}</p>
                    </div>
                    <div className="bg-white/[0.04] rounded-lg p-2">
                      <div className="flex items-center gap-1 text-danger-400 mb-0.5">
                        <Skull className="w-3 h-3" />
                        <span className="text-[10px] font-semibold uppercase">{t('map.popup.deaths')}</span>
                      </div>
                      <p className="text-lg font-bold">{caseData.deaths.toLocaleString()}</p>
                    </div>
                  </div>

                  {/* CFR bar */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] text-surface-400 font-medium">{t('map.popup.cfr')}</span>
                      <span className="text-xs font-bold text-warning-400">{caseData.caseFatalityRate}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min(caseData.caseFatalityRate * 2, 100)}%`,
                          background: `linear-gradient(90deg, #14b8a6, ${caseData.caseFatalityRate > 20 ? '#ef4444' : '#f59e0b'})`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Meta info */}
                  <div className="space-y-1.5 pt-2 border-t border-white/[0.06]">
                    <div className="flex items-center gap-2 text-[11px] text-surface-400">
                      <Bug className="w-3 h-3 text-surface-500" />
                      <span className="font-medium">{caseData.strain}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-surface-400">
                      <Calendar className="w-3 h-3 text-surface-500" />
                      <span>{t('map.popup.updated')} {new Date(caseData.lastUpdated).toLocaleDateString(i18n.language === 'es' ? 'es-ES' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-surface-400">
                      <Database className="w-3 h-3 text-surface-500" />
                      <span>{t('map.popup.source')} <span className="text-primary-400 font-medium">{caseData.source}</span></span>
                    </div>
                  </div>
                </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>

      {/* Map legend */}
      <div className="absolute bottom-4 left-4 z-[1000] glass rounded-xl p-3 space-y-1.5">
        <p className="text-[10px] font-bold text-surface-300 uppercase tracking-wider mb-2">{t('map.severity.title')}</p>
        {[
          { label: t('map.severity.critical'), color: '#ef4444' },
          { label: t('map.severity.high'), color: '#f59e0b' },
          { label: t('map.severity.moderate'), color: '#3b82f6' },
          { label: t('map.severity.low'), color: '#14b8a6' },
        ].map(item => (
          <div key={item.label} className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color, opacity: 0.7 }} />
            <span className="text-[10px] text-surface-400">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Case count overlay */}
      {cases && (
        <div className="absolute top-4 right-4 z-[1000] glass rounded-xl px-3 py-2 flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-primary-400" />
          <span className="text-xs font-semibold text-surface-200">{cases.length} {t('map.locations')}</span>
        </div>
      )}
    </div>
  );
}

// Convert country code to flag emoji
function getFlagEmoji(countryCode: string): string {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 0x1f1e6 + char.charCodeAt(0) - 65);
  return String.fromCodePoint(...codePoints);
}
