var gulp          = require('gulp');
var autoprefixer  = require('gulp-autoprefixer');
var browserSync   = require('browser-sync').create();
var cleanCss      = require('gulp-clean-css');
var concat        = require('gulp-concat');
var uglify        = require('gulp-uglify');
var sass          = require('gulp-sass');
var sourcemaps    = require('gulp-sourcemaps');
var watch         = require('gulp-watch');

gulp.task('html',function(){
  return gulp.src('./src/html/**/*.html')
  .pipe(gulp.dest('./dist/'));
});

gulp.task('scss',function(){
  return gulp.src('./src/scss/**/*.scss')
  .pipe(sourcemaps.init())
  .pipe(sass({
    includePaths: require('node-normalize-scss').includePaths
  }).on('error', sass.logError))
  .pipe(concat('style.min.all.css'))
  .pipe(cleanCss())
  .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
  }))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./dist/'));
});

gulp.task('js',function(){
  return gulp.src('./src/js/**/*.js')
  .pipe(sourcemaps.init())
  .pipe(concat('script.min.all.js'))
  .pipe(uglify())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./dist/'));
});

gulp.task('watch', function(){
  gulp.watch('./src/html/**/*.html', ['html']).on("change", browserSync.reload);
  gulp.watch('./src/scss/**/*.scss', ['scss']).on("change", browserSync.reload);
  gulp.watch('./src/js/**/*.js', ['js']).on("change", browserSync.reload);
});

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
});

gulp.task('default', ['html','scss','js','watch', 'browserSync']);
