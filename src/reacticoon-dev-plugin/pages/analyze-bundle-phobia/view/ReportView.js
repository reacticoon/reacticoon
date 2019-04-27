import React from 'react'

import CommandContainer from '../../../modules/command/view/CommandContainer'
import BundlePhobiaReport from './BundlePhobiaReport'

const ReportView = () => (
  <CommandContainer command="BUNDLE_PHOBIA">
    {({ data: report }) => <BundlePhobiaReport report={report} />}
  </CommandContainer>
)

export default ReportView
