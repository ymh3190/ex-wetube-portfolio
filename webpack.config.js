const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

const WATCH_PATH = "./src/public/js/watch";

module.exports = {
  entry: {
    main: "./src/public/js/main.js",
    gsap: `${WATCH_PATH}/gsap.js`,
    watch: `${WATCH_PATH}/watch.js`,
    comment: `${WATCH_PATH}/comment.js`,
    index: "./src/public/js/index.js",
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/styles.css",
    }),
  ],
  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "assets"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
};
