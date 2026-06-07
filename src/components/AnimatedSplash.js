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

const { width, height } = Dimensions.get('window');
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function AnimatedSplash({ onComplete }) {
  // Phase 1: Players display, Phase 2: Cup Loading, Heartbeat & Zoom
  const [phase, setPhase] = useState(1);
  
  const fadePlayers = useRef(new Animated.Value(0)).current;
  const fadeCup = useRef(new Animated.Value(0)).current;
  const progress = useRef(new Animated.Value(0)).current;
  const scaleCup = useRef(new Animated.Value(1)).current;
  const scaleText = useRef(new Animated.Value(0.9)).current;
  const fadeWhite = useRef(new Animated.Value(0)).current;
  const translateYText = useRef(new Animated.Value(25)).current;

  // SVG drawing configuration
  const RADIUS = 75;
  const STROKE_WIDTH = 6;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

  useEffect(() => {
    // Start Phase 1 (Players Image presentation)
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
      // Transition to Phase 2 (Cup and Loader)
      setPhase(2);
    });
  }, []);

  useEffect(() => {
    if (phase === 2) {
      // Start Phase 2 animations (Cup fades in, ring draws, and text slides up)
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
          duration: 2200,
          easing: Easing.bezier(0.4, 0.0, 0.2, 1),
          useNativeDriver: false, // SVG dash offset is not native-supported
        }),
      ]).start(() => {
        // Trigger Phase 3 (Heartbeat followed by extreme zoom-in and fade-out to white)
        Animated.sequence([
          // Heartbeat pulse: Scale down ➔ up ➔ back to neutral
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
          // Massive scale up and white flash
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
          // Notify App to load Home
          if (onComplete) {
            onComplete();
          }
        });
      });
    }
  }, [phase]);

  // Map progress to circle drawing stroke dash offset
  const strokeDashoffset = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [CIRCUMFERENCE, 0],
  });

  // Map progress to color transitions of the Ecuatorian flag (Yellow -> Blue -> Red)
  const strokeColor = progress.interpolate({
    inputRange: [0, 0.45, 0.9, 1],
    outputRange: [COLORS.primary, COLORS.secondary, COLORS.accent, COLORS.accent],
  });

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#003DA5" barStyle="light-content" />

      {phase === 1 ? (
        // Phase 1 View: Players fade presentation
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
        // Phase 2 View: Cup with Circular Loading and Header Details
        <Animated.View style={styles.cupContainer}>
          <View style={styles.ringAndCupContainer}>
            {/* SVG circular loading ring */}
            <View style={styles.svgContainer}>
              <Svg
                width={(RADIUS + STROKE_WIDTH) * 2}
                height={(RADIUS + STROKE_WIDTH) * 2}
                style={styles.svgStyles}
              >
                {/* Background Track Circle */}
                <Circle
                  cx={RADIUS + STROKE_WIDTH}
                  cy={RADIUS + STROKE_WIDTH}
                  r={RADIUS}
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth={2}
                  fill="transparent"
                />
                {/* Foreground Animated Circle */}
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

            {/* Cup Graphic (nested inside ring) */}
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
                source={require('../../assets/escudo_ecuador.png')}
                style={styles.cupImage}
                resizeMode="contain"
              />
            </Animated.View>
          </View>

          {/* Slogan details text */}
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

      {/* Transitions to white for smooth scene change */}
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
    backgroundColor: '#002E80', // Rich dark blue matching La Tri color scheme
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
    backgroundColor: 'rgba(0, 46, 128, 0.45)', // Blend color with flag blue
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
