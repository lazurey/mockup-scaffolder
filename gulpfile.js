var gulp = require('gulp'),
    jade = require('gulp-jade'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function() {
  return gulp.src('./src/sass/*.scss')
    .pipe(sass())
    .on('error', function(err) {
      console.log(err);
      this.emit('end')
    })
    .pipe(autoprefixer({
      browsers: ['ie 8-9', 'last 2 versions']
    }))
    .pipe(gulp.dest('./public/assets/css'));
});

gulp.task('templates', function() {
  var YOUR_LOCALS = {};
 
  gulp.src('./src/templates/*.jade')
    .pipe(jade({
      locals: YOUR_LOCALS
    }))
    .pipe(gulp.dest('./public/'))
});

gulp.task('watch', ['sass', 'templates'], function () {
  gulp.watch('src/sass/**/*.+(scss|sass)', ['sass']);
  gulp.watch('src/templates/**/*.jade', ['templates']);
});

gulp.task('default', ['watch']);
