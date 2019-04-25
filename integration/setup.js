const { setup: setupPuppeteer } = require('jest-environment-puppeteer')

// get the expect-puppeteer:
// https://github.com/smooth-code/jest-puppeteer/tree/master/packages/expect-puppeteer
const expect = require('expect-puppeteer')

module.exports = async function globalSetup(globalConfig) {
  await setupPuppeteer(globalConfig)
  // Your global setup
  // https://jestjs.io/docs/en/configuration.html#globalsetup-string
  global.expect = expect
}
