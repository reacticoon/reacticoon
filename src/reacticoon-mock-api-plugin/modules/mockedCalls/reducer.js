import Immutable from 'immutable'
import cloneDeep from 'lodash/cloneDeep'
import { createReducer } from 'reacticoon/reducer'
import { saveMockedCall } from './actions'

const DEFAULT = Immutable.fromJS({
  mockedCalls: [],
})

const onSaveMockedCall = (state, action) =>
  state.updateIn(['mockedCalls'], mockedCalls =>
    Immutable.fromJS([...cloneDeep(mockedCalls), action.payload.mockedCall])
  )

const reducer = createReducer(DEFAULT, {
  [saveMockedCall]: onSaveMockedCall,
})

export default reducer
