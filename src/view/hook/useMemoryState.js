import React from 'react';
import isEqual from 'lodash/isEqual'
import isFunction from 'lodash/isFunction'
import set from 'lodash/set'

const memoryState = {};

// https://stackoverflow.com/questions/31352261/how-to-keep-react-component-state-between-mount-unmount
function useMemoryState(key, getInitialState) {
  const [state, setState] = React.useState(() => {
    const initialState = isFunction(getInitialState) ? getInitialState() : getInitialState;
    const hasMemoryValue = Object.prototype.hasOwnProperty.call(memoryState, key);

    let state
    if (hasMemoryValue && isEqual(initialState, memoryState[key].initialState)) {
      state = memoryState[key].state
    } else {
      state = initialState
    }

    memoryState[key] = {
      initialState,
      state
    }
    return state
  });

  function onChange(nextState) {
    set(memoryState, [key, 'state'], nextState);
    setState(nextState)
  }

  React.useEffect(() => {
    const initialState = isFunction(getInitialState) ? getInitialState() : getInitialState;
    const hasMemoryValue = Object.prototype.hasOwnProperty.call(memoryState, key);

    if (hasMemoryValue) {
      if (!isEqual(initialState, memoryState[key].initialState)) {
        onChange(initialState)
      }
    }
  }, [getInitialState])

  return [state, onChange];
}

export default useMemoryState