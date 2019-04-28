import React from 'react'

import Piece from './Piece'

const RoutePiece = ({ route, routeName }) => (
  <Piece name="route">
    <Piece.Header>{routeName}</Piece.Header>
    <Piece.Content>
      {() => [{ label: 'path', value: route.path }, { label: 'route', value: routeName }]}
    </Piece.Content>
  </Piece>
)

export default RoutePiece
