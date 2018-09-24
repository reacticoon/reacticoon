//
// Abstract for react-loadable
//
// https://github.com/jamiebuilds/react-loadable
//
import Loadable from 'react-loadable'
import { __DEV__ } from '../environment'

/**
 * 
 * @param {*} loader 
 * @param {*} loading 
 */
export const createLoadable = (loader, loading) => {
  return Loadable({
    loader: () => {
      if (__DEV__) {
        console.info(`[Loadable] loading`)
      }

      return loader()
    },
    loading,
  })
}

export default Loadable
