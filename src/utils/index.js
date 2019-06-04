var STRIP_COMMENTS = /(\/\/.*$)|(\/\*[\s\S]*?\*\/)|(\s*=[^,\)]*(('(?:\\'|[^'\r\n])*')|("(?:\\"|[^"\r\n])*"))|(\s*=[^,\)]*))/gm
var ARGUMENT_NAMES = /([^\s,]+)/g

/**
 * https://stackoverflow.com/questions/1007981/how-to-get-function-parameter-names-values-dynamically
 */
export function getParamNames(func) {
  var fnStr = func.toString().replace(STRIP_COMMENTS, '')
  var result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES)
  if (result === null) result = []
  return result
}

export function sortObjectKeys(obj) {
  return Object.keys(obj)
    .sort()
    .reduce((acc, key) => {
      acc[key] = obj[key]
      return acc
    }, {})
}

/**
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Cyclic_object_value
 */
export function getCircularCulprit(data) {
  const culprit = []
  const getCircularReplacer = () => {
    const seen = new WeakSet()
    return (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (seen.has(value)) {
          culprit.push({ key, value })
          return
        }
        seen.add(value)
      }
      return value
    }
  }
  JSON.stringify(data, getCircularReplacer())
  return culprit
}
