import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'reacticoon/view'
import CheckupModule from '../../../modules/checkup'

import CheckupReport from './CheckupReport'

class CheckupView extends Component {
  constructor(props) {
    super(props);

    this.props.runCheckup()
  }

  render() {
    const { checkup, isLoading } = this.props
    return (
      <div>
        {isLoading && <div>loading</div>}
        {checkup && (
          <CheckupReport checkup={checkup} />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: CheckupModule.getSelector('isFetchingCheckupData')(state),
  checkup: CheckupModule.getSelector('getCheckupData')(state),
});

export default connect(mapStateToProps, CheckupModule.getActionsMap('runCheckup'))(CheckupView)