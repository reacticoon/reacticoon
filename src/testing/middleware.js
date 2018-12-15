// https://redux.js.org/recipes/writingtests

const create = () => {
  const store = {
    getState: jest.fn(() => ({})),
    dispatch: jest.fn(),
  }
  const next = jest.fn()
​
  const invoke = (action) => thunk(store)(next)(action)
​
  return {store, next, invoke}
}

export const testMiddleware = (itDescription, middleware, action, actionParams) => {
  it(itDescription, () => {
    const { next, invoke } = create()

    const actionContent = action.apply(null, actionParams)
    invoke(actionContent)

    expect(next).toHaveBeenCalledWith(actionContent)

    expect(store.dispatch).toHaveBeenCalledWith(actionContent.type)
    expect(store.getState).toHaveBeenCalled()
  })
}