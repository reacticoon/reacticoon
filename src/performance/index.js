// inspired by https://github.com/facebook/react/blob/9c6ff136c78e934a19d0da950139e4d912ae54c2/packages/react-reconciler/src/ReactDebugFiberPerf.js

import { enableUserTimingAPI } from 'reacticoon/environment/featureFlags'
export const performance = global.performance || {}

export const hasNativePerformanceNow =
  typeof performance === 'object' && typeof performance.now === 'function'

// Prefix measurements so that it's possible to filter them.
// Longer prefixes are hard to read in DevTools.
const reactEmoji = '\u269B' // atom symbol
const warningEmoji = '\u26D4'
const supportsUserTiming =
  typeof performance !== 'undefined' &&
  typeof performance.mark === 'function' &&
  typeof performance.clearMarks === 'function' &&
  typeof performance.measure === 'function' &&
  typeof performance.clearMeasures === 'function'

//
// Mark
// A performance mark is a named performance entry that is created by the application.
// The mark is a timestamp in the browser's performance timeline.
// https://developer.mozilla.org/en-US/docs/Web/API/User_Timing_API#Performance_marks
//

export const beginMark = markName => {
  if (supportsUserTiming && enableUserTimingAPI) {
    performance.mark(formatMarkName(markName))
  }
}

export const clearMark = markName => {
  if (supportsUserTiming && enableUserTimingAPI) {
    performance.clearMarks(formatMarkName(markName))
  }
}

export const endMark = (label, markName, warning = null) => {
  if (supportsUserTiming && enableUserTimingAPI) {
    const formattedMarkName = formatMarkName(markName)
    const formattedLabel = formatLabel(label, warning)
    try {
      performance.measure(formattedLabel, formattedMarkName)
    } catch (err) {
      // If previous mark was missing for some reason, this will throw.
      // This could only happen if React crashed in an unexpected place earlier.
      // Don't pile on with more errors.
    }
    // Clear marks immediately to avoid growing buffer.
    // TODO: uncomment
    // performance.clearMarks(formattedMarkName)
    // performance.clearMeasures(formattedLabel)
  }
}

const formatMarkName = markName => {
  return `${reactEmoji} ${markName}`
}

const formatLabel = (label, warning = null) => {
  const prefix = warning ? `${warningEmoji} ` : `${reactEmoji} `
  const suffix = warning ? ` Warning: ${warning}` : ''
  return `${prefix}${label}${suffix}`
}
