var gulp = require('gulp'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    minifyCss = require('gulp-minify-css'),
    connect = require('gulp-connect');

gulp.task('sass', function() {
    return gulp.src('./sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css'))
        .pipe(connect.reload());
});

gulp.task('html', function() {
    gulp.src('*.html')
        .pipe(connect.reload());
});

gulp.task('js', function() {
    gulp.src('./js/*.js')
        .pipe(connect.reload());
});

gulp.task('minjs', function() {
    gulp.src('./**/*.js')
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

gulp.task('connect', function() {
    connect.server({
        root: '/home/kerbin/simple-todo',
        livereload: true
    });
});

gulp.task('watch', function() {
    gulp.watch('./sass/*.scss', ['sass']);
    gulp.watch('*.html', ['html']);
    gulp.watch('./**/*.js', ['js']);
});

gulp.task('default', ['connect', 'watch']);
