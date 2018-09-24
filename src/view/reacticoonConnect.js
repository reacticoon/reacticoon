//
// POC: replace the react-redux `connect` by our custom that will handle modules.
// For now, it creates a `connect` HOC (named `ConnectModule`), that will call the react-redux
// `connect`.
//
// Note: the call of react-redux `connect` the way it is made for now could not be efficient since
// we compose on our `Connect` render, instead of doing before exporting the component
// 
//

import React from 'react'
import isEmpty from 'lodash/isEmpty'
import isString from 'lodash/isString'
import invariant from 'invariant'

import { connect as ReactReduxConnect } from 'react-redux'
import hoistStatics from 'hoist-non-react-statics'
// import { compose } from 'redux'

import { getModulesMapForView } from '../module/config'

const connect = (
  moduleList = [],
  mapStateToPropsCreator,
  mapDispatchToPropsCreator,
  mergeProps,
  connectExtraOptions
) => WrappedComponent => {
  const methodName = 'connectModule'

  const getDisplayName = name => `ConnectModule(${name})`

  // following inspired by https://github.com/reactjs/react-redux/blob/master/src/components/connectAdvanced.js#L261:5

  invariant(
    typeof WrappedComponent == 'function',
    `You must pass a component to the function returned by ` +
      `${methodName}. Instead received ${JSON.stringify(WrappedComponent)}`
  )

  const wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component'

  const displayName = getDisplayName(wrappedComponentName)

  class Connect extends React.Component {
    shouldComponentUpdate() {
      return true
    }

    render() {
      const modulesMap = isEmpty(moduleList) ? {} : getModulesMapForView(moduleList)

      // params to pass to the mapState / mapDispatch functions.
      // Those are functions that will create the react-redux connect function parameters
      // we pass a single parameter that can be (considering moduleNames prop)
      // - the module if a single module is asked for
      // - a map of modules if multiple modules are asked
      const params = isEmpty(moduleList)
        ? null
        : isString(moduleList)
          ? modulesMap[moduleList]
          : moduleList.length === 1 ? modulesMap[moduleList[0]] : modulesMap

      const mapStateToProps = mapStateToPropsCreator(params)
      const mapDispatchToProps = mapDispatchToPropsCreator(params)

      const props = {
        ...this.props,
        ...modulesMap,
      }

      const connectedComponent = ReactReduxConnect(
        mapStateToProps,
        mapDispatchToProps,
        mergeProps,
        connectExtraOptions
      )(WrappedComponent)

      return React.createElement(connectedComponent, props)
    }
  }

  Connect.WrappedComponent = WrappedComponent
  Connect.displayName = displayName

  return hoistStatics(Connect, WrappedComponent)
}

export default connect
