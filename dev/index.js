import {AppRegistry} from 'react-native';
import Harness from './Harness';

// Chỉ dùng khi chạy riêng mini app (không qua host). Tên phải khớp tên app native: xem app.json của host.
AppRegistry.registerComponent('ElectroGo', () => Harness);
