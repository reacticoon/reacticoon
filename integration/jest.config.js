module.exports = {
  preset: 'jest-puppeteer',
  testRegex: './*\\.test\\.js$',
  // https://github.com/smooth-code/jest-puppeteer/tree/master/packages/expect-puppeteer
  setupTestFrameworkScriptFile: './setup.js',
}
