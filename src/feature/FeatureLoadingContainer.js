import React from 'react'

/**
 * Code example:
 *
 * ```
 * import React from 'react'
 * 
 * import FeatureLoadingContainer from 'reacticoon/modules/feature/FeatureLoadingContainer'
 * 
 * const ExperimentalFeature = React.lazy(() => import('./MyPage'))
 * 
 * class MyFeaturePage extends React.Component {
 *   render() {
 *     return FEATURE_PLUGIN_MARKETPLACE ? (
 *       <DevFeatureLoadingContainer
 *         view={ExperimentalFeature}
 *         featureName="MY_FEATURE"
 *       />
 *     ) : null
 *   }
 * }
 * 
 * export default MyFeaturePage
 * ```
 * 
 * You can create your own app feature loading with your own fallback. For example on our dev plugin
 * 
 * ```
 * import React from 'react'
 * 
 * import FeatureLoadingContainer from 'reacticoon/feature/FeatureLoadingContainer'
 * import LoadingPageView from 'reacticoon-plugin-dev/components/LoadingPageView'
 * 
 * const DevFeatureLoadingContainer = ({ view, featureName, ...props }) => (
 *   <FeatureLoadingContainer
 *     view={view}
 *     fallback={
 *       <LoadingPageView
 *         text={
 *           <span>
 *             Loading feature
 *             <br />
 *             {featureName}
 *           </span>
 *         }
 *       />
 *     }
 *     {...props}
 *   />
 * )
 * 
 * export default DevFeatureLoadingContainer

 * ```
 */
const FeatureLoadingContainer = ({ view, featureName, fallback, ...props }) => {
  return (
    <React.Suspense fallback={fallback || <div>Loading feature {featureName}...</div>}>
      {React.createElement(view, props)}
    </React.Suspense>
  )
}

export default FeatureLoadingContainer
