var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

gulp.task('sass', function() {
  return gulp.src('scss/**/*.scss') // Gets all files ending with .scss in app/scss
    .pipe(sass())
    .pipe(gulp.dest('css'))
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
})