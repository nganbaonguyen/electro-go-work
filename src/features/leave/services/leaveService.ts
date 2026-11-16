import {config} from '../../../config/env';
import {http} from '../../../services/api/httpClient';
import {delay} from '../../../shared/utils/delay';
import {MOCK_LEAVE} from '../data/mockLeave';
import {LeaveSummary} from '../types';

export async function fetchLeave(): Promise<LeaveSummary> {
  return config.useMock ? delay(MOCK_LEAVE) : http.get<LeaveSummary>('/leave');
}
