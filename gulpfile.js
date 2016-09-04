const assets = require('postcss-assets');
const autoprefixer = require('autoprefixer');
const concat = require('gulp-concat');
const gulp = require('gulp');
const postcss = require('gulp-postcss');
const reporter = require('postcss-browser-reporter');
const nested = require('postcss-nested');
const short = require('postcss-short');
const stylelint = require('stylelint');
const handlebars = require('gulp-compile-handlebars');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();

const rulesStyles = require('./stylelintrc.json');

gulp.task('default', ['build']);
gulp.task('dev', ['build', 'watch']);
gulp.task('build', ['styles', 'handelbars', 'fonts', 'assets', 'browserSync']);

gulp.task('handelbars', () => {
    const templateData = {
        fullName: 'Дарья Пушкарская'
    };

    const options = {
        partials : {
            footer : '<footer>the end</footer>'
        },
        batch : ['./src/templates']
    };

    return gulp.src('src/index.hbs')
        .pipe(handlebars(templateData, options))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('public'));
});

gulp.task('styles', () => {
    const processors = [
        nested,
        assets,
        short,
        stylelint(rulesStyles),
        autoprefixer,
        reporter({
            selector: 'body:before'
        })
    ];

    return gulp.src('./src/styles/**/*.css')
        .pipe(postcss(processors))
        .pipe(concat('bundle.min.css'))
        .pipe(gulp.dest('./public/styles/'));
});

gulp.task('assets', () => {
    gulp.src('./src/assets/**/*.{png,jpg,ico}')
        .pipe(gulp.dest('./public/assets/'));
});

gulp.task('fonts', () => {
    gulp.src('./src/fonts/**/*.otf')
        .pipe(gulp.dest('./public/fonts/'));
});

gulp.task('browserSync', () => {
    browserSync.init({
        server: {
            baseDir: "./public"
        }
    })
});

gulp.task('watch', () => {
    gulp.watch('./src/styles/**/*.css', ['styles']);
    gulp.watch('./src/**/*.hbs', ['handelbars']);
    gulp.watch('./src/**/*').on('change', browserSync.reload);
});

