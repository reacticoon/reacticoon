import React from 'react'

import ReacticoonLogo from '../../../components/svg/ReacticoonLogo'
import Piece from './Piece'

const ReacticoonLogoPiece = ({ onClick }) => (
  <Piece
    name="ReacticoonLogo"
    onClick={onClick}
    headerStyle={{ paddingLeft: 16, paddingRight: 16 }}
  >
    <Piece.Header>
      <div>
        <ReacticoonLogo height={36} />
      </div>
    </Piece.Header>
  </Piece>
)

export default ReacticoonLogoPiece
