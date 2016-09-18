/**
 * Created by ZHANGYUANYUAN031 on 2016-08-17.
 */
"use strict";
let gulp = require("gulp"),
    imagemin = require('gulp-imagemin'),
    minifyHtml = require("gulp-minify-html"),
    cssnano = require('gulp-cssnano'),
    del = require("del"),
    config=require("./config");
let webapp=config.webapp,
    projects=config.projects;

module.exports = {
    pressImg: function () { //打包工程图片并压缩
        projects.forEach((project)=>{
            gulp.src(["./"+project+"/app/images/**/*.png","./"+project+"/app/images/**/*.gif","./"+project+"/app/images/**/*.jpg"]).pipe(imagemin()).
            pipe(gulp.dest('./'+webapp+"/"+project+"/app/images"));
        });
        gulp.src(["./resource/**/*.png","./resource/**/*.gif","./resource/**/*.jpg"]).pipe(imagemin()).pipe(gulp.dest("./"+webapp+"/resource"));
        /*begin*/
        gulp.src(["./app/images/**/*.png","./app/images/**/*.gif","./app/images/**/*.jpg"]).pipe(imagemin()).pipe(gulp.dest("./"+webapp+"/app/images"));
        /*end*/
    },
    pressHtml: function () {
        projects.forEach((project)=>{
            gulp.src("./"+project+"/app/htmls/**/*.html").pipe(minifyHtml()).pipe(gulp.dest("./"+webapp+"/"+project+"/app/htmls"));
            gulp.src("./"+project+"/app/index.html").pipe(minifyHtml()).pipe(gulp.dest("./"+webapp+"/"+project+"/app"));
        });
        /*begin*/
        gulp.src("./app/htmls/**/*.html").pipe(minifyHtml()).pipe(gulp.dest("./"+webapp+"/app/htmls"));
        /*end*/
    },
    pressCss: function () {
        projects.forEach((project)=>{
            gulp.src("./"+project + "/app/styles/**/*.css").pipe(cssnano()).pipe(gulp.dest('./'+webapp + "/"+project+"/app/styles"));
        });
        gulp.src('./resource/**/*.css').pipe(cssnano()).pipe(gulp.dest('./'+webapp+"/resource"));//输出
        /*begin*/
        gulp.src('./app/styles/**/*.css').pipe(cssnano()).pipe(gulp.dest('./'+webapp+"/app/styles"));//输出
        /*end*/
    },
    del: function (cb) {
        if (typeof cb == "function") del(["../"+webapp], cb);
        else del(["../"+webapp]);
    }
};
