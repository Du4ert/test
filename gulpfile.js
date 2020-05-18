'use strict';

const gulp = require('gulp');
const gp = require('gulp-load-plugins')();
const bSync = require('browser-sync').create();

gulp.task('img', () => {
    return gulp.src('src/img/*')
    .pipe(gulp.dest('app/img'))
});

gulp.task('img:build', () => {
    return gulp.src('src/img')
    .pipe(gp.image())
    .pipe(gulp.dest('app'))
})

gulp.task('clean', () => {
    return gulp.src('app/*', {read: false})
    .pipe(gp.clean())
});

gulp.task('php', () => {
    return gulp.src(['./**/*.php', '!app/*'])
    .pipe(gulp.dest('app/'))
    .pipe(bSync.stream())
});

gulp.task('style', () => {
    return gulp.src('src/scss/main.scss')
        .pipe(gp.sourcemaps.init())
        .pipe(gp.sass())
        .pipe(gp.autoprefixer())
        //.pipe(gp.csso())  // * minify
        .pipe(gp.sourcemaps.write())
        .pipe(gulp.dest('app/style'))
        .pipe(bSync.reload({
            stream: true
        }))
});

gulp.task('script', () => {
    return gulp.src('src/js/**/*.js')
        .pipe(gp.terser())
        .pipe(gulp.dest('app/js/'))
        .pipe(bSync.reload({
            stream: true
        }))
});

gulp.task('script:lib', () => {
    return gulp.src(['src/js/main.js', 'node_modules/jquery/dist/jquery.js'])
    
    .pipe(gp.concat('lib.js'))
    .pipe(gp.terser())
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
    gulp.watch('src/js/**', gulp.series('script'));
    gulp.watch(['./**/*.php', '!app/*'], gulp.series('php'));
});

gulp.task('build', gulp.series('php', 'style', 'script:lib', 'script', 'img'
));


gulp.task('default', gulp.series(
    gulp.parallel('php', 'style', 'script', 'img'),
    gulp.parallel('watch', 'serve')
));