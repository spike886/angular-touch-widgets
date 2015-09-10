var gulp = require('gulp');
var karma = require('karma').server;
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var path = require('path');
var plumber = require('gulp-plumber');
var runSequence = require('run-sequence');
var jshint = require('gulp-jshint');

var gutil = require('gulp-util');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var traceur = require('gulp-traceur');
var watch = require('gulp-watch');
var inject = require('gulp-inject');
var autoprefixer = require('gulp-autoprefixer');
var connect = require('gulp-connect');

/**
 * File patterns
 **/

// Root directory
var rootDirectory = path.resolve('./');

// Source directory for build process
var sourceDirectory = path.join(rootDirectory, './src');

var sourceFiles = [

    // Make sure module files are handled first
    path.join(sourceDirectory, '/**/*.module.js'),

    // Then add all JavaScript files
    path.join(sourceDirectory, '/**/*.js')
];

var files = [

    // Make sure module files are handled first
    path.join(rootDirectory, '/**/*.scss'),

    // Make sure module files are handled first
    path.join(sourceDirectory, '/**/*.module.js'),

    // Then add all JavaScript files
    path.join(sourceDirectory, '/**/*.js')
];

var scssFiles = path.join(rootDirectory, './scss/**/*.scss');

var lintFiles = [
  'gulpfile.js',
  // Karma configuration
  'karma-*.conf.js'
].concat(sourceFiles);

gulp.task('build', ['src', 'sass', 'fonts']);

/**
 * Javascript
 */
gulp.task('src', function() {
  gulp.src(sourceFiles)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(traceur())
    .pipe(concat('angular-touch-widgets.js'))
    .pipe(gulp.dest('./dist/'))
    .pipe(uglify())
    .pipe(rename('angular-touch-widgets.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist'));
});

/**
 * Sass
 */
gulp.task('sass', function(done) {
    gulp.src(scssFiles)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(concat('angular-touch-widgets.css'))
        .pipe(gulp.dest('./dist/'))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename('angular-touch-widgets.min.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/'))
        .on('end', done);
});

/**
 * Fonts
 */
gulp.task('fonts', function() {
    gulp.src('./bower/Ionicons/fonts/**/*.{ttf,woff,eot,svg}')
        .pipe(gulp.dest('./fonts/'));
});

/**
 * Process
 */
gulp.task('process-all', function (done) {
  runSequence('jshint', 'test-src', 'build', done);
});

/**
 * Watch task
 */
gulp.task('watch', function () {

  // Watch JavaScript files
  gulp.watch(files, ['build']);
});

/**
 * Validate source JavaScript
 */
gulp.task('jshint', function () {
  return gulp.src(lintFiles)
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

/**
 * Run test once and exit
 */
gulp.task('test-src', function (done) {
  karma.start({
    configFile: __dirname + '/karma-src.conf.js',
    singleRun: true
  }, done);
});

/**
 * Run test once and exit
 */
gulp.task('test-dist-concatenated', function (done) {
  karma.start({
    configFile: __dirname + '/karma-dist-concatenated.conf.js',
    singleRun: true
  }, done);
});

/**
 * Run test once and exit
 */
gulp.task('test-dist-minified', function (done) {
  karma.start({
    configFile: __dirname + '/karma-dist-minified.conf.js',
    singleRun: true
  }, done);
});

/**
 * Run demo
 */
gulp.task('demo', function() {
    connect.server({
        livereload: true,
        root: ''
    });
});

gulp.task('default', function () {
  runSequence('process-all', 'watch');
});

gulp.task('develop', function () {
    runSequence('demo', 'process-all', 'watch');
});
