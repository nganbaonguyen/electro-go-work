import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import StateView from '../../../shared/components/StateView';
import {colors, radius, spacing, typography} from '../../../shared/theme';
import {formatCurrency} from '../../../shared/utils/formatCurrency';
import MonthSelector from '../components/MonthSelector';
import PayslipRow from '../components/PayslipRow';
import {usePayslip} from '../hooks/usePayslip';
import {PAYSLIP_MONTHS} from '../services/payslipService';
import {netSalary} from '../utils';

export default function PayslipScreen() {
  const [monthsAgo, setMonthsAgo] = useState(0);
  const payslip = usePayslip(monthsAgo);

  const selector = (
    <MonthSelector
      label={payslip.data?.month ?? '...'}
      canPrev={monthsAgo < PAYSLIP_MONTHS - 1}
      canNext={monthsAgo > 0}
      onPrev={() => setMonthsAgo(m => m + 1)}
      onNext={() => setMonthsAgo(m => m - 1)}
    />
  );

  if (payslip.status !== 'ready' || !payslip.data) {
    return (
      <ScrollView contentContainerStyle={styles.content}>
        {selector}
        <StateView
          status={payslip.status === 'error' ? 'error' : 'loading'}
          message={payslip.error}
          onRetry={payslip.reload}
        />
      </ScrollView>
    );
  }

  const p = payslip.data;
  return (
    <ScrollView contentContainerStyle={styles.content}>
      {selector}

      <View style={styles.hero}>
        <Text style={styles.heroCaption}>Thực nhận</Text>
        <Text style={styles.heroValue}>{formatCurrency(netSalary(p))}</Text>
      </View>

      <View style={styles.card}>
        <PayslipRow label="Lương cơ bản" amount={p.base} />
        <View style={styles.divider} />
        <PayslipRow label="Phụ cấp" amount={p.allowance} />
        <View style={styles.divider} />
        <PayslipRow label="Thưởng" amount={p.bonus} />
        <View style={styles.divider} />
        <PayslipRow label="Bảo hiểm" amount={p.insurance} negative />
        <View style={styles.divider} />
        <PayslipRow label="Thuế TNCN" amount={p.tax} negative />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {padding: spacing.xl},
  hero: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    paddingVertical: spacing.xxl,
    marginBottom: spacing.lg,
  },
  heroCaption: {...typography.body, color: 'rgba(255,255,255,0.78)'},
  heroValue: {fontSize: 34, fontWeight: '700', color: colors.textOnPrimary, marginTop: spacing.xs},
  card: {backgroundColor: colors.surface, borderRadius: radius.lg, paddingHorizontal: spacing.lg},
  divider: {height: StyleSheet.hairlineWidth, backgroundColor: colors.divider},
});
