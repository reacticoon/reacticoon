import React from 'react'

import CommandContainer from '../../../modules/command/view/CommandContainer'
import BuildReport from './BuildReport'

const ReportView = () => (
  <CommandContainer command="ANALYZE_BUILD">
    {({ data: report }) => <BuildReport report={report} />}
  </CommandContainer>
)

export default ReportView
