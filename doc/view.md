# `view`

Directory: `reacticoon/view`

It contains react view utilities:

## Shortcuts

### `compose`

`import { compose } from 'reacticoon/view'`

Function composition is an important part of functionnal programming.

If you don't know what it is, look at:
- https://redux.js.org/api-reference/compose
- https://medium.com/@dtipson/creating-an-es6ish-compose-in-javascript-ac580b95104a

### `connect`

`import { connect } from 'reacticoon/view'`

Shortcut for `export { connect } from 'react-redux'`

Documentation: https://redux.js.org/basics/usage-with-react

## `loadable` directory

### `createLoadable`

See [Code splitting documentation](./code-splitting)

`import { createLoadable } from 'reacticoon/view'

`createLoadable(loader: func, loading: func)`

`createLoadable` is an abstract of `Loadable` from `react-loadable`, 
it works with the same API, but add some checks and logs in `__DEV__`.

See [react-loadable](https://github.com/jamiebuilds/react-loadable).

## `reacticoonConnect`

IN DEVELOPMENT.

An attempt to replace the react-redux `connect` to simplify usage of reacticoon 
modules.
