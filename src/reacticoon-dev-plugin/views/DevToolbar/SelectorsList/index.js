import React from 'react'
import map from 'lodash/map'
import forEach from 'lodash/forEach'

import { getModules } from 'reacticoon/module'
import ReactFinder from '../../Finderjs'
import SelectorRunner from './SelectorRunner'

class SelectorsList extends React.PureComponent {
  constructor(props) {
    super(props)

    const reactFinderData = map(getModules(), module => ({
      id: module.name,
      label: module.name,
      children: map(module.content.selectors, (selector, selectorName) =>
        // only display actions created with Reacticoon
        ({
          id: `${module.name}_${selectorName}`,
          label: selectorName,
        })
      ),
    }))

    const selectorsMap = {}
    forEach(getModules(), module => {
      forEach(module.content.selectors, (selector, selectorName) => {
        // only display actions created with Reacticoon
        selectorsMap[`${module.name}_${selectorName}`] = {
          selectorName,
          selector,
        }
      })
    })

    this.state = {
      reactFinderData,
      selectorsMap,
      // selectedActionData: null,
      // TODO: change after tests
      selectedSelectorData: selectorsMap['App::CircleModule_makeGetCircle'],
    }
  }

  handleItemSelected = item => {
    const selectorData = this.state.selectorsMap[item.id]

    if (selectorData) {
      this.setState({
        selectedSelectorData: selectorData,
      })
    }
  }

  render() {
    const { reactFinderData, selectedSelectorData } = this.state
    return (
      <div>
        <ReactFinder data={reactFinderData} onItemSelected={this.handleItemSelected} />

        {selectedSelectorData && <SelectorRunner selectorData={selectedSelectorData} />}
      </div>
    )
  }
}

export default SelectorsList
