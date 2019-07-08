const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const config = require('./gulp/config');

const getTask = (name) => {
  return require(`./gulp/tasks/${name.toLowerCase()}`)(gulp, $, config);
}

const buildTasks = () => {
  return [
    'clean',
    gulp.parallel(
      'html',
      'styles',
      'demo',
      'webpack',
      'svgsprite'
    ),
    'copy'
  ];
}

// Tasks
gulp.task('clean', getTask('clean'));
gulp.task('server', getTask('server'));
gulp.task('html', getTask('html'));
gulp.task('styles', getTask('styles'));
gulp.task('webpack', getTask('webpack'));
gulp.task('svgsprite', getTask('svgsprite'));
gulp.task('imagemin', getTask('imagemin'));
gulp.task('ghpages', getTask('ghpages'));
gulp.task('zip', getTask('zip'));
gulp.task('copy', getTask('copy'));


const demo = () => {
  return gulp.src(`${config.src.sass}/*.{sass,scss}`)
    .pipe($.plumber())
    .pipe($.if(!config.production, $.sourcemaps.init()))
    .pipe($.sass({
      // outputStyle: config.production ? 'compressed' : 'expanded', // nested, expanded, compact, compressed
      outputStyle: 'expanded',
      precision: 5
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer())
    .pipe($.if(config.production, $.groupCssMediaQueries()))
    .pipe($.if(config.production, $.csso()))
    .pipe($.if(!config.production, $.sourcemaps.write('./')))
    .pipe(gulp.dest(config.dest.css));
}

gulp.task('demo', demo);

// Watch
gulp.task('watch', (done) => {
  gulp.watch(`${config.src.html}/**/*.html`, gulp.series('html'));
  gulp.watch(`${config.src.sass}/**/*.{sass,scss}`, gulp.series('styles'));
  gulp.watch(`${config.src.demoScss}/**/*.{sass,scss}`, gulp.series('demo'));
  gulp.watch(`${config.src.js}/**/*.js`, gulp.series('webpack'));
  gulp.watch(`${config.src.iconsSvg}/*.svg`, gulp.series('svgsprite'));
  gulp.watch([`${config.src.fonts}/**/*`, `${config.src.img}/**/*`], gulp.series('copy'));
});

config.logEnv();
gulp.task('build', gulp.series(...buildTasks()));
gulp.task('dev', gulp.series(...buildTasks()));
gulp.task('gh', gulp.series('build', 'ghpages'));
gulp.task('archive', gulp.series('build', 'zip'));
gulp.task('default', gulp.series(
  'dev',
  gulp.parallel(
    'watch',
    'server'
  )
));
