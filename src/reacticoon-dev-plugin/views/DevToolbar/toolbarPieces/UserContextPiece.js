import React from 'react'

import { withStyles } from '@material-ui/core/styles'
import UserContextContainer from 'reacticoon/reacticoon-dev-plugin/modules/userContext/container'
import UserIcon from '@material-ui/icons/AccountCircle'
import Piece from './Piece'

const styles = theme => ({
  userAvatar: {
    width: 36,
    height: 36,
  },
})

const UserContextPiece = ({ classes }) => (
  <UserContextContainer>
    {({ userContext }) => (
      <Piece name="userContext">
        <Piece.Header>
          {userContext && userContext.avatar ? (
            <img src={userContext.avatar} className={classes.userAvatar} alt="user avatar" />
          ) : (
            <UserIcon />
          )}
          &nbsp;
          <span>{userContext ? userContext.username : 'Anonymous'}</span>
        </Piece.Header>

        {userContext && (
          <Piece.Content>
            {() => [
              {
                label: 'Username',
                value: userContext.username,
              },
              { label: 'Email', value: userContext.email },
            ]}
          </Piece.Content>
        )}
      </Piece>
    )}
  </UserContextContainer>
)

export default withStyles(styles)(UserContextPiece)
