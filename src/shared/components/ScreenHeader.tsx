import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {Ionicons} from '@react-native-vector-icons/ionicons/static';
import {icons} from '../../assets/icons';
import {images} from '../../assets/images';
import {colors, spacing, typography} from '../theme';

type Props = {
  title: string;
  /** Có thì hiện nút quay lại; không có thì hiện logo (màn gốc của mini app). */
  onBack?: () => void;
};

export default function ScreenHeader({title, onBack}: Props) {
  return (
    <View style={styles.bar}>
      {onBack ? (
        <Pressable
          onPress={onBack}
          hitSlop={10}
          accessibilityRole="button"
          accessibilityLabel="Quay lại"
          style={styles.side}>
          <Ionicons name={icons.back} size={24} color={colors.textPrimary} />
        </Pressable>
      ) : (
        <Image source={images.logo} style={styles.logo} />
      )}
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    backgroundColor: colors.surface,
  },
  side: {width: 32, height: 32, justifyContent: 'center'},
  logo: {width: 32, height: 32, borderRadius: 8},
  title: {...typography.title, flex: 1, marginLeft: spacing.md, color: colors.textPrimary},
});
