'use strict';

const gulp = require('gulp');
const gp = require('gulp-load-plugins')();
const bSync = require('browser-sync').create(); 
const development = gp.environments.development;    //* переменная окружения
const production = gp.environments.production;      //* переменная окружения

gulp.task('set-dev', development.task);
gulp.task('set-prod', production.task);

gulp.task('img', () => {
    return gulp.src('src/img/*')
    .pipe(gp.cache(gp.imagemin()))
    .pipe(gulp.dest('app/img'))
})

gulp.task('clean', () => {
    return gulp.src('app/*', {read: false})
    .pipe(gp.clean())
});

gulp.task('cacheClean', (done) => {
    gp.cache.clearAll();
    done();
})

gulp.task('php', () => {
    return gulp.src(['./**/*.php', '!app/*'])
    .pipe(gulp.dest('app/'))
    .pipe(bSync.stream())
});

gulp.task('style', () => {
    return gulp.src('src/scss/**/*')
        .pipe(development(gp.sourcemaps.init()))
        .pipe(gp.sass({
            includePath: 'Дерьмо'
        })
        .on('error', gp.sass.logError)
        )
        .pipe(gp.autoprefixer())
        .pipe(production(gp.csso()))  //  minify
        .pipe(development(gp.sourcemaps.write()))
        .pipe(gulp.dest('app/style'))
        .pipe(bSync.reload({
            stream: true
        }))
});

gulp.task('script', () => {
    return gulp.src('src/js/main.js')
        .pipe(development(gp.sourcemaps.init()))
        .pipe(production(gp.terser()))
        .pipe(development(gp.sourcemaps.write()))
        .pipe(gulp.dest('app/js/'))
        .pipe(bSync.reload({
            stream: true
        }))
});

gulp.task('script:lib', () => {
    return gulp.src(['node_modules/jquery/dist/jquery.js', 'src/js/lib.js'])
    .pipe(gp.concat('lib.js'))
    .pipe(production(gp.terser()))
    //.pipe(gp.rename('library-rename.js'))
    .pipe(gulp.dest('app/js'))
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
    gulp.watch('src/scss/**', gulp.series('style'));
    gulp.watch('src/js/**', gulp.series('script:lib', 'script'));
    gulp.watch(['./**/*.php', '!app/*'], gulp.series('php'));
});

gulp.task('build', gulp.series('set-prod', 'clean', 'php', 'style', 'script:lib', 'script', 'img'
));


gulp.task('default', gulp.series(
    gulp.parallel('set-dev', 'php', 'style', 'script:lib', 'script', 'img'),
    gulp.parallel('watch', 'serve')
));