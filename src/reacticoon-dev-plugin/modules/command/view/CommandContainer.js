import React, { Component } from 'react'

import CommandModule from '../../../modules/command'

class CommandContainer extends Component {
  constructor(props) {
    super(props)

    this.props.runCommand(this.props.id, this.props.command, {
      queryParams: this.props.queryParams,
      payload: this.props.payload,
    })
  }

  render() {
    const { data, isFetching, children } = this.props

    return (
      <React.Fragment>
        {isFetching && <div>loading</div>}
        {data &&
          children({
            data,
            isFetching,
          })}
      </React.Fragment>
    )
  }
}

export default CommandModule.connect(
  CommandContainer,
  {
    isFetching: 'makeIsFetchingCommandData',
    data: 'makeGetCommandData',
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
