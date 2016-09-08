"use strict";
//引用库文件
let path = require('path'),webpack = require('webpack'),BrowserSyncPlugin = require('browser-sync-webpack-plugin'),
    config=require("./config"),packfiles=require("./search-files");

let webapp = config.webapp,projects=config.projects;

let allFiles = packfiles.fWebpak();

//allFiles["clent-mytest"] = "webpack-hot-middleware/client";

let obj= {
    //devtool: 'cheap-module-eval-source-map',
    entry: allFiles,
    output: {
        path: path.join(__dirname, "../"+webapp),
        filename: '[name].js'
        //publicPath: "/app/scripts/"
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
            files: [
                "../*/app/htmls/**/*.html",
                "../*/app/scripts/**/*.js",
                "../*/app/scripts/**/*.jsx",
                "../*/app/styles/**/*.css",
                "../*/app/less/**/*.less",
                "../*/app/lib/**/*.less",
                "../*/app/lib/**/*.css",
                "../*/app/lib/**/*.js"
            ],
            watchOptions: {
                ignoreInitial: true,
                ignored: '../node_modules/**/*.*'
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
                loaders: ['babel'],
                exclude: /node_modules/,
                include: path.join(__dirname, "../*/app/")
            },
            {
                test: require.resolve('zepto'),
                loader: 'exports?window.$!script'
            }
        ]
    }
};

//webpack(obj);

module.exports=obj;
