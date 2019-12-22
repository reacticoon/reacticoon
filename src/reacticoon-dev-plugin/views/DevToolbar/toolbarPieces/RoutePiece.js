import React from 'react'

import RoutingContainer from 'reacticoon/routing/RoutingContainer'
import Piece from './Piece'

const RoutePiece = ({ route, routeName }) => (
  <RoutingContainer>
    {({ openOnNewTab, getRoute }) => {
      const openReacticoonDevToolRoutePage = () => {
        openOnNewTab(getRoute('REACTICOON_ROUTING'), {}, { path: route.path, routeName })
      }
      return (
        <Piece name="route">
          <Piece.Header>
            <span style={{ fontSize: 12 }}>{routeName}</span>
          </Piece.Header>
          <Piece.Content>
            {() => [
              {
                label: 'path',
                value: route.path,
                onClick: () => openReacticoonDevToolRoutePage,
              },
              {
                label: 'route',
                value: routeName,
                onClick: openReacticoonDevToolRoutePage,
              },
            ]}
          </Piece.Content>
        </Piece>
      )
    }}
  </RoutingContainer>
)

export default RoutePiece
