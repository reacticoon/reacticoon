// allows to define an api caller to replace our default one
let _customApiCaller = null

export const registerCustomApiCaller = customApiCaller => {
  _customApiCaller = customApiCaller
}

export const getCustomApiCaller = () => _customApiCaller
