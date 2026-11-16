import {Shift} from '../types';

/** Ca làm theo thứ trong tuần (0 = thứ hai ... 6 = chủ nhật). Dữ liệu mẫu. */
export const MOCK_SHIFTS: Record<number, Shift[]> = {
  0: [{id: 'a1', type: 'morning', title: 'Ca sáng', start: '08:00', end: '12:00', location: 'Cửa hàng ST 907'},
      {id: 'a2', type: 'afternoon', title: 'Ca chiều', start: '13:00', end: '17:00', location: 'Cửa hàng ST 907'}],
  1: [{id: 'b1', type: 'morning', title: 'Ca sáng', start: '08:00', end: '12:00', location: 'Cửa hàng ST 907'},
      {id: 'b2', type: 'afternoon', title: 'Ca chiều', start: '13:00', end: '17:00', location: 'Cửa hàng ST 907'}],
  2: [{id: 'c1', type: 'afternoon', title: 'Ca chiều', start: '13:00', end: '21:00', location: 'Cửa hàng ST 3477'}],
  3: [{id: 'd1', type: 'morning', title: 'Ca sáng', start: '08:00', end: '12:00', location: 'Cửa hàng ST 907'},
      {id: 'd2', type: 'afternoon', title: 'Ca chiều', start: '13:00', end: '17:00', location: 'Cửa hàng ST 907'}],
  4: [{id: 'e1', type: 'night', title: 'Ca tối', start: '17:00', end: '22:00', location: 'Cửa hàng ST 907'}],
  5: [],
  6: [],
};
