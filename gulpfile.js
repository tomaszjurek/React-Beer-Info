var gulp = require ("gulp");
var sass = require("gulp-sass");
var sourcemaps = require("gulp-sourcemaps");
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');

gulp.task("sass", function () {
  return gulp
    .src("scss/main.scss")
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({errLogToConsole:	true, outputStyle: 'expanded'}))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('css'))
})

gulp.task("watch", function(){
  gulp.watch('scss/**/*.scss',	['sass']);
});
