const { merge } = require("webpack-merge");

const path = require("path");
const dirSrc = path.join(__dirname, "src");
const dirBuild = path.join(__dirname, "build");

const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
  mode: "development",
  context: path.join(__dirname, "src"),
  entry: {
    resume: "./resume.js",
  },
  devServer: {
    port: 8000,
    watchFiles: ["src/**/*"],
  },
  output: {
    path: dirBuild,
    filename: "[name].[contenthash].bundle.js",
    chunkFilename: "[name].[contenthash].bundle.js",
    publicPath: "/",
  },
  devtool: "source-map",
  watchOptions: {
    ignored: ["**/node_modules/**/*", "**/.#*"],
  },
  stats: {
    loggingDebug: ["sass-loader"],
  },
  module: {
    rules: [
      {
        test: /\.(glsl|vs|fs|vert|frag)$/,
        loader: "ts-shader-loader",
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader" },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [["autoprefixer", {}]],
              },
            },
          },
          { loader: "sass-loader" },
        ],
      },
      {
        test: /\.font\.js/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              url: false,
            },
          },
          "webfonts-loader",
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)$/,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name][ext]",
        },
      },
      {
        test: /\.(otf|jpg|jpeg|png|gif|webp)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
    new HtmlWebpackPlugin({
      template: path.join(dirSrc, "resume.ejs"),
      filename: "index.html",
      chunks: ["resume"],
      baseUrl: "https://maxdup.dev",
    }),
  ],
};

module.exports = config;
