const gulp = require('gulp');
const ts = require('gulp-typescript');
const del = require('del');
const exec = require('child_process').exec;
const childProcess = require('child_process');
const spawn = require('child_process').spawn;
const { execFile } = require('child_process').execFile;

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
    return gulp.src('src/views/*')
        .pipe(gulp.dest('dist/views'));
}

async function copyFiles() {
    await copyBin();
    await copyPublic();
    await copyViews();
}

async function buildProject() {
    await clean();
    await copyFiles();
    await transpile();
}

function watchSource() {
    gulp.watch(['src/**/*.ts'], transpile);
    gulp.watch(['src/views/*'], copyViews);
    gulp.watch(['public/**/*'], copyPublic);
}

function watchBuild() {
    exec('nodemon ./dist/bin/www --watch dist');
}

gulp.task('copy-server', async function () {
   await copyBin();
});

gulp.task('watch-source', function () {
    watchSource();
});

gulp.task('watch-build', async function () {
    const cmd = exec('./node_modules/.bin/nodemon ./dist/bin/www --watch dist');
    process.stdin.pipe(cmd.stdin);
    cmd.stdout.on('data', (data) => {
        console.log(data);
    });

    return cmd;
});

gulp.task('build-project', async function () {
    await buildProject();
});

gulp.task('dev', gulp.series(
    'build-project',
    gulp.parallel(
        'watch-source',
        'watch-build',
    ),
));

// test

gulp.task('list', async function() {
    /* const cmd = exec('./node_modules/.bin/nodemon ./dist/bin/www --watch dist');
    process.stdin.pipe(cmd.stdin);
    cmd.stdout.on('data', (data) => {
        console.log(data);
    });
    return cmd; */

    const { stdout, stderr } = await exec('./node_modules/.bin/nodemon ./dist/bin/www --watch dist');
    stdout.on('data', (data) => {
        console.log(JSON.stringify(data));
    });
});
