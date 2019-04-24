import forEach from 'lodash/forEach'
import isNil from 'lodash/isNil'
import invariant from 'invariant'

const createMapFormatter = itemFormatter => (mapObject, props) => {
  invariant(isNil(props) || typeof props === 'object', 'format props must be an object')

  const res = {}
  forEach(mapObject || {}, (item, key) => {
    // add object to map (parent) on the props
    res[key] = itemFormatter(item, { ...props, formattedItem: mapObject })
  })

  return res
}

export default createMapFormatter
