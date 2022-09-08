import React from 'react'
import { createSimpleContainer } from './createSimpleContainer'

import { createApiSelectors } from 'reacticoon/selector'
import { createApiCallAction } from 'reacticoon/action'

const myApiCallAction = createApiCallAction('TEST', {}, null)

const apiSelectors = createApiSelectors('App::TestModule')

const container = createSimpleContainer('MyTestContainer', {
  apiCallAction: myApiCallAction,
  apiSelectors,
  mapChildrenProps: childrenProps => {
    return {
      ...childrenProps,
      addedProp: 42,
    }
  },
})

function renderContainer() {
  return (
    <container
      apiCallParameters={{
        loadParameter: 'test',
      }}
    >
      {({ isPending, data, error }) => <div />}
    </container>
  )
}

renderContainer()
