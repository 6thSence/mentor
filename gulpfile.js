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

const rulesStyles = require('./stylelintrc.json');

gulp.task('default', ['styles']);
gulp.task('dev', ['styles', 'watch']);

gulp.task('handelbars', function () {
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

gulp.task('styles', function() {
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

    return gulp.src('./src/**/*.css')
        .pipe(postcss(processors))
        .pipe(concat('bundle.min.css'))
        .pipe(gulp.dest('./public/'));
});

gulp.task('watch', function() {
    gulp.watch('./css/**/*.css', function() {
        gulp.run('styles');
    })
});

