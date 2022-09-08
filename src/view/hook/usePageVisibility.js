import React from 'react'

// https://blog.sethcorker.com/harnessing-the-page-visibility-api-with-react

export function getBrowserVisibilityProp() {
  if (typeof document.hidden !== "undefined") {
    // Opera 12.10 and Firefox 18 and later support
    return "visibilitychange"
  } else if (typeof document.msHidden !== "undefined") {
    return "msvisibilitychange"
  } else if (typeof document.webkitHidden !== "undefined") {
    return "webkitvisibilitychange"
  }
}

export function getBrowserDocumentHiddenProp() {
  if (typeof document.hidden !== "undefined") {
    return "hidden"
  } else if (typeof document.msHidden !== "undefined") {
    return "msHidden"
  } else if (typeof document.webkitHidden !== "undefined") {
    return "webkitHidden"
  }
}

export function getIsDocumentHidden() {
  return !document[getBrowserDocumentHiddenProp()]
}

function usePageVisibility(onVisibilityChangeParam) {
  const [isVisible, setIsVisible] = React.useState(getIsDocumentHidden())

  const onVisibilityChange = () => {
    setIsVisible(getIsDocumentHidden())
    onVisibilityChangeParam && onVisibilityChangeParam(getIsDocumentHidden())
  }

  React.useEffect(() => {
    const visibilityChange = getBrowserVisibilityProp()
    window.addEventListener(visibilityChange, onVisibilityChange, false)
    return () => {
      window.removeEventListener(visibilityChange, onVisibilityChange)
    }
  })

  return isVisible
}

export default usePageVisibility
