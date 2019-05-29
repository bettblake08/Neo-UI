const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const TerserJSPlugin = require('terser-webpack-plugin');
// const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require("path");
const circularImportPlugin = require("./tools/circularImportDetection");


module.exports = {
  resolve: {
    extensions: ["*", ".js", ".jsx", ".json"]
  },
  entry: {
    index: path.resolve(__dirname, "src/index"),
    default: path.resolve(__dirname, "src/styles/themes/default")
  },
  mode: "production",
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    filename: (chunkData) => {
      return chunkData.chunk.name === 'index' ? '[name].js' : 'themes/[name].js';
    },
    library: '@bettbrian08/neo-ui-react',
    libraryTarget: 'umd',
    globalObject: "typeof self !== 'undefined' ? self : this"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.eot(\?v=\d+.\d+.\d+)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "[name].[ext]"
            }
          }
        ]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10000,
              mimetype: "application/font-woff",
              name: "[name].[ext]"
            }
          }
        ]
      },
      {
        test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10000,
              mimetype: "application/octet-stream",
              name: "[name].[ext]"
            }
          }
        ]
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10000,
              mimetype: "image/svg+xml",
              name: "[name].[ext]"
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|ico)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]"
            }
          }
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          "css-loader",
          "sass-loader"
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `themes/[name].css`
    }),
    circularImportPlugin
  ],
  // optimization: {
  //   minimizer: [
  //     new TerserJSPlugin({}),
  //     new OptimizeCSSAssetsPlugin({})
  //   ]
  // }
};
