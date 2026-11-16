import React from 'react';
import {StyleSheet, View} from 'react-native';
import {AttendanceScreen, HistoryScreen} from '../../features/attendance';
import ScreenHeader from '../../shared/components/ScreenHeader';
import {useStack} from '../../shared/navigation/useStack';
import {colors} from '../../shared/theme';

/** Danh sách màn hình của mini app. Thêm màn mới: thêm vào Route, TITLES và nhánh render bên dưới. */
type Route = {name: 'attendance'} | {name: 'history'};

const TITLES: Record<Route['name'], string> = {
  attendance: 'Chấm công',
  history: 'Lịch sử chấm công',
};

export default function MiniNavigator() {
  const {current, push, pop, canGoBack} = useStack<Route>({name: 'attendance'});

  return (
    <View style={styles.container}>
      <ScreenHeader title={TITLES[current.name]} onBack={canGoBack ? pop : undefined} />
      {current.name === 'attendance' ? (
        <AttendanceScreen onOpenHistory={() => push({name: 'history'})} />
      ) : (
        <HistoryScreen />
      )}
    </View>
  );
}

const styles = StyleSheet.create({container: {flex: 1, backgroundColor: colors.background}});
