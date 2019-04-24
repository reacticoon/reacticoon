# Code splitting

Code splitting is one approach to consider while developing a `Reacticoon` app
in order to improve the application’s performance overall.

By default, when we compile our application, all the javascript code (= application bundle) 
is compile in one big file.
With code splitting, you cant dynamically load parts of a `Reacticoon` application at runtime.

[`react-loadable`](https://github.com/jamiebuilds/react-loadable) is a library that provides
`Lodable`, a higher-order component that allows to dynamically load any module before rendering
it into our app. It is an async component loader.

`Reacticoon` provides a `createLoadable` function that works like the `react-lodable` `Loadable` behavior.
Look at the [the view documentation](./view.md).

```javascript
import { createLoadable } from 'reacticoon/view'

// import the loading view to display while we load the real page,
// here we display an empty page
import PageLoader from '../components/PageLoader'

// simple function to abstract our handler creation
const createAsyncPage = loader => createLoadable(loader, () => <PageLoader />)

const routes = [
  {
    // route definition
    definition: RoutingEnum.LOGIN,
    // define the file to import, and that's it !
    handler: createAsyncPage(() => import(/*  webpackChunkName: "LoginPage" */ '../pages/login')),
  },
]
```

Note: the comment `/* webpackChunkName: "PageName" */` is destinated to webpack (the `Reacticoon` app compiler)
the 'chunk' (generated file that contains the imported portion of code) created will have this name.
Otherwise, it will have a random name (e.g: `0.42z3z3z3.chunk.js`).
It allows to see the chunks loaded on the network tab of your browser with a much more comprehensive name.
