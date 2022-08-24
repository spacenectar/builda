import { useEffect, DependencyList } from 'react';

export function useDebounceEffect(
  fn: () => void,
  waitTime: number,
  deps?: DependencyList
) {
  useEffect(() => {
    const t = setTimeout(() => {
      // @ts-ignore - The following is not an issue and can be ignored
      return fn.apply(undefined, depList);
    }, waitTime);

    return () => {
      clearTimeout(t);
    };
  }, deps);
}

export default useDebounceEffect;
