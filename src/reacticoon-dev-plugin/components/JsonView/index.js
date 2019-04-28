import React from 'react'

import isString from 'lodash/isString'
// https://github.com/mac-s-g/react-json-view
import ReactJson from 'react-json-view'

const JsonView = ({ json }) => <pre>{JSON.stringify(isString(json) ? JSON.parse(json) : json)}</pre>
// Note: disabled since really bad perfs :(
{
  /* <ReactJson
    theme="railscasts"
    iconStyle="square"
    displayDataTypes={false}
    collapseStringsAfterLength={200}
    style={{
      fontSize: 14,
      lineHeight: '15px',
      padding: 8,
    }}
    src={isString(json) ? JSON.parse(json) : json}
  /> */
}

export default JsonView
