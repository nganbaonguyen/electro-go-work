import {useCallback, useEffect, useState} from 'react';
import {BackHandler} from 'react-native';

/**
 * Ngăn xếp màn hình nội bộ của mini app (không cần thư viện điều hướng).
 * Nút Back phần cứng của Android sẽ quay lại màn trước khi còn màn trong ngăn xếp.
 */
export function useStack<R>(initial: R) {
  const [stack, setStack] = useState<R[]>([initial]);

  const push = useCallback((route: R) => setStack(s => [...s, route]), []);
  const pop = useCallback(
    () => setStack(s => (s.length > 1 ? s.slice(0, -1) : s)),
    [],
  );
  const depth = stack.length;

  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      if (depth > 1) {
        pop();
        return true;
      }
      return false;
    });
    return () => sub.remove();
  }, [depth, pop]);

  return {current: stack[depth - 1], push, pop, canGoBack: depth > 1};
}
