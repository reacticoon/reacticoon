// https://redux.js.org/recipes/writingtests

export const testReducer = (
  itDescription,
  reducer,
  initialState,
  action,
  actionParams,
  expectedResult
) => {
  it(itDescription, () => {
    const actionContent = action.apply(null, actionParams)

    expect(reducer(initialState, actionContent)).toEqual(expectedResult)
  })
}
