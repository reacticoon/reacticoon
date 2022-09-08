import React from 'react'
// TODO: remove this file and those?
import useConstant from 'use-constant'
import AwesomeDebouncePromise from 'awesome-debounce-promise'
import { useAsync } from 'react-async-hook'

// https://stackoverflow.com/questions/23123138/perform-debounce-in-react-js
const useDebouncedSubmit = (submitFunction, defaultData, throttle = 300) => {
  const [data, setData] = React.useState(defaultData);

  // Debounce the original async function
  const debouncedSearchFunction = useConstant(() =>
    AwesomeDebouncePromise(submitFunction, throttle)
  );

  // The async callback is run each time the data changes,
  // but as the submit function is debounced, it does not
  // fire a new request on each keystroke
  const state = useAsync(
    async () => {
      return debouncedSearchFunction(data);
    },
    [debouncedSearchFunction, data]
  );

  // Return everything needed for the hook consumer
  return {
    ...data,
    setData,
  };
}

export default useDebouncedSubmit