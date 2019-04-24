# Action


## Introduction

Reacticoon provides functions that will creates the actions for you, following the [flux-standard-action](https://github.com/redux-utilities/flux-standard-action) standards.

It defines that:

An action MUST

* be a plain JavaScript object.
* have a `type` property.

An action MAY

* have an `error` property.
* have a `payload` property.
* have a `meta` property.

An action MUST NOT include properties other than `type`, `payload`, `error`, and `meta`.

### `type`

The `type` of an action identifies to the consumer the nature of the action that has occurred. `type` is a string constant. If two types are the same, they MUST be strictly equivalent (using `===`).

### `payload`

The optional `payload` property MAY be any type of value. It represents the payload of the action. Any information about the action that is not the `type` or status of the action should be part of the `payload` field.

By convention, if `error` is `true`, the `payload` SHOULD be an error object. This is akin to rejecting a promise with an error object.

### `error`

The optional `error` property MAY be set to `true` if the action represents an error.

An action whose `error` is true is analogous to a rejected Promise. By convention, the `payload` SHOULD be an error object.

If `error` has any other value besides `true`, including `undefined` and `null`, the action MUST NOT be interpreted as an error.

### `meta`

The optional `meta` property MAY be any type of value. It is intended for any extra information that is not part of the payload.

## Utility functions

The module `flux-standard-action` is available on npm. It exports a few utility functions.

## Reacticoon enforcing the standard

Lots of redux libraries can be easily used because they follow those standards. 

Reacticoon will ensure that you follow those conventions too by warning you in development environment.

## `createAction`

The `createAction` function will create an action function that can be dispatch.

It takes the following arguments:

- type {string}: the type of the action. Must be unique through all your app. 
  The convention is to prefix with the plugin name (if we are in a plugin) and then the module name.
  e.g:
  - 'MyApp::UserModule::login'
  - 'UserModule::login'
  - 'MyPlugin::testAction'
- data {object|func}: An object or a method. The method will receive the parameters passed to your action.
    It must return an object.
    The object can either be:
    - the payload content
    - an object that contains the payload and the meta.


```js
const myAction = createAction('ACTION_TYPE', { message: 'A simple action with a payload' })

const myAction = createAction('ACTION_TYPE', (id) => ({
  id,
  message: 'An action that receive a parameter id'
}))

const myAction = createAction('ACTION_TYPE', (id) => ({
  payload: {
    id,
    message: 'An action that receive a parameter id'
  },
  meta: {
    message:' An action that returns a meta'
  },
}))


dispatch(myAction('1'));
```

## `createErrorAction`

`createErrorAction` works the same way than `createAction`. An error action is defined by its payload being an error object.


## `createApiCallAction`

See [Api request](./api-request)