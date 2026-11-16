import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, radius, spacing, typography} from '../theme';

type Props = {
  greeting: string;
  title: string;
  subtitle: string;
};

/** Thẻ chào ở đầu màn hình trung tâm của mini app: nền xanh, hai vòng tròn mờ trang trí. */
export default function HubHero({greeting, title, subtitle}: Props) {
  return (
    <View style={styles.card}>
      <View style={[styles.glow, styles.glowLarge]} />
      <View style={[styles.glow, styles.glowSmall]} />
      <Text style={styles.greeting}>{greeting}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    padding: spacing.xl,
    overflow: 'hidden',
  },
  glow: {position: 'absolute', borderRadius: radius.pill, backgroundColor: colors.primaryLight, opacity: 0.35},
  glowLarge: {width: 150, height: 150, top: -60, right: -40},
  glowSmall: {width: 90, height: 90, bottom: -40, right: 60},
  greeting: {...typography.caption, color: 'rgba(255,255,255,0.78)'},
  title: {...typography.headline, color: colors.textOnPrimary, marginTop: spacing.xs},
  subtitle: {...typography.body, color: 'rgba(255,255,255,0.78)', marginTop: spacing.sm},
});
