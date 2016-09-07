var fs = require("fs");
var zip = require("node-native-zip");
var archive = new zip();
var projectName = require("./config").name;
var aFills = [];

function syncFunc(mypath) {
    var filss = fs.readdirSync(mypath);
    filss.forEach(function (file) {
        var stat = fs.statSync(mypath + '/' + file);
        if (stat.isDirectory()) {
            syncFunc(mypath + '/' + file);
        } else {
            var fileName = mypath + "/" + file;
            aFills.push({name: fileName, path: fileName});
        }
    });
}

syncFunc("web");

if (aFills.length > 0) {
    var isExist=fs.existsSync("./zip");
    if(!isExist){
        fs.mkdirSync("./zip");
    }
    var myfiles = aFills.map(function (item, index) {
        return {
            name: item.name.replace(/web\//, "app\/"),
            path: item.path
        }
    });
    archive.addFiles(myfiles, function (err) {
        if (err) return console.log("err while adding files", err);
        var buff = archive.toBuffer();
        fs.writeFile("./zip/" + projectName + ".zip", buff, function () {
            console.log("zip打包完毕!!!");
        });
    });
}

