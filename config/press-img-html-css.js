/**
 * Created by ZHANGYUANYUAN031 on 2016-08-17.
 */
var gulp = require("gulp");
var imagemin = require('gulp-imagemin');
var minifyHtml = require("gulp-minify-html");
var cssnano = require('gulp-cssnano');
var del = require("del");
module.exports={
    pressImg:function(){
        gulp.src('app/images/**/*').pipe(imagemin()).pipe(gulp.dest('web/images'));
        gulp.src(["app/lib/**/*.png","app/lib/**/*.gif","app/lib/**/*.jpg"]).pipe(imagemin()).pipe(gulp.dest("web/lib"));
    },
    pressHtml: function () {
        gulp.src('./app/htmls/**/*.html') // 要压缩的html文件
            .pipe(minifyHtml()) //压缩
            .pipe(gulp.dest('./web/htmls'));
    },
    pressLibCss:function(){
        //压缩lib中的css文件
        gulp.src('./app/lib/**/*.css')
            .pipe(cssnano()) //压缩
            .pipe(gulp.dest('./web/lib'));//输出
    },
    pressCss: function () {
        gulp.src('./app/styles/**/*.css')
            .pipe(cssnano()) //压缩
            .pipe(gulp.dest('./web/styles'));//输出
    },
    del: function (cb) {
        if(typeof cb == "function") del(["web"],cb);
        else del(["web"]);
    }
};
