import React from 'react'
import { Link } from 'reacticoon/routing'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import DashboardIcon from '@material-ui/icons/Dashboard'
import LayersIcon from '@material-ui/icons/Layers'
import AppsIcon from '@material-ui/icons/Apps'
import ExploreIcon from '@material-ui/icons/Explore'
import WhatshotIcon from '@material-ui/icons/Whatshot'

export const mainListItems = (
  <div>
    <Link to={Link.getRoute('REACTICOON_DASHBOARD')}>
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
    </Link>

    <Link to={Link.getRoute('REACTICOON_ROUTING')}>
      <ListItem button>
        <ListItemIcon>
          <ExploreIcon />
        </ListItemIcon>
        <ListItemText primary="Routing" />
      </ListItem>
    </Link>

    <Link to={Link.getRoute('REACTICOON_MY_APP')}>
      <ListItem button>
        <ListItemIcon>
          <WhatshotIcon />
        </ListItemIcon>
        <ListItemText primary="App" />
      </ListItem>
    </Link>

    <Link to={Link.getRoute('REACTICOON_PLUGINS')}>
      <ListItem button>
        <ListItemIcon>
          <AppsIcon />
        </ListItemIcon>
        <ListItemText primary="Plugins" />
      </ListItem>
    </Link>
    
    <Link to={Link.getRoute('REACTICOON_REPORTS')}>
      <ListItem button>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Reports" />
      </ListItem>
    </Link>

  </div>
)

export const secondaryListItems = (
  <div>
  </div>
)