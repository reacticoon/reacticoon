import React from 'react'

const MockedCall = ({ mockedCall, onClick }) => (
  <div onClick={onClick}>
    [{mockedCall.request.type}] {mockedCall.request.formattedEndpoint}
  </div>
)

export default MockedCall
