/**
 * Created by ZHANGYUANYUAN031 on 2016-08-15.
 * 客户端公共设置
 */
"use strict";
let environment=require("../config/config").environment;
let gWidth = document.body.clientWidth, gPicWidth = 750, gmax = gWidth / gPicWidth * 20;
if (gmax > 14) gmax = 14;
let flag=require("../config/temp"),gPath;
document.body.style.fontSize=gmax+"px";
document.documentElement.style.fontSize=gmax+"px";

switch (flag){
    case "test":
        window.Alert= function () {
            alert(arguments);
        };
        gPath=environment.test.protocol + "://" + (environment.test.domain || environment.test.ip) + ":" + environment.test.port + "/";
        break;
    case "production":
        window.Alert= function () {};
        window.console.log= function () {};
        gPath=environment.product.protocol + "://" + (environment.product.domain || environment.product.ip) + ":" + environment.product.port + "/";
        break;
    default:
        window.Alert= function () {
            alert(arguments);
        };
        gPath=environment.develop.protocol + "://" + (environment.develop.domain || environment.develop.ip) + ":" + environment.develop.port + "/";
        break;
}

module.exports={
    gmax,gPath
};


