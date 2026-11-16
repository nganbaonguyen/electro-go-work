import {DependencyList, useCallback, useEffect, useState} from 'react';

export type AsyncStatus = 'loading' | 'ready' | 'error';

export type AsyncState<T> = {
  data: T | null;
  status: AsyncStatus;
  error: string | null;
  reload: () => void;
};

/** Chạy một hàm bất đồng bộ, theo dõi loading/ready/error và cho phép tải lại. */
export function useAsync<T>(fn: () => Promise<T>, deps: DependencyList): AsyncState<T> {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<AsyncStatus>('loading');
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');
    fn()
      .then(result => {
        if (!cancelled) {
          setData(result);
          setStatus('ready');
        }
      })
      .catch(e => {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : 'Đã có lỗi xảy ra');
          setStatus('error');
        }
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, tick]);

  const reload = useCallback(() => setTick(t => t + 1), []);
  return {data, status, error, reload};
}
