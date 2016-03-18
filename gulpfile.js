var gulp = require('gulp'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    minifyCss = require('gulp-minify-css'),
    webserver = require('gulp-webserver');

gulp.task('sass', function() {
    return gulp.src('./sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css'));
});

gulp.task('minjs', function() {
    gulp.src('./js/*.js')
    .pipe(uglify())
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('mincss', function() {
    gulp.src('./css/style.css')
    .pipe(minifyCss())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('./dist/css/'));
});

gulp.task('dist', ['minjs', 'mincss']);

gulp.task('webserver', ['watch'], function() {
  gulp.src('/home/kerbin/desktop-todo')
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: true
    }));
});

gulp.task('watch', function() {
    gulp.watch('./sass/*.scss', ['sass']);
});

gulp.task('default', ['webserver']);
