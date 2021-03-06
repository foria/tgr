// generated on 2018-07-09 using generator-webapp 3.0.1
const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const browserSync = require('browser-sync').create();
const del = require('del');
const runSequence = require('run-sequence');

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

let dev = true;

gulp.task('styles', () => {
  return gulp.src('app/styles/*.scss')
    .pipe($.plumber())
    .pipe($.if(dev, $.sourcemaps.init()))
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
    .pipe($.if(dev, $.sourcemaps.write()))
    .pipe(gulp.dest('app/styles'))
    .pipe(reload({stream: true}));
});

// gulp.task('scripts', () => {
//   return gulp.src('app/scripts/**/*.js')
//     .pipe($.plumber())
//     .pipe($.if(dev, $.sourcemaps.init()))
//     .pipe($.babel())
//     .pipe($.if(dev, $.sourcemaps.write('.')))
//     .pipe(gulp.dest('.tmp/scripts'))
//     .pipe(reload({stream: true}));
// });

// function lint(files) {
//   return gulp.src(files)
//     .pipe($.eslint({ fix: true }))
//     .pipe(reload({stream: true, once: true}))
//     .pipe($.eslint.format())
//     .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
// }

// gulp.task('lint', () => {
//   return lint('app/scripts/**/*.js')
//     .pipe(gulp.dest('app/scripts'));
// });
// gulp.task('lint:test', () => {
//   return lint('test/spec/**/*.js')
//     .pipe(gulp.dest('test/spec'));
// });

// gulp.task('html', ['styles', 'scripts'], () => {
//   return gulp.src('app/*.html')
//     .pipe($.useref({searchPath: ['.tmp', 'app', '.']}))
//     .pipe($.if(/\.js$/, $.uglify({compress: {drop_console: true}})))
//     .pipe($.if(/\.css$/, $.cssnano({safe: true, autoprefixer: false})))
//     .pipe($.if(/\.html$/, $.htmlmin({
//       collapseWhitespace: true,
//       minifyCSS: true,
//       minifyJS: {compress: {drop_console: true}},
//       processConditionalComments: true,
//       removeComments: true,
//       removeEmptyAttributes: true,
//       removeScriptTypeAttributes: true,
//       removeStyleLinkTypeAttributes: true
//     })))
//     .pipe(gulp.dest('dist'));
// });

gulp.task('images', () => {
  return gulp.src('app/images/**/*')
    .pipe($.cache($.imagemin()))
    .pipe(gulp.dest('app/images'));
});

// gulp.task('extras', () => {
//   return gulp.src([
//     'app/*',
//     '!app/*.html'
//   ], {
//     dot: true
//   }).pipe(gulp.dest('dist'));
// });

gulp.task('clean', del.bind(null, ['.tmp']));

gulp.task('serve', () => {
  runSequence(['styles'], () => {
    browserSync.init({
      notify: false,
      port: 9000,
      server: {
        baseDir: ['app']
      }
    });

    gulp.watch([
      'app/*.html',
      'app/images/**/*'
    ]).on('change', reload);

    gulp.watch('app/styles/**/*.scss', ['styles']);
    //gulp.watch('app/scripts/**/*.js', ['scripts']);
  });
});

// gulp.task('serve:dist', ['default'], () => {
//   browserSync.init({
//     notify: false,
//     port: 9000,
//     server: {
//       baseDir: ['dist']
//     }
//   });
// });

// gulp.task('serve:test', ['scripts'], () => {
//   browserSync.init({
//     notify: false,
//     port: 9000,
//     ui: false,
//     server: {
//       baseDir: 'test',
//       routes: {
//         '/scripts': '.tmp/scripts'
//       }
//     }
//   });

//   gulp.watch('app/scripts/**/*.js', ['scripts']);
//   gulp.watch(['test/spec/**/*.js', 'test/index.html']).on('change', reload);
//   gulp.watch('test/spec/**/*.js', ['lint:test']);
// });

gulp.task('build', ['images'], () => {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', () => {
  return new Promise(resolve => {
    dev = false;
    runSequence(['clean'], 'build', resolve);
  });
});
