const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const connect = require('gulp-connect');
const minify = require('gulp-minify');

sass.compiler = require('node-sass');

gulp.task('sass', function () {
    return gulp.src('develop/scss/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(concat('main.css'))
        .pipe(autoprefixer('last 2 versions'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('assets/css'));
});

gulp.task('js:libs', function () {
    let vendor = [
        'develop/js/vendor/jquery-3.3.1.min.js',
        'develop/js/vendor/jquery-ui.min.js',
        'develop/js/vendor/slick.min.js',
    ];
    return gulp.src(vendor)
        .pipe(sourcemaps.init())
        .pipe(concat('vendor.js'))
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('assets/js'))
});

gulp.task('js:dev', function () {
    return gulp.src('develop/js/main.js')
        .pipe(sourcemaps.init())
        .pipe(minify())
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('assets/js'))
});

gulp.task('connect', function() {
    connect.server();
});

gulp.task('js', ['js:libs', 'js:dev']);

gulp.task('watch', function () {
    gulp.watch('develop/scss/**/*.scss', ['sass']);
    gulp.watch('develop/js/*.js', ['js:dev']);
});

gulp.task('build', ['sass', 'js']);

gulp.task('default', ['build', 'connect', 'watch']);