import React from 'react'
import useConstant from 'use-constant'
import AwesomeDebouncePromise from 'awesome-debounce-promise'
import { useAsync } from 'react-async-hook'

// https://stackoverflow.com/questions/23123138/perform-debounce-in-react-js

const useDebouncedSubmit = (submitFunction) => {
  const [data, setData] = React.useState(null);

  // Debounce the original search async function
  const debouncedSearchFunction = useConstant(() =>
    AwesomeDebouncePromise(submitFunction, 300)
  );

  // The async callback is run each time the text changes,
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
    data,
    setData,
    state,
  };
}

export default useDebouncedSubmit