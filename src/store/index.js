//
// Reference for our redux store
//

let _store

export const registerStore = (store) => {
  _store = store
}

export const getStore = () => _store
