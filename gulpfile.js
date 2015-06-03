/* eslint-env node */
var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var replace = require('gulp-replace');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var jsinspect = require('gulp-jsinspect');

var paths = {
  sass: ['./www/scss/**/*.scss']
};

gulp.task('default', ['sass']);

gulp.task('sass', ['ionic-sass', 'app-sass']);

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: './www',
      routes: {
        '/jspm_packages': './jspm_packages',
        '/jspm_config.js': './jspm_config.js'
      }
    }
  });
});

gulp.task('serve', ['browser-sync'], function() {
  gulp.watch('www/**/*.css', function (file) {
    if (file.type === 'changed') {
      reload(file.path);
    }
  });
  gulp.watch(['www/**/*.html', 'www/**/*.js'], ['bs-reload']);
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('ionic-sass', function(cb) {
  var System = require('systemjs');
  var path = require('path');
  require('./' + require('./package.json').jspm.configFile);

  System
    .normalize('ionic')
    .then(function(n) { return System.locate({name: n}); })
    // System.locate 获取到的路径中缺了 www，于是只好 hard code 替换路径了
    .then(function(addr) { return addr.replace('file:', '').replace(/^.*jspm_packages/, './www/jspm_packages'); })
    .then(function(jsPath) {
      var p = path.parse(jsPath);
      var dirPath = path.join(p.dir, p.name);
      return dirPath;
    })
    .then(function(dirPath) {
      var scssPath = path.join(dirPath, 'scss', 'ionic.scss');
      var fontPath = path.join(dirPath, 'fonts');
      var relativeFontPath = path.relative('./www/bundles', fontPath);

      gulp.src(['./www/scss/ionic.app.scss'])
        .pipe(replace('{{ionic-font-path}}', relativeFontPath))
        .pipe(replace('{{ionic-scss-path}}', scssPath))
        .pipe(sourcemaps.init())
        .pipe(sass({errLogToConsole: true}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./www/bundles/'))
        .on('end', cb);
    });
});

gulp.task('app-sass', function(cb) {
  cb();
});

gulp.task('jsinspect', function() {
  return gulp.src(['www/**/*.js', '!www/bundles/**', '!www/jspm_config.js', '!www/jspm_packages/**', '!node_modules/**'])
    .pipe(jsinspect({threshold: 30}));
});
