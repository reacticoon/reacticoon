
export const URL = "http://localhost:9191"

const ReacticoonDevApi = {
  command: (command) => ({
    url: URL,
    endpoint: '/commands',
    type: 'POST',
    body: {
      command: command, // 'CHECKUP', 'PLUGINS'
    },
  }),

}

export default ReacticoonDevApi
