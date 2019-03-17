const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const uglifycss = require('gulp-uglifycss');
const concat = require('gulp-concat');

sass.compiler = require('node-sass');

gulp.task('sass', function () {
    return gulp.src('assets/scss/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('main.css'))
        .pipe(uglifycss())
        .pipe(autoprefixer())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('assets/css'));
});

gulp.task('watch', function () {
    gulp.watch('assets/scss/**/*.scss', ['sass']);
});

gulp.task('build', ['sass']);

gulp.task('default', ['build', 'watch']);