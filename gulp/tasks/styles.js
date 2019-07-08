module.exports = function(gulp, $, config) {
  return function styles() {
    return gulp
      .src(`${config.sass}/*.{sass,scss}`)
      .pipe($.plumber())
      .pipe($.if(!config.production, $.sourcemaps.init()))
      .pipe($.sass({
        // outputStyle: config.production ? 'compressed' : 'expanded', // nested, expanded, compact, compressed
        outputStyle: 'expanded',
        precision: 5
      }).on('error', $.sass.logError))
      .pipe($.autoprefixer())
      .pipe($.if(config.production, $.groupCssMediaQueries()))
      .pipe($.if(!config.production, $.sourcemaps.write('./')))
      .pipe(gulp.dest(config.dist))
      .pipe($.rename('app.min.css'))
      .pipe($.csso())
      .pipe(gulp.dest(config.dist))
  }
}
