const reacticoonDocUrl = process.env.__REACTICOON_DOC_URL__

/**
 * Generates a Reacticoon doc url.
 *
 * @param {string} filename
 */
const generateDocUrl = filename => {
// TODO: generate __REACTICOON_DOC_URL__ on create-reacticoon-app
  return `${reacticoonDocUrl}/${filename}`
}
