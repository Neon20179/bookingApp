const path = require('path')


module.exports = {
    mode: "development",
    entry: path.resolve(__dirname, 'bookingApp/frontend/src/index.js'),
    output: {
        path: path.resolve(__dirname, 'bookingApp/frontend/static/frontend/public'),
        filename: "main.js",
        publicPath: "static/frontend/public"
    },
    module: {
        rules: [
            {

                test: /\.(js|jsx)?$/,
                exclude: /node_module/,
                use: {
                    loader: "babel-loader",
                    options: { presets: ["@babel/env"] }
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
        ]
    },
}