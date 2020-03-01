//
// Abstract for react-loadable
//
// https://github.com/jamiebuilds/react-loadable
//
import Loadable from 'react-loadable'

/**
 *
 * @param {*} loader
 * @param {*} loading
 */
export const createLoadable = (loader, loading) => {
  return Loadable({
    loader: () => {
      if (FEATURE_REACTICOON_HEAVY_DEBUG) {
        console.info(`[Loadable] loading`)
      }

      return loader()
    },
    loading,
  })
}

export default Loadable
