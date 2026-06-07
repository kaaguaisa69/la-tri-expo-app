/**
 * Archivo de configuración central de diseño (Theme).
 * Contiene tokens unificados para seguir las directrices de la marca
 * de la Selección Ecuatoriana de Fútbol ("La Tri").
 */

/**
 * Objeto que contiene la paleta de colores oficial.
 * Útil para mantener la consistencia en todos los componentes.
 * 
 * @type {Object}
 */
export const COLORS = {
  // Colores principales de la bandera
  primary: '#FFCC00',   // Flag Yellow (Amarillo)
  secondary: '#003DA5', // Flag Blue (Azul)
  accent: '#CE1126',    // Flag Red (Rojo)
  
  // Colores de fondo generales
  background: '#F4F6FA',
  cardBg: '#FFFFFF',
  
  // Colores de texto jerárquicos
  textDark: '#121212',
  textMuted: '#5C6470',
  textLight: '#FFFFFF',
  textBlue: '#003DA5',
  
  // Colores suavizados (utilizados en fondos de íconos o alertas)
  yellowMuted: '#FFF8E1',
  blueMuted: '#E1E9F6',
  redMuted: '#FDECEE',
  border: '#E2E8F0',
};

/**
 * Sistema estandarizado de espaciado.
 * Facilita el uso consistente de márgenes (margin) y rellenos (padding).
 * 
 * @type {Object}
 */
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
};

/**
 * Sistema estandarizado de sombras y elevación.
 * Útil para dar profundidad tridimensional a tarjetas o botones.
 * 
 * @type {Object}
 */
export const SHADOWS = {
  light: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  medium: {
    shadowColor: '#003DA5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  premium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
};

/**
 * Sistema estandarizado de radios de bordes (redondeo de esquinas).
 * 
 * @type {Object}
 */
export const BORDER_RADIUS = {
  sm: 8,
  md: 12,
  lg: 20,
  xl: 30,
  round: 9999, // Para lograr círculos perfectos
};
