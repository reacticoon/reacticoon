import React, { useEffect } from 'react';

const useInterval = (intervalMs) => {
  const [interval, setIntervalData] = React.useState(0)

  useEffect(() => {
    const intervalRef = setTimeout(() => {
      setIntervalData(interval + 1)
    }, intervalMs)
    return () => {
      clearTimeout(intervalRef)
    };
  }, [interval, setIntervalData]);

  return {interval}
};

export default useInterval;