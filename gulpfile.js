var gulp = require('gulp'),
    jade = require('gulp-jade'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function() {
  return gulp.src('./src/sass/*.+(scss|sass)')
    .pipe(sass())
    .on('error', function(err) {
      console.log(err);
      this.emit('end');
    })
    .pipe(autoprefixer({
      browsers: ['ie 8-9', 'last 2 versions']
    }))
    .pipe(gulp.dest('./public/assets/css'));
});

gulp.task('templates', function() {
  var YOUR_LOCALS = {};
 
  gulp.src(['./src/templates/**/*.jade',
            '!./src/templates/partials/*.jade',
            '!./src/templates/layout/*.jade'])
    .pipe(jade({
      locals: YOUR_LOCALS
    }))
    .on('error', function(err) {
      console.log(err);
      this.emit('end');
    })
    .pipe(gulp.dest('./public/'))
});

gulp.task('copy', function() {
  gulp.src('./src/images/**')
    .pipe(gulp.dest('./public/assets/images'));
  gulp.src('./src/font/**')
    .pipe(gulp.dest('./public/assets/font'));
});

gulp.task('copyjs', function() {
  gulp.src('./src/js/**')
    .pipe(gulp.dest('./public/assets/js'));
});

gulp.task('watch', ['sass', 'templates', 'copy', 'copyjs'], function () {
  gulp.watch('src/sass/**/*.+(scss|sass)', ['sass']);
  gulp.watch('src/templates/**/*.jade', ['templates']);
  gulp.watch('src/js/*.js', ['copyjs']);
  gulp.watch('src/images/**', ['copy']);
});

gulp.task('default', ['watch']);