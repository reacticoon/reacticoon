//
// Abstract for react-loadable
//
// https://github.com/jamiebuilds/react-loadable
//
import Loadable from 'react-loadable'
import { isTraceLogLevel } from 'reacticoon/environment'

/**
 *
 * @param {*} loader
 * @param {*} loading
 */
export const createLoadable = (loader, loading) => {
  return Loadable({
    loader: () => {
      if (isTraceLogLevel()) {
        console.info(`[Loadable] loading`)
      }

      return loader()
    },
    loading,
  })
}

export default Loadable
