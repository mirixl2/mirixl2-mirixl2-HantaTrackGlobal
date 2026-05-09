# HantaTrack Global 🦠🌍

![HantaTrack Global](https://img.shields.io/badge/Status-Active-success)
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Vite](https://img.shields.io/badge/Vite-5-purple)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8)
![i18n](https://img.shields.io/badge/i18n-Español_|_English-orange)

HantaTrack Global es una aplicación web (SPA) diseñada bajo estándares médicos (*medical-grade*) para la vigilancia, monitorización y seguimiento interactivo de brotes de Hantavirus a nivel mundial.

Este dashboard interactivo proporciona visualización en tiempo real (simulada) de casos globales, un feed de noticias relevantes, paneles educativos y análisis estadístico, todo soportado en una interfaz limpia, responsiva y adaptable tanto en **Modo Oscuro** como en **Modo Claro**.

> **Nota Legal:** Los datos presentados en esta aplicación son estrictamente simulados con fines de demostración, pruebas y propósitos educativos. No deben usarse para tomar decisiones clínicas o de salud pública reales.

## ✨ Características Principales

*   🗺️ **Mapa Epidemiológico Interactivo:**
    *   Visualización espacial de casos utilizando Leaflet y mapas de CartoDB (Dark/Light).
    *   Popups detallados con banderas, severidad, letalidad, y desgloses de casos y fallecidos.
*   📈 **Análisis Estadístico Avanzado:**
    *   **Gráfico de Tendencias:** Evolución de casos y muertes mensuales visualizadas con `recharts`.
    *   **Ranking Top 8:** Pizarra dinámica que muestra los países más afectados con barras de progreso relativas.
*   🔔 **Sistema de Alertas (AlertBanner):**
    *   Notificaciones expandibles urgentes categorizadas por gravedad (Crítico, Advertencia, Información).
*   📰 **Feed de Noticias en Vivo:**
    *   Simulación de reportes y noticias del ámbito sanitario (ProMED, OMS, CDC) con indicadores de tiempo relativos.
*   🌍 **Soporte Multiidioma (i18n):**
    *   Soporte nativo en Español (por defecto) e Inglés mediante `react-i18next`. Intercambio sin recarga.
*   💡 **Educación Médica Integrada:**
    *   Panel informativo completo sobre el virus: síntomas, transmisión, factores de riesgo y principales cepas (Andes, Sin Nombre, Puumala, Hantaan, Seoul).
*   💾 **Exportación de Datos CSV:**
    *   Botón integrado que extrae la información filtrada y la formatea de manera segura y compatible con Excel.

## 🛠️ Stack Tecnológico

*   **Core:** React 18 + Vite + TypeScript.
*   **Estilos:** Tailwind CSS v4 para arquitectura basada en utilidades.
*   **Gestión de Estado y Fetching:** TanStack Query (React Query) para caché y refresco.
*   **Visualización de Mapas:** `react-leaflet` + `leaflet`.
*   **Gráficos:** `recharts`.
*   **Internacionalización:** `i18next` + `react-i18next`.
*   **Iconografía:** `lucide-react`.

## 🚀 Instalación y Uso Local

Para correr este proyecto en tu entorno de desarrollo, asegúrate de tener [Node.js](https://nodejs.org/) instalado.

1. **Clona este repositorio:**
   ```bash
   git clone https://github.com/TU_USUARIO/hantatrack-global.git
   cd hantatrack-global
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **Inicia el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

4. **Abre la aplicación:**
   Visita `http://localhost:5173` en tu navegador de preferencia.

## 📦 Script de Construcción (Build)

Para generar la versión optimizada para producción:

```bash
npm run build
```
La carpeta `dist/` contendrá los archivos listos para ser desplegados en plataformas como Vercel, Netlify o GitHub Pages.

## 📁 Estructura del Proyecto

```text
src/
├── components/       # Componentes React modulares (UI, Gráficos, Mapas)
├── data/             # Generadores de datos simulados y lógica de exportación CSV
├── hooks/            # Custom hooks de React (fetch con TanStack Query)
├── i18n/             # Configuración i18next y diccionarios de idiomas (ES/EN)
├── types/            # Interfaces de TypeScript (Modelos de datos epidemiológicos)
├── App.tsx           # Layout principal y control del estado global
├── index.css         # Importación de Tailwind y animaciones/efectos CSS personalizados
└── main.tsx          # Punto de entrada de la aplicación
```

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Si deseas mejorar HantaTrack Global:
1. Haz un *Fork* del repositorio.
2. Crea una rama para tu feature (`git checkout -b feature/NuevaFuncionalidad`).
3. Haz *Commit* a tus cambios (`git commit -m 'Añadir NuevaFuncionalidad'`).
4. Haz *Push* a la rama (`git push origin feature/NuevaFuncionalidad`).
5. Abre un **Pull Request**.

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - mira el archivo [LICENSE](LICENSE) para más detalles.

---
*Desarrollado para demostración técnica en vigilancia epidemiológica.*
