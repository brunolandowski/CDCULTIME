var gulp = require('gulp');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var minify = require('gulp-clean-css');
var plumber = require('gulp-plumber');

var browserSync = require('browser-sync').create();

function onError(err) {
    console.log(err);
}

gulp.task('sass', function() {
  return gulp.src('scss/**/*.scss') // Gets all files ending with .scss in app/scss
    .pipe(sass())
    .pipe(prefix('last 2 versions'))
    .pipe(minify())
    .pipe(gulp.dest('css'))
    .pipe(plumber({
        errorHandler: onError
    }))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('default', ['browserSync', 'sass'], function (){
  gulp.watch('scss/**/*.scss', ['sass']); 
  gulp.watch('*.html', browserSync.reload); 
  gulp.watch('js/**/*.js', browserSync.reload); 
});


gulp.task('browserSync', function() {
  browserSync.init({
    server: {
     
    },
  })
});

