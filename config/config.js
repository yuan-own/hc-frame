/**
 * Created by ZHANGYUANYUAN031 on 2016-08-23.
 * 配制文件
 */
"use strict";
module.exports = {
    version:"1.0.0",//版本名称
    webapp: "webapp", //生成打包目录
    zip:"zip",//打包目录
    projects: ["hc-hyzt", "my-test","search"], //打包哪些文件（即更新包）
    comModule:"app/scripts/modules/**/*.js", //模块入口文件
    packName:"hmcp-hp",//打包文件名
    environment: {
        develop: { //开发环境个人开发用
            protocol: "http",
            ip: "127.0.0.1",
            port: "3000",
            domain: "localhost"
        },
        test: { //测试环境
            protocol: "http",
            ip: "103.28.214.2",
            port: "80",
            domain: "www.test-api-health-cloud.pingan.com.cn"
        },
        product: { //生产环境
            protocol: "http",
            ip: "202.69.20.15",
            port: "80",
            domain: "www.api-health-cloud.pingan.com.cn"
        }
    }
};