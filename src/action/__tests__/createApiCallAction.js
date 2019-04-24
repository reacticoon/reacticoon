import { isFSA } from '../actionValidation'
import createApiCallAction from '../createApiCallAction'
import { API_CALL, TYPES, REQUEST, DATA } from '../../api/constants'

const createDispatch = testCallbak => data => {
  testCallbak(data)
}

describe('create actions', () => {
  const actionType = 'TEST'

  const payload = { message: 'test' }
  const meta = { message: 'meta' }

  const actions = [
    createApiCallAction(actionType, {}, payload),
    createApiCallAction(actionType, {}, { payload }),
    createApiCallAction(actionType, {}, { payload, meta }),
  ]

  const createApiCallActionsTest = (test) => {
    const dispatch = createDispatch(actionData => {
      test(actionData)
    })

    actions.forEach(action => {
      dispatch(action())
    }) 
  }

  const forEachAction = (test) => {
    actions.forEach(action => {
      test(action)
    }) 
  }

  it('Should have actions types', () => {
    forEachAction(action => {
      expect(action.REQUEST).toEqual(`${actionType}::REQUEST`)
      expect(action.SUCCESS).toEqual(`${actionType}::SUCCESS`)
      expect(action.FAILURE).toEqual(`${actionType}::FAILURE`)
    })
  })

  it('Should have actions types', () => {
    forEachAction(action => {
      expect(action.isActionType).toEqual(true)
    })
  })


  it('Should have toString method', () => {
    forEachAction(action => {
      expect(action.toString()).toEqual(`${API_CALL} ${actionType}`)
    })
  })

  it(`Should have TYPE ${API_CALL}`, () => {
    forEachAction(action => {
      expect(action.TYPE).toEqual(API_CALL)
    })
  })

  it('Should be an action', () => {
    forEachAction(action => {
      expect(action.isActionType).toEqual(true)
    })
  })

  // --

  // TODO: uncomment when refactoring createApiCallAction to be flux-standard-action compliant
  
  // it('Should be a valid action following flux-standard-action', () => {
  //   createApiCallActionsTest(actionData => {
  //     expect(isFSA(actionData)).toEqual(true)
  //   })
  // })

  // it('Should return a valid type', () => {
  //   createApiCallActionsTest(actionData => {
  //     expect(actionData.type).toEqual(actionType)
  //   })
  // })

  // it('Should contains the payload', () => {
  //   createApiCallActionsTest(actionData => {
  //     expect(actionData.payload).toEqual(payload)
  //   })
  // })

  // it('Should contains the meta', () => {
  //   createApiCallActionsTest(actionData => {
  //     if (actionData.meta) { // meta is optionnal
  //       expect(actionData.meta).toEqual(meta)
  //     }
  //   })
  // })
})
