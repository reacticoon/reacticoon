module.exports = {
  babelrc: false,
  presets: [
    require('/home/loic/dev/reacticoon/create-reacticoon-app/node_modules/babel-preset-stage-1'),
    require('/home/loic/dev/bm/bm-website-v2/node_modules/babel-preset-react-app'),
  ],
  //   cacheDirectory: true,
  plugins: [
    require('/home/loic/dev/reacticoon/create-reacticoon-app/node_modules/babel-plugin-transform-decorators-legacy'),
    require('/home/loic/dev/reacticoon/create-reacticoon-app/node_modules/babel-plugin-syntax-trailing-function-commas'),
    require('/home/loic/dev/reacticoon/create-reacticoon-app/node_modules/babel-plugin-transform-es2015-for-of'),
    [
      require('/home/loic/dev/reacticoon/create-reacticoon-app/node_modules/babel-plugin-lodash'),
      {
        id: ['lodash', 'recompose'],
      },
    ],
  ],
}
