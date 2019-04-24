import React from 'react'

// TODO: fix with lib
// https://github.com/mac-s-g/react-json-view
// import ReactJson from 'react-json-view'

import { getStore } from 'reacticoon/store'

const DevToolbarStoreInfo = () => (
  <div>
    <pre style={{ overflow: 'scroll', height: '80vh', width: '40vw' }}>
      {JSON.stringify(getStore().getState(), null, 2)}
    </pre>
    {/* <ReactJson theme="monokai" src={{ test: 42 }} /> */}
    {/* <ReactJson src={JSON.stringify(getStore().getState())} /> */}
  </div>
)

export default DevToolbarStoreInfo
