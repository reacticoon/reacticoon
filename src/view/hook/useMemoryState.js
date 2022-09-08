import React from 'react';

import isNil from 'lodash/isNil'
import cloneDeep from 'lodash/cloneDeep'
import isEqual from 'lodash/isEqual'
import isFunction from 'lodash/isFunction'
import set from 'lodash/set'

const memoryState = {};

// https://stackoverflow.com/questions/31352261/how-to-keep-react-component-state-between-mount-unmount
function useMemoryState(key, getInitialState) {
  const [state, setState] = React.useState(() => {
    const initialState = isFunction(getInitialState) ? getInitialState() : getInitialState;
    const hasMemoryValue = !isNil(memoryState[key]);
    const a = JSON.stringify(initialState)
    const b =  JSON.stringify(memoryState[key]?.initialState)
    const equals = a === b

    if (!hasMemoryValue || !equals) {
      memoryState[key] = {
        initialState: cloneDeep(initialState),
        state: cloneDeep(initialState)
      }
    }

    return memoryState[key].state
  });

  function onChange(nextState) {
    if (!isEqual(nextState, state)) {
      set(memoryState, [key, 'state'], nextState);
      setState(nextState)
    }
  }

  React.useEffect(() => {
    const initialState = isFunction(getInitialState) ? getInitialState() : getInitialState;
    const hasMemoryValue = !isNil(memoryState[key]);
    const a = JSON.stringify(initialState)
    const b =  JSON.stringify(memoryState[key]?.initialState)
    const equals = a === b

    if (!hasMemoryValue || !equals) {
      memoryState[key] = {
        initialState,
        state: cloneDeep(initialState)
      }
      onChange(cloneDeep(initialState))
    }

  }, [getInitialState])

  return {state, onChange, initialState: memoryState[key]?.initialState };
}

export default useMemoryState