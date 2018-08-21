var package = require('./package.json');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

function getBanner(mode) {
  var result = '=========================' + '\n';

  result += package.name + '@' + package.version + '\n';
  result += '\n';
  result += 'Собрано:          ' + new Date().toISOString() + '\n';
  result += 'Собрано для:      ' + mode + '\n';
  result +=
    'По всем вопросам: danil.kamyshov@gmail.com, https://vk.com/alhayat' + '\n';

  result += '=========================';
  return result;
}

module.exports.getConfig = function(mode) {
  return {
    mode: 'development',
    devtool: 'source-map',

    entry: {
      main: './src/index.tsx',
    },

    output: {
      path: path.resolve(__dirname, 'build'),
      publicPath: '/',
      filename: '[name].' + mode + '.js',
    },

    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.less'],
    },

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'awesome-typescript-loader',
        },

        {
          test: /\.less$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: true,
              },
            },
            'less-loader',
          ],
        },
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        mode: mode,
        filename: mode + '.html',
      }),

      new webpack.DefinePlugin({
        __MODE: JSON.stringify(mode),
      }),

      new webpack.BannerPlugin({
        banner: getBanner(mode),
      }),
    ],
  };
};
