import React from 'react'
import map from 'lodash/map'
import forEach from 'lodash/forEach'

import { getModules } from 'reacticoon/module'
import ReactFinder from '../../Finderjs'
import ActionInfoRunner from './ActionInfoRunner'

class ActionsList extends React.PureComponent {
  constructor(props) {
    super(props)

    const reactFinderData = map(getModules(), module => ({
      id: module.name,
      label: module.name,
      children: map(module.content.actions, (action, actionName) =>
        // only display actions created with Reacticoon
        !action.isActionType
          ? null
          : {
              id: `${module.name}_${actionName}`,
              label: actionName,
            }
      ).filter(Boolean),
    }))

    const actionsMap = {}
    forEach(getModules(), module => {
      forEach(module.content.actions, (action, actionName) => {
        // only display actions created with Reacticoon
        if (action.isActionType) {
          actionsMap[`${module.name}_${actionName}`] = {
            actionName,
            action,
          }
        }
      })
    })

    this.state = {
      reactFinderData,
      actionsMap,
      // selectedActionData: null,
      // TODO: change after tests
      selectedActionData: actionsMap['App::CircleModule_fetchCircle'],
    }
  }

  handleItemSelected = item => {
    const actionData = this.state.actionsMap[item.id]

    if (actionData) {
      this.setState({
        selectedActionData: actionData,
      })
    }
  }

  render() {
    const { reactFinderData, selectedActionData } = this.state
    return (
      <div>
        <ReactFinder data={reactFinderData} onItemSelected={this.handleItemSelected} />

        {selectedActionData && <ActionInfoRunner actionData={selectedActionData} />}
      </div>
    )
  }
}

export default ActionsList
