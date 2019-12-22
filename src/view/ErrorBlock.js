import React from 'react'
import PropTypes from 'prop-types'

import isString from 'lodash/isString'
import get from 'lodash/get'
import isNil from 'lodash/isNil'
import isEmpty from 'lodash/isEmpty'

import { tr } from 'reacticoon/i18n'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => {
  return {
    errorBlock: {
      marginTop: 20,
      color: theme.app.colors.error,
      textAlign: 'center',
    },
  }
}

class ErrorBlock extends React.Component {
  constructor(props) {
    super(props)

    this.setMessage(props)
  }

  componentWillReceiveProps(nextProps) {
    const newMessage = isEmpty(get(nextProps, 'error.localizedMessage'))
      ? get(nextProps, 'error.message', null)
      : tr(nextProps.error.localizedMessage)
    if (this.message !== newMessage) {
      this.setMessage(nextProps)
    }
  }

  setMessage(props) {
    if (!isNil(props.error)) {
      if (isString(props.error)) {
        this.message = props.error
      } else {
        this.message = isEmpty(get(props, 'error.localizedMessage'))
          ? get(props, 'error.message', null)
          : tr(props.error.localizedMessage)
      }
    }
  }

  render() {
    const { error, classes, } = this.props

    if (isNil(error)) {
      return null
    }

        return <div className={classes.errorBlock}>{this.message}</div>
  }
}

ErrorBlock.defaultProps = {
}

ErrorBlock.propTypes = {
  error: PropTypes.object,
}

export default withStyles(styles)(ErrorBlock)
