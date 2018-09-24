import isEmpty from 'lodash/isEmpty'
import isNil from 'lodash/isNil'
import invariant from 'invariant'

import { createStore, compose } from 'redux'

import { __DEV__ } from '../../environment'

const createStoreCustom = appOptions => {
  // verify
  if (__DEV__) {
    appOptions.middlewares.forEach((middleware, index) => {
      invariant(
        !isNil(middleware),
        `defined middleware is nil at index ${index}`
      )
    })
  }

  let creators = appOptions.customStoreCreators

  if (!isEmpty(creators)) {
    return compose(...creators)(createStore)
  }

  return createStore
}

export default createStoreCustom
