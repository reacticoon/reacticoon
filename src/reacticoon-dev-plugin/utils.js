import get from 'lodash/get'
import { getPluginExtensions } from 'reacticoon/plugin/config'

export const getExtendedTabs = () => {
  // retrieve tabs for other plugins.
  // External plugins can extend our DevToolbar using the 'extendPlugins' confing.
  const extensions = getPluginExtensions('ReacticoonDev')
  const extendedTabs = extensions.reduce(
    (tabs, extension) => [...tabs, ...get(extension, 'config.devToolbar.tabs', [])],
    []
  )
  return extendedTabs
}

export const getExtendedDashboardSections = () => {
  // retrieve sections
  // External plugins can extend our Dev dashboard using the 'extendPlugins' confing.
  const extensions = getPluginExtensions('ReacticoonDev')
  const sections = extensions.reduce(
    (sections, extension) => [...sections, ...get(extension, 'config.devDashboard.sections', [])],
    []
  )
  return sections
}
