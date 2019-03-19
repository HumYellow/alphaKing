var gulp = require('gulp'), 
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    browserSync = require('browser-sync'),
    useref = require('gulp-useref'),
    gulpIf = require('gulp-if');

//自动刷新任务
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: './src',
      index:'index.html'
    },
  })
})
// 单独css压缩
gulp.task('styles', function() {
  return gulp.src('src/css/*.css')
    .pipe(concat('main.min.css'))                            //- 合并后的文件名
    .pipe(minifycss())                                      //- 压缩处理成一行
    .pipe(gulp.dest('/dist/css'))                               //- 输出文件本地
});
 
// 单独JS压缩
gulp.task('scripts', function() {
  return gulp.src('src/js/**/*.js')
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
});
 
// 单独图片压缩
gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/images'))
    .pipe(notify({ message: 'Images task complete' }))
}); 
// 文字中直接复制
gulp.task('font', function() { 
  return gulp.src('src/css/font/*')
    .pipe(gulp.dest('dist/css/font'))
});
//html引用标签合并压缩
gulp.task('html',function(){
  return gulp.src('src/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.css', minifycss()))
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulp.dest('dist'))
})
// 清理
gulp.task('clean', function() {
  return gulp.src(['dist/css', 'dist/js', 'dist/images'], {read: false})
    .pipe(clean());
});
// 开始打包任务
gulp.task('build', ['clean'], function() { 
    gulp.start('html', 'images','font');
});
 
//监听文件改变刷新页面
gulp.task('watch',['browserSync'], function() {
  gulp.watch('src/css/*.css', browserSync.reload());
  gulp.watch('*.html',  browserSync.reload());
 
  // 看守所有.js档
  gulp.watch('src/js/*.js', browserSync.reload());
 
  // 看守所有图片档
  gulp.watch('src/images/**/*', ['images']);
});


