var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var sh = require('shelljs');
var browserSync = require('browser-sync');

var paths = {
  sass: ['./www/scss/**/*.scss']
};

gulp.task('default', ['sass']);

gulp.task('sass', ['ionic-sass', 'app-sass']);

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
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

gulp.task('serve', ['browser-sync']);

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
      var dirPath = path.join(p.dir, p.name)
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
        .pipe(sass({ errLogToConsole: true }))
        .pipe(minifyCss({ keepSpecialComments: 0 }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./www/bundles/'))
        .on('end', cb);
    });
});

gulp.task('app-sass', function(cb) {
  cb();
});
