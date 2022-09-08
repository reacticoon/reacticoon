import { useDispatch } from 'react-redux'

import {
  redirectTo,
  replaceWith,
  reloadTo,
  goBack,
  openOnNewTab,
  openExternalLink,
  redirectToExternal,
  updatePageQueries,
} from './actions.js'

function useRouting() {
	const dispatch = useDispatch()

	return {
		redirectTo: (...args) => dispatch(redirectTo.apply(null, args)),
		replaceWith: (...args) => dispatch(replaceWith.apply(null, args)),
		reloadTo: (...args) => dispatch(reloadTo.apply(null, args)),
		goBack: (...args) => dispatch(goBack.apply(null, args)),
		redirectToExternal: (...args) => dispatch(redirectToExternal.apply(null, args)),
		updatePageQueries: (...args) => dispatch(updatePageQueries.apply(null, args)),
		// no dispatch
		openExternalLink,
		openOnNewTab,
	}
}

export default useRouting