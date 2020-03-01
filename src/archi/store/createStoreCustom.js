import isEmpty from 'lodash/isEmpty'
import isNil from 'lodash/isNil'
import invariant from 'invariant'

import { createStore, compose } from 'redux'

const createStoreCustom = appOptions => {
  // verify
  if (FEATURE_REACTICOON_HEAVY_DEBUG) {
    appOptions.middlewares.forEach((middleware, index) => {
      invariant(!isNil(middleware), `defined middleware is nil at index ${index}`)
    })
  }

  let creators = appOptions.customStoreCreators

  if (!isEmpty(creators)) {
    return compose(...creators)(createStore)
  }

  return createStore
}

export default createStoreCustom
