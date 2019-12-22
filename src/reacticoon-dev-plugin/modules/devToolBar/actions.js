import { createAction } from 'reacticoon/action'

import { updatePageQueries } from 'reacticoon/routing'

export const displayDevToolbarRoute = createAction(
  'ReacticoonDevToolbar::displayDevToolbarRoute',
  route => {
    if (route) {
      // TODO: debug
      updatePageQueries({
        rcView: route,
      })
    }

    return {
      route,
    }
  }
)
