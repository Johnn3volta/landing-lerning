const gulp         = require('gulp'),
      browserSync  = require('browser-sync').create(),
      pug          = require('gulp-pug'),
      sass         = require('gulp-sass'),
      spritesmith  = require('gulp.spritesmith'),
      rimraf       = require('rimraf'),
      rename       = require('gulp-rename'),
      uglify       = require('gulp-uglify'),
      concat       = require('gulp-concat'),
      autoprefixer = require('gulp-autoprefixer'),
      sourcemaps   = require('gulp-sourcemaps');

/* -------- Server ---------*/
gulp.task('server', function(){
  browserSync.init({
    server: {
      port: 9000,
      baseDir: 'build',
    },
  });
  gulp.watch('build/**/*').on('change', browserSync.reload);
});

/* -------- Pug Compile ---------*/
gulp.task('templates:compile', function buildHTML(){
  return gulp.src('./source/templates/*.pug')
  .pipe(pug({
    pretty: true,
  }))
  .pipe(gulp.dest('build'));
});

/* -------- Styles Compile ---------*/
gulp.task('styles:compile', function(){
  return gulp.src('source/styles/main.scss')
  .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
  .pipe(autoprefixer({
    browsers: ['last 15 versions'],
    cascade: false,
  }))
  .pipe(rename('main.min.css'))
  .pipe(gulp.dest('./build/css'));
});

/* -------- JS ---------*/
gulp.task('js', function(){
  return gulp.src([
    './source/js/init.js',
    './source/js/navigation.js',
    './source/js/validation.js',
    './source/js/form.js',
    './source/js/main.js',
  ])
  .pipe(sourcemaps.init())
  .pipe(concat('main.min.js'))
  .pipe(uglify())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./build/js'));
});

/* -------- Sprite ---------*/
gulp.task('sprite', function(cb){
  const spriteData = gulp.src('source/images/icons/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    imgPath: '../images/sprite.png',
    cssName: 'sprite.sass',
  }));
  spriteData.img.pipe(gulp.dest('build/images/'));
  spriteData.css.pipe(gulp.dest('source/styles/global/'));
  cb();
});

/* -------- Delete ---------*/
gulp.task('clean', function del(cb){
  return rimraf('build', cb);
});

/* -------- Copy fonts ---------*/
gulp.task('copy:fonts', function(){
  return gulp.src('./source/fonts/**/*.*')
  .pipe(gulp.dest('build/fonts'));
});

/* -------- Copy images ---------*/
gulp.task('copy:images', function(){
  return gulp.src('./source/images/**/*.*')
  .pipe(gulp.dest('build/images'));
});

/* -------- Copy  ---------*/
gulp.task('copy', gulp.parallel('copy:fonts', 'copy:images'));

/* -------- Watchers  ---------*/
gulp.task('watch', function(){
  gulp.watch('./source/templates/**/*.pug', gulp.series('templates:compile'));
  gulp.watch('./source/styles/**/*.scss', gulp.series('styles:compile'));
  gulp.watch('./source/js/**/*.js', gulp.series('js'));
});

/* -------- Watchers  ---------*/
gulp.task('default', gulp.series(
  'clean',
  gulp.parallel('templates:compile', 'styles:compile', 'js', 'sprite', 'copy'),
  gulp.parallel('watch', 'server'),
));


