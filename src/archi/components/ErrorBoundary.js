import React from 'react'
import PropTypes from 'prop-types'

import { EventManager } from '../../event'

// import ErrorOccuredView from './ErrorOccuredView'

/**
 * catch JavaScript errors anywhere in their child component tree, log those errors, and display a
 * fallback UI instead of the component tree that crashed. Error boundaries catch errors during
 * rendering, in lifecycle methods, and in constructors of the whole tree below them.
 *
 *
 * See https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html
 *
 */
class ErrorBoundary extends React.Component {

  state = {
    hasError: false,
    error: null,
    info: null,
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({
      hasError: true,
      error,
      info,
    })

    // You can also log the error to an error reporting service
    EventManager.dispatch(EventManager.LOG_COMPONENT_DID_CATCH, { error, info })
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      if (this.props.errorView) {
        return this.props.errorView()
      }

      return (
        <div>
          {this.state.error}
          {this.state.info}
        </div>
      )

      // TODO: provide default error view, and use appOptions config
      // return (
      //   <ErrorOccuredView
      //     error={this.state.error}
      //     info={this.state.info}
      //     sentryId={Logger.lastEventId()}
      //   />
      // )
    }

    return this.props.children
  }
}

ErrorBoundary.defaultProps = {
  errorView: null,
}

ErrorBoundary.propTypes = {
  /**
   * View to display when there is an error.
   * By default we display the ErrorOccuredView that details the error.
   */
  errorView: PropTypes.node,
}

export default ErrorBoundary
