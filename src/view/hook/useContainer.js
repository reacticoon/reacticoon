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

const useContainer = (container, options) => {
  const [containerData, setContainerData] = React.useState({})

  const handleDataChange = React.useCallback((data) => {
    setContainerData(data)
  }, []);

  return { 
    ...containerData, 
    children: <ContainerChild container={container} options={options} handleDataChange={handleDataChange} />
  }
}

export default useContainer