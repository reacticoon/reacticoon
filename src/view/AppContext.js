import { connect } from 'reacticoon/view'
import { createFormatter } from 'reacticoon/format'
import { createSelector } from 'reacticoon/selector'
import { getBrowserTimeZone } from 'reacticoon/date'
import { getBrowserInfo } from 'reacticoon/browser'

// TODO: allow app to add data on context

import { __VERSION__, __APP_GIT_COMMIT__ } from 'reacticoon/environment'

const formatBrowserInfo = data => {
  data.browser = {
    timeZone: getBrowserTimeZone(),
    ...getBrowserInfo(),
  }
  return data
}

const formatBuildIndo = data => {
  data.build = {
    version: __VERSION__,
    appGitCommit: __APP_GIT_COMMIT__,
  }
  return data
}

export const formatAppData = createFormatter(formatBrowserInfo, formatBuildIndo)

export const getAppData = createSelector([], () => {
  // empty for now since we do not have data on store.
  return formatAppData({})
})


const AppContext = ({ appData, children }) => children({
  appData
})

const mapStateToProps = (state, props) => ({
  appData: getAppData(state),
})

export default connect(
  mapStateToProps,
  { }
)(AppContext)