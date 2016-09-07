/**
 * Created by ZHANGYUANYUAN031 on 2016-08-23.
 * 配制文件
 */
module.exports = {
    version:"1.0.0",//版本名称
    webapp: "webapp", //生成打包目录
    zip:"zip",//打包目录
    projects: ["hmcp-hp", "search"], //打包哪些文件（即更新包）
    comModule:"app/scripts/modules/**/*.js", //模块入口文件
    environment: {
        develop: { //生产环境个人开发用
            protocol: "http",
            ip: "127.0.0.1",
            port: "3000",
            domain: "localhost"
        },
        test: { //测试环境
            protocol: "http",
            ip: "103.28.214.2",
            prot: "80",
            domain: "test-api-health-cloud.pingan.com.cn"
        },
        product: { //生产环境
            protocol: "http",
            ip: "202.69.20.15",
            prot: "80",
            domain: "api-health-cloud.pingan.com.cn"
        }
    }
};