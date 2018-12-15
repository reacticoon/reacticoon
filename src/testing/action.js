// https://redux.js.org/recipes/writingtests

export const testAction = (itDescription, action, actionParams, expectedAction) => {
  it(itDescription, () => {
    expect(action.apply(null, actionParams)).toEqual(expectedAction)
  })
}

export const testAsyncAction = (itDescription, action, actionParams, expectedAction) => {
  // TODO:
}
