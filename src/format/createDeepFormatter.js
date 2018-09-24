import invariant from 'invariant'
import isArray from 'lodash/isArray'
import isString from 'lodash/isString'
import isFunction from 'lodash/isFunction'

const createDeepFormatter = (itemFormatter, getChildren, updateChildren) => (item, props) => {
  invariant(isFunction(itemFormatter), `'itemFormatter' must be a function`)
  invariant(
    isFunction(getChildren) || isString(getChildren),
    `'getChildren' must be a function or a string`
  )
  // if getChildren is a string, no need of updateChildren
  invariant(
    isFunction(updateChildren) || isString(getChildren),
    `'updateChildren' must be a function`
  )

  item = itemFormatter(item)

  let children

  if (isFunction(getChildren)) {
    children = getChildren(item)
  } else {
    // getChildren is a string, that define the path to retrieve the children
    children = item[getChildren]
  }

  // true if the children is an array, false otherwise
  if (!isArray(children)) {
    children = [children]
  }

  const deepFormatter = createDeepFormatter(itemFormatter, getChildren, updateChildren)

  let formattedChildren = []
  children.forEach(child => {
    if (child) {
      formattedChildren.push(deepFormatter(child, props))
    }
  })
  if (isFunction(getChildren)) {
    item = updateChildren(item, formattedChildren)
  } else {
    // getChildren is a string, that define the path to retrieve the children
    item[getChildren] = formattedChildren
  }

  return item
}

export default createDeepFormatter
