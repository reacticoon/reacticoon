import React from 'react'

import CommandContainer from '../../../modules/command/view/CommandContainer'
import CheckupReport from './CheckupReport'

const ReportView = () => (
  <CommandContainer command="CHECKUP">
    {({ report }) => <CheckupReport report={report} />}
  </CommandContainer>
)

export default ReportView
