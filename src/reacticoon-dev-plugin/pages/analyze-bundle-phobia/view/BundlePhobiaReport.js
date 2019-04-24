import React from 'react'

const BundlePhobiaReport = ({ report, classes }) => (
  <div className={classes.root}>
    {report && report.bundlePhobiaUrl && (
      <iframe
        title="bundle phobia report"
        src={report.bundlePhobiaUrl}
        frameborder="0"
        style={{ width: '100%', height: window.screen.height / 1.6, }}
      />
    )}
  </div>
)

export default BundlePhobiaReport
