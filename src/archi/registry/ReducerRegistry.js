export class ReducerRegistry {
  constructor() {
    this._reducers = {}
  }

  getReducers() {
    return { ...this._reducers }
  }

  register(name, reducer) {
    this._reducers = { ...this._reducers, [name]: reducer }
  }
}

const reducerRegistry = new ReducerRegistry()
export default reducerRegistry
