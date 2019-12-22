import React, { Component } from 'react'

import CommandModule from '../../../modules/command'
import LoadingContainer from 'reacticoon/view/LoadingContainer'
import ErrorBlock from 'reacticoon/view/ErrorBlock'

class CommandContainer extends Component {
  constructor(props) {
    super(props)

    this.props.runCommand(this.props.id, this.props.command, {
      queryParams: this.props.queryParams,
      payload: this.props.payload,
    })
  }

  render() {
    const { data, isFetching, error, children } = this.props

    return children({
      data,
      isFetching,
      error,
    })
  }
}

const Container = CommandModule.connect(
  CommandContainer,
  {
    isFetching: 'makeIsFetchingCommandData',
    data: 'makeGetCommandData',
    error: 'makeGetCommandError',
  },
  'runCommand',
  {
    // default props here so mapStateToProps has default props too
    defaultProps: {
      // allow to define an id to run multiple time the same command for different data.
      id: '_',
      payload: null,
      queryPrams: {},
    },
  }
)

export default ({ children, ...props }) => (
  <LoadingContainer
    container={<Container {...props} />}
    show={({ data, isFetching, error }) => isFetching || (!data && !error)}
  >
    {({ data, error }) => (
      <React.Fragment>
        {error ? (
          error.code === 'NO_INTERNET' ? (
            <div>The development server is not running. Learn more. TODO: link to doc</div>
          ) :
          <ErrorBlock error={error} />
        ) : ( 
          children({
            data,
          })
        )}
      </React.Fragment>
    )}
  </LoadingContainer>
)
