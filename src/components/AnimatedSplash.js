/**
 * Importaciones de React Native y librerías externas necesarias.
 */
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  Dimensions,
  Easing,
  StatusBar,
} from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { COLORS } from '../styles/theme';

/**
 * Constantes para el manejo de dimensiones de pantalla.
 */
const { width, height } = Dimensions.get('window');

/**
 * Convertimos el componente SVG Circle en un componente animable por React Native.
 */
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

/**
 * Componente que muestra una animación intro por fases (Splash Screen).
 * Orquesta una línea de tiempo compleja incluyendo fade, stroke circular interactivo,
 * y efectos de latido/zoom.
 * 
 * @param {Object} props - Propiedades del componente
 * @param {function} props.onComplete - Función callback que se invoca cuando la secuencia de animación termina totalmente
 * @returns {JSX.Element} La vista completa animada
 */
export default function AnimatedSplash({ onComplete }) {
  /**
   * Fase actual de la animación.
   * 1 = Pantalla de jugadores
   * 2 = Carga circular de copa, heartbeat y transición final
   * @type {[number, function]}
   */
  const [phase, setPhase] = useState(1);
  
  /** 
   * @type {Animated.Value} Valor para controlar opacidad de la imagen de jugadores (fase 1) 
   */
  const fadePlayers = useRef(new Animated.Value(0)).current;
  
  /** 
   * @type {Animated.Value} Valor para opacidad inicial de la copa y textos (fase 2) 
   */
  const fadeCup = useRef(new Animated.Value(0)).current;
  
  /** 
   * @type {Animated.Value} Progreso de dibujado del borde SVG circular (de 0 a 1) 
   */
  const progress = useRef(new Animated.Value(0)).current;
  
  /** 
   * @type {Animated.Value} Control de escala de la imagen de la copa (latido y zoom final) 
   */
  const scaleCup = useRef(new Animated.Value(1)).current;
  
  /** 
   * @type {Animated.Value} Control de escala para los textos debajo del logo 
   */
  const scaleText = useRef(new Animated.Value(0.9)).current;
  
  /** 
   * @type {Animated.Value} Nivel de opacidad de la capa blanca para transición final suave 
   */
  const fadeWhite = useRef(new Animated.Value(0)).current;
  
  /** 
   * @type {Animated.Value} Traslación vertical del texto (animación de entrada) 
   */
  const translateYText = useRef(new Animated.Value(25)).current;

  /**
   * Parámetros matemáticos para calcular la circunferencia del SVG.
   */
  const RADIUS = 75;
  const STROKE_WIDTH = 6;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

  /**
   * Efecto de carga inicial (Fase 1).
   * Ejecuta la aparición y desaparición de la portada de jugadores.
   */
  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadePlayers, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.delay(1200),
      Animated.timing(fadePlayers, {
        toValue: 0,
        duration: 600,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Finalizada la fase 1, pasamos a la fase 2
      setPhase(2);
    });
  }, []);

  /**
   * Efecto manejador de la Fase 2 y 3.
   * Se dispara cuando el estado 'phase' cambia a 2.
   */
  useEffect(() => {
    if (phase === 2) {
      // Inicio animaciones fase 2 (Aparición de la copa y dibujo del borde circular)
      Animated.parallel([
        Animated.timing(fadeCup, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(translateYText, {
          toValue: 0,
          duration: 700,
          easing: Easing.out(Easing.back(1.4)),
          useNativeDriver: true,
        }),
        Animated.timing(scaleText, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(progress, {
          toValue: 1,
          duration: 2200, // Duración del dibujado completo del borde SVG
          easing: Easing.bezier(0.4, 0.0, 0.2, 1),
          useNativeDriver: false, // El dibujado de SVG ('strokeDashoffset') NO soporta useNativeDriver
        }),
      ]).start(() => {
        // Inicio de Fase 3: Animación "Heartbeat" (latido) seguida de zoom out a la interfaz
        Animated.sequence([
          // Latido: Escala se reduce, crece rápidamente y vuelve al centro
          Animated.timing(scaleCup, {
            toValue: 0.82,
            duration: 160,
            useNativeDriver: true,
          }),
          Animated.timing(scaleCup, {
            toValue: 1.28,
            duration: 160,
            useNativeDriver: true,
          }),
          Animated.timing(scaleCup, {
            toValue: 1.0,
            duration: 140,
            useNativeDriver: true,
          }),
          Animated.delay(100),
          
          // Flash blanco final con crecimiento extremo del elemento
          Animated.parallel([
            Animated.timing(scaleCup, {
              toValue: 16,
              duration: 550,
              easing: Easing.in(Easing.cubic),
              useNativeDriver: true,
            }),
            Animated.timing(fadeWhite, {
              toValue: 1,
              duration: 450,
              easing: Easing.in(Easing.ease),
              useNativeDriver: true,
            }),
          ]),
        ]).start(() => {
          // Finaliza el flujo de Splash y avisa a App.js
          if (onComplete) {
            onComplete();
          }
        });
      });
    }
  }, [phase]);

  /**
   * Interpolación matemática: Convierte progreso 0-1 en valores offset para el SVG.
   * Esto simula visualmente la acción de "dibujar" el círculo perimetralmente.
   */
  const strokeDashoffset = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [CIRCUMFERENCE, 0],
  });

  /**
   * Interpolación de color: Cambia el color del trazo SVG a medida que avanza.
   * Representa los colores patrios: Amarillo -> Azul -> Rojo.
   */
  const strokeColor = progress.interpolate({
    inputRange: [0, 0.45, 0.9, 1],
    outputRange: [COLORS.primary, COLORS.secondary, COLORS.accent, COLORS.accent],
  });

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#002E80" barStyle="light-content" />

      {phase === 1 ? (
        // Contenedor Fase 1: Portada y Jugadores
        <Animated.View style={[styles.playerContainer, { opacity: fadePlayers }]}>
          <Image
            source={require('../../assets/jugadores_tri.png')}
            style={styles.playerImage}
            resizeMode="cover"
          />
          <View style={styles.darkOverlay} />
          <View style={styles.playersTextContainer}>
            <Text style={styles.subTitleText}>Rumbo a Nuevos Desafíos</Text>
            <Text style={styles.mainTitleText}>LA SELECCIÓN ECUATORIANA</Text>
          </View>
        </Animated.View>
      ) : (
        // Contenedor Fase 2 & 3: Logo Central con Anillo Animado
        <Animated.View style={styles.cupContainer}>
          <View style={styles.ringAndCupContainer}>
            {/* Capa inferior conteniendo el círculo SVG */}
            <View style={styles.svgContainer}>
              <Svg
                width={(RADIUS + STROKE_WIDTH) * 2}
                height={(RADIUS + STROKE_WIDTH) * 2}
                style={styles.svgStyles}
              >
                {/* Pista circular de fondo (Rail) */}
                <Circle
                  cx={RADIUS + STROKE_WIDTH}
                  cy={RADIUS + STROKE_WIDTH}
                  r={RADIUS}
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth={2}
                  fill="transparent"
                />
                {/* Elemento de borde animado */}
                <AnimatedCircle
                  cx={RADIUS + STROKE_WIDTH}
                  cy={RADIUS + STROKE_WIDTH}
                  r={RADIUS}
                  stroke={strokeColor}
                  strokeWidth={STROKE_WIDTH}
                  strokeDasharray={`${CIRCUMFERENCE} ${CIRCUMFERENCE}`}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                  transform={`rotate(-90 ${RADIUS + STROKE_WIDTH} ${RADIUS + STROKE_WIDTH})`}
                />
              </Svg>
            </View>

            {/* Capa superior conteniendo la imagen central (La Copa) */}
            <Animated.View
              style={[
                styles.cupImageFrame,
                {
                  opacity: fadeCup,
                  transform: [{ scale: scaleCup }],
                },
              ]}
            >
              <Image
                source={require('../../assets/copa.png')}
                style={styles.cupImage}
                resizeMode="contain"
              />
            </Animated.View>
          </View>

          {/* Slogan debajo de la copa */}
          <Animated.View
            style={[
              styles.brandTextContainer,
              {
                opacity: fadeCup,
                transform: [
                  { translateY: translateYText },
                  { scale: scaleText }
                ],
              },
            ]}
          >
            <Text style={styles.brandTitle}>Ecuador - La Tri</Text>
            <Text style={styles.brandSubtitle}>Un solo corazón, una sola pasión</Text>
          </Animated.View>
        </Animated.View>
      )}

      {/* Pantalla blanca global para encadenar transición con HomeScreen */}
      <Animated.View
        style={[
          styles.whiteFlash,
          {
            opacity: fadeWhite,
            pointerEvents: phase === 2 ? 'auto' : 'none',
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#002E80', // Azul marino corporativo profundo
    justifyContent: 'center',
    alignItems: 'center',
  },
  playerContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  playerImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 46, 128, 0.45)', // Máscara azul semitransparente
  },
  playersTextContainer: {
    marginBottom: 90,
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  subTitleText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 3,
    textTransform: 'uppercase',
    marginBottom: 8,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  mainTitleText: {
    color: COLORS.textLight,
    fontSize: 26,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: 1,
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  cupContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  ringAndCupContainer: {
    width: 210,
    height: 210,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  svgContainer: {
    position: 'absolute',
    zIndex: 1,
  },
  svgStyles: {
    overflow: 'visible',
  },
  cupImageFrame: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  cupImage: {
    width: '100%',
    height: '100%',
  },
  brandTextContainer: {
    marginTop: 40,
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  brandTitle: {
    color: COLORS.primary,
    fontSize: 34,
    fontWeight: '900',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  brandSubtitle: {
    color: COLORS.textLight,
    fontSize: 16,
    marginTop: 8,
    fontWeight: '500',
    textAlign: 'center',
    opacity: 0.95,
  },
  whiteFlash: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#FFFFFF',
    zIndex: 99,
  },
});
