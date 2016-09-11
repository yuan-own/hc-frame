/**
 * Created by ZHANGYUANYUAN031 on 2016-08-17.
 */
var webpack = require("webpack");
var fs=require("fs");
var stat = fs.stat;
var press = require("./press-img-html-css");
var env=process.argv[2] || "-t";
switch (env){
    case "-p":
        press.pressImg();
        break;
    case "-t":
        press.pressImg();
        break;
    default:
        break;
}

press.pressHtml();
press.pressCss();



