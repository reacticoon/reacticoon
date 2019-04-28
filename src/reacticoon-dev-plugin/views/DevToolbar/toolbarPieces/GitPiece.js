import React from 'react'

import { withStyles } from '@material-ui/core/styles'
import CommandContainer from 'reacticoon/reacticoon-dev-plugin/modules/command/view/CommandContainer'
import GitIcon from '../../../components/svg/Git'
import Piece from './Piece'

const styles = theme => ({
  root: {
    paddingLeft: theme.spacing.unit * 6,
    display: 'flex',
    alignItems: 'center',
  },
})

const GitPiece = ({ classes }) => (
  <CommandContainer command="DEV_TOOLS::GIT_INFO">
    {({ data }) => (
      <Piece name="git">
        <Piece.Header>
          <GitIcon />
          &nbsp;{data.currentBranch}
        </Piece.Header>

        <Piece.Content>
          {() => [
            {
              label: 'date',
              value: data.date,
            },
            { label: 'Author', value: data.author },
            { label: 'commit', value: data.message },
            { label: '#', value: data.commitId },
          ]}
        </Piece.Content>
      </Piece>
    )}
  </CommandContainer>
)

export default withStyles(styles)(GitPiece)
