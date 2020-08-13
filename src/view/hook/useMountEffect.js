import React from 'react'

// https://stackoverflow.com/questions/53120972/how-to-call-loading-function-with-react-useeffect-only-once
const useMountEffect = (fun) => React.useEffect(fun, [])

export default useMountEffect