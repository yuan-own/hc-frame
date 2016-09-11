/**
 * Created by ZHANGYUANYUAN031 on 2016-08-17.
 */
let gulp = require("gulp"),
    less = require("gulp-less"),
    config = require("./config/config"),
    projects = config.projects,
    webapp = config.webapp,
    press = require("./config/press-img-html-css");
//放在以后用
//var sass = require("gulp-sass");

let aLessPath = ()=> {
    return projects.map((prject)=> {
        return "./" + prject + "/app/less/**/*.less";
    });
};

//处理图片，并对图片进行压缩
gulp.task('image', function () {
    press.pressImg();
});

gulp.task('html', function () {
    press.pressHtml();
});

//压缩css,压缩后的文件放入dest/css
gulp.task('css', function () {
    return press.pressCss();
});

//执行压缩前，先删除dest文件夹里的内容
gulp.task('clean', function (cb) {
    press.del(cb);
});

//编译less到css
gulp.task("less", function () {
    projects.forEach((prject)=> {
        gulp.src("./" + prject + "/app/less/**/*.less").pipe(less()).pipe(gulp.dest("./" + prject + "/app/styles"));
    });
});
gulp.task("resource", function () {
    gulp.src('./resource/**/*.less')
        .pipe(less())
        .pipe(gulp.dest("./resource"));
});


//编译sass
/*
 以后会。
 gulp.task('sass', function () {
 gulp.src('./app/sass/!**!/!*.sass')
 .pipe(sass())
 .pipe(gulp.dest('./app/styles'));
 });
 */

//监视文件的变化
gulp.task("watch", function () {
    console.info("less 编译中……")
    gulp.watch("./resource/**/*.less", ['resource']);
    projects.forEach((pro)=> {
        gulp.watch("./" + pro + "/**/*.less", ['less']);
    });
});


//默认命令，在cmd中输入gulp后，执行的就是这个命令
gulp.task('default', function () {
    // 将你的默认的任务代码放在这
    gulp.start('watch');
});
