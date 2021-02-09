import invariant from 'invariant'
import findIndex from 'lodash/findIndex'
import indexOf from 'lodash/indexOf'
import find from 'lodash/find'
import isUndefined from 'lodash/isUndefined'
import isNull from 'lodash/isNull'
import isNil from 'lodash/isNil'
import isFunction from 'lodash/isFunction'
import isString from 'lodash/isString'
import isArray from 'lodash/isArray'
import map from 'lodash/map'
import clone from 'lodash/clone'
import uniqBy from 'lodash/uniqBy'

export const compare = (comparator, item, toCompare = null) => {
  if (isNil(comparator)) {
    // no comparator we try ours.
    if (!isNil(item['id'])) {
      // try to compare ids
      invariant(toCompare !== null, 'A comparator is required if there is no object to compare to')
      return item['id'] === toCompare['id']
    }
  } else {
    if (isFunction(comparator)) {
      return comparator(item, toCompare)
    } else {
      // comparator is not a function, it contains a value (fallback id)
      // TODO: comparator is an object suchs as { id: 3, test: 'toto' }
      invariant(
        !isNil(item['id']),
        `A string comparator will be compared with the item 'id'. No id found on item object`
      )
      return item['id'] === comparator
    }
  }

  if (isString(item)) {
    return item === toCompare
  }

  invariant(false, 'not handled')
  return false
}

export const copyArray = array => map(array, clone)

/**
 * https://stackoverflow.com/questions/13518343/sort-array-containing-objects-based-on-another-array
 *
 * @param  {[type]} keysOrder   array of the keys in the order you want.
 * @param  {[type]} arrayToSort array to sort
 * @param  {[type]} comparator  func(keyToFind, currentObject): boolean
 *                              currentObject is the object taken from the arrayToSort
 * @return {[type]}             a sorted array
 */
export const getOrderedArray = (keysOrder, arrayToSort, comparator) => {
  const comparatorFunc = current => key => comparator(key, current)
  let orderedArray = []
  let len = arrayToSort.length
  let index
  let current

  for (; len--; ) {
    current = arrayToSort[len]
    index = findIndex(keysOrder, comparatorFunc(current))
    orderedArray[index] = current
  }

  //change the arrayToSort
  return orderedArray
}

export const findOnArray = (array, comparator) => {
  const match = find(array, item => compare(comparator, item))

  return isUndefined(match) ? null : match
}

export const findIndexOnArray = (array, comparator) => {
  const match = findIndex(array, item => compare(comparator, item))

  return isUndefined(match) ? -1 : match
}

export const existsOnArray = (array, comparator) => {
  const match = findOnArray(array, comparator)

  return !isNull(match)
}

export const deleteObjectAtIndexOnArray = (arrayParam, index) => {
  const array = copyArray(arrayParam)
  array.splice(index, 1)
  return array
}

export const deleteObjectOnArray = (arrayParam, comparator) => {
  const array = copyArray(arrayParam)
  const match = findOnArray(array, comparator)

  if (match) {
    // Find item index using indexOf+find
    const index = indexOf(array, match)

    // Replace item at index using native splice
    array.splice(index, 1)
  }

  return array
}

export const toggleObjectOnArray = (arrayParam, obj, comparator) => {
  const array = copyArray(arrayParam)
  if (existsOnArray(array, comparator)) {
    return deleteObjectOnArray(array, comparator)
  }

  array.push(obj)
  return array
}

export const updateObjectAtIndexOnArray = (arrayParam, obj, index) => {
  const array = arrayParam
  array[index] = obj
  return array
}

export const updateObjectOnArray = (arrayParam, obj, comparator) => {
  const array = arrayParam

  return array.map(item => (compare(comparator, item) === true ? obj : item))
}

export const updateObjectOrCreateOnArray = (arrayParam, obj, comparator) => {
  const array = arrayParam

  if (existsOnArray(array, comparator)) {
    return updateObjectOnArray(array, obj, comparator)
  }

  array.push(obj)
  return array
}

export const addUniqueObjectOnArray = (arrayParam, obj, comparator) => {
  const array = copyArray(arrayParam)
  if (!existsOnArray(array, comparator)) {
    array.push(obj)
  }
  return array
}

/**
 * @param array {Array} the new array
 * @param source {Array} the old array
 * @param appendMode {boolean} true to merge array with the new data append on the old array (use it
 *  for pagination)
 */
export const mergeArray = (array, source, getValueFunc, appendMode = false) => {
  // merge new array and source and remove duplicate data
  const mergedArray = appendMode ? [...source, ...array] : [...array, ...source]
  const newArray = uniqBy(mergedArray, getValueFunc)
  // update the data
  const res = newArray.map(object => {
    const updatedObject = findOnArray(array, a => {
      return getValueFunc(object) === getValueFunc(a)
    })
    return updatedObject ? updatedObject : object
  })
  return res
}

export const toggleValueOnArray = (arrayParam, value) => {
  const array = copyArray(arrayParam)

  if (array.includes(value)) {
    array.splice(indexOf(array, value), 1)
  } else {
    array.push(value)
  }

  return array
}

export const asArray = param => (isArray(param) ? param : [param])

/**
 * Modify the given target array, to add the source array on it, with an optimize way.
 *
 * /!\ It modifies the target array !
 *
 * see https://dev.to/uilicious/javascript-array-push-is-945x-faster-than-array-concat-1oki
 */
export const addToArray = (target, source) => {
  const targetLength = target.length
  const sourceLength = source.length

  // pre-allocate
  target.length = targetLength + sourceLength

  // Add arr2 items to arr1
  for (let i = 0; i < source.length; i++) {
    target[targetLength + i] = source[i]
  }
  return target
}

/**
 * Filter duplicates from the given array. The array sorting is not preserved.
 *
 * @param getId function that returns the id of the given object
 * @param comparator function(object, other). returns true if other must replace the given object
 */
export const filterDuplicates = (arrayParam, getId, comparator) => {
  const objects = {}

  arrayParam.forEach(other => {
    const id = getId(other)

    const object = objects[id]
    if (!object) {
      objects[id] = other
    } else {
      // duplicate, compare which one we keep
      if (comparator(object, other)) {
        objects[id] = other
      }
    }
  })

  // the purpose here is to keep the returned array in the same order of keys as it was before
  return getOrderedArray(
    arrayParam,
    values(objects),
    (value, other) => value.id === other.id
  ).filter(Boolean)
}

export function moveOnArray(arrayParam, oldIndex, newIndex) {
  const array = [...arrayParam]
  if (newIndex >= array.length) {
    var k = newIndex - array.length + 1;
    while (k--) {
      array.push(undefined);
    }
  }
  array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
  return array;
}
