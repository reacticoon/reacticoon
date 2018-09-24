// this key on `middlewareMap` contains all the middlewares we can't deduce the action it
// applies to:
// - middleware with `actions` that is a function
// - legacy middleware who is not created via `createMiddleware`
export const OTHER_MIDDLEWARES = 'OTHER_MIDDLEWARES'
