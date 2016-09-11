var fs = require("fs");
var zip = require("node-native-zip");
var archive = new zip();
var config = require("./config"), zipapp = config.zip, projectName = config.packName, version = config.version,
    webapp = config.webapp, packName = config.packName;
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

syncFunc(webapp);

if (aFills.length > 0) {
    var isExist = fs.existsSync("./zip");
    if (!isExist) {
        fs.mkdirSync("./zip");
    }
    var myfiles = aFills.map(function (item, index) {
        return {
            name: item.name.replace(/webapp\//, ""),
            path: item.path
        }
    });
    archive.addFiles(myfiles, function (err) {
        if (err) return console.log("err while adding files", err);
        var buff = archive.toBuffer();
        fs.writeFile("./" + zipapp + "/" + projectName + version + ".zip", buff, function () {
            console.log("zip打包完毕!!!");
        });
    });
}

