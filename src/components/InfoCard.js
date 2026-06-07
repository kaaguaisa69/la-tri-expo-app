import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SHADOWS, BORDER_RADIUS, SPACING } from '../styles/theme';

export default function InfoCard({ icon, label, value, onPress }) {
  const scaleValue = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.96,
      useNativeDriver: true,
      speed: 20,
      bounciness: 4,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
      bounciness: 4,
    }).start();
  };

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
        <View style={styles.iconBox}>
          <Ionicons name={icon} size={22} color={COLORS.secondary} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.value}>{value}</Text>
        </View>
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
    borderLeftWidth: 5,
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
