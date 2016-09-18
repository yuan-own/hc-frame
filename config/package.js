/**
 * Created by ZHANGYUANYUAN031 on 2016-08-17.
 */
"use strict";
let fs=require("fs"),stat = fs.stat,
    press = require("./press-img-html-css"),
    env = process.argv[2] || "-t",
    noImage = process.argv[3];

let config=require("./config"),projects=config.projects,webapp=config.webapp;
if (!noImage || noImage !== "-p") {
    switch (env) {
        case "-p":
            press.pressImg();
            break;
        case "-t":
            press.pressImg();
            break;
        default:
            break;
    }
}

press.pressHtml();
press.pressCss();


/*
 * 复制目录中的所有文件包括子目录
 * @param{ String } 需要复制的目录
 * @param{ String } 复制到指定的目录
 */
var copy = ( src, dst )=>{
    // 读取目录中的所有文件/目录
    fs.readdir( src, function( err, paths ){
        if( err ){
            throw err;
        }
        paths.forEach(function( path ){
            var _src = src + '/' + path,
                _dst = dst + '/' + path,
                readable, writable;
            stat( _src, function( err, st ){
                if( err ){
                    throw err;
                }
                // 判断是否为文件
                if( st.isFile() ){
                    // 创建读取流
                    readable = fs.createReadStream( _src );
                    // 创建写入流
                    writable = fs.createWriteStream( _dst );
                    // 通过管道来传输流
                    readable.pipe( writable );
                }
                // 如果是目录则递归调用自身
                else if( st.isDirectory() ){
                    exists( _src, _dst, copy );
                }
            });
        });
    });
};
// 在复制目录前需要判断该目录是否存在，不存在需要先创建目录
var exists =( src, dst, callback )=>{
    if(!fs.existsSync(src)) return;
    fs.exists( dst, function( exists ){
        // 已存在
        if( exists ){
            callback( src, dst );
        }
        // 不存在
        else{
            fs.mkdir( dst, function(){
                callback( src, dst );
            });
        }
    });
};

let index=projects.indexOf("resource");

if(projects.length > 1 && index !==-1){
     projects.splice(index,1);
    projects.forEach((project)=>{
        exists("./"+project +"/app/json","./"+webapp+"/"+project+"/app/json",copy);
    });
}
