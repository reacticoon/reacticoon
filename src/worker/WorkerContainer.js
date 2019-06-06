import React from 'react'

import useWorker from './useWorker'

const WorkerContainer = React.memo(({ children, data, worker }) => {
  const workerData = useWorker(worker, data)
  return children({
    data,
    ...workerData,
  })
})

export default WorkerContainer
