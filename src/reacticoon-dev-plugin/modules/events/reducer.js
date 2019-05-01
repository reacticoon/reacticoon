import Immutable from 'immutable'
import cloneDeep from 'lodash/cloneDeep'
import { createReducer } from 'reacticoon/reducer'
import { saveEvent } from './actions'

const DEFAULT = Immutable.fromJS({
  events: [],
})

const onSaveEvent = (state, action) =>
  state.updateIn(['events'], events =>
    Immutable.fromJS([...cloneDeep(events), action.payload.event])
  )

const reducer = createReducer(DEFAULT, {
  [saveEvent]: onSaveEvent,
})

export default reducer
