var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', async function() {
return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});
// Move the javascript files into our /src/js folder
gulp.task('js', async function() {
return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
        .pipe(gulp.dest("src/js"))
        .pipe(browserSync.stream());
});

// Move the  font-aswesome fonts into our /src/fonts folder
gulp.task('move-fonts', async function() {
        return gulp.src(['node_modules/font-awesome/fonts/*'])
        .pipe(gulp.dest('src/fonts'))
        .pipe(browserSync.stream());
    });

//Move the font-awesome css into the /src/css folder
gulp.task('move-css', async function() {
        return gulp.src(['node_modules/font-awesome/css/font-awesome.css'])
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.stream());
    });

// Static Server + watching scss/html files
gulp.task('serve', gulp.series('sass', async function() {
browserSync.init({
        server: "./src"
    });
gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'node_modules/font-awesome/scss/font-awesome.scss', 'src/scss/*.scss'], gulp.series('sass'));
gulp.watch("src/*.html").on('change', browserSync.reload);
}));
gulp.task('default', gulp.parallel('js', 'move-fonts', 'move-css', 'serve'));