import isNull from 'lodash/isNull'

export function formatEndpoint(endpoint, params = null): string {
  if (isNull(params)) {
    return endpoint
  }

  let formattedEnpoint = template(endpoint, params)

  function template(template, data) {
    if (!data) {
      return template
    }
    return template.replace(/:(\w*)/g, (m, key) => {
      return data.hasOwnProperty(key) ? data[key] : ''
    })
  }

  return formattedEnpoint
}
