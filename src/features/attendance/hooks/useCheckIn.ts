import {useCallback, useState} from 'react';
import {submitCheck} from '../services/attendanceService';

/** Trạng thái ca làm hiện tại và hành động chấm công vào/ra. */
export function useCheckIn() {
  const [checkedInAt, setCheckedInAt] = useState<Date | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const toggle = useCallback(async () => {
    setSubmitting(true);
    try {
      await submitCheck(checkedInAt ? 'out' : 'in');
      setCheckedInAt(checkedInAt ? null : new Date());
    } finally {
      setSubmitting(false);
    }
  }, [checkedInAt]);

  return {checkedInAt, submitting, toggle};
}
