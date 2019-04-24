// see https://github.com/redux-utilities/flux-standard-action/blob/master/test/isError.test.js
import { isError } from '../actionValidation'

const type = 'ACTION_TYPE'

describe('isError()', () => {
  it('returns true if action.error is strictly true', () => {
    expect(isError({ type, error: true })).toBe(true)
    expect(isError({ type, error: 'true' })).toBe(false)
    expect(isError({ type })).toBe(false)
  })
})
