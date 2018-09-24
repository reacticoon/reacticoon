import { isFSA } from '../actionValidation'
import createAction from '../createAction'

const createDispatch = testCallbak => data => {
  testCallbak(data)
}

describe('create actions', () => {
  const actionType = 'TEST'

  const payload = { message: 'test' }
  const meta = { message: 'meta' }

  const actions = [
    createAction(actionType, payload),

    createAction(actionType, () => payload),

    createAction(actionType, () => ({
      payload,
    })),

    createAction(actionType, () => ({
      payload,
      meta,
    })),
  ]

  const createActionsTest = (test) => {
    const dispatch = createDispatch(actionData => {
      test(actionData)
    })

    actions.forEach(action => {
      action()(dispatch)
    }) 
  }

  const forEachAction = (test) => {
    actions.forEach(action => {
      test(action)
    }) 
  }

  it('Should have a TYPE', () => {
    forEachAction(action => {
      expect(action.TYPE).toEqual(actionType)
    })
  })

  it('Should be an action', () => {
    forEachAction(action => {
      expect(action.isActionType).toEqual(true)
    })
  })

  it('Should have a valid to string', () => {
    forEachAction(action => {
      expect(action.toString()).toEqual(actionType)
    })
  })

  // -- 

  it('Should be a valid action following flux-standard-action', () => {
    createActionsTest(actionData => {
      expect(isFSA(actionData)).toEqual(true)
    })
  })

  it('Should return a valid type', () => {
    createActionsTest(actionData => {
      expect(actionData.type).toEqual(actionType)
    })
  })

  it('Should contains the payload', () => {
    createActionsTest(actionData => {
      expect(actionData.payload).toEqual(payload)
    })
  })

  it('Should contains the meta', () => {
    createActionsTest(actionData => {
      if (actionData.meta) { // meta is optionnal
        expect(actionData.meta).toEqual(meta)
      }
    })
  })
})
