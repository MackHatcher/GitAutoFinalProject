const gulp = require('gulp');
const clean = require('gulp-clean-css')
const autoprefix = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

gulp.task('css', function() {
    return gulp.src('./css/*')
        .pipe(clean({compatibility: 'ie8'}))
        .pipe(autoprefix({
            browsers: ['last 2 versions'],
        }))
        .pipe(gulp.dest('dist'));
});
