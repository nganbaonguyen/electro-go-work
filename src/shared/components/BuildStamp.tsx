import React, {useEffect, useRef, useState} from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';
import {Ionicons} from '@react-native-vector-icons/ionicons/static';
import {icons} from '../../assets/icons';
import {getBuildInfo} from '../../config/build';
import {colors, radius, spacing, typography} from '../theme';

/** Hiện nhãn bao lâu (ms) rồi mờ dần. */
const VISIBLE_MS = 5000;
const FADE_MS = 400;

/**
 * Nhãn phiên bản bundle ở CHÂN mọi màn hình trong mini app (đặt cuối MiniNavigator), nằm ngay trên các nút điều hướng
 * của Android (host đã chừa khoảng trống thanh điều hướng, xem MiniAppHost trong RootNavigator):
 * "Phiên bản bundle 0.1.0 (3)" với 0.1.0 là version trong package.json, (3) là số lần build.
 * Số build tăng mỗi lần `pnpm build` nên nhìn là biết app đã nạp đúng gói tar mới upload chưa.
 * Hiện khi mở màn hình rồi mờ dần sau 5 giây; chỗ của nhãn được giữ cố định nên nội dung không bị nhảy.
 */
export default function BuildStamp() {
  const {version, number} = getBuildInfo();
  const opacity = useRef(new Animated.Value(1)).current;
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(opacity, {toValue: 0, duration: FADE_MS, useNativeDriver: true}).start(() =>
        setMounted(false),
      );
    }, VISIBLE_MS);
    return () => clearTimeout(timer);
  }, [opacity]);

  const label = version
    ? `Phiên bản bundle ${version}${number > 0 ? ` (${number})` : ''}`
    : 'Bản phát triển';

  return (
    <View style={styles.wrap} pointerEvents="none">
      {mounted && (
        <Animated.View style={[styles.pill, {opacity}]}>
          <Ionicons name={icons.bundle} size={14} color={colors.primary} />
          <Text style={styles.text}>{label}</Text>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  // Chiều cao cố định (pill + padding) để chỗ này không co lại khi nhãn ẩn
  wrap: {height: 34, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background},
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs + 2,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 1,
    borderRadius: radius.pill,
    backgroundColor: colors.iconTile,
  },
  text: {...typography.caption, color: colors.primary, fontWeight: '600'},
});
