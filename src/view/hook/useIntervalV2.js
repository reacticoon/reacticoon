import React, { useEffect } from 'react';

/**
 * Provides a declarative useInterval
 *
 * @param callback - Function that will be called every `delay` ms.
 * @param delay - Number representing the delay in ms. Set to `null` to "pause" the interval.
 * 
 * from https://github.com/donavon/use-interval/blob/master/src/index.tsx
 */
const useInterval = (callback, delay) => {
  const savedCallbackRef = React.useRef();

  useEffect(() => {
    savedCallbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    console.log('ddddddd')
    const handler = (...args) => savedCallbackRef.current && savedCallbackRef.current(...args);

    if (delay !== null) {
      const intervalId = setInterval(handler, delay);
      return () => clearInterval(intervalId);
    }
  }, [delay]);
};

export default useInterval;