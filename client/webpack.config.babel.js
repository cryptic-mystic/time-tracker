import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CompressionPlugin from 'compression-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import path from 'path'
import _debug from 'debug'

const debug = _debug('webpack:config')

const configuration = {
  entry: ['babel-polyfill', './src/main.js'], // Here the application starts executing and webpack starts bundling
  output: {
    // options related to how webpack emits results
    path: path.resolve(__dirname, "dist"),
    filename: 'app.bundle.js',
    publicPath: "/", // the url to the output directory resolved relative to the HTML page
    // library: "MyLibrary", // the name of the exported library
    // libraryTarget: "umd", // universal module definition the type of the exported library
  },

  module: {
    rules: [
      // rules for modules (configure loaders, parser options, etc.)
      {
        test: /\.(js|jsx)$/,
        include: [
          path.resolve(__dirname, "src")
        ],
        loader: "babel-loader",
        options: { // options for the loader
          presets: ['es2015', 'react', 'stage-0'],
          plugins: ['transform-runtime'],
        },
      },
      {
        test: /\.mdx$/i,
        include: [
          path.resolve(__dirname, "src")
        ],
        loader: 'babel-loader!markdown-component-loader'
      },
    ],
  },

  resolve: {
    modules: [ // directories where to look for modules
      "node_modules",
      // path.resolve(__dirname, "app")
    ],
    extensions: [".js", ".json", ".jsx", ".css"], // extensions that are used
    alias: { // a list of module name aliases
    },
  },

  // performance: {
  //   hints: "warning", // enum
  //   maxAssetSize: 200000, // int (in bytes),
  //   maxEntrypointSize: 400000, // int (in bytes)
  // },

  devtool: process.env.DEVELOPMENT ? "source-map" : undefined, // enum
  // enhance debugging by adding meta info for the browser devtools
  // source-map most detailed at the expense of build speed.

  context: __dirname, // string (absolute path!)
  // the home directory for webpack
  // the entry and module.rules.loader option
  //   is resolved relative to this directory

  target: "web", // enum
  // the environment in which the bundle should run
  // changes chunk loading behavior and available modules

  // externals: ["react"],
  // Don't follow/bundle these modules, but request them at runtime from the environment

  stats: {
    chunks: false,
    chunkModules: false,
    colors: true,
    warnings: true
  },
  // lets you precisely control what bundle information gets displayed

  devServer: {
    historyApiFallback: true,
    // compress: true,
    // hot: true,
    port: 9000
  },

  plugins: [
    // new webpack.DefinePlugin(config.globals),
    new HtmlWebpackPlugin({
        template: 'src/index.html',
        hash: false,
        // favicon: 'static/favicon.ico',
        filename: 'index.html',
        inject: 'body',
        minify: {
          collapseWhitespace: true
        }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: process.env.DEVELOPMENT ? JSON.stringify('development') : JSON.stringify('production'),
        API_URL: JSON.stringify(process.env.API_URL)
      }
    }),
  ],
}

if (!process.env.DEVELOPMENT) {
  configuration.plugins.push(
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false,
        drop_console: true
      }
    }),
    new CompressionPlugin({
      asset: "[path]",
      algorithm: "gzip",
      test: /\.js$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    }))
}

module.exports = configuration