import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'reacticoon/view'
import CommandModule from '../../../modules/command'

import PluginsReport from './PluginsReport'

class PluginsView extends Component {
  constructor(props) {
    super(props);

    this.props.runCommand('PLUGINS')
  }

  render() {
    const { pluginsReport, isFetching } = this.props
    return (
      <div>
        {isFetching && <div>loading</div>}
        {pluginsReport && (
          <PluginsReport pluginsReport={pluginsReport} />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isFetching: CommandModule.getSelector('isFetchingCommandData')(state),
  pluginsReport: CommandModule.getSelector('getCommandData')(state),
});

export default connect(mapStateToProps, CommandModule.getActionsMap('runCommand'))(PluginsView)