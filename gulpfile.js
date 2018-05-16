const gulp = require('gulp');
const clean = require('gulp-clean-css')
const autoprefix = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

gulp.task('css', function() {
    return gulp.src('src/css/*')
        .pipe(clean({compatibility: 'ie8'}))
        .pipe(autoprefix({
            browsers: ['last 2 versions'],
        }))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('imgMin', function() {
    gulp.src('src/img/assets/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/img'))
});

gulp.task('js', function() {
    gulp.src('./src/js/*.js')
    .pipe(babel({
        presets: ['env']
    }))
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'))
});

gulp.task('watch', function () {
    gulp.watch('./css/**/*.css', ['clean']);
});

gulp.task('default', ['css', 'js', 'imgMin'], () => {
})

