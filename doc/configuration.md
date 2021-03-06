# Reacticoon Configuration

Reacticoon configuration is made possible via the `appOption` object.
This object is pass to the Reacticoon `Application` function to initilize it.

For building configuration, see [`config-overrides`](./config-overrides).

## Introduction

```javascript
const appOptions = {
  // configuration belongs here
}

Application(appOptions)
```

There are a lot of Reacticoon features. Each one is configurable.

You have to create one file per configuration in the `/config` directory.

A default `config` directory contains the following files (extension `.js`):

### Mandatory configuration files

- ApiManagerOptions
- Config
- Content
- i18n
- modules
- routing

### Optionnal configuration files

- entities
- middlewares
- plugins

### Example

```javascript
import uxReducer from './config/uxReducer'
import entities from './config/entities'
import middlewares from './config/middlewares'
import modules from './config/modules'
import i18n from './config/i18n'
import routing from './config/routing'
import Content from './config/Content'
import ApiManagerOptions from './config/ApiManagerOptions'

const appOptions = {
  middlewares,
  uxReducer,
  entities,
  modules,
  i18n,
  routing,
  Content,
  ApiManagerOptions,
}

Application(appOptions)
```

## Configuration detail

### ApiManagerOptions



### Config

Example:

```javascript
import merge from 'lodash/merge'

const Env = {
  // contains the common config for each environment
  COMMON: {
    IS_DEV: false,

    IS_PROD: false,
  },

  // local environment
  LOCAL: {
    IS_DEV: true,
  },

  // dev environment
  DEV: {
    IS_DEV: true,
  },

  PRODUCTION: {},
}

//
// The following defines the configuration for a specific env
// We compare the hostname, and set the corresponding env data
//

let currentEnv = Env.LOCAL
const hostname = window.location.hostname
if (hostname === Env.LOCAL.HOSTNAME) {
  currentEnv = Env.LOCAL
} else if (hostname === Env.DEV.HOSTNAME) {
  currentEnv = Env.DEV
} else if (hostname === Env.PRODUCTION.HOSTNAME) {
  currentEnv = Env.PRODUCTION
}

export default merge({}, Env.COMMON, currentEnv)
```

### Content

A React component that receive a children.
Use it to englobe the router with providers in order to not re-render those providers when the route change.

Ex: MuiThemeProvider, CssThemeProvider, I18n initial loading, ...

### i18n

I18n configuration:

- defaultLocale: default locale to use
- locales: array of supported locales. Comment if you don't have the json files (see below)


```javascript
export default {
  defaultLocale: 'en',
  // locales: ['fr', 'en'],
}
```

#### json files

The json files must be put on: `${process.env.PUBLIC_URL}/i18n/${language}.json`

Example: `PUBLIC_DIR/i18n/en.json` file

```json
{
  "global.forgot_passowrd_link": "Forgot your password?",
  "global.forgot_password.unknown_email": "Email unknown",
}
```

### modules

Must export an array of your modules (see `createModule`)

```javascript
import bookmark from '../modules/bookmark/bookmark/'
import bookmarkList from '../modules/bookmark/bookmarkList/'

export default [
  bookmark,
  bookmarkList,
]
```

### routing

Must export an array of route configuration:

```javascript
import React from 'react'

import { createLoadable } from 'reacticoon/view'

import PageLoader from '../components/PageLoader'

const createAsyncPage = loader => createLoadable(loader, () => <PageLoader />)

const routing = [
  {
    name: 'LOGIN',
    path: '/login',
    handler: createAsyncPage(() => import(/*  webpackChunkName: "LoginPage" */ '../pages/login')),
  },
  {
    name: 'DASHBOARD',
    path: '/',
    authRequired: true,
    handler: createAsyncPage(() =>
      import(/*  webpackChunkName: "DashboardPage" */ '../pages/dashboard')
    ),
  },

export default routing

```


### Plugins

Reacticoon can be extended via `plugins`.

TODO: see ...

```javascript
import reacticoonPluginExample from '../plugins/reacticoon-plugin-example'
import reacticoonLogger from '../plugins/reacticoon-plugin-logger'

export default [
  {
    plugin: reacticoonPluginExample,
    config: {
      toto: 42
    },
  },
  {
    plugin: reacticoonLogger,
    config: {},
  },
]
```

## Advanced configurations

### Code splitting

See [Code splitting documentation](./code-splitting)