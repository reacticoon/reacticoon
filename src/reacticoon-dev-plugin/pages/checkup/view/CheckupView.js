import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'reacticoon/view'
import CommandModule from '../../../modules/command'

import CheckupReport from './CheckupReport'

class CheckupView extends Component {
  constructor(props) {
    super(props)

    this.props.runCommand('CHECKUP')
  }

  render() {
    const { checkup, isFetching } = this.props
    return (
      <div>
        {isFetching && <div>loading</div>}
        {checkup && (
          <CheckupReport checkup={checkup} />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isFetching: CommandModule.getSelector('isFetchingCommandData')(state),
  checkup: CommandModule.getSelector('getCommandData')(state),
});

export default connect(mapStateToProps, CommandModule.getActionsMap('runCommand'))(CheckupView)