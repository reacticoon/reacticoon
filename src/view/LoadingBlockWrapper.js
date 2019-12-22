import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'

import LoadingBlock from './LoadingBlock'

const styles = theme => ({
  loadingBlockWrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1000,
    top: 0,
    left: 0,
  },
  loadingBlock: {},
})

/**
 * This wrapper comes above its first relative parent
 * Typically used to load a block or the entire page.
 */
const LoadingBlockWrapper = ({ show, size, children, classes }) => {
  if (!show) {
    return null
  }

  // span instead of div because we use it on table, and table can't contain div
  return (
    <span className={classes.loadingBlockWrapper}>
      {children || <LoadingBlock show={show} className={classes.loadingBlock} size={size} />}
    </span>
  )
}

LoadingBlockWrapper.propTypes = {
  show: PropTypes.bool.isRequired,
}

export default withStyles(styles)(LoadingBlockWrapper)