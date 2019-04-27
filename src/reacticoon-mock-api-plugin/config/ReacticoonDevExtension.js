import DevPluginToolbarTab from '../views/DevPluginToolbarTab/DevPluginToolbarTab'
import SwapHorizontalIcon from '@material-ui/icons/SwapHoriz'

export default {
  plugin: 'ReacticoonDev',
  description: 'Adding Api mock tab to toolbar',
  config: {
    devToolbar: {
      tabs: [
        {
          label: 'Api mock',
          view: DevPluginToolbarTab,
        },
      ],
    },
    devDashboard: {
      sections: [
        {
          label: 'Api mock',
          icon: SwapHorizontalIcon,
          route: 'API_MOCK_DASHBOARD',
        },
      ],
    },
  },
}
