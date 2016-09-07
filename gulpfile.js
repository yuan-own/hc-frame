/**
 * Created by ZHANGYUANYUAN031 on 2016-08-17.
 */
var gulp = require("gulp");
var less=require("gulp-less");
var press=require("./press-img-html-css");
//放在以后用
//var sass = require("gulp-sass");

//处理图片，并对图片进行压缩
gulp.task('image',function(){
    press.pressImg();
});

gulp.task('minhtml', function () {
    press.pressHtml();
});

//压缩lib中的css文件
gulp.task('minlibcss', function () {
   return press.pressLibCss();
});

//压缩css,压缩后的文件放入dest/css
gulp.task('mincss', function () {
    return press.pressCss();
});

//执行压缩前，先删除dest文件夹里的内容
gulp.task('clean', function (cb) {
    press.del(cb);
});

//编译less到css
gulp.task("less", function () {
    gulp.src('./app/less/*.less')
        .pipe(less())
        .pipe(gulp.dest("./app/styles"));

});

gulp.task("libless", function () {
    gulp.src('./app/lib/**/*.less')
        .pipe(less())
        .pipe(gulp.dest("./app/lib"));
});


//编译sass
/*
gulp.task('sass', function () {
    gulp.src('./app/sass/!**!/!*.sass')
        .pipe(sass())
        .pipe(gulp.dest('./app/styles'));
});
*/

//监视文件的变化
gulp.task("watch", function () {
    gulp.watch("./app/**/*.less", ['less','libless']);
});


//默认命令，在cmd中输入gulp后，执行的就是这个命令
gulp.task('default', function () {
    // 将你的默认的任务代码放在这
    gulp.start('watch');
});
