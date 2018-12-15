import React from 'react'
import { Link } from 'reacticoon/routing'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import DashboardIcon from '@material-ui/icons/Dashboard'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import PeopleIcon from '@material-ui/icons/People'
import LayersIcon from '@material-ui/icons/Layers'
import AppsIcon from '@material-ui/icons/Apps'
import ExploreIcon from '@material-ui/icons/Explore'
import AssignmentIcon from '@material-ui/icons/Assignment'

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

    <Link to={Link.getRoute('REACTICOON_PLUGINS')}>
      <ListItem button>
        <ListItemIcon>
          <AppsIcon />
        </ListItemIcon>
        <ListItemText primary="Plugins" />
      </ListItem>
    </Link>
    
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItem>
    
  </div>
)

export const secondaryListItems = (
  <div>
  </div>
)