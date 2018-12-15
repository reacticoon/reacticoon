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
import AssignmentIcon from '@material-ui/icons/Assignment'

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItem>
     <Link to={Link.getRoute('REACTICOON_PLUGINS')}>
    <ListItem button>
     
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Plugins" />

    </ListItem>
      </Link>
  </div>
)

export const secondaryListItems = (
  <div>
   
  </div>
)