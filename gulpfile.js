'use strict';
var gulp = require('gulp'),
    gulpFilter = require('gulp-filter'),
    //concat = require('gulp-concat'),//合併檔案
    server = require('gulp-develop-server'),
    flatten = require('gulp-flatten'),
    mainBowerFiles = require('main-bower-files'),
    rename = require("gulp-rename"),
    gutil = require('gulp-util'),
    minifycss = require('gulp-minify-css'),
    changed = require('gulp-changed'),
    sass = require('gulp-sass'),
    csso = require('gulp-csso'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    del = require('del'),
    notify = require('gulp-notify'),
    jeditor = require('gulp-json-editor'),
    zip = require('gulp-zip'),
    webpack = require("webpack"),
    browserSync = require('browser-sync'),
    webpackConfig = require("./webpack.config.js"),
    webpackProConfig = require("./webpack_production.config.js"),
    reload = browserSync.reload,
    p = {
        jsx: './scripts/app.jsx',
        scss: 'styles/style.scss',
        scssSource: 'styles/*.scss',
        css: 'styles/main.css',
        icon_css: 'fonts/icons-homelink.css',
        bootstrap_css: 'styles/bootstrap.css',
        cssSource: 'styles/*',
        font: 'fonts/*',
        image: 'images/*',
        data: 'data/*',
        bundle: 'app.js',
        distJs: 'dist/js',
        distCss: 'dist/css',
        distFont: 'dist/fonts',
        distImage: 'dist/images',
        distData: 'dist/data'
    };

gulp.task('clean', function(cb) {
    del(['dist', 'build'], cb);
});

gulp.task('fonts', function() {
    return gulp.src(p.font)
        .pipe(gulp.dest(p.distFont));
});

gulp.task('images', function() {
    return gulp.src(p.image)
        .pipe(gulp.dest(p.distImage));
});
gulp.task('datas', function() {
    return gulp.src(p.data)
        .pipe(gulp.dest(p.distData));
});




function execWebpack(config, type) {
    return webpack(config, function(err, stats) {
        if (err) {
            throw new gutil.PluginError("execWebpack", err);
        }
        if (type == "build") {
            setTimeout(function() {
                console.log('All finished');
                // zip in here
                return gulp.src([
                        './server.js',
                        './index.html',
                        './package.json',
                        './README.md',
                        './dist/*/*'
                    ], { base: "." })
                    .pipe(zip('build.zip'))
                    .pipe(gulp.dest('build'));

            }, 5000);
        }
        return gutil.log("[execWebpack]", stats.toString({
            colors: true
        }));
    });
}

gulp.task('webpack', function(callback) {
    setTimeout(function() {
        execWebpack(webpackConfig);

    }, 500);

    return callback();
});

gulp.task('webpack_pro', function(callback) {
    execWebpack(webpackProConfig, "build");
    return callback();
});

gulp.task('icon-css', function() {
    return gulp.src(p.icon_css)
        .pipe(changed(p.distCss))
        .pipe(sass({ errLogToConsole: true }))
        .on('error', notify.onError())
        .pipe(autoprefixer('last 1 version'))
        .pipe(csso())
        .pipe(gulp.dest(p.distCss))
        .pipe(reload({ stream: true }));
});

gulp.task('bootstrap', function() {
    return gulp.src(p.bootstrap_css)
        .pipe(changed(p.distCss))
        .pipe(sass({ errLogToConsole: true }))
        .on('error', notify.onError())
        .pipe(autoprefixer('last 1 version'))
        .pipe(csso())
        .pipe(gulp.dest(p.distCss))
        .pipe(reload({ stream: true }));
});

// Ugly hack to bring modernizr in

gulp.task('datepickerCss', function() {
    return gulp.src('bower_components/react-date-picker/dist/react-datepicker.min.css')
        .pipe(gulp.dest(p.distCss));
});

gulp.task('widgetsCss', function() {
    return gulp.src('bower_components/react-widgets/dist/css/react-widgets.css')
        .pipe(gulp.dest(p.distCss))
        .pipe(minifycss())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest(p.distCss));
});


gulp.task('all_dist', function() {
    setTimeout(function() {
        gulp.start(['images', 'datas', 'fonts', 'bower-libs', 'webpack']);
    }, 500);
});


gulp.task('server:start', function() {
    server.listen({ path: 'server.js' }, function(error) {});
});

gulp.task('server:restart', function() {
    server.restart(function(error) {
        // console.log(error);
        if (!error) browserSync.reload();
    });
});

gulp.task('bower-libs', ['bootstrap', 'icon-css'], function() {
    var jsFilter = gulpFilter('*.js', '!dist/*.js');
    var cssFilter = gulpFilter('*.css', '!dist/css');
    var fontFilter = gulpFilter(['*.eot', '*.woff', '*.svg', '*.ttf']);

    return gulp.src(mainBowerFiles())

    // JS from bower_components
    .pipe(jsFilter)
        .pipe(gulp.dest(p.distJs))
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest(p.distJs))
        .pipe(jsFilter.restore())

    // css from bower_components, minified
    .pipe(cssFilter)
        .pipe(gulp.dest(p.distCss))
        .pipe(minifycss())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest(p.distCss))
        .pipe(cssFilter.restore())

    // font files from bower_components
    .pipe(fontFilter)
        .pipe(flatten())
        .pipe(gulp.dest(p.distFont));
});

gulp.task('changeVersion', function() {
    var time = new Date().getTime();
    gulp.src("config/version.json")
        .pipe(jeditor(function(json) {
            json.VERSION = time;
            return json;
        }))
        .pipe(gulp.dest("config"));
});



gulp.task('watch', ['clean', 'server:start', 'all_dist'], function() {
    gulp.watch(['server.js'], ['server:restart'], ['datas']);
});


gulp.task('zip', ['webpack_pro', 'images', 'datas', 'icon-css', 'changeVersion', 'bower-libs', 'fonts'], function() {
    console.log('start webpack');
});

gulp.task('build', ['clean'], function() {
    gulp.start(['zip']);

});

gulp.task('default', function() {
    console.log('Run "gulp watch or gulp build"');
});
