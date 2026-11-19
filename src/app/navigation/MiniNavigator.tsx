import React from 'react';
import {StyleSheet, View} from 'react-native';
import {AttendanceScreen, HistoryScreen} from '../../features/attendance';
import {HubScreen} from '../../features/hub';
import {LeaveScreen} from '../../features/leave';
import {PayslipScreen} from '../../features/payslip';
import {ScheduleScreen} from '../../features/schedule';
import BuildStamp from '../../shared/components/BuildStamp';
import ScreenHeader from '../../shared/components/ScreenHeader';
import {useStack} from '../../shared/navigation/useStack';
import {colors} from '../../shared/theme';
import {MODULES} from '../../features/hub/data/modules';

/**
 * Danh sách màn hình của mini app. Thêm màn mới: thêm vào Route, TITLES và nhánh render bên dưới.
 * Màn gốc là 'hub' (lưới chức năng); các route khác được mở từ hub (tên route trùng ModuleKey).
 */
type Route =
  | {name: 'hub'}
  | {name: 'attendance'}
  | {name: 'history'}
  | {name: 'schedule'}
  | {name: 'leave'}
  | {name: 'payslip'};

const TITLES: Record<Route['name'], string> = {
  hub: 'Chấm công',
  attendance: 'Chấm công',
  history: 'Lịch sử chấm công',
  schedule: 'Lịch làm việc',
  leave: 'Nghỉ phép',
  payslip: 'Phiếu lương',
};

type Props = {initialRoute?: string};

/** Route mở đầu: nếu host truyền module hợp lệ thì vào thẳng, ngược lại vào hub. */
function resolveInitialRoute(initialRoute?: string): Route {
  const isModule = MODULES.some(m => m.key === initialRoute);
  return isModule ? ({name: initialRoute} as Route) : {name: 'hub'};
}

export default function MiniNavigator({initialRoute}: Props) {
  const {current, push, pop, canGoBack} = useStack<Route>(resolveInitialRoute(initialRoute));

  const renderScreen = () => {
    switch (current.name) {
      case 'hub':
        return <HubScreen onOpen={key => push({name: key})} />;
      case 'attendance':
        return <AttendanceScreen onOpenHistory={() => push({name: 'history'})} />;
      case 'history':
        return <HistoryScreen />;
      case 'schedule':
        return <ScheduleScreen />;
      case 'leave':
        return <LeaveScreen />;
      case 'payslip':
        return <PayslipScreen />;
    }
  };

  return (
    <View style={styles.container}>
      <ScreenHeader title={TITLES[current.name]} onBack={canGoBack ? pop : undefined} />
      {renderScreen()}
      <BuildStamp />
    </View>
  );
}

const styles = StyleSheet.create({container: {flex: 1, backgroundColor: colors.background}});
