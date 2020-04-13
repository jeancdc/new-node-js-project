const gulp = require('gulp');
const ts = require('gulp-typescript');
const del = require('del');

const tsProject = ts.createProject('tsconfig.json');

function clean() {
    return del([
        'dist',
    ]);
}

function transpile() {
    return tsProject
        .src()
        .pipe(tsProject())
        .js.pipe(gulp.dest('dist'));
}

function copyBin() {
    return gulp.src('bin/www')
        .pipe(gulp.dest('dist/bin'));
}

function copyPublic() {
    return gulp.src('public/**/*')
        .pipe(gulp.dest('dist/public'));
}

function copyViews() {
    return gulp.src('views/*')
        .pipe(gulp.dest('dist/views'));
}

async function copyFiles() {
    await copyBin();
    await copyPublic();
    await copyViews();
}

async function buildProject() {
    await clean();
    await transpile();
    await copyFiles();
}

function watch() {
    gulp.watch(['src/**/*.ts'], transpile);
    // gulp.watch(['bin/www'], copyBin());  TODO to fix: it doesn't work
    gulp.watch(['views/*'], copyViews);
    gulp.watch(['public/**/*'], copyPublic);
}

gulp.task('watch', function() {
    watch();
});

gulp.task('build-project', async function() {
    await buildProject();
});

gulp.task('start', gulp.series('build-project', 'watch'));
