import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Info, X, Rat, Droplets, Heart, Shield, Thermometer, AlertTriangle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';

const sections = [
  {
    id: 'what',
    icon: <Info className="w-4 h-4" />,
    title: '¿Qué es el Hantavirus?',
    content: 'Los Hantavirus son una familia de virus transmitidos por roedores que causan enfermedades graves en humanos. Existen dos síndromes principales: el Síndrome Pulmonar por Hantavirus (SPH) en las Américas y la Fiebre Hemorrágica con Síndrome Renal (FHSR) en Europa y Asia.',
    color: 'text-primary-400 bg-primary-500/15',
  },
  {
    id: 'transmission',
    icon: <Rat className="w-4 h-4" />,
    title: 'Transmisión',
    content: 'El contagio ocurre principalmente por inhalación de partículas aerosolizadas de orina, heces o saliva de roedores infectados. También puede transmitirse por contacto directo con materiales contaminados o, en casos excepcionales del virus Andes, de persona a persona.',
    color: 'text-warning-400 bg-warning-500/15',
  },
  {
    id: 'symptoms',
    icon: <Thermometer className="w-4 h-4" />,
    title: 'Síntomas',
    content: 'Los síntomas iniciales incluyen fiebre alta, dolores musculares intensos, dolor de cabeza y malestar gastrointestinal. En la fase cardiopulmonar aparece dificultad respiratoria severa, tos y edema pulmonar. El período de incubación es de 1 a 5 semanas.',
    color: 'text-danger-400 bg-danger-500/15',
  },
  {
    id: 'treatment',
    icon: <Heart className="w-4 h-4" />,
    title: 'Tratamiento',
    content: 'No existe tratamiento antiviral específico ni vacuna aprobada. El manejo es de soporte intensivo: oxigenoterapia, ventilación mecánica y soporte hemodinámico. La detección temprana y el ingreso precoz a UCI mejoran significativamente la supervivencia.',
    color: 'text-accent-400 bg-accent-500/15',
  },
  {
    id: 'prevention',
    icon: <Shield className="w-4 h-4" />,
    title: 'Prevención',
    content: 'Sellar entradas de roedores en viviendas, ventilar espacios cerrados antes de ingresar, usar mascarilla al limpiar áreas con excrementos de roedores, almacenar alimentos en contenedores herméticos y mantener la vegetación corta alrededor de las viviendas.',
    color: 'text-primary-400 bg-primary-500/15',
  },
  {
    id: 'risk',
    icon: <AlertTriangle className="w-4 h-4" />,
    title: 'Factores de Riesgo',
    content: 'Actividades rurales, limpieza de cabañas o graneros cerrados, contacto con roedores silvestres, zonas con alta densidad de roedores, períodos post-lluvias intensas (que incrementan las poblaciones de roedores), y trabajadores agrícolas en zonas endémicas.',
    color: 'text-warning-400 bg-warning-500/15',
  },
  {
    id: 'species',
    icon: <Droplets className="w-4 h-4" />,
    title: 'Principales Cepas',
    content: 'Virus Andes (ANDV) — Argentina/Chile, persona-persona posible. Sin Nombre (SNV) — EE.UU. Puumala (PUUV) — Europa, causa FHSR leve. Hantaan (HTNV) — Asia, causa FHSR severa. Seoul (SEOV) — distribución mundial vía ratas.',
    color: 'text-accent-400 bg-accent-500/15',
  },
];

export default function InfoPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();

  return (
    <>
      {/* Trigger button */}
      <button
        id="info-panel-trigger"
        onClick={() => setIsOpen(true)}
        className="
          flex items-center gap-1.5 px-3 py-1.5
          rounded-lg text-xs font-medium
          bg-white/[0.05] border border-white/[0.08]
          text-surface-300 hover:text-surface-100
          hover:bg-white/[0.08] hover:border-white/[0.12]
          transition-all duration-200
        "
      >
        <Info className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">{t('header.infoPanel')}</span>
      </button>

      {/* Modal overlay */}
      {isOpen && createPortal(
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
            onClick={() => setIsOpen(false)}
          />

          {/* Panel */}
          <div
            className={`
              relative z-10 w-full max-w-2xl max-h-[85vh] overflow-y-auto
              rounded-2xl border shadow-2xl
              animate-fade-in
              ${isDarkMode
                ? 'bg-dark-card border-dark-border'
                : 'bg-white border-surface-200'
              }
            `}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-white/[0.06] bg-inherit">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 shadow-lg shadow-primary-500/20">
                  <Info className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-surface-100">{t('info.title')}</h2>
                  <p className="text-[11px] text-surface-500">{t('info.subtitle')}</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg hover:bg-white/[0.05] transition-all text-surface-500 hover:text-surface-200"
                aria-label="Cerrar panel informativo"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-3">
              {sections.map((section, idx) => (
                <div
                  key={section.id}
                  className="rounded-xl bg-white/[0.02] border border-white/[0.04] p-4 animate-fade-in hover:bg-white/[0.04] transition-all"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className={`inline-flex items-center justify-center w-7 h-7 rounded-lg ${section.color}`}>
                      {section.icon}
                    </span>
                    <h3 className="text-sm font-semibold text-surface-100">{t(`info.sections.${section.id}.title`, { defaultValue: section.title })}</h3>
                  </div>
                  <p className="text-[12px] text-surface-400 leading-relaxed pl-9">
                    {t(`info.sections.${section.id}.content`, { defaultValue: section.content })}
                  </p>
                </div>
              ))}

              {/* Sources */}
              <div className="pt-3 border-t border-white/[0.06]">
                <p className="text-[10px] text-surface-500 text-center">
                  {t('info.disclaimer')}
                </p>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
