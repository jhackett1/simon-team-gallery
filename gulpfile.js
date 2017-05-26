var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var inline = require('gulp-inline')
  , uglify = require('gulp-uglify')
  , minifyCss = require('gulp-minify-css');
var pug = require('gulp-pug');

gulp.task('pug', function(){
  return gulp.src('./app/*.pug')
  .pipe(pug({
    pretty: true
  }))
  .pipe(gulp.dest('./app/'))
  .pipe(browserSync.stream());
});

// Compile ma sass for me and autoprefix it
gulp.task('sass', function(){
  return gulp.src('./app/*.sass')
  .pipe(sass().on('error', sass.logError))
  // And autoprefix it too
  .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
  }))
  .pipe(gulp.dest('./app/'))
  .pipe(browserSync.stream());
})

gulp.task('default', function(){
  gulp.watch('./app/*.sass', ['sass']);
  gulp.watch('./app/*.pug', ['pug']);
  browserSync.init({
      server: {
          baseDir: "./app/"
      }
  });
  gulp.watch("*.html").on('change', browserSync.reload);
})
