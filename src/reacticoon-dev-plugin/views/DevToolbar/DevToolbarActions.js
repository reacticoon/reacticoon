import React from 'react'

import { getStore } from 'reacticoon/store'
import ActionsList from './ActionsList'

class DevToolbarActions extends React.Component {
  constructor(props) {
    super(props)

    this.actionType = React.createRef()
    this.actionContent = React.createRef()
  }

  dispatch() {
    const type = 'BOOK::GET::SUCCESS' //this.actionType.current.value
    const content = {
      response: {
        id: 10,
        name: 'Detective book - cold case',
        description: 'Links about cold cases',
        owner: {
          id: 2,
          name: 'Circle public #1',
        },
      },
    } //JSON.parse(this.actionContent.current.value)

    const action = {
      type,
      ...content,
    }

    getStore().dispatch(action)
  }

  render() {
    return (
      <div>
        <div>
          <ActionsList />
        </div>

        <div>
          <input type="text" placeholder="action type" ref={this.actionType} />
          <textarea ref={this.actionContent} />
          <button onClick={() => this.dispatch()}>Dispatch</button>
        </div>
      </div>
    )
  }
}

export default DevToolbarActions
