import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'reacticoon/view'
import CommandModule from '../../../modules/command'

import BuildReport from './BuildReport'

class CheckupView extends Component {
  constructor(props) {
    super(props)

    this.props.runCommand('ANALYZE_BUILD')
  }

  render() {
    const { report, isFetching } = this.props
    try {
    return (
      <div>
        {isFetching && <div>loading</div>}
        {report && (
          <BuildReport report={report} />
        )}
      </div>
    ); } catch (e) { console.error(e) }
  }
}

const mapStateToProps = (state) => ({
  isFetching: CommandModule.getSelector('isFetchingCommandData')(state),
  report: CommandModule.getSelector('getCommandData')(state),
});

export default connect(mapStateToProps, CommandModule.getActionsMap('runCommand'))(CheckupView)