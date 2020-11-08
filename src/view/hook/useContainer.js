import React from 'react'

const ContainerChild = React.memo(({ container, options, handleDataChange }) => {
  const children = React.createElement(
    container, 
    { 
      ...options, 
      children: data => {
        handleDataChange(data)
      }
    }
  )
  
  return children
}, (prevProps, nextProps) => prevProps?.options !== nextProps?.options)

const useContainer = (container, containerProps, options) => {
  // default null to handle the onMount option.
  const [containerData, setContainerData] = React.useState(null)
  const [mounted, setMounted] = React.useState(false)

  const handleDataChange = React.useCallback((data) => {
    if (data) {
      setContainerData(data)
    }
    if (!mounted && !containerData && data) {
      console.log('mounted !')
      options?.onMount && options.onMount(data)
      setMounted(true)
    }
  }, []);

  return { 
    ...(containerData ?? {}), // empty data to avoid crash
    children: <ContainerChild container={container} options={containerProps} handleDataChange={handleDataChange} />
  }
}

export default useContainer