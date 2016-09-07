/**
 * Created by ZHANGYUANYUAN031 on 2016-09-06.
 */

'use strict';

let Glob = require("glob").Glob,config=require("./config");
let projects=config.projects,sComModules=config.comModule;

let search = ()=> {
    //let glob = new Glob(path, {sync: true});
    if(!projects.length) return;
    let obj={};
    for(let i=0,len = projects.length;i<len;i++){
        let project=projects[i];
        let arrPath= new Glob("../"+project+"/"+sComModules, {sync: true}).found;
        obj[project] = arrPath;
    }

    return obj;
   /* files.forEach(function (file, i) {
        let filePath = file.split(/\/|\\/);
        if (filePath.length > 0) {
            let oList = filePath[filePath.length - 1], index = oList.search(/\.js$/), name = filePath[filePath.length - 1].substring(0, index);
            obj[name] = file;
        }
    });
    return obj;*/
};


module.exports = search;


