'use strict';
let webpack = require('webpack'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    config = require('./webpack'),
    express = require('express'),
    project=require("./config").packName;

let app = new express(),
    port = 3000,
    compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: config.output.publicPath}));
app.use(webpackHotMiddleware(compiler));

//放开静态资源文件
app.use(express.static("."));

app.get("/", function (req, res) {
    res.redirect("/" + project + "/app/index.html");
});

app.get("/" + project + "/app/index.html", function (req, res) {
    res.sendFile(__dirname + '/app/index.html');
});

app.all("/" + project + "/*", function (req, res, next) {
    var uri = url.parse(req.url).pathname;
    var index = project.length + 1;
    var sUrl = uri.substring(index);
    res.sendFile(__dirname + sUrl);
});

app.listen(port, function (error) {
    if (error) {
        console.error(error)
    } else {
        console.info(" 监听 %s 端口. 请用浏览器打开 http://localhost:%s/", port, port);
    }
});
