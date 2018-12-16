
export const URL = "http://localhost:9191"

const ReacticoonDevApi = {
  checkup: () => ({
    url: URL,
    endpoint: '/commands',
    type: 'POST',
    body: {
      command: 'CHECKUP'
    },
  }),

}

export default ReacticoonDevApi