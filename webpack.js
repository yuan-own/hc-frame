"use strict";
//引用库文件
let path = require('path'), webpack = require('webpack'), fs = require("fs"), BrowserSyncPlugin = require('browser-sync-webpack-plugin'),
    config = require("./config/config"), fWebpak = require("./config/search-files");
let webapp = config.webapp, projects = config.projects;
//臭探所有入口文件
let allFiles = fWebpak();
let env = process.env.NODE_ENV || "development";
console.log("开启模式: \x1b[32m" + env + "\x1b[0m" + "模式……");
if(env =="development") allFiles["clent-mytest"] = "webpack-hot-middleware/client";
//臭探ctrl+s 要监听文件
let aResource = ["./resource/**/*.less", "./resource/**/*.css", "./resource/**/*.html", "./resource/**/*.js", "./resource/**/*.jsx"];
projects.forEach((item)=> {
    aResource.push("./" + item + "/app/**/*.html");
    aResource.push("./" + item + "/app/scripts/**/*.js");
    aResource.push("./" + item + "/app/scripts/**/*.jsx");
    aResource.push("./" + item + "/app/styles/**/*.css");
    aResource.push("./" + item + "/app/less/**/*.less");
});

/*begin*/
    /*为了兼容老项目增加扫描范围*/

aResource.push("./app/**/*.*");

/*end*/

let obj = {
    // devtool: 'cheap-module-eval-source-map',
    entry: allFiles,
    output: {
        path: path.join(__dirname, "/" + webapp),
        filename: '[name].js',
        publicPath: "/hmcp-hp"
    },
    plugins: [],
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


//设置全局模式
fs.writeFileSync("./config/temp.js", "var env='" + env + "';module.exports=env;");
if (env === 'production') {
    // 将代码中的process.env.NODE_ENV替换为production，方便webpack压缩代码
    obj.plugins.push(
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify(env)
            }
        })
    );

    obj.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false
            },
            compress: {
                warnings: false
            }
        })
    );
    //去掉测试代码
    delete  allFiles["clent-mytest"];
} else {
    obj.plugins.push(
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
    );
    // 开启sourcemap
    obj.devtool = "source-map";
}
module.exports = obj;
