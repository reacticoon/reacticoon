import React, { Component } from 'react';

import { connect } from 'reacticoon/view'
import CommandModule from '../../../modules/command'

class CommandContainer extends Component {
  constructor(props) {
    super(props)

    this.props.runCommand(this.props.command)
  }

  render() {
    const { report, isFetching, children } = this.props

    return (
      <React.Fragment>
        {isFetching && <div>loading</div>}
        {report && (
          children({
            report,
            isFetching
          })
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  isFetching: CommandModule.getSelector('isFetchingCommandData')(state),
  report: CommandModule.getSelector('getCommandData')(state),
});

export default connect(mapStateToProps, CommandModule.getActionsMap('runCommand'))(CommandContainer)