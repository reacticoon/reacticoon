// https://github.com/davolokh/webpack-feature-flags-plugin
import React from 'react'

/**
 * /!\ This HOC will not remove dead code since webpack does not handle it.
 *
 * It is recommended to use if (flagName) { ... } if you want to remove the feature code from the
 * build.
 *
 * For example:
 *
 * ```
 * import React, { Suspense, lazy } from 'React';
 *
 * const ExperimentalFeature = lazy(() => import('./ExperimentalFeature'));
 * const experimentalFeature = props => <ExperimentalFeature {...props} />;
 *
 * render() {
 *   ...
 *   { EXPERIMENTAL_FEATURE &&
 *     <Suspense fallback='<div>Loading...</div>'>
 *       experimentalFeature
 *     </Suspense>
 *   }
 *   ...
 * }
 * ```
 *
 * See https://webpack.js.org/guides/tree-shaking/#caveats for more information.
 */
const withFeatureFlag = (flagName, ComposedComponent, FallbackComponent) => {
  class FeatureFlagHOC extends React.PureComponent {
    render() {
      const isEnabled = flagName === true
      if (isEnabled) {
        return <ComposedComponent {...this.props} />
      }
      if (FallbackComponent) {
        return <FallbackComponent {...this.props} />
      }
      return null
    }
  }

  return FeatureFlagHOC
}

export default withFeatureFlag
