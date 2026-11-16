import {LeaveSummary} from '../types';

/** Dữ liệu mẫu, chỉ dùng khi config.useMock = true. */
export const MOCK_LEAVE: LeaveSummary = {
  total: 12,
  used: 3.5,
  requests: [
    {id: '1', type: 'Phép năm', from: '20/11', to: '21/11', days: 2, status: 'pending'},
    {id: '2', type: 'Nghỉ ốm', from: '05/10', to: '05/10', days: 0.5, status: 'approved'},
    {id: '3', type: 'Phép năm', from: '12/09', to: '13/09', days: 2, status: 'approved'},
    {id: '4', type: 'Việc riêng', from: '30/08', to: '30/08', days: 1, status: 'rejected'},
  ],
};
