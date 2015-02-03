'use strict';

var gulp = require('gulp'),
    server = require('gulp-server-livereload'),
    karma = require('karma').server;

gulp.task('serve', function () {
  gulp.src(__dirname)
    .pipe(server({
      livereload: true,
      port: 8000,
      defaultFile: 'demo/index.html',
      open: true
    }));
});

gulp.task('test', function (done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js'
  }, done);
});

gulp.task('default', [ 'test', 'serve' ]);
