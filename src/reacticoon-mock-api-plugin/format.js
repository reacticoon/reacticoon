import { createListFormatter, createFormatter, createSubObjectFormatter } from 'reacticoon/format'
import { formatEndpoint } from 'reacticoon/api/utils'

const formatRequest = request => {
  request.formattedEndpoint = formatEndpoint(request.endpoint, request.params)

  return request
}

const formatMockedCall = createFormatter(createSubObjectFormatter('request', formatRequest))

export const formatMockedCalls = createListFormatter(formatMockedCall)
