'use strict'

const gulp = require('gulp')
const sass = require('gulp-sass')
const concat = require('gulp-concat')
const minifyCSS = require('gulp-minify-css')
const del = require('del')
const { version } = require('./package.json')

// npx gulp serve
gulp.task('serve', done => {
  require('./bin/www')
  done()
})

// npx gulp styleMin
gulp.task('styleMin', () => {
  return gulp
    .src('scss/**/*.scss')
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(minifyCSS())
    .pipe(concat('bds.min.css'))
    .pipe(gulp.dest(`public/dist/${version}`))
})

// npx gulp copyAssets
gulp.task('copyAssets', () => {
  del(`public/dist/${version}/assets`, { force: true })
  return gulp.src('public/assets/**/*')
    .pipe(gulp.dest(`public/dist/${version}/assets`))
})

// npx gulp watch
gulp.task('watch', () => {
  gulp.watch('public/assets/**/*', gulp.series('copyAssets'))
  gulp.watch('scss/**/*.scss', gulp.series('styleMin'))
})

// npx gulp
gulp.task('default',
  gulp.series('copyAssets', 'styleMin', 'serve', 'watch')
)
