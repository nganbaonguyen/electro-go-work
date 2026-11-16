import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, spacing, typography} from '../../../shared/theme';
import {formatCurrency} from '../../../shared/utils/formatCurrency';

type Props = {label: string; amount: number; negative?: boolean};

/** Một dòng khoản lương: khoản cộng màu xanh lá có dấu +, khoản trừ màu đỏ có dấu -. */
export default function PayslipRow({label, amount, negative}: Props) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.amount, {color: negative ? colors.danger : colors.success}]}>
        {negative ? '-' : '+'} {formatCurrency(amount)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {flexDirection: 'row', justifyContent: 'space-between', paddingVertical: spacing.md},
  label: {...typography.body, color: colors.textPrimary},
  amount: {...typography.body, fontWeight: '700'},
});
