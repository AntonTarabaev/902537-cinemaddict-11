const MomentLocalesPlugin = require(`moment-locales-webpack-plugin`);
const path = require('path');

module.exports = (env) => {
  return {
    mode: env.type,
    entry: './src/main.js',
    output: {
      filename: 'bundle.js',
      path: path.join(__dirname, 'public'),
    },
    devtool: 'source-map',
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      watchContentBase: true,
    },
    plugins: [
      new MomentLocalesPlugin({
        localesToKeep: [`es-us`],
      })
    ],
    resolve: {
      alias: {
        Utils: path.resolve(__dirname, 'src/utils/'),
        Components: path.resolve(__dirname, 'src/components/'),
        Controllers: path.resolve(__dirname, 'src/controllers/'),
        Models: path.resolve(__dirname, 'src/models'),
        MainConsts: path.resolve(__dirname, 'src/consts.js')
      }
    }
  };
};
