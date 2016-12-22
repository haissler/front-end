var gulp = require('gulp'),
    sass = require('gulp-sass'),
    fontgen = require('gulp-fontgen'),
    concat = require('gulp-concat'),
    browserSync = require('browser-sync').create();

// server
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "public"
    });

    gulp.watch("app/js/*.js",['scripts']);
    gulp.watch(["app/sass/*.sass", "app/sass/*.css", "app/sass/*.scss"], ['sass']);
    gulp.watch("app/*.jade",['jade']);
    gulp.watch("public/*.html").on('change', browserSync.reload);
});

// sass
gulp.task('sass', function() {
    return gulp.src(['app/sass/master.scss']) // берем источник
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError)) // преобразуем sass в css
    .pipe(gulp.dest('public/css')) // выгружаем рузельтат
    .pipe(browserSync.stream());
});
 
// fonts
gulp.task('fonts', function() {
  return gulp.src("public/fonts/*.{ttf,otf}")
    .pipe(fontgen({
      dest: "public/fonts/."
    }));
});

gulp.task('scripts', function() {
  return gulp.src('app/js/*.js')
    .pipe(concat('master.js'))
    .pipe(gulp.dest('public/js'))
    .pipe(browserSync.stream());
});
 
// gulp
gulp.task('default', ['serve']);