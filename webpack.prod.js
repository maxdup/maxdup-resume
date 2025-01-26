const path = require("path");
const dirSrc = path.join(__dirname, "src");
const dirBuild = path.join(__dirname, "build");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlInlineScriptPlugin = require("html-inline-script-webpack-plugin");
const HTMLInlineCSSWebpackPlugin =
  require("html-inline-css-webpack-plugin").default;
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
  mode: "development",
  context: path.join(__dirname, "src"),
  entry: {
    resume: "./resume.js",
  },
  output: {
    path: dirBuild,
    filename: "[name].[contenthash].bundle.js",
    chunkFilename: "[name].[contenthash].bundle.js",
    publicPath: "",
  },
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
        test: /\.(otf)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(jpg|jpeg|png|gif|webp)$/i,
        type: "asset/inline",
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
    new HtmlInlineScriptPlugin(),
    new HTMLInlineCSSWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(dirSrc, "resume.ejs"),
      filename: "index.html",
      inject: "body",
      baseUrl: "https://maxdup.dev",
    }),
  ],
};

module.exports = config;
