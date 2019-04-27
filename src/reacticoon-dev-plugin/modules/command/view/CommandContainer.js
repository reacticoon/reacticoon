import React, { Component } from 'react'

import { connect } from 'reacticoon/view'
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

const makeMapStateToProps = () => (state, props) => ({
  isFetching: CommandModule.getSelector('makeIsFetchingCommandData')()(state, props),
  data: CommandModule.getSelector('makeGetCommandData')()(state, props),
})

const ConnectedCommandContainer = connect(
  makeMapStateToProps,
  CommandModule.getActionsMap('runCommand')
)(CommandContainer)

// default props here so mapStateToProps has default props too
ConnectedCommandContainer.defaultProps = {
  // allow to define an id to run multiple time the same command
  id: 'NO_ID',
  payload: null,
  queryPrams: {},
}

export default ConnectedCommandContainer
