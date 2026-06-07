/**
 * Unified theme tokens for the "La Tri" application.
 * Follows the brand guidelines of the Selección Ecuatoriana de Fútbol.
 */

export const COLORS = {
  // Brand colors
  primary: '#FFCC00',   // Flag Yellow (Amarillo)
  secondary: '#003DA5', // Flag Blue (Azul)
  accent: '#CE1126',    // Flag Red (Rojo)
  
  // Backgrounds
  background: '#F4F6FA',
  cardBg: '#FFFFFF',
  
  // Text Colors
  textDark: '#121212',
  textMuted: '#5C6470',
  textLight: '#FFFFFF',
  textBlue: '#003DA5',
  
  // Accent helpers
  yellowMuted: '#FFF8E1',
  blueMuted: '#E1E9F6',
  redMuted: '#FDECEE',
  border: '#E2E8F0',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
};

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

export const BORDER_RADIUS = {
  sm: 8,
  md: 12,
  lg: 20,
  xl: 30,
  round: 9999,
};
