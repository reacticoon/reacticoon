import React from 'react'
import PropTypes from 'prop-types'
import isFunction from 'lodash/isFunction'
import get from 'lodash/get'

import { withStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = theme => ({
  loadingBlockContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
    // minHeight: 50,
  },
  loadingBlock: {
    left: 0,
    top: 0,
    backgroundColor: props =>
      props.background || get(theme, 'app.loadingBlock.background', theme.palette.background.paper),
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  circularProgress: {},
})

const LoadingBlock = ({ size = 50, show = false, children = null, classes }) => {
  if (!show) {
    // it happens that the children need data to be rendered. This data is not available while the
    // loading is made.
    // But even if we don't display the children here because we are showing the loading, the children
    // is build
    // Passing the children as a function avoid to re-check the conditions to render it, that is mostly
    // the same condition pass to the `show` prop.
    if (isFunction(children)) {
      return children()
    }
    return children
  }

  return (
    <div className={classes.loadingBlockContainer} style={{ minHeight: size }}>
      <div className={classes.loadingBlock}>
        <CircularProgress size={size} className={classes.circularProgress} />
      </div>
    </div>
  )
}

LoadingBlock.propTypes = {
  size: PropTypes.number,
  show: PropTypes.bool.isRequired,
}

export default withStyles(styles)(LoadingBlock)
