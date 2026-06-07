/**
 * Base imports.
 */
import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, BORDER_RADIUS, SPACING, SHADOWS } from '../styles/theme';

/**
 * Componente interactivo Bottom Sheet (Modal Deslizable).
 * Se superpone de forma flotante mostrando 3 pestañas principales de datos
 * acerca de la Federación.
 * 
 * @param {Object} props - Propiedades del modal.
 * @param {boolean} props.visible - Dicta el flag para mostrar u ocultar el renderizado nativo.
 * @param {function} props.onClose - Disparador callback invocado para emitir un evento de cierre.
 * @returns {JSX.Element} Panel Modal y sus sub-interfaces.
 */
export default function DetailModal({ visible, onClose }) {
  /**
   * Estado de la Pestaña Activa.
   * Valores predefinidos: 'plantilla' | 'partidos' | 'logros'
   * @type {[string, function]}
   */
  const [activeTab, setActiveTab] = useState('plantilla');

  /**
 * Data Real Actualizada (Array de jugadores).
 * @type {Array<Object>}
 */
  const squad = [
    { name: 'Moisés Caicedo', position: 'Centrocampista', club: 'Chelsea FC (ING)', number: '23' },
    { name: 'Piero Hincapié', position: 'Defensa Central', club: 'Arsenal FC (ING)', number: '3' },
    { name: 'Enner Valencia', position: 'Delantero / Capitán', club: 'CF Pachuca (MEX)', number: '13' },
    { name: 'Willian Pacho', position: 'Defensa Central', club: 'Paris Saint-Germain (FRA)', number: '6' },
    { name: 'Kendry Páez', position: 'Mediapunta', club: 'CA River Plate (ARG)', number: '10' },
    { name: 'Pervis Estupiñán', position: 'Lateral Izquierdo', club: 'Brighton & Hove Albion (ING)', number: '7' },
  ];

  /**
   * Data Histórica (Resultados de partidos ya disputados).
   * @type {Array<Object>}
   */
  const matches = [
    { opponent: 'Bolivia', location: 'Estadio Monumental (Guayaquil)', date: '14 de Nov, 2024', type: 'Local', result: '4-0' },
    { opponent: 'Colombia', location: 'Estadio Metropolitano (Barranquilla)', date: '19 de Nov, 2024', type: 'Visitante', result: '1-0' },
    { opponent: 'Venezuela', location: 'Estadio R. Paz Delgado (Quito)', date: '21 de Mar, 2025', type: 'Local', result: '2-1' },
    { opponent: 'Chile', location: 'Estadio Nacional (Santiago)', date: '25 de Mar, 2025', type: 'Visitante', result: '0-0' },
  ];

  /**
   * Data Mock Estática (Array de Logros mundialistas).
   * @type {Array<Object>}
   */
  const achievements = [
    { title: 'Clasificación Mundial Qatar 2022', desc: 'Fase de grupos. Victoria histórica 2-0 frente al anfitrión Qatar.' },
    { title: 'Clasificación Mundial Brasil 2014', desc: 'Fase de grupos. Conducción técnica por Reinaldo Rueda.' },
    { title: 'Clasificación Mundial Alemania 2006', desc: 'Octavos de Final. Mejor participación histórica cayendo 1-0 ante Inglaterra.' },
    { title: 'Clasificación Mundial Corea-Japón 2002', desc: 'Primera clasificación histórica de la mano de Hernán Darío "Bolillo" Gómez.' },
  ];

  /**
   * Inyector de sub-vistas (Conditional Rendering).
   * Genera JSX específico en base a la pestaña seleccionada actualmente.
   * 
   * @returns {JSX.Element|null} Contenido interno mapeado para ScrollView.
   */
  const renderContent = () => {
    switch (activeTab) {
      case 'plantilla':
        return (
          <View>
            <Text style={styles.sectionHeading}>Figuras Destacadas</Text>
            {squad.map((player, idx) => (
              <View key={idx} style={styles.playerCard}>
                <View style={styles.playerNumCircle}>
                  <Text style={styles.playerNum}>{player.number}</Text>
                </View>
                <View style={styles.playerDetails}>
                  <Text style={styles.playerName}>{player.name}</Text>
                  <Text style={styles.playerSub}>{player.position} • {player.club}</Text>
                </View>
                <Ionicons name="shirt-outline" size={20} color={COLORS.secondary} />
              </View>
            ))}
          </View>
        );
      case 'partidos':
        return (
          <View>
            <Text style={styles.sectionHeading}>Camino al Mundial 2026</Text>
            {matches.map((match, idx) => (
              <View key={idx} style={styles.matchCard}>
                <View style={styles.matchMeta}>
                  <View style={[
                    styles.tag,
                    { backgroundColor: match.type === 'Local' ? COLORS.yellowMuted : COLORS.blueMuted }
                  ]}>
                    <Text style={[
                      styles.tagText,
                      { color: match.type === 'Local' ? '#D4A000' : COLORS.secondary }
                    ]}>
                      {match.type}
                    </Text>
                  </View>
                  <Text style={styles.matchDate}>{match.date}</Text>
                </View>
                <Text style={styles.matchTitle}>Ecuador vs. {match.opponent}</Text>
                <View style={styles.matchLocationRow}>
                  <Ionicons name="location-outline" size={14} color={COLORS.textMuted} />
                  <Text style={styles.matchLocation}>{match.location}</Text>
                </View>
              </View>
            ))}
          </View>
        );
      case 'logros':
        return (
          <View>
            <Text style={styles.sectionHeading}>Hitos Históricos</Text>
            {achievements.map((achievement, idx) => (
              <View key={idx} style={styles.logroCard}>
                <View style={styles.logroHeader}>
                  <Ionicons name="trophy" size={20} color={COLORS.primary} style={{ marginRight: SPACING.sm }} />
                  <Text style={styles.logroTitle}>{achievement.title}</Text>
                </View>
                <Text style={styles.logroDesc}>{achievement.desc}</Text>
              </View>
            ))}
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      {/* Máscara de oscurecimiento de fondo */}
      <View style={styles.overlay}>

        {/* Envoltorio simulando un panel inferior (Bottom Sheet) */}
        <View style={styles.sheetContainer}>
          {/* Header Drag Bar (Decorativo visual) */}
          <View style={styles.dragIndicator} />

          {/* Modal Header: Títulos y botón de cierre */}
          <View style={styles.modalHeader}>
            <View>
              <Text style={styles.modalTitle}>Información Ampliada</Text>
              <Text style={styles.modalSubtitle}>Detalles de la Selección</Text>
            </View>
            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <Ionicons name="close" size={24} color={COLORS.textDark} />
            </TouchableOpacity>
          </View>

          {/* Tab Selector: Pestañas interactivas */}
          <View style={styles.tabBar}>
            <TouchableOpacity
              onPress={() => setActiveTab('plantilla')}
              style={[styles.tabItem, activeTab === 'plantilla' && styles.activeTabItem]}
            >
              <Ionicons
                name="people"
                size={18}
                color={activeTab === 'plantilla' ? COLORS.secondary : COLORS.textMuted}
              />
              <Text style={[styles.tabLabel, activeTab === 'plantilla' && styles.activeTabLabel]}>
                Plantilla
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setActiveTab('partidos')}
              style={[styles.tabItem, activeTab === 'partidos' && styles.activeTabItem]}
            >
              <Ionicons
                name="calendar"
                size={18}
                color={activeTab === 'partidos' ? COLORS.secondary : COLORS.textMuted}
              />
              <Text style={[styles.tabLabel, activeTab === 'partidos' && styles.activeTabLabel]}>
                Partidos
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setActiveTab('logros')}
              style={[styles.tabItem, activeTab === 'logros' && styles.activeTabItem]}
            >
              <Ionicons
                name="trophy"
                size={18}
                color={activeTab === 'logros' ? COLORS.secondary : COLORS.textMuted}
              />
              <Text style={[styles.tabLabel, activeTab === 'logros' && styles.activeTabLabel]}>
                Logros
              </Text>
            </TouchableOpacity>
          </View>

          {/* Scrollable Content: Renderiza lista infinita o contenedores en base al activo */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {renderContent()}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    justifyContent: 'flex-end',
  },
  sheetContainer: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: BORDER_RADIUS.xl,
    borderTopRightRadius: BORDER_RADIUS.xl,
    height: '75%',
    width: '100%',
    paddingTop: SPACING.sm,
    ...SHADOWS.premium,
  },
  dragIndicator: {
    width: 45,
    height: 5,
    backgroundColor: '#CBD5E1',
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: SPACING.md,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.secondary,
  },
  modalSubtitle: {
    fontSize: 13,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: COLORS.cardBg,
    marginHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
    padding: 4,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  tabItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: BORDER_RADIUS.sm,
    gap: 6,
  },
  activeTabItem: {
    backgroundColor: COLORS.blueMuted,
  },
  tabLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textMuted,
  },
  activeTabLabel: {
    color: COLORS.secondary,
    fontWeight: '700',
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl * 2,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: SPACING.md,
    letterSpacing: 0.5,
  },
  playerCard: {
    backgroundColor: COLORS.cardBg,
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  playerNumCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  playerNum: {
    color: COLORS.secondary,
    fontWeight: '800',
    fontSize: 14,
  },
  playerDetails: {
    flex: 1,
  },
  playerName: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  playerSub: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  matchCard: {
    backgroundColor: COLORS.cardBg,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  matchMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: BORDER_RADIUS.sm,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '700',
  },
  matchDate: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
  matchTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: 6,
  },
  matchLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  matchLocation: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
  logroCard: {
    backgroundColor: COLORS.cardBg,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  logroHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  logroTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.secondary,
    flex: 1,
  },
  logroDesc: {
    fontSize: 12,
    color: COLORS.textMuted,
    lineHeight: 18,
    paddingLeft: 28,
  },
});
