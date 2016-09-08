"use strict";
//引用库文件
let path = require('path'), webpack = require('webpack'), BrowserSyncPlugin = require('browser-sync-webpack-plugin'),
    config = require("./config/config"), fWebpak = require("./config/search-files");
let webapp = config.webapp, projects = config.projects;
//臭探所有入口文件
let allFiles = fWebpak();
allFiles["clent-mytest"] = "webpack-hot-middleware/client";

//臭探ctrl+s 要监听文件
let aResource = ["./resource/**/*.less", "./resource/**/*.css", "./resource/**/*.html", "./resource/**/*.js", "./resource/**/*.jsx"];
projects.forEach((item)=> {
    aResource.push("./" + item + "/app/htmls/**/*.html");
    aResource.push("./" + item + "/app/scripts/**/*.js");
    aResource.push("./" + item + "/app/scripts/**/*.jsx");
    aResource.push("./" + item + "/app/styles/**/*.css");
    aResource.push("./" + item + "/app/less/**/*.less");
});

let obj = {
    //devtool: 'cheap-module-eval-source-map',
    entry: allFiles,
    output: {
        path: path.join(__dirname, "/" + webapp),
        filename: '[name].js',
        publicPath: "/hmcp-hp"
    },
    plugins: [
        new BrowserSyncPlugin({
            port: 8000,
            //proxy: "test-api-health-cloud.pingan.com.cn",
            proxy: "localhost:3000",
            ui: {
                port: 8888,
                weinre: {
                    port: 9090
                }
            },
            files: aResource,
            watchOptions: {
                ignoreInitial: true,
                ignored: '/node_modules/**/*.*'
            },
            logLevel: "debug",
            logPrefix: "我的项目测试log:",
            logConnections: true
            //startPath:"./index.html" //启动时开始目录
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
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
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015']
                },
                include: path.resolve(__dirname)
            },
            {
                test: require.resolve('zepto'),
                loader: 'exports?window.$!script'
            }
        ]
    }
};

var env = process.env.NODE_ENV;
console.log("node env: \x1b[32m" + env + "\x1b[0m");
if (env === 'production') {
    // 将代码中的process.env.NODE_ENV替换为production，方便webpack压缩代码
    obj.plugins.push(
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        })
    );
    // 开启sourcemap
    obj.devtool = "source-map";
    // // 开启文件hash	//暂不使用，上线时再开启
    // config.output.filename = "[hash].bundle.js";
    // config.output.chunkFilename = "[id].[hash].bundle.js";
}

module.exports = obj;
