/**
 * Importaciones del ecosistema de React Native
 */
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  StatusBar,
} from 'react-native';

/**
 * Importación de librería de Iconos nativos
 */
import { Ionicons } from '@expo/vector-icons';

/**
 * Importaciones de diseño y sub-componentes customizados
 */
import { COLORS, BORDER_RADIUS, SPACING, SHADOWS } from '../styles/theme';
import InfoCard from './InfoCard';
import DetailModal from './DetailModal';

/**
 * Componente principal del Dashboard (Home Screen).
 * Muestra el contenido principal de La Tri, integrando banners tipo hero,
 * un resumen de datos básicos (InfoCards) y el enlazador a la ventana modal detallada.
 *
 * @returns {JSX.Element} Vista renderizada de la pantalla de inicio
 */
export default function HomeScreen() {
  /**
   * Visibilidad de la ventana lateral inferio (Bottom Sheet Modal).
   * @type {[boolean, function]}
   */
  const [modalVisible, setModalVisible] = useState(false);
  
  /**
   * Valor para animar la opacidad del cuerpo y listas de tarjetas al montarse
   * @type {Animated.Value}
   */
  const fadeAnim = useRef(new Animated.Value(0)).current;
  
  /**
   * Valor para animar la posición vertical del cuerpo y listas al montarse (Slide-up effect)
   * @type {Animated.Value}
   */
  const slideAnim = useRef(new Animated.Value(45)).current;

  /**
   * Hook de montaje para orquestar la animación fluida de entrada.
   */
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true, // Animación vía API nativa
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      {/* Ajusta estilizacion del StatusBar a tema oscuro */}
      <StatusBar backgroundColor={COLORS.secondary} barStyle="light-content" />
      
      {/* Zona de contenido principal desplazable verticalmente */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Sección Banner Superior (Hero Banner) con imagen de la selección */}
        <View style={styles.heroContainer}>
          <Image
            source={require('../../assets/jugadores_tri.png')}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.heroOverlay} />
          
          <View style={styles.heroTitleFrame}>
            <Text style={styles.heroSubText}>Federación Ecuatoriana de Fútbol</Text>
            <Text style={styles.heroMainText}>LA TRI</Text>
          </View>
        </View>

        {/* Sección Superpuesta: Escudo circular rompiendo bordes del banner */}
        <View style={styles.badgeFrame}>
          <View style={styles.badgeRing}>
            <Image
              source={require('../../assets/escudo_ecuador.png')}
              style={styles.badgeImage}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Sub-sección: Área de tarjetas y detalles con animación de desplazamiento inicial */}
        <Animated.View
          style={[
            styles.cardsArea,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.titleHeader}>
            <Text style={styles.titleText}>Selección Ecuatoriana</Text>
            <Text style={styles.subtitleText}>Ficha de Datos e Historia</Text>
          </View>

          {/* Tarjetas de Información Reutilizables */}
          <InfoCard
            icon="earth-outline"
            label="Confederación"
            value="CONMEBOL"
          />
          <InfoCard
            icon="shirt-outline"
            label="Entrenador Actual"
            value="Sebastián Beccacece"
          />
          <InfoCard
            icon="location-outline"
            label="Estadio Oficial"
            value="Estadio Rodrigo Paz Delgado (Quito)"
          />

          {/* Botón Call to Action para desplegar información detallada extra */}
          <TouchableOpacity
            style={styles.ctaButton}
            onPress={() => setModalVisible(true)}
            activeOpacity={0.85}
          >
            <Ionicons name="information-circle-outline" size={22} color={COLORS.textLight} />
            <Text style={styles.ctaButtonText}>Ver Plantilla y Calendario</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>

      {/* Footer estático flotante o en el borde del renderizado */}
      <View style={styles.brandFooter}>
        <Text style={styles.brandFooterText}>
          Ecuador La Tri • Desarrollado con React Native y Expo Go
        </Text>
      </View>

      {/* Componente Modal que es inyectado encima de las demás vistas */}
      <DetailModal visible={modalVisible} onClose={() => setModalVisible(false)} />
    </View>
  );
}

/**
 * Estilos visuales del Home Screen
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingBottom: SPACING.xl * 2.5,
  },
  heroContainer: {
    height: 230,
    width: '100%',
    position: 'relative',
    backgroundColor: COLORS.secondary,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 46, 128, 0.55)', // Shade of flag blue overlay
  },
  heroTitleFrame: {
    position: 'absolute',
    bottom: 50,
    left: SPACING.lg,
    right: SPACING.lg,
  },
  heroSubText: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  heroMainText: {
    color: COLORS.textLight,
    fontSize: 34,
    fontWeight: '900',
    letterSpacing: 0.5,
    marginTop: 2,
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
  },
  badgeFrame: {
    alignItems: 'center',
    marginTop: -45,
    zIndex: 10,
  },
  badgeRing: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: COLORS.cardBg,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: COLORS.primary,
    ...SHADOWS.premium,
  },
  badgeImage: {
    width: 50,
    height: 50,
  },
  cardsArea: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
  },
  titleHeader: {
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  titleText: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.secondary,
  },
  subtitleText: {
    fontSize: 14,
    color: COLORS.textMuted,
    fontWeight: '500',
    marginTop: 3,
  },
  ctaButton: {
    backgroundColor: COLORS.accent,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: BORDER_RADIUS.lg,
    marginTop: SPACING.sm,
    gap: 8,
    ...SHADOWS.medium,
  },
  ctaButtonText: {
    color: COLORS.textLight,
    fontSize: 16,
    fontWeight: '700',
  },
  brandFooter: {
    position: 'absolute',
    bottom: SPACING.md,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  brandFooterText: {
    fontSize: 11,
    color: COLORS.textMuted,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});
