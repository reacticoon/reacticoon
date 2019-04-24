import React from 'react'

class StateContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = props.defaultState || {}
  }

  render() {
    return this.props.children({
      setState: (state, callback) => this.setState(state, callback),
      state: this.state,
    })
  }
}

export default StateContainer
