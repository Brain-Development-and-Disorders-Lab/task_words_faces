const path = require("path");
const { DefinePlugin } = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env) => {
  console.log("Target:", env.target || "desktop");

  return {
    name: "development",
    mode: "development",
    entry: {
      index: "./src/index.tsx",
    },
    devtool: "inline-source-map",
    plugins: [
      new HtmlWebpackPlugin({
        title: "Words and Faces Task",
      }),
      new DefinePlugin({
        __TARGET__: JSON.stringify(env.target || "desktop"),
      }),
    ],
    devServer: {
      static: [
        {
          directory: path.join(__dirname, "dist"),
        },
        {
          directory: path.join(__dirname, "src"),
        },
      ],
      hot: true,
      proxy: {
        "/api": {
          target: "http://localhost:8080",
          router: () => "http://localhost:8000",
        },
      },
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-typescript",
                "@babel/preset-react",
                "@babel/preset-env",
              ],
            },
          },
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.html$/,
          loader: "html-loader",
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: "asset/resource",
        },
        {
          test: /\.csv$/,
          loader: "csv-loader",
          options: {
            dynamicTyping: true,
            header: true,
            skipEmptyLines: true,
          },
        },
      ],
    },
    resolve: {
      modules: [
        path.resolve(__dirname, "./"),
        path.resolve(__dirname, "node_modules"),
      ],
      extensions: [".tsx", ".ts", ".js"],
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name].bundle.js",
      clean: true,
    },
  };
};
