import React from 'react'

import { Link } from 'reacticoon/routing'
import DashboardIcon from '@material-ui/icons/Dashboard'
import Piece from './Piece'

const DashboardPiece = () => (
  <Piece name="Dashboard">
    <Piece.Header>
      <Link
        to={Link.getRoute('REACTICOON_DASHBOARD')}
        newTab
        style={{ paddingRight: 8, paddingLeft: 8 }}
      >
        <DashboardIcon color="white" />
      </Link>
    </Piece.Header>
  </Piece>
)

export default DashboardPiece
