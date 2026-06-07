/**
 * Importaciones base de React y Native UI.
 */
import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';

/**
 * Importaciones de Íconos vectoriales proveídos mediante Expo.
 */
import { Ionicons } from '@expo/vector-icons';

/**
 * Importaciones de diseño y paleta de colores.
 */
import { COLORS, SHADOWS, BORDER_RADIUS, SPACING } from '../styles/theme';

/**
 * Componente Tarjeta de Información genérico (Reusable).
 * Presenta una caja delineada que muestra un Icono al lado de una métrica textual.
 * Se adapta a un Touchable (y renderiza animaciones) si recibe evento onPress.
 *
 * @param {Object} props - Propiedades enviadas al componente.
 * @param {string} props.icon - Nombre del ícono vector en catálogo Ionicons.
 * @param {string} props.label - Título superior (e.g., 'Confederación').
 * @param {string} props.value - Valor o resultado inferior (e.g., 'CONMEBOL').
 * @param {function} [props.onPress] - Función opcional; Si existe, la tarjeta es cliqueable.
 * @returns {JSX.Element} Vista del InfoCard
 */
export default function InfoCard({ icon, label, value, onPress }) {
  /**
   * Valor para manipular el escalado de este componente bajo interacción táctil.
   * @type {Animated.Value}
   */
  const scaleValue = useRef(new Animated.Value(1)).current;

  /**
   * Callback ejecutado al realizar pulsación (press-down).
   * Reduce el tamaño dando sensación material (feedback).
   */
  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.96,
      useNativeDriver: true,
      speed: 20,
      bounciness: 4,
    }).start();
  };

  /**
   * Callback ejecutado al liberar la pulsación (press-up).
   * Retorna a su tamaño en escala 1.0 (100%).
   */
  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
      bounciness: 4,
    }).start();
  };

  /**
   * Renderizado Condicional de Contenedor (Wrapper)
   * Usa TouchableOpacity si es interactivo, o View simple caso contrario.
   */
  const CardWrapper = onPress ? TouchableOpacity : View;

  return (
    <Animated.View style={[styles.wrapper, { transform: [{ scale: scaleValue }] }]}>
      <CardWrapper
        activeOpacity={0.9}
        onPress={onPress}
        onPressIn={onPress ? handlePressIn : undefined}
        onPressOut={onPress ? handlePressOut : undefined}
        style={styles.card}
      >
        {/* Contenedor Gráfico (Icono) */}
        <View style={styles.iconBox}>
          <Ionicons name={icon} size={22} color={COLORS.secondary} />
        </View>
        
        {/* Bloque Textual Central */}
        <View style={styles.textContainer}>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.value}>{value}</Text>
        </View>

        {/* Muestra chevron direccional sólo en InfoCards interactivos */}
        {onPress && (
          <View style={styles.chevronBox}>
            <Ionicons name="chevron-forward-circle-sharp" size={22} color={COLORS.secondary} />
          </View>
        )}
      </CardWrapper>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    marginBottom: SPACING.md,
  },
  card: {
    backgroundColor: COLORS.cardBg,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    borderLeftWidth: 5, // Acento visual en borde izquierdo
    borderLeftColor: COLORS.primary,
    ...SHADOWS.medium,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.blueMuted,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  value: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textDark,
    marginTop: 3,
  },
  chevronBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
