import Immutable from 'immutable'
import cloneDeep from 'lodash/cloneDeep'
import { createReducer } from 'reacticoon/reducer'
import { saveEvent } from './actions'
import { EventManager, isSameEvent } from 'reacticoon/event'

const DEFAULT = Immutable.fromJS({
  events: [],
})

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Cyclic_object_value
// https://stackoverflow.com/questions/11616630/json-stringify-avoid-typeerror-converting-circular-structure-to-json
const stringifyWithoutCircularReferences = data => {
  const getCircularReplacer = () => {
    const seen = new WeakSet()
    return (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (seen.has(value)) {
          return
        }
        seen.add(value)
      }
      return value
    }
  }

  return JSON.stringify(data, getCircularReplacer(), 2)
}

const onSaveEvent = (state, action) => {
  let event = action.payload.event

  try {
    if (isSameEvent(event, EventManager.Event.LOG_EXCEPTION)) {
      // we cannot save an exception on our store
      // we modify our event by reference here.
      // delete event.data.ex
      // since the data can contain reference circular loop, we stringify it
      // event.data = stringifyWithoutCircularReferences(event.data)
      event = {
        ...event,
        data: stringifyWithoutCircularReferences(event.data),
      }
      return state.updateIn(['events'], events => Immutable.fromJS([...cloneDeep(events), event]))
    }

    return state.updateIn(['events'], events => Immutable.fromJS([...cloneDeep(events), event]))
  } catch (ex) {
    // avoid infinite loop, where our error is handle by 'createReducer', that dispatch an exception
    // event
    console.error(ex)
    debugger
  }
}

const reducer = createReducer(DEFAULT, {
  [saveEvent]: onSaveEvent,
})

export default reducer
