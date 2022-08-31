const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: path.resolve(__dirname, "src/index.js"),
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js",
      library: "rtr",
      libraryTarget: "umd",
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: "babel-loader",
            },
        ],
    },
    mode: "production",
    // mode: "development",
    resolve: {
        fallback: {
            fs: false,
            path: require.resolve("path-browserify"),
            crypto: false,
            http: false,
            https: false,
            zlib: require.resolve("browserify-zlib"),
            stream: require.resolve("stream-browserify"),
            util: require.resolve("util/"),
            assert: require.resolve("assert/"),
            url: require.resolve("url/"),
            querystring: require.resolve("querystring-es3"),
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
            process: 'process/browser',
        })
    ],
    optimization: {
        providedExports: false,
    },
}
