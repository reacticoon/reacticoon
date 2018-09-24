# Reacticoon development

## Introduction

This document present Reacticoon development process and styleguides.
Read this if you want to participate to Reacticoon, or better understand the codebase.

## Styleguide

### Javascript

We use ES6 javascript.

### `_` prefixed properties

Some properties are prefixed with `_`. The underscore is used to:

- describe a property as private
- describe a property as internal to Reacticoon

No external code should rely on it, since:

- it can be for debug purpose only, and so, not available in production build
- it can be an internal API that could be changed without notice or prior deprecation
