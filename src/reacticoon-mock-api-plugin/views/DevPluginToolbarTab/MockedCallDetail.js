import React from 'react'

const MockedCallDetail = ({ mockedCall }) => (
  <div>
    <div>
      [{mockedCall.request.type}] {mockedCall.request.formattedEndpoint}
    </div>
    {/* TODO: use json view */}
    <pre>{JSON.stringify(mockedCall.data, null, 2)}</pre>
  </div>
)

export default MockedCallDetail
