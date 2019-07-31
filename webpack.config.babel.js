import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin';
import SVGSpritemapPlugin from 'svg-spritemap-webpack-plugin';

const env = process.env.NODE_ENV || 'development';
const isDev = env === 'development';

const source = path.join(__dirname, 'src');
const output = path.join(__dirname);

export default {
  devtool: isDev ? 'source-map' : false,
  mode: env,
  devServer: {
    historyApiFallback: true,
    port: 9000,
    hot: true,
    inline: true,
    contentBase: path.resolve(__dirname),
    publicPath: '/',
  },
  context: source,
  resolve: {
    modules: ['node_modules', source],
    extensions: ['.js']
  },
  entry: {
    index: './index.js'
  },
  output: {
    path: output,
    filename: 'dist/[name].js',
  },
  module: {
    rules: [],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      filename: 'index.html',
    }),
    new SVGSpritemapPlugin(['src/icons/*.svg'], {
      output: {
        filename: 'dist/icons.svg',
        chunk: {
          keep: true,
        },
      },
      sprite: {
        prefix: 'icon-',
        gutter: 8,
        generate: {
          title: false,
        },
      },
      styles: false,
    }),
  ]
};
