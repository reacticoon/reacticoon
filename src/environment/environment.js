//
// Note: this file should never be import directly. Use a getter via getters.js
//

//
// The currentEnv is set by the front.
// It is given to our `Application` that call `setCurrentEnv`
//
let _currentEnv = {}

export const setCurrentEnv = (currentEnv) => {
  _currentEnv = currentEnv
}

export const getEnv = () => _currentEnv
