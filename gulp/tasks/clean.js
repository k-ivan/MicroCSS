const del    = require('del');

module.exports = function(gulp, $, config) {
  return function clean() {
    return del([config.dest.root, config.dist])
      .then(function (paths) {
        if (paths.length)
          $.util.log($.util.colors.green(`${paths} - cleared`));
      });
  }
}
