import React from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import FeatureGrid from '../../../shared/components/FeatureGrid';
import HubHero from '../../../shared/components/HubHero';
import {colors, spacing, typography} from '../../../shared/theme';
import {MODULES} from '../data/modules';
import {ModuleKey} from '../types';

const pad = (n: number) => String(n).padStart(2, '0');
const WEEKDAYS = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];

type Props = {onOpen: (key: ModuleKey) => void};

export default function HubScreen({onOpen}: Props) {
  const now = new Date();
  const today = `${WEEKDAYS[now.getDay()]}, ${pad(now.getDate())}/${pad(now.getMonth() + 1)}/${now.getFullYear()}`;

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <HubHero
        greeting="Xin chào,"
        title="Nguyễn Bảo Ngân"
        subtitle={`${today}  ·  Ca hôm nay 08:00 - 17:00`}
      />
      <Text style={styles.section}>Chức năng</Text>
      <FeatureGrid items={MODULES} onPress={onOpen} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {padding: spacing.xl},
  section: {...typography.title, color: colors.textPrimary, marginTop: spacing.xxl, marginBottom: spacing.sm},
});
