import React from 'react'
import { createLoadable } from 'reacticoon/view'

const createAsyncPage = loader => createLoadable(loader, () => <div>LOADING</div>)

export default createAsyncPage
