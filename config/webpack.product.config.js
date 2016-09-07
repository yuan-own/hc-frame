var path = require('path');
var webpack = require('webpack');
var searchFile = require("./files");
module.exports = {
    entry: searchFile("./app/scripts"),
    output: {
        path: path.join(__dirname, 'web/scripts'),
        filename: '[name].js'
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "zepto"
        })
    ],
    resolve: {
        extensions: ['', '.js', '.jsx']  //自动补全识别后缀
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel'],
                exclude: /node_modules/,
                include: path.join(__dirname, "/app/")
            },
            {
                test: /.jsx?$/,
                loaders: ['babel?presets[]=es2015&presets[]=react'],
                exclude: "/node_modules/",
                include: path.resolve(__dirname, "app")
            },
            {
                test: require.resolve('zepto'),
                loader: 'exports?window.$!script'
            }
        ]
    }
};
