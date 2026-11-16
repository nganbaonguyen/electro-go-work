import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import {Ionicons} from '@react-native-vector-icons/ionicons/static';
import {colors, spacing, typography} from '../../../shared/theme';

type Props = {
  checkedIn: boolean;
  onPress: () => void;
};

/** Nút tròn lớn: xanh khi chưa chấm công vào, cam khi đang trong ca (bấm để chấm công ra). */
export default function CheckInButton({checkedIn, onPress}: Props) {
  const label = checkedIn ? 'Chấm công ra' : 'Chấm công vào';
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({pressed}) => [
        styles.button,
        checkedIn && styles.buttonOut,
        pressed && styles.pressed,
      ]}>
      <Ionicons name="finger-print" size={56} color={colors.textOnPrimary} />
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const SIZE = 168;

const styles = StyleSheet.create({
  button: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonOut: {backgroundColor: colors.accent},
  pressed: {transform: [{scale: 0.96}], opacity: 0.9},
  label: {
    ...typography.body,
    marginTop: spacing.sm,
    color: colors.textOnPrimary,
    fontWeight: '700',
  },
});
