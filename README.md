# Reacticoon

![Reacticoon logo](./doc/logo.png)

## Introduction

Reacticoon is a library that provides abstractions around React and Redux.

It allows to easily:

- have a working React - Redux project in minutes
- use Reacticoon and community plugins that implements common websites modules, such as:
  - logging
  - error reporting
  - form handling
  - data persistance
  - You can look at the [Reacticoon plugin documentation](./doc/plugin.md)
- create your own modules
- create your own plugins

## TODO

### api

- refactor `ApiManager` to use `fetch` API


- For now peerDependency must be duplicate in dev dependencies... see https://github.com/yarnpkg/yarn/issues/1503

### Plugins

- forms
- searches
- dialogs (without any UI, add `material-ui-dialogs` plugin)
- material-ui
  - theme
  - dialog
- data catcher
- analytics
