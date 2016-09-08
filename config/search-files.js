/**
 * Created by ZHANGYUANYUAN031 on 2016-09-06.
 */

'use strict';

let Glob = require("glob").Glob, config = require("./config");
let projects = config.projects, sComModules = config.comModule;

/*
 数据格式{hmcp-hp:[files],search:[files]}
 */
let fsearch = ()=> {
    if (!projects.length) return;
    let obj = {};
    for (let i = 0, len = projects.length; i < len; i++) {
        let project = projects[i];
        let arrPath = new Glob("./" + project + "/" + sComModules, {sync: true}).found;
        obj[project] = arrPath;
    }
    return obj;
};

//实现webpack想要的数据格式{ 'search-module': '../hmcp-hp/app/scripts/modules/search-module.js',
//'test-module': '../search/app/scripts/modules/test-module.js' }

let fWebpak = ()=> {
    if (!projects.length) return;
    let obj = {};
    for (let i = 0, len = projects.length; i < len; i++) {
        let project = projects[i];
        let arrPath = new Glob("./" + project + "/" + sComModules, {sync: true}).found;
        arrPath.forEach((file)=> {
            let index = file.search(/\.js$/);
            let name = file.substring(0, index);
            obj[name] = file;
        });
    }
    return obj;
};

let files = fWebpak();

console.log(files);

module.exports = {fsearch, fWebpak};


