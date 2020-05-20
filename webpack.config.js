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
        '@api': path.resolve(__dirname, './src/api/'),
        '@utils': path.resolve(__dirname, './src/utils/'),
        '@components': path.resolve(__dirname, './src/components/'),
        '@controllers': path.resolve(__dirname, './src/controllers/'),
        '@models': path.resolve(__dirname, './src/models'),
        '@consts': path.resolve(__dirname, './src/consts.js')
      }
    }
  };
};
