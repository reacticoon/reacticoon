import createMiddleware from '../createMiddleware'

describe('createMiddleware', () => {
  const actionType = 'actionType'
  const middlewareName = 'middlewareName'
  const handler = () => {}

  const simpleMiddleware = createMiddleware(middlewareName, actionType, handler)

  const multipleActionsMiddleware = createMiddleware(middlewareName, [actionType], handler)

  const functionActionMiddleware = createMiddleware(
    middlewareName,
    action => action.type === actionType,
    handler
  )

  describe('simple middleware', () => {
    it('to be an Object', () => {
      expect(simpleMiddleware).toBeInstanceOf(Object)
    })

    it('to be an a middleware object with a middlewareName', () => {
      expect(simpleMiddleware.middlewareName).toEqual(middlewareName)
    })

    it('to be an a middleware object that handle an action', () => {
      expect(simpleMiddleware.actions).toEqual(actionType)
    })

    it('to be an a middleware object with an handler function', () => {
      expect(simpleMiddleware.handler).toBeInstanceOf(Function)
    })
  })

  describe('multiple actions middleware', () => {
    it('to be an Object', () => {
      expect(multipleActionsMiddleware).toBeInstanceOf(Object)
    })

    it('to be an a middleware object with a middlewareName', () => {
      expect(multipleActionsMiddleware.middlewareName).toEqual(middlewareName)
    })

    it('to be an a middleware object that handle multiple action', () => {
      expect(multipleActionsMiddleware.actions).toEqual([actionType])
    })

    it('to be an a middleware object with an handler function', () => {
      expect(multipleActionsMiddleware.handler).toBeInstanceOf(Function)
    })
  })

  describe('function actions middleware', () => {
    it('to be an Object', () => {
      expect(functionActionMiddleware).toBeInstanceOf(Object)
    })

    it('to be an a middleware object with a middlewareName', () => {
      expect(functionActionMiddleware.middlewareName).toEqual(middlewareName)
    })

    it('to be an a middleware object that handles actions with a function', () => {
      expect(functionActionMiddleware.actions).toBeInstanceOf(Function)
      expect(functionActionMiddleware.actions({ type: actionType })).toEqual(true)
    })

    it('to be an a middleware object with an handler function', () => {
      expect(functionActionMiddleware.handler).toBeInstanceOf(Function)
    })
  })
})
