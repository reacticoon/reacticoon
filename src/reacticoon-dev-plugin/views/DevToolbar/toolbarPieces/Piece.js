import React from 'react'

import isArray from 'lodash/isArray'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import { StateContainer } from 'reacticoon/view'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

const styles = theme => ({
  root: {},
  header: {
    height: theme.app.toolbar.height,
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    color: 'white',
    cursor: 'pointer',

    '&:hover': {
      backgroundColor: theme.app.toolbar.colors.hover,
    },
  },
  headerSelected: {
    backgroundColor: theme.app.toolbar.colors.hover,
  },
  headerWarn: {
    backgroundColor: theme.app.toolbar.colors.warn,
  },
  headerError: {
    backgroundColor: theme.app.toolbar.colors.error,
  },
  headerGood: {
    backgroundColor: theme.app.toolbar.colors.good,
  },
  menu_Paper: {
    borderRadius: 0,
  },
  content: {
    padding: theme.spacing.unit,
    backgroundColor: theme.app.toolbar.colors.hover,
    maxWidth: 480,
    maxHeight: 480,
  },
  item: {
    color: 'white',
    padding: 0,

    '& b': {
      color: '#AAA',
      display: 'table-cell',
      fontSize: '11px',
      padding: '4px 8px 4px 0',
    },
  },
  itemValue: {
    fontSize: 13,
  },
})

const Piece = ({ onClick, name, classes, children, headerStyle = {} }) => {
  const anchorEl = React.useRef(null)
  return (
    <StateContainer>
      {({ state, setState }) => {
        const timeoutLength = 300

        const header = isArray(children) ? children[0] : children
        const content = isArray(children) && children[1] ? children[1].props.children : null

        const handleClick = event => {
          onClick && onClick(event)
          setState({
            open: true,
          })
        }

        const handleClose = () => {
          setState({
            mouseOverButton: false,
            mouseOverMenu: false,
          })
        }

        const enterButton = event => {
          setState({ mouseOverButton: true })
        }

        const leaveButton = () => {
          // Set a timeout so that the menu doesn't close before the user has time to
          // move their mouse over it
          setTimeout(() => {
            setState({ mouseOverButton: false })
          }, timeoutLength)
        }

        const enterMenu = () => {
          setState({ mouseOverMenu: true })
        }

        const leaveMenu = () => {
          setTimeout(() => {
            setState({ mouseOverMenu: false })
          }, timeoutLength)
        }

        // Calculate open state based on mouse location
        const open = state.mouseOverButton || state.mouseOverMenu || false

        return (
          <div className={classes.root}>
            <div
              aria-owns={state.open ? name : null}
              aria-haspopup="true"
              onClick={handleClick}
              ref={anchorEl}
              onMouseEnter={enterButton}
              onMouseLeave={leaveButton}
              className={classNames(classes.header, {
                [classes.headerSelected]: open,
              })}
              style={headerStyle}
            >
              {header}
            </div>

            {content && (
              <Menu
                id={name}
                anchorEl={anchorEl.current}
                open={open}
                onClose={handleClose}
                //anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                classes={{ paper: classes.menu_Paper }}
                MenuListProps={{
                  onMouseEnter: enterMenu,
                  onMouseLeave: leaveMenu,
                  classes: { root: classes.content },
                }}
              >
                {content().map((content, index) => (
                  <MenuItem key={index} className={classes.item}>
                    <b>{content.label}</b>{' '}
                    <span className={classes.itemValue}>{content.value}</span>
                  </MenuItem>
                ))}
              </Menu>
            )}
          </div>
        )
      }}
    </StateContainer>
  )
}

Piece.Header = ({ children }) => children
Piece.Content = ({ children }) => children

export default withStyles(styles)(Piece)
