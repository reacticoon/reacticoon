import { useState, useEffect } from 'react';

import { getFromStorage, saveToStorage } from 'reacticoon/storage'

function useStorageState(key, defaultValue) {
  const [value, setValue] = useState(getFromStorage(key, defaultValue));

  useEffect(() => {
    saveToStorage(key, value)
  }, [value]);

  return [value, setValue];
}

export default useStorageState