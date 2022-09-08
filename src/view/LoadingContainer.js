import React from 'react'
import PropTypes from 'prop-types'

import isFunction from 'lodash/isFunction'
import isString from 'lodash/isString'
import isNil from 'lodash/isNil'
import get from 'lodash/get'

import ErrorBlock from './ErrorBlock'
import LoadingBlock from './LoadingBlock'
import LoadingBlockWrapper from './LoadingBlockWrapper'

/**
 * Shortcut for container that needs to display a LoadingBlock.
 *
 * Note: we could add prop to use a LoadingBlockWrapper instead of LoadingBlock.
 *
 * If a props 'error' is given, we automatically display the api error given by the props if it is a
 * function. It can be a string that gives the variable name to retrieve on the data as an error.
 *
 * Example
 *
 * ```
 * <LoadingContainer
 *   container={
 *     <MyEntityContainer entityId={1} />
 *   }
 *   error={({ myEntityError }) => myEntityError)}
 *   error="myEntityError"
 *   show={({ myEntity, isPendingMyEntity }) =>
 *     isPendingMyEntity || !myEntity
 *   }
 * >
 *   {({ myEntity }) => (
 *      // rest of the code
 *   )}
 * </LoadingContainer>
 * ```
 */
const LoadingContainer = ({ container, show, withWrapper = false, error, children }) => {
  return React.cloneElement(container, {}, data => {
    let errorData
    if (isFunction(error)) {
      errorData = error(data)
    } else if (isString(error)) {
      // variable name
      errorData = get(data, error)
    }

    const shouldShow = show(data) || !isNil(errorData)

    if (errorData) {
      return <ErrorBlock error={errorData} />
    }

    return withWrapper ? (
      <React.Fragment>
        <LoadingBlockWrapper show={shouldShow} />
        {!shouldShow && children(data)}
      </React.Fragment>
    ) : (
      <LoadingBlock show={shouldShow}>{() => children(data)}</LoadingBlock>
    )
  })
}

LoadingContainer.propTypes = {
  show: PropTypes.func.isRequired,
  container: PropTypes.node.isRequired,
  children: PropTypes.func.isRequired,
}

export default LoadingContainer
