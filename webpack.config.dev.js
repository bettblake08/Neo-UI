const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");
const path = require("path");

module.exports = {
  resolve: {
    extensions: ["*", ".js", ".jsx", ".json"]
  },
  devtool: "cheap-module-eval-source-map", 
  entry: [
    path.resolve(__dirname, "src/index.js")
  ],
  target: "web",
  mode: "development",
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    filename: "[name].dev.js"
  },
  plugins: [
    new HardSourceWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.eot(\?v=\d+.\d+.\d+)?$/,
        use: ["file-loader"]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10000,
              mimetype: "application/font-woff"
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
              mimetype: "application/octet-stream"
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
              mimetype: "image/svg+xml"
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
        test: /(\.css|\.scss|\.sass)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              modules: false,
              minimize: true
            }
          }, {
            loader: "postcss-loader",
            options: {
              plugins: () => [
                require("autoprefixer")
              ],
              sourceMap: true,
              ident: "postcss",
            }
          }, {
            loader: "sass-loader",
            options: {
              includePaths: [path.resolve(__dirname, "src", "scss")],
              sourceMap: true
            }
          }
        ]
      }
    ]
  }
};
