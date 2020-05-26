'use strict';

const gulp = require('gulp');
const gp = require('gulp-load-plugins')();
const bSync = require('browser-sync').create(); 
const development = gp.environments.development;    //* переменная окружения
const production = gp.environments.production;      //* переменная окружения

const PATH = {
    build: { // Готовый билд
        php:    'app/',
        js:     'app/js/',
        style:  'app/css/',
        img:    'app/img/',
        fonts:  'app/fonts/'
    },
    src: { //   Путь к исходникам
        php:    './**/*.php',
        js:     'src/js/main.js',
        jsLibs:  'src/js/lib.js',
        style:  'src/scss/main.scss',
        img:    'src/img/**/*',
        fonts:  'src/fonts/**/*',

        sass: {
            fonts:  '../fonts/',
            img:    '../img/'
        }
    },
    watch: { // Файлы для наблюдения
        php:    './**/*.php',
        js:     'src/js/**/*.js',
        style:  'src/scss/**/*.scss',
        img:    'src/img/**/*.*',
        fonts:  'src/fonts/**/*'
    },
    clean: './app/*'
};

gulp.task('set-dev', development.task);
gulp.task('set-prod', production.task);


gulp.task('img', () => {
    return gulp.src(PATH.src.img)
    .pipe(gp.cache(gp.imagemin()))
    .pipe(gulp.dest(PATH.build.img))
});

gulp.task('fonts', () => {
    return gulp.src(PATH.src.fonts)
    .pipe(gulp.dest(PATH.build.fonts))
});


gulp.task('clean', () => {
    return gulp.src(PATH.clean, {read: false})
    .pipe(gp.clean())
});

gulp.task('cacheClean', (done) => {
    gp.cache.clearAll();
    done();
})

gulp.task('php', () => {
    return gulp.src([PATH.src.php, `!${PATH.build.php}*`])
    .pipe(gulp.dest(PATH.build.php))
    .pipe(bSync.stream())
});

gulp.task('style', () => {
    return gulp.src(PATH.src.style)
        .pipe(development(gp.sourcemaps.init()))
        //.pipe(gp.concat('main.scss'))
        .pipe(gp.sassVars({
            fontsPath:  PATH.src.sass.fonts,
            imgPath:    PATH.src.sass.img
        }))
        .pipe(gp.sass({
            //? includePaths: [require('node-normalize-scss').includePaths],
            //? imagePath: PATH.build.img
            }
        )
        .on('error', gp.sass.logError)
        )
        .pipe(gp.autoprefixer())
        .pipe(production(gp.csso()))  //  minify
        .pipe(development(gp.sourcemaps.write()))
        .pipe(gulp.dest(PATH.build.style))
        .pipe(bSync.reload({
            stream: true
        }))
});

gulp.task('script', () => {
    return gulp.src(PATH.src.js)
        .pipe(development(gp.sourcemaps.init()))
        .pipe(production(gp.terser()))
        .pipe(development(gp.sourcemaps.write()))
        .pipe(gulp.dest(PATH.build.js))
        .pipe(bSync.reload({
            stream: true
        }))
});

gulp.task('script:lib', () => {
    return gulp.src([
        'node_modules/jquery/dist/jquery.js', 
        'node_modules/bootstrap/dist/js/bootstrap.min.js', 
        PATH.src.jsLibs])
    .pipe(development(gp.sourcemaps.init()))
    .pipe(gp.concat('lib.js'))
    .pipe(production(gp.terser()))
    .pipe(development(gp.sourcemaps.write()))
    //.pipe(gp.rename('library-rename.js'))
    .pipe(gulp.dest(PATH.build.js))
})

gulp.task('serve', () => {
    bSync.init({
            proxy:'localhost',
            port:8080,
            //online: true,
            //tunnel: 'test'
    });
});

gulp.task('watch', () => {
    gulp.watch(PATH.watch.style, gulp.series('style'));
    gulp.watch(PATH.watch.js, gulp.series('script:lib', 'script'));
    gulp.watch(PATH.watch.fonts, gulp.series('fonts'));
    gulp.watch([PATH.watch.php, `!${PATH.build.php}*`], gulp.series('php'));
});

gulp.task('build', gulp.series('set-prod', 'clean', 'php', 'fonts', 'style', 'script:lib', 'script', 'img'
));


gulp.task('default', gulp.series(
    gulp.parallel('set-dev', 'php', 'fonts', 'style', 'script:lib', 'script', 'img'),
    gulp.parallel('watch', 'serve')
));