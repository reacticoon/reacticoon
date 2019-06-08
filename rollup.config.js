import { terser } from 'rollup-plugin-terser'
import babel from 'rollup-plugin-babel'

const debugMode = true

const packageJson = require('./package.json')

// const babelConfig = {
//   plugins: ['@babel/plugin-proposal-export-default-from'],
// }

const babelConfig = require('./babelConfig')

const reacticoonModules = [
  'action',
  'api',
  'archi',
  'container',
  // 'dev',
  'environment',
  'event',
  'format',
]

const modules = {}
reacticoonModules.forEach(module => {
  modules[module] = `src/${module}/index.js`
})

export default {
  input: modules,
  output: {
    dir: 'build',
    format: 'esm',
  },
  interop: false, // https://medium.com/@kelin2025/so-you-wanna-use-es6-modules-714f48b3a953
  plugins: [!debugMode && terser(), babel(babelConfig)].filter(Boolean),
  external: packageJson.dependencies,
}
